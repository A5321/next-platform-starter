"use client";

import { useState, useEffect, useRef } from "react";
import { trustSignalsProtocols } from "../../../lib/protocols/trustSignals";
import { getProtocolTier } from "../../../lib/protocolTiers";
import EmailCapture from "../../../components/EmailCapture";
import ProtocolEmailCapture from "../../../components/ProtocolEmailCapture";

export default function TrustTheirSignalsTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const paypalSingleRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const paidLocal = localStorage.getItem("paid_trust_signals");
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";
    if (isPaid) {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_trust_signals");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("trust-their-signals", parsed);
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
            custom_id: "trust-signals-single",
            description: `Trust Their Signals — ${protocolTier === "hard" ? "Exit" : "Grounding"} Protocol`,
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
            body: JSON.stringify({ orderId: data.orderID, intent: "single", scope: "trust-their-signals", email: "user@paypal.com" }),
          });
          const json = await res.json();
          if (!res.ok || !json.success) throw new Error(json.error || "Payment confirmation failed");
          localStorage.setItem("paid_trust_signals", "true");
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
    localStorage.removeItem("paid_trust_signals");

    const formData = new FormData(e.currentTarget);

    const clarity_in_conflict = formData.get("clarity_in_conflict");
    const clarity_about_intentions = formData.get(
      "clarity_about_intentions"
    );
    const reliability_of_promises = formData.get(
      "reliability_of_promises"
    );
    const reaction_to_questions = formData.get("reaction_to_questions");
    const gut_feeling = formData.get("gut_feeling");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "trust_their_signals",
        answers: {
          clarity_in_conflict,
          clarity_about_intentions,
          reliability_of_promises,
          reaction_to_questions,
          gut_feeling,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_trust_signals", JSON.stringify(data));
    const tier = getProtocolTier("trust-their-signals", data);
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
            Can you trust their signals?
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Test how readable this person really is: are you responding to a
            clear pattern or constantly decoding mixed and shifting signals?
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              When there is tension or conflict, how clear are their signals?
            </label>
            <select name="clarity_in_conflict" style={controlStyle}>
              <option value="withdraw_or_attack">
                They either withdraw or attack; I have no idea what they
                actually feel
              </option>
              <option value="mixed_but_some_clues">
                Mixed: some honest signals, some games or shutdowns
              </option>
              <option value="mostly_clear">
                Mostly clear: I can understand what&apos;s going on even if it&apos;s
                uncomfortable
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How clearly do they communicate their intentions about this
              relationship?
            </label>
            <select name="clarity_about_intentions" style={controlStyle}>
              <option value="very_vague">
                Very vague: avoid labels, future talk, or any clear position
              </option>
              <option value="changing_story">
                Story changes depending on mood / context
              </option>
              <option value="mostly_consistent">
                Mostly consistent and understandable, even if not ideal
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How reliable are their promises and stated plans?
            </label>
            <select
              name="reliability_of_promises"
              style={controlStyle}
            >
              <option value="often_broken">
                Often broken or quietly forgotten
              </option>
              <option value="sometimes_kept">
                Sometimes kept, sometimes not — hard to predict
              </option>
              <option value="usually_kept">
                Usually kept; if something changes, they tell me directly
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What happens when you ask for clarity about their behavior?
            </label>
            <select name="reaction_to_questions" style={controlStyle}>
              <option value="defensive_or_flipping">
                They get defensive, flip it on me, or make me feel crazy
              </option>
              <option value="partial_answers">
                Give partial answers, change topic, or joke it away
              </option>
              <option value="open_and_direct">
                Open and direct: may need time, but they answer honestly
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              If you ignore words for a moment and scan your body, how does it
              feel to rely on their signals?
            </label>
            <select name="gut_feeling" style={controlStyle}>
              <option value="constantly_on_edge">
                Constantly on edge: waiting for next turn in the story
              </option>
              <option value="mixed">
                Mixed: some safety, some anxiety that doesn&apos;t go away
              </option>
              <option value="mostly_safe">
                Mostly safe: my system can rest between conflicts
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a moment when their signals felt especially confusing — or, in contrast, surprisingly clear..."
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
              {loading ? "Analyzing..." : "Analyze signals"}
            </button>
          </div>
        </form>

{result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Trust‑in‑signals level: {result.overall_trust_in_signals}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>Signal Trust Index: {result.indices.signal_trust_index}</strong>
              <br />
              Overall sense of how safe it is to rely on their signals when you make decisions about this relationship. 0 = you can't lean on them at all, 1 = signals are a solid base.
            </p>
            <p>
              <strong>Conflict Clarity Score: {result.indices.conflict_clarity_score}</strong>
              <br />
              Measures how understandable their behaviour is when things get tense. 0 = chaos, shutdowns, or manipulation, 1 = direct but human reactions.
            </p>
            <p>
              <strong>Intention Transparency Index: {result.indices.intention_transparency_index}</strong>
              <br />
              Shows how openly they talk about what they want with you. 0 = everything in hints or shifting stories, 1 = mostly explicit and consistent.
            </p>
            <p>
              <strong>Promise Reliability Score: {result.indices.promise_reliability_score}</strong>
              <br />
              Reflects how often their promises and plans actually hold. 0 = chronic flakiness or quiet cancellations, 1 = strong follow‑through.
            </p>
            <p>
              <strong>Gaslighting Risk Index: {result.indices.gaslighting_risk_index}</strong>
              <br />
              Captures how often their answers to your questions make you doubt your own perception. 0 = almost no gaslighting pattern, 1 = strong, repeated turning your concerns against you.
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
                  Their signals are readable and consistent.<br />
                  No significant trust gap detected.
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
                    {protocolTier === "hard" ? "Exit Protocol" : "Grounding Protocol"}
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
                  {trustSignalsProtocols[protocolTier]?.title || "Protocol"}
                </h2>

                <ProtocolEmailCapture
                  protocolScope="trust-their-signals
"
                  protocolTier={protocolTier}
                  protocolTitle={trustSignalsProtocols[protocolTier]?.title}
                />
                
                <div style={{
                  fontSize: "15.2px", lineHeight: "1.75", color: "#ddd",
                  background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: 10,
                }}>
                  {trustSignalsProtocols[protocolTier] && (() => {
                    const p = trustSignalsProtocols[protocolTier];
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
                    const p = trustSignalsProtocols[protocolTier];
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
