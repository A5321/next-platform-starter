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

    const initiative_level = formData.get("initiative_level");
    const emotional_sharing = formData.get("emotional_sharing");
    const future_talk = formData.get("future_talk");
    const time_together_quality = formData.get("time_together_quality");
    const conflict_engagement = formData.get("conflict_engagement");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "silent_exit",
        answers: {
          initiative_level,
          emotional_sharing,
          future_talk,
          time_together_quality,
          conflict_engagement,
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

        {result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Emotional Presence Index: {result.overall_emotional_presence}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>
                Emotional Presence Index:{" "}
                {result.indices.emotional_presence_index}
              </strong>
              <br />
              Shows how much each of you is still actually in the relationship
              with attention and energy. 0 = almost checked out, 1 = fully
              present.
            </p>

            <p>
              <strong>
                Initiative Vitality Score:{" "}
                {result.indices.initiative_vitality_score}
              </strong>
              <br />
              Measures how alive mutual initiative still is. 0 = one‑sided
              dragging, 1 = both actively reach toward each other.
            </p>

            <p>
              <strong>
                Shared Future Engagement:{" "}
                {result.indices.shared_future_engagement}
              </strong>
              <br />
              Reflects how much the two of you still build or update a future
              together. 0 = almost no shared future, 1 = ongoing, realistic
              planning.
            </p>

            <p>
              <strong>
                Conflict Engagement Index:{" "}
                {result.indices.conflict_engagement_index}
              </strong>
              <br />
              Captures whether conflict is used to quietly exit or to stay in
              contact. 0 = avoid / shut down, 1 = present and working through.
            </p>

            <h3 style={sectionTitleStyle}>Summary</h3>
            <p>{result.summary}</p>
          </section>
        )}
      </div>
    </div>
  );
}
