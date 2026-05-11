"use client";

import { useState } from "react";

export default function EmailCapture({ testName, resultLevel, onSuccess, result, protocol }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          testName, 
          resultLevel,
          indices: result?.indices || null,
          summary: result?.summary || null,
          overallLevel: result?.overall_trust_recovery_level || 
                       result?.overall_option_status || 
                       result?.overall_risk_level || 
                       result?.overall_hypercontrol_level ||
                       result?.overall_triangle_risk ||
                       result?.overall_trust_in_signals ||
                       result?.overall_mixed_signals_level ||
                       result?.overall_silent_exit_level ||
                       result?.overall_breakup_pattern_level || null,
          protocol: protocol || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong");
      }

      if (onSuccess) onSuccess();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Could not send. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          marginTop: 24,
          padding: "20px 24px",
          background: "#f0fdf4",
          border: "1px solid #86efac",
          borderRadius: 10,
          color: "#065f46",
        }}
      >
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>
          ✅ Check your inbox — your result summary is on its way.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 24,
        padding: "20px 24px",
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 10,
      }}
    >
      <p
        style={{
          margin: "0 0 6px 0",
          fontSize: 15,
          fontWeight: 600,
          color: "#1a1a1a",
        }}
      >
        Enter your email to see the full analysis
      </p>
      <p
        style={{
          margin: "0 0 16px 0",
          fontSize: 14,
          color: "#6b7280",
          lineHeight: 1.5,
        }}
      >
        We&apos;ll send a short breakdown of what this pattern means and what to do next.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            flex: 1,
            minWidth: 200,
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.2)",
            backgroundColor: "#f9fafb",
            color: "#1a1a1a",
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "10px 20px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#1565C0",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: 15,
            cursor: status === "loading" ? "default" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {status === "loading" ? "Sending..." : "Send to me"}
        </button>
      </form>

      {errorMsg && (
        <p style={{ margin: "10px 0 0 0", fontSize: 13, color: "#dc2626" }}>
          {errorMsg}
        </p>
      )}

      <p style={{ margin: "12px 0 0 0", fontSize: 12, color: "#6b7280" }}>
        No spam. One email with your result summary.
      </p>
    </div>
  );
}
