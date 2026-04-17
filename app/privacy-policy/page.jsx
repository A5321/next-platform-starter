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
        <p style={paragraphStyle}>
          The Service uses AI systems to generate test content, explanations, and
          protocols. When you interact with these features, your inputs (for
          example, answers to test questions) may be sent to AI providers to
          generate the relevant output.
        </p>
        <p style={paragraphStyle}>
          We aim to limit inputs to what is necessary for the Service to work,
          and we encourage you not to include directly identifying information
          (such as full names, addresses, or identification numbers) in free-text
          fields. Where feasible, we configure AI tools and infrastructure so
          that your data is not used to train general-purpose models beyond our
          use of the Service. [web:201][web:204]
        </p>

        <h2 style={h2Style}>4. Legal bases (for users in the EU/EEA)</h2>
        <p style={paragraphStyle}>
          If you are located in the European Economic Area, the United Kingdom,
          or a region with similar laws, we process your personal data based on
          one or more of the following legal grounds:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Consent</strong> – where you have given clear consent (for
            example, when you choose to send us an email or submit information);
          </li>
          <li style={listItemStyle}>
            <strong>Contract</strong> – where processing is necessary to provide
            the Service you requested;
          </li>
          <li style={listItemStyle}>
            <strong>Legitimate interests</strong> – such as improving the
            Service, keeping it secure, and understanding how it is used, where
            these interests are not overridden by your rights and freedoms;
          </li>
          <li style={listItemStyle}>
            <strong>Legal obligation</strong> – where we must process data to
            meet applicable legal requirements. [web:203][web:206][web:209]
          </li>
        </ul>

        <h2 style={h2Style}>5. Data retention</h2>
        <p style={paragraphStyle}>
          We keep personal data only for as long as reasonably necessary to
          fulfil the purposes described in this Policy, including:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            to provide the Service and maintain your interactions with it;
          </li>
          <li style={listItemStyle}>
            to meet legal, accounting, or reporting requirements;
          </li>
          <li style={listItemStyle}>
            to resolve disputes and enforce our agreements.
          </li>
        </ul>
        <p style={paragraphStyle}>
          Where data is no longer needed, we take steps to delete or anonymize
          it.
        </p>

        <h2 style={h2Style}>6. How we protect information</h2>
        <p style={paragraphStyle}>
          We use reasonable technical and organizational measures to protect
          information against unauthorized access, loss, or misuse. However, no
          method of transmission over the internet or method of electronic
          storage is completely secure, and we cannot guarantee absolute
          security. [web:198][web:209]
        </p>

        <h2 style={h2Style}>7. Your rights</h2>
        <p style={paragraphStyle}>
          Depending on where you live, you may have certain rights in relation
          to your personal data, such as the rights to:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            access the personal data we hold about you;
          </li>
          <li style={listItemStyle}>
            request correction of inaccurate or incomplete data;
          </li>
          <li style={listItemStyle}>
            request deletion of your personal data, subject to legal exceptions;
          </li>
          <li style={listItemStyle}>
            object to or restrict certain types of processing;
          </li>
          <li style={listItemStyle}>
            withdraw consent where processing is based on consent;
          </li>
          <li style={listItemStyle}>
            lodge a complaint with a data protection authority in your region.
          </li>
        </ul>
        <p style={paragraphStyle}>
          To exercise any of these rights, you can contact us using the details
          provided below. We may need to verify your identity before processing
          certain requests. [web:203][web:209]
        </p>

        <h2 style={h2Style}>8. Third-party services</h2>
        <p style={paragraphStyle}>
          The Service may contain links to third-party websites or services that
          are not controlled by us. This Privacy Policy does not cover those
          services, and we are not responsible for their content or privacy
          practices. We encourage you to review the privacy policies of any
          third-party services you use. [web:198][web:209]
        </p>

        <h2 style={h2Style}>9. Children&apos;s privacy</h2>
        <p style={paragraphStyle}>
          The Service is not intended for children under the age of 18, and we do
          not knowingly collect personal data from children. If you believe that
          a child has provided us with personal information, please contact us so
          that we can take appropriate steps to delete it. [web:198]
        </p>

        <h2 style={h2Style}>10. Changes to this Privacy Policy</h2>
        <p style={paragraphStyle}>
          We may update this Privacy Policy from time to time. When we make
          material changes, we will update the &quot;last updated&quot; date at
          the top of this page. Your continued use of the Service after changes
          take effect indicates that you have read and understood the updated
          Policy. [web:198][web:206]
        </p>

        <h2 style={h2Style}>11. Contact</h2>
        <p style={paragraphStyle}>
          If you have questions about this Privacy Policy or how we handle your
          data, you can contact us using the contact details provided on the
          Site.
        </p>
      </div>
    </main>
  );
}
