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
        email: emailRef.current?.trim() || "user@paypal.com", // минимальный fallback
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

  // Копирование всего протокола в буфер — ТОЧНОЕ СОДЕРЖАНИЕ из документа
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
The idea is simple: you see clearly which part is actually yours, and which isn’t.

Block 3. Grounding + walking (15 minutes)
Goal: bring focus back to your body, your space, your tasks.
When: after the “separating responsibility” step.
Steps:
    • Walk for 10–15 minutes at a calm pace (apartment, street, hallway), ideally barefoot.
    • During the walk keep a light 4–6 breathing rhythm, but more freely (don’t count every breath).
    • While walking, consciously lean on 5 anchors:
        ◦ 5 things you can see;
        ◦ 4 sounds you can hear;
        ◦ 3 sensations in your body (how your feet touch the floor, how your shoulders move, how the air feels on your skin);
        ◦ 2 smells or tastes;
        ◦ 1 thought: “What do I want to do for myself today?”

Block 4. Hormone reduction: adrenaline and cortisol
4.1. Adrenaline: when you feel anger / a surge / “boiling inside”
Goal: give your body a controlled outlet for adrenaline, instead of dumping it on her or into another round of self‑destruction.
Adrenaline = the body preparing to fight or run.
Typical signs:
    • tight jaw, urge to clench your teeth;
    • arms/shoulders feel “charged”, urge to hit something or write a harsh message;
    • choppy breathing, urge to pace around the room.
Actions:
Hand squeeze:
    • clench your fists as hard as you can for 20 seconds,
    • release fully for 20 seconds;
    • repeat 3 times.
Full‑body tension:
    • stand up straight, press your feet into the floor;
    • on the inhale, tense your whole body as much as possible: legs, arms, back, core, jaw and face muscles;
    • hold the tension for 30 seconds;
    • then on the exhale let everything go at once.

4.2. Cortisol: when you feel burned out / hopeless / “empty”
Goal: lower cortisol so you can focus, stay collected, and actually function in your life and work.
Cortisol = chronic stress, exhaustion, “I’m wrung out”.
Typical signs:
    • heaviness and emptiness, like you “don’t even have energy to be angry”;
    • brain fog, hard to focus;
    • constant anxiety, especially in the evening;
    • cravings for sugar/coffee/“one more dose of her drama” just to feel something.
What helps lower cortisol (you can combine these on different days):
    • Moderate‑intensity physical exercise for 15–30 minutes:
brisk walking, squats, push‑ups, interval circuits — anything that genuinely raises your heart rate.
    • Sauna / hot steam room — if available and medically safe.
    • Cold exposure (cold shower, ice bath, cold compress on the body) — also done mindfully, without macho heroics.
In the context of the “Wall” protocol the logic is:
    • first: breathing + wall + grounding;
    • then, if you feel wired or drained, you add the right unloading block (adrenaline or cortisol).

5. Fast interception during the day
When: any time a new wave hits — you hear her voice in your head, see photos, open the chat, feel the pull to text or check. The waves will come in phases of 20–30 minutes. At first it may happen several times a day, then less often, and eventually they fade; what remains is just memory — good, bad, or none at all.
5.1. Mini 4–6 breathing
    • 5–10 cycles:
        ◦ inhale for 4 counts through the nose;
        ◦ short pause for 1–2 counts;
        ◦ exhale for 6 counts through the mouth.
Important: make sure your exhale is consciously slower than your inhale.
5.2. “Unhooking” phrases
Option A (long, for deeper awareness):
“She didn’t choose me when she could.
She is in her own world — her decisions, habits, actions, her responsibility are there.
My responsibility is only here.”
Option B (short, for quick triggers):
“This is not about the future. This is only about attachment.”
How to use:
    • choose based on the situation and how much time you have;
    • say it out loud, in a whisper, or silently 2–3 times in a row, slowly and clearly;
    • each time: on the exhale — the phrase, on the inhale — just 4–6 breathing.
Goal: pull the situation out of the fantasy about “our future” and back into “my body and my choices right now”.

