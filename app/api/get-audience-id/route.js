import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.resend.com/audiences", {
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
