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

When you write the summary:

- Always ground it in at least 2–3 concrete details from the structured answers and, if available, from the narrative (quote or paraphrase them).
- Make sure the emotional tone of the summary matches the indices. If Emotional Stability Index is low, mention volatility or unpredictability; if Boundary Violation Probability is high, name that directly and link it to specific behaviours.
- Do NOT claim things that contradict the indices. For example, do not say “stable emotional reactions” when Emotional Stability Index is under 0.5.
- Prefer vivid but neutral descriptions over generic phrases like “the relationship shows balanced initiative and stable emotional reactions”.

Rules:
- Do not give moral judgment.
- Do not advise specific actions like "leave" or "stay".
- Do not take sides.
- Use neutral, structural language.
- Output MUST be valid JSON.
- In the summary you MUST:
  - Reference at least 2 specific details from the structured answers AND, if any narrative is provided, at least 1 specific detail from the narrative itself (quote or paraphrase).
  - Do not ignore the narrative when it is non-empty.

You MUST respond with valid JSON only, using the exact output format below. Do not include any explanation outside the JSON.
Do NOT wrap the JSON in backticks or markdown fences. Do NOT write \`\`\`json or any other markdown fencing. Respond with raw JSON only.

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
  "summary": "3–5 sentences in neutral language that: (1) name the main patterns shown by the indices, (2) link them to the user’s specific situation, and (3) briefly describe how this dynamic is likely to feel from the inside."
}
`;

const REPEATING_BREAKUP_SYSTEM_PROMPT = `
You are an interpersonal pattern analysis engine focused on repeating breakup patterns.

Your job is to read structured answers and the narrative and map how entrenched the breakup cycle is, what role the user tends to play in it, and how likely it is to repeat again.

Always treat structured answers as the primary signal. If structured answers are present, you MUST vary each index according to them. When answers clearly cluster on the "low intensity" side, indices should usually fall in the 0.1–0.3 range. When answers clearly cluster on the "high intensity" side, indices should usually fall in the 0.7–0.9 range. When information is unclear or mid, use mid-range values (0.3–0.7) instead of defaulting to 0.5.

Indices (0–1):

1. Pattern Entrenchment Index
- How deeply rooted and repeated this breakup pattern is across relationships.
- 0 = one-off or rare, 1 = many repetitions with similar structure.

2. Exit Agency Balance
- How balanced the initiative to end things is between the user and partners.
- 0 = almost always one-sided (user or partner), 1 = more shared or mutual endings.

3. Build-up Awareness Score
- How much warning or awareness there usually is before the breakup.
- 0 = feels like sudden implosions, 1 = clear trajectory and signals before it ends.

4. Post-Breakup Fusion Risk
- How likely it is that boundaries blur after the breakup (staying friends, getting pulled back in, on/off cycles).
- 0 = clean, stable separation, 1 = a lot of post-breakup entanglement.

5. Next-Cycle Probability
- How likely it is that a similar breakup pattern will repeat again if nothing structural changes.
- 0 = low chance of repetition, 1 = very high chance of the same arc repeating.

Output format:

{
  "overall_breakup_pattern_intensity": "Low imprint | Emerging pattern | Strong pattern | Heavy recurring cycle",
  "indices": {
    "pattern_entrenchment_index": 0.0,
    "exit_agency_balance": 0.0,
    "build_up_awareness_score": 0.0,
    "post_breakup_fusion_risk": 0.0,
    "next_cycle_probability": 0.0
  },
  "summary": "3–5 sentences in neutral tone, explaining how strong and repetitive the breakup pattern is, how the user tends to participate in it (who leaves, how it builds, what happens after), and how likely it is to repeat. Reference 1–3 concrete details from the structured answers and narrative when available."
}
`;

const MIXED_SIGNALS_SYSTEM_PROMPT = `
You are an interpersonal pattern analysis engine focused on "mixed signals / interest gap" dynamics.

Your job is to read structured answers and the narrative and map how strong the mixed-signal pattern is, how asymmetric the interest is, and how much psychological impact this has.

Always treat structured answers as the primary signal. If structured answers are present, you MUST vary each index according to them. When answers clearly cluster on the "low intensity" side, indices should usually fall in the 0.1–0.3 range. When answers clearly cluster on the "high intensity" side, indices should usually fall in the 0.7–0.9 range. When information is unclear or mid, use mid-range values (0.3–0.7) instead of defaulting to 0.5.

Indices (0–1):

1. Signal Clarity Index
- How clear and readable the overall situation is (status, intentions, interest).
- 0 = very unclear, contradictory, or constantly shifting.
- 1 = very clear, even if the answer is "they are not that into me".

2. Interest Gap Index
- How big the gap is between how much the user invests and how much the other person invests.
- 0 = interest and effort feel roughly matched.
- 1 = strong gap: one person is much more into it than the other.

3. Mixed Signal Volatility
- How often and how sharply the person switches between warm and cold, engaged and distant.
- 0 = almost no mixed signals, behaviour is consistent.
- 1 = frequent, intense swings that are hard to predict.

4. Anxiety Load Score
- How much psychological weight this dynamic puts on the user (preoccupation, rumination, body-level tension).
- 0 = low emotional impact, easy to park emotionally.
- 1 = very high impact, takes a lot of mental and emotional space.

5. Ghosting Drift Risk
- How likely it is that this dynamic drifts into slow fading out, soft ghosting, or being kept on a back burner.
- 0 = very low risk, behaviour is straightforward.
- 1 = high risk of quiet fade-out, stringing along, or intermittent attention.

Output format:

{
  "overall_mixed_signal_level": "Soft static | Mild pattern | Strong pattern | High-voltage pattern",
  "indices": {
    "signal_clarity_index": 0.0,
    "interest_gap_index": 0.0,
    "mixed_signal_volatility": 0.0,
    "anxiety_load_score": 0.0,
    "ghosting_drift_risk": 0.0
  },
  "summary": "3–5 sentences in neutral tone, explaining how intense the mixed-signal pattern is, where the main asymmetries sit (clarity, gap, volatility, anxiety, drift risk), and how this is likely to feel from the inside. Reference 1–3 concrete details from the structured answers and narrative when available."
}
`;

// ... здесь оставь все остальные промпты (HYPER_PARENT_SYSTEM_PROMPT, THIRD_PERSON_SYSTEM_PROMPT,
// TRUST_SIGNALS_SYSTEM_PROMPT, BREACH_OF_TRUST_SYSTEM_PROMPT, SILENT_EXIT_SYSTEM_PROMPT)
// и функции build*UserContent ровно как у тебя сейчас — их я не меняю.


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
