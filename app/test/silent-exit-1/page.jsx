"use client";

import { useEffect, useRef, useState } from "react";

export default function SilentExitTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const [email, setEmail] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  const paypalSingleRef = useRef(null);
  //const paypalFullRef = useRef(null);
  const paypalRenderedRef = useRef(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const daily_presence = formData.get("daily_presence");
    const emotional_engagement = formData.get("emotional_engagement");
    const conflict_handling = formData.get("conflict_handling");
    const shared_life_pattern = formData.get("shared_life_pattern");
    const silent_breakup_risk = formData.get("silent_breakup_risk");
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "silent_exit-1",
        answers: {
          daily_presence,
          emotional_engagement,
          conflict_handling,
          shared_life_pattern,
          silent_breakup_risk,
        },
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
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
    backgroundColor: "#000000",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontWeight: 500,
  };

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

  const sectionTitleStyle = {
    marginTop: 24,
    marginBottom: 8,
  };

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
              custom_id: "silent-exit-1-single",
              description: "Silent Exit 1 protocol access",
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        try {
          const cleanEmail = email.trim().toLowerCase();
          if (!cleanEmail) {
            setPayError("Enter your email before confirming payment.");
            return;
          }

          setPaying(true);
          setPayError("");

          await actions.order.capture();

          const res = await fetch("/api/paypal/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderID,
              intent: "single",
              scope: "silent-exit-1",
              email: cleanEmail,
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
}, [result]); // email из зависимостей убираем

