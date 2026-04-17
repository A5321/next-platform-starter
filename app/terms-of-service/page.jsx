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

export default function TermsOfServicePage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <Link href="/" style={backStyle}>
          ← Back to home
        </Link>

        <h1 style={h1Style}>Terms of Service</h1>

        <p style={paragraphStyle}>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of
          Pattern Index (the &quot;Service&quot;), including all tests, articles, and
          AI-generated protocols made available through patternindex.io (the
          &quot;Site&quot;). By using the Service, you agree to these Terms.
        </p>

        <h2 style={h2Style}>1. Nature of the Service</h2>
        <p style={paragraphStyle}>
          Pattern Index provides AI-assisted tests and AI-generated written
          protocols that help users reflect on behavioral and relationship
          patterns. The Service is designed for informational and educational
          purposes only.
        </p>

        <p style={paragraphStyle}>
          The Service does not provide and must not be treated as:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            medical advice, diagnosis, or treatment;
          </li>
          <li style={listItemStyle}>
            psychological, psychotherapeutic, or psychiatric advice, diagnosis,
            or treatment;
          </li>
          <li style={listItemStyle}>
            legal, financial, or any other form of professional advice.
          </li>
        </ul>
        <p style={paragraphStyle}>
          Using the Service does not create any doctor–patient, therapist–client,
          or other professional relationship between you and Pattern Index or its
          creators. [web:190][web:195]
        </p>

        <h2 style={h2Style}>2. AI-generated content</h2>
        <p style={paragraphStyle}>
          A substantial part of the content on the Site – including test
          questions, result descriptions, and follow-up protocols – is generated
          or assisted by artificial intelligence (&quot;AI&quot;). AI systems can
          produce content that is incomplete, outdated, biased, or inaccurate.
        </p>
        <p style={paragraphStyle}>
          We do not guarantee that any AI-generated content is correct, complete,
          or appropriate for your specific situation. You remain solely
          responsible for how you interpret and use any information provided by
          the Service. Critical decisions about your health, relationships,
          finances, or legal situation should always be made together with a
          qualified human professional, not based solely on AI-generated output.
          [web:183][web:186][web:191]
        </p>

        <h2 style={h2Style}>3. No professional advice</h2>
        <p style={paragraphStyle}>
          All information provided through the Service, including tests, scores,
          explanations, and protocols, is offered for general informational and
          educational purposes only. It is not intended to:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            diagnose, treat, or prevent any medical, psychological, or
            psychiatric condition;
          </li>
          <li style={listItemStyle}>
            provide therapy, counseling, coaching, or crisis intervention;
          </li>
          <li style={listItemStyle}>
            replace consultation with a doctor, licensed mental health
            professional, or other qualified expert. [web:195][web:196]
          </li>
        </ul>
        <p style={paragraphStyle}>
          If you have questions about your mental or physical health, or if you
          are experiencing significant distress, suicidal thoughts, or risk of
          harm to yourself or others, you should immediately contact a doctor,
          licensed mental health professional, emergency services, or a crisis
          hotline in your region.
        </p>

        <h2 style={h2Style}>4. Your responsibilities</h2>
        <p style={paragraphStyle}>
          You are responsible for your own use of the Service and for any
          decisions or actions you take based on the information you obtain here.
          In particular, you agree that:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            you will not treat the Service as a substitute for professional
            medical, psychological, legal, or financial advice;
          </li>
          <li style={listItemStyle}>
            you will independently evaluate whether any suggestion, protocol, or
            interpretation is appropriate for you before acting on it;
          </li>
          <li style={listItemStyle}>
            you will seek professional help where appropriate and in emergencies.
          </li>
        </ul>

        <h2 style={h2Style}>5. Eligibility and acceptable use</h2>
        <p style={paragraphStyle}>
          The Service is intended for adults who can legally enter into binding
          agreements in their jurisdiction. By using the Site, you confirm that
          you are at least 18 years old (or the age of majority where you live)
          and that you will use the Service only for lawful purposes.
          [web:192][web:194]
        </p>
        <p style={paragraphStyle}>
          You agree not to use the Service in any way that is illegal, harmful,
          abusive, defamatory, discriminatory, or that violates the rights of
          others. You also agree not to attempt to interfere with or disrupt the
          Service or its infrastructure.
        </p>

        <h2 style={h2Style}>6. No guarantees</h2>
        <p style={paragraphStyle}>
          The Service is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. We make no warranties or representations,
          express or implied, about:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            the accuracy, completeness, or reliability of any content;
          </li>
          <li style={listItemStyle}>
            the suitability of any test, explanation, or protocol for your
            particular situation;
          </li>
          <li style={listItemStyle}>
            the uninterrupted or error-free operation of the Site. [web:186][web:191]
          </li>
        </ul>
        <p style={paragraphStyle}>
          To the fullest extent permitted by law, we disclaim all warranties,
          including any implied warranties of fitness for a particular purpose,
          merchantability, and non-infringement.
        </p>

        <h2 style={h2Style}>7. Limitation of liability</h2>
        <p style={paragraphStyle}>
          To the maximum extent permitted by applicable law, Pattern Index and
          its creators will not be liable for any direct, indirect, incidental,
          consequential, special, or exemplary damages arising out of or in
          connection with your use of the Service or reliance on any content
          provided, even if we have been advised of the possibility of such
          damages. [web:187][web:188][web:192]
        </p>
        <p style={paragraphStyle}>
          In any case where liability cannot be excluded, our total aggregate
          liability to you for all claims related to the Service will be limited
          to the total amount you paid (if any) for access to the Service during
          the 3 months immediately preceding the event giving rise to the claim.
        </p>

        <h2 style={h2Style}>8. Changes to the Service and to these Terms</h2>
        <p style={paragraphStyle}>
          We may modify, suspend, or discontinue any part of the Service at any
          time without prior notice. We may also update these Terms from time to
          time. When we make material changes, we will update the &quot;last
          updated&quot; date at the top of this page.
        </p>
        <p style={paragraphStyle}>
          Your continued use of the Service after changes take effect means you
          accept the updated Terms. If you do not agree with the new Terms, you
          should stop using the Service.
        </p>

        <h2 style={h2Style}>9. Privacy</h2>
        <p style={paragraphStyle}>
          Our collection and use of personal data is described in our Privacy
          Policy. By using the Service, you consent to the processing of your
          information as described there. Please read the Privacy Policy
          carefully to understand how we handle your data.
        </p>

        <h2 style={h2Style}>10. Governing law</h2>
        <p style={paragraphStyle}>
          These Terms are governed by the laws applicable in the jurisdiction
          where the operator of Pattern Index is established, without regard to
          conflict-of-laws principles. Any disputes will be resolved in the
          competent courts of that jurisdiction, unless mandatory local law
          provides otherwise.
        </p>

        <h2 style={h2Style}>11. Contact</h2>
        <p style={paragraphStyle}>
          If you have questions about these Terms, the Service, or wish to
          report a concern, you can contact us using the contact details provided
          on the Site.
        </p>
      </div>
    </main>
  );
}
