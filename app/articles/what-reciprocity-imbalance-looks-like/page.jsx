// app/articles/what-reciprocity-imbalance-looks-like/page.jsx
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
  maxWidth: "1020px",
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

export default function ReciprocityArticlePage() {
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
            <div style={metaStyle}>Interpretation · April 10, 2026 · 6 min read</div>

            <h1 style={titleStyle}>What reciprocity imbalance actually looks like</h1>
            <p style={descriptionStyle}>
              How to separate a temporary asymmetry from a pattern where one person carries the relationship almost alone.
            </p>

            <p style={leadStyle}>
              Reciprocity imbalance does not mean every relationship must look perfectly equal every day.
              It means one person repeatedly carries more of the emotional, practical, or relational load
              without the pattern correcting itself over time.
            </p>

            <h2 style={h2Style}>What reciprocity is not</h2>
            <p style={paragraphStyle}>
              A healthy relationship can look asymmetric for a while. Illness, burnout, distance, career
              pressure, or family emergencies can all create temporary imbalance. The key question is not
              whether things are equal today, but whether both people still show orientation toward repair,
              effort, and re-balancing.
            </p>

            <h2 style={h2Style}>What real imbalance usually looks like</h2>
            <p style={paragraphStyle}>
              Structural imbalance usually shows up as repetition. One person initiates, clarifies, repairs,
              waits, explains, and absorbs uncertainty, while the other person contributes selectively and
              often only when pressure rises.
            </p>
            <p style={paragraphStyle}>
              In practice, this can look like chronic one-sided initiation, vague commitment, inconsistent
              emotional availability, or a pattern where care appears only after distance or conflict.
            </p>

            <h2 style={h2Style}>How not to overread one result</h2>
            <p style={paragraphStyle}>
              A single test result should not be treated as a verdict. It is more useful as a structured prompt:
              what repeats, what changes after repair attempts, and who is consistently carrying the relational work?
            </p>
          </article>

          <aside style={asideStyle}>
            <div style={asideTitleStyle}>Related test</div>
            <Link href="/test/current-relationship" style={asideLinkStyle}>
              Current relationship checkup
            </Link>
            <p style={asideTextStyle}>
              Open the related checkup if you want to examine the same pattern in a more structured format.
            </p>
            <Link href="/test/current-relationship" style={buttonStyle}>
              Open test
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
