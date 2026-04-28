"use client";

import { useState, useEffect, useRef } from "react";

import { mixedSignalsProtocols } from "../../../lib/protocols/Mixedsignals";
import { getProtocolTier } from "../../../lib/protocolTiers";
import EmailCapture from "../../../components/EmailCapture";
import ProtocolEmailCapture from "../../../components/ProtocolEmailCapture";

export default function MixedSignalsTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const paypalSingleRef = useRef(null);
  const paypalRenderedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const paidLocal = localStorage.getItem("paid_mixed_signals");
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";

    if (isPaid) {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_mixed_signals");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("mixed-signals", parsed);
        setProtocolTier(tier);
      }
    }
  }, []);

  // PayPal render
  useEffect(() => {
    if (!result || !protocolTier || protocolTier === "none") return;
    if (paid) return;
    if (typeof window === "undefined" || !window.paypal) return;
    if (!paypalSingleRef.current) return;

    paypalRenderedRef.current = false;
    if (paypalSingleRef.current.hasChildNodes()) {
      paypalSingleRef.current.innerHTML = "";
    }

    window.paypal
      .Buttons({
        style: { layout: "vertical", shape: "rect", label: "paypal", height: 42 },
        createOrder: async (_, actions) => {
          setPayError("");
          return actions.order.create({
            purchase_units: [{
              amount: { value: "3.00", currency_code: "USD" },
              custom_id: "mixed-signals-single",
              description: `Mixed Signals — ${protocolTier === "hard" ? "Exit" : "Stabilization"} Protocol`,
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
              body: JSON.stringify({
                orderId: data.orderID,
                intent: "single",
                scope: "mixed-signals",
                email: "user@paypal.com",
              }),
            });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || "Payment confirmation failed");
            localStorage.setItem("paid_mixed_signals", "true");
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
      })
      .render(paypalSingleRef.current)
      .catch((err) => {
        console.error("PayPal render error:", err);
        setPayError("Failed to render PayPal buttons. Please refresh the page.");
      });
  }, [result, protocolTier, paid]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setPaid(false);
    setProtocolTier(null);
    setPayError("");
    localStorage.removeItem("paid_mixed_signals");

    const formData = new FormData(e.currentTarget);

    const clarity = formData.get("clarity");
    const outreach = formData.get("outreach");
    const mixed = formData.get("mixed");
    const impact = formData.get("impact");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "mixed_signals_interest_gap",
        answers: {
          clarity,
          outreach,
          mixed,
          impact,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_mixed_signals", JSON.stringify(data));
    const tier = getProtocolTier("mixed-signals", data);
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
          <h1 style={{ margin: 0, fontSize: 32 }}>Mixed signals / interest gap</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            When someone is warm and cold at the same time, it is often a pattern,
            not a mystery. Answer a few questions to see how this dynamic behaves.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 16 }}
        >
          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How clear is your status with this person?
            </label>
            <select name="clarity" style={controlStyle}>
              <option value="very_clear">Very clear</option>
              <option value="somewhat_clear">Somewhat clear</option>
              <option value="somewhat_unclear">Somewhat unclear</option>
              <option value="very_unclear">Very unclear</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              Who reaches out or initiates more?
            </label>
            <select name="outreach" style={controlStyle}>
              <option value="mostly_me">Mostly me</option>
              <option value="mostly_them">Mostly them</option>
              <option value="roughly_equal">Roughly equal</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How often do they send mixed signals (warm–cold, vague plans, etc.)?
            </label>
            <select name="mixed" style={controlStyle}>
              <option value="almost_never">Almost never</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
              <option value="very_often">Very often</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How strong is the emotional impact of this dynamic on you now?
            </label>
            <select name="impact" style={controlStyle}>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="very_high">Very high</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a recent interaction that shows their mixed signals..."
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
              {loading ? "Analyzing..." : "Analyze pattern"}
            </button>
          </div>
        </form>

        {result && result.indices && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Mixed‑signal level: {result.overall_mixed_signal_level}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>Signal Clarity Index: {result.indices.signal_clarity_index}</strong>
              <br />
              Shows how readable the situation is. 0 = very unclear or contradictory, 1 = very clear, even if the answer is "they're not that into this".
            </p>
            <p>
              <strong>Interest Gap Index: {result.indices.interest_gap_index}</strong>
              <br />
              Measures how big the gap is between your investment and theirs. 0 = roughly matched interest, 1 = strong gap in who cares and shows up.
            </p>
            <p>
              <strong>Mixed Signal Volatility: {result.indices.mixed_signal_volatility}</strong>
              <br />
              Captures how often and how sharply they swing between warm and cold. 0 = almost no mixed signals, 1 = frequent, intense flips.
            </p>
            <p>
              <strong>Anxiety Load Score: {result.indices.anxiety_load_score}</strong>
              <br />
              Reflects how heavy this dynamic sits on your mind and body. 0 = easy to park and forget, 1 = very preoccupying and tense.
            </p>
            <p>
              <strong>Ghosting Drift Risk: {result.indices.ghosting_drift_risk}</strong>
              <br />
              Estimates how likely this is to slide into soft ghosting, on‑and‑off attention, or a quiet fade‑out. 0 = very unlikely, 1 = high risk.
            </p>

            <h3 style={sectionTitleStyle}>Summary</h3>
            <p style={{ marginBottom: 24 }}>{result.summary}</p>

            <EmailCapture 
              testName="Current Relationship Checkup" 
              resultLevel={result.overall_risk_level} 
            />

            {protocolTier === "none" ? (
              <div style={{
                marginTop: 24, padding: 24,
                border: "1px solid #4ade80", borderRadius: 12,
                background: "rgba(16, 185, 129, 0.1)", color: "#86efac",
              }}>
                <h3 style={{ margin: "0 0 12px 0", color: "#4ade80" }}>✅ Good news</h3>
                <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
                  The dynamic looks clear and balanced.<br />
                  No significant mixed-signal pattern detected.
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
                    {protocolTier === "hard" ? "Exit Protocol" : "Stabilization Protocol"}
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
                  {mixedSignalsProtocols[protocolTier]?.title || "Protocol"}
                </h2>

                <ProtocolEmailCapture
                  protocolScope="mixed-signals"
                  protocolTier={protocolTier}
                  protocolTitle={mixedSignalsProtocols[protocolTier]?.title}
                />
                
                <div style={{
                  fontSize: "15.2px", lineHeight: "1.75", color: "#ddd",
                  background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: 10,
                }}>
                  {mixedSignalsProtocols[protocolTier] && (() => {
                    const p = mixedSignalsProtocols[protocolTier];
                    return (
                      <>
                        <p><strong>{p.subtitle}</strong></p>
                        <p style={{ marginTop: 16, marginBottom: 24 }}>{p.intro}</p>
                        {p.blocks.map((block, idx) => (
                          <div key={idx} style={{ marginTop: 32 }}>
                            <h3 style={{ color: "#fff", marginBottom: 12, fontSize: "18px" }}>
                              {block.title}
                            </h3>
                            {block.goal && <p><strong>Goal:</strong> {block.goal}</p>}
                            {block.when && <p><strong>When:</strong> {block.when}</p>}
                            {block.items && (
                              <div style={{ marginTop: 16 }}>
                                {block.items.map((item, i) => {
                                  if (item.type === "subheader") return (
                                    <div key={i} style={{ marginTop: 14, marginBottom: 4, fontWeight: 600, color: "#fff" }}>
                                      {item.text}
                                    </div>
                                  );
                                  if (item.type === "sub") return (
                                    <div key={i} style={{ paddingLeft: 20, marginBottom: 6, color: "#ccc" }}>
                                      {"— " + item.text}
                                    </div>
                                  );
                                  if (item.type === "quote") return (
                                    <div key={i} style={{
                                      margin: "10px 0", padding: "10px 16px",
                                      borderLeft: "3px solid rgba(255,255,255,0.3)",
                                      color: "#ddd", fontStyle: "italic", lineHeight: 1.6,
                                    }}>
                                      {item.text}
                                    </div>
                                  );
                                  return (
                                    <div key={i} style={{ marginBottom: 8, color: "#ddd" }}>
                                      {item.text}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {block.why && (
                              <div style={{ marginTop: 16 }}>
                                <strong>Why:</strong>
                                <ul style={{ paddingLeft: "24px", marginTop: 8 }}>
                                  {block.why.map((w, i) => (
                                    <li key={i} style={{ marginBottom: 6 }}>{w}</li>
                                  ))}
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
                          }}>
                            {p.closing}
                          </p>
                        )}
                      </>
                    );
                  })()}
                </div>
                <button
                  onClick={async () => {
                    const p = mixedSignalsProtocols[protocolTier];
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
                    } catch {
                      alert("Could not copy. Please select the text manually.");
                    }
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

            <p style={{ marginTop: 40, fontSize: 12, opacity: 0.7 }}>
              This tool is not therapy, medical care, or legal advice. You are fully responsible for any decisions or actions you take.
            </p>
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
