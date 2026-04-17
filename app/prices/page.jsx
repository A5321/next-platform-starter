import Link from "next/link";

const plans = [
  {
    name: "Single protocol access",
    price: "$3",
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
    price: "$20",
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
  background:
    "radial-gradient(circle at top, rgba(77, 113, 255, 0.15), transparent 28%), #0f1115",
  color: "#f5f7fb",
};

const containerStyle = {
  width: "100%",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "24px 16px 72px",
  boxSizing: "border-box",
};

const backStyle = {
  display: "inline-block",
  marginBottom: "24px",
  color: "#cfd6e4",
  textDecoration: "none",
  fontSize: "13px",
};

const headerStyle = {
  marginBottom: "32px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#9db0ff",
  marginBottom: "12px",
};

const h1Style = {
  fontSize: "clamp(38px, 7vw, 64px)",
  lineHeight: 1,
  margin: "0 0 16px",
};

const leadStyle = {
  fontSize: "18px",
  lineHeight: 1.7,
  color: "#d5dbea",
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
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "28px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
};

const featuredCardStyle = {
  ...cardStyle,
  border: "1px solid rgba(157,176,255,0.34)",
  background: "rgba(157,176,255,0.08)",
};

const planNameStyle = {
  fontSize: "24px",
  margin: "0 0 10px",
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
};

const periodStyle = {
  fontSize: "14px",
  color: "#b6c0d4",
};

const descriptionStyle = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#cfd6e4",
  marginBottom: "18px",
};

const listStyle = {
  margin: "0 0 20px 18px",
  padding: 0,
  color: "#dbe2f0",
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
  background: "#ffffff",
  color: "#0f1115",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 700,
};

const notesStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "24px",
};

const sectionTitleStyle = {
  fontSize: "22px",
  margin: "0 0 12px",
};

const noteTextStyle = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#cfd6e4",
  margin: "0 0 10px",
};

export default function PricesPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <Link href="/" style={backStyle}>
          ← Back to home
        </Link>

        <section style={headerStyle}>
          <div style={eyebrowStyle}>Pricing</div>
          <h1 style={h1Style}>Simple access, clear pricing.</h1>
          <p style={leadStyle}>
            Choose between one-time access to a single paid protocol or a
            monthly subscription with unrestricted access to all paid materials
            on Pattern Index.
          </p>
        </section>

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

        <section style={notesStyle}>
          <h2 style={sectionTitleStyle}>Billing notes</h2>

          <p style={noteTextStyle}>
            Single protocol access is charged once per purchase. The monthly
            subscription is billed on a recurring monthly basis until cancelled.
            [web:228][web:236]
          </p>

          <p style={noteTextStyle}>
            Prices are shown in USD. Any applicable taxes, currency conversion
            costs, or payment provider fees may depend on your location and
            payment method. [web:233][web:236]
          </p>

          <p style={noteTextStyle}>
            Refund eligibility is governed by our Refund Policy. In general, if
            a paid protocol has already been generated and displayed on screen,
            the digital product is considered delivered and is not eligible for
            a refund, except where mandatory local law provides otherwise.
            [web:233][web:239]
          </p>

          <p style={{ ...noteTextStyle, marginBottom: 0 }}>
            If you have billing questions, please contact{" "}
            <a
              href="mailto:info@patternindex.io"
              style={{ color: "#ffffff", textDecoration: "underline" }}
            >
              info@patternindex.io
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
