import { NextResponse } from 'next/server';
import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

  async function logVisit({ scenario, answers, parsed, headers }) {
  try {
    const now = new Date().toISOString();

    const record = {
      timestamp: now,
      scenario,
      overall:
        parsed.overall_risk_level ||
        parsed.overall_breakup_pattern_intensity ||
        parsed.overall_mixed_signal_level ||
        parsed.overall_hypercontrol_level ||
        parsed.overall_triangle_risk ||
        parsed.overall_trust_in_signals ||
        parsed.overall_trust_recovery_level ||
        parsed.overall_exit_pattern_level ||
        "unknown",
      country: headers.get("x-nf-geo-country") || null,
      tz: headers.get("x-nf-geo-timezone") || null,
      answers: answers || {},
      indices: parsed.indices || {},
    };

    const store = getStore({ name: "visits-log", consistency: "eventual" });
    const key = `visit-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    await store.setJSON(key, record);
    } catch (e) {
      console.error("LOG VISIT ERROR", e);
    }
  }

function baliIsoNow() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const bali = new Date(utcMs + 8 * 60 * 60000);
  return bali.toISOString();
}

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

const THIRD_PERSON_SYSTEM_PROMPT = `
You are an interpersonal pattern analysis engine, focused on hidden or unclear third‑person dynamics in relationships.

Analyze the answers and narrative for a "third person in the grey zone" pattern. Use this index framework:

1. Triangle Risk Index (0–1)
- Overall likelihood that this third‑person connection already functions as an emotional or romantic triangle.
- 0 = very low risk.
- 1 = very high risk.

2. Secrecy Load Score (0–1)
- How much secrecy, hiding, or double‑life behaviour surrounds this third person (deleted chats, vague explanations, hidden meetings).
- 0 = mostly transparent contact.
- 1 = heavily concealed and defended.

3. Boundary Blur Index (0–1)
- How unclear or negotiable the boundaries are around this connection (what is allowed, what is not, what would be considered a breach).
- 0 = boundaries clear and respected.
- 1 = boundaries very blurred or constantly shifting.

4. Emotional Outsourcing Score (0–1)
- How much emotional energy is redirected from the main relationship to the third person (venting, deep sharing, seeking comfort there).
- 0 = almost no emotional outsourcing.
- 1 = a large portion of emotional life goes there.

5. Comparison Pressure Index (0–1)
- How strong the theme of comparison or competition feels between the third person and the main partner (explicitly or implicitly).
- 0 = almost no comparison.
- 1 = strong, ongoing sense of being compared or replaced.

Rules:
- Use the structured answers as the primary data source and refine with the narrative.
- Do not give moral judgment.
- Do not advise specific actions like "leave" or "confront".
- Use neutral, structural language.
- Output MUST be valid JSON only.

Output format:

{
  "overall_triangle_risk": "Low | Moderate | Elevated | High",
  "indices": {
    "triangle_risk_index": 0.0,
    "secrecy_load_score": 0.0,
    "boundary_blur_index": 0.0,
    "emotional_outsourcing_score": 0.0,
    "comparison_pressure_index": 0.0
  },
  "summary": "3–5 sentences, neutral tone, explaining how the third‑person connection is structured, where the risk concentrates (secrecy, boundaries, emotional outsourcing, comparison), and how it affects the main relationship. The summary MUST reference at least 1–3 specific concrete details from the narrative when available."
}
`;

const TRUST_SIGNALS_SYSTEM_PROMPT = `
You are an interpersonal pattern analysis engine, focused on how readable and trustworthy a person's signals are in a relationship.

Analyze the answers and narrative for a "Can you trust their signals?" pattern. Use this index framework:

1. Signal Trust Index (0–1)
- Overall sense of how safe it is to rely on this person's signals when making decisions.
- 0 = signals feel unreliable or misleading.
- 1 = signals feel like a solid base.

2. Conflict Clarity Score (0–1)
- How clear their behaviour and communication are when there is tension or conflict.
- 0 = chaos, shutdowns, or manipulation.
- 1 = direct but human reactions that can be understood over time.

3. Intention Transparency Index (0–1)
- How openly they communicate their intentions about the relationship (labels, future, position).
- 0 = very vague or shifting stories.
- 1 = mostly explicit and consistent.

4. Promise Reliability Score (0–1)
- How often their promises and stated plans actually turn into action.
- 0 = chronic flakiness or quiet cancellations.
- 1 = strong follow‑through with upfront communication when things change.

5. Gaslighting Risk Index (0–1)
- How much their responses to your questions make you doubt your own perception (deflection, blame‑shifting, making you feel "crazy").
- 0 = almost no gaslighting pattern.
- 1 = strong, repeated pattern of turning your questions against you.

Rules:
- Use the structured answers as the primary data source and refine with the narrative.
- Do not give moral judgment.
- Do not advise specific actions like "leave" or "stay".
- Use neutral, structural language.
- Output MUST be valid JSON only.

Output format:

{
  "overall_trust_in_signals": "Low | Moderate | Elevated | High",
  "indices": {
    "signal_trust_index": 0.0,
    "conflict_clarity_score": 0.0,
    "intention_transparency_index": 0.0,
    "promise_reliability_score": 0.0,
    "gaslighting_risk_index": 0.0
  },
  "summary": "3–5 sentences, neutral tone, explaining how readable and trustworthy this person's signals are, and where the main distortions cluster (conflict, intentions, promises, gaslighting). The summary MUST reference at least 1–3 specific concrete details from the narrative when available."
}
`;

const BREACH_OF_TRUST_SYSTEM_PROMPT = `
You are an interpersonal pattern analysis engine focused on what happens AFTER a breach of trust in a close relationship.

Analyze the answers and narrative for an "After a breach of trust" pattern. Focus on how repair is unfolding (or failing), not on moral judgment.

Use this index framework (0–1 each):

1. Repair Effort Index
- How consistently the person who broke trust is showing up in concrete repair behaviours over time (not just words).
- 0 = almost no visible repair, mostly minimising or moving on.
- 1 = steady, observable effort that aligns with their words.

2. Accountability Depth Score
- How fully they acknowledge the impact of what happened without deflecting, blaming, or rushing you to "get over it".
- 0 = shallow "sorry", defensiveness, or blame-shifting.
- 1 = clear ownership, curiosity about your experience, willingness to sit with discomfort.

3. Boundary Reset Strength
- How clearly new boundaries, agreements, or guardrails have been set and actually held after the breach.
- 0 = everything went back to "normal", boundaries are vague or ignored.
- 1 = specific new limits and structures are in place and mostly respected.

4. Trust Regrowth Pace
- The trajectory of trust over time since the breach (stalled, declining, slowly improving, or meaningfully rebuilding).
- 0 = trust feels frozen or keeps eroding.
- 1 = gradual but noticeable regrowth, with both people tracking it.

5. Relapse Risk Index
- How likely it is that a similar breach (or adjacent pattern) will repeat, given current behaviour and structures.
- 0 = strong systemic changes that reduce risk.
- 1 = many conditions are unchanged; pattern feels likely to repeat.

Rules:
- Use structured answers as primary data, then refine with the narrative.
- Do not tell them to stay, leave, forgive, or give moral verdicts.
- Name patterns in neutral, descriptive language.
- Output MUST be valid JSON only.

If structured answers are present, you MUST vary each index according to them.
It is NOT allowed to keep indices all clustered near 0 or all near 1 unless the answers clearly point there.
When information is unclear, use mid-range values (0.3–0.7) instead of defaulting to 0.
When the same user selects opposite ends of the scales across different runs,
the indices MUST shift noticeably (at least 0.3 difference for each index).

Output format:

{
  "overall_trust_recovery_level": "Collapsed | Fragile | Unfolding | Grounded",
  "indices": {
    "repair_effort_index": 0.0,
    "accountability_depth_score": 0.0,
    "boundary_reset_strength": 0.0,
    "trust_regrowth_pace": 0.0,
    "relapse_risk_index": 0.0
  },
  "summary": "3–5 sentences, neutral tone, explaining how the repair process is unfolding, where it is blocked or supported (effort, accountability, boundaries, regrowth, relapse risk). Reference 1–3 specific concrete details from the narrative when available."
}
`;

const SILENT_EXIT_SYSTEM_PROMPT = `
You are an interpersonal pattern analysis engine focused on "silent exit" patterns in relationships: when one or both people quietly check out without an explicit breakup.

Analyze the answers and narrative for a "Silent exit from the relationship" pattern.

Always treat structured answers as the primary signal. If structured answers are present, you MUST vary each index according to them. It is NOT allowed to keep indices all clustered near 0 or all near 1 unless the answers clearly point there. When information is unclear, use mid-range values (0.3–0.7) instead of defaulting to 0. When the same user selects opposite ends of the scales across different runs, the indices MUST shift noticeably (at least 0.3 difference for each index).

Indices (0–1):

1. Presence Fade Index
- How much the person's day-to-day presence, availability, and initiative have faded.
- 0 = they are very present and engaged, 1 = strong pattern of disappearance or minimal contact.

2. Emotional Withdrawal Score
- How emotionally shut down or disconnected they seem in the relationship.
- 0 = emotionally available and responsive, 1 = strongly withdrawn, flat, or indifferent.

3. Conflict Avoidance Index
- How much important topics and unresolved tensions are avoided instead of talked through.
- 0 = conflicts and hard topics are addressed, 1 = avoidance, stonewalling, or "let's not talk about it".

4. Parallel Life Drift Score
- Degree to which you are living parallel lives (separate routines, plans, social worlds) while technically still together.
- 0 = deeply interwoven daily lives, 1 = almost separate lives with minimal overlap.

5. Closure Risk Index
- How likely it is that the relationship will end (or has effectively ended) without a clear, mutual closure conversation.
- 0 = very low risk of silent breakup, 1 = high risk of things just fading out or ending abruptly without clarity.

You MUST respond with valid JSON only, using the exact output format below.

Output format:

{
  "overall_exit_pattern_level": "Early signs | Quiet drift | Advanced exit | Relationship shell",
  "indices": {
    "presence_fade_index": 0.0,
    "emotional_withdrawal_score": 0.0,
    "conflict_avoidance_index": 0.0,
    "parallel_life_drift_score": 0.0,
    "closure_risk_index": 0.0
  },
  "summary": "3–5 sentences in neutral tone, naming the intensity of the silent-exit pattern, where the drift is most visible (presence, emotion, conflict, parallel lives, closure risk), and how the current pattern might feel from the inside. Reference 1–3 concrete details from the narrative when available."
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

function buildRepeatingBreakupUserContent(answers, narrative) {
  return `
Scenario: repeating_breakup_pattern

Structured answers (always prefer these over the narrative):
- How many times a similar breakup has happened: ${
    answers?.count || "not provided"
  }
- Who usually initiates the breakup: ${
    answers?.whoLeaves || "not provided"
  }
- How the relationship usually feels just before it ends: ${
    answers?.pace || "not provided"
  }
- What usually happens after the breakup: ${
    answers?.postContact || "not provided"
  }

Narrative (user's own words):
${narrative || "(no narrative provided)"}
`;
}

function buildMixedSignalsUserContent(answers, narrative) {
  return `
Scenario: mixed_signals_interest_gap

Structured answers (always prefer these over the narrative):
- Clarity of status with this person: ${answers?.clarity || "not provided"}
- Who initiates or reaches out more: ${answers?.outreach || "not provided"}
- Frequency of mixed signals (warm–cold, vague plans, etc.): ${answers?.mixed || "not provided"}
- Current emotional impact of this dynamic: ${answers?.impact || "not provided"}

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

function buildThirdPersonUserContent(answers, narrative) {
  return `
Scenario: third_person_grey_zone

Structured answers:
- Who this third person is: ${answers?.third_role || "not provided"}
- Level of secrecy around this person: ${answers?.secrecy_level || "not provided"}
- How often comparison shows up: ${
    answers?.comparison_frequency || "not provided"
  }
- Clarity of boundaries around this person: ${
    answers?.boundary_clarity || "not provided"
  }
- Perceived emotional investment in this person: ${
    answers?.emotional_investment || "not provided"
  }

Narrative (user's own words):
${narrative || "(no narrative provided)"}
`;
}

function buildTrustSignalsUserContent(answers, narrative) {
  return `
Scenario: trust_their_signals

Structured answers:
- Clarity of their signals in conflict: ${
    answers?.clarity_in_conflict || "not provided"
  }
- How clearly they communicate intentions about this relationship: ${
    answers?.clarity_about_intentions || "not provided"
  }
- Reliability of their promises and plans: ${
    answers?.reliability_of_promises || "not provided"
  }
- How they react when you ask for clarity: ${
    answers?.reaction_to_questions || "not provided"
  }
- Your body-level feeling about relying on their signals: ${
    answers?.gut_feeling || "not provided"
  }

Narrative (user's own words):
${narrative || "(no narrative provided)"}
`;
}

function buildAfterBreachUserContent(answers, narrative) {
  return `
Scenario: after_breach_of_trust

Structured answers:
- What kind of breach of trust happened: ${
    answers?.type_of_breach || "not provided"
  }
- How long ago did this breach happen: ${
    answers?.time_since_breach || "not provided"
  }
- How has their behaviour been since (repair vs denial): ${
    answers?.accountability || "not provided"
  }
- How clear are new boundaries or agreements now: ${
    answers?.repair_behavior || "not provided"
  }
- How safe does it feel in your body around them now: ${
    answers?.symptom_level || "not provided"
  }

Narrative (user's own words):
${narrative || "(no narrative provided)"}
`;
}

function buildSilentExitUserContent(answers, narrative) {
  return `
Scenario: silent_exit

Structured answers (always prefer these over the narrative):
- How present and available they are in daily life: ${
    answers?.daily_presence || "not provided"
  }
- How emotionally engaged or withdrawn they seem: ${
    answers?.emotional_engagement || "not provided"
  }
- How conflicts and hard topics are handled: ${
    answers?.conflict_handling || "not provided"
  }
- How shared vs separate your routines and plans are: ${
    answers?.shared_life_pattern || "not provided"
  }
- How likely it feels that things might just quietly end without a real talk: ${
    answers?.silent_breakup_risk || "not provided"
  }

Narrative (user's own words):
${narrative || "(no narrative provided)"}
`;
}

function buildPromptAndUserContent(scenario, answers, narrative) {

  if (scenario === "repeating_breakup_pattern") {
    return {
      systemPrompt: REPEATING_BREAKUP_SYSTEM_PROMPT,
      userContent: buildRepeatingBreakupUserContent(answers, narrative),
    };
  }

  if (scenario === "mixed_signals_interest_gap") {
    return {
      systemPrompt: MIXED_SIGNALS_SYSTEM_PROMPT,
      userContent: buildMixedSignalsUserContent(answers, narrative),
    };
  }

  if (scenario === "hyper_controlling_parent") {
    return {
      systemPrompt: HYPER_PARENT_SYSTEM_PROMPT,
      userContent: buildHyperParentUserContent(answers, narrative),
    };
  }

  if (scenario === "third_person_grey_zone") {
    return {
      systemPrompt: THIRD_PERSON_SYSTEM_PROMPT,
      userContent: buildThirdPersonUserContent(answers, narrative),
    };
  }

  if (scenario === "trust_their_signals") {
    return {
      systemPrompt: TRUST_SIGNALS_SYSTEM_PROMPT,
      userContent: buildTrustSignalsUserContent(answers, narrative),
    };
  }

  if (scenario === "after_breach_of_trust") {
    return {
      systemPrompt: BREACH_OF_TRUST_SYSTEM_PROMPT,
      userContent: buildAfterBreachUserContent(answers, narrative),
    };
  }

  if (scenario === "silent_exit") {
    return {
      systemPrompt: SILENT_EXIT_SYSTEM_PROMPT,
      userContent: buildSilentExitUserContent(answers, narrative),
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
      // response_format: { type: "json_object" },
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

await logVisit({
  scenario,
  answers,
  parsed,
  headers: req.headers,
});

return NextResponse.json(parsed);

  
  return NextResponse.json(parsed);
}
