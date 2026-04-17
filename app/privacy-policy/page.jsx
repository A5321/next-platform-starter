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

const h2Style = {
  fontSize: "20px",
  margin: "28px 0 10px",
};

const paragraphStyle = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#cfd6e4",
  margin: "0 0 12px",
};

const listStyle = {
  margin: "0 0 12px 18px",
  padding: 0,
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#cfd6e4",
};

const listItemStyle = {
  marginBottom: "6px",
};

export default function PrivacyPolicyPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <Link href="/" style={backStyle}>
          ← Back to home
        </Link>

        <h1 style={h1Style}>Privacy Policy</h1>

        <p style={paragraphStyle}>
          This Privacy Policy explains how Pattern Index (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects
          information when you use patternindex.io (the &quot;Site&quot;) and
          the related tests, articles, and AI-generated protocols
          (collectively, the &quot;Service&quot;).
        </p>

        <p style={paragraphStyle}>
          This Policy is written in general terms and is not a complete summary
          of all applicable legal requirements. Depending on where you live,
          additional rights and obligations may apply under local privacy laws.
        </p>

        <h2 style={h2Style}>1. Information we collect</h2>
        <p style={paragraphStyle}>
          The Service is designed to minimize the amount of personal data we
          process. In practice, information we may collect falls into the
          following categories:
        </p>

        <h3 style={h2Style}>1.1. Information you provide directly</h3>
        <p style={paragraphStyle}>
          When you use our tests or contact us, you may choose to provide:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            contact details such as an email address (for example, if you write
            to us or subscribe to updates);
          </li>
          <li style={listItemStyle}>
            responses to test questions and other input you provide to the
            Service;
          </li>
          <li style={listItemStyle}>
            any other information you voluntarily send to us.
          </li>
        </ul>

        <h3 style={h2Style}>1.2. Usage and technical data</h3>
        <p style={paragraphStyle}>
          When you access the Site, some technical information is typically
          collected automatically by your browser or device, such as:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            IP address and approximate region or country;
          </li>
          <li style={listItemStyle}>
            browser type and version, device type, operating system;
          </li>
          <li style={listItemStyle}>
            pages visited, time and date of visit, referring pages.
          </li>
        </ul>
        <p style={paragraphStyle}>
          This kind of data is commonly used to keep the Site secure and to
          understand how people use the Service in aggregate (for example, which
          pages are visited most often). [web:198][web:208]
        </p>

        <h3 style={h2Style}>1.3. Cookies and similar technologies</h3>
        <p style={paragraphStyle}>
          The Site may use cookies or similar technologies to support basic
          functionality, such as remembering certain preferences or enabling
          analytics. You can control cookies through your browser settings. If
          we use third-party analytics or measurement tools, those providers may
          also set cookies or similar identifiers; please refer to their
          respective policies for details. [web:208][web:209]
        </p>

        <h2 style={h2Style}>2. How we use information</h2>
        <p style={paragraphStyle}>
          We use the information described above for the following purposes:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            to operate, maintain, and improve the Site and Service;
          </li>
          <li style={listItemStyle}>
            to generate test results and AI-based protocols based on the input
            you provide;
          </li>
          <li style={listItemStyle}>
            to monitor performance, detect problems, and protect the security of
            the Service;
          </li>
          <li style={listItemStyle}>
            to answer questions or respond to messages you send us;
          </li>
          <li style={listItemStyle}>
            to comply with legal obligations and enforce our Terms of Service.
          </li>
        </ul>
        <p style={paragraphStyle}>
          We do not sell your personal information to third parties. If we use
          third-party providers (for example, analytics or infrastructure
          services), they act on our behalf and are only allowed to use the data
          as needed to provide their services to us. [web:198][web:204]
        </p>

        <h2 style={h2Style}>3. AI-generated content and data</h2>
        
