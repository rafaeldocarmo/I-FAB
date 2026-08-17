import type { ReactNode } from "react";

/**
 * Shared shell for the Privacy Policy / Terms of Use pages.
 *
 * These documents are scaffolds: the factual sections describe what the site
 * actually does (see the Join and Contact the Board forms), but every
 * organisational and legal determination is left as an explicit
 * `[[TO CONFIRM: …]]` placeholder. `draft` renders the review banner and keeps
 * the page out of search indexes until it is signed off.
 */

export type LegalSection = {
  heading: string;
  /** Paragraphs of body copy. */
  body?: string[];
  /** Optional bulleted list rendered after `body`. */
  bullets?: string[];
};

type Props = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  draft?: boolean;
  children?: ReactNode;
};

const PLACEHOLDER_RE = /(\[\[TO CONFIRM:[^\]]*\]\])/g;

/** Highlights `[[TO CONFIRM: …]]` markers so unfinished copy is impossible to miss. */
function withPlaceholders(text: string): ReactNode[] {
  return text.split(PLACEHOLDER_RE).map((part, i) =>
    part.startsWith("[[TO CONFIRM:") ? (
      <mark
        key={i}
        className="rounded bg-[#FEF3C7] px-1.5 py-0.5 font-semibold text-[#92400E]"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function LegalDocument({
  title,
  intro,
  lastUpdated,
  sections,
  draft = false,
}: Props) {
  return (
    <section className="bg-white px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1
          className="mb-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight"
          style={{ color: "#081849" }}
        >
          {title}
        </h1>
        <p className="mb-8 text-sm" style={{ color: "#6B7280" }}>
          Last updated: {lastUpdated}
        </p>

        {draft ? (
          <div
            className="mb-10 rounded-xl border-2 border-[#F59E0B] bg-[#FFFBEB] p-5"
            role="note"
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-[#92400E]">
              Draft — not legal advice
            </p>
            <p className="text-sm leading-relaxed text-[#78350F]">
              This document is an unreviewed scaffold. It has not been checked by a
              qualified data protection or legal adviser, and every highlighted
              placeholder below must be completed before publication. Do not rely on
              it as a statement of i-FAB&rsquo;s legal position in its current form.
            </p>
          </div>
        ) : null}

        <p
          className="mb-10 text-base leading-relaxed md:text-lg"
          style={{ color: "#374151" }}
        >
          {withPlaceholders(intro)}
        </p>

        <div className="space-y-10">
          {sections.map((section, index) => (
            <div key={section.heading}>
              <h2
                className="mb-3 text-lg font-bold md:text-xl"
                style={{ color: "#081849" }}
              >
                {index + 1}. {section.heading}
              </h2>
              {section.body?.map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-3 text-base leading-relaxed"
                  style={{ color: "#374151" }}
                >
                  {withPlaceholders(paragraph)}
                </p>
              ))}
              {section.bullets ? (
                <ul
                  className="mt-2 list-disc space-y-2 pl-6 marker:text-[#213885]"
                  style={{ color: "#374151" }}
                >
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="text-base leading-relaxed">
                      {withPlaceholders(bullet)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
