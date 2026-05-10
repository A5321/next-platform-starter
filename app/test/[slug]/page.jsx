"use client";

import { useState, useEffect, useRef } from "react";
import { getTestBySlug } from "../../lib/testsData";
import { getProtocolTier } from "../../lib/protocolTiers";
import EmailCapture from "../../components/EmailCapture";
import ProtocolEmailCapture from "../../../components/ProtocolEmailCapture";

// Static protocol loaders instead of dynamic import
const protocolLoaders = {
  "current-relationship": () => import("../../../lib/protocols/currentRelationship").then(m => m.currentRelationshipProtocols),
  "you-are-an-option": () => import("../../../lib/protocols/youAreAnOption").then(m => m.youAreAnOptionProtocols),
  "mixed-signals": () => import("../../../lib/protocols/Mixedsignals").then(m => m.mixedSignalsProtocols), // Изменено название протокола
  "repeating-breakup": () => import("../../../lib/protocols/Repeatingbreakup").then(m => m.repeatingBreakupProtocols),  // Изменено название протокола
  "hyper-controlling-parent": () => import("../../../lib/protocols/hyperParent").then(m => m.hyperControllingParentProtocols), // Изменено название протокола
  "third-person-grey-zone": () => import("../../../lib/protocols/Thirdperson").then(m => m.thirdPersonGreyZoneProtocols), // Изменено название протокола
  "trust-their-signals": () => import("../../../lib/protocols/trustSignals").then(m => m.trustTheirSignalsProtocols), // Изменено название протокола
  "after-breach-of-trust": () => import("../../../lib/protocols/afterBreach").then(m => m.afterBreachOfTrustProtocols), // Изменено название протокола
  "silent-exit": () => import("../../../lib/protocols/silentExit").then(m => m.silentExitProtocols),
};

