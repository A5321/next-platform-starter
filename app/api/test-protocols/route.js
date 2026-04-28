import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { currentRelationshipProtocols } = await import("../../../lib/protocols/currentRelationship");
    const keys = Object.keys(currentRelationshipProtocols);
    return NextResponse.json({ success: true, keys });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
