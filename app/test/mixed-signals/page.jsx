"use client";

import { useState } from "react";

export default function MixedSignalsTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const clarity = formData.get("clarity");
    const outreach = formData.get("outreach");
    const mixed = formData.get("mixed");
    const impact = formData.get("impact");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "mixed_signals_interest_gap",
        answers: {
          clarity,
          outreach,
          mixed,
          impact,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "40px 16px",
  // backgroundColor убираем здесь полностью
};

const cardStyle = {
  maxWidth: 900,
  width: "100%",
  backgroundColor: "#000000",        // чёрная карточка
  borderRadius: 12,
  padding: 24,
  boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
  backdropFilter: "blur(6px)",
};

  const labelStyle = { display: "block", marginBottom: 8, fontWeight: 500 };
  const controlStyle = {
    width: "100%",
    maxWidth: 900,
    boxSizing: "border-box",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid rgba(255,255,255,0.25)",
    backgroundColor: "rgba(3, 20, 40, 0.85)",
    color: "#fff",
  };

  const sectionTitleStyle = { marginTop: 24, marginBottom: 8 };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 32 }}>Mixed signals / interest gap</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            When someone is warm and cold at the same time, it is often a pattern,
            not a mystery. Answer a few questions to see how this dynamic behaves.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 16 }}
        >
          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How clear is your status with this person?
            </label>
            <select name="clarity" style={controlStyle}>
              <option value="very_clear">Very clear</option>
              <option value="somewhat_clear">Somewhat clear</option>
              <option value="somewhat_unclear">Somewhat unclear</option>
              <option value="very_unclear">Very unclear</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              Who reaches out or initiates more?
            </label>
            <select name="outreach" style={controlStyle}>
              <option value="mostly_me">Mostly me</option>
              <option value="mostly_them">Mostly them</option>
              <option value="roughly_equal">Roughly equal</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How often do they send mixed signals (warm–cold, vague plans, etc.)?
            </label>
            <select name="mixed" style={controlStyle}>
              <option value="almost_never">Almost never</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
              <option value="very_often">Very often</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How strong is the emotional impact of this dynamic on you now?
            </label>
            <select name="impact" style={controlStyle}>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="very_high">Very high</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a recent interaction that shows their mixed signals..."
            />
          </div>

          <div style={{ marginTop: 4 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "none",
                backgroundColor: "#ffffff",
                color: "#000000",
                fontWeight: 600,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Analyzing..." : "Analyze pattern"}
            </button>
          </div>
        </form>

        {result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Overall risk level: {result.overall_risk_level}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>
                Reciprocity Score: {result.indices.reciprocity_score}
              </strong>
              <br />
              Measures how balanced emotional, practical, and time investment is
              between people. 0 = one person carries most of the connection, 1 =
              both show up in roughly comparable ways.
            </p>

            <p>
              <strong>
                Initiative Balance Index:{" "}
                {result.indices.initiative_balance_index}
              </strong>
              <br />
              Measures asymmetry in who initiates contact, conversations, or
              emotional effort. 0 = almost all initiative comes from one side, 1
              = both sides regularly start and move things forward.
            </p>

            <p>
              <strong>
                Emotional Stability Index:{" "}
                {result.indices.emotional_stability_index}
              </strong>
              <br />
              Measures how stable or volatile the emotional tone and reactions
              are over time. 0 = frequent sharp mood swings and sudden shifts, 1
              = mostly steady reactions with understandable changes.
            </p>

            <p>
              <strong>
                Boundary Violation Probability:{" "}
                {result.indices.boundary_violation_probability}
              </strong>
              <br />
              Measures how often personal limits, “no’s”, or agreements are
              ignored or pushed through. 0 = boundaries are consistently
              respected, 1 = boundaries are regularly tested, pressured, or
              overridden.
            </p>

            <p>
              <strong>
                Communication Clarity Index:{" "}
                {result.indices.communication_clarity_index}
              </strong>
              <br />
              Measures how directly people express needs, intentions, and
              interest versus using mixed or hidden signals. 0 = high ambiguity,
              double messages, or manipulation, 1 = mostly straightforward,
              transparent communication.
            </p>

            <p>
              <strong>
                Pattern Recurrence Probability:{" "}
                {result.indices.pattern_recurrence_probability}
              </strong>
              <br />
              Estimates how likely it is that the same dynamic will continue or
              appear again in future situations. 0 = low chance of repetition
              under similar conditions, 1 = pattern is deeply entrenched and
              very likely to repeat.
            </p>

            <p>
              <strong>
                Long-Term Stability Forecast:{" "}
                {result.indices.long_term_stability_forecast}
              </strong>
              <br />
              Estimates how likely it is that the current way of relating can
              stay healthy in the long run. 0 = very low chance of sustainable
              stability, 1 = high chance that the dynamic can remain stable over
              time.
            </p>

            <h3 style={sectionTitleStyle}>Summary</h3>
            <p>{result.summary}</p>
          </section>
        )}
        <p
          style={{
            marginTop: 24,
            fontSize: 11,
            opacity: 0.6,
            lineHeight: 1.4,
          }}
        >
          This tool is not therapy, medical care, or legal advice. It cannot
          diagnose anything or tell you what to do. You are fully responsible
          for any decisions or actions you take based on these checkups.
        </p>
      </div>
    </div>
  );
}
