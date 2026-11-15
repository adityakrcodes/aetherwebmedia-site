import {
  agentQuestionFor,
  canSkip,
  displayAnswer,
  fieldOptions,
  fillTemplate,
  type LeadAnswer,
  type LeadData,
  type LeadField,
} from "./fields";
import {
  findShapedValue,
  optionsMentioned,
  readTypedAnswer,
  SHAPED_TYPES,
  validateAnswer,
} from "./answers";

/**
 * The agentic lead form as a pure state machine, ported as-is from the workspace
 * (aether-admin `lib/lead-forms/agentic.ts`) plus `presets`: picks a multi-select
 * starts with, so a service page's button arrives with its service ticked.
 *
 * The agentic lead form as a pure state machine. Everything the chat says about a
 * field — its question, label, placeholder, options — comes from the form's
 * config; the only fixed words are the agent's own phrases in `PHRASES`. Kept free
 * of React so the whole conversation can be driven from a unit test.
 *
 * Fields are asked one at a time in the admin's order. A message is read as, in
 * turn: a confirmation (in review), a command, a correction to an earlier answer,
 * and only then an answer to the current question.
 */

export const PHRASES = {
  saved: "Got it — saved.",
  updated: (label: string, value: string) => `Updated ${label} to ${value}.`,
  required: "This one is required.",
  skipped: "No problem — skipped.",
  firstQuestion: "We’re already at the first question.",
  startOver: "No problem — let’s start again.",
  editing: "Sure — let’s change that.",
  summaryTitle: "Here’s what you shared:",
  reviewHint: "Tap Looks good to send it, or tell me what to change.",
  makeAnEdit: "Sure — tap the pencil next to anything you’d like to change, or type “edit” and its name.",
  chooseOption: "Pick one of the options above, or type it.",
  chooseOptions: "Pick the options above, then tap Done — or type them, separated by commas.",
  nothingToEdit: "I couldn’t find that question. Tap the pencil next to an answer instead.",
  sendFailed: "That didn’t go through. Check your connection and try again.",
  backToReview: "Back to your summary.",
} as const;

export const PROGRESS_STEPS = ["Saving your details", "Reviewing your answers", "Preparing your next steps"] as const;

export type AgenticConfig = {
  /** The public title; fills `{{formName}}` in the welcome message. */
  title: string;
  welcomeMessage: string;
  completionMessage: string;
  fields: LeadField[];
};

export type SummaryRow = { key: string; label: string; value: string; skipped: boolean };

export type ChatMessage =
  | { id: number; role: "agent"; kind: "text"; text: string; tone?: "error" }
  | { id: number; role: "agent"; kind: "question"; fieldKey: string; text: string; current?: string }
  | { id: number; role: "user"; kind: "text"; text: string }
  | { id: number; role: "agent"; kind: "summary"; rows: SummaryRow[] }
  | { id: number; role: "agent"; kind: "progress" }
  | { id: number; role: "agent"; kind: "success"; rows: SummaryRow[] };

export type Phase = "asking" | "review" | "submitting" | "done";

export type AgenticState = {
  config: AgenticConfig;
  phase: Phase;
  /** Index into config.fields of the question being asked. */
  index: number;
  answers: LeadData;
  skipped: string[];
  /** Set when a question was reached from the summary, so answering returns there. */
  returnToReview: boolean;
  /** Multi-select picks not yet sent with Done. */
  picks: string[];
  /** How many progress steps have finished while submitting. */
  progressStep: number;
  /** Multi-select picks to start from when a field has no answer yet, by field key. */
  presets: Record<string, string[]>;
  messages: ChatMessage[];
  seq: number;
};

export type AgenticAction =
  | { type: "send"; text: string }
  | { type: "select"; value: string }
  | { type: "toggle"; value: string }
  | { type: "doneChoosing" }
  | { type: "edit"; key: string }
  | { type: "requestEdit" }
  | { type: "confirm" }
  | { type: "progress" }
  | { type: "submitted" }
  | { type: "failed"; field?: string; message?: string }
  | { type: "preset"; key: string; values: string[] }
  | { type: "reset" };

// --- helpers ---

const resolved = (state: Pick<AgenticState, "answers" | "skipped">, key: string) =>
  state.answers[key] !== undefined || state.skipped.includes(key);

