import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  return NextResponse.json({
    overall_risk_level: "Moderate",
    indices: {
      reciprocity_score: 0.5,
      initiative_balance_index: 0.3,
      emotional_stability_index: 0.4,
      boundary_violation_probability: 0.6,
      communication_clarity_index: 0.35,
      pattern_recurrence_probability: 0.8,
      long_term_stability_forecast: 0.3,
    },
    summary:
      "This relationship shows moderate structural risk driven by asymmetry and unclear communication. Boundaries are at risk of being crossed if the current pattern continues.",
  });
}
