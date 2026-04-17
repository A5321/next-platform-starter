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

export default function RefundPolicyPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <Link href="/" style={backStyle}>
          ← Back to home
        </Link>

        <h1 style={h1Style}>Refund Policy</h1>

        <p style={paragraphStyle}>
          This Refund Policy explains when and how refunds may be issued for
          purchases made on patternindex.io (&quot;Pattern Index&quot;). By
          using the Service and completing a purchase, you agree to this
          Policy.
        </p>

        <h2 style={h2Style}>1. Nature of the product</h2>
        <p style={paragraphStyle}>
          Pattern Index provides digital products in the form of AI-generated
          tests and AI-generated written protocols. These protocols become
          available immediately after a successful payment and are delivered by
          displaying the protocol on your screen. Because of the nature of
          digital content, it cannot be &quot;returned&quot; once accessed.
          [web:212][web:216][web:215]
        </p>

        <h2 style={h2Style}>2. General refund principle</h2>
        <p style={paragraphStyle}>
          Refunds are intended for cases where the paid digital content was not
          delivered – for example, if you completed a payment but never gained
          access to your protocol due to a technical issue on our side.
        </p>
        <p style={paragraphStyle}>
          If a protocol has been generated and opened on your screen, the
          product is considered delivered and is not eligible for a refund,
          except where mandatory local law provides otherwise. [web:212][web:216]
        </p>

        <h2 style={h2Style}>3. When you may be eligible for a refund</h2>
        <p style={paragraphStyle}>
          You may request a refund if all of the following conditions are met:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            your payment was successfully completed (for example, via PayPal or
            another supported provider);
          </li>
          <li style={listItemStyle}>
            you did not receive access to your protocol (for example, the page
            never loaded, or a persistent technical error on our side prevented
            access);
          </li>
          <li style={listItemStyle}>
            you submit a refund request within a reasonable time after the
            transaction (typically within 14 days, unless local law requires
            a different period). [web:214][web:215][web:222]
          </li>
        </ul>

        <p style={paragraphStyle}>
          In such cases we may first attempt to resolve the issue by restoring
          your access. If the problem cannot be fixed promptly, a refund may be
          issued.
        </p>

        <h2 style={h2Style}>4. When refunds are not available</h2>
        <p style={paragraphStyle}>
          Refunds will generally not be provided in the following situations:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            the protocol was successfully generated and displayed on your
            screen (digital product delivered);
          </li>
          <li style={listItemStyle}>
            you changed your mind after using the protocol;
          </li>
          <li style={listItemStyle}>
            you are dissatisfied with the outcome or the way the protocol reads,
            but it functioned as described;
          </li>
          <li style={listItemStyle}>
            issues are caused by your own device, internet connection, or
            browser settings, where the Service itself is functioning correctly.
          </li>
        </ul>
        <p style={paragraphStyle}>
          For users in jurisdictions that grant statutory rights for digital
          content (for example, certain EU/EEA countries), we will apply this
          Policy in line with the applicable law. In general, such rights may be
          lost once you explicitly start accessing digital content that is
          delivered immediately after purchase. [web:216][web:222][web:226]
        </p>

        <h2 style={h2Style}>5. How to request a refund</h2>
        <p style={paragraphStyle}>
          To request a refund, please send an email to{" "}
          <a
            href="mailto:info@patternindex.io"
            style={{ color: "#cfd6e4", textDecoration: "underline" }}
          >
            info@patternindex.io
          </a>{" "}
          with the subject line &quot;Refund request&quot; and include the
          following information:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            your full name;
          </li>
          <li style={listItemStyle}>
            the email address used for the purchase;
          </li>
          <li style={listItemStyle}>
            the date and approximate time of the transaction;
          </li>
          <li style={listItemStyle}>
            the payment provider (for example, PayPal) and, if available, the
            transaction ID from the payment receipt;
          </li>
          <li style={listItemStyle}>
            the name of the test or protocol you attempted to purchase;
          </li>
          <li style={listItemStyle}>
            a short description of the issue (for example, &quot;payment
            succeeded but the protocol page never loaded&quot;).
          </li>
        </ul>
        <p style={paragraphStyle}>
          We may request additional information if needed to locate your payment
          and verify the problem. Refunds, if approved, will normally be issued
          using the same payment method you used for the original transaction,
          within a reasonable period. [web:214][web:218]
        </p>

        <h2 style={h2Style}>6. Technical checks and verification</h2>
        <p style={paragraphStyle}>
          To assess refund requests, we may use internal logs and payment
          provider information (for example, PayPal webhooks or similar
          signals) to verify whether:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            the payment was completed and linked to a specific protocol;
          </li>
          <li style={listItemStyle}>
            the protocol was generated and made available by our system;
          </li>
          <li style={listItemStyle}>
            the protocol page was opened on your side, indicating that the
            digital content was delivered.
          </li>
        </ul>
        <p style={paragraphStyle}>
          Where our logs show that the protocol was successfully generated and
          displayed, the purchase will normally be treated as delivered and not
          eligible for a refund under this Policy, unless local law requires a
          different outcome. [web:219][web:223]
        </p>

        <h2 style={h2Style}>7. Prevention of abuse</h2>
        <p style={paragraphStyle}>
          We reserve the right to decline refund requests where we reasonably
          suspect abuse of the refund process, repeated refund requests from the
          same individual, or attempts to obtain both access to the protocol and
          a refund. [web:214][web:220]
        </p>

        <h2 style={h2Style}>8. Changes to this Policy</h2>
        <p style={paragraphStyle}>
          We may update this Refund Policy from time to time. When we make
          material changes, we will update the &quot;last updated&quot; date at
          the top of this page or otherwise communicate the changes as
          appropriate. Your continued use of the Service after changes take
          effect indicates acceptance of the updated Policy. [web:212][web:224]
        </p>
      </div>
    </main>
  );
}
