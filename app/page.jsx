export default function Home() {
  const buttonStyle = {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.3)",
    textDecoration: "none",
    color: "#ffffff",
    width: 700,
    textAlign: "left",
    fontSize: 14,
  };

  const descriptionStyle = {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.8,
  };

  const itemStyle = {
    marginBottom: 10,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "40px 16px",
      }}
    >
      <div style={{ maxWidth: 800, width: "100%" }}>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>
          See your relationship patterns on one screen
        </h1>
        <p style={{ marginBottom: 24, opacity: 0.9 }}>
          Answer a few questions, add your story if you want, and get a structured
          AI breakdown of how your current dynamic behaves.
        </p>

        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Start a free checkup:</h2>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={itemStyle}>
            <a href="/test/current-relationship" style={buttonStyle}>
              Current relationship checkup
              <div style={descriptionStyle}>
                See how your current dynamic behaves on a structural level, not
                through isolated episodes.
              </div>
            </a>
          </li>

          <li style={itemStyle}>
            <a href="/test/mixed-signals" style={buttonStyle}>
              Mixed signals / interest gap
              <div style={descriptionStyle}>
                Map how consistent their interest really is, beyond words and
                “busy right now”.
              </div>
            </a>
          </li>

          <li style={itemStyle}>
            <a href="/test/repeating-breakup" style={buttonStyle}>
              Repeating breakup pattern
              <div style={descriptionStyle}>
                Look at your breakups as a repeating structure, not just bad luck
                or “wrong people”.
              </div>
            </a>
          </li>

          <li style={itemStyle}>
            <a href="/test/hyper-controlling-parent" style={buttonStyle}>
              Hyper‑controlling parent pattern
              <div style={descriptionStyle}>
                Check if what you grew up with was care — or control, guilt, and
                humiliation dressed up as “love”.
              </div>
            </a>
          </li>

          <li style={itemStyle}>
            <a href="/test/third-person-grey-zone" style={buttonStyle}>
              Third person in the grey zone
              <div style={descriptionStyle}>
                See how much risk of a triangle you’re living with through
                “just a friend” or a secret chat.
              </div>
            </a>
          </li>

          <li style={itemStyle}>
            <a href="/test/trust-their-signals" style={buttonStyle}>
              Can you trust their signals?
              <div style={descriptionStyle}>
                Test how readable this person really is: clear pattern or just
                noise you’re decoding.
              </div>
            </a>
          </li>

          <li style={itemStyle}>
            <a href="/test/after-breach-of-trust" style={buttonStyle}>
              After a serious breach of trust
              <div style={descriptionStyle}>
                See whether the relationship is actually healing — or just frozen
                around the wound.
              </div>
            </a>
          </li>

          <li style={itemStyle}>
            <a href="/test/silent-exit" style={buttonStyle}>
              Silent exit from the relationship
              <div style={descriptionStyle}>
                Check if you’re still in a living relationship, or if one of you
                is already quietly checking out.
              </div>
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
