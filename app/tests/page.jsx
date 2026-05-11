// app/tests/page.jsx
import Link from "next/link";

const categories = [
  "all",
  "current-relationship",
  "parental-patterns",
  "recurring-dynamics",
  "exit-dynamics",
];

const categoryLabels = {
  "current-relationship": "Current Relationship",
  "parental-patterns": "Parental Patterns",
  "recurring-dynamics": "Recurring Dynamics",
  "exit-dynamics": "Exit Dynamics",
};

const tests = [
  {
    href: "/test/current-relationship",
    title: "Current relationship checkup",
    description:
      "See how your current dynamic behaves on a structural level, not through isolated episodes.",
    category: "current-relationship",
  },
  {
    href: "/test/you-are-an-option",
    title: "You are an option checkup",
    description:
      "See if you're genuinely chosen or just someone they return to when nothing better is happening.",
    category: "current-relationship",
  },
  {
    href: "/test/mixed-signals",
    title: "Mixed signals interest gap",
    description:
      "Map how consistent their interest really is, beyond words and busy right now.",
    category: "current-relationship",
  },
  {
    href: "/test/third-person-grey-zone",
    title: "Third person in the grey zone",
    description:
      "See how much risk of a triangle you're living with through just a friend or a secret chat.",
    category: "current-relationship",
  },
  {
    href: "/test/trust-their-signals",
    title: "Can you trust their signals?",
    description:
      "Test how readable this person really is: clear pattern or just noise you're decoding.",
    category: "current-relationship",
  },
  {
    href: "/test/hyper-controlling-parent",
    title: "Hypercontrolling parent pattern",
    description:
      "Check if what you grew up with was care or control, guilt, and humiliation dressed up as love.",
    category: "parental-patterns",
  },
  {
    href: "/test/repeating-breakup",
    title: "Repeating breakup pattern",
    description:
      "Look at your breakups as a repeating structure, not just bad luck or wrong people.",
    category: "recurring-dynamics",
  },
  {
    href: "/test/after-breach-of-trust",
    title: "After a serious breach of trust",
    description:
      "See whether the relationship is actually healing or just frozen around the wound.",
    category: "exit-dynamics",
  },
  {
    href: "/test/silent-exit",
    title: "Silent exit from the relationship",
    description:
      "Check if you're still in a living relationship, or if one of you is already quietly checking out.",
    category: "exit-dynamics",
  },
];

const pageStyle = {
  minHeight: "100vh",
  background: "#ffffff",
  color: "#1a1a1a",
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

const activeNavLinkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "14px",
  padding: "10px 14px",
  border: "1px solid #1565C0",
  background: "#1565C0",
  borderRadius: "999px",
};

const navLinkStyle = {
  color: "#4a5568",
  textDecoration: "none",
  fontSize: "14px",
  padding: "10px 14px",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
};

const heroStyle = {
  marginBottom: "28px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#1565C0",
  marginBottom: "12px",
};

const h1Style = {
  fontSize: "clamp(34px, 6vw, 58px)",
  lineHeight: 1.02,
  margin: "0 0 16px",
};

const leadStyle = {
  fontSize: "17px",
  lineHeight: 1.7,
  color: "#4a5568",
  margin: 0,
  maxWidth: "100%",
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
  background: "#1565C0",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 700,
  border: "1px solid #1565C0",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "18px",
};

const cardStyle = {
  background: "#fafbfc",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "22px",
};

const titleStyle = {
  display: "block",
  color: "#1a1a1a",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: 700,
  marginBottom: "10px",
};

const textStyle = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#6b7280",
  margin: "0 0 18px",
};

const buttonStyle = {
  display: "inline-block",
  padding: "11px 16px",
  borderRadius: "999px",
  background: "#1565C0",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 700,
};

const noteStyle = {
  marginTop: "36px",
  fontSize: "12px",
  opacity: 0.6,
  lineHeight: 1.6,
  maxWidth: "70ch",
};

export default async function TestsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawCategory = resolvedSearchParams?.category;
  const selectedCategory =
    typeof rawCategory === "string" && categories.includes(rawCategory)
      ? rawCategory
      : "all";

  const visibleTests =
    selectedCategory === "all"
      ? tests
      : tests.filter((test) => test.category === selectedCategory);

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <header style={navStyle}>
          <Link href="/" style={brandStyle}>
            PATTERN INDEX
          </Link>

          <nav style={navLinksStyle}>
            <Link href="/tests" style={activeNavLinkStyle}>
              TESTS
            </Link>
            <Link href="/articles" style={navLinkStyle}>
              ARTICLES
            </Link>
          </nav>
        </header>

        <section style={heroStyle}>
          <div style={eyebrowStyle}>Tests</div>
          <h1 style={h1Style}>Behavioral pattern checkups</h1>
          <p style={leadStyle}>
            Choose a test based on the pattern you are trying to understand. These checkups are designed to help you detect structure, not just react to single episodes.
          </p>
        </section>

        <div style={filterBarStyle}>
          {categories.map((category) => {
            const isActive = category === selectedCategory;
            const href =
              category === "all"
                ? "/tests"
                : `/tests?category=${category}`;

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

        <section style={gridStyle}>
          {visibleTests.map((item) => (
            <article key={item.href} style={cardStyle}>
              <Link href={item.href} style={titleStyle}>
                {item.title}
              </Link>
              <p style={textStyle}>{item.description}</p>
              <Link href={item.href} style={buttonStyle}>
                Start test
              </Link>
            </article>
          ))}
        </section>

        <p style={noteStyle}>
          This tool is not therapy, medical care, or legal advice. It cannot diagnose anything or tell you what to do.
          You are fully responsible for any decisions or actions you take based on these checkups.
        </p>
      </div>
    </main>
  );
}