5.3. “Don’t answer until you’re out of the wave”
Rule:
    • Don’t answer calls or messages until you feel the hormone wave has passed.
    • Ideally, wait 1–2 days until your head feels clear, not foggy.
You can frame it like this:
“If she writes or calls:
    • first — breathing, visualization, grounding, hormone unloading,
    • then — at least 24–48 hours of pause,
    • only after that decide whether to answer or not.”
A “right now” reply is almost always a reply from the dopamine loop, not from a clear choice.

5.4. If you still wrote or answered
Mini‑protocol for a slip:
Notice the fact:
“Okay, I did write/answer. This is not a failure.
It’s a signal that the load is higher than I thought.”
Right after sending:
    • go back to 4–6 breathing for 5–10 cycles.
Do not continue the conversation.
    • don’t spin it into a long back‑and‑forth,
    • don’t go into explanations and emotional rescue mode.
Say clearly (out loud or in your head):
“This is not about the future.
This is about attachment.”
Then:
    • return to the Wall protocol and keep doing it for the month as planned.
Meaning: a slip is part of the process, not a reason to abandon climbing out.

How long it takes to exit the dopamine loop
A full exit from this dopamine loop usually takes around a month, provided there is complete cutoff of contact — no meetings, no calls, no messages, no watching her stories, no checking if she watched yours.
All those 30 days you’ll need to come back to this protocol daily: Breathing, Wall, Grounding, Hormone unloading.
    • The first 7–10 days will be the hardest.
    • Then the pull will get weaker, but will come back in waves — that’s normal, just follow the “Fast interception during the day” block when it hits again.`;

    try {
      await navigator.clipboard.writeText(protocolText);
      alert("✅ Full Wall Protocol copied to clipboard!");
    } catch (err) {
      alert("Failed to copy. Please select the text manually.");
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

                {/*
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
                */}

                <div style={{ marginBottom: 10 }}>
                  <div ref={paypalSingleRef} />
                </div>

                {paying && <p style={{ marginTop: 12, opacity: 0.8 }}>Processing payment...</p>}
                {payError && <p style={{ marginTop: 12, color: "#ff8c8c" }}>{payError}</p>}
              </div>
            ) : (
              <div style={{ marginTop: 30 }}>
                <h2 style={{ marginBottom: 16, color: "#fff" }}>“Wall” Protocol</h2>
                
                <div style={{ fontSize: "15.2px", lineHeight: "1.75", color: "#ddd", whiteSpace: "pre-wrap" }}>
{`"Wall" Protocol
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
The idea is simple: you see clearly which part is actually yours, and which isn’t.

Block 3. Grounding + walking (15 minutes)
Goal: bring focus back to your body, your space, your tasks.
When: after the “separating responsibility” step.
Steps:
    • Walk for 10–15 minutes at a calm pace (apartment, street, hallway), ideally barefoot.
    • During the walk keep a light 4–6 breathing rhythm, but more freely (don’t count every breath).
    • While walking, consciously lean on 5 anchors:
        ◦ 5 things you can see;
        ◦ 4 sounds you can hear;
        ◦ 3 sensations in your body (how your feet touch the floor, how your shoulders move, how the air feels on your skin);
        ◦ 2 smells or tastes;
        ◦ 1 thought: “What do I want to do for myself today?”

Block 4. Hormone reduction: adrenaline and cortisol
4.1. Adrenaline: when you feel anger / a surge / “boiling inside”
Goal: give your body a controlled outlet for adrenaline, instead of dumping it on her or into another round of self‑destruction.
Adrenaline = the body preparing to fight or run.
Typical signs:
    • tight jaw, urge to clench your teeth;
    • arms/shoulders feel “charged”, urge to hit something or write a harsh message;
    • choppy breathing, urge to pace around the room.
Actions:
Hand squeeze:
    • clench your fists as hard as you can for 20 seconds,
    • release fully for 20 seconds;
    • repeat 3 times.
