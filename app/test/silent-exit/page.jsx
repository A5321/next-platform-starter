"use client";

import { useState } from "react";

export default function SilentExitTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const daily_presence = formData.get("daily_presence");
    const emotional_engagement = formData.get("emotional_engagement");
    const conflict_handling = formData.get("conflict_handling");
    const shared_life_pattern = formData.get("shared_life_pattern");
    const silent_breakup_risk = formData.get("silent_breakup_risk");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "silent_exit",
        answers: {
          daily_presence,
          emotional_engagement,
          conflict_handling,
          shared_life_pattern,
          silent_breakup_risk,
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
    backgroundColor: "#000000",
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
            Silent exit from the relationship
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            When things don&apos;t blow up, they just slowly fade. Check how
            strong the quiet-exit pattern is in this connection.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              How present are they in your everyday life right now?
            </label>
            <select name="daily_presence" style={controlStyle}>
              <option value="very_present">
                Very present: we talk and see each other regularly, they reach
                out on their own
              </option>
              <option value="somewhat_present">
                Somewhat present: contact is there, but thinner or more on my
                initiative
              </option>
              <option value="rare_presence">
                Rare presence: long gaps, I mostly keep the contact alive
              </option>
              <option value="almost_absent">
                Almost absent: they mostly disappear, minimal response or
                effort
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How emotionally engaged do they feel with you?
            </label>
            <select name="emotional_engagement" style={controlStyle}>
              <option value="warm_and_engaged">
                Warm and engaged: they share, ask, and respond emotionally
              </option>
              <option value="mixed_engagement">
                Mixed: sometimes open, sometimes distant or distracted
              </option>
              <option value="mostly_flat">
                Mostly flat: polite, but emotionally flat or checked out
              </option>
              <option value="strongly_withdrawn">
                Strongly withdrawn: almost no emotional contact or interest
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What happens with conflict or hard topics between you?
            </label>
            <select name="conflict_handling" style={controlStyle}>
              <option value="addressed_openly">
                We usually talk things through, even if it&apos;s uncomfortable
              </option>
              <option value="sometimes_avoided">
                Some topics get talked about, others get gently avoided
              </option>
              <option value="often_avoided">
                Often avoided: tensions linger, we change the subject or let it
                slide
              </option>
              <option value="stonewalling_or_shut_down">
                Stonewalling / shut down: hard topics almost never get named or
                processed
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How much does your life still feel shared versus parallel?
            </label>
            <select name="shared_life_pattern" style={controlStyle}>
              <option value="deeply_interwoven">
                Deeply interwoven: shared plans, routines, and social circles
              </option>
              <option value="partly_shared">
                Partly shared: some overlap, but more separate pockets of life
              </option>
              <option value="mostly_parallel">
                Mostly parallel: separate routines with some contact points
              </option>
              <option value="almost_separate">
                Almost separate lives that technically still count as a
                relationship
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How likely does it feel that this could quietly end without a real
              talk?
            </label>
            <select name="silent_breakup_risk" style={controlStyle}>
              <option value="very_unlikely">
                Very unlikely: if something changes, we would definitely talk
                about it
              </option>
              <option value="possible_but_not_probable">
                Possible but not probable: I can imagine it, but it doesn&apos;t
                feel close
              </option>
              <option value="quite_likely">
                Quite likely: I&apos;m afraid it might just fade out or get
                silently downgraded
              </option>
              <option value="already_feels_like_ending">
                It already feels like it&apos;s ending, just without clear
                words
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe what the 'quiet drift' looks and feels like for you right now..."
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
              {loading ? "Analyzing..." : "Analyze silent exit pattern"}
            </button>
          </div>
        </form>

        {result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Silent‑exit level: {result.overall_exit_pattern_level}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>
                Presence Fade Index: {result.indices.presence_fade_index}
              </strong>
              <br />
              Shows how much their everyday presence and initiative have faded.
              0 = very present and engaged, 1 = strong disappearance pattern.
            </p>

            <p>
              <strong>
                Emotional Withdrawal Score:{" "}
                {result.indices.emotional_withdrawal_score}
              </strong>
              <br />
              Reflects how emotionally shut down or disconnected they feel.
              0 = emotionally responsive, 1 = strongly withdrawn or indifferent.
            </p>

            <p>
              <strong>
                Conflict Avoidance Index:{" "}
                {result.indices.conflict_avoidance_index}
              </strong>
              <br />
              Captures how much hard topics and tensions are avoided instead of
              talked through. 0 = conflicts are addressed, 1 = strong avoidance
              or shutdown.
            </p>

            <p>
              <strong>
                Parallel Life Drift Score:{" "}
                {result.indices.parallel_life_drift_score}
              </strong>
              <br />
              Describes how parallel your lives have become. 0 = deeply
              interwoven, 1 = almost separate lives under the same label.
            </p>

            <p>
              <strong>
                Closure Risk Index: {result.indices.closure_risk_index}
              </strong>
              <br />
              Estimates how likely it is that things will end without a clear
              closure talk. 0 = very unlikely, 1 = high risk of a quiet or
              abrupt exit.
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
