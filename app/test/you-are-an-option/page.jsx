"use client";

import { useEffect, useRef, useState } from "react";

// Правильные относительные импорты (от app/test/you-are-an-option/ до lib/)
import { youAreAnOptionProtocols } from "../../../lib/protocols/youAreAnOption";
import { getProtocolTier } from "../../../lib/protocolTiers";
import EmailCapture from "../../../components/EmailCapture";

export default function YouAreOptionTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null);

  const [email, setEmail] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  const paypalSingleRef = useRef(null);
  const emailRef = useRef("");
  const paypalRenderedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const paidLocal = localStorage.getItem("paid_you_are_an_option");
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";

    if (isPaid) {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_you_are_an_option");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("you-are-an-option", parsed);
        setProtocolTier(tier);
      }
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setPaid(false);
    setProtocolTier(null);
    setPayError("");

    const formData = new FormData(e.currentTarget);

    const initiation = formData.get("initiation");
    const consistency = formData.get("consistency");
    const planning = formData.get("planning");
    const priority = formData.get("priority");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "you_are_an_option",
        answers: { initiation, consistency, planning, priority },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_you_are_an_option", JSON.stringify(data));

    if (data) {
      const tier = getProtocolTier("you-are-an-option", data);
      setProtocolTier(tier);
    }

    setLoading(false);
  }

