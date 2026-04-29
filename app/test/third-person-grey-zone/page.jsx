"use client";

import { useState, useEffect, useRef } from "react";
import { thirdPersonProtocols } from "../../../lib/protocols/Thirdperson";
import { getProtocolTier } from "../../../lib/protocolTiers";
import EmailCapture from "../../../components/EmailCapture";
import ProtocolEmailCapture from "../../../components/ProtocolEmailCapture";

export default function ThirdPersonGreyZoneTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const paypalSingleRef = useRef(null);

  useEffect(() => {
    const emailLocal = localStorage.getItem("email_submitted_third_person");
    if (emailLocal === "true") setEmailSubmitted(true);

    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const paidLocal = localStorage.getItem("paid_third_person");
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";

    if (isPaid) {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_third_person");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("third-person-grey-zone", parsed);
        setProtocolTier(tier);
      }
    }
  }, []);

  useEffect(() => {
    if (!result || !protocolTier || protocolTier === "none") return;
    if (paid) return;
    if (typeof window === "undefined" || !window.paypal) return;
    if (!paypalSingleRef.current) return;
    if (paypalSingleRef.current.hasChildNodes()) paypalSingleRef.current.innerHTML = "";

    window.paypal.Buttons({
      style: { layout: "vertical", shape: "rect", label: "paypal", height: 42 },
      createOrder: async (_, actions) => {
        setPayError("");
        return actions.order.create({
          purchase_units: [{
            amount: { value: "15.00", currency_code: "USD" },
            custom_id: "third-person-single",
            description: `Third Person Grey Zone — ${protocolTier === "hard" ? "Exit" : "Clarity"} Protocol`,
          }],
        });
      },
      onApprove: async (data, actions) => {
        try {
          setPaying(true);
          setPayError("");
          await actions.order.capture();
          const res = await fetch("/api/paypal/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID, intent: "single", scope: "third-person-grey-zone", email: "user@paypal.com" }),
          });
          const json = await res.json();
          if (!res.ok || !json.success) throw new Error(json.error || "Payment confirmation failed");
          localStorage.setItem("paid_third_person", "true");
          window.location.reload();
        } catch (err) {
          console.error(err);
          setPayError(err.message || "Payment failed");
        } finally {
          setPaying(false);
        }
      },
      onError: (err) => {
        console.error(err);
        setPayError("PayPal error. Try again.");
      },
    }).render(paypalSingleRef.current).catch(() => setPayError("Failed to render PayPal buttons. Please refresh."));
  }, [result, protocolTier, paid]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setPaid(false);
    setProtocolTier(null);
    setPayError("");
    localStorage.removeItem("paid_third_person");
    localStorage.removeItem("email_submitted_third_person");
    setEmailSubmitted(false);

    const formData = new FormData(e.currentTarget);

    const third_role = formData.get("third_role");
    const secrecy_level = formData.get("secrecy_level");
    const comparison_frequency = formData.get("comparison_frequency");
    const boundary_clarity = formData.get("boundary_clarity");
    const emotional_investment = formData.get("emotional_investment");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "third_person_grey_zone",
        answers: {
          third_role,
          secrecy_level,
          comparison_frequency,
          boundary_clarity,
          emotional_investment,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_third_person", JSON.stringify(data));
    const tier = getProtocolTier("third-person-grey-zone", data);
    setProtocolTier(tier);
    setLoading(false);
  }

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "20px 16px",
  backgroundImage: "url('/bgr.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const cardStyle = {
  maxWidth: 900,
  width: "100%",
  backgroundColor: "#000000",        // чёрная карточка
  borderRadius: 12,
  padding: 24,
  boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
  backdropFilter: "blur(6px)",
};

  const labelStyle = { display: "block", marginBottom: 8, fontWeight: 500 };

  const controlStyle = {
    width: "100%",
    maxWidth: 900,
    boxSizing: "border-box",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid rgba(255,255,255,0.25)",
    backgroundColor: "rgba(3, 20, 40, 0.85)",
    color: "#fff",
  };

  const sectionTitleStyle = { marginTop: 24, marginBottom: 8 };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <header style={{ marginBottom: 24 }}>
          <a
            href="/"
            style={{
              display: "inline-block",
              marginBottom: 12,
              color: "#ffffff",
              textDecoration: "none",
              opacity: 0.7,
              fontSize: 14,
            }}
          >
            ← Back to home
          </a>
          <h1 style={{ margin: 0, fontSize: 32 }}>
            Third person in the grey zone
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            See how much risk of a triangle you&apos;re actually living with —
            through &quot;just a friend&quot;, an ex that never fully left, or a
            secret chat on the side.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              Who is this third person for your partner / for you?
            </label>
            <select name="third_role" style={controlStyle}>
              <option value="old_friend">
                Old friend or colleague (no clear romantic history)
              </option>
              <option value="ex_partner">
                Ex‑partner / ex‑situationship (history of romantic or sexual
                connection)
              </option>
              <option value="new_connection">
                New &quot;friend&quot; / person they recently got close to
              </option>
              <option value="unknown_status">
                Someone I don&apos;t fully understand the status of
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How much secrecy or hidden communication is around this person?
            </label>
            <select name="secrecy_level" style={controlStyle}>
              <option value="high_secrecy">
                High secrecy: deleting chats, hiding screens, vague about
                meetings
              </option>
              <option value="medium_secrecy">
                Medium secrecy: not exactly hiding, but also not really open
              </option>
              <option value="low_secrecy">
                Low secrecy: I broadly know when and how they talk
              </option>
              <option value="open">
                Open: I&apos;m invited in, nothing feels hidden
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How often does comparison show up (directly or indirectly)?
            </label>
            <select name="comparison_frequency" style={controlStyle}>
              <option value="frequent_comparisons">
                Frequently: I feel compared or replaced in subtle ways
              </option>
              <option value="occasional_comparisons">
                Occasionally: small comments or hints
              </option>
              <option value="rare_comparisons">
                Rarely: almost never comes up
              </option>
              <option value="no_comparisons">
                No comparisons that I notice
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How clear are the boundaries around this third person?
            </label>
            <select name="boundary_clarity" style={controlStyle}>
              <option value="very_blurry">
                Very blurry: nobody really knows what is allowed or not
              </option>
              <option value="partially_blurry">
                Partially blurry: some rules, but lots of grey areas
              </option>
              <option value="clear_but_not_enforced">
                Clear on paper, but not really enforced in practice
              </option>
              <option value="clear_and_kept">
                Clear and generally kept by both sides
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How emotionally invested does your partner (or you) seem in this
              third person?
            </label>
            <select name="emotional_investment" style={controlStyle}>
              <option value="very_invested">
                Very invested: lots of emotional energy, venting, or sharing
              </option>
              <option value="moderately_invested">
                Moderately: important, but not central
              </option>
              <option value="light_investment">
                Light: casual, surface‑level contact
              </option>
              <option value="minimal_investment">
                Minimal: doesn&apos;t seem emotionally loaded
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a situation that made you think: ‘Wait, is there a third person in this dynamic?’..."
            />
          </div>

          <div style={{ marginTop: 4 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "none",
                backgroundColor: "#ffffff",
                color: "#000000",
                fontWeight: 600,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Analyzing..." : "Analyze triangle risk"}
            </button>
          </div>
        </form>

        {result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Overall triangle risk: {result.overall_triangle_risk}
            </h2>

            <p style={{ marginBottom: 24, color: "#ccc", fontSize: 16, lineHeight: 1.6 }}>
              {result.summary.split(".")[0]}.
            </p>

            {!emailSubmitted ? (
              <>
                <div style={{ position: "relative", marginBottom: 24 }}>
                  <div style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none", opacity: 0.6 }}>
                    <h3 style={sectionTitleStyle}>Indices</h3>
                    {["Triangle Risk Index", "Secrecy Load Score", "Boundary Blur Index", "Emotional Outsourcing Score", "Comparison Pressure Index"].map((name, i) => (
                      <p key={i}>
                        <strong>{name}: {(0.3 + i * 0.1).toFixed(1)}</strong>
                        <br />
                        <span style={{ color: "#888" }}>{"█".repeat(8 + i % 4)} {"█".repeat(6 + i % 3)}</span>
                      </p>
                    ))}
                    <h3 style={sectionTitleStyle}>Summary</h3>
                    <p>{"█".repeat(40)}<br />{"█".repeat(35)}<br />{"█".repeat(28)}</p>
                  </div>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      background: "rgba(0,0,0,0.85)", padding: "20px 28px",
                      borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)",
                      textAlign: "center", maxWidth: 340,
                    }}>
                      <p style={{ margin: "0 0 16px 0", fontWeight: 600, fontSize: 15, color: "#fff" }}>
                        Enter your email to see the full analysis
                      </p>
                      <EmailCapture
                        testName="Third Person in the Grey Zone"
                        resultLevel={result.overall_triangle_risk}
                        onSuccess={() => {
                          setEmailSubmitted(true);
                          localStorage.setItem("email_submitted_third_person", "true");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 style={sectionTitleStyle}>Indices</h3>

                <p>
                  <strong>Triangle Risk Index: {result.indices.triangle_risk_index}</strong>
                  <br />
                  Overall likelihood that this grey‑zone connection functions as a hidden or emerging triangle. 0 = low, 1 = very high.
                </p>
                <p>
                  <strong>Secrecy Load Score: {result.indices.secrecy_load_score}</strong>
                  <br />
                  Measures how much secrecy, hiding, or double life the situation carries. 0 = mostly transparent, 1 = heavily concealed.
                </p>
                <p>
                  <strong>Boundary Blur Index: {result.indices.boundary_blur_index}</strong>
                  <br />
                  Shows how undefined or negotiable the limits around this person are. 0 = clear and stable, 1 = very blurred.
                </p>
                <p>
                  <strong>Emotional Outsourcing Score: {result.indices.emotional_outsourcing_score}</strong>
                  <br />
                  Reflects how much emotional energy is redirected from the main relationship to the third person. 0 = almost none, 1 = a lot.
                </p>
                <p>
                  <strong>Comparison Pressure Index: {result.indices.comparison_pressure_index}</strong>
                  <br />
                  Shows how strong the sense of comparison or competition feels between you and this third person. 0 = almost no comparison, 1 = strong ongoing pressure to measure up or compete.
                </p>

                <h3 style={sectionTitleStyle}>Summary</h3>
                <p style={{ marginBottom: 24 }}>{result.summary}</p>
              </>
            )}

            {protocolTier === "none" ? (
              <div style={{
                marginTop: 24, padding: 24,
                border: "1px solid #4ade80", borderRadius: 12,
                background: "rgba(16, 185, 129, 0.1)", color: "#86efac",
              }}>
                <h3 style={{ margin: "0 0 12px 0", color: "#4ade80" }}>✅ Low risk</h3>
                <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
                  No significant triangle dynamic detected.<br />
                  The situation looks transparent and low-risk.
                </p>
                <p style={{ marginTop: 12, opacity: 0.95 }}>
                  No protocol needed — keep doing what you're doing.
                </p>
              </div>
            ) : !paid ? (
              <div style={{
                marginTop: 16, padding: 16,
                border: "1px solid rgba(255,255,255,0.16)", borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
              }}>
                <p style={{ marginBottom: 12, fontWeight: 600 }}>
                  Recommended:{" "}
                  <strong>
                    {protocolTier === "hard" ? "Exit Protocol" : "Clarity Protocol"}
                  </strong>{" "}
                  — $3
                </p>
                <div style={{ minHeight: "50px" }} ref={paypalSingleRef} />
                {paying && <p style={{ marginTop: 12 }}>Processing payment...</p>}
                {payError && <p style={{ marginTop: 12, color: "#ff8c8c" }}>{payError}</p>}
              </div>
            ) : (
              <div style={{ marginTop: 30 }}>
                <h2 style={{ marginBottom: 16, color: "#fff" }}>
                  {thirdPersonProtocols[protocolTier]?.title || "Protocol"}
                </h2>

                <ProtocolEmailCapture
                  protocolScope="third-person-grey-zone"
                  protocolTier={protocolTier}
                  protocolTitle={thirdPersonProtocols[protocolTier]?.title}
                />
                
                <div style={{
                  fontSize: "15.2px", lineHeight: "1.75", color: "#ddd",
                  background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: 10,
                }}>
                  {thirdPersonProtocols[protocolTier] && (() => {
                    const p = thirdPersonProtocols[protocolTier];
                    return (
                      <>
                        <p><strong>{p.subtitle}</strong></p>
                        <p style={{ marginTop: 16, marginBottom: 24 }}>{p.intro}</p>
                        {p.blocks.map((block, idx) => (
                          <div key={idx} style={{ marginTop: 32 }}>
                            <h3 style={{ color: "#fff", marginBottom: 12, fontSize: "18px" }}>{block.title}</h3>
                            {block.goal && <p><strong>Goal:</strong> {block.goal}</p>}
                            {block.when && <p><strong>When:</strong> {block.when}</p>}
                            {block.items && (
                              <div style={{ marginTop: 16 }}>
                                {block.items.map((item, i) => {
                                  if (item.type === "subheader") return (
                                    <div key={i} style={{ marginTop: 14, marginBottom: 4, fontWeight: 600, color: "#fff" }}>{item.text}</div>
                                  );
                                  if (item.type === "sub") return (
                                    <div key={i} style={{ paddingLeft: 20, marginBottom: 6, color: "#ccc" }}>{"— " + item.text}</div>
                                  );
                                  if (item.type === "quote") return (
                                    <div key={i} style={{
                                      margin: "10px 0", padding: "10px 16px",
                                      borderLeft: "3px solid rgba(255,255,255,0.3)",
                                      color: "#ddd", fontStyle: "italic", lineHeight: 1.6,
                                    }}>{item.text}</div>
                                  );
                                  return <div key={i} style={{ marginBottom: 8, color: "#ddd" }}>{item.text}</div>;
                                })}
                              </div>
                            )}
                            {block.why && (
                              <div style={{ marginTop: 16 }}>
                                <strong>Why:</strong>
                                <ul style={{ paddingLeft: "24px", marginTop: 8 }}>
                                  {block.why.map((w, i) => <li key={i} style={{ marginBottom: 6 }}>{w}</li>)}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                        {p.closing && (
                          <p style={{
                            marginTop: 40, padding: "16px 20px",
                            background: "rgba(255,255,255,0.05)",
                            borderLeft: "4px solid #4ade80",
                            fontStyle: "italic", color: "#ccc", lineHeight: 1.6,
                          }}>{p.closing}</p>
                        )}
                      </>
                    );
                  })()}
                </div>
                <button
                  onClick={async () => {
                    const p = thirdPersonProtocols[protocolTier];
                    if (!p) return;
                    let text = p.title + "\n\n" + p.subtitle + "\n\n" + p.intro + "\n\n";
                    p.blocks.forEach(b => {
                      text += b.title + "\n";
                      if (b.goal) text += "Goal: " + b.goal + "\n";
                      if (b.when) text += "When: " + b.when + "\n\n";
                      if (b.items) b.items.forEach(item => { text += "  " + item.text + "\n"; });
                      if (b.why) b.why.forEach(w => { text += "  → " + w + "\n"; });
                      text += "\n";
                    });
                    if (p.closing) text += p.closing;
                    try {
                      await navigator.clipboard.writeText(text);
                      alert("✅ " + p.title + " copied!");
                    } catch { alert("Could not copy. Please select the text manually."); }
                  }}
                  style={{
                    marginTop: 32, padding: "14px 24px", borderRadius: 8,
                    border: "none", backgroundColor: "#ffffff", color: "#000",
                    fontWeight: 600, cursor: "pointer", width: "100%", fontSize: "16px",
                  }}
                >
                  📋 Copy full protocol to clipboard
                </button>
                <p style={{ marginTop: 16, fontSize: 13, opacity: 0.75, textAlign: "center" }}>
                  Save it and practice daily.
                </p>
              </div>
            )}
          </section>
        )}
                <p
          style={{
            marginTop: 24,
            fontSize: 11,
            opacity: 0.6,
            lineHeight: 1.4,
          }}
        >
          This tool is not therapy, medical care, or legal advice. It cannot
          diagnose anything or tell you what to do. You are fully responsible
          for any decisions or actions you take based on these checkups.
        </p>
      </div>
    </div>
  );
}
