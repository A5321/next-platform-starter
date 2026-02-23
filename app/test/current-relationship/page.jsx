"use client";

import { useState } from "react";

export default function CurrentRelationshipTest() {
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const narrative = formData.get("narrative");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: "current_relationship",
        answers: {},
        narrative,
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <h1>Current relationship checkup</h1>
      <p>Describe a situation that shows your current dynamic.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Your story (optional):
          <br />
          <textarea name="narrative" rows={6} style={{ width: "100%" }} />
        </label>
        <br />
        <button type="submit">Analyze pattern</button>
      </form>

      {result && (
        <pre style={{ marginTop: 24, background: "#f4f4f4", padding: 16 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
