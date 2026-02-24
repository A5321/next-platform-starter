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
                Parental Control Index:{" "}
                {result.indices.parental_control_index}
              </strong>
              <br />
              Measures how intensely decisions, choices, and daily life were
              controlled. 0 = mostly supportive guidance, 1 = heavy control
              over most areas of life.
            </p>

            <p>
              <strong>
                Emotional Safety Score: {result.indices.emotional_safety_score}
              </strong>
              <br />
              Reflects how safe it was to show feelings, needs, or disagreement.
              0 = high risk of shame or attack, 1 = mostly safe, even if not
              perfect.
            </p>

            <p>
              <strong>
                Boundary Respect Index:{" "}
                {result.indices.boundary_respect_index}
              </strong>
              <br />
              Shows how much your physical and psychological boundaries were
              acknowledged. 0 = frequent invasions, 1 = boundaries usually
              noticed and honored.
            </p>

            <p>
              <strong>
                Internalised Control Pattern:{" "}
                {result.indices.internalised_control_pattern}
              </strong>
              <br />
              Estimates how likely you are to repeat this pattern — either by
              over‑controlling others or over‑adapting to control. 0 = low
              carry‑over, 1 = strong internalisation.
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
