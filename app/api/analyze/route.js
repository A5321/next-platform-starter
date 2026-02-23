import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { scenario, answers, narrative } = body;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 }
    );
  }

  const systemPrompt = `
You are a structured interpersonal analysis engine.

Analyze the relationship narrative and answers objectively using this index framework:

1. Reciprocity Score (0–1)
- How balanced emotional, time, and practical investment is.
- 0 = one person carries most of the connection.
- 1 = both show up in roughly comparable ways.

2. Initiative Balance Index (0–1)
- Who moves the connection forward.
- 0 = almost all initiative comes from one side.
- 1 = both sides regularly start and move things forward.

3. Emotional Stability Index (0–1)
- How predictable the emotional climate is.
- 0 = frequent sharp mood swings and sudden shifts.
- 1 = mostly steady reactions with understandable changes.

4. Boundary Violation Probability (0–1)
- How likely it is that personal boundaries get crossed.
- 0 = boundaries are consistently respected.
- 1 = boundaries are regularly tested, pressured, or overridden.

5. Communication Clarity Index (0–1)
- How clear signals and intentions are.
- 0 = high ambiguity, mixed or manipulative signals.
- 1 = mostly straightforward, transparent communication.

6. Pattern Recurrence Probability (0–1)
- How likely this dynamic is to repeat under similar conditions.

7. Long-Term Stability Forecast (0–1)
- How sustainable this dynamic looks over time if nothing changes.

When scoring the indices, explicitly use the structured answers:
- Initiative Balance Index must strongly reflect "who initiates more".
- Emotional Stability Index must reflect perceived predictability.
- Boundary Violation Probability must reflect how often boundaries feel crossed.
- Pattern Recurrence Probability and Long-Term Stability should take into account how long the dynamic has been going on.

Narrative handling:
- Treat the narrative as a core data source, not decoration.
- Pay special attention to concrete signals: physical reactions (e.g. headaches, nausea), substance use, aggressive or degrading language, and other striking behaviors.
- If such extreme or unusual signals are present, they must significantly influence the indices (especially boundary, stability, and risk) and be referenced in the summary.
- Do not ignore or smooth out these signals.

Rules:
- Do not give moral judgment.
- Do not advise specific actions like "leave" or "stay".
- Do not take sides.
- Use neutral, structural language.
- Output MUST be valid JSON.

Output format (JSON only):

{
  "overall_risk_level": "Low | Moderate | Elevated | High",
  "indices": {
    "reciprocity_score": 0.0,
    "initiative_balance_index": 0.0,
    "emotional_stability_index": 0.0,
    "boundary_violation_probability": 0.0,
    "communication_clarity_index": 0.0,
    "pattern_recurrence_probability": 0.0,
    "long_term_stability_forecast": 0.0
  },
  "summary": "3–5 sentences, neutral tone, explaining the structure of the dynamic. The summary MUST reference at least 1–3 specific concrete details from the narrative when available (for example: physical symptoms after contact, substance use, style of speech, boundary crossings) and connect them to the indices."
}
`;

  const userContent = `
Scenario: ${scenario}

Structured answers:
- Duration of this dynamic: ${answers?.duration || "not provided"}
- Who initiates more: ${answers?.initiative || "not provided"}
- Perceived predictability of their reactions: ${
    answers?.predictability || "not provided"
  }
- How often boundaries feel crossed: ${answers?.boundaries || "not provided"}

Narrative (user's own words):
${narrative || "(no narrative provided)"}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "OpenAI request failed" },
      { status: 500 }
    );
  }

  const data = await response.json();

  let parsed;
  try {
    parsed = JSON.parse(data.choices[0].message.content);
  } catch (e) {
    console.error("JSON parse error:", e, data);
    return NextResponse.json(
      { error: "Invalid JSON from OpenAI" },
      { status: 500 }
    );
  }

  return NextResponse.json(parsed);
}
