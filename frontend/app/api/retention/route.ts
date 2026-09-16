import { NextResponse } from "next/server";

import { getWriteClient } from "@/sanity/writeClient";
import { RETENTION_YEARS, retentionCutoff } from "@/lib/retention";

/**
 * Deletes Join submissions that have outlived the retention period published
 * in the Privacy Policy.
 *
 * The policy says the record "is deleted from the content management system on
 * a schedule, so that nobody has to remember to do it". This route is the
 * working end of that schedule; `.github/workflows/retention.yml` calls it once
 * a day. The cron lives in Actions rather than in Vercel Cron because the
 * Hobby plan caps cron jobs at a daily run and two jobs total, and because a
 * failing Actions run emails somebody — a deletion job that silently stops
 * working turns a public promise into a false statement.
 *
 * Authorisation is a shared secret, not a signature: the only caller is our
 * own cron, so there is no third party whose identity needs proving.
 */

/**
 * Cap per run, so one transaction cannot grow unbounded on a dataset that has
 * never been swept. Whatever is left over goes on the next daily run, and the
 * response says when that is the case.
 */
const MAX_PER_RUN = 100;

/**
 * Oldest first, so a backlog drains in the order the records aged.
 *
 * `coalesce` falls back to `_createdAt` for any record without `submittedAt`:
 * the Join route always sets it, but a record that somehow lacked it would
 * otherwise be immortal — never old enough to collect, and never deleted.
 *
 * The cap is interpolated rather than passed as a parameter because GROQ wants
 * literal slice bounds; it is a module constant, never user input.
 */
const DUE_QUERY = `*[_type == "joinSubmission" && coalesce(submittedAt, _createdAt) < $cutoff]
  | order(coalesce(submittedAt, _createdAt) asc) [0...${MAX_PER_RUN}] { _id }`;

/**
 * Compares without leaking where two secrets first differ. The length is not
 * hidden, which is the usual and accepted trade-off.
 */
function secretsMatch(presented: string, expected: string): boolean {
  if (presented.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < presented.length; i += 1) {
    diff |= presented.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

function bearer(req: Request): string {
  const header = req.headers.get("authorization") ?? "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

export async function POST(req: Request) {
  const secret = process.env.RETENTION_SECRET;
  if (!secret) {
    console.error("[api/retention] RETENTION_SECRET not set — refusing to run");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  if (!secretsMatch(bearer(req), secret)) {
    console.warn("[api/retention] Rejected a call with a bad or missing secret");
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }

  const sanity = getWriteClient();
  if (!sanity) {
    console.error("[api/retention] SANITY_API_WRITE_TOKEN not set — nothing can be deleted");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // A way to see what a run would remove before letting it remove anything.
  const dryRun = new URL(req.url).searchParams.get("dryRun") === "1";
  const cutoff = retentionCutoff().toISOString();

  let due: string[];
  try {
    const rows = await sanity.fetch<{ _id: string }[]>(DUE_QUERY, { cutoff });
    due = rows.map((row) => row._id);
  } catch (e) {
    console.error("[api/retention] Query for expired submissions failed:", e);
    return NextResponse.json({ ok: false, error: "query_failed" }, { status: 500 });
  }

  // Hitting the cap means there is almost certainly more waiting.
  const more = due.length === MAX_PER_RUN;

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      retentionYears: RETENTION_YEARS,
      cutoff,
      due: due.length,
      more,
    });
  }

  if (due.length > 0) {
    try {
      await due
        .reduce((tx, id) => tx.delete(id), sanity.transaction())
        .commit({ visibility: "async" });
    } catch (e) {
      // 500 so the cron run goes red rather than reporting a success it did
      // not have.
      console.error("[api/retention] Deleting expired submissions failed:", e);
      return NextResponse.json({ ok: false, error: "delete_failed" }, { status: 500 });
    }
  }

  console.info(
    `[api/retention] Deleted ${due.length} submission(s) older than ${cutoff}${
      more ? " — more remain for the next run" : ""
    }`,
  );

  return NextResponse.json({
    ok: true,
    retentionYears: RETENTION_YEARS,
    cutoff,
    deleted: due.length,
    more,
  });
}
