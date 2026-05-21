import Link from "next/link";

const plans = [
  {
    name: "Single protocol access",
    price: "$15",
    period: "one-time payment",
    description:
      "One-time access to a single AI-generated test protocol.",
    features: [
      "Access to one paid protocol",
      "AI-generated result and interpretation",
      "Single purchase, no recurring billing",
    ],
    cta: "Buy single access",
  },
  {
    name: "Full site subscription",
    price: "$30",
    period: "per month",
    description:
      "Monthly subscription with unrestricted access to all paid materials on the site.",
    features: [
      "Unlimited access to all paid protocols",
      "Unlimited access to all paid materials on the site",
      "Recurring monthly billing until cancelled",
    ],
    cta: "Start subscription",
    featured: true,
  },
];

const pageStyle = {
  minHeight: "100vh",
  background: "#ffffff",
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

const navLinksStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const navLinkStyle = {
  color: "#4a5568",
  textDecoration: "none",
  fontSize: "14px",
  padding: "10px 14px",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
};

const headerStyle = {
  marginBottom: "40px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#1565C0",
  marginBottom: "12px",
};

const h1Style = {
  fontSize: "clamp(32px, 5vw, 48px)",
  lineHeight: 1.1,
  margin: "0 0 16px",
  color: "#1a1a1a",
};

const leadStyle = {
  fontSize: "18px",
  lineHeight: 1.7,
  color: "#4a5568",
  margin: 0,
  maxWidth: "42rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
  marginBottom: "32px",
};

const cardStyle = {
  background: "#fafbfc",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "28px",
};

const featuredCardStyle = {
  ...cardStyle,
  border: "1px solid #1565C0",
  background: "#eff6ff",
};

const planNameStyle = {
  fontSize: "24px",
  margin: "0 0 10px",
  color: "#1a1a1a",
};

const priceRowStyle = {
  display: "flex",
  alignItems: "baseline",
  gap: "10px",
  marginBottom: "14px",
};

const priceStyle = {
  fontSize: "42px",
  fontWeight: 800,
  lineHeight: 1,
  color: "#1a1a1a",
};

const periodStyle = {
  fontSize: "14px",
  color: "#6b7280",
};

const descriptionStyle = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#4a5568",
  marginBottom: "18px",
};

const listStyle = {
  margin: "0 0 20px 18px",
  padding: 0,
  color: "#1a1a1a",
  fontSize: "14px",
  lineHeight: 1.7,
};

const listItemStyle = {
  marginBottom: "6px",
};

const buttonStyle = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: "999px",
  background: "#1565C0",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 700,
};

const notesStyle = {
  background: "#fafbfc",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "28px",
  marginBottom: "24px",
};

const sectionTitleStyle = {
  fontSize: "22px",
  margin: "0 0 16px",
  color: "#1a1a1a",
};

const noteTextStyle = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#4a5568",
  margin: "0 0 16px",
};

const footerStyle = {
  marginTop: "40px",
  paddingTop: "24px",
  borderTop: "1px solid rgba(0,0,0,0.1)",
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "12px",
  color: "#6b7280",
};

const footerLinksStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
};

const footerLinkStyle = {
  color: "#4a5568",
  textDecoration: "none",
};

export default function PricesPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        {/* Навигация */}
        <header style={navStyle}>
          <Link 
            href="/" 
            style={{ 
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <img 
              src="/logo.png" 
              alt="Pattern Index" 
              style={{ 
                width: "32px",
                height: "32px",
                display: "block"
              }} 
            />
            <span style={{
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#1565C0"
            }}>
              PATTERN INDEX
            </span>
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

        {/* Заголовок */}
        <section style={headerStyle}>
          <div style={eyebrowStyle}>Pricing</div>
          <h1 style={h1Style}>Simple access, clear pricing.</h1>
          <p style={leadStyle}>
            Choose between one-time access to a single paid protocol or a
            monthly subscription with unrestricted access to all paid materials
            on Pattern Index.
          </p>
        </section>

        {/* Карточки планов */}
        <section style={gridStyle}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={plan.featured ? featuredCardStyle : cardStyle}
            >
              <h2 style={planNameStyle}>{plan.name}</h2>

              <div style={priceRowStyle}>
                <div style={priceStyle}>{plan.price}</div>
                <div style={periodStyle}>{plan.period}</div>
              </div>

              <p style={descriptionStyle}>{plan.description}</p>

              <ul style={listStyle}>
                {plan.features.map((feature) => (
                  <li key={feature} style={listItemStyle}>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/" style={buttonStyle}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </section>

        {/* Billing notes */}
        <section style={notesStyle}>
          <h2 style={sectionTitleStyle}>Billing notes</h2>

          <p style={noteTextStyle}>
            Single protocol access is charged once per purchase. The monthly
            subscription is billed on a recurring monthly basis until cancelled.
          </p>

          <p style={noteTextStyle}>
            Prices are shown in USD. Any applicable taxes, currency conversion
            costs, or payment provider fees may depend on your location and
            payment method.
          </p>

          <p style={noteTextStyle}>
            Refund eligibility is governed by our Refund Policy. In general, if
            a paid protocol has already been generated and displayed on screen,
            the digital product is considered delivered and is not eligible for
            a refund, except where mandatory local law provides otherwise.
          </p>

          <p style={{ ...noteTextStyle, marginBottom: 0 }}>
            If you have billing questions, please contact{" "}
            <a
              href="mailto:info@patternindex.io"
              style={{ color: "#1565C0", textDecoration: "underline" }}
            >
              info@patternindex.io
            </a>
            .
          </p>
        </section>

        {/* Футер */}
        <footer style={footerStyle}>
          <div>© {new Date().getFullYear()} Pattern Index</div>

          <nav style={footerLinksStyle}>
            <Link href="/terms-of-service" style={footerLinkStyle}>
              Terms of Service
            </Link>
            <Link href="/prices" style={footerLinkStyle}>
              Prices
            </Link>
            <Link href="/refund-policy" style={footerLinkStyle}>
              Refund policy
            </Link>
            <Link href="/privacy-policy" style={footerLinkStyle}>
              Privacy Policy
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
