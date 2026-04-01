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
const narrative = formData.get("narrative"); // ← вот этого не хватает

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "silent_exit-1",
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
  padding: "20px 16px",
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
          <h1 style={{ margin: 0, fontSize: 32 }}>
            Silent exit from the relationship
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Check if you&apos;re still in a living relationship — or if one of
            you is already slowly checking out while staying “officially
            together”.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              Who invests more initiative into contact and shared plans right
              now?
            </label>
            <select name="initiative_level" style={controlStyle}>
              <option value="mostly_me">
                Mostly me: if I stop, things almost stop
              </option>
              <option value="somewhat_me">
                Slightly more me, but they also initiate sometimes
              </option>
              <option value="balanced">
                Roughly balanced: both sides still reach toward each other
              </option>
              <option value="mostly_them">
                Mostly them: they currently carry more of the initiative
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How much meaningful emotional sharing is left between you?
            </label>
            <select name="emotional_sharing" style={controlStyle}>
              <option value="almost_none">
                Almost none: we mostly talk about logistics or neutral topics
              </option>
              <option value="reduced">
                Reduced: sometimes deeper talks, but much less than before
              </option>
              <option value="moderate">
                Moderate: still share feelings and inner life fairly regularly
              </option>
              <option value="high">
                High: emotional sharing is alive, even if we have issues
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How do conversations about the future together look right now?
            </label>
            <select name="future_talk" style={controlStyle}>
              <option value="avoided">
                Mostly avoided or postponed with vague answers
              </option>
              <option value="minimal_and_foggy">
                Minimal and foggy: some mentions, but nothing concrete
              </option>
              <option value="present_but_careful">
                Present but careful: we talk about the future with some caution
              </option>
              <option value="active_planning">
                Active planning: we make real plans and update them together
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              When you spend time together, what does it feel like?
            </label>
            <select name="time_together_quality" style={controlStyle}>
              <option value="disconnected">
                Disconnected: scrolling, silence, or parallel lives in one
                space
              </option>
              <option value="mixed_quality">
                Mixed: some alive moments, some “roommate mode”
              </option>
              <option value="mostly_connected">
                Mostly connected: there is still curiosity and contact
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What happens with conflict and difficult topics?
            </label>
            <select name="conflict_engagement" style={controlStyle}>
              <option value="avoid_or_shut_down">
                Avoid or shut down: “I don&apos;t want to talk about this”
              </option>
              <option value="brief_but_unresolved">
                Brief talks that don&apos;t really resolve anything
              </option>
              <option value="engaged_but_messy">
                Engaged but messy: we argue, but at least both are present
              </option>
              <option value="engaged_and_working">
                Engaged and working: we can stay in the room and move things
                slowly
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a few recent days or weeks that made you think: ‘Are we still really together, or just not breaking up?’..."
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
              {loading ? "Analyzing..." : "Analyze emotional presence"}
            </button>
          </div>
        </form>

{result && result.indices && (
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
        Conflict Avoidance Index: {result.indices.conflict_avoidance_index}
      </strong>
      <br />
      Captures how much hard topics and tensions are avoided instead of
      talked through. 0 = conflicts are addressed, 1 = strong avoidance or
      shutdown.
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
      closure talk. 0 = very unlikely, 1 = high risk of a quiet or abrupt
      exit.
    </p>

    {/* PAYPAL */}
    <div style={{ marginTop: 12 }}>
      <form
        action="https://www.paypal.com/ncp/payment/PERNBENX5NF8L"
        method="post"
        target="_blank"
      >
        <button type="submit">
          Pay with PayPal — $11
        </button>
      </form>
    </div>

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
