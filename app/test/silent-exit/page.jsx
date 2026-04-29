"use client";

import { useState, useEffect, useRef } from "react";
import { silentExitProtocols } from "../../../lib/protocols/silentExit";
import { getProtocolTier } from "../../../lib/protocolTiers";
import EmailCapture from "../../../components/EmailCapture";
import ProtocolEmailCapture from "../../../components/ProtocolEmailCapture";

export default function SilentExitTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const paypalSingleRef = useRef(null);

  useEffect(() => {
    const emailLocal = localStorage.getItem("email_submitted_silent_exit");
    if (emailLocal === "true") setEmailSubmitted(true);

    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const paidLocal = localStorage.getItem("paid_silent_exit");
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";
    if (isPaid) {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_silent_exit");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("silent-exit", parsed);
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
            custom_id: "silent-exit-single",
            description: `Silent Exit — ${protocolTier === "hard" ? "Exit" : "Awareness"} Protocol`,
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
            body: JSON.stringify({ orderId: data.orderID, intent: "single", scope: "silent-exit", email: "user@paypal.com" }),
          });
          const json = await res.json();
          if (!res.ok || !json.success) throw new Error(json.error || "Payment confirmation failed");
          localStorage.setItem("paid_silent_exit", "true");
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
    localStorage.removeItem("paid_silent_exit");
    localStorage.removeItem("email_submitted_silent_exit");
    setEmailSubmitted(false);

const formData = new FormData(e.currentTarget);

const initiative_level = formData.get("initiative_level");
const emotional_sharing = formData.get("emotional_sharing");
const future_talk = formData.get("future_talk");
const time_together_quality = formData.get("time_together_quality");
const conflict_engagement = formData.get("conflict_engagement");
const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "silent_exit",
        answers: {
          initiative_level,
          emotional_sharing,
          future_talk,
          time_together_quality,
          conflict_engagement,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_silent_exit", JSON.stringify(data));
    const tier = getProtocolTier("silent-exit", data);
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
            Silent exit from the relationship
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Check if you&apos;re still in a living relationship — or if one of
            you is already slowly checking out while staying “officially
            together”.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              Who invests more initiative into contact and shared plans right
              now?
            </label>
            <select name="initiative_level" style={controlStyle}>
              <option value="mostly_me">
                Mostly me: if I stop, things almost stop
              </option>
              <option value="somewhat_me">
                Slightly more me, but they also initiate sometimes
              </option>
              <option value="balanced">
                Roughly balanced: both sides still reach toward each other
              </option>
              <option value="mostly_them">
                Mostly them: they currently carry more of the initiative
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How much meaningful emotional sharing is left between you?
            </label>
            <select name="emotional_sharing" style={controlStyle}>
              <option value="almost_none">
                Almost none: we mostly talk about logistics or neutral topics
              </option>
              <option value="reduced">
                Reduced: sometimes deeper talks, but much less than before
              </option>
              <option value="moderate">
                Moderate: still share feelings and inner life fairly regularly
              </option>
              <option value="high">
                High: emotional sharing is alive, even if we have issues
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How do conversations about the future together look right now?
            </label>
            <select name="future_talk" style={controlStyle}>
              <option value="avoided">
                Mostly avoided or postponed with vague answers
              </option>
              <option value="minimal_and_foggy">
                Minimal and foggy: some mentions, but nothing concrete
              </option>
              <option value="present_but_careful">
                Present but careful: we talk about the future with some caution
              </option>
              <option value="active_planning">
                Active planning: we make real plans and update them together
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              When you spend time together, what does it feel like?
            </label>
            <select name="time_together_quality" style={controlStyle}>
              <option value="disconnected">
                Disconnected: scrolling, silence, or parallel lives in one
                space
              </option>
              <option value="mixed_quality">
                Mixed: some alive moments, some “roommate mode”
              </option>
              <option value="mostly_connected">
                Mostly connected: there is still curiosity and contact
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What happens with conflict and difficult topics?
            </label>
            <select name="conflict_engagement" style={controlStyle}>
              <option value="avoid_or_shut_down">
                Avoid or shut down: “I don&apos;t want to talk about this”
              </option>
              <option value="brief_but_unresolved">
                Brief talks that don&apos;t really resolve anything
              </option>
              <option value="engaged_but_messy">
                Engaged but messy: we argue, but at least both are present
              </option>
              <option value="engaged_and_working">
                Engaged and working: we can stay in the room and move things
                slowly
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a few recent days or weeks that made you think: ‘Are we still really together, or just not breaking up?’..."
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
              {loading ? "Analyzing..." : "Analyze emotional presence"}
            </button>
          </div>
        </form>

{result && result.indices && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Silent‑exit level: {result.overall_exit_pattern_level}
            </h2>

            <p style={{ marginBottom: 24, color: "#ccc", fontSize: 16, lineHeight: 1.6 }}>
              {result.summary.split(".")[0]}.
            </p>

            {!emailSubmitted ? (
              <>
                <div style={{ position: "relative", marginBottom: 24 }}>
                  <div style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none", opacity: 0.6 }}>
                    <h3 style={sectionTitleStyle}>Indices</h3>
                    {["Presence Fade Index", "Emotional Withdrawal Score", "Conflict Avoidance Index", "Parallel Life Drift Score", "Closure Risk Index"].map((name, i) => (
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
                        testName="Silent Exit from the Relationship"
                        resultLevel={result.overall_exit_pattern_level}
                        onSuccess={() => {
                          setEmailSubmitted(true);
                          localStorage.setItem("email_submitted_silent_exit", "true");
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
                  <strong>Presence Fade Index: {result.indices.presence_fade_index}</strong>
                  <br />
                  Shows how much their everyday presence and initiative have faded. 0 = very present and engaged, 1 = strong disappearance pattern.
                </p>
                <p>
                  <strong>Emotional Withdrawal Score: {result.indices.emotional_withdrawal_score}</strong>
                  <br />
                  Reflects how emotionally shut down or disconnected they feel. 0 = emotionally responsive, 1 = strongly withdrawn or indifferent.
                </p>
                <p>
                  <strong>Conflict Avoidance Index: {result.indices.conflict_avoidance_index}</strong>
                  <br />
                  Captures how much hard topics and tensions are avoided instead of talked through. 0 = conflicts are addressed, 1 = strong avoidance or shutdown.
                </p>
                <p>
                  <strong>Parallel Life Drift Score: {result.indices.parallel_life_drift_score}</strong>
                  <br />
                  Describes how parallel your lives have become. 0 = deeply interwoven, 1 = almost separate lives under the same label.
                </p>
                <p>
                  <strong>Closure Risk Index: {result.indices.closure_risk_index}</strong>
                  <br />
                  Estimates how likely it is that things will end without a clear closure talk. 0 = very unlikely, 1 = high risk of a quiet or abrupt exit.
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
                <h3 style={{ margin: "0 0 12px 0", color: "#4ade80" }}>✅ Good news</h3>
                <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
                  No significant silent exit pattern detected.<br />
                  The connection looks present and engaged.
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
                  {silentExitProtocols[protocolTier]?.title || "Protocol"}
                </h2>

                <ProtocolEmailCapture
                  protocolScope="silent-exit"
                  protocolTier={protocolTier}
                  protocolTitle={silentExitProtocols[protocolTier]?.title}
                />
                
                <div style={{
                  fontSize: "15.2px", lineHeight: "1.75", color: "#ddd",
                  background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: 10,
                }}>
                  {silentExitProtocols[protocolTier] && (() => {
                    const p = silentExitProtocols[protocolTier];
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
                    const p = silentExitProtocols[protocolTier];
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
