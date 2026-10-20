"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { EmberPill } from "@/components/brand/Mark";
import { leadForm, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent";
type Issue = { path?: (string | number)[]; message?: string };

const fields = [
  { key: "name", label: "Your name", type: "text", autoComplete: "name", wide: true },
  { key: "email", label: "Email", type: "email", autoComplete: "email", wide: false },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel", wide: false },
] as const;

const input =
  "mt-2 h-12 w-full rounded-full bg-furnace-2 px-5 text-ember ring-1 ring-inset ring-ember-line transition-shadow duration-200 hover:ring-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-ember/70";

const chip =
  "group/chip inline-flex h-10 cursor-pointer select-none items-center gap-1.5 rounded-full px-4 text-sm text-ember-2 ring-1 ring-inset ring-ember-line transition-colors duration-200 hover:text-ember hover:ring-white/25 has-checked:bg-ember has-checked:text-furnace has-checked:ring-ember has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ember";

/**
 * The enquiry form, for dark stages. Posts JSON to the workspace and shows its field errors in place.
 * Without JavaScript it is a plain form post to the same endpoint.
 * `service` pre-selects a service, e.g. from a service page's call to action. `header` shows until it is sent.
 */
export default function LeadForm({
  service,
  header,
  className,
  onDone,
}: {
  service?: string;
  header?: React.ReactNode;
  className?: string;
  onDone?: () => void;
}) {
  const id = useId();
  const [services, setServices] = useState<string[]>(service ? [service] : []);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState("");
  const doneRef = useRef<HTMLHeadingElement>(null);

  // Opening the form from another service's button adds that service to the selection.
  useEffect(() => {
    if (service) setServices((s) => (s.includes(service) ? s : [...s, service]));
  }, [service]);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const toggle = (value: string) =>
    setServices((s) => (s.includes(value) ? s.filter((v) => v !== value) : [...s, value]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const budget = text("budget");

    setStatus("sending");
    setAlert("");
    setErrors({});
    try {
      const res = await fetch(leadForm.url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: text("name"),
          email: text("email"),
          phone: text("phone"),
          ...(budget && { budget }),
          ...(services.length > 0 && { services }),
          _hp: text("_hp"),
          _page: location.href,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", {
          form: "lead-form",
          services: services.join(", "),
        });
        return;
      }

      setStatus("idle");
      if (res.status === 400) {
        const body = (await res.json().catch(() => null)) as { error?: string; issues?: Issue[] } | null;
        const next: Record<string, string> = {};
        for (const issue of body?.issues ?? []) {
          const key = String(issue.path?.[0] ?? "");
          if (key && !next[key]) next[key] = issue.message ?? "Check this field";
        }
        setErrors(next);
        setAlert(body?.error ?? "Please check the highlighted fields.");
        const first = Object.keys(next)[0];
        if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      } else if (res.status === 429) {
        setAlert(`Too many attempts. Wait a minute and try again, or email us at ${site.email}.`);
      } else {
        setAlert(`Something went wrong on our side. Try again, or email us at ${site.email}.`);
      }
    } catch {
      setStatus("idle");
      setAlert(`We couldn't send that. Check your connection and try again, or email us at ${site.email}.`);
    }
  }

  // Changing a field clears its error.
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name;
    if (!errors[name]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  if (status === "sent") {
    return (
      <div role="status" className={cn("flex flex-col items-start", className)}>
        <span className="grid size-12 place-items-center rounded-full bg-ember text-furnace">
          <IconCheck size={22} stroke={2.25} aria-hidden />
        </span>
        <h3 ref={doneRef} tabIndex={-1} className="mt-6 text-2xl font-medium tracking-[-0.035em] focus:outline-none sm:text-3xl">
          Enquiry sent.
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-ember-2">{leadForm.success}</p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-8 inline-flex h-12 items-center rounded-full px-6 font-medium ring-1 ring-inset ring-ember-line transition-colors hover:bg-white/8"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  const errorId = (key: string) => (errors[key] ? `${id}-${key}-error` : undefined);
  const fieldError = (key: string) =>
    errors[key] && (
      <p id={errorId(key)} className="mt-2 flex items-center gap-1.5 pl-5 text-sm text-ember">
        <IconAlertCircle size={15} stroke={2} aria-hidden className="shrink-0" />
        {errors[key]}
      </p>
    );

  return (
    <>
      {header}
      <form
        action={leadForm.url}
        method="post"
        onSubmit={onSubmit}
        onChange={onChange}
        aria-busy={status === "sending"}
        className={cn("grid gap-6", className)}
      >
        <div className="grid gap-x-3 gap-y-5 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className={cn(f.wide && "sm:col-span-2")}>
              <label htmlFor={`${id}-${f.key}`} className="pl-5 text-sm text-ember-2">
                {f.label}
              </label>
              <input
                id={`${id}-${f.key}`}
                name={f.key}
                type={f.type}
                autoComplete={f.autoComplete}
                required
                aria-invalid={!!errors[f.key] || undefined}
                aria-describedby={errorId(f.key)}
                className={input}
              />
              {fieldError(f.key)}
            </div>
          ))}
        </div>

        <fieldset aria-describedby={errorId("services")}>
          <legend className="text-sm text-ember-2">
            Services you require <span className="text-ember-3">· pick any</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {leadForm.services.map((s) => (
              <label key={s} className={chip}>
                <input
                  type="checkbox"
                  name="services"
                  value={s}
                  checked={services.includes(s)}
                  onChange={() => toggle(s)}
                  className="sr-only"
                />
                <IconCheck size={14} stroke={2.5} aria-hidden className="-ml-0.5 hidden group-has-checked/chip:block" />
                {s}
              </label>
            ))}
          </div>
          {fieldError("services")}
        </fieldset>

        <fieldset aria-describedby={errorId("budget")}>
          <legend className="text-sm text-ember-2">
            Rough budget <span className="text-ember-3">· optional</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {leadForm.budgets.map((b) => (
              <label key={b} className={chip}>
                <input type="radio" name="budget" value={b} className="sr-only" />
                {b}
              </label>
            ))}
          </div>
          {fieldError("budget")}
        </fieldset>

        {/* Spam trap: hidden from people, left empty. */}
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />

        <div className="pt-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex h-12 items-center gap-3 self-start whitespace-nowrap rounded-full bg-ember pl-1.5 pr-6 text-[0.95rem] font-medium text-furnace transition-[transform,background-color] duration-300 ease-expo hover:bg-white active:scale-[0.98] disabled:cursor-wait sm:self-auto"
            >
              <span className="text-[2.35rem] leading-none transition-transform duration-500 ease-expo group-hover:scale-110">
                {/* The streaks run while sending, as the progress indicator. */}
                <EmberPill still={status !== "sending"} />
              </span>
              {status === "sending" ? "Sending…" : leadForm.submitLabel}
            </button>
            <p className="text-sm text-ember-3">We reply within 24 hours.</p>
          </div>
          {/* Always rendered, so screen readers announce what is put in it. */}
          <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-ember empty:mt-0">
            {alert && <IconAlertCircle size={16} stroke={2} aria-hidden className="mt-0.5 shrink-0" />}
            {alert}
          </p>
        </div>
      </form>
    </>
  );
}
