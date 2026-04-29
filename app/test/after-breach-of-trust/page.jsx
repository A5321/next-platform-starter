"use client";

import { useState, useEffect, useRef } from "react";
import { afterBreachProtocols } from "../../../lib/protocols/afterBreach";
import { getProtocolTier } from "../../../lib/protocolTiers";
import EmailCapture from "../../../components/EmailCapture";
import ProtocolEmailCapture from "../../../components/ProtocolEmailCapture";

export default function AfterBreachOfTrustTest() {
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
    const paidLocal = localStorage.getItem("paid_after_breach");
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";
    if (isPaid) {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_after_breach");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("after-breach-of-trust", parsed);
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
            custom_id: "after-breach-single",
            description: `After Breach of Trust — ${protocolTier === "hard" ? "Exit" : "Stabilization"} Protocol`,
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
            body: JSON.stringify({ orderId: data.orderID, intent: "single", scope: "after-breach-of-trust", email: "user@paypal.com" }),
          });
          const json = await res.json();
          if (!res.ok || !json.success) throw new Error(json.error || "Payment confirmation failed");
          localStorage.setItem("paid_after_breach", "true");
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
    localStorage.removeItem("paid_after_breach");

    const formData = new FormData(e.currentTarget);

    const type_of_breach = formData.get("type_of_breach");
    const time_since_breach = formData.get("time_since_breach");
    const accountability = formData.get("accountability");
    const repair_behavior = formData.get("repair_behavior");
    const symptom_level = formData.get("symptom_level");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "after_breach_of_trust",
        answers: {
          type_of_breach,
          time_since_breach,
          accountability,
          repair_behavior,
          symptom_level,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_after_breach", JSON.stringify(data));
    const tier = getProtocolTier("after-breach-of-trust", data);
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
            After a serious breach of trust
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            If there was cheating, lying, or another major breach, see whether
            the relationship is actually healing — or just frozen around the
            wound.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              What kind of breach are you primarily thinking about?
            </label>
            <select name="type_of_breach" style={controlStyle}>
              <option value="sexual_or_romantic_infidelity">
                Sexual or romantic infidelity
              </option>
              <option value="major_lie_or_deception">
                Major lie or ongoing deception
              </option>
              <option value="financial_betrayal">
                Financial betrayal (hidden debt, spending, or decisions)
              </option>
              <option value="other_breach">
                Other breach of trust that changed how you see them
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How long ago did this breach become known?
            </label>
            <select name="time_since_breach" style={controlStyle}>
              <option value="less_than_3_months">
                Less than 3 months ago
              </option>
              <option value="3_to_12_months">3–12 months ago</option>
              <option value="one_to_three_years">1–3 years ago</option>
              <option value="more_than_three_years">
                More than 3 years ago
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How does the person who broke trust relate to what happened now?
            </label>
            <select name="accountability" style={controlStyle}>
              <option value="minimising_or_blame_shifting">
                Often minimises, gets defensive, or shifts blame to me / context
              </option>
              <option value="mixed_accountability">
                Sometimes takes responsibility, sometimes backs away from it
              </option>
              <option value="clear_accountability">
                Clearly takes responsibility and doesn&apos;t rewrite the story
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What has repair looked like in practice?
            </label>
            <select name="repair_behavior" style={controlStyle}>
              <option value="no_real_change">
                Lots of words, but no real change in behaviour or transparency
              </option>
              <option value="partial_change">
                Some concrete changes, but also repetition or secrecy
              </option>
              <option value="consistent_change">
                Consistent change, more openness, and active work on trust
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How present are the “symptoms” right now (checking, anxiety,
              flashbacks, fights about it)?
            </label>
            <select name="symptom_level" style={controlStyle}>
              <option value="very_intense">
                Very intense: the breach is still in the centre of the
                relationship
              </option>
              <option value="moderate">
                Moderate: comes up regularly, but not all the time
              </option>
              <option value="low_but_present">
                Low but present: it flares up at triggers, but not daily
              </option>
              <option value="mostly_integrated">
                Mostly integrated: it&apos;s part of the story, but not driving
                the present
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe what happened and what this relationship feels like now..."
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
              {loading ? "Analyzing..." : "Analyze trust recovery"}
            </button>
          </div>
        </form>

{result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Trust‑recovery level: {result.overall_trust_recovery_level}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>Repair Effort Index: {result.indices.repair_effort_index}</strong>
              <br />
              Shows how consistently the person who broke trust is engaging in concrete repair over time. 0 = almost no visible repair, 1 = steady, aligned actions.
            </p>
            <p>
              <strong>Accountability Depth Score: {result.indices.accountability_depth_score}</strong>
              <br />
              Reflects how fully they own the impact without defensiveness or rushing you to move on. 0 = shallow or blaming, 1 = clear, grounded ownership.
            </p>
            <p>
              <strong>Boundary Reset Strength: {result.indices.boundary_reset_strength}</strong>
              <br />
              Captures how solid new limits and agreements are after the breach. 0 = almost no real change, 1 = concrete new structures that are mostly respected.
            </p>
            <p>
              <strong>Trust Regrowth Pace: {result.indices.trust_regrowth_pace}</strong>
              <br />
              Describes the direction of trust over time. 0 = stalled or eroding, 1 = slow but noticeable rebuilding.
            </p>
            <p>
              <strong>Relapse Risk Index: {result.indices.relapse_risk_index}</strong>
              <br />
              Estimates how likely a similar breach is to repeat under current conditions. 0 = low risk with strong changes, 1 = high risk, many things unchanged.
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
                <h3 style={{ margin: "0 0 12px 0", color: "#4ade80" }}>✅ Repair is on track</h3>
                <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
                  The repair process shows real behavioral change and low relapse risk.<br />
                  No protocol needed — the work is happening.
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
                  {afterBreachProtocols[protocolTier]?.title || "Protocol"}
                </h2>

                <ProtocolEmailCapture
                  protocolScope="after-breach-of-trust"
                  protocolTier={protocolTier}
                  protocolTitle={afterBreachProtocols[protocolTier]?.title}
                />
                
                <div style={{
                  fontSize: "15.2px", lineHeight: "1.75", color: "#ddd",
                  background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: 10,
                }}>
                  {afterBreachProtocols[protocolTier] && (() => {
                    const p = afterBreachProtocols[protocolTier];
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
                    const p = afterBreachProtocols[protocolTier];
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
