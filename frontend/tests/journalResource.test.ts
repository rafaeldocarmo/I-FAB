import { describe, expect, it } from "vitest";
import {
  journalResourceButtonLabel,
  resolveCongressJournalItems,
} from "@/lib/journalResource";
import type { Congress } from "@/lib/types";

const base = { _id: "c", title: "Congress" } as Congress;
const congress = (extra: Partial<Congress>): Congress => ({ ...base, ...extra });

describe("resolveCongressJournalItems — journalItems (current path)", () => {
  it("resolves links, PDFs and images, keeping the CMS order", () => {
    const items = resolveCongressJournalItems(
      congress({
        journalItems: [
          { kind: "link", url: "https://example.org/proceedings", label: "Proceedings" },
          {
            kind: "pdf",
            label: "Programme",
            file: { asset: { url: "https://cdn.sanity.io/f.pdf", originalFilename: "prog.pdf" } },
          },
          { kind: "image", label: "Poster", image: { asset: { url: "https://cdn.sanity.io/i.png" } } },
        ],
      }),
    );

    expect(items).toEqual([
      { href: "https://example.org/proceedings", kind: "link", label: "Proceedings" },
      { href: "https://cdn.sanity.io/f.pdf", kind: "pdf", label: "Programme", fileName: "prog.pdf" },
      { href: "https://cdn.sanity.io/i.png", kind: "image", label: "Poster" },
    ]);
  });

  it("skips rows whose target is missing or blank", () => {
    const items = resolveCongressJournalItems(
      congress({
        journalItems: [
          { kind: "link", url: "   " },
          { kind: "pdf", file: { asset: { url: null } } },
          { kind: "image", image: { asset: {} } },
          { kind: "link", url: "https://example.org/ok" },
        ],
      }),
    );
    expect(items).toHaveLength(1);
    expect(items[0].href).toBe("https://example.org/ok");
  });

  it("reports a PDF with no originalFilename as null rather than undefined", () => {
    const [item] = resolveCongressJournalItems(
      congress({
        journalItems: [{ kind: "pdf", file: { asset: { url: "https://cdn/x.pdf" } } }],
      }),
    );
    expect(item.fileName).toBeNull();
  });
});

describe("resolveCongressJournalItems — legacy fallback", () => {
  it("uses the legacy URL when journalItems is absent", () => {
    expect(
      resolveCongressJournalItems(
        congress({ journalUrl: "https://old.example.org", journalLinkType: "link" }),
      ),
    ).toEqual([{ href: "https://old.example.org", kind: "link", label: null, fileName: null }]);
  });

  it("uses the legacy PDF, carrying the original filename", () => {
    expect(
      resolveCongressJournalItems(
        congress({
          journalLinkType: "pdf",
          journalPdf: { asset: { url: "https://cdn/old.pdf", originalFilename: "old.pdf" } },
        }),
      ),
    ).toEqual([{ href: "https://cdn/old.pdf", kind: "pdf", label: null, fileName: "old.pdf" }]);
  });

  it("defaults to a link when journalLinkType is unset", () => {
    const [item] = resolveCongressJournalItems(congress({ journalUrl: "https://x.org" }));
    expect(item.kind).toBe("link");
  });

  it("falls back when journalItems exists but yields nothing usable", () => {
    const items = resolveCongressJournalItems(
      congress({
        journalItems: [{ kind: "link", url: "" }],
        journalUrl: "https://fallback.example.org",
      }),
    );
    expect(items).toEqual([
      { href: "https://fallback.example.org", kind: "link", label: null, fileName: null },
    ]);
  });

  it("returns nothing when there is no journal information at all", () => {
    expect(resolveCongressJournalItems(congress({}))).toEqual([]);
    expect(resolveCongressJournalItems(congress({ journalItems: [] }))).toEqual([]);
  });
});

describe("journalResourceButtonLabel", () => {
  const item = { href: "h", kind: "link" as const, label: null };

  it("prefers the CMS label when there is one", () => {
    expect(journalResourceButtonLabel({ ...item, label: " Proceedings " }, 0, 3)).toBe(
      "Proceedings",
    );
  });

  it("says Learn More when it is the only action", () => {
    expect(journalResourceButtonLabel(item, 0, 1)).toBe("Learn More");
  });

  it("falls back to the kind when there are several unlabelled actions", () => {
    expect(journalResourceButtonLabel({ ...item, kind: "pdf" }, 0, 2)).toBe("PDF");
    expect(journalResourceButtonLabel({ ...item, kind: "image" }, 1, 2)).toBe("Image");
    expect(journalResourceButtonLabel(item, 2, 3)).toBe("Link");
  });
});
