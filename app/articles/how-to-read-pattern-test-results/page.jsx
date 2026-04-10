// app/articles/how-to-read-pattern-test-results/page.jsx
import Link from "next/link";

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f7fb",
  color: "#10131a",
};

const containerStyle = {
  width: "100%",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "24px 16px 72px",
  boxSizing: "border-box",
};

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "44px",
};

const brandStyle = {
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textDecoration: "none",
  color: "#10131a",
};

const navLinksStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const navLinkStyle = {
  color: "#3f4a5f",
  textDecoration: "none",
  fontSize: "14px",
  padding: "10px 14px",
  border: "1px solid rgba(16,19,26,0.12)",
  borderRadius: "999px",
};

const activeNavLinkStyle = {
  color: "#10131a",
  textDecoration: "none",
  fontSize: "14px",
  padding: "10px 14px",
  border: "1px solid rgba(16,19,26,0.16)",
  background: "#ffffff",
  borderRadius: "999px",
};

const articleWrapStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "24px",
  alignItems: "start",
};

const articleStyle = {
  background: "#ffffff",
  border: "1px solid rgba(16,19,26,0.08)",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 14px 40px rgba(16,19,26,0.05)",
  width: "100%",
  maxWidth: "1060px",
};

const metaStyle = {
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#667085",
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "clamp(34px, 6vw, 56px)",
  lineHeight: 1.04,
  margin: "0 0 16px",
};

const descriptionStyle = {
  fontSize: "19px",
  lineHeight: 1.7,
  color: "#465065",
  margin: "0 0 28px",
  maxWidth: "36ch",
};

const leadStyle = {
  fontSize: "20px",
  lineHeight: 1.8,
  color: "#1e2430",
  margin: "0 0 28px",
};

const h2Style = {
  fontSize: "28px",
  lineHeight: 1.15,
  margin: "36px 0 14px",
};

const paragraphStyle = {
  fontSize: "17px",
  lineHeight: 1.9,
  color: "#334155",
  margin: "0 0 18px",
};

const asideStyle = {
  background: "#ffffff",
  border: "1px solid rgba(16,19,26,0.08)",
  borderRadius: "20px",
  padding: "22px",
  boxShadow: "0 14px 40px rgba(16,19,26,0.05)",
  maxWidth: "280px",
};

const asideTitleStyle = {
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#667085",
  marginBottom: "12px",
};

const asideLinkStyle = {
  display: "block",
  fontSize: "16px",
  lineHeight: 1.5,
  color: "#10131a",
  textDecoration: "none",
  fontWeight: 700,
  marginBottom: "12px",
};

const asideTextStyle = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#465065",
  margin: "0 0 16px",
};

const buttonStyle = {
  display: "inline-block",
  padding: "11px 16px",
  borderRadius: "999px",
  background: "#10131a",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 700,
};

export default function ReadResultsArticlePage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <header style={navStyle}>
          <Link href="/" style={brandStyle}>
            PATTERN INDEX
          </Link>

          <nav style={navLinksStyle}>
            <Link href="/tests" style={navLinkStyle}>
              TESTS
            </Link>
            <Link href="/articles" style={activeNavLinkStyle}>
              ARTICLES
            </Link>
          </nav>
        </header>

        <div style={articleWrapStyle}>
          <article style={articleStyle}>
            <div style={metaStyle}>Guides · April 10, 2026 · 5 min read</div>

            <h1 style={titleStyle}>How to read pattern test results without overreacting</h1>
            <p style={descriptionStyle}>
              A practical method for interpreting pattern scores without turning one result into a final verdict.
            </p>

            <p style={leadStyle}>
              Pattern test results are most useful when they help you organize perception.
              They become harmful when you use them as absolute proof, moral certainty,
              or a substitute for observing repeated behavior over time.
            </p>

            <h2 style={h2Style}>Start with pattern, not panic</h2>
            <p style={paragraphStyle}>
              If a score feels sharp or confronting, resist the urge to convert it instantly into a conclusion.
              The first job of a result is not to tell you what to do, but to tell you what to examine more carefully.
            </p>

            <h2 style={h2Style}>Ask three follow-up questions</h2>
            <p style={paragraphStyle}>
              First: what exactly repeats? Second: what happens when the issue is addressed directly?
              Third: does the pattern improve temporarily or structurally?
            </p>

            <h2 style={h2Style}>Use scores as directional, not prophetic</h2>
            <p style={paragraphStyle}>
              A low trust or reciprocity score does not predict the future by itself.
              It signals that the current pattern deserves closer attention, especially
              if the same dynamic continues across different situations and repair attempts.
            </p>

            <h2 style={h2Style}>What a good interpretation looks like</h2>
            <p style={paragraphStyle}>
              The most useful reading combines the result with observation.
              Instead of saying, "The test proved everything," say,
              "The test highlighted a pattern I should verify against repeated behavior,
              consistency, and response to accountability."
            </p>
          </article>

          <aside style={asideStyle}>
            <div style={asideTitleStyle}>Related test</div>
            <Link href="/test/trust-their-signals" style={asideLinkStyle}>
              Can you trust their signals?
            </Link>
            <p style={asideTextStyle}>
              Open the related checkup if you want to examine the same pattern in a more structured format.
            </p>
            <Link href="/test/trust-their-signals" style={buttonStyle}>
              Open test
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
