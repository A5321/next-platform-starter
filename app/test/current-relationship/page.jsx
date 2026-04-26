"use client";

import { useState, useEffect } from "react";

import { currentRelationshipProtocols } from "../../../lib/protocols/currentRelationship";
import { getProtocolTier } from "../../../lib/protocolTiers";

export default function CurrentRelationshipTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [protocolTier, setProtocolTier] = useState(null);

  const [payError, setPayError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const access = params.get("access");
    const cancelled = params.get("cancelled");
    const paidLocal = localStorage.getItem("paid_current_relationship");

    if (paidLocal === "true" || access === "one" || access === "sub") {
      setPaid(true);
      const saved = localStorage.getItem("lastResult_current_relationship");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("current-relationship", parsed);
        setProtocolTier(tier);
      }
      return;
    }

    if (cancelled) {
      setPayError("Payment cancelled. You can try again.");
      return;
    }

    if (token) {
      const saved = localStorage.getItem("lastResult_current_relationship");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        const tier = getProtocolTier("current-relationship", parsed);
        setProtocolTier(tier);
      }
      confirmPayment(token);
    }
  }, []);

  async function confirmPayment(orderId) {
    try {
      setRedirecting(true);
      const res = await fetch("/api/paypal/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          intent: "single",
          scope: "current-relationship",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Payment confirmation failed");
      }

      localStorage.setItem("paid_current_relationship", "true");
      setPaid(true);
      window.history.replaceState({}, "", window.location.pathname);
    } catch (err) {
      console.error(err);
      setPayError(err.message || "Payment confirmation failed. Contact support.");
    } finally {
      setRedirecting(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setPaid(false);
    setProtocolTier(null);
    setPayError("");
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "current_relationship",
        answers: {
          duration: formData.get("duration"),
          initiative: formData.get("initiative"),
          predictability: formData.get("predictability"),
          boundaries: formData.get("boundaries"),
        },
        narrative: formData.get("narrative"),
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("lastResult_current_relationship", JSON.stringify(data));

    const tier = getProtocolTier("current-relationship", data);
    setProtocolTier(tier);

    setLoading(false);
  }



  const currentProtocol =
    protocolTier && protocolTier !== "none"
      ? currentRelationshipProtocols?.[protocolTier]
      : null;

  const copyProtocol = async () => {
    if (!currentProtocol) return;

    let text = `"${currentProtocol.title}"\n\n${currentProtocol.subtitle}\n\n${currentProtocol.intro}\n\n`;

    currentProtocol.blocks.forEach((block) => {
      text += `${block.title}\nGoal: ${block.goal}\n`;
      if (block.when) text += `When: ${block.when}\n\n`;
      if (block.items) block.items.forEach((item) => (text += `• ${item}\n`));
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

  // === Styles ===
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
          <h1 style={{ margin: 0, fontSize: 32 }}>Current relationship checkup</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            Describe a situation that shows your current dynamic. Answer a few
            questions and get a structured pattern breakdown.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>How long has this dynamic been going on?</label>
            <select name="duration" style={controlStyle}>
              <option value="0-3 months">0–3 months</option>
              <option value="3-12 months">3–12 months</option>
              <option value="1-3 years">1–3 years</option>
              <option value="3+ years">3+ years</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Who initiates contact or repair more often?</label>
            <select name="initiative" style={controlStyle}>
              <option value="mostly_me">Mostly me</option>
              <option value="mostly_them">Mostly them</option>
              <option value="equal">Roughly equal</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>How predictable do their reactions feel?</label>
            <select name="predictability" style={controlStyle}>
              <option value="very_unpredictable">Very unpredictable</option>
              <option value="somewhat_unpredictable">Somewhat unpredictable</option>
              <option value="mostly_predictable">Mostly predictable</option>
              <option value="very_predictable">Very predictable</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              How often do you feel your boundaries are crossed or pushed?
            </label>
            <select name="boundaries" style={controlStyle}>
              <option value="almost_never">Almost never</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
              <option value="very_often">Very often</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Your story (optional)</label>
            <textarea
              name="narrative"
              rows={5}
              style={{ ...controlStyle, resize: "vertical" }}
              placeholder="Describe a recent interaction that feels typical for this relationship..."
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
              Overall risk level: {result.overall_risk_level}
            </h2>

            <h3 style={sectionTitleStyle}>Indices</h3>

            <p>
              <strong>Reciprocity Score: {result.indices.reciprocity_score}</strong>
              <br />
              Measures how balanced emotional, practical, and time investment is between people.
            </p>

            <p>
              <strong>Initiative Balance Index: {result.indices.initiative_balance_index}</strong>
              <br />
              Measures asymmetry in who initiates contact.
            </p>

            <p>
              <strong>Emotional Stability Index: {result.indices.emotional_stability_index}</strong>
              <br />
              Measures how stable or volatile reactions are.
            </p>

            <p>
              <strong>Boundary Violation Probability: {result.indices.boundary_violation_probability}</strong>
              <br />
              Estimates how likely it is that personal limits are being crossed or ignored in this dynamic
            </p>

            <p>
              <strong>Communication Clarity Index: {result.indices.communication_clarity_index}</strong>
              <br />
              Measures how direct, honest, and unambiguous communication tends to be between both people
            </p>

            <p>
              <strong>Pattern Recurrence Probability: {result.indices.pattern_recurrence_probability}</strong>
              <br />
              Estimates how likely the current dynamic is to repeat itself without deliberate change
            </p>

            <p>
              <strong>Long-Term Stability Forecast: {result.indices.long_term_stability_forecast}</strong>
              <br />
              Predicts how sustainable this dynamic is over time based on current patterns
            </p>

            <h3 style={sectionTitleStyle}>Summary</h3>
            <p style={{ marginBottom: 24 }}>{result.summary}</p>

            {/* Protocol section */}
            {protocolTier === "none" ? (
              <div
                style={{
                  marginTop: 24,
                  padding: 24,
                  border: "1px solid #4ade80",
                  borderRadius: 12,
                  background: "rgba(16, 185, 129, 0.1)",
                  color: "#86efac",
                }}
              >
                <h3 style={{ margin: "0 0 12px 0", color: "#4ade80" }}>✅ Good news</h3>
                <p style={{ fontSize: "17px", lineHeight: 1.55 }}>
                  Your dynamic looks stable.
                  <br />
                  No significant patterns of concern detected.
                </p>
                <p style={{ marginTop: 12, opacity: 0.95 }}>
                  No protocol needed — keep doing what you're doing.
                </p>
              </div>
            ) : redirecting ? (
              <div style={{ marginTop: 24, opacity: 0.8 }}>
                <p>Confirming payment...</p>
              </div>
            ) : !paid ? (
              <div
                style={{
                  marginTop: 16,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <p style={{ marginBottom: 16, fontWeight: 600 }}>
                  Recommended:{" "}
                  <strong>
                    {protocolTier === "hard"
                      ? "Exit Protocol"
                      : "Stabilization Protocol"}
                  </strong>{" "}
                  — $3
                </p>

                <button
                  onClick={async () => {
                    setPayError("");
                    try {
                      const res = await fetch("/api/paypal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          scope: "current-relationship",
                          tier: protocolTier,
                        }),
                      });
                      const json = await res.json();
                      if (!res.ok || !json.success) {
                        throw new Error(json.error || "Could not create order");
                      }
                      window.location.href = json.approvalUrl;
                    } catch (err) {
                      setPayError(err.message || "Something went wrong. Try again.");
                    }
                  }}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  Get protocol — $3
                </button>

                {payError && (
                  <p style={{ marginTop: 12, color: "#ff8c8c" }}>{payError}</p>
                )}
              </div>
            ) : (
              <div style={{ marginTop: 30 }}>
                <h2 style={{ marginBottom: 16, color: "#fff" }}>
                  {currentProtocol?.title || "Protocol"}
                </h2>

                <div
                  style={{
                    fontSize: "15.2px",
                    lineHeight: "1.75",
                    color: "#ddd",
                    whiteSpace: "pre-wrap",
                    background: "rgba(255,255,255,0.03)",
                    padding: "20px",
                    borderRadius: 10,
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
                              color: "#fff",
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
                              <ul
                                style={{
                                  paddingLeft: "24px",
                                  margin: 0,
                                  listStyleType: "disc",
                                }}
                              >
                                {block.items.map((item, i) => {
                                  const trimmed = item.trim();
                                  if (
                                    trimmed.startsWith("—") ||
                                    trimmed.startsWith("-")
                                  ) {
                                    return (
                                      <li
                                        key={i}
                                        style={{
                                          marginBottom: 8,
                                          paddingLeft: "8px",
                                          listStyleType: "circle",
                                        }}
                                      >
                                        {trimmed
                                          .replace(/^—\s*/, "")
                                          .replace(/^- /, "")}
                                      </li>
                                    );
                                  }
                                  return (
                                    <li key={i} style={{ marginBottom: 10 }}>
                                      {trimmed}
                                    </li>
                                  );
                                })}
                              </ul>
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
                            background: "rgba(255,255,255,0.05)",
                            borderLeft: "4px solid #4ade80",
                            fontStyle: "italic",
                            color: "#ccc",
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

                <p
                  style={{
                    marginTop: 16,
                    fontSize: 13,
                    opacity: 0.75,
                    textAlign: "center",
                  }}
                >
                  Save it and practice daily.
                </p>
              </div>
            )}

            <p style={{ marginTop: 40, fontSize: 12, opacity: 0.7 }}>
              This tool is not therapy, medical care, or legal advice. You are
              fully responsible for any decisions or actions you take.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
