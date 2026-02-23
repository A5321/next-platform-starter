"use client";

import { useState } from "react";

export default function CurrentRelationshipTest() {
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const duration = formData.get("duration");
    const initiative = formData.get("initiative");
    const predictability = formData.get("predictability");
    const boundaries = formData.get("boundaries");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "current_relationship",
        answers: {
          duration,
          initiative,
          predictability,
          boundaries,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <h1>Current relationship checkup</h1>
      <p>Describe a situation that shows your current dynamic.</p>

      <form onSubmit={handleSubmit}>
        <label>
          How long has this dynamic been going on?
          <br />
          <select name="duration" style={{ width: "100%" }}>
            <option value="0-3 months">0–3 months</option>
            <option value="3-12 months">3–12 months</option>
            <option value="1-3 years">1–3 years</option>
            <option value="3+ years">3+ years</option>
          </select>
        </label>

        <br />
        <br />

        <label>
          Who initiates contact or repair more often?
          <br />
          <select name="initiative" style={{ width: "100%" }}>
            <option value="mostly_me">Mostly me</option>
            <option value="mostly_them">Mostly them</option>
            <option value="equal">Roughly equal</option>
          </select>
        </label>

        <br />
        <br />

        <label>
          How predictable do their reactions feel?
          <br />
          <select name="predictability" style={{ width: "100%" }}>
            <option value="very_unpredictable">Very unpredictable</option>
            <option value="somewhat_unpredictable">Somewhat unpredictable</option>
            <option value="mostly_predictable">Mostly predictable</option>
            <option value="very_predictable">Very predictable</option>
          </select>
        </label>

        <br />
        <br />

        <label>
          How often do you feel your boundaries are crossed or pushed?
          <br />
          <select name="boundaries" style={{ width: "100%" }}>
            <option value="almost_never">Almost never</option>
            <option value="sometimes">Sometimes</option>
            <option value="often">Often</option>
            <option value="very_often">Very often</option>
          </select>
        </label>

        <br />
        <br />

        <label>
          Your story (optional):
          <br />
          <textarea name="narrative" rows={6} style={{ width: "100%" }} />
        </label>

        <br />
        <button type="submit">Analyze pattern</button>
      </form>

      {result && (
        <section style={{ marginTop: 24, lineHeight: 1.5 }}>
          <h2>Overall risk level: {result.overall_risk_level}</h2>

          <h3>Indices</h3>

          <p>
            <strong>Reciprocity Score: {result.indices.reciprocity_score}</strong>
            <br />
            Measures how balanced emotional, practical, and time investment is
            between people. 0 = one person carries most of the connection, 1 =
            both show up in roughly comparable ways.
          </p>

          <p>
            <strong>
              Initiative Balance Index: {result.indices.initiative_balance_index}
            </strong>
            <br />
            Measures asymmetry in who initiates contact, conversations, or
            emotional effort. 0 = almost all initiative comes from one side, 1 =
            both sides regularly start and move things forward.
          </p>

          <p>
            <strong>
              Emotional Stability Index: {result.indices.emotional_stability_index}
            </strong>
            <br />
            Measures how stable or volatile the emotional tone and reactions are
            over time. 0 = frequent sharp mood swings and sudden shifts, 1 =
            mostly steady reactions with understandable changes.
          </p>

          <p>
            <strong>
              Boundary Violation Probability:{" "}
              {result.indices.boundary_violation_probability}
            </strong>
            <br />
            Measures how often personal limits, “no’s”, or agreements are ignored
            or pushed through. 0 = boundaries are consistently respected, 1 =
            boundaries are regularly tested, pressured, or overridden.
          </p>

          <p>
            <strong>
              Communication Clarity Index:{" "}
              {result.indices.communication_clarity_index}
            </strong>
            <br />
            Measures how directly people express needs, intentions, and interest
            versus using mixed or hidden signals. 0 = high ambiguity, double
            messages, or manipulation, 1 = mostly straightforward, transparent
            communication.
          </p>

          <p>
            <strong>
              Pattern Recurrence Probability:{" "}
              {result.indices.pattern_recurrence_probability}
            </strong>
            <br />
            Estimates how likely it is that the same dynamic will continue or
            appear again in future situations. 0 = low chance of repetition under
            similar conditions, 1 = pattern is deeply entrenched and very likely
            to repeat.
          </p>

          <p>
            <strong>
              Long-Term Stability Forecast:{" "}
              {result.indices.long_term_stability_forecast}
            </strong>
            <br />
            Estimates how likely it is that the current way of relating can stay
            healthy in the long run. 0 = very low chance of sustainable
            stability, 1 = high chance that the dynamic can remain stable over
            time.
          </p>

          <h3>Summary</h3>
          <p>{result.summary}</p>
        </section>
      )}
    </main>
  );
}
