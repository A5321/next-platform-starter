import Link from "next/link";
import { articles, categoryLabels } from "../articlesData";

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

const innerStyle = {
  width: "100%",
  maxWidth: "1020px",
  margin: "0 auto",
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

const articleStyle = {
  background: "#ffffff",
  border: "1px solid rgba(16,19,26,0.08)",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 14px 40px rgba(16,19,26,0.05)",
};

const categoryStyle = {
  display: "inline-block",
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#4e5fce",
  marginBottom: "10px",
};

const metaStyle = {
  fontSize: "13px",
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
  margin: "0 0 24px",
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
  whiteSpace: "pre-line",
};

const tagsStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  margin: "0 0 24px",
};

const tagStyle = {
  display: "inline-block",
  fontSize: "12px",
  color: "#344054",
  background: "#f2f4f7",
  borderRadius: "999px",
  padding: "6px 10px",
};

const relatedSectionStyle = {
  marginTop: "40px",
  paddingTop: "24px",
  borderTop: "1px solid rgba(16,19,26,0.08)",
};

const relatedTitleStyle = {
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#667085",
  marginBottom: "14px",
};

const relatedLinkStyle = {
  display: "block",
  color: "#10131a",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 1.4,
  marginBottom: "10px",
};

const notFoundStyle = {
  fontSize: "18px",
  color: "#465065",
};

export default function ArticlePage({ params }) {
  const { slug } = params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <main style={pageStyle}>
        <div style={containerStyle}>
          <p style={notFoundStyle}>Article not found.</p>
        </div>
      </main>
    );
  }

  const related = articles
    .filter(
      (item) =>
        item.category === article.category && item.slug !== article.slug
    )
    .slice(0, 3);

  const categoryLabel = categoryLabels[article.category] || article.category;

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <div style={innerStyle}>
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

          <article style={articleStyle}>
            <Link
              href={`/articles?category=${article.category}`}
              style={categoryStyle}
            >
              {categoryLabel}
            </Link>

            <div style={metaStyle}>
              {article.contentType} · {article.date} · {article.readTime}
            </div>

            <h1 style={titleStyle}>{article.title}</h1>

            <p style={descriptionStyle}>{article.description}</p>

            {article.tags && article.tags.length > 0 && (
              <div style={tagsStyle}>
                {article.tags.map((tag) => (
                  <span key={tag} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {article.content.map((block, index) => {
              if (block.type === "lead") {
                return (
                  <p key={index} style={leadStyle}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === "heading") {
                return (
                  <h2 key={index} style={h2Style}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "paragraph") {
                return (
                  <p key={index} style={paragraphStyle}>
                    {block.text}
                  </p>
                );
              }
              return null;
            })}

            {related.length > 0 && (
              <div style={relatedSectionStyle}>
                <div style={relatedTitleStyle}>
                  More in {categoryLabel}
                </div>
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/articles/${item.slug}`}
                    style={relatedLinkStyle}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
