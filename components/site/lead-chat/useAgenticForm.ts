"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import {
  currentField as currentFieldOf,
  initialState,
  progress as progressOf,
  reducer,
  summaryRows,
  PROGRESS_STEPS,
} from "@/lib/lead-chat/agentic";
import type { LeadData } from "@/lib/lead-chat/fields";
import type { LeadChatConfig, SubmitOutcome } from "@/lib/lead-chat/config";

/** How long each progress step shows before it ticks off. */
export const STEP_MS = 1200;

/**
 * The chat's conversation (a port of the workspace's useAgenticForm). The state
 * machine is the pure reducer in `lib/lead-chat/agentic.ts`; this adds the network
 * and the timing. On confirm the lead is sent while the progress steps tick off,
 * and the success card appears once both are done.
 */
export function useAgenticForm(
  config: LeadChatConfig,
  { submit, presets }: { submit: (data: LeadData) => Promise<SubmitOutcome>; presets?: Record<string, string[]> },
) {
  const [state, dispatch] = useReducer(reducer, null, () =>
    initialState(
      {
        title: config.title,
        welcomeMessage: config.agent.welcomeMessage,
        completionMessage: config.agent.completionMessage,
        fields: config.fields,
      },
      presets,
    ),
  );
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  }, [submit]);

  const submitting = state.phase === "submitting";
  const answers = state.answers;
  // Reused when an effect re-runs for the same answers (React dev), so a lead is never sent twice.
  const inflight = useRef<{ answers: LeadData; promise: Promise<SubmitOutcome> } | null>(null);

  useEffect(() => {
    if (!submitting) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const steps = new Promise<void>((resolve) => {
      PROGRESS_STEPS.forEach((_, index) => {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            dispatch({ type: "progress" });
            if (index === PROGRESS_STEPS.length - 1) resolve();
          }, STEP_MS * (index + 1)),
        );
      });
    });

    if (inflight.current?.answers !== answers) {
      inflight.current = { answers, promise: submitRef.current(answers).catch((): SubmitOutcome => ({ ok: false })) };
    }
    const sent = inflight.current.promise;

    void sent.then(async (outcome) => {
      if (cancelled) return;
      if (!outcome.ok) {
        inflight.current = null;
        timers.forEach(clearTimeout);
        dispatch({ type: "failed", field: outcome.field, message: outcome.message });
        return;
      }
      await steps;
      if (!cancelled) dispatch({ type: "submitted" });
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [submitting, answers]);

  const pills = useMemo(() => summaryRows(state).filter((row) => !row.skipped), [state]);

  return {
    messages: state.messages,
    phase: state.phase,
    currentField: currentFieldOf(state),
    answers: state.answers,
    pills,
    picks: state.picks,
    progress: progressOf(state),
    progressStep: state.progressStep,
    sendMessage: useCallback((text: string) => dispatch({ type: "send", text }), []),
    selectOption: useCallback((value: string) => dispatch({ type: "select", value }), []),
    toggleOption: useCallback((value: string) => dispatch({ type: "toggle", value }), []),
    doneChoosing: useCallback(() => dispatch({ type: "doneChoosing" }), []),
    editField: useCallback((key: string) => dispatch({ type: "edit", key }), []),
    requestEdit: useCallback(() => dispatch({ type: "requestEdit" }), []),
    confirm: useCallback(() => dispatch({ type: "confirm" }), []),
    preset: useCallback((key: string, values: string[]) => dispatch({ type: "preset", key, values }), []),
    restart: useCallback(() => dispatch({ type: "reset" }), []),
  };
}

export type AgenticForm = ReturnType<typeof useAgenticForm>;
