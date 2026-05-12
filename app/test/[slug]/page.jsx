"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getTestBySlug } from "../../lib/testsData";
import { getProtocolTier } from "../../lib/protocolTiers";
import EmailCapture from "../../../components/EmailCapture";
import ProtocolEmailCapture from "../../../components/ProtocolEmailCapture";

// Static protocol loaders instead of dynamic import
const protocolLoaders = {
  "current-relationship": () => import("../../lib/protocols/currentRelationship").then(m => m.currentRelationshipProtocols),
  "you-are-an-option": () => import("../../lib/protocols/youAreAnOption").then(m => m.youAreAnOptionProtocols),
  "mixed-signals": () => import("../../lib/protocols/mixedSignals").then(m => m.mixedSignalsProtocols),
  "repeating-breakup": () => import("../../lib/protocols/repeatingBreakup").then(m => m.repeatingBreakupProtocols),
  "hyper-controlling-parent": () => import("../../lib/protocols/hyperControllingParent").then(m => m.hyperControllingParentProtocols),
  "third-person-grey-zone": () => import("../../lib/protocols/thirdPersonGreyZone").then(m => m.thirdPersonGreyZoneProtocols),
  "trust-their-signals": () => import("../../lib/protocols/trustTheirSignals").then(m => m.trustTheirSignalsProtocols),
  "after-breach-of-trust": () => import("../../lib/protocols/afterBreachOfTrust").then(m => m.afterBreachOfTrustProtocols),
  "silent-exit": () => import("../../lib/protocols/silentExit").then(m => m.silentExitProtocols),
};

