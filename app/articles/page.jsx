// app/articles/page.jsx
import Link from "next/link";

const articles = [
  {
    href: "/articles/what-reciprocity-imbalance-looks-like",
    category: "Interpretation",
    title: "What reciprocity imbalance actually looks like",
    excerpt:
      "How to separate a temporary asymmetry from a relationship that is structurally one-sided.",
    readTime: "6 min read",
  },
  {
    href: "/articles/how-to-read-pattern-test-results",
    category: "Guides",
    title: "How to read pattern test results without overreacting",
    excerpt:
      "A practical method for interpreting pattern scores without turning one result into a final verdict.",
    readTime: "5 min read",
  },
];

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

const heroStyle = {
  marginBottom: "32px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#4e5fce",
  marginBottom: "12px",
};

const h1Style = {
  fontSize: "clamp(34px, 6vw, 58px)",
  lineHeight: 1.02,
  margin: "0 0 16px",
};

const leadStyle = {
  fontSize: "18px",
  lineHeight: 1.7,
  color: "#465065",
  margin: 0,
  maxWidth: "44rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid rgba(16,19,26,0.08)",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 14px 40px rgba(16,19,26,0.05)",
};

const metaStyle = {
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#667085",
  marginBottom: "10px",
};

const titleStyle = {
  display: "block",
  color: "#10131a",
  textDecoration: "none",
  fontSize: "22px",
  lineHeight: 1.2,
  fontWeight: 700,
  marginBottom: "12px",
};

const excerptStyle = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#465065",
  margin: "0 0 16px",
};

const readMoreStyle = {
  display: "inline-block",
  color: "#10131a",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 700,
};

export default function ArticlesPage() {
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

        <section style={heroStyle}>
          <div style={eyebrowStyle}>Articles</div>
          <h1 style={h1Style}>Context for the patterns behind the scores</h1>
          <p style={leadStyle}>
            Read practical articles that explain reciprocity, mixed signals, instability, trust,
            and other recurring dynamics that show up in pattern-based tests.
          </p>
        </section>

        <section style={gridStyle}>
          {articles.map((article) => (
            <article key={article.href} style={cardStyle}>
              <div style={metaStyle}>
                {article.category} · {article.readTime}
              </div>
              <Link href={article.href} style={titleStyle}>
                {article.title}
              </Link>
              <p style={excerptStyle}>{article.excerpt}</p>
              <Link href={article.href} style={readMoreStyle}>
                Read article
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
