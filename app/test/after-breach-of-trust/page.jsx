"use client";

import { useState } from "react";

export default function AfterBreachOfTrustTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const type_of_breach = formData.get("type_of_breach");
    const time_since_breach = formData.get("time_since_breach");
    const accountability = formData.get("accountability");
    const repair_behavior = formData.get("repair_behavior");
    const symptom_level = formData.get("symptom_level");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "after_breach_of_trust",
        answers: {
          type_of_breach,
          time_since_breach,
          accountability,
          repair_behavior,
          symptom_level,
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
            After a serious breach of trust
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            If there was cheating, lying, or another major breach, see whether
            the relationship is actually healing — or just frozen around the
            wound.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              What kind of breach are you primarily thinking about?
            </label>
            <select name="type_of_breach" style={controlStyle}>
              <option value="sexual_or_romantic_infidelity">
                Sexual or romantic infidelity
              </option>
              <option value="major_lie_or_deception">
                Major lie or ongoing deception
              </option>
              <option value="financial_betrayal">
                Financial betrayal (hidden debt, spending, or decisions)
              </option>
              <option value="other_breach">
                Other breach of trust that changed how you see them
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How long ago did this breach become known?
            </label>
            <select name="time_since_breach" style={controlStyle}>
              <option value="less_than_3_months">
                Less than 3 months ago
              </option>
              <option value="3_to_12_months">3–12 months ago</option>
              <option value="one_to_three_years">1–3 years ago</option>
              <option value="more_than_three_years">
                More than 3 years ago
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How does the person who broke trust relate to what happened now?
            </label>
            <select name="accountability" style={controlStyle}>
              <option value="minimising_or_blame_shifting">
                Often minimises, gets defensive, or shifts blame to me / context
              </option>
              <option value="mixed_accountability">
                Sometimes takes responsibility, sometimes backs away from it
              </option>
              <option value="clear_accountability">
                Clearly takes responsibility and doesn&apos;t rewrite the story
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What has repair looked like in practice?
            </label>
            <select name="repair_behavior" style={controlStyle}>
              <option value="no_real_change">
                Lots of words, but no real change in behaviour or transparency
              </option>
              <option value="partial_change">
                Some concrete changes, but also repetition or secrecy
              </option>
              <option value="consistent_change">
                Consistent change, more openness, and active work on trust
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How present are the “symptoms” right now (checking, anxiety,
              flashbacks, fights about it)?
            </label>
            <select name="symptom_level" style={controlStyle}>
              <option value="very_intense">
                Very intense: the breach is still in the centre of the
                relationship
              </option>
              <option value="moderate">
                Moderate: comes up regularly, but not all the time
              </option>
              <option value="low_but_present">
                Low but present: it flares up at triggers, but not daily
              </option>
              <option value="mostly_integrated">
                Mostly integrated: it&apos;s part of the story, but not driving
                the present
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe what happened and what this relationship feels like now..."
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
              {loading ? "Analyzing..." : "Analyze trust recovery"}
            </button>
          </div>
        </form>

{result && (
  <section style={{ marginTop: 32, lineHeight: 1.5 }}>
    <h2 style={sectionTitleStyle}>
      Trust‑recovery level: {result.overall_trust_recovery_level}
    </h2>

    <h3 style={sectionTitleStyle}>Indices</h3>

    <p>
      <strong>
        Repair Effort Index: {result.indices.repair_effort_index}
      </strong>
      <br />
      Shows how consistently the person who broke trust is engaging in
      concrete repair over time. 0 = almost no visible repair, 1 = steady,
      aligned actions.
    </p>

    <p>
      <strong>
        Accountability Depth Score:{" "}
        {result.indices.accountability_depth_score}
      </strong>
      <br />
      Reflects how fully they own the impact without defensiveness or
      rushing you to move on. 0 = shallow or blaming, 1 = clear, grounded
      ownership.
    </p>

    <p>
      <strong>
        Boundary Reset Strength: {result.indices.boundary_reset_strength}
      </strong>
      <br />
      Captures how solid new limits and agreements are after the breach.
      0 = almost no real change, 1 = concrete new structures that are mostly
      respected.
    </p>

    <p>
      <strong>
        Trust Regrowth Pace: {result.indices.trust_regrowth_pace}
      </strong>
      <br />
      Describes the direction of trust over time. 0 = stalled or eroding,
      1 = slow but noticeable rebuilding.
    </p>

    <p>
      <strong>
        Relapse Risk Index: {result.indices.relapse_risk_index}
      </strong>
      <br />
      Estimates how likely a similar breach is to repeat under current
      conditions. 0 = low risk with strong changes, 1 = high risk, many
      things unchanged.
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
