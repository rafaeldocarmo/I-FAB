"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  COLLECTION_NOTICE,
  COMMUNICATIONS_CONSENT_TEXT,
} from "@/lib/consent";
import {
  DEFAULT_PURPOSE,
  PURPOSES,
  PURPOSE_LABEL,
  parsePurpose,
  requiresMessage,
  type Purpose,
} from "@/lib/purpose";

const inputClass =
  "w-full rounded-lg border-2 border-[#213885] bg-white px-4 py-3 text-[15px] text-[#081849] shadow-sm transition-[box-shadow,border-color] placeholder:text-[#9CA3AF] focus:border-[#081849] focus:outline-none focus:ring-2 focus:ring-[#213885]/25";

const labelClass =
  "mb-2 block text-left text-[11px] font-bold uppercase tracking-[0.12em] text-[#213885]";

export function JoinForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  /**
   * Controlled, because the subject decides whether the message box is
   * required and what the button and the confirmation say.
   */
  const [purpose, setPurpose] = useState<Purpose>(DEFAULT_PURPOSE);
  const messageRequired = requiresMessage(purpose);

  /**
   * The Scientific Board page sends people here with a "Contact the Board"
   * button, so honour the subject it asks for rather than landing them on the
   * wrong one.
   *
   * Read after mount, not during render: the prerendered page has no query
   * string, so picking one up while rendering would mismatch on hydration.
   */
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get("purpose");
    if (asked) setPurpose(parsePurpose(asked));
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      purpose,
      fullName: String(fd.get("fullName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      employer: String(fd.get("employer") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      country: String(fd.get("country") ?? "").trim(),
      mainRole: String(fd.get("mainRole") ?? "").trim(),
      researchLine: String(fd.get("researchLine") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      // An unchecked box is absent from FormData entirely.
      communicationsConsent: fd.get("communicationsConsent") === "on",
    };

    if (!payload.fullName || !payload.email || !payload.mainRole) {
      setErrorMessage("Please fill in your name, email, and main role.");
      return;
    }

    if (messageRequired && !payload.message) {
      setErrorMessage("Please write the message you would like the board to read.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let code = "";
        try {
          const data = (await res.json()) as { error?: string };
          code = data.error ?? "";
        } catch {
          /* ignore */
        }
        if (res.status === 503 && code === "not_configured") {
          throw new Error("not_configured");
        }
        throw new Error("Request failed");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("idle");
      if (err instanceof Error && err.message === "not_configured") {
        setErrorMessage(
          "This form is not configured yet. Please email info@i-fab.org directly.",
        );
      } else {
        setErrorMessage(
          "Something went wrong. Please try again or email info@i-fab.org.",
        );
      }
    }
  }

  if (status === "success") {
    return (
      <div
        className="mx-auto max-w-lg rounded-2xl border border-[#213885]/20 bg-[#ECDFD2] px-8 py-14 text-center shadow-[0_20px_60px_rgba(8,24,73,0.08)]"
        role="status"
      >
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-[#213885]" strokeWidth={1.5} />
        <h2 className="mb-2 text-xl font-bold text-[#081849]">Thank you</h2>
        <p className="text-[15px] leading-relaxed text-[#6B7280]">
          {purpose === "contact"
            ? "Your message has been received. The board can reply to you directly."
            : "Your details have been received. The i-FAB team will be in touch when appropriate."}
        </p>
        <button
          type="button"
          className="mt-8 text-sm font-semibold text-[#213885] underline-offset-4 hover:underline"
          onClick={() => {
            setPurpose(DEFAULT_PURPOSE);
            setStatus("idle");
          }}
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl"
      noValidate
    >
      <div className="rounded-2xl border border-[#213885]/20 p-6 shadow-[0_24px_80px_rgba(8,24,73,0.07)] sm:p-8 md:p-10">
        {/*
          One form serves both purposes, and it asks for the same details
          either way. The only thing that changes is what the sender wants
          back, which is what this decides.
        */}
        <div className="mb-6 md:mb-7 md:max-w-sm">
          <label htmlFor="join-purpose" className={labelClass}>
            Subject
          </label>
          <select
            id="join-purpose"
            name="purpose"
            className={`${inputClass} cursor-pointer appearance-none bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23213885' d='M1.41 0 6 4.58 10.59 0 12 1.41l-6 6-6-6z'/%3E%3C/svg%3E\")",
            }}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as Purpose)}
          >
            {PURPOSES.map((option) => (
              <option key={option} value={option}>
                {PURPOSE_LABEL[option]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          <div>
            <label htmlFor="join-fullName" className={labelClass}>
              Full name
            </label>
            <input
              id="join-fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              className={inputClass}
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="join-email" className={labelClass}>
              Email address
            </label>
            <input
              id="join-email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClass}
              placeholder="you@institution.org"
              required
            />
          </div>
          <div>
            <label htmlFor="join-employer" className={labelClass}>
              Employer
            </label>
            <input
              id="join-employer"
              name="employer"
              type="text"
              autoComplete="organization"
              className={inputClass}
              placeholder="University, hospital, company…"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-7 md:grid-cols-2 md:gap-7">
          <div>
            <label htmlFor="join-city" className={labelClass}>
              City
            </label>
            <input
              id="join-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              className={inputClass}
              placeholder="City"
            />
          </div>
          <div>
            <label htmlFor="join-country" className={labelClass}>
              Country
            </label>
            <input
              id="join-country"
              name="country"
              type="text"
              autoComplete="country-name"
              className={inputClass}
              placeholder="Country"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-7 md:grid-cols-2 md:gap-7">
          <div>
            <label htmlFor="join-mainRole" className={labelClass}>
              Main role
            </label>
            <input
              id="join-mainRole"
              name="mainRole"
              type="text"
              autoComplete="organization-title"
              className={inputClass}
              placeholder="Researcher, podiatrist, engineer…"
              required
            />
          </div>
          <div>
            <label htmlFor="join-researchLine" className={labelClass}>
              Research line
            </label>
            <input
              id="join-researchLine"
              name="researchLine"
              type="text"
              className={inputClass}
              placeholder="Your area of research"
            />
          </div>
        </div>

        <div className="mt-6 md:mt-7">
          <label htmlFor="join-message" className={labelClass}>
            {messageRequired
              ? "Your message"
              : "Anything else you would like to tell us?"}
          </label>
          <textarea
            id="join-message"
            name="message"
            rows={6}
            maxLength={5000}
            className={`${inputClass} min-h-[140px] resize-y`}
            placeholder={
              messageRequired
                ? "Write your message to the board…"
                : "Your interests, what you hope to get from i-FAB, or anything else…"
            }
            required={messageRequired}
          />
        </div>

        {/*
          Two deliberately separate things: the notice is information we owe
          everyone, the checkbox is consent for a different purpose. Bundling
          them into a single "I accept" would invalidate the consent.
        */}
        <div className="mt-8 rounded-xl border border-[#213885]/15 bg-[#f9f7f5] p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="communicationsConsent"
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#213885]"
            />
            <span className="text-left text-sm leading-relaxed text-[#374151]">
              {COMMUNICATIONS_CONSENT_TEXT}
            </span>
          </label>

          <p className="mt-4 border-t border-[#213885]/10 pt-4 text-left text-xs leading-relaxed text-[#6B7280]">
            {COLLECTION_NOTICE}
          </p>
        </div>

        {errorMessage ? (
          <p className="mt-6 text-center text-sm font-medium text-red-600" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-w-[220px] cursor-pointer items-center justify-center gap-2 rounded-xl px-10 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_28px_rgba(33,56,133,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(33,56,133,0.42)] disabled:translate-y-0 disabled:opacity-70"
            style={{
              background: "linear-gradient(135deg, #213885 0%, #081849 100%)",
            }}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : messageRequired ? (
              "Send message"
            ) : (
              "Send your data"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
