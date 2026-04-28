"use client";

import { useState } from "react";

export default function ProtocolEmailCapture({ protocolScope, protocolTier, protocolTitle }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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
          protocolScope,
          protocolTier,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong");
      }

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
          padding: "16px 20px",
          background: "rgba(74, 222, 128, 0.08)",
          border: "1px solid rgba(74, 222, 128, 0.3)",
          borderRadius: 10,
          color: "#86efac",
        }}
      >
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>
          ✅ Your protocol is on its way. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 24,
        padding: "20px 24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10,
      }}
    >
      <p style={{ margin: "0 0 4px 0", fontSize: 15, fontWeight: 600, color: "#fff" }}>
        Get your protocol by email
      </p>
      <p style={{ margin: "0 0 16px 0", fontSize: 14, color: "#888", lineHeight: 1.5 }}>
        We'll send you a copy of{protocolTitle ? ` "${protocolTitle}"` : " this protocol"} so you have it saved.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
            border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(3, 20, 40, 0.85)",
            color: "#fff",
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
            backgroundColor: "#ffffff",
            color: "#000",
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
        <p style={{ margin: "10px 0 0 0", fontSize: 13, color: "#ff8c8c" }}>{errorMsg}</p>
      )}

      <p style={{ margin: "12px 0 0 0", fontSize: 12, color: "#555" }}>
        No spam. Just your protocol, saved to your inbox.
      </p>
    </div>
  );
}
