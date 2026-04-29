"use client";

import { useState, useEffect, useRef } from "react";
import { hyperParentProtocols } from "../../../lib/protocols/hyperParent";
import { getProtocolTier } from "../../../lib/protocolTiers";
import EmailCapture from "../../../components/EmailCapture";
import ProtocolEmailCapture from "../../../components/ProtocolEmailCapture";

export default function HyperControllingParentTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const paypalSingleRef = useRef(null);

  useEffect(() => {
    const emailLocal = localStorage.getItem("email_submitted_hyper_parent");
    if (emailLocal === "true") setEmailSubmitted(true);

    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const paidLocal = localStorage.getItem("paid_hyper_parent");
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";
    if (isPaid) {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_hyper_parent");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("hyper-controlling-parent", parsed);
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
            custom_id: "hyper-parent-single",
            description: `Hyper-Controlling Parent — ${protocolTier === "hard" ? "Exit" : "Awareness"} Protocol`,
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
            body: JSON.stringify({ orderId: data.orderID, intent: "single", scope: "hyper-controlling-parent", email: "user@paypal.com" }),
          });
          const json = await res.json();
          if (!res.ok || !json.success) throw new Error(json.error || "Payment confirmation failed");
          localStorage.setItem("paid_hyper_parent", "true");
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
    localStorage.removeItem("paid_hyper_parent");
    localStorage.removeItem("email_submitted_hyper_parent");
    setEmailSubmitted(false);

    const formData = new FormData(e.currentTarget);

    const emotional_tone = formData.get("emotional_tone");
    const autonomy = formData.get("autonomy");
    const privacy = formData.get("privacy");
    const punishment_pattern = formData.get("punishment_pattern");
    const current_effect = formData.get("current_effect");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "hyper_controlling_parent",
        answers: {
          emotional_tone,
          autonomy,
          privacy,
          punishment_pattern,
          current_effect,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_hyper_parent", JSON.stringify(data));
    const tier = getProtocolTier("hyper-controlling-parent", data);
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
            Hyper‑controlling parent pattern
          </h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Check if what you grew up with was care — or control, guilt, and
            humiliation dressed up as “love”. We&apos;ll map how this pattern
            might echo in your current relationships.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>
              What was the usual emotional tone from the parent you&apos;re
              thinking about?
            </label>
            <select name="emotional_tone" style={controlStyle}>
              <option value="mostly_warm">
                Mostly warm, with occasional criticism or tension
              </option>
              <option value="warm_but_controlling">
                Warm but controlling: “I love you, so you must do it my way”
              </option>
              <option value="cold_or_humiliating">
                Often cold, critical, shaming or mocking
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How much autonomy did you have in everyday decisions (clothes,
              friends, hobbies, schedule)?
            </label>
            <select name="autonomy" style={controlStyle}>
              <option value="very_little">
                Very little: most choices were decided or “approved” by them
              </option>
              <option value="some">
                Some autonomy, but big or &quot;important&quot; choices were
                tightly controlled
              </option>
              <option value="a_lot">
                A lot: I could experiment and make my own choices, even if they
                disagreed
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How did they treat your privacy (room, phone, diary, messages)?
            </label>
            <select name="privacy" style={controlStyle}>
              <option value="no_privacy">
                No real privacy: checking, reading, or bursting in was normal
              </option>
              <option value="conditional_privacy">
                Conditional privacy: they could invade it “for your own good”
              </option>
              <option value="respected_privacy">
                Mostly respected my space and boundaries
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              What happened when you didn&apos;t obey or had your own opinion?
            </label>
            <select name="punishment_pattern" style={controlStyle}>
              <option value="guilt_and_shame">
                Guilt / shame: “you&apos;re ungrateful”, “you hurt me”
              </option>
              <option value="anger_and_control">
                Anger, lectures, threats, or control over money / freedom
              </option>
              <option value="calm_limits">
                Calm discussion and clear limits without humiliation
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How do you feel this still affects your current relationships?
            </label>
            <select name="current_effect" style={controlStyle}>
              <option value="over_adapting">
                I over‑adapt, scan for other people&apos;s moods, try not to
                upset anyone
              </option>
              <option value="tolerating_control">
                I tolerate controlling or disrespectful behavior longer than I
                want to
              </option>
              <option value="strong_rebellion">
                I go into strong rebellion or cut‑offs when I feel any control
              </option>
              <option value="minimal_effect">
                I notice some echoes, but it doesn&apos;t drive my relationships
              </option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a situation from childhood that still feels vivid — and, if you want, a moment where you noticed the same pattern in an adult relationship..."
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

        {result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2 style={sectionTitleStyle}>
              Overall hyper‑control level: {result.overall_hypercontrol_level}
            </h2>

            <p style={{ marginBottom: 24, color: "#ccc", fontSize: 16, lineHeight: 1.6 }}>
              {result.summary.split(".")[0]}.
            </p>

            {!emailSubmitted ? (
              <>
                <div style={{ position: "relative", marginBottom: 24 }}>
                  <div style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none", opacity: 0.6 }}>
                    <h3 style={sectionTitleStyle}>Indices</h3>
                    {["Parental Control Intensity", "Autonomy Restriction Level", "Privacy Invasion Score", "Guilt/Shame Pressure Index", "Current Relationship Echo Score"].map((name, i) => (
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
                        testName="Hyper-Controlling Parent Pattern"
                        resultLevel={result.overall_hypercontrol_level}
                        onSuccess={() => {
                          setEmailSubmitted(true);
                          localStorage.setItem("email_submitted_hyper_parent", "true");
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
                  <strong>Parental Control Intensity: {result.indices.parental_control_intensity}</strong>
                  <br />
                  Measures how tightly decisions, daily life, and your path were controlled. 0 = mostly supportive guidance, 1 = heavy control over most areas of life.
                </p>
                <p>
                  <strong>Autonomy Restriction Level: {result.indices.autonomy_restriction_level}</strong>
                  <br />
                  Reflects how much freedom you had to choose friends, hobbies, clothes, and schedule. 0 = plenty of room to experiment, 1 = very little real choice.
                </p>
                <p>
                  <strong>Privacy Invasion Score: {result.indices.privacy_invasion_score}</strong>
                  <br />
                  Shows how often your physical and psychological privacy was crossed. 0 = privacy mostly respected, 1 = regular checking, reading, or bursting in.
                </p>
                <p>
                  <strong>Guilt/Shame Pressure Index: {result.indices.guilt_shame_pressure_index}</strong>
                  <br />
                  Estimates how much guilt, shame, or threats were used to keep you in line. 0 = rare and mild, 1 = strong, frequent emotional pressure.
                </p>
                <p>
                  <strong>Current Relationship Echo Score: {result.indices.current_relationship_echo_score}</strong>
                  <br />
                  Shows how strongly this pattern is likely to replay in your adult relationships. 0 = almost no carry‑over, 1 = strong echo.
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
                <h3 style={{ margin: "0 0 12px 0", color: "#4ade80" }}>✅ Low impact detected</h3>
                <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
                  The pattern shows low intensity and minimal echo in current relationships.<br />
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
                  {hyperParentProtocols[protocolTier]?.title || "Protocol"}
                </h2>

                <ProtocolEmailCapture
                  protocolScope="hyper-controlling-parent"
                  protocolTier={protocolTier}
                  protocolTitle={hyperParentProtocols[protocolTier]?.title}
                />
                
                <div style={{
                  fontSize: "15.2px", lineHeight: "1.75", color: "#ddd",
                  background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: 10,
                }}>
                  {hyperParentProtocols[protocolTier] && (() => {
                    const p = hyperParentProtocols[protocolTier];
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
                    const p = hyperParentProtocols[protocolTier];
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
