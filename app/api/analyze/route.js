import { NextResponse } from "next/server";

// ---------- PROMPTS & HELPERS ----------

const COMMON_SYSTEM_PROMPT = `
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
  "summary": "3–5 sentences..."
}
`;

const HYPER_PARENT_SYSTEM_PROMPT = `
You are an interpersonal pattern analysis engine, focused on parent–child dynamics and their long-term effects.

Analyze the answers and narrative for a hyper‑controlling parent pattern. Use this index framework:

1. Parental Control Intensity (0–1)
- How tightly the parent controlled the child's decisions, daily life, and overall direction.
- 0 = mostly supportive guidance with respect for the child's path.
- 1 = heavy control over most areas of life.

2. Autonomy Restriction Level (0–1)
- How much real freedom the child had to choose friends, hobbies, clothes, and schedule.
- 0 = plenty of room to experiment even if the parent disagreed.
- 1 = very little real choice, most decisions had to be "approved".

3. Privacy Invasion Score (0–1)
- How often the parent invaded physical and psychological privacy (room, phone, diaries, messages).
- 0 = privacy mostly respected.
- 1 = regular checking, reading, or entering without consent.

4. Guilt/Shame Pressure Index (0–1)
- How much guilt, shame, emotional blackmail, or threats were used to enforce obedience.
- 0 = rare and mild.
- 1 = strong, frequent emotional pressure.

5. Current Relationship Echo Score (0–1)
- How strongly this pattern is likely to replay in the person's adult relationships
  (over‑adapting, tolerating control, or going into sharp rebellion).
- 0 = almost no carry‑over.
- 1 = strong echo in current dynamics.

Rules:
- Use the structured answers as the primary data source and refine with the narrative.
- Do not give moral judgment.
- Do not advise specific actions like "cut contact" or "forgive".
- Use neutral, structural language.
- Output MUST be valid JSON only.

Output format:

{
  "overall_hypercontrol_level": "Low | Moderate | Elevated | High",
  "indices": {
    "parental_control_intensity": 0.0,
    "autonomy_restriction_level": 0.0,
    "privacy_invasion_score": 0.0,
    "guilt_shame_pressure_index": 0.0,
    "current_relationship_echo_score": 0.0
  },
  "summary": "3–5 sentences, neutral tone, explaining how the parent–child dynamic was organised and how it may echo in current relationships. The summary MUST reference at least 1–3 specific concrete details from the narrative when available."
}
`;

function buildCommonUserContent(answers, narrative, scenario) {
  return `
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
}

function buildHyperParentUserContent(answers, narrative) {
  return `
Scenario: hyper_controlling_parent

Structured answers:
- Emotional tone from this parent: ${answers?.emotional_tone || "not provided"}
- Level of autonomy in everyday decisions: ${answers?.autonomy || "not provided"}
- How they treated your privacy: ${answers?.privacy || "not provided"}
- Typical reaction when you didn't obey / disagreed: ${
    answers?.punishment_pattern || "not provided"
  }
- How you feel this still affects your current relationships: ${
    answers?.current_effect || "not provided"
  }

Narrative (user's own words):
${narrative || "(no narrative provided)"}
`;
}

function buildPromptAndUserContent(scenario, answers, narrative) {
  if (scenario === "hyper_controlling_parent") {
    return {
      systemPrompt: HYPER_PARENT_SYSTEM_PROMPT,
      userContent: buildHyperParentUserContent(answers, narrative),
    };
  }

  // по умолчанию — старый общий чекап (current relationship, mixed, breakup)
  return {
    systemPrompt: COMMON_SYSTEM_PROMPT,
    userContent: buildCommonUserContent(answers, narrative, scenario),
  };
}

// ---------- MAIN HANDLER ----------

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

  const { systemPrompt, userContent } = buildPromptAndUserContent(
    scenario,
    answers,
    narrative
  );

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
