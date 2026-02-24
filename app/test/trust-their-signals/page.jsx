"use client";

import { useState } from "react";

export default function TrustTheirSignalsTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const clarity_in_conflict = formData.get("clarity_in_conflict");
    const clarity_about_intentions = formData.get(
      "clarity_about_intentions"
    );
    const reliability_of_promises = formData.get(
      "reliability_of_promises"
    );
    const reaction_to_questions = formData.get("reaction_to_questions");
    const gut_feeling = formData.get("gut_feeling");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "trust_their_signals",
        answers: {
          clarity_in_conflict,
          clarity_about_intentions,
          reliability_of_promises,
          reaction_to_questions,
          gut_feeling,
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
          <h1 style={{ margin: 0, fontSize: 32 }}>
            Can you trust their signals?
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Test how readable this person really is: are you responding to a
            clear pattern or constantly decoding mixed and shifting signals?
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              When there is tension or conflict, how clear are their signals?
            </label>
            <select name="clarity_in_conflict" style={controlStyle}>
              <option value="withdraw_or_attack">
                They either withdraw or attack; I have no idea what they
                actually feel
              </option>
              <option value="mixed_but_some_clues">
                Mixed: some honest signals, some games or shutdowns
              </option>
              <option value="mostly_clear">
                Mostly clear: I can understand what&apos;s going on even if it&apos;s
                uncomfortable
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How clearly do they communicate their intentions about this
              relationship?
            </label>
            <select name="clarity_about_intentions" style={controlStyle}>
              <option value="very_vague">
                Very vague: avoid labels, future talk, or any clear position
              </option>
              <option value="changing_story">
                Story changes depending on mood / context
              </option>
              <option value="mostly_consistent">
                Mostly consistent and understandable, even if not ideal
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How reliable are their promises and stated plans?
            </label>
            <select
              name="reliability_of_promises"
              style={controlStyle}
            >
              <option value="often_broken">
                Often broken or quietly forgotten
              </option>
              <option value="sometimes_kept">
                Sometimes kept, sometimes not — hard to predict
              </option>
              <option value="usually_kept">
                Usually kept; if something changes, they tell me directly
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What happens when you ask for clarity about their behavior?
            </label>
            <select name="reaction_to_questions" style={controlStyle}>
              <option value="defensive_or_flipping">
                They get defensive, flip it on me, or make me feel crazy
              </option>
              <option value="partial_answers">
                Give partial answers, change topic, or joke it away
              </option>
              <option value="open_and_direct">
                Open and direct: may need time, but they answer honestly
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              If you ignore words for a moment and scan your body, how does it
              feel to rely on their signals?
            </label>
            <select name="gut_feeling" style={controlStyle}>
              <option value="constantly_on_edge">
                Constantly on edge: waiting for next turn in the story
              </option>
              <option value="mixed">
                Mixed: some safety, some anxiety that doesn&apos;t go away
              </option>
              <option value="mostly_safe">
                Mostly safe: my system can rest between conflicts
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a moment when their signals felt especially confusing — or, in contrast, surprisingly clear..."
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
              {loading ? "Analyzing..." : "Analyze signals"}
            </button>
          </div>
        </form>

        {result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Trust‑in‑signals level: {result.overall_trust_in_signals}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>
                Signal Trust Index: {result.indices.signal_trust_index}
              </strong>
              <br />
              Overall sense of how safe it is to rely on their signals when you
              make decisions. 0 = you can&apos;t lean on them at all, 1 = signals
              are a solid base.
            </p>

            <p>
              <strong>
                Conflict Clarity Score:{" "}
                {result.indices.conflict_clarity_score}
              </strong>
              <br />
              Measures how understandable their behavior is when things get
              tense. 0 = chaos or manipulation, 1 = direct but human reactions.
            </p>

            <p>
              <strong>
                Intention Transparency Index:{" "}
                {result.indices.intention_transparency_index}
              </strong>
              <br />
              Shows how openly they talk about what they want with you. 0 =
              everything in hints, 1 = mostly explicit.
            </p>

            <p>
              <strong>
                Promise Reliability Score:{" "}
                {result.indices.promise_reliability_score}
              </strong>
              <br />
              Reflects how often words turn into consistent action. 0 = chronic
              flakiness, 1 = strong follow‑through.
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
