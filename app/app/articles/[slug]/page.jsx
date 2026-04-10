// app/articles/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

const articles = {
  "what-reciprocity-imbalance-looks-like": {
    category: "Interpretation",
    title: "What reciprocity imbalance actually looks like",
    description:
      "How to separate a temporary asymmetry from a pattern where one person carries the relationship almost alone.",
    date: "April 10, 2026",
    readTime: "6 min read",
    relatedTest: {
      href: "/test/current-relationship",
      title: "Current relationship checkup",
    },
    content: [
      {
        type: "lead",
        text:
          "Reciprocity imbalance does not mean every relationship must look perfectly equal every day. It means one person repeatedly carries more of the emotional, practical, or relational load without the pattern correcting itself over time.",
      },
      {
        type: "heading",
        text: "What reciprocity is not",
      },
      {
        type: "paragraph",
        text:
          "A healthy relationship can look asymmetric for a while. Illness, burnout, distance, career pressure, or family emergencies can all create temporary imbalance. The key question is not whether things are equal today, but whether both people still show orientation toward repair, effort, and re-balancing.",
      },
      {
        type: "heading",
        text: "What real imbalance usually looks like",
      },
      {
        type: "paragraph",
        text:
          "Structural imbalance usually shows up as repetition. One person initiates, clarifies, repairs, waits, explains, and absorbs uncertainty, while the other person contributes selectively and often only when pressure rises.",
      },
      {
        type: "paragraph",
        text:
          "In practice, this can look like chronic one-sided initiation, vague commitment, inconsistent emotional availability, or a pattern where care appears only after distance or conflict.",
      },
      {
        type: "heading",
        text: "How not to overread one result",
      },
      {
        type: "paragraph",
        text:
          "A single test result should not be treated as a verdict. It is more useful as a structured prompt: what repeats, what changes after repair attempts, and who is consistently carrying the relational work?",
      },
    ],
  },
  "how-to-read-pattern-test-results": {
    category: "Guides",
    title: "How to read pattern test results without overreacting",
    description:
      "A practical method for interpreting pattern scores without turning one result into a final verdict.",
    date: "April 10, 2026",
    readTime: "5 min read",
    relatedTest: {
      href: "/test/trust-their-signals",
      title: "Can you trust their signals?",
    },
    content: [
      {
        type: "lead",
        text:
          "Pattern test results are most useful when they help you organize perception. They become harmful when you use them as absolute proof, moral certainty, or a substitute for observing repeated behavior over time.",
      },
      {
        type: "heading",
        text: "Start with pattern, not panic",
      },
      {
        type: "paragraph",
        text:
          "If a score feels sharp or confronting, resist the urge to convert it instantly into a conclusion. The first job of a result is not to tell you what to do, but to tell you what to examine more carefully.",
      },
      {
        type: "heading",
        text: "Ask three follow-up questions",
      },
      {
        type: "paragraph",
        text:
          "First: what exactly repeats? Second: what happens when the issue is addressed directly? Third: does the pattern improve temporarily or structurally?",
      },
      {
        type: "heading",
        text: "Use scores as directional, not prophetic",
      },
      {
        type: "paragraph",
        text:
          "A low trust or reciprocity score does not predict the future by itself. It signals that the current pattern deserves closer attention, especially if the same dynamic continues across different situations and repair attempts.",
      },
      {
        type: "heading",
        text: "What a good interpretation looks like",
      },
      {
        type: "paragraph",
        text:
          "The most useful reading combines the result with observation. Instead of saying, 'The test proved everything,' say, 'The test highlighted a pattern I should verify against repeated behavior, consistency, and response to accountability.'",
      },
    ],
  },
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
  position: "sticky",
  top: "24px",
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

export default function ArticlePage({ params }) {
  const { slug } = params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

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
            <div style={metaStyle}>
              {article.category} · {article.date} · {article.readTime}
            </div>

            <h1 style={titleStyle}>{article.title}</h1>
            <p style={descriptionStyle}>{article.description}</p>

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

              return (
                <p key={index} style={paragraphStyle}>
                  {block.text}
                </p>
              );
            })}
          </article>

          <aside style={asideStyle}>
            <div style={asideTitleStyle}>Related test</div>
            <Link href={article.relatedTest.href} style={asideLinkStyle}>
              {article.relatedTest.title}
            </Link>
            <p style={asideTextStyle}>
              Open the related checkup if you want to examine the same pattern in a more structured format.
            </p>
            <Link href={article.relatedTest.href} style={buttonStyle}>
              Open test
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
