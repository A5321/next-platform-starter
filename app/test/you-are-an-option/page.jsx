"use client";

import { useEffect, useRef, useState } from "react";
import { youAreAnOptionProtocols } from "@/lib/protocols/youAreAnOption"; // ← добавь импорт
import { getProtocolTier } from "@/lib/protocolTiers"; // ← добавь импорт

export default function YouAreOptionTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null); // ← новый стейт

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

    // Определяем tier сразу после анализа
    if (data) {
      const tier = getProtocolTier("you-are-an-option", data);
      setProtocolTier(tier);
    }

    setLoading(false);
  }

  // PayPal
  useEffect(() => {
    if (!result || !protocolTier) return;
    if (typeof window === "undefined" || !window.paypal) return;
    if (!paypalSingleRef.current || paypalRenderedRef.current) return;

    paypalRenderedRef.current = true;

    window.paypal
      .Buttons({
        style: { layout: "vertical", shape: "rect", label: "paypal", height: 42 },
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
            if (!res.ok || !json.success) throw new Error(json.error || "Payment failed");

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
  }, [result, protocolTier]);

  // Получаем нужный протокол из библиотеки
  const currentProtocol = protocolTier && youAreAnOptionProtocols[protocolTier];

  const copyProtocol = async () => {
    if (!currentProtocol) return;

    // Формируем красивый текст для копирования (можно улучшить позже)
    let protocolText = `"${currentProtocol.title}"\n\n`;
    protocolText += `${currentProtocol.subtitle}\n\n`;
    protocolText += `${currentProtocol.intro}\n\n`;

    currentProtocol.blocks.forEach((block, index) => {
      protocolText += `${block.title}\n`;
      protocolText += `Goal: ${block.goal}\n`;
      if (block.when) protocolText += `When: ${block.when}\n`;
      protocolText += "\n";

      if (block.items) {
        block.items.forEach((item) => {
          protocolText += `• ${item}\n`;
        });
      }
      protocolText += "\n";
    });

    if (currentProtocol.closing) {
      protocolText += currentProtocol.closing;
    }

    try {
      await navigator.clipboard.writeText(protocolText);
      alert(`✅ "${currentProtocol.title}" скопирован в буфер обмена!`);
    } catch (err) {
      alert("Не удалось скопировать. Выделите текст вручную.");
    }
  };

  // ... (стили pageStyle, cardStyle и т.д. остаются без изменений)

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* Header и форма — без изменений */}

        {result && (
          <section style={{ marginTop: 32, lineHeight: 1.5 }}>
            <h2>Status: {result.overall_option_status}</h2>

            <h3>Indices</h3>
            {/* ... все индексы без изменений */}

            <h3>Summary</h3>
            <p style={{ marginBottom: 24 }}>{result.summary}</p>

            {!paid ? (
              <div style={{ marginTop: 16, padding: 16, border: "1px solid rgba(255,255,255,0.16)", borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
                <p style={{ marginBottom: 12 }}>
                  Get full protocol access — $3
                  {protocolTier && ` (${protocolTier === "hard" ? "Wall Protocol" : "Stabilization Protocol"})`}
                </p>

                <div style={{ marginBottom: 10 }}>
                  <div ref={paypalSingleRef} />
                </div>

                {paying && <p>Processing payment...</p>}
                {payError && <p style={{ color: "#ff8c8c" }}>{payError}</p>}
              </div>
            ) : (
              <div style={{ marginTop: 30 }}>
                <h2 style={{ marginBottom: 16, color: "#fff" }}>
                  {currentProtocol?.title || "Protocol"}
                </h2>

                <div style={{ fontSize: "15.2px", lineHeight: "1.75", color: "#ddd", whiteSpace: "pre-wrap" }}>
                  {currentProtocol ? (
                    <>
                      <p><strong>{currentProtocol.subtitle}</strong></p>
                      <p>{currentProtocol.intro}</p>

                      {currentProtocol.blocks.map((block, idx) => (
                        <div key={idx} style={{ marginTop: 24 }}>
                          <h3>{block.title}</h3>
                          <p><strong>Goal:</strong> {block.goal}</p>
                          {block.when && <p><strong>When:</strong> {block.when}</p>}
                          
                          {block.items && (
                            <ul style={{ paddingLeft: 20 }}>
                              {block.items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          )}

                          {block.why && (
                            <div style={{ marginTop: 12 }}>
                              <strong>Why:</strong>
                              <ul style={{ paddingLeft: 20 }}>
                                {block.why.map((w, i) => <li key={i}>{w}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}

                      {currentProtocol.closing && (
                        <p style={{ marginTop: 32, fontStyle: "italic" }}>{currentProtocol.closing}</p>
                      )}
                    </>
                  ) : (
                    <p>Protocol not found.</p>
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
                  Save it and practice daily.
                </p>
              </div>
            )}

            <p style={{ marginTop: 40, fontSize: 12, opacity: 0.7 }}>
              This tool is not therapy, medical care, or legal advice...
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
