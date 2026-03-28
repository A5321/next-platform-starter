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
          <a
            href="/"
            style={{
              display: "inline-block",
              marginBottom: 12,
              color: "#ffffff",
              textDecoration: "none",
              opacity: 0.7,
              fontSize: 14,
            }}
          >
            ← Back to home
          </a>
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

        {hasAnalyzed && result && result.indices && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            
            <h2 style={sectionTitleStyle}>
              Mixed‑signal level: {result.overall_mixed_signal_level}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>
            {/* ВСЕГДА ВИДНО (первые 2) */}
            <p>
              <strong>
                Signal Clarity Index: {result.indices.signal_clarity_index}
              </strong>
              <br />
              Shows how readable the situation is. 0 = very unclear or
              contradictory, 1 = very clear, even if the answer is “they&apos;re
              not that into this”.
            </p>

            <p>
              <strong>
                Interest Gap Index: {result.indices.interest_gap_index}
              </strong>
              <br />
              Measures how big the gap is between your investment and theirs.
              0 = roughly matched interest, 1 = strong gap in who cares and
              shows up.
            </p>

    {/* ЕСЛИ ОПЛАЧЕНО → ПОКАЗЫВАЕМ ВСЁ */}
    {paid && (
      <>
            <p>
              <strong>
                Mixed Signal Volatility:{" "}
                {result.indices.mixed_signal_volatility}
              </strong>
              <br />
              Captures how often and how sharply they swing between warm and
              cold. 0 = almost no mixed signals, 1 = frequent, intense flips.
            </p>

            <p>
              <strong>
                Anxiety Load Score: {result.indices.anxiety_load_score}
              </strong>
              <br />
              Reflects how heavy this dynamic sits on your mind and body.
              0 = easy to park and forget, 1 = very preoccupying and tense.
            </p>

            <p>
              <strong>
                Ghosting Drift Risk: {result.indices.ghosting_drift_risk}
              </strong>
              <br />
              Estimates how likely this is to slide into soft ghosting,
              on‑and‑off attention, or a quiet fade‑out. 0 = very unlikely,
              1 = high risk.
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