// PayPal рендер — исправленная версия
useEffect(() => {
  if (!result || !protocolTier) return;
  if (typeof window === "undefined" || !window.paypal) return;
  if (!paypalSingleRef.current) return;

  // Важно: сбрасываем флаг при каждом новом результате
  // чтобы кнопка перерисовывалась после нового анализа
  paypalRenderedRef.current = false;

  // Удаляем старые кнопки, если они есть (чтобы не дублировались)
  paypalRenderedRef.current = false;   // ← добавь эту строку в начало useEffect
  if (paypalSingleRef.current.hasChildNodes()) {
    paypalSingleRef.current.innerHTML = "";
  }

  window.paypal
    .Buttons({
      style: {
        layout: "vertical",
        shape: "rect",
        label: "paypal",
        height: 42,
      },
      createOrder: async (_, actions) => {
        setPayError("");
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: "3.00", currency_code: "USD" },
              custom_id: "you-are-option-single",
              description: `You Are An Option — ${protocolTier === "hard" ? "Wall" : "Stabilization"} Protocol`,
            },
          ],
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
              scope: "you-are-an-option",
              email: emailRef.current?.trim() || "user@paypal.com",
            }),
          });

          const json = await res.json();
          if (!res.ok || !json.success) {
            throw new Error(json.error || "Payment confirmation failed");
          }

          localStorage.setItem("paid_you_are_an_option", "true");
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
}, [result, protocolTier]);   // зависимости оставляем

  const currentProtocol = protocolTier && youAreAnOptionProtocols?.[protocolTier];

  const copyProtocol = async () => {
    if (!currentProtocol) return;

    let protocolText = `"${currentProtocol.title}"\n\n${currentProtocol.subtitle}\n\n${currentProtocol.intro}\n\n`;

    currentProtocol.blocks.forEach((block) => {
      protocolText += `${block.title}\nGoal: ${block.goal}\n`;
      if (block.when) protocolText += `When: ${block.when}\n\n`;
      if (block.items) {
        block.items.forEach((item) => protocolText += `• ${item}\n`);
      }
      protocolText += "\n";
    });

    if (currentProtocol.closing) protocolText += currentProtocol.closing;

    try {
      await navigator.clipboard.writeText(protocolText);
      alert(`✅ ${currentProtocol.title} скопирован!`);
    } catch {
      alert("Не удалось скопировать. Выделите текст вручную.");
    }
  };

  // === Стили (обязательно определяем здесь) ===
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
    backgroundColor: "#000000",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
  };

  const labelStyle = { display: "block", marginBottom: 8, fontWeight: 500 };
  const controlStyle = {
    width: "100%",
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
          <a href="/" style={{ display: "inline-block", marginBottom: 12, color: "#ffffff", textDecoration: "none", opacity: 0.7, fontSize: 14 }}>
            ← Back to home
          </a>
          <h1 style={{ margin: 0, fontSize: 32 }}>Are you just an option?</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Check if you are a priority — or just kept around when convenient.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>How often do they initiate contact or make plans?</label>
            <select name="initiation" style={controlStyle}>
              <option value="rarely">Rarely</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
              <option value="very_often">Very often</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>How consistent is their attention and communication?</label>
            <select name="consistency" style={controlStyle}>
              <option value="very_inconsistent">Very inconsistent</option>
              <option value="somewhat_inconsistent">Somewhat inconsistent</option>
              <option value="mostly_consistent">Mostly consistent</option>
              <option value="very_consistent">Very consistent</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>How often do plans get cancelled, postponed, or stay vague?</label>
            <select name="planning" style={controlStyle}>
              <option value="very_often">Very often</option>
              <option value="often">Often</option>
              <option value="sometimes">Sometimes</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Do you feel like a priority or more like a backup option?</label>
            <select name="priority" style={controlStyle}>
              <option value="clearly_backup">Clearly a backup</option>
              <option value="leaning_backup">Leaning backup</option>
              <option value="unclear">Unclear</option>
              <option value="mostly_priority">Mostly a priority</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a recent situation that feels typical for this dynamic..."
            />
          </div>

          <div>
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
    <h2 style={sectionTitleStyle}>Status: {result.overall_option_status}</h2>

    <h3 style={sectionTitleStyle}>Indices</h3>
    <p><strong>Priority Position Index: {result.indices.priority_position_index}</strong>
      <br />
      Measures how consistently you are treated as a priority rather than a fallback option.
    </p>
    <p><strong>Attention Consistency Score: {result.indices.attention_consistency_score}</strong>
      <br />
      Measures how stable and reliable their attention and communication are over time.
    </p>
    <p><strong>Cancellation Rate: {result.indices.cancellation_rate}</strong>
      <br />
      Estimates how often plans are cancelled, postponed, or kept deliberately vague.
    </p>
    <p><strong>Emotional Uncertainty Load: {result.indices.emotional_uncertainty_load}</strong>
      <br />
      Measures how much emotional ambiguity and unpredictability you are carrying in this dynamic.
    </p>
    <p><strong>Option Trap Risk: {result.indices.option_trap_risk}</strong>
      <br />
      Estimates the likelihood that the current pattern will continue without leading to real commitment.
    </p>

    <h3 style={sectionTitleStyle}>Summary</h3>
    <p style={{ marginBottom: 24 }}>{result.summary}</p>

    <EmailCapture 
      testName="Current Relationship Checkup" 
      resultLevel={result.overall_risk_level} 
    />

    {protocolTier === "none" ? (
      <div style={{ 
        marginTop: 24, 
        padding: 24, 
        border: "1px solid #4ade80", 
        borderRadius: 12, 
        background: "rgba(16, 185, 129, 0.1)",
        color: "#86efac"
      }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#4ade80" }}>✅ Good news</h3>
        <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
          Your case looks stable.<br />
          You’re not stuck in the “option zone”.
        </p>
        <p style={{ marginTop: 12, opacity: 0.95 }}>
          No protocol needed — just keep doing what you’re doing and enjoy the relationship.
        </p>
      </div>
    ) : !paid ? (
      <div style={{ marginTop: 16, padding: 16, border: "1px solid rgba(255,255,255,0.16)", borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
        <p style={{ marginBottom: 12, fontWeight: 600 }}>
          Recommended: <strong>
            {protocolTier === "hard" ? "Wall Protocol (Hard)" : "Stabilization Protocol (Soft)"}
          </strong> — $3
        </p>

        <div style={{ minHeight: "50px" }} ref={paypalSingleRef} />

        {paying && <p style={{ marginTop: 12 }}>Processing payment...</p>}
        {payError && <p style={{ marginTop: 12, color: "#ff8c8c" }}>{payError}</p>}
      </div>
    ) : (
      // ← Здесь показываем протокол после оплаты
      <div style={{ marginTop: 30 }}>
        <h2 style={{ marginBottom: 16, color: "#fff" }}>
          {currentProtocol?.title || "Protocol"}
        </h2>

        <div style={{ 
          fontSize: "15.2px", 
          lineHeight: "1.75", 
          color: "#ddd", 
          whiteSpace: "pre-wrap",
          background: "rgba(255,255,255,0.03)",
          padding: "20px",
          borderRadius: 10
        }}>
          {currentProtocol ? (
            <>
              <p><strong>{currentProtocol.subtitle}</strong></p>
              <p style={{ marginTop: 16, marginBottom: 24 }}>{currentProtocol.intro}</p>

              {currentProtocol.blocks.map((block, idx) => (
                <div key={idx} style={{ marginTop: 32 }}>
                  <h3 style={{ color: "#fff", marginBottom: 12, fontSize: "18px" }}>{block.title}</h3>
        
                  {block.goal && (
                    <p><strong>Goal:</strong> {block.goal}</p>
                  )}
                  {block.when && (
                    <p><strong>When:</strong> {block.when}</p>
                  )}

                  {block.items && (
                    <div style={{ marginTop: 16 }}>
                      {block.items.map((item, i) => {
                        if (item.type === "subheader") {
                          return (
                            <div key={i} style={{ marginTop: 14, marginBottom: 4, fontWeight: 600, color: "#fff" }}>
                              {item.text}
                            </div>
                          );
                        }
                        if (item.type === "sub") {
                          return (
                            <div key={i} style={{ paddingLeft: 20, marginBottom: 6, color: "#ccc" }}>
                              {"— " + item.text}
                            </div>
                          );
                        }
                        if (item.type === "quote") {
                          return (
                            <div key={i} style={{
                              margin: "10px 0",
                              padding: "10px 16px",
                              borderLeft: "3px solid rgba(255,255,255,0.3)",
                              color: "#ddd",
                              fontStyle: "italic",
                              lineHeight: 1.6,
                            }}>
                              {item.text}
                            </div>
                          );
                        }
                        // type === "text" (default)
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

              {currentProtocol.closing && (
                <p style={{ 
                  marginTop: 40, 
                  padding: "16px 20px", 
                  background: "rgba(255,255,255,0.05)", 
                  borderLeft: "4px solid #4ade80",
                  fontStyle: "italic",
                  color: "#ccc",
                  lineHeight: 1.6
                }}>
                  {currentProtocol.closing}
                </p>
              )}
            </>
          ) : (
            <p>Protocol not found. Please contact support.</p>
          )}
        </div>

        <button
          onClick={copyProtocol}
          style={{
            marginTop: 32,
            padding: "14px 24px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#ffffff",
            color: "#000",
            fontWeight: 600,
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          📋 Copy full protocol to clipboard
        </button>

        <p style={{ marginTop: 16, fontSize: 13, opacity: 0.75, textAlign: "center" }}>
          Save it and practice daily for the next 30 days.
        </p>
      </div>
    )}

    <p style={{ marginTop: 40, fontSize: 12, opacity: 0.7 }}>
      This tool is not therapy, medical care, or legal advice. You are fully responsible for any decisions or actions you take.
    </p>
  </section>
)}

      </div>
    </div>
  );
}
