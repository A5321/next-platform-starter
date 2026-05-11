// app/articles/[slug]/page.jsx
import Link from "next/link";
import { articles, categoryLabels } from "../articlesData";
import { notFound } from "next/navigation";

// Test mappings: article slug -> test slug
const testMappings = {
  "what-reciprocity-imbalance-looks-like": "current-relationship",
  "how-to-read-pattern-test-results": "trust-their-signals",
  "meta-awareness-and-the-inner-arbiter": null, // No direct test
  "how-the-brain-creates-certainty": "trust-their-signals",
  "default-mode-network-and-rumination": "current-relationship",
  "sleep-architecture-and-emotional-regulation": "current-relationship",
  "hrv-and-stress-recovery": "current-relationship",
  "reality-testing-and-meta-awareness": "mixed-signals",
  "mild-technique-step-by-step": null, // No direct test
};

const testTitles = {
  "current-relationship": "Current Relationship Test",
  "trust-their-signals": "Can you trust their signals?",
  "mixed-signals": "Mixed Signals Test",
  "hyper-controlling-parent": "Hyper-Controlling Parent Test",
  "repeating-breakup": "Repeating Breakup Test",
  "silent-exit": "Silent Exit Test",
  "third-person-grey-zone": "Third Person Grey Zone Test",
  "you-are-an-option": "You Are An Option Test",
};

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
  color: "#1565C0",
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

const categoryStyle = {
  display: "inline-block",
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#1565C0",
  marginBottom: "10px",
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
  maxWidth: "100%",
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

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  
  const article = articles.find((a) => a.slug === slug);
  
  if (!article) {
    notFound();
  }

  // Find related articles in same category
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  // Get related test
  const relatedTestSlug = testMappings[article.slug];
  const relatedTestTitle = relatedTestSlug ? testTitles[relatedTestSlug] : null;

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
            <div style={categoryStyle}>{categoryLabels[article.category]}</div>
            <div style={metaStyle}>
              {article.contentType} · {article.date} · {article.readTime}
            </div>

            <h1 style={titleStyle}>{article.title}</h1>
            <p style={descriptionStyle}>{article.description}</p>

            <div style={tagsStyle}>
              {article.tags.map((tag) => (
                <span key={tag} style={tagStyle}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Render content blocks */}
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

            {/* Related articles in same category */}
            {relatedArticles.length > 0 && (
              <div style={relatedSectionStyle}>
                <div style={relatedTitleStyle}>
                  More in {categoryLabels[article.category]}
                </div>
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/articles/${related.slug}`}
                    style={relatedLinkStyle}
                  >
                    {related.title}
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar with related test */}
          {relatedTestSlug && relatedTestTitle && (
            <aside style={asideStyle}>
              <div style={asideTitleStyle}>Related test</div>
              <Link href={`/test/${relatedTestSlug}`} style={asideLinkStyle}>
                {relatedTestTitle}
              </Link>
              <p style={asideTextStyle}>
                Open the related checkup if you want to examine the same pattern in a more structured format.
              </p>
              <Link href={`/test/${relatedTestSlug}`} style={buttonStyle}>
                Open test
              </Link>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