return (
  <div style={pageStyle}>
    <div style={cardStyle}>
      <h1 style={{ marginBottom: 16 }}>Silent Exit — Test 1</h1>

      <form onSubmit={handleSubmit}>
        <h2 style={sectionTitleStyle}>1. Daily presence</h2>
        <label style={labelStyle}>
          How present are they in your daily life?
        </label>
        <select
          name="daily_presence"
          required
          style={controlStyle}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="high">They are very present and engaged</option>
          <option value="medium">
            Sometimes present, sometimes distant or busy
          </option>
          <option value="low">
            Mostly distant, low initiative from their side
          </option>
        </select>

        <h2 style={sectionTitleStyle}>2. Emotional engagement</h2>
        <label style={labelStyle}>
          What happens when you share feelings or something vulnerable?
        </label>
        <select
          name="emotional_engagement"
          required
          style={controlStyle}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="responsive">
            They respond, stay with you, ask questions
          </option>
          <option value="mixed">
            Sometimes responsive, sometimes shut down or distracted
          </option>
          <option value="shut_down">
            Often distant, dismissive, or emotionally flat
          </option>
        </select>

        <h2 style={sectionTitleStyle}>3. Conflict handling</h2>
        <label style={labelStyle}>
          How do hard topics and conflicts play out?
        </label>
        <select
          name="conflict_handling"
          required
          style={controlStyle}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="talks">
            They can stay in the conversation and work through it
          </option>
          <option value="avoids">
            They avoid, postpone or change subject
          </option>
          <option value="shutdown">
            They disappear, go silent or become hostile
          </option>
        </select>

        <h2 style={sectionTitleStyle}>4. Shared life pattern</h2>
        <label style={labelStyle}>
          How interwoven are your actual lives (not just calls and texts)?
        </label>
        <select
          name="shared_life_pattern"
          required
          style={controlStyle}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="interwoven">
            Plans, routines, and people are genuinely shared
          </option>
          <option value="partial">
            Some overlap, but a lot of life is separate
          </option>
          <option value="parallel">
            Mostly parallel lives with occasional intersections
          </option>
        </select>

        <h2 style={sectionTitleStyle}>5. Silent breakup risk</h2>
        <label style={labelStyle}>
          How likely does it feel that things might just fade out
          without a real talk?
        </label>
        <select
          name="silent_breakup_risk"
          required
          style={controlStyle}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="low">
            Very unlikely — they tend to talk even when it’s hard
          </option>
          <option value="medium">
            Possible — some avoidance, some conversations
          </option>
          <option value="high">
            High — they already fade, avoid, or ghost when tension appears
          </option>
        </select>

        <h2 style={sectionTitleStyle}>6. Your narrative</h2>
        <label style={labelStyle}>
          In a few sentences, describe what has been happening.
        </label>
        <textarea
          name="narrative"
          rows={5}
          style={{ ...controlStyle, resize: "vertical" }}
          placeholder="Write what you’ve noticed, what changed, what confuses you..."
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 24,
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#ffffff",
            color: "#000",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Get risk breakdown"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ marginBottom: 12 }}>Breakdown</h2>

          <p>
            <strong>Presence Fade Index:</strong>{" "}
            {result.indices.presence_fade_index}
          </p>
          <p style={{ marginBottom: 12 }}>
            Shows how much their everyday presence and initiative have faded.
            0 = very present and engaged, 1 = strong disappearance pattern.
          </p>

          <p>
            <strong>Emotional Withdrawal Score:</strong>{" "}
            {result.indices.emotional_withdrawal_score}
          </p>
          <p style={{ marginBottom: 12 }}>
            Reflects how emotionally shut down or disconnected they feel.
            0 = emotionally responsive, 1 = strongly withdrawn or indifferent.
          </p>

          <p>
            <strong>Conflict Avoidance Index:</strong>{" "}
            {result.indices.conflict_avoidance_index}
          </p>
          <p style={{ marginBottom: 12 }}>
            Captures how much hard topics and tensions are avoided instead of
            talked through. 0 = conflicts are addressed, 1 = strong
            avoidance or shutdown.
          </p>

          <p>
            <strong>Parallel Life Drift Score:</strong>{" "}
            {result.indices.parallel_life_drift_score}
          </p>
          <p style={{ marginBottom: 12 }}>
            Describes how parallel your lives have become. 0 = deeply
            interwoven, 1 = almost separate lives under the same label.
          </p>

          <p>
            <strong>Closure Risk Index:</strong>{" "}
            {result.indices.closure_risk_index}
          </p>
          <p style={{ marginBottom: 16 }}>
            Estimates how likely it is that things will end without a clear
            closure talk. 0 = very unlikely, 1 = high risk of a quiet or
            abrupt exit.
          </p>

          <p style={{ marginBottom: 24 }}>{result.summary}</p>

          {!paid ? (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <p style={{ marginBottom: 12 }}>
                Get full protocol access for this test — $3
              </p>

              <label style={labelStyle}>Your email</label>
              <input
                key={result.summary}
                type="email"
                name="unlock_email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setPayError("");
                }}
                placeholder="you@example.com"
                style={{ ...controlStyle, marginBottom: 12 }}
              />

              <div style={{ marginBottom: 10 }}>
                <div ref={paypalSingleRef} />
              </div>

              {paying && (
                <p style={{ marginTop: 12, opacity: 0.8 }}>
                  Processing payment...
                </p>
              )}

              {payError && (
                <p style={{ marginTop: 12, color: "#ff8c8c" }}>{payError}</p>
              )}
            </div>
          ) : (
            <div style={{ marginTop: 20 }}>
              <p>
                <strong>You are not being chosen.</strong>
              </p>
              <p>
                <strong>1. Stabilize</strong>
                <br />
                inhale 4 → hold 2 → exhale 6 (5 cycles)
              </p>
              <p>
                <strong>2. Cut availability</strong>
                <br />
                no instant replies, no emotional labor
              </p>
              <p>
                <strong>3. Reality check</strong>
                <br />
                watch behavior, ignore words
              </p>
              <p>
                <strong>4. Boundary</strong>
                <br />
                “I’m not interested in inconsistency”
              </p>
              <p>
                <strong>5. Observe</strong>
                <br />
                no chasing, no fixing
              </p>
              <p>
                <strong>6. Exit if no change</strong>
              </p>
            </div>
          )}

          <p
            style={{
              marginTop: 20,
              fontSize: 12,
              opacity: 0.7,
            }}
          >
            This tool is not therapy, medical care, or legal advice. It cannot
            diagnose anything or tell you what to do. You are fully
            responsible for any decisions or actions you take based on these
            checkups.
          </p>
        </div>
      )}
    </div>
  </div>
);
}
