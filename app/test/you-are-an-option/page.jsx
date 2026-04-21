"use client";

import { useEffect, useRef, useState } from "react";
import { protocolsByScope } from "@/app/lib/protocols/index";

function getProtocolTier(scope, result) {
  if (!result || !result.indices) return "none";

  if (scope === "you-are-an-option") {
    const optionTrapRisk = Number(result.indices.option_trap_risk || 0);
    const uncertainty = Number(result.indices.emotional_uncertainty_load || 0);
    const consistency = Number(result.indices.attention_consistency_score || 0);

    if (optionTrapRisk >= 70 || uncertainty >= 70 || consistency <= 35) {
      return "hard";
    }

    if (optionTrapRisk >= 45 || uncertainty >= 45 || consistency <= 55) {
      return "soft";
    }

    return "none";
  }

  return "none";
}

export default function YouAreOptionTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

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
        answers: {
          initiation,
          consistency,
          planning,
          priority,
        },
        narrative,
      }),
    });

    const data = await res.json();
    emailRef.current = emailRef.current || "";
    setResult(data);
    setLoading(false);
  }

  const scope = "you-are-an-option";
  const protocolTier = getProtocolTier(scope, result);
  const protocol =
    protocolTier !== "none" ? protocolsByScope[scope]?.[protocolTier] : null;

  // PayPal рендер
  useEffect(() => {
    if (!result) return;
    if (typeof window === "undefined") return;
    if (!window.paypal) return;
    if (!paypalSingleRef.current) return;
    if (paypalRenderedRef.current) return;

    paypalRenderedRef.current = true;

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
                custom_id:
                  protocolTier === "hard"
                    ? "you-are-option-hard-single"
                    : protocolTier === "soft"
                    ? "you-are-option-soft-single"
                    : "you-are-option-single",
                description:
                  protocol?.paypalDescription || "You Are An Option + Protocol access",
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
        email: emailRef.current?.trim() || "user@paypal.com", // минимальный fallback
      }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.error || "Payment confirmation failed");
    }

    setPaid(true);
  } catch (err) {
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
      .render(paypalSingleRef.current);
  }, [result]);

  // Копирование всего протокола в буфер — ТОЧНОЕ СОДЕРЖАНИЕ из документа
  const copyProtocol = async () => {
    if (!protocol) return;

    const lines = [];

    lines.push(`"${protocol.title}"`);
    if (protocol.subtitle) lines.push(protocol.subtitle);
    if (protocol.intro) {
      lines.push("");
      lines.push(protocol.intro);
    }

    protocol.blocks.forEach((block) => {
      lines.push("");
      lines.push(block.title);

      if (block.goal) lines.push(`Goal: ${block.goal}`);
      if (block.when) lines.push(`When: ${block.when}`);

      if (block.items?.length) {
        lines.push("Steps:");
        block.items.forEach((item) => {
          lines.push(`    • ${item}`);
        });
      }

      if (block.why?.length) {
        lines.push("Why:");
        block.why.forEach((item) => {
          lines.push(`    • ${item}`);
        });
      }
    });

    if (protocol.closing) {
      lines.push("");
      lines.push(protocol.closing);
    }

    const protocolText = lines.join("\n");

    try {
      await navigator.clipboard.writeText(protocolText);
      alert(`✅ Full ${protocol.title} copied to clipboard!`);
    } catch (err) {
      alert("Failed to copy. Please select the text manually.");
    }
  };

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
          {/* Все поля формы — оставлены без изменений */}
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

{protocol && !paid && (
  <div style={{ marginTop: 24 }}>
    <h3 style={{ marginBottom: 8 }}>Protocol available</h3>
    <p style={{ marginBottom: 12 }}>
      Your results suggest that a protocol may help here.
      Unlock the full {protocol.title}.
    </p>

    {paying && <p>Processing payment...</p>}
    {payError && (
      <p style={{ color: "#ff8080", marginTop: 8 }}>{payError}</p>
    )}

    <div
      ref={paypalSingleRef}
      style={{ marginTop: 12, marginBottom: 8 }}
    />
  </div>
)}

{protocol && paid && (
  <div style={{ marginTop: 24 }}>
    <h2 style={{ marginBottom: 8 }}>{protocol.title}</h2>

    {protocol.subtitle && (
      <p style={{ marginBottom: 12, opacity: 0.85 }}>
        {protocol.subtitle}
      </p>
    )}

    {protocol.intro && (
      <p style={{ marginBottom: 16 }}>{protocol.intro}</p>
    )}

    {protocol.blocks.map((block) => (
      <section key={block.title} style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 6 }}>{block.title}</h3>

        {block.goal && (
          <p style={{ marginBottom: 4 }}>
            <strong>Goal:</strong> {block.goal}
          </p>
        )}

        {block.when && (
          <p style={{ marginBottom: 6 }}>
            <strong>When:</strong> {block.when}
          </p>
        )}

        {block.items?.length > 0 && (
          <ul style={{ paddingLeft: 20, marginBottom: 6 }}>
            {block.items.map((item) => (
              <li key={item} style={{ marginBottom: 4 }}>
                {item}
              </li>
            ))}
          </ul>
        )}

        {block.why?.length > 0 && (
          <>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              <strong>Why:</strong>
            </p>
            <ul style={{ paddingLeft: 20 }}>
              {block.why.map((item) => (
                <li key={item} style={{ marginBottom: 4 }}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    ))}

    {protocol.closing && (
      <p style={{ marginTop: 8 }}>{protocol.closing}</p>
    )}

    <button
      onClick={copyProtocol}
      style={{
        marginTop: 16,
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.25)",
        backgroundColor: "rgba(255,255,255,0.08)",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Copy full protocol
    </button>
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
