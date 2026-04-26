"use client";

import { useState, useEffect, useRef } from "react";
import { repeatingBreakupProtocols } from "../../../lib/protocols/Repeatingbreakup";
import { getProtocolTier } from "../../../lib/protocolTiers";

export default function RepeatingBreakupTest() {
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
    const paidLocal = localStorage.getItem("paid_repeating_breakup");
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";

    if (isPaid) {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_repeating_breakup");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("repeating-breakup", parsed);
        setProtocolTier(tier);
      }
    }
  }, []);

  useEffect(() => {
    if (!result || !protocolTier || protocolTier === "none") return;
    if (paid) return;
    if (typeof window === "undefined" || !window.paypal) return;
    if (!paypalSingleRef.current) return;

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
              custom_id: "repeating-breakup-single",
              description: `Repeating Breakup — ${protocolTier === "hard" ? "Exit" : "Awareness"} Protocol`,
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
                scope: "repeating-breakup",
                email: "user@paypal.com",
              }),
            });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || "Payment confirmation failed");
            localStorage.setItem("paid_repeating_breakup", "true");
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
        setPayError("Failed to render PayPal buttons. Please refresh the page.");
      });
  }, [result, protocolTier, paid]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const count = formData.get("count");
    const whoLeaves = formData.get("whoLeaves");
    const pace = formData.get("pace");
    const postContact = formData.get("postContact");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "repeating_breakup_pattern",
        answers: {
          count,
          whoLeaves,
          pace,
          postContact,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_repeating_breakup", JSON.stringify(data));
    const tier = getProtocolTier("repeating-breakup", data);
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
          <h1 style={{ margin: 0, fontSize: 32 }}>Repeating breakup pattern</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            If your breakups start to look strangely similar, you might be
            running a pattern, not just meeting the wrong person. Answer a few
            questions to see how it behaves.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 16 }}
        >
          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How many times have you been in a relationship that ended in a
              similar way?
            </label>
            <select name="count" style={controlStyle}>
              <option value="1">Once</option>
              <option value="2-3">2–3 times</option>
              <option value="4-5">4–5 times</option>
              <option value="6+">More than 5 times</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              Who usually initiates the breakup?
            </label>
            <select name="whoLeaves" style={controlStyle}>
              <option value="mostly_me">Mostly me</option>
              <option value="mostly_them">Mostly them</option>
              <option value="mixed">It varies / hard to say</option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              How does the relationship usually feel just before it ends?
            </label>
            <select name="pace" style={controlStyle}>
              <option value="sudden_implosion">
                Feels like a sudden implosion out of nowhere
              </option>
              <option value="slow_fade">
                Slow fade, growing distance for a while
              </option>
              <option value="on_off">
                On/off cycles, many mini-breakups before the final one
              </option>
              <option value="mutual_tired">
                Mutually tired, both know it is coming
              </option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>
              What usually happens after the breakup?
            </label>
            <select name="postContact" style={controlStyle}>
              <option value="no_contact">
                We go no-contact and stay out of touch
              </option>
              <option value="friends">
                We stay in contact “as friends” for a while
              </option>
              <option value="back_and_forth">
                We keep texting / meeting and sometimes get back together
              </option>
              <option value="they_hover">
                They keep hovering around, I struggle to fully detach
              </option>
            </select>
          </div>

          <div style={{ maxWidth: 900 }}>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe one breakup that feels like a typical example of your pattern..."
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
              Breakup‑pattern intensity: {result.overall_breakup_pattern_intensity}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>Pattern Entrenchment Index: {result.indices.pattern_entrenchment_index}</strong>
              <br />
              Shows how deeply this breakup arc repeats across relationships. 0 = one-off or rare, 1 = many similar endings over time.
            </p>
            <p>
              <strong>Exit Agency Balance: {result.indices.exit_agency_balance}</strong>
              <br />
              Reflects how one-sided or shared the decision to end usually is. 0 = almost always one person ends it, 1 = more mutual or balanced endings.
            </p>
            <p>
              <strong>Build‑up Awareness Score: {result.indices.build_up_awareness_score}</strong>
              <br />
              Captures how much warning there usually is before the breakup. 0 = sudden implosions "out of nowhere", 1 = clear trajectory and signals.
            </p>
            <p>
              <strong>Post‑Breakup Fusion Risk: {result.indices.post_breakup_fusion_risk}</strong>
              <br />
              Measures how entangled things stay after the breakup. 0 = clean separation, 1 = lots of contact, on/off, or hovering.
            </p>
            <p>
              <strong>Next‑Cycle Probability: {result.indices.next_cycle_probability}</strong>
              <br />
              Estimates how likely a similar breakup pattern is to repeat if nothing structural changes. 0 = low chance, 1 = very likely.
            </p>

            <h3 style={sectionTitleStyle}>Summary</h3>
            <p style={{ marginBottom: 24 }}>{result.summary}</p>

            {protocolTier === "none" ? (
              <div style={{
                marginTop: 24, padding: 24,
                border: "1px solid #4ade80", borderRadius: 12,
                background: "rgba(16, 185, 129, 0.1)", color: "#86efac",
              }}>
                <h3 style={{ margin: "0 0 12px 0", color: "#4ade80" }}>✅ No strong pattern detected</h3>
                <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
                  Your breakup history does not show a clearly repeating arc.<br />
                  No protocol needed at this time.
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
                    {protocolTier === "hard" ? "Exit Protocol" : "Awareness Protocol"}
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
                  {repeatingBreakupProtocols[protocolTier]?.title || "Protocol"}
                </h2>
                <div style={{
                  fontSize: "15.2px", lineHeight: "1.75", color: "#ddd",
                  background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: 10,
                }}>
                  {repeatingBreakupProtocols[protocolTier] && (() => {
                    const p = repeatingBreakupProtocols[protocolTier];
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
                    const p = repeatingBreakupProtocols[protocolTier];
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
