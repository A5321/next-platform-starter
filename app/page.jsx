export default function Home() {
  const buttonStyle = {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.3)",
    textDecoration: "none",
    color: "#ffffff",
    width: 280,            // фиксированная ширина для всех трёх
    textAlign: "left",     // чтобы текст не был по центру (можно "center", если хочешь)
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
          See your relationship patterns on one screen.
        </h1>
        <p style={{ marginBottom: 24, opacity: 0.9 }}>
          Answer a few questions, add your story if you want, and get a structured
          AI breakdown of how your current dynamic behaves.
        </p>

        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Start a free checkup:</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: 8 }}>
            <a href="/test/current-relationship" style={buttonStyle}>
              Current relationship checkup
            </a>
          </li>
          <li style={{ marginBottom: 8 }}>
            <a href="/test/mixed-signals" style={buttonStyle}>
              Mixed signals / interest gap
            </a>
          </li>
          <li style={{ marginBottom: 8 }}>
            <a href="/test/repeating-breakup" style={buttonStyle}>
              Repeating breakup pattern
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