export default function DynamicTestPage({ params }) {
  const testSlug = params.slug;
  const testData = getTestBySlug(testSlug);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null);
  const [protocols, setProtocols] = useState(null);

  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const paypalSingleRef = useRef(null);
  const paypalRenderedRef = useRef(false);

  // Load protocols using static map
  useEffect(() => {
    if (!testData) return;
    
    async function loadProtocols() {
      try {
        const loader = protocolLoaders[testData.protocolScope];
        if (loader) {
          const protocolData = await loader();
          setProtocols(protocolData);
        }
      } catch (err) {
        console.error("Failed to load protocols:", err);
      }
    }
    
    loadProtocols();
  }, [testData]);

  // Check payment status on mount
  useEffect(() => {
    if (!testData) return;

    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const paidLocal = localStorage.getItem(`paid_${testSlug}`);
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";

    const emailLocal = localStorage.getItem(`email_submitted_${testSlug}`);
    if (emailLocal === "true") setEmailSubmitted(true);

    if (isPaid) {
      setPaid(true);
    }
  }, [testSlug, testData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setPaid(false);
    setProtocolTier(null);
    setPayError("");
    setEmailSubmitted(false);
    paypalRenderedRef.current = false;
    localStorage.removeItem(`paid_${testSlug}`);
    localStorage.removeItem(`email_submitted_${testSlug}`);

    const formData = new FormData(e.currentTarget);

    const answers = {};
    testData.questions.forEach(q => {
      answers[q.name] = formData.get(q.name);
    });

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: testData.scenario,
        answers,
        narrative: testData.hasNarrative ? formData.get("narrative") : undefined,
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem(`lastResult_${testSlug}`, JSON.stringify(data));

    const tier = getProtocolTier(testData.protocolScope, data);
    setProtocolTier(tier);

    setLoading(false);
  }

  // PayPal render
  useEffect(() => {
    if (!result || !protocolTier || protocolTier === "none") return;
    if (paid) return;
    if (typeof window === "undefined" || !window.paypal) return;
    if (!paypalSingleRef.current) return;
    if (!protocols) return;

    paypalRenderedRef.current = false;
    if (paypalSingleRef.current.hasChildNodes()) {
      paypalSingleRef.current.innerHTML = "";
    }

    const currentProtocol = protocols[protocolTier];
    if (!currentProtocol) return;

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
                amount: { value: "15.00", currency_code: "USD" },
                custom_id: `${testSlug}-single`,
                description: currentProtocol.paypalDescription || currentProtocol.productName,
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
                scope: testSlug,
                email: "user@paypal.com",
              }),
            });

            const json = await res.json();
            if (!res.ok || !json.success) {
              throw new Error(json.error || "Payment confirmation failed");
            }

            localStorage.setItem(`paid_${testSlug}`, "true");
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
  }, [result, protocolTier, paid, protocols, testSlug]);

  const currentProtocol =
    protocolTier && protocolTier !== "none" && protocols
      ? protocols[protocolTier]
      : null;

  const copyProtocol = async () => {
    if (!currentProtocol) return;

    let text = `"${currentProtocol.title}"\n\n${currentProtocol.subtitle}\n\n${currentProtocol.intro}\n\n`;

    currentProtocol.blocks.forEach((block) => {
      text += `${block.title}\nGoal: ${block.goal}\n`;
      if (block.when) text += `When: ${block.when}\n\n`;
      if (block.items) block.items.forEach((item) => {
        const itemText = typeof item === 'string' ? item : item.text;
        text += `• ${itemText}\n`;
      });
      if (block.why) block.why.forEach((w) => (text += `  → ${w}\n`));
      text += "\n";
    });

    if (currentProtocol.closing) text += currentProtocol.closing;

    try {
      await navigator.clipboard.writeText(text);
      alert(`✅ ${currentProtocol.title} copied!`);
    } catch {
      alert("Could not copy. Please select the text manually.");
    }
  };

  if (!testData) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ textAlign: "center" }}>
          <h1>Test not found</h1>
          <p>The test &quot;{testSlug}&quot; does not exist.</p>
          <a href="/" style={{ color: "#1565C0", textDecoration: "none" }}>Back to home</a>
        </div>
      </div>
    );
  }

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px 16px",
    background: "#ffffff",
  };

  const cardStyle = {
    maxWidth: 900,
    width: "100%",
    backgroundColor: "#fafbfc",
    color: "#1a1a1a",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    border: "1px solid rgba(0,0,0,0.08)",
  };

  const labelStyle = { display: "block", marginBottom: 8, fontWeight: 500 };
  const controlStyle = {
    width: "100%",
    maxWidth: 900,
    boxSizing: "border-box",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.2)",
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
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
              color: "#1565C0",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Back to home
          </a>
          <h1 style={{ margin: "0 0 8px 0", fontSize: 28, fontWeight: 700 }}>
            {testData.title}
          </h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: 16, lineHeight: 1.5 }}>
            {testData.description}
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          {testData.questions.map((question, idx) => (
            <div key={question.name} style={{ marginBottom: 24 }}>
              <label htmlFor={question.name} style={labelStyle}>
                {idx + 1}. {question.label}
              </label>
              <select
                id={question.name}
                name={question.name}
                required
                style={controlStyle}
              >
                <option value="">— Select —</option>
                {question.options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {testData.hasNarrative && (
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="narrative" style={labelStyle}>
                {testData.narrativeLabel}
              </label>
              <textarea
                id="narrative"
                name="narrative"
                rows={5}
                placeholder={testData.narrativePlaceholder}
                style={{
                  ...controlStyle,
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 8,
              border: "none",
              backgroundColor: loading ? "#94a3b8" : "#1565C0",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: 16,
              cursor: loading ? "default" : "pointer",
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {result && (
          <section style={{ marginTop: 32 }}>
            <h2 style={{ marginBottom: 16 }}>Your Result</h2>

            <div
              style={{
                padding: 20,
                background: "#f0f9ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                marginBottom: 16,
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: 18, color: "#1e40af" }}>
                Overall Assessment
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                {result.overall || result.summary || "Assessment complete."}
              </p>
            </div>

            {result.summary && (
              <div style={{ marginBottom: 16 }}>
                <h3 style={sectionTitleStyle}>Summary</h3>
                <div
                  style={{
                    padding: 20,
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 10,
                    position: "relative",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                    {result.summary.split('\n')[0]}
                  </p>

                  {!emailSubmitted && result.summary.split('\n').length > 1 && (
                    <div
                      style={{
                        marginTop: 12,
                        filter: "blur(6px)",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                        {result.summary.split('\n').slice(1).join('\n')}
                      </p>
                    </div>
                  )}

                  {emailSubmitted && result.summary.split('\n').length > 1 && (
                    <div style={{ marginTop: 12 }}>
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                        {result.summary.split('\n').slice(1).join('\n')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!emailSubmitted && (
              <EmailCapture
                testName={testData.title}
                resultLevel={protocolTier || "analysis"}
                onSuccess={() => {
                  setEmailSubmitted(true);
                  localStorage.setItem(`email_submitted_${testSlug}`, "true");
                }}
              />
            )}

            {protocolTier === "none" ? (
              <div
                style={{
                  marginTop: 24,
                  padding: 24,
                  border: "1px solid #10b981",
                  borderRadius: 12,
                  background: "#f0fdf4",
                  color: "#065f46",
                }}
              >
                <h3 style={{ margin: "0 0 12px 0", color: "#10b981" }}>Good news</h3>
                <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
                  Your dynamic looks stable.
                  <br />
                  No significant patterns of concern detected.
                </p>
                <p style={{ marginTop: 12 }}>
                  No protocol needed — keep doing what you&apos;re doing.
                </p>
              </div>
            ) : !paid ? (
              <div
                style={{
                  marginTop: 16,
                  padding: 16,
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 10,
                  background: "#f7f8fa",
                }}
              >
                <p style={{ marginBottom: 12, fontWeight: 600 }}>
                  Recommended:{" "}
                  <strong>
                    {currentProtocol?.title || 
                      (protocolTier === "hard" ? "Exit Protocol (Hard)" : "Stabilization Protocol (Soft)")}
                  </strong>{" "}
                  — $15
                </p>

                <div style={{ minHeight: "50px" }} ref={paypalSingleRef} />

                {paying && <p style={{ marginTop: 12 }}>Processing payment...</p>}
                {payError && (
                  <p style={{ marginTop: 12, color: "#ff8c8c" }}>{payError}</p>
                )}
              </div>
            ) : (
              <div style={{ marginTop: 30 }}>
                <h2 style={{ marginBottom: 16, color: "#1a1a1a" }}>
                  {currentProtocol?.title || "Protocol"}
                </h2>

                <ProtocolEmailCapture
                  protocolScope={testData.protocolScope}
                  protocolTier={protocolTier}
                  protocolTitle={currentProtocol?.title}
                />

                <div
                  style={{
                    fontSize: "15.2px",
                    lineHeight: "1.75",
                    color: "#1a1a1a",
                    whiteSpace: "pre-wrap",
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {currentProtocol ? (
                    <>
                      <p>
                        <strong>{currentProtocol.subtitle}</strong>
                      </p>
                      <p style={{ marginTop: 16, marginBottom: 24 }}>
                        {currentProtocol.intro}
                      </p>

                      {currentProtocol.blocks.map((block, idx) => (
                        <div key={idx} style={{ marginTop: 32 }}>
                          <h3
                            style={{
                              color: "#1a1a1a",
                              marginBottom: 12,
                              fontSize: "18px",
                            }}
                          >
                            {block.title}
                          </h3>

                          {block.goal && (
                            <p>
                              <strong>Goal:</strong> {block.goal}
                            </p>
                          )}
                          {block.when && (
                            <p>
                              <strong>When:</strong> {block.when}
                            </p>
                          )}

                          {block.items && (
                            <div style={{ marginTop: 16 }}>
                              {block.items.map((item, i) => {
                                if (item.type === "subheader") {
                                  return (
                                    <div key={i} style={{ marginTop: 14, marginBottom: 4, fontWeight: 600, color: "#1a1a1a" }}>
                                      {item.text}
                                    </div>
                                  );
                                }
                                if (item.type === "sub") {
                                  return (
                                    <div key={i} style={{ paddingLeft: 20, marginBottom: 6, color: "#4a5568" }}>
                                      — {item.text}
                                    </div>
                                  );
                                }
                                if (item.type === "quote") {
                                  return (
                                    <div key={i} style={{
                                      margin: "10px 0",
                                      padding: "10px 16px",
                                      borderLeft: "3px solid #1565C0",
                                      color: "#4a5568",
                                      fontStyle: "italic",
                                      lineHeight: 1.6,
                                      background: "#f7f8fa",
                                    }}>
                                      {item.text}
                                    </div>
                                  );
                                }
                                return (
                                  <div key={i} style={{ marginBottom: 8, color: "#1a1a1a" }}>
                                    {item.text || item}
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
                                  <li key={i} style={{ marginBottom: 6 }}>
                                    {w}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}

                      {currentProtocol.closing && (
                        <p
                          style={{
                            marginTop: 40,
                            padding: "16px 20px",
                            background: "#f0f9ff",
                            borderLeft: "4px solid #1565C0",
                            fontStyle: "italic",
                            color: "#1a1a1a",
                            lineHeight: 1.6,
                          }}
                        >
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
                    backgroundColor: "#1565C0",
                    color: "#ffffff",
                    fontWeight: 600,
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "16px",
                  }}
                >
                  Copy full protocol to clipboard
                </button>

                <p
                  style={{
                    marginTop: 16,
                    fontSize: 13,
                    color: "#6b7280",
                    textAlign: "center",
                  }}
                >
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
            color: "#6b7280",
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
