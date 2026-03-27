import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ["fullName", "email", "mainRole"] as const;
    for (const key of required) {
      if (typeof body[key] !== "string" || !String(body[key]).trim()) {
        return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
      }
    }
    // Integrate with email/CRM later (e.g. Resend, Sanity, Zapier).
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
