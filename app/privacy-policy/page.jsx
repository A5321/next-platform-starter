// app/terms-of-service/page.jsx
import Link from "next/link";

const pageStyle = {
  minHeight: "100vh",
  background: "#0f1115",
  color: "#f5f7fb",
};

const containerStyle = {
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  padding: "24px 16px 64px",
  boxSizing: "border-box",
};

const backStyle = {
  display: "inline-block",
  marginBottom: "24px",
  color: "#cfd6e4",
  textDecoration: "none",
  fontSize: "13px",
};

const h1Style = {
  fontSize: "32px",
  margin: "0 0 16px",
};

const paragraphStyle = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#cfd6e4",
  margin: "0 0 14px",
};

export default function TermsOfServicePage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <Link href="/" style={backStyle}>
          ← Back to home
        </Link>

        <h1 style={h1Style}>Terms of Service</h1>

        <p style={paragraphStyle}>
          This page will describe the terms under which Pattern Index is
          provided. It does not offer therapy, medical care, or legal advice,
          and using the tools does not create any professional relationship.
        </p>

        {/* дальше спокойно дописываешь юридический текст */}
      </div>
    </main>
  );
}
