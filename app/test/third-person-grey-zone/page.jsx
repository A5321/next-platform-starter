"use client";

import { useState } from "react";

export default function ThirdPersonGreyZoneTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const third_role = formData.get("third_role");
    const secrecy_level = formData.get("secrecy_level");
    const comparison_frequency = formData.get("comparison_frequency");
    const boundary_clarity = formData.get("boundary_clarity");
    const emotional_investment = formData.get("emotional_investment");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "third_person_grey_zone",
        answers: {
          third_role,
          secrecy_level,
          comparison_frequency,
          boundary_clarity,
          emotional_investment,
        },
        narrative,
      }),
    });

    const data = await res.json();
    console.log("RESPONSE STATUS", res.status);
    console.log("RESPONSE BODY", data);
    
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
          <h1 style={{ margin: 0, fontSize: 32 }}>
            Third person in the grey zone
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            See how much risk of a triangle you&apos;re actually living with —
            through &quot;just a friend&quot;, an ex that never fully left, or a
            secret chat on the side.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              Who is this third person for your partner / for you?
            </label>
            <select name="third_role" style={controlStyle}>
              <option value="old_friend">
                Old friend or colleague (no clear romantic history)
              </option>
              <option value="ex_partner">
                Ex‑partner / ex‑situationship (history of romantic or sexual
                connection)
              </option>
              <option value="new_connection">
                New &quot;friend&quot; / person they recently got close to
              </option>
              <option value="unknown_status">
                Someone I don&apos;t fully understand the status of
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How much secrecy or hidden communication is around this person?
            </label>
            <select name="secrecy_level" style={controlStyle}>
              <option value="high_secrecy">
                High secrecy: deleting chats, hiding screens, vague about
                meetings
              </option>
              <option value="medium_secrecy">
                Medium secrecy: not exactly hiding, but also not really open
              </option>
              <option value="low_secrecy">
                Low secrecy: I broadly know when and how they talk
              </option>
              <option value="open">
                Open: I&apos;m invited in, nothing feels hidden
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How often does comparison show up (directly or indirectly)?
            </label>
            <select name="comparison_frequency" style={controlStyle}>
              <option value="frequent_comparisons">
                Frequently: I feel compared or replaced in subtle ways
              </option>
              <option value="occasional_comparisons">
                Occasionally: small comments or hints
              </option>
              <option value="rare_comparisons">
                Rarely: almost never comes up
              </option>
              <option value="no_comparisons">
                No comparisons that I notice
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How clear are the boundaries around this third person?
            </label>
            <select name="boundary_clarity" style={controlStyle}>
              <option value="very_blurry">
                Very blurry: nobody really knows what is allowed or not
              </option>
              <option value="partially_blurry">
                Partially blurry: some rules, but lots of grey areas
              </option>
              <option value="clear_but_not_enforced">
                Clear on paper, but not really enforced in practice
              </option>
              <option value="clear_and_kept">
                Clear and generally kept by both sides
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How emotionally invested does your partner (or you) seem in this
              third person?
            </label>
            <select name="emotional_investment" style={controlStyle}>
              <option value="very_invested">
                Very invested: lots of emotional energy, venting, or sharing
              </option>
              <option value="moderately_invested">
                Moderately: important, but not central
              </option>
              <option value="light_investment">
                Light: casual, surface‑level contact
              </option>
              <option value="minimal_investment">
                Minimal: doesn&apos;t seem emotionally loaded
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a situation that made you think: ‘Wait, is there a third person in this dynamic?’..."
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
              {loading ? "Analyzing..." : "Analyze triangle risk"}
            </button>
          </div>
        </form>

        {result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Overall triangle risk: {result.overall_triangle_risk}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>
                Triangle Risk Index: {result.indices.triangle_risk_index}
              </strong>
              <br />
              Overall likelihood that this grey‑zone connection functions as a
              hidden or emerging triangle. 0 = low, 1 = very high.
            </p>

            <p>
              <strong>
                Secrecy Load Score: {result.indices.secrecy_load_score}
              </strong>
              <br />
              Measures how much secrecy, hiding, or double life the situation
              carries. 0 = mostly transparent, 1 = heavily concealed.
            </p>

            <p>
              <strong>
                Boundary Blur Index: {result.indices.boundary_blur_index}
              </strong>
              <br />
              Shows how undefined or negotiable the limits around this person
              are. 0 = clear and stable, 1 = very blurred.
            </p>

            <p>
              <strong>
                Emotional Outsourcing Score:{" "}
                {result.indices.emotional_outsourcing_score}
              </strong>
              <br />
              Reflects how much emotional energy is redirected from the main
              relationship to the third person. 0 = almost none, 1 = a lot.
            </p>
<p>
  <strong>
    Comparison Pressure Index:{" "}
    {result.indices.comparison_pressure_index}
  </strong>
  <br />
  Shows how strong the sense of comparison or competition feels between you
  and this third person. 0 = almost no comparison, 1 = strong ongoing
  pressure to measure up or compete.
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
