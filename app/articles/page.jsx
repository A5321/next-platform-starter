// app/articles/page.jsx
import Link from "next/link";
import { articles, categoryLabels } from "./articlesData";

const categories = [
  "all",
  "neurophysiology",
  "biohacking",
  "lucid-dreaming",
  "inner-silence",
  "patterns",
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
  marginBottom: "28px",
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

const filterBarStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  margin: "28px 0 36px",
};

const activeFilterStyle = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "#10131a",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 700,
  border: "1px solid #10131a",
  textDecoration: "none",
};

const filterStyle = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "#ffffff",
  color: "#10131a",
  fontSize: "13px",
  fontWeight: 600,
  border: "1px solid rgba(16,19,26,0.12)",
  textDecoration: "none",
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

const categoryStyle = {
  display: "inline-block",
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#4e5fce",
  marginBottom: "12px",
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

const metaStyle = {
  fontSize: "13px",
  color: "#667085",
  marginBottom: "12px",
};

const tagsStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "16px",
};

const tagStyle = {
  display: "inline-block",
  fontSize: "12px",
  color: "#344054",
  background: "#f2f4f7",
  borderRadius: "999px",
  padding: "6px 10px",
};

const readMoreStyle = {
  display: "inline-block",
  color: "#10131a",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 700,
};

const emptyStateStyle = {
  background: "#ffffff",
  border: "1px solid rgba(16,19,26,0.08)",
  borderRadius: "20px",
  padding: "28px",
  color: "#465065",
  boxShadow: "0 14px 40px rgba(16,19,26,0.05)",
};

export default async function ArticlesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawCategory = resolvedSearchParams?.category;
  const selectedCategory =
    typeof rawCategory === "string" && categories.includes(rawCategory)
      ? rawCategory
      : "all";

  const visibleArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

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
          <h1 style={h1Style}>Browse by topic, not just by date</h1>
          <p style={leadStyle}>
            The article library is organized by core themes so readers can move
            between broad domains and specific recurring ideas.
          </p>
        </section>

        <div style={filterBarStyle}>
          {categories.map((category) => {
            const isActive = category === selectedCategory;
            const href =
              category === "all"
                ? "/articles"
                : `/articles?category=${category}`;

            return (
              <Link
                key={category}
                href={href}
                style={isActive ? activeFilterStyle : filterStyle}
              >
                {category === "all" ? "All" : categoryLabels[category]}
              </Link>
            );
          })}
        </div>

        {visibleArticles.length > 0 ? (
          <section style={gridStyle}>
            {visibleArticles.map((article) => (
              <article key={article.slug} style={cardStyle}>
                <div style={categoryStyle}>
                  {categoryLabels[article.category]}
                </div>

                <Link href={`/articles/${article.slug}`} style={titleStyle}>
                  {article.title}
                </Link>

                <div style={metaStyle}>
                  {article.contentType} · {article.readTime}
                </div>

                <p style={excerptStyle}>{article.excerpt}</p>

                <div style={tagsStyle}>
                  {article.tags.map((tag) => (
                    <span key={tag} style={tagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/articles/${article.slug}`} style={readMoreStyle}>
                  Read article
                </Link>
              </article>
            ))}
          </section>
        ) : (
          <div style={emptyStateStyle}>
            No articles in this category yet.
          </div>
        )}
      </div>
    </main>
  );
}
