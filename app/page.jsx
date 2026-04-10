// app/page.jsx
import Link from "next/link";

const tests = [
  {
    href: "/test/current-relationship",
    title: "Current relationship checkup",
    description:
      "See how your current dynamic behaves on a structural level, not through isolated episodes.",
  },
  {
    href: "/test/you-are-an-option",
    title: "You are an option checkup",
    description:
      "See if you're genuinely chosen or just someone they return to when nothing better is happening.",
  },
  {
    href: "/test/mixed-signals",
    title: "Mixed signals interest gap",
    description:
      "Map how consistent their interest really is, beyond words and busy right now.",
  },
];

const articles = [
  {
    href: "/articles/what-reciprocity-imbalance-looks-like",
    title: "What reciprocity imbalance actually looks like",
    description:
      "How to tell the difference between a temporary asymmetry and a deeply one-sided relationship pattern.",
  },
  {
    href: "/articles/how-to-read-pattern-test-results",
    title: "How to read pattern test results without overreacting",
    description:
      "A practical guide to interpreting scores without turning one result into a final verdict.",
  },
];

const pageStyle = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, rgba(77, 113, 255, 0.15), transparent 28%), #0f1115",
  color: "#f5f7fb",
};

const containerStyle = {
  width: "100%",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "24px 16px 64px",
  boxSizing: "border-box",
};

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "56px",
};

const brandStyle = {
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textDecoration: "none",
  color: "#ffffff",
};

const navLinksStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const navLinkStyle = {
  color: "#cfd6e4",
  textDecoration: "none",
  fontSize: "14px",
  padding: "10px 14px",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "999px",
};

const heroStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
  alignItems: "stretch",
  marginBottom: "32px",
};

const heroCardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "28px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#9db0ff",
  marginBottom: "14px",
};

const h1Style = {
  fontSize: "clamp(38px, 7vw, 72px)",
  lineHeight: 1,
  margin: "0 0 18px",
};

const leadStyle = {
  fontSize: "18px",
  lineHeight: 1.6,
  color: "#d5dbea",
  margin: 0,
  maxWidth: "38ch",
};

const sectionGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
  marginTop: "32px",
};

const sectionCardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "28px",
};

const sectionTitleStyle = {
  fontSize: "28px",
  margin: "0 0 12px",
};

const sectionTextStyle = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#cfd6e4",
  marginBottom: "18px",
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const itemStyle = {
  padding: "14px 16px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
};

const itemTitleStyle = {
  display: "block",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 600,
  marginBottom: "6px",
};

const itemDescriptionStyle = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: "#b6c0d4",
  margin: 0,
};

const ctaRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  marginTop: "24px",
};

const primaryButtonStyle = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: "999px",
  background: "#ffffff",
  color: "#0f1115",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 700,
};

const secondaryButtonStyle = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 600,
};

export default function HomePage() {
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
            <Link href="/articles" style={navLinkStyle}>
              ARTICLES
            </Link>
          </nav>
        </header>

        <section style={heroStyle}>
          <div style={heroCardStyle}>
            <div style={eyebrowStyle}>Behavioral pattern tests</div>
            <h1 style={h1Style}>Understand the pattern, not just the episode.</h1>
            <p style={leadStyle}>
              Pattern Index combines structured tests and practical articles to
              help people read relationship dynamics with more clarity and less noise.
            </p>

            <div style={ctaRowStyle}>
              <Link href="/tests" style={primaryButtonStyle}>
                Explore tests
              </Link>
              <Link href="/articles" style={secondaryButtonStyle}>
                Read articles
              </Link>
            </div>
          </div>

          <div style={heroCardStyle}>
            <div style={eyebrowStyle}>What you can do here</div>
            <p style={{ ...sectionTextStyle, marginBottom: "14px" }}>
              Use TESTS when you need a fast structured checkup.
            </p>
            <p style={{ ...sectionTextStyle, marginBottom: "14px" }}>
              Use ARTICLES when you want context, interpretation, and examples.
            </p>
            <p style={{ ...sectionTextStyle, marginBottom: 0 }}>
              Both sections should work together: articles explain patterns, and
              tests help readers check whether those patterns show up in their own situation.
            </p>
          </div>
        </section>

        <section style={sectionGridStyle}>
          <div style={sectionCardStyle}>
            <h2 style={sectionTitleStyle}>TESTS</h2>
            <p style={sectionTextStyle}>
              Structured checkups for recurring relationship and family dynamics.
            </p>

            <div style={listStyle}>
              {tests.map((item) => (
                <div key={item.href} style={itemStyle}>
                  <Link href={item.href} style={itemTitleStyle}>
                    {item.title}
                  </Link>
                  <p style={itemDescriptionStyle}>{item.description}</p>
                </div>
              ))}
            </div>

            <div style={ctaRowStyle}>
              <Link href="/tests" style={primaryButtonStyle}>
                Open all tests
              </Link>
            </div>
          </div>

          <div style={sectionCardStyle}>
            <h2 style={sectionTitleStyle}>ARTICLES</h2>
            <p style={sectionTextStyle}>
              Editorial guides that explain the meaning behind the scores and patterns.
            </p>

            <div style={listStyle}>
              {articles.map((item) => (
                <div key={item.href} style={itemStyle}>
                  <Link href={item.href} style={itemTitleStyle}>
                    {item.title}
                  </Link>
                  <p style={itemDescriptionStyle}>{item.description}</p>
                </div>
              ))}
            </div>

            <div style={ctaRowStyle}>
              <Link href="/articles" style={primaryButtonStyle}>
                Open all articles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
