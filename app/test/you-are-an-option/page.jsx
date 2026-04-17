"use client";

import { useEffect, useRef, useState } from "react";

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
                custom_id: "you-are-option-single",
                description: "You Are An Option + Wall Protocol access",
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            const cleanEmail = (emailRef.current || "").trim().toLowerCase();
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
                scope: "you-are-an-option",
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
  }, [result]);

  // Копирование всего протокола в буфер
  const copyProtocol = async () => {
    const protocolText = `"Wall" Protocol

Goal: to stop the automatic “rescuer/backup” response, bring your body and mind back to yourself, and only then decide if and how you respond to her.
Formula: Breathing → Separating responsibility → Grounding → Hormone reduction.

Block 1. 4–6 Breathing with feet on the floor
Goal: shift into a parasympathetic state.
When: every morning and immediately after her message/call, while your hands want to “reply like always”.
How:
  • Sit upright, feet flat on the floor, feel the pressure of your heels and toes.
  • Do 10–15 breathing cycles:
      ◦ inhale for a count of 4 through the nose,
      ◦ short pause for 1–2 counts,
      ◦ exhale for a count of 6 through the mouth.
Why:
  • lengthening the exhale lowers overall sympathetic arousal;
  • grounding your feet into the floor signals to the body “I’m here, I’m stable”, not “I’m about to rush in and rescue her”.

Block 2. Separating responsibility
Goal: separate her chaos from your life. You’re not rejecting empathy, but you stop confusing her crises with your job to “fix everything immediately”.
When: every morning after breathing.
Steps:
  • Imagine a glass wall between you.
  • On one side of the wall is her side: her life, her decisions, her crises, her consequences.
  • On the other side is yours: your body, time, money, plans, energy.
Say slowly, clearly, and thoughtfully:
“She didn’t choose me when she could.
She is in her own world — her decisions, habits, actions, her responsibility are there.
My responsibility is only here.”

Block 3. Grounding + walking (15 minutes)
Goal: bring focus back to your body, your space, your tasks.
When: after the “separating responsibility” step.
Steps:
  • Walk for 10–15 minutes at a calm pace (apartment, street, hallway), ideally barefoot.
  • During the walk keep a light 4–6 breathing rhythm, but more freely.
  • While walking, consciously lean on 5 anchors:
      ◦ 5 things you can see;
      ◦ 4 sounds you can hear;
      ◦ 3 sensations in your body (how your feet touch the floor, how your shoulders move, how the air feels on your skin);
      ◦ 2 smells or tastes;
      ◦ 1 thought: “What do I want to do for myself today?”

Block 4. Hormone reduction
4.1. Adrenaline (when you feel anger / surge / “boiling inside”)
  • Hand squeeze: clench your fists as hard as you can for 20 seconds, release fully for 20 seconds; repeat 3 times.
  • Full-body tension: tense your whole body as much as possible for 30 seconds on inhale, then release on exhale.

4.2. Cortisol (when you feel burned out / hopeless / “empty”)
  • Moderate-intensity physical exercise for 15–30 minutes (brisk walking, squats, push-ups, etc.).
  • Cold shower or sauna (if available and safe).

5. Fast interception during the day
When a new wave hits (urge to text, check chat, etc.):
  • Mini 4–6 breathing (5–10 cycles)
  • Unhooking phrase:
    “She didn’t choose me when she could. My responsibility is only here.”
    or short: “This is not about the future. This is only about attachment.”
  • Don’t answer until the wave has passed (ideally wait 24–48 hours).

If you still wrote or answered:
  • Breathe 4–6 for 5–10 cycles.
  • Say: “This is not about the future. This is about attachment.”
  • Return to the daily Wall protocol.

Full exit from the dopamine loop usually takes around 1 month with consistent daily practice and complete no-contact.";

    try {
      await navigator.clipboard.writeText(protocolText);
      alert("✅ Protocol copied to clipboard! You can now paste it anywhere.");
    } catch (err) {
      alert("Failed to copy. Please select and copy manually.");
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

            {!paid ? (
              <div style={{ marginTop: 16, padding: 16, border: "1px solid rgba(255,255,255,0.16)", borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
                <p style={{ marginBottom: 12 }}>Get full protocol access for this test — $3</p>

                <label style={labelStyle}>Your email</label>
                <input
                  key={result.summary}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEmail(val);
                    emailRef.current = val;
                    setPayError("");
                  }}
                  placeholder="you@example.com"
                  style={{ ...controlStyle, marginBottom: 12 }}
                />

                <div style={{ marginBottom: 10 }}>
                  <div ref={paypalSingleRef} />
                </div>

                {paying && <p style={{ marginTop: 12, opacity: 0.8 }}>Processing payment...</p>}
                {payError && <p style={{ marginTop: 12, color: "#ff8c8c" }}>{payError}</p>}
              </div>
            ) : (
              <div style={{ marginTop: 30 }}>
                <h2 style={{ marginBottom: 16, color: "#fff" }}>“Wall” Protocol</h2>
                <p style={{ fontStyle: "italic", marginBottom: 24 }}>
                  Goal: to stop the automatic “rescuer/backup” response, bring your body and mind back to yourself, and only then decide if and how you respond to her.<br />
                  <strong>Formula:</strong> Breathing → Separating responsibility → Grounding → Hormone reduction.
                </p>

                <div style={{ fontSize: "15.2px", lineHeight: "1.75", color: "#ddd" }}>
                  <h3 style={{ margin: "28px 0 12px", color: "#fff" }}>Block 1. 4–6 Breathing with feet on the floor</h3>
                  <p><strong>Goal:</strong> shift into a parasympathetic state.</p>
                  <p><strong>When:</strong> every morning and immediately after her message/call.</p>
                  <p><strong>How:</strong></p>
                  <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
                    <li>Sit upright, feet flat on the floor.</li>
                    <li>Do 10–15 breathing cycles: inhale 4 — pause 1–2 — exhale 6.</li>
                  </ul>
                  <p><strong>Why:</strong> Lengthening the exhale calms the nervous system. Grounding feet signals stability.</p>

                  <h3 style={{ margin: "28px 0 12px", color: "#fff" }}>Block 2. Separating responsibility</h3>
                  <p><strong>Goal:</strong> separate her chaos from your life.</p>
                  <p><strong>When:</strong> every morning after breathing.</p>
                  <p>Imagine a glass wall. On her side — her life and consequences. On your side — your time, energy and choices.</p>
                  <p style={{ fontStyle: "italic", margin: "12px 0" }}>
                    “She didn’t choose me when she could.<br />
                    She is in her own world — her responsibility is there.<br />
                    My responsibility is only here.”
                  </p>

                  <h3 style={{ margin: "28px 0 12px", color: "#fff" }}>Block 3. Grounding + walking (15 minutes)</h3>
                  <p><strong>When:</strong> after separating responsibility.</p>
                  <p>Walk calmly 10–15 minutes (ideally barefoot). Keep light 4–6 breathing.</p>
                  <p>Use 5-4-3-2-1 grounding anchors while walking.</p>

                  <h3 style={{ margin: "28px 0 12px", color: "#fff" }}>Block 4. Hormone reduction</h3>
                  <p><strong>Adrenaline (anger / surge):</strong> Hand squeeze (20s on / 20s off ×3) or full-body tension 30s.</p>
                  <p><strong>Cortisol (burnout / emptiness):</strong> Moderate exercise 15–30 min, cold shower or sauna (if safe).</p>

                  <h3 style={{ margin: "28px 0 12px", color: "#fff" }}>5. Fast interception during the day</h3>
                  <p>When the urge to text or check appears:</p>
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>Mini 4–6 breathing</li>
                    <li>Unhooking phrase (repeat 2–3 times)</li>
                    <li>Wait at least 24–48 hours before replying</li>
                  </ul>

                  <p style={{ marginTop: 20, fontStyle: "italic" }}>
                    A full exit from the dopamine loop usually takes around 1 month with daily practice and complete no-contact.
                  </p>
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
                  📋 Copy full “Wall” Protocol to clipboard
                </button>

                <p style={{ marginTop: 16, fontSize: 13, opacity: 0.75, textAlign: "center" }}>
                  Copy and save it. Practice daily for the next 30 days.
                </p>
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
