"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
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

            {/* Заголовок уровня теста */}
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
                {/* Показываем уровень из API */}
                {result.overall_trust_recovery_level && `Trust-recovery level: ${result.overall_trust_recovery_level}`}
                {result.overall_option_status && `Option status: ${result.overall_option_status}`}
                {result.overall_risk_level && `Risk level: ${result.overall_risk_level}`}
                {result.overall_hypercontrol_level && `Hypercontrol level: ${result.overall_hypercontrol_level}`}
                {result.overall_triangle_risk && `Triangle risk: ${result.overall_triangle_risk}`}
                {result.overall_trust_in_signals && `Trust in signals: ${result.overall_trust_in_signals}`}
                {result.overall_mixed_signals_level && `Mixed signals level: ${result.overall_mixed_signals_level}`}
                {result.overall_silent_exit_level && `Silent-exit level: ${result.overall_silent_exit_level}`}
                {result.overall_breakup_pattern_level && `Breakup pattern level: ${result.overall_breakup_pattern_level}`}
                {!result.overall_trust_recovery_level && 
                 !result.overall_option_status && 
                 !result.overall_risk_level && 
                 !result.overall_hypercontrol_level &&
                 !result.overall_triangle_risk &&
                 !result.overall_trust_in_signals &&
                 !result.overall_mixed_signals_level &&
                 !result.overall_silent_exit_level &&
                 !result.overall_breakup_pattern_level && 
                 "Overall Assessment"}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                {result.overall || result.summary || "Assessment complete."}
              </p>
            </div>

            {/* Summary с blur */}
            {result.summary && (
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ marginTop: 24, marginBottom: 8 }}>Summary</h3>
                <div
                  style={{
                    padding: 20,
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 10,
                    position: "relative",
                  }}
                >
                  {/* Первая строка всегда видна */}
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                    {result.summary.split('\n')[0]}
                  </p>

                  {/* Остальное - blur до email */}
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

                  {/* После email - разблюрить */}
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

            {/* Индексы - показываются ТОЛЬКО после email */}
            {emailSubmitted && result.indices && (
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ marginTop: 24, marginBottom: 8 }}>Pattern Indices</h3>
                <div
                  style={{
                    padding: 20,
                    background: "#fafbfc",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 10,
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {Object.entries(result.indices).map(([key, value]) => {
                      // Форматируем название индекса
                      const label = key
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase());
                      
                      // Форматируем значение (0-1 в проценты)
                      const displayValue = typeof value === 'number' 
                        ? `${Math.round(value * 100)}%` 
                        : value;

                      return (
                        <div key={key} style={{ fontSize: 14 }}>
                          <div style={{ color: "#6b7280", marginBottom: 4 }}>{label}</div>
                          <div style={{ fontWeight: 600, color: "#1a1a1a" }}>{displayValue}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Email capture */}
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
