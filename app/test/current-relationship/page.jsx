"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function MixedSignalsTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const access = params.get("access");

  const saved = localStorage.getItem("lastResult_mixed");

  if (saved) {
    setResult(JSON.parse(saved));
  }

  if (access === "one" || access === "sub") {
    setPaid(true);
    if (saved) {
      setHasAnalyzed(true);
    }
  }
}, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

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
    localStorage.setItem("lastResult_mixed", JSON.stringify(data));
    setHasAnalyzed(true);
    setLoading(false);
  }

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "40px 16px",
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
    maxWidth: 900,          // можно 800, если хочешь чуть уже
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
          <h1 style={{ margin: 0, fontSize: 32 }}>Current relationship checkup</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Describe a situation that shows your current dynamic. Answer a few
            questions and get a structured pattern breakdown.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              How long has this dynamic been going on?
            </label>
            <select name="duration" style={controlStyle}>
              <option value="0-3 months">0–3 months</option>
              <option value="3-12 months">3–12 months</option>
              <option value="1-3 years">1–3 years</option>
              <option value="3+ years">3+ years</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              Who initiates contact or repair more often?
            </label>
            <select name="initiative" style={controlStyle}>
              <option value="mostly_me">Mostly me</option>
              <option value="mostly_them">Mostly them</option>
              <option value="equal">Roughly equal</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How predictable do their reactions feel?
            </label>
            <select name="predictability" style={controlStyle}>
              <option value="very_unpredictable">Very unpredictable</option>
              <option value="somewhat_unpredictable">
                Somewhat unpredictable
              </option>
              <option value="mostly_predictable">Mostly predictable</option>
              <option value="very_predictable">Very predictable</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How often do you feel your boundaries are crossed or pushed?
            </label>
            <select name="boundaries" style={controlStyle}>
              <option value="almost_never">Almost never</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
              <option value="very_often">Very often</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a recent interaction that feels typical for this relationship..."
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

{hasAnalyzed && result && result.indices && (
  <section style={{ marginTop: 32, lineHeight: 1.5 }}>
    
    <h2 style={sectionTitleStyle}>
      Overall risk level: {result.overall_risk_level}
    </h2>

    <h3 style={sectionTitleStyle}>Indices</h3>

    {/* ВСЕГДА ВИДНО (первые 2) */}
    <p>
      <strong>
        Reciprocity Score: {result.indices.reciprocity_score}
      </strong>
      <br />
      Measures how balanced emotional, practical, and time investment is
      between people.
    </p>

    <p>
      <strong>
        Initiative Balance Index:{" "}
        {result.indices.initiative_balance_index}
      </strong>
      <br />
      Measures asymmetry in who initiates contact.
    </p>

    {/* ЕСЛИ НЕ ОПЛАЧЕНО → ПОКАЗЫВАЕМ PAYWALL */}

{!paid && (
  <div style={{ marginTop: 16 }}>
    
    <h3>Unlock full breakdown</h3>

    {/* ВОТ СЮДА */}
<form action="/api/create-payment" method="POST">
  <button type="submit">
  Unlock full analysis — $11/mo (usdt)
  </button>
</form>

  </div>
)}

    {/* ЕСЛИ ОПЛАЧЕНО → ПОКАЗЫВАЕМ ВСЁ */}
    {paid && (
      <>
        <p>
          <strong>
            Emotional Stability Index:{" "}
            {result.indices.emotional_stability_index}
          </strong>
          <br />
          Measures how stable or volatile reactions are.
        </p>

        <p>
          <strong>
            Boundary Violation Probability:{" "}
            {result.indices.boundary_violation_probability}
          </strong>
        </p>

        <p>
          <strong>
            Communication Clarity Index:{" "}
            {result.indices.communication_clarity_index}
          </strong>
        </p>

        <p>
          <strong>
            Pattern Recurrence Probability:{" "}
            {result.indices.pattern_recurrence_probability}
          </strong>
        </p>

        <p>
          <strong>
            Long-Term Stability Forecast:{" "}
            {result.indices.long_term_stability_forecast}
          </strong>
        </p>
      </>
    )}

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