Full‑body tension:
    • stand up straight, press your feet into the floor;
    • on the inhale, tense your whole body as much as possible: legs, arms, back, core, jaw and face muscles;
    • hold the tension for 30 seconds;
    • then on the exhale let everything go at once.

4.2. Cortisol: when you feel burned out / hopeless / “empty”
Goal: lower cortisol so you can focus, stay collected, and actually function in your life and work.
Cortisol = chronic stress, exhaustion, “I’m wrung out”.
Typical signs:
    • heaviness and emptiness, like you “don’t even have energy to be angry”;
    • brain fog, hard to focus;
    • constant anxiety, especially in the evening;
    • cravings for sugar/coffee/“one more dose of her drama” just to feel something.
What helps lower cortisol (you can combine these on different days):
    • Moderate‑intensity physical exercise for 15–30 minutes:
brisk walking, squats, push‑ups, interval circuits — anything that genuinely raises your heart rate.
    • Sauna / hot steam room — if available and medically safe.
    • Cold exposure (cold shower, ice bath, cold compress on the body) — also done mindfully, without macho heroics.
In the context of the “Wall” protocol the logic is:
    • first: breathing + wall + grounding;
    • then, if you feel wired or drained, you add the right unloading block (adrenaline or cortisol).

5. Fast interception during the day
When: any time a new wave hits — you hear her voice in your head, see photos, open the chat, feel the pull to text or check. The waves will come in phases of 20–30 minutes. At first it may happen several times a day, then less often, and eventually they fade; what remains is just memory — good, bad, or none at all.
5.1. Mini 4–6 breathing
    • 5–10 cycles:
        ◦ inhale for 4 counts through the nose;
        ◦ short pause for 1–2 counts;
        ◦ exhale for 6 counts through the mouth.
Important: make sure your exhale is consciously slower than your inhale.
5.2. “Unhooking” phrases
Option A (long, for deeper awareness):
“She didn’t choose me when she could.
She is in her own world — her decisions, habits, actions, her responsibility are there.
My responsibility is only here.”
Option B (short, for quick triggers):
“This is not about the future. This is only about attachment.”
How to use:
    • choose based on the situation and how much time you have;
    • say it out loud, in a whisper, or silently 2–3 times in a row, slowly and clearly;
    • each time: on the exhale — the phrase, on the inhale — just 4–6 breathing.
Goal: pull the situation out of the fantasy about “our future” and back into “my body and my choices right now”.

5.3. “Don’t answer until you’re out of the wave”
Rule:
    • Don’t answer calls or messages until you feel the hormone wave has passed.
    • Ideally, wait 1–2 days until your head feels clear, not foggy.
You can frame it like this:
“If she writes or calls:
    • first — breathing, visualization, grounding, hormone unloading,
    • then — at least 24–48 hours of pause,
    • only after that decide whether to answer or not.”
A “right now” reply is almost always a reply from the dopamine loop, not from a clear choice.

5.4. If you still wrote or answered
Mini‑protocol for a slip:
Notice the fact:
“Okay, I did write/answer. This is not a failure.
It’s a signal that the load is higher than I thought.”
Right after sending:
    • go back to 4–6 breathing for 5–10 cycles.
Do not continue the conversation.
    • don’t spin it into a long back‑and‑forth,
    • don’t go into explanations and emotional rescue mode.
Say clearly (out loud or in your head):
“This is not about the future.
This is about attachment.”
Then:
    • return to the Wall protocol and keep doing it for the month as planned.
Meaning: a slip is part of the process, not a reason to abandon climbing out.

How long it takes to exit the dopamine loop
A full exit from this dopamine loop usually takes around a month, provided there is complete cutoff of contact — no meetings, no calls, no messages, no watching her stories, no checking if she watched yours.
All those 30 days you’ll need to come back to this protocol daily: Breathing, Wall, Grounding, Hormone unloading.
    • The first 7–10 days will be the hardest.
    • Then the pull will get weaker, but will come back in waves — that’s normal, just follow the “Fast interception during the day” block when it hits again.`}
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
