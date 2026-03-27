"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const ROLES = [
  { value: "", label: "Choose a role" },
  { value: "academic", label: "Academic" },
  { value: "industry", label: "Industry" },
  { value: "clinician", label: "Clinician" },
  { value: "other", label: "Other" },
] as const;

const inputClass =
  "w-full rounded-lg border-2 border-[#213885] bg-white px-4 py-3 text-[15px] text-[#081849] shadow-sm transition-[box-shadow,border-color] placeholder:text-[#9CA3AF] focus:border-[#081849] focus:outline-none focus:ring-2 focus:ring-[#213885]/25";

const labelClass =
  "mb-2 block text-left text-[11px] font-bold uppercase tracking-[0.12em] text-[#213885]";

export function JoinForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      employer: String(fd.get("employer") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      country: String(fd.get("country") ?? "").trim(),
      mainRole: String(fd.get("mainRole") ?? "").trim(),
      otherRole: String(fd.get("otherRole") ?? "").trim(),
    };

    if (!payload.fullName || !payload.email || !payload.mainRole) {
      setErrorMessage("Please fill in your name, email, and main role.");
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
          Your details have been received. The i-FAB team will be in touch when appropriate.
        </p>
        <button
          type="button"
          className="mt-8 text-sm font-semibold text-[#213885] underline-offset-4 hover:underline"
          onClick={() => setStatus("idle")}
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
            <select
              id="join-mainRole"
              name="mainRole"
              className={`${inputClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23213885' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              }}
              defaultValue=""
              required
            >
              {ROLES.map((r) => (
                <option key={r.value || "placeholder"} value={r.value} disabled={r.value === ""}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="join-otherRole" className={labelClass}>
              Other (if main role is not an option)
            </label>
            <input
              id="join-otherRole"
              name="otherRole"
              type="text"
              className={inputClass}
              placeholder="Describe your role if needed"
            />
          </div>
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
            ) : (
              "Send your data"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
