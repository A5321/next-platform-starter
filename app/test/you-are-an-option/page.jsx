"use client";

import { useEffect, useRef, useState } from "react";

// Правильные относительные импорты (от app/test/you-are-an-option/ до lib/)
import { youAreAnOptionProtocols } from "../../../lib/protocols/youAreAnOption";
import { getProtocolTier } from "../../../lib/protocolTiers";

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

          setPaid(true);
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
            <p><strong>Priority Position Index:</strong> {result.indices.priority_position_index}</p>
            <p><strong>Attention Consistency Score:</strong> {result.indices.attention_consistency_score}</p>
            <p><strong>Cancellation Rate:</strong> {result.indices.cancellation_rate}</p>
            <p><strong>Emotional Uncertainty Load:</strong> {result.indices.emotional_uncertainty_load}</p>
            <p><strong>Option Trap Risk:</strong> {result.indices.option_trap_risk}</p>

<h3 style={sectionTitleStyle}>Summary</h3>
<p style={{ marginBottom: 24 }}>{result.summary}</p>

{protocolTier === "none" ? (
  <div style={{ 
    marginTop: 24, 
    padding: 24, 
    border: "1px solid rgba(74, 222, 128, 0.4)", 
    borderRadius: 12, 
    background: "rgba(74, 222, 128, 0.08)",
    color: "#86efac",
    lineHeight: 1.6
  }}>
    <p style={{ fontSize: "18px", marginBottom: 8 }}>
      ✅ <strong>Your situation looks pretty stable.</strong>
    </p>
    <p>
      This is a healthy middle ground — not perfect, but far from being treated as an option.<br />
      You don’t need any special protocol right now.
    </p>
    <p style={{ marginTop: 16, opacity: 0.9 }}>
      Keep communicating openly and enjoy the connection as it is.
    </p>
  </div>
) : (
  // ... блок оплаты остаётся без изменений
) : (
  <div style={{ marginTop: 16, padding: 16, border: "1px solid rgba(255,255,255,0.16)", borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
    <p style={{ marginBottom: 12, fontWeight: 600 }}>
      Recommended: <strong>
        {protocolTier === "hard" ? "Wall Protocol (Hard)" : "Stabilization Protocol (Soft)"}
      </strong> — $3
    </p>

    <div style={{ marginBottom: 10 }}>
      <div ref={paypalSingleRef} />
    </div>

    {paying && <p style={{ marginTop: 12 }}>Processing payment...</p>}
    {payError && <p style={{ marginTop: 12, color: "#ff8c8c" }}>{payError}</p>}
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
