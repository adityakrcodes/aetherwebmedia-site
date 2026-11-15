import { CHOICE_TYPES, fieldOptions, type LeadAnswer, type LeadField, type LeadOption } from "./fields";

export { validateAnswer } from "./fields";

/**
 * Reading and checking one answer at a time, for the agentic chat. Ported from the workspace
 * (aether-admin `lib/lead-forms/answers.ts`); validation lives in `./fields`.
 */

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9@.+\-/ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * The option a typed answer means: an exact label or value first (any case),
 * then the only option that contains what was typed, or is contained in it.
 */
export function matchTypedOption(options: LeadOption[], typed: string): LeadOption | null {
  const text = normalise(typed);
  if (!text) return null;
  const exact = options.find((option) => normalise(option.label) === text || normalise(option.value) === text);
  if (exact) return exact;
  // A 1-based number picks by position ("2" for the second option).
  if (/^\d{1,2}$/.test(text)) {
    const byIndex = options[Number(text) - 1];
    if (byIndex) return byIndex;
  }
  if (text.length < 2) return null;
  const partial = options.filter((option) => {
    const label = normalise(option.label);
    return label.includes(text) || (text.length >= 3 && text.includes(label));
  });
  return partial.length === 1 ? partial[0] : null;
}

/** Every option mentioned in a typed list ("SEO, ads and web"). */
export function matchTypedOptions(options: LeadOption[], typed: string): LeadOption[] | null {
  const parts = typed
    .split(/,|;|\band\b|&|\n/i)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!parts.length) return null;
  const found: LeadOption[] = [];
  for (const part of parts) {
    const option = matchTypedOption(options, part);
    if (!option) return null;
    if (!found.includes(option)) found.push(option);
  }
  return found;
}

/** Options named anywhere in a sentence, longest label first so "Large project" beats "Large". */
export function optionsMentioned(options: LeadOption[], sentence: string): LeadOption[] {
  const text = ` ${normalise(sentence)} `;
  return [...options]
    .sort((a, b) => b.label.length - a.label.length)
    .filter((option) => {
      const label = normalise(option.label);
      const value = normalise(option.value);
      return (label && text.includes(` ${label} `)) || (value && text.includes(` ${value} `));
    });
}

/** A date typed in words ("12 March 2027") as YYYY-MM-DD, or null. ISO input passes through. */
export function readDate(typed: string): string | null {
  const text = typed.trim();
  const iso = text.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (iso) return iso[0];
  const parsed = Date.parse(text);
  if (Number.isNaN(parsed)) return null;
  const date = new Date(parsed);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * The raw answer a typed message gives for a field, before validation: the
 * matching option value(s) for a choice, a date normalised to ISO, the text as
 * typed otherwise. Null means the text can't be read as an answer to this field.
 */
export function readTypedAnswer(field: LeadField, typed: string): LeadAnswer | null {
  const options = fieldOptions(field);
  switch (field.type) {
    case "select":
    case "radio":
      return matchTypedOption(options, typed)?.value ?? null;
    case "checkboxes":
      return matchTypedOptions(options, typed)?.map((option) => option.value) ?? null;
    case "checkbox":
      return /^(y|yes|yeah|yep|sure|ok|okay|i agree|agree|tick|true)\b/i.test(typed.trim()) ? "yes" : null;
    case "date":
      return readDate(typed) ?? typed.trim();
    default:
      return typed.trim();
  }
}

const EMAIL = /[^\s@<>(),;:"']+@[^\s@<>(),;:"']+\.[a-z]{2,}/i;
const URL_LIKE = /\b(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?/i;
const PHONE_LIKE = /\+?\d[\d\s().\-/]{5,28}\d/;
const NUMBER = /-?\d+(?:[.,]\d+)?/;

/** A value of the field's shape found anywhere in a sentence, for types that have a recognisable shape. */
export function findShapedValue(field: LeadField, sentence: string): string | null {
  switch (field.type) {
    case "email":
      return sentence.match(EMAIL)?.[0] ?? null;
    case "url": {
      const withoutEmails = sentence.replace(new RegExp(EMAIL, "gi"), " ");
      return withoutEmails.match(URL_LIKE)?.[0] ?? null;
    }
    case "tel":
      return sentence.match(PHONE_LIKE)?.[0].trim() ?? null;
    case "number":
      return sentence.match(NUMBER)?.[0] ?? null;
    case "date": {
      const iso = sentence.match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0];
      return iso ?? null;
    }
    default:
      return null;
  }
}

/** Types whose value can be picked out of a sentence without knowing which field it was for. */
export const SHAPED_TYPES = ["email", "url", "tel"] as const;

export const isChoice = (field: LeadField) => CHOICE_TYPES.includes(field.type);
