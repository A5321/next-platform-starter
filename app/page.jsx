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
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          width: "100%",
          backgroundColor: "#000000",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>
          See your relationship patterns clearly
        </h1>
        <p style={{ fontSize: 24, marginBottom: 24, opacity: 0.9 }}>
          Answer a few questions and get a structured breakdown
        </p>
        <p style={{ fontSize: 20, marginBottom: 12, opacity: 0.9 }}>
          Example result:
        </p>
        <p style={{ fontSize: 16, marginBottom: 12, opacity: 0.9 }}>
          <strong>Reciprocity Score: 0.4</strong><br></br>
          Measures how balanced emotional, practical, and time investment is between people.
        </p>
        <p style={{ fontSize: 16, marginBottom: 12, opacity: 0.9 }}>
          <strong>Initiative Balance Index: 0.3</strong><br></br>
          Measures asymmetry in who initiates contact.
        </p>
        <p style={{ fontSize: 16, marginBottom: 12, opacity: 0.9 }}>
          <strong>Emotional Stability Index: 0.2</strong><br></br>
          Measures how stable or volatile reactions are.
        </p>
        <p style={{ fontSize: 16, marginBottom: 12, opacity: 0.9 }}>
          <strong>Boundary Violation Probability: 0.1</strong><br></br>
          Likelihood that your personal boundaries are being crossed or ignored in this dynamic.
        </p>
        <p style={{ fontSize: 16, marginBottom: 12, opacity: 0.9 }}>
          <strong>Communication Clarity Index: 0.5</strong><br></br>
          How clear, direct, and interpretable the other person’s signals and communication actually are.
        </p>
        <p style={{ fontSize: 16, marginBottom: 12, opacity: 0.9 }}>
          <strong>Pattern Recurrence Probability: 0.6</strong><br></br>
          Likelihood that the current dynamic will repeat without change.
        </p>
          <strong>Long-Term Stability Forecast: 0.4</strong><br></br>
          Probability that the current relationship pattern will remain stable (or degrade) over time.<br></br>
        <p style={{ fontSize: 16, marginBottom: 24, opacity: 0.9 }}>
          <strong>Summary</strong><br></br>
          The relationship shows an imbalance in initiative, with the user mostly driving the connection forward, and a low reciprocity score indicating uneven 
          emotional and time investment. Emotional stability is low, as the partner's reactions are described as very unpredictable, which may create a volatile 
          emotional climate. Boundaries are almost never crossed, suggesting respect in that area despite the unpredictability. 
          Given the short duration of 0-3 months and these dynamics, the pattern may recur and the long-term stability appears uncertain, potentially feeling 
          inconsistent and effortful from the user's perspective.
        </p>
          {/* <h2 style={{ fontSize: 22, marginBottom: 12 }}>Start a free checkup:</h2> */}
        <p style={{ marginBottom: 24 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={itemStyle}>
              <a href="/test/current-relationship" style={buttonStyle}>
                Start analysis
              </a>
            </li>
          </ul>
        </p>
      </div>
          
        <p style={{ fontSize: 20, marginBottom: 12, opacity: 0.9 }}>
          Other scenarios:
        </p>
 
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
                Look at your breakups as a repeating structure, not just bad
                luck or “wrong people”.
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
                See whether the relationship is actually healing — or just
                frozen around the wound.
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
    </main>
  );
}