export const currentField = (state: AgenticState): LeadField | undefined =>
  state.phase === "asking" ? state.config.fields[state.index] : undefined;

export function summaryRows(state: Pick<AgenticState, "config" | "answers">): SummaryRow[] {
  return state.config.fields.map((field) => {
    const value = state.answers[field.key];
    return {
      key: field.key,
      label: field.label,
      value: value === undefined ? "" : displayAnswer(field, value),
      skipped: value === undefined,
    };
  });
}

export function progress(state: AgenticState) {
  const total = state.config.fields.length;
  const answered = state.config.fields.filter((field) => resolved(state, field.key)).length;
  return { answered, total };
}

function push(state: AgenticState, ...messages: DistributiveOmit<ChatMessage, "id">[]): AgenticState {
  let seq = state.seq;
  const added = messages.map((message) => ({ ...message, id: ++seq }) as ChatMessage);
  return { ...state, seq, messages: [...state.messages, ...added] };
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

const say = (text: string, tone?: "error") => ({ role: "agent" as const, kind: "text" as const, text, ...(tone ? { tone } : {}) });
const user = (text: string) => ({ role: "user" as const, kind: "text" as const, text });

function question(state: AgenticState, index: number) {
  const field = state.config.fields[index];
  const value = state.answers[field.key];
  return {
    role: "agent" as const,
    kind: "question" as const,
    fieldKey: field.key,
    text: agentQuestionFor(field),
    ...(value !== undefined ? { current: displayAnswer(field, value) } : {}),
  };
}

/** Asks the field at `index`, with any lead-in lines first. */
function ask(state: AgenticState, index: number, ...lead: string[]): AgenticState {
  const next = { ...state, phase: "asking" as const, index, picks: pickedFor(state, index) };
  return push(next, ...lead.map((line) => say(line)), question(next, index));
}

/** A multi-select starts from what was already chosen, so editing it keeps the old picks. */
function pickedFor(state: AgenticState, index: number) {
  const field = state.config.fields[index];
  const value = field ? state.answers[field.key] : undefined;
  if (Array.isArray(value)) return value;
  return field && value === undefined ? (state.presets[field.key] ?? []) : [];
}

function review(state: AgenticState, ...lead: string[]): AgenticState {
  const next = { ...state, phase: "review" as const, returnToReview: false, picks: [] };
  return push(next, ...lead.map((line) => say(line)), { role: "agent", kind: "summary", rows: summaryRows(next) });
}

/** Moves on after an answer: back to the summary, or to the first question not yet dealt with. */
function advance(state: AgenticState, ...lead: string[]): AgenticState {
  const nextIndex = state.config.fields.findIndex((field) => !resolved(state, field.key));
  // An edit made from the summary lands back there, because by then nothing is left to ask.
  if (nextIndex === -1) return review(state, ...lead);
  return ask(state, nextIndex, ...lead);
}

function store(state: AgenticState, field: LeadField, value: LeadAnswer | undefined): AgenticState {
  const answers = { ...state.answers };
  if (value === undefined) delete answers[field.key];
  else answers[field.key] = value;
  const skipped = state.skipped.filter((key) => key !== field.key);
  if (value === undefined) skipped.push(field.key);
  return { ...state, answers, skipped };
}

// --- reading what was typed ---

const CONFIRM = /^(looks good|look good|all good|ok|okay|yes|yep|yeah|yup|sure|confirm|submit|send|send it|correct|that'?s (right|correct|it)|perfect|great|lgtm)[.! ]*$/i;
const GO_BACK = /^(go back|back|previous|previous question|undo)[.! ]*$/i;
const START_OVER = /^(start over|start again|restart|reset|begin again)[.! ]*$/i;
const SKIP = /^(skip|skip it|skip this|skip this one|pass)[.! ]*$/i;
const EDIT = /^(?:edit|change|update|fix)\s+(?:my\s+|the\s+)?(.+?)[.! ]*$/i;
const CORRECTION = /\b(actually|change|update|correction|meant|correct(?:ion)?|instead)\b|\bsorry,?\s+it'?s\b|^\s*no\b|^\s*oops\b/i;
const CHANGE_VERB = /\b(change|update|edit|correct|fix)\b/i;

const STOPWORDS = new Set([
  "a", "an", "the", "your", "you", "my", "our", "is", "are", "what", "whats", "which", "who", "how", "do", "does",
  "of", "for", "to", "in", "on", "and", "or", "it", "we", "us", "can", "be", "any", "this", "that", "with", "best",
  "please", "tell", "about", "would", "like", "need", "have", "rough", "roughly",
]);

const words = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 3 && !STOPWORDS.has(word));

/** How strongly a sentence refers to a field, from the words of its key and label. */
function mentionScore(field: LeadField, sentence: string) {
  const said = new Set(words(sentence));
  const terms = new Set([...words(field.key.replace(/_/g, " ")), ...words(field.label)]);
  let matched = 0;
  for (const term of terms) if (said.has(term)) matched++;
  if (!matched) return 0;
  // A whole label said word for word is the strongest reference there is. Then
  // the more of a field's words were said, the likelier it is the one meant, so
  // "my name" picks "Your name" over "Company name".
  const whole = sentence.toLowerCase().includes(field.label.toLowerCase()) ? 5 : 0;
  return whole + matched + matched / terms.size;
}

/** The field a sentence is about, among `candidates`, or null when none or a tie. */
function mentionedField(candidates: LeadField[], sentence: string) {
  let best: LeadField | null = null;
  let bestScore = 0;
  let tie = false;
  for (const field of candidates) {
    const score = mentionScore(field, sentence);
    if (score > bestScore) {
      best = field;
      bestScore = score;
      tie = false;
    } else if (score > 0 && score === bestScore) {
      tie = true;
    }
  }
  return best && !tie ? best : null;
}

/** "Alex not Alexx" → "Alex"; strips a trailing "not …" or "instead of …". */
const dropNegated = (value: string) => value.replace(/\s*,?\s*\b(?:not|instead of|rather than)\b.*$/i, "").trim();

/** What comes after "is", "to", ":" … in a correction: the new value as typed. */
function tailValue(sentence: string) {
  const match = sentence.match(/(?:\bto\b|\bis\b|\bshould be\b|\bas\b|=|:)\s*(.+)$/i);
  if (!match) return null;
  return dropNegated(match[1].replace(/^["“'‘]|["”'’.!]+$/g, "").trim()) || null;
}

/** A value for `field` read out of a correction sentence, already validated. */
function correctionValue(field: LeadField, sentence: string): LeadAnswer | null {
  const cleaned = dropNegated(sentence);
  let raw: LeadAnswer | null = null;

  switch (field.type) {
    case "email":
    case "url":
    case "tel":
    case "number":
      raw = findShapedValue(field, cleaned);
      break;
    case "date": {
      const tail = tailValue(sentence);
      raw = findShapedValue(field, cleaned) ?? (tail ? readTypedAnswer(field, tail) : null);
      break;
    }
    case "select":
    case "radio": {
      const tail = tailValue(sentence);
      raw = (tail ? readTypedAnswer(field, tail) : null) ?? optionsMentioned(fieldOptions(field), cleaned)[0]?.value ?? null;
      break;
    }
    case "checkboxes": {
      const tail = tailValue(sentence);
      raw = tail ? readTypedAnswer(field, tail) : null;
      break;
    }
    case "checkbox":
      raw = null;
      break;
    default: {
      // Free text has no shape to check, so only a short phrase after "is"/"to"
      // counts; a long sentence is far more likely an answer to the question asked.
      const tail = tailValue(sentence);
      raw = tail && tail.split(/\s+/).length <= 8 ? tail : null;
    }
  }

  if (raw === null || raw === "" || (Array.isArray(raw) && !raw.length)) return null;
  const checked = validateAnswer(field, raw);
  return checked.ok && checked.value !== undefined ? checked.value : null;
}

type Correction = { field: LeadField; value: LeadAnswer | null };

/**
 * A message that changes an earlier answer: it has a correction word ("actually",
 * "change", "no, …") or says outright "my <field> is …". The target is the earlier
 * field it names, or failing that the only earlier field whose shape the new value
 * has (an email can only be the email). A correction word with no readable value
 * is not a correction — "No, we don't have a site yet" is an answer.
 */
function readCorrection(state: AgenticState, text: string): Correction | null {
  const current = state.phase === "asking" ? state.config.fields[state.index] : undefined;
  const earlier = state.config.fields.filter((field) => field !== current && resolved(state, field.key));
  if (!earlier.length) return null;

  const hasKeyword = CORRECTION.test(text);
  const named = mentionedField(earlier, text);
  // "My email is …" with no correction word. Not while a long-text question is
  // open: there, "my website is slow" is an answer, not a new website.
  const assignment =
    named &&
    current?.type !== "textarea" &&
    /^\s*(?:my\s+|the\s+|our\s+)?[\w\s'-]{2,60}?\s*(?:is|=|:|should be)\s+\S/i.test(text);

  if (!hasKeyword && !assignment) return null;

  if (named) {
    const value = correctionValue(named, text);
    if (value !== null) return { field: named, value };
    // "change my budget" with nothing to change it to opens that question.
    return CHANGE_VERB.test(text) ? { field: named, value: null } : null;
  }

  if (!hasKeyword) return null;
  for (const type of SHAPED_TYPES) {
    const ofType = earlier.filter((field) => field.type === type);
    if (ofType.length !== 1) continue;
    const value = correctionValue(ofType[0], text);
    if (value !== null) return { field: ofType[0], value };
  }
  return null;
}

/** The field an "edit …" command names, by label or key. */
function editTarget(state: AgenticState, name: string) {
  const fields = state.config.fields;
  const lowered = name.trim().toLowerCase();
  return (
    fields.find((field) => field.label.toLowerCase() === lowered || field.key === lowered.replace(/\s+/g, "_")) ??
    mentionedField(fields, name)
  );
}

// --- the machine ---

export function initialState(config: AgenticConfig, presets: Record<string, string[]> = {}): AgenticState {
  const base: AgenticState = {
    config,
    phase: "asking",
    index: 0,
    answers: {},
    skipped: [],
    returnToReview: false,
    picks: [],
    progressStep: 0,
    presets,
    messages: [],
    seq: 0,
  };
  if (!config.fields.length) return base;
  return ask(base, 0, fillTemplate(config.welcomeMessage, { formName: config.title }));
}

/** Records an answer that has already been read from the message, then moves on. */
function answer(state: AgenticState, field: LeadField, raw: LeadAnswer, shown: string): AgenticState {
  const withUser = push(state, user(shown));
  const checked = validateAnswer(field, raw);
  if (!checked.ok) return push(withUser, say(checked.message, "error"));
  if (checked.value === undefined) {
    if (!canSkip(field)) return push(withUser, say(PHRASES.required, "error"));
    return advance(store(withUser, field, undefined), PHRASES.skipped);
  }
  return advance(store(withUser, field, checked.value), PHRASES.saved);
}

function applyCorrection(state: AgenticState, correction: Correction): AgenticState {
  const { field, value } = correction;
  if (value === null) return openField(state, field.key, PHRASES.editing);

  const next = store(state, field, value);
  const line = PHRASES.updated(field.label, displayAnswer(field, value));
  if (state.phase === "review") return review(next, line);
  // Back to the unfinished question, never past it.
  return ask(next, state.index, line);
}

function openField(state: AgenticState, key: string, ...lead: string[]): AgenticState {
  const index = state.config.fields.findIndex((field) => field.key === key);
  if (index === -1) return push(state, say(PHRASES.nothingToEdit));
  const fromReview = state.phase === "review" || state.returnToReview;
  return ask({ ...state, returnToReview: fromReview }, index, ...lead);
}

function handleText(state: AgenticState, raw: string): AgenticState {
  const text = raw.trim();
  if (!text) return state;
  const withUser = () => push(state, user(text));

  if (state.phase === "review") {
    if (CONFIRM.test(text)) return confirm(withUser());
  }

  if (START_OVER.test(text)) return restart(state);

  if (GO_BACK.test(text)) {
    if (state.phase === "review") return ask({ ...withUser(), returnToReview: true }, state.config.fields.length - 1);
    if (state.index === 0) return push(withUser(), say(PHRASES.firstQuestion));
    return ask(withUser(), state.index - 1);
  }

  if (SKIP.test(text) && state.phase === "asking") {
    const field = state.config.fields[state.index];
    if (!canSkip(field)) return push(withUser(), say(PHRASES.required, "error"));
    return advance(store(withUser(), field, undefined), PHRASES.skipped);
  }

  const correction = readCorrection(state, text);
  if (correction) return applyCorrection(withUser(), correction);

  const edit = text.match(EDIT);
  if (edit) {
    const target = editTarget(state, edit[1]);
    if (target) return openField(withUser(), target.key, PHRASES.editing);
  }

  if (state.phase === "review") return push(withUser(), say(PHRASES.reviewHint));

  const field = state.config.fields[state.index];
  const read = readTypedAnswer(field, text);
  if (read === null) {
    return push(withUser(), say(field.type === "checkboxes" ? PHRASES.chooseOptions : PHRASES.chooseOption, "error"));
  }
  return answer(state, field, read, text);
}

/** A fresh conversation that keeps counting ids, so React never reuses a key from the old one. */
function restart(state: AgenticState): AgenticState {
  const fresh = initialState(state.config, state.presets);
  return { ...fresh, seq: state.seq + fresh.seq, messages: fresh.messages.map((m) => ({ ...m, id: m.id + state.seq })) };
}

function confirm(state: AgenticState): AgenticState {
  if (state.phase !== "review") return state;
  return push({ ...state, phase: "submitting", progressStep: 0 }, { role: "agent", kind: "progress" });
}

export function reducer(state: AgenticState, action: AgenticAction): AgenticState {
  switch (action.type) {
    case "send":
      if (state.phase === "submitting" || state.phase === "done") return state;
      return handleText(state, action.text);

    case "select": {
      const field = currentField(state);
      if (!field) return state;
      const option = fieldOptions(field).find((item) => item.value === action.value);
      if (!option) return state;
      return answer(state, field, option.value, option.label);
    }

    case "toggle": {
      const field = currentField(state);
      if (!field || field.type !== "checkboxes") return state;
      const picks = state.picks.includes(action.value)
        ? state.picks.filter((value) => value !== action.value)
        : [...state.picks, action.value];
      return { ...state, picks };
    }

    case "doneChoosing": {
      const field = currentField(state);
      if (!field || field.type !== "checkboxes") return state;
      const options = fieldOptions(field);
      // Sent in the admin's option order, whatever order they were tapped in.
      const values = options.filter((option) => state.picks.includes(option.value)).map((option) => option.value);
      const shown = values.length ? displayAnswer(field, values) : "None";
      return answer(state, field, values, shown);
    }

    case "edit":
      if (state.phase === "submitting" || state.phase === "done") return state;
      return openField(state, action.key, PHRASES.editing);

    case "requestEdit":
      if (state.phase !== "review") return state;
      return push(state, user("Make an edit"), say(PHRASES.makeAnEdit));

    case "confirm":
      return state.phase === "review" ? confirm(push(state, user("Looks good"))) : state;

    case "progress":
      return state.phase === "submitting"
        ? { ...state, progressStep: Math.min(state.progressStep + 1, PROGRESS_STEPS.length) }
        : state;

    case "submitted":
      if (state.phase !== "submitting") return state;
      return push(
        { ...state, phase: "done", progressStep: PROGRESS_STEPS.length },
        say(state.config.completionMessage),
        { role: "agent", kind: "success", rows: summaryRows(state) },
      );

    case "failed": {
      if (state.phase !== "submitting") return state;
      const back = { ...state, phase: "review" as const, progressStep: 0 };
      const index = action.field ? state.config.fields.findIndex((field) => field.key === action.field) : -1;
      if (index !== -1) {
        return ask({ ...back, phase: "asking", returnToReview: true }, index, action.message ?? PHRASES.sendFailed);
      }
      return review(back, action.message ?? PHRASES.sendFailed);
    }

    case "preset": {
      const prev = state.presets[action.key] ?? [];
      const presets = { ...state.presets, [action.key]: [...new Set([...prev, ...action.values])] };
      // Ticked straight away if that question is open and still unanswered.
      const field = currentField(state);
      const picks =
        field?.key === action.key && state.answers[field.key] === undefined
          ? [...new Set([...state.picks, ...action.values])]
          : state.picks;
      return { ...state, presets, picks };
    }

    case "reset":
      return restart(state);
  }
}
