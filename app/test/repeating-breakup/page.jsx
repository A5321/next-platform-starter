"use client";

import { useState } from "react";

export default function RepeatingBreakupTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const count = formData.get("count");
    const whoLeaves = formData.get("whoLeaves");
    const pace = formData.get("pace");
    const postContact = formData.get("postContact");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "repeating_breakup_pattern",
        answers: {
          count,
          whoLeaves,
          pace,
          postContact,
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
  backgroundImage: "url('/bgr.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
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
          <h1 style={{ margin: 0, fontSize: 32 }}>Repeating breakup pattern</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            If your breakups start to look strangely similar, you might be
            running a pattern, not just meeting the wrong person. Answer a few
            questions to see how it behaves.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 16 }}
        >
          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How many times have you been in a relationship that ended in a
              similar way?
            </label>
            <select name="count" style={controlStyle}>
              <option value="1">Once</option>
              <option value="2-3">2–3 times</option>
              <option value="4-5">4–5 times</option>
              <option value="6+">More than 5 times</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              Who usually initiates the breakup?
            </label>
            <select name="whoLeaves" style={controlStyle}>
              <option value="mostly_me">Mostly me</option>
              <option value="mostly_them">Mostly them</option>
              <option value="mixed">It varies / hard to say</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How does the relationship usually feel just before it ends?
            </label>
            <select name="pace" style={controlStyle}>
              <option value="sudden_implosion">
                Feels like a sudden implosion out of nowhere
              </option>
              <option value="slow_fade">
                Slow fade, growing distance for a while
              </option>
              <option value="on_off">
                On/off cycles, many mini-breakups before the final one
              </option>
              <option value="mutual_tired">
                Mutually tired, both know it is coming
              </option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              What usually happens after the breakup?
            </label>
            <select name="postContact" style={controlStyle}>
              <option value="no_contact">
                We go no-contact and stay out of touch
              </option>
              <option value="friends">
                We stay in contact “as friends” for a while
              </option>
              <option value="back_and_forth">
                We keep texting / meeting and sometimes get back together
              </option>
              <option value="they_hover">
                They keep hovering around, I struggle to fully detach
              </option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe one breakup that feels like a typical example of your pattern..."
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

        {result && result.indices && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Breakup‑pattern intensity:{" "}
              {result.overall_breakup_pattern_intensity}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>
                Pattern Entrenchment Index:{" "}
                {result.indices.pattern_entrenchment_index}
              </strong>
              <br />
              Shows how deeply this breakup arc repeats across relationships.
              0 = one-off or rare, 1 = many similar endings over time.
            </p>

            <p>
              <strong>
                Exit Agency Balance: {result.indices.exit_agency_balance}
              </strong>
              <br />
              Reflects how one-sided or shared the decision to end usually is.
              0 = almost always one person ends it, 1 = more mutual or balanced
              endings.
            </p>

            <p>
              <strong>
                Build‑up Awareness Score:{" "}
                {result.indices.build_up_awareness_score}
              </strong>
              <br />
              Captures how much warning there usually is before the breakup.
              0 = sudden implosions “out of nowhere”, 1 = clear trajectory and
              signals.
            </p>

            <p>
              <strong>
                Post‑Breakup Fusion Risk:{" "}
                {result.indices.post_breakup_fusion_risk}
              </strong>
              <br />
              Measures how entangled things stay after the breakup. 0 = clean
              separation, 1 = lots of contact, on/off, or hovering.
            </p>

            <p>
              <strong>
                Next‑Cycle Probability:{" "}
                {result.indices.next_cycle_probability}
              </strong>
              <br />
              Estimates how likely a similar breakup pattern is to repeat if
              nothing structural changes. 0 = low chance, 1 = very likely.
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