export default function DynamicTestPage() {
  const params = useParams();
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
  console.log("useEffect triggered, testData:", testData);
  
  if (!testData) {
    console.log("No testData, returning");
    return;
  }
  
  async function loadProtocols() {
    try {
      console.log("Loading protocols for scope:", testData.protocolScope);
      console.log("Loader found:", !!protocolLoaders[testData.protocolScope]);
      
      const loader = protocolLoaders[testData.protocolScope];
      if (loader) {
        console.log("Calling loader...");
        const protocolData = await loader();
        console.log("Protocol data loaded:", protocolData);
        setProtocols(protocolData);
      } else {
        console.log("No loader found for scope:", testData.protocolScope);
      }
    } catch (err) {
      console.error("Failed to load protocols:", err);
    }
  }
  
  loadProtocols();
}, [testData]);

  // Check payment status on mount
  useEffect(() => {
    if (!testData || !testSlug) return;

    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const paidLocal = localStorage.getItem(`paid_${testSlug}`);
    const isPaid = paidLocal === "true" || access === "one" || access === "sub";

    const emailLocal = localStorage.getItem(`email_submitted_${testSlug}`);
    if (emailLocal === "true") setEmailSubmitted(true);

    // Восстанавливаем result ТОЛЬКО если это возврат с PayPal
    const paypalReturn = localStorage.getItem(`paypal_return_${testSlug}`);
    if (paypalReturn === "true") {
      const savedResult = localStorage.getItem(`lastResult_${testSlug}`);
      if (savedResult) {
        try {
          const parsedResult = JSON.parse(savedResult);
          setResult(parsedResult);
          
          // Определяем protocolTier из результата
          const overallLevel = parsedResult.overall_trust_recovery_level || 
                              parsedResult.overall_option_status || 
                              parsedResult.overall_risk_level || 
                              parsedResult.overall_hypercontrol_level ||
                              parsedResult.overall_triangle_risk ||
                              parsedResult.overall_trust_in_signals ||
                              parsedResult.overall_mixed_signal_level ||
                              parsedResult.overall_exit_pattern_level ||
                              parsedResult.overall_breakup_pattern_intensity;
          
          if (overallLevel) {
            const tier = getProtocolTier(testSlug, overallLevel);
            setProtocolTier(tier);
          }
        } catch (err) {
          console.error("Failed to restore result:", err);
        }
      }
      
      // Удаляем флаг - он нужен только один раз
      localStorage.removeItem(`paypal_return_${testSlug}`);
    }

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
  console.log("=== PayPal useEffect triggered ===");
  console.log("result:", !!result);
  console.log("protocolTier:", protocolTier);
  console.log("paid:", paid);
  console.log("window.paypal:", typeof window !== "undefined" ? !!window.paypal : "window undefined");
  console.log("paypalSingleRef.current:", !!paypalSingleRef.current);
  console.log("protocols:", !!protocols);
  
  if (!result || !protocolTier || protocolTier === "none") {
    console.log("❌ Exiting: no result or tier is none");
    return;
  }
  if (paid) {
    console.log("❌ Exiting: already paid");
    return;
  }
  if (typeof window === "undefined" || !window.paypal) {
    console.log("❌ Exiting: PayPal SDK not loaded");
    return;
  }
  if (!paypalSingleRef.current) {
    console.log("❌ Exiting: ref not ready");
    return;
  }
  if (!protocols) {
    console.log("❌ Exiting: protocols not loaded");
    return;
  }

  console.log("✅ All checks passed, rendering PayPal...");

  paypalRenderedRef.current = false;
  if (paypalSingleRef.current.hasChildNodes()) {
    paypalSingleRef.current.innerHTML = "";
  }

  const currentProtocol = protocols[protocolTier];
  if (!currentProtocol) {
    console.log("❌ No protocol found for tier:", protocolTier);
    return;
  }

  console.log("📦 Protocol found:", currentProtocol.title);

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

          // Сохраняем result перед reload И ставим флаг что это возврат с PayPal
          if (result) {
            localStorage.setItem(`lastResult_${testSlug}`, JSON.stringify(result));
            localStorage.setItem(`paypal_return_${testSlug}`, "true");
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
    .then(() => {
      console.log("✅ PayPal buttons rendered successfully");
    })
    .catch((err) => {
      console.error("❌ PayPal render error:", err);
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
    background: "#ffffff",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "24px 16px 64px",
    boxSizing: "border-box",
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "44px",
  };

  const cardStyle = {
    width: "100%",
    backgroundColor: "#fafbfc",
    color: "#1a1a1a",
    borderRadius: 20,
    padding: 32,
    border: "1px solid rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  };

  const headerStyle = {
    marginBottom: 32,
  };

  const labelStyle = { display: "block", marginBottom: 8, fontWeight: 500 };
  const controlStyle = {
    width: "100%",
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
      <div style={containerStyle}>
        {/* Навигация НАД карточкой */}
        <nav style={navStyle}>
          <Link 
            href="/" 
            style={{ 
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <img 
              src="/logo.png" 
              alt="Pattern Index" 
              style={{ 
                width: "32px",
                height: "32px",
                display: "block"
              }} 
            />
            <span style={{
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#1565C0"
            }}>
              PATTERN INDEX
            </span>
          </Link>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link 
              href="/tests" 
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "14px",
                padding: "10px 14px",
                border: "1px solid #1565C0",
                background: "#1565C0",
                borderRadius: "999px"
              }}
            >
              TESTS
            </Link>
            <Link 
              href="/articles" 
              style={{
                color: "#4a5568",
                textDecoration: "none",
                fontSize: "14px",
                padding: "10px 14px",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "999px"
              }}
            >
              ARTICLES
            </Link>
          </div>
        </nav>

        {/* Карточка теста */}
        <div style={cardStyle}>
          <header style={headerStyle}>
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
          <section style={{ marginTop: 32, position: "relative" }}>
            <h2 style={{ marginBottom: 16 }}>Your Result</h2>

            {/* Заголовок уровня + только ПЕРВОЕ предложение summary */}
            <div
              style={{
                padding: 20,
                background: "#f0f9ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                marginBottom: 16,
              }}
            >
              <h3 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#1e40af" }}>
                {result.overall_trust_recovery_level && `Trust-recovery level: ${result.overall_trust_recovery_level}`}
                {result.overall_option_status && `Option status: ${result.overall_option_status}`}
                {result.overall_risk_level && `Risk level: ${result.overall_risk_level}`}
                {result.overall_hypercontrol_level && `Hypercontrol level: ${result.overall_hypercontrol_level}`}
                {result.overall_triangle_risk && `Triangle risk: ${result.overall_triangle_risk}`}
                {result.overall_trust_in_signals && `Trust in signals: ${result.overall_trust_in_signals}`}
                {result.overall_mixed_signal_level && `Mixed signal level: ${result.overall_mixed_signal_level}`}
                {result.overall_exit_pattern_level && `Silent-exit level: ${result.overall_exit_pattern_level}`}
                {result.overall_breakup_pattern_intensity && `Breakup pattern intensity: ${result.overall_breakup_pattern_intensity}`}
                {!result.overall_trust_recovery_level && 
                 !result.overall_option_status && 
                 !result.overall_risk_level && 
                 !result.overall_hypercontrol_level &&
                 !result.overall_triangle_risk &&
                 !result.overall_trust_in_signals &&
                 !result.overall_mixed_signal_level &&
                 !result.overall_exit_pattern_level &&
                 !result.overall_breakup_pattern_intensity && 
                 "Overall Assessment"}
              </h3>
              
              {/* ТОЛЬКО первое предложение summary */}
              {result.summary && (
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                  {result.summary.split('. ')[0] + '.'}
                </p>
              )}
            </div>

            {/* Индексы - заблюрены до email */}
            {result.indices && (
              <div
                style={{
                  marginBottom: 16,
                  filter: !emailSubmitted ? "blur(6px)" : "none",
                  userSelect: !emailSubmitted ? "none" : "auto",
                  pointerEvents: !emailSubmitted ? "none" : "auto",
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16 }}>Pattern Indices</h3>
                <div
                  style={{
                    padding: 20,
                    background: "#fafbfc",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 10,
                  }}
                >
                  {Object.entries(result.indices).map(([key, value]) => {
                    const label = key
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase());
                    
                    const displayValue = typeof value === 'number' 
                      ? `${Math.round(value * 100)}%` 
                      : value;

                    return (
                      <div key={key} style={{ marginBottom: 8, fontSize: 14 }}>
                        <span style={{ color: "#6b7280" }}>{label}: </span>
                        <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{displayValue}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ПОЛНЫЙ Summary ПОД индексами - заблюрен до email */}
            {result.summary && (
              <div
                style={{
                  marginBottom: 16,
                  filter: !emailSubmitted ? "blur(6px)" : "none",
                  userSelect: !emailSubmitted ? "none" : "auto",
                  pointerEvents: !emailSubmitted ? "none" : "auto",
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16 }}>Summary</h3>
                <div
                  style={{
                    padding: 20,
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 10,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {result.summary}
                  </p>
                </div>
              </div>
            )}

            {/* Модалка с EmailCapture - показывается поверх заблюренного контента */}
            {!emailSubmitted && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  width: "90%",
                  maxWidth: 500,
                }}
              >
                <EmailCapture
                  testName={testData.title}
                  resultLevel={protocolTier || "analysis"}
                  result={result}
                  protocol={currentProtocol}
                  onSuccess={() => {
                    setEmailSubmitted(true);
                    localStorage.setItem(`email_submitted_${testSlug}`, "true");
                  }}
                />
              </div>
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
                  — $3
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
    </div>
  );
}
