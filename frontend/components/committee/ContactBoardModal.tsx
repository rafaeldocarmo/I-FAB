"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { Loader2, X, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border-2 border-[#213885] bg-white px-4 py-3 text-[15px] text-[#081849] shadow-sm transition-[box-shadow,border-color] placeholder:text-[#9CA3AF] focus:border-[#081849] focus:outline-none focus:ring-2 focus:ring-[#213885]/25";

const labelClass =
  "mb-2 block text-left text-[11px] font-bold uppercase tracking-[0.12em] text-[#213885]";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ContactBoardModal({ open, onClose }: Props) {
  const titleId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "loading") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, status]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact-board", {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close dialog"
        onClick={() => {
          if (status !== "loading") onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] max-h-[min(90vh,800px)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#213885]/20 bg-white p-6 shadow-[0_24px_80px_rgba(8,24,73,0.2)] sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="text-xl font-bold leading-tight text-[#081849]"
          >
            Contact the Board
          </h2>
          <button
            type="button"
            className="-m-1 rounded-lg p-1 text-[#6B7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#081849] disabled:opacity-40"
            onClick={() => onClose()}
            disabled={status === "loading"}
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {status === "success" ? (
          <div className="py-4 text-center" role="status">
            <CheckCircle2
              className="mx-auto mb-4 h-12 w-12 text-[#213885]"
              strokeWidth={1.5}
            />
            <p className="mb-2 text-lg font-semibold text-[#081849]">
              Message sent
            </p>
            <p className="text-sm leading-relaxed text-[#6B7280]">
              Thank you. The board will receive your email and can reply to you
              directly.
            </p>
            <button
              type="button"
              className="mt-8 rounded-xl bg-[#213885] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <div>
                <label htmlFor="board-contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="board-contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Your full name"
                  required
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label htmlFor="board-contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="board-contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  placeholder="you@institution.org"
                  required
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label htmlFor="board-contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="board-contact-message"
                  name="message"
                  rows={6}
                  className={`${inputClass} min-h-[140px] resize-y`}
                  placeholder="Write your message…"
                  required
                  disabled={status === "loading"}
                />
              </div>
            </div>

            {errorMessage ? (
              <p
                className="mt-4 text-center text-sm font-medium text-red-600"
                role="alert"
              >
                {errorMessage}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl border-2 border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[#f9fafb]"
                onClick={() => onClose()}
                disabled={status === "loading"}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-w-[160px] cursor-pointer items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_8px_28px_rgba(33,56,133,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(33,56,133,0.42)] disabled:translate-y-0 disabled:opacity-70"
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
                  "Send message"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
