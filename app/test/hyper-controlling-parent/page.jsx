"use client";

import { useState } from "react";

export default function HyperControllingParentTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const emotional_tone = formData.get("emotional_tone");
    const autonomy = formData.get("autonomy");
    const privacy = formData.get("privacy");
    const punishment_pattern = formData.get("punishment_pattern");
    const current_effect = formData.get("current_effect");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "hyper_controlling_parent",
        answers: {
          emotional_tone,
          autonomy,
          privacy,
          punishment_pattern,
          current_effect,
        },
        narrative,
      }),
    });

    const data = await res.json();
    console.log("RESULT", data);
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
            Hyper‑controlling parent pattern
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Check if what you grew up with was care — or control, guilt, and
            humiliation dressed up as “love”. We&apos;ll map how this pattern
            might echo in your current relationships.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              What was the usual emotional tone from the parent you&apos;re
              thinking about?
            </label>
            <select name="emotional_tone" style={controlStyle}>
              <option value="mostly_warm">
                Mostly warm, with occasional criticism or tension
              </option>
              <option value="warm_but_controlling">
                Warm but controlling: “I love you, so you must do it my way”
              </option>
              <option value="cold_or_humiliating">
                Often cold, critical, shaming or mocking
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How much autonomy did you have in everyday decisions (clothes,
              friends, hobbies, schedule)?
            </label>
            <select name="autonomy" style={controlStyle}>
              <option value="very_little">
                Very little: most choices were decided or “approved” by them
              </option>
              <option value="some">
                Some autonomy, but big or &quot;important&quot; choices were
                tightly controlled
              </option>
              <option value="a_lot">
                A lot: I could experiment and make my own choices, even if they
                disagreed
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How did they treat your privacy (room, phone, diary, messages)?
            </label>
            <select name="privacy" style={controlStyle}>
              <option value="no_privacy">
                No real privacy: checking, reading, or bursting in was normal
              </option>
              <option value="conditional_privacy">
                Conditional privacy: they could invade it “for your own good”
              </option>
              <option value="respected_privacy">
                Mostly respected my space and boundaries
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What happened when you didn&apos;t obey or had your own opinion?
            </label>
            <select name="punishment_pattern" style={controlStyle}>
              <option value="guilt_and_shame">
                Guilt / shame: “you&apos;re ungrateful”, “you hurt me”
              </option>
              <option value="anger_and_control">
                Anger, lectures, threats, or control over money / freedom
              </option>
              <option value="calm_limits">
                Calm discussion and clear limits without humiliation
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How do you feel this still affects your current relationships?
            </label>
            <select name="current_effect" style={controlStyle}>
              <option value="over_adapting">
                I over‑adapt, scan for other people&apos;s moods, try not to
                upset anyone
              </option>
              <option value="tolerating_control">
                I tolerate controlling or disrespectful behavior longer than I
                want to
              </option>
              <option value="strong_rebellion">
                I go into strong rebellion or cut‑offs when I feel any control
              </option>
              <option value="minimal_effect">
                I notice some echoes, but it doesn&apos;t drive my relationships
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a situation from childhood that still feels vivid — and, if you want, a moment where you noticed the same pattern in an adult relationship..."
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
              Overall hyper‑control level: {result.overall_hypercontrol_level}
            </h2>

 <h3 style={sectionTitleStyle}>Indices</h3>

<p>
  <strong>
    Boundary Violation Probability:{" "}
    {result.indices.boundary_violation_probability}
  </strong>
  <br />
  Measures how often personal limits and “no’s” were ignored or pushed
  through. 0 = boundaries were mostly respected, 1 = they were regularly
  overridden.
</p>

<p>
  <strong>
    Communication Clarity Index:{" "}
    {result.indices.communication_clarity_index}
  </strong>
  <br />
  How clear and direct communication around rules, expectations, and
  conflicts felt. 0 = confusing, double messages, 1 = mostly
  straightforward.
</p>

<p>
  <strong>
    Emotional Stability Index:{" "}
    {result.indices.emotional_stability_index}
  </strong>
  <br />
  How stable the emotional tone was over time. 0 = sharp mood swings and
  unpredictability, 1 = mostly steady and understandable.
</p>

<p>
  <strong>
    Initiative Balance Index:{" "}
    {result.indices.initiative_balance_index}
  </strong>
  <br />
  How balanced initiative and effort were between you and the parent. 0 =
  one side carried everything, 1 = effort was more evenly shared.
</p>

<p>
  <strong>
    Pattern Recurrence Probability:{" "}
    {result.indices.pattern_recurrence_probability}
  </strong>
  <br />
  How likely this pattern is to repeat in your current relationships. 0 =
  low chance, 1 = very likely to replay under similar conditions.
</p>

<p>
  <strong>
    Long‑Term Stability Forecast:{" "}
    {result.indices.long_term_stability_forecast}
  </strong>
  <br />
  How sustainable this way of relating was in the long run. 0 = very low,
  1 = high chance that the dynamic could remain stable.
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
