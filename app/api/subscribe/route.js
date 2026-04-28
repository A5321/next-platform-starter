import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const testName = (body.testName || "Pattern Index").trim();
    const resultLevel = (body.resultLevel || "").trim();
    const protocolScope = (body.protocolScope || "").trim();
    const protocolTier = (body.protocolTier || "").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const adminKey = process.env.RESEND_ADMIN_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // If protocolScope and protocolTier are provided — send protocol email
    if (protocolScope && protocolTier) {
      let protocolData = null;
      try {
        const mod = await import(`../../../lib/protocols/${protocolScope.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`);
        const exports = Object.values(mod);
        const protocolsObj = exports[0];
        protocolData = protocolsObj?.[protocolTier] || null;
      } catch (e) {
        console.error("Protocol import error:", e.message);
      }

      if (protocolData) {
        let blocksHtml = "";
        protocolData.blocks.forEach((block) => {
          blocksHtml += `<div style="margin-top: 28px;">
            <h3 style="margin: 0 0 8px 0; font-size: 17px; color: #fff;">${block.title}</h3>
            ${block.goal ? `<p style="margin: 0 0 6px 0; font-size: 14px; color: #888;"><strong style="color: #aaa;">Goal:</strong> ${block.goal}</p>` : ""}
            ${block.when ? `<p style="margin: 0 0 10px 0; font-size: 14px; color: #888;"><strong style="color: #aaa;">When:</strong> ${block.when}</p>` : ""}
            ${block.items ? block.items.map(item => {
              if (item.type === "subheader") return `<p style="margin: 10px 0 4px 0; font-size: 15px; font-weight: 600; color: #ddd;">${item.text}</p>`;
              if (item.type === "sub") return `<p style="margin: 4px 0; padding-left: 16px; font-size: 14px; color: #aaa;">— ${item.text}</p>`;
              if (item.type === "quote") return `<div style="margin: 10px 0; padding: 10px 16px; border-left: 3px solid #4ade80; color: #ccc; font-style: italic; font-size: 14px; line-height: 1.6;">${item.text}</div>`;
              return `<p style="margin: 6px 0; font-size: 14px; color: #ccc;">${item.text}</p>`;
            }).join("") : ""}
            ${block.why ? block.why.map(w => `<p style="margin: 4px 0; font-size: 13px; color: #777; font-style: italic;">→ ${w}</p>`).join("") : ""}
          </div>`;
        });

        const protocolHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #111; border-radius: 12px; overflow: hidden;">
        <tr>
          <td style="padding: 32px 40px 24px 40px; border-bottom: 1px solid #222;">
            <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Pattern Index</p>
            <h1 style="margin: 8px 0 0 0; font-size: 22px; color: #fff; font-weight: 600;">${protocolData.title}</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #888;">${protocolData.subtitle}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 40px;">
            <p style="margin: 0 0 24px 0; color: #ccc; font-size: 15px; line-height: 1.7;">${protocolData.intro}</p>
            ${blocksHtml}
            ${protocolData.closing ? `<div style="margin-top: 36px; padding: 16px 20px; background: rgba(255,255,255,0.04); border-left: 4px solid #4ade80; color: #aaa; font-style: italic; font-size: 14px; line-height: 1.6;">${protocolData.closing}</div>` : ""}
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 40px; border-top: 1px solid #222;">
            <p style="margin: 0; color: #555; font-size: 13px; line-height: 1.5;">
              Questions? Reply to this email.<br />
              You received this because you purchased a protocol on patternindex.io.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

        const sendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Pattern Index <hello@patternindex.io>",
            to: [email],
            reply_to: "info@patternindex.io",
            subject: `Your protocol: ${protocolData.title}`,
            html: protocolHtml,
          }),
        });

        if (!sendRes.ok) {
          const err = await sendRes.text();
          console.error("Resend protocol error:", err);
          return NextResponse.json({ success: false, error: err }, { status: 500 });
        }

        // Save to audience
        if (adminKey) {
          await fetch("https://api.resend.com/contacts", {
            method: "POST",
            headers: { Authorization: `Bearer ${adminKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({ email, unsubscribed: false }),
          }).catch((e) => console.error("Audience error:", e));
        }

        return NextResponse.json({ success: true });
      }
    }

    // Default: send result summary email
    const resultLine = resultLevel
      ? `<p style="margin: 0 0 16px 0; color: #aaa; font-size: 15px;">Your result: <strong style="color: #fff;">${resultLevel}</strong></p>`
      : "";

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #111; border-radius: 12px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px 40px; border-bottom: 1px solid #222;">
              <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Pattern Index</p>
              <h1 style="margin: 8px 0 0 0; font-size: 22px; color: #fff; font-weight: 600;">Your result is ready</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 40px;">
              ${resultLine}

              <p style="margin: 0 0 20px 0; color: #ccc; font-size: 16px; line-height: 1.6;">
                You just ran a pattern check on <strong style="color: #fff;">${testName}</strong>.
              </p>

              <p style="margin: 0 0 20px 0; color: #ccc; font-size: 16px; line-height: 1.6;">
                Most people who see a result like this do one of three things:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
                <tr>
                  <td style="padding: 12px 16px; background: #1a1a1a; border-radius: 8px; margin-bottom: 8px; display: block;">
                    <p style="margin: 0; color: #888; font-size: 15px; line-height: 1.5;">
                      <strong style="color: #666;">1. Ignore it</strong> — the cycle repeats, usually with the next person.
                    </p>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background: #1a1a1a; border-radius: 8px;">
                    <p style="margin: 0; color: #888; font-size: 15px; line-height: 1.5;">
                      <strong style="color: #666;">2. Try to "fix" it through the relationship</strong> — rarely works when the pattern is structural.
                    </p>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid #4ade80;">
                    <p style="margin: 0; color: #ccc; font-size: 15px; line-height: 1.5;">
                      <strong style="color: #fff;">3. Use a protocol</strong> — a structured set of daily steps that work at the level where the pattern actually runs: the body, the automatic responses, the timing.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 28px 0; color: #ccc; font-size: 16px; line-height: 1.6;">
                The protocols on Pattern Index are built for option 3. Each one is specific to the pattern — not generic advice, but a step-by-step daily practice.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #fff; border-radius: 8px; padding: 14px 28px;">
                    <a href="https://patternindex.io" style="color: #000; text-decoration: none; font-size: 16px; font-weight: 600;">
                      See all tests → patternindex.io
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #222;">
              <p style="margin: 0; color: #555; font-size: 13px; line-height: 1.5;">
                Questions? Just reply to this email — it goes directly to a human.<br />
                You received this because you ran a test on patternindex.io.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Pattern Index <hello@patternindex.io>",
        to: [email],
        reply_to: "info@patternindex.io",
        subject: "Your pattern result + what to do next",
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json(
        { success: false, error: err },
        { status: 500 }
      );
    }

    // Save contact to Resend
    if (adminKey) {
      const contactRes = await fetch("https://api.resend.com/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      const contactData = await contactRes.json();
      console.log("Contact save:", JSON.stringify(contactData));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
