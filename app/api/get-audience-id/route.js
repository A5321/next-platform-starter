import { NextResponse } from "next/server";

export async function GET() {
  const adminKey = process.env.RESEND_ADMIN_KEY;
  if (!adminKey) {
    return NextResponse.json({ error: "RESEND_ADMIN_KEY not set" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/audiences", {
    headers: { Authorization: `Bearer ${adminKey}` },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
