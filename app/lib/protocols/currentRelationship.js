export const currentRelationshipProtocols = {
  soft: {
    productName: "Current Relationship Checkup — Stabilization Protocol",
    paypalDescription: "Current Relationship Checkup + Stabilization Protocol access",
    title: "Stabilization Protocol",
    subtitle:
      "For cases where the relationship dynamic is showing strain, but the pattern is not yet fully entrenched.",
    intro:
      "The goal of this protocol is not to fix the relationship or change the other person. The goal is to stop the automatic reactions that keep you locked in the same cycle — the over-explaining, the anxious monitoring, the attempts to stabilize something that keeps shifting. You can only work with what is yours.",
    blocks: [
      {
        title: "1. Slow the automatic reaction",
        goal: "Interrupt the reflex to respond, defend, or fix the moment tension appears.",
        when: "Every time a conflict, cold spell, or uncomfortable interaction activates urgency or anxiety in your body.",
        items: [
          { type: "text", text: "Before reacting — verbally, by text, or in your head — do 5–10 cycles of 4–6 breathing." },
          { type: "text", text: "Keep both feet flat on the floor and wait until your body settles slightly." },
          { type: "text", text: "Do not respond while you still feel the urge to resolve it immediately." },
        ],
      },
      {
        title: "2. Separate the signal from the story",
        goal: "Reduce the noise between what actually happened and the meaning your mind immediately assigns to it.",
        when: "Right after breathing, before you decide how to respond.",
        items: [
          { type: "text",  text: "Say slowly:" },
          { type: "quote", text: "What I observed is not the same as what it means." },
          { type: "text",  text: "Then say:" },
          { type: "quote", text: "I can respond to what happened. I don't have to respond to what I fear it means." },
          { type: "text",  text: "Repeat each phrase 2–3 times, calmly and clearly." },
        ],
      },
      {
        title: "3. Re-anchor in your own life",
        goal: "Return attention to your own tasks and stability instead of spending mental energy monitoring the relationship.",
        when: "Immediately after the breathing step, especially if the interaction changed your mood or shifted your plans.",
        items: [
          { type: "text", text: "Walk for 10 minutes." },
          { type: "text", text: "Name one thing you need to do today that has nothing to do with this relationship." },
          { type: "text", text: "Do that thing before returning to any emotionally charged conversation." },
        ],
      },
      {
        title: "4. Delay emotionally loaded responses",
        goal: "Break the pattern where you respond from activation rather than from clarity.",
        when: "Whenever an interaction feels disproportionately heavy, confusing, or urgent.",
        items: [
          { type: "text", text: "Do not answer or address it immediately." },
          { type: "text", text: "Let at least a few hours pass." },
          { type: "text", text: "If the activation is strong, wait until the next day." },
        ],
      },
      {
        title: "5. Use a shorter response than you want to give",
        goal: "Stop over-explaining, justifying yourself, or trying to fix the dynamic through more words.",
        when: "If you decide to respond at all.",
        items: [
          { type: "text", text: "Respond briefly and clearly." },
          { type: "text", text: "Do not explain your intentions at length." },
          { type: "text", text: "Do not try to prove your value, your effort, or your patience." },
        ],
      },
      {
        title: "6. What to observe over the next 2–3 weeks",
        goal: "Evaluate the pattern by behavior, not by the quality of the last interaction.",
        when: "Over the next 2–3 weeks.",
        items: [
          { type: "text", text: "Does stability in the dynamic depend mostly on your effort to maintain it?" },
          { type: "text", text: "Do conflicts get resolved, or do they get buried and return?" },
          { type: "text", text: "Do you feel more like yourself when there is distance, or less?" },
        ],
      },
      {
        title: "7. If you slip into the old pattern",
        goal: "Prevent one reactive moment from resetting everything.",
        when: "If you already over-explained, pursued, or tried to fix things in the way you were trying to stop.",
        items: [
          { type: "text",  text: "Stop after that interaction." },
          { type: "text",  text: "Do 5 more cycles of 4–6 breathing." },
          { type: "quote", text: "This is activation. Not an emergency." },
          { type: "text",  text: "Return to your day instead of analyzing the exchange further." },
        ],
      },
    ],
    closing:
      "This protocol is for stabilization. It helps you reduce reactivity, regain your footing, and stop reinforcing a cycle through automatic responses. If the same patterns keep returning regardless of your effort, you need the full exit protocol.",
  },

  hard: {
    productName: "Current Relationship Checkup — Exit Protocol",
    paypalDescription: "Current Relationship Checkup + Exit Protocol access",
    title: "Exit Protocol",
    subtitle:
      "For cases where the dynamic is chronically unstable, boundaries are repeatedly crossed, and the pattern shows no sign of changing on its own.",
    intro:
      "The goal of this protocol is to help you stop absorbing the instability of a dynamic that is no longer sustainable. Not to assign blame. Not to force a decision. To bring your nervous system back to a baseline where you can actually think clearly — and then decide what you want to do from that place.",
    blocks: [
      {
        title: "Block 1. 4–6 Breathing with feet on the floor",
        goal: "Shift into a parasympathetic state before doing anything else.",
        when: "Every morning and immediately after any destabilizing interaction — a fight, a cold response, a boundary being crossed, a confusing message.",
        items: [
          { type: "text", text: "Sit upright, feet flat on the floor, feel the pressure of your heels and toes." },
          { type: "text", text: "Do 10–15 breathing cycles:" },
          { type: "sub",  text: "inhale for a count of 4 through the nose," },
          { type: "sub",  text: "short pause for 1–2 counts," },
          { type: "sub",  text: "exhale for a count of 6 through the mouth." },
        ],
        why: [
          "Lengthening the exhale lowers overall sympathetic arousal.",
          "Grounding your feet signals to the body 'I am here, I am stable' — not 'I need to fix this right now'.",
        ],
      },

      {
        title: "Block 2. Drawing the line between their world and yours",
        goal: "Separate their instability from your sense of self. You are not abandoning empathy — you are stopping the confusion between their pattern and your responsibility.",
        when: "Every morning after breathing.",
        items: [
          { type: "text",  text: "Imagine a clear boundary between your life and theirs." },
          { type: "text",  text: "On one side: their emotional state, their reactions, their choices, their consequences." },
          { type: "text",  text: "On your side: your body, your time, your attention, your plans." },
          { type: "text",  text: "Say slowly and clearly:" },
          { type: "quote", text: "Their pattern is not a verdict on me. Their instability is not mine to absorb. What I can work with is only what is on my side." },
        ],
        why: [
          "You start to see clearly which part of the weight is actually yours — and which you have been carrying by habit.",
        ],
      },

      {
        title: "Block 3. Grounding + walking (15 minutes)",
        goal: "Bring your attention back to your body, your space, your day.",
        when: "After the boundary-drawing step.",
        items: [
          { type: "text", text: "Walk for 10–15 minutes at a calm pace, ideally somewhere quiet." },
          { type: "text", text: "Keep a light 4–6 breathing rhythm as you walk, but without counting." },
          { type: "text", text: "Consciously notice 5 anchors as you move:" },
          { type: "sub",  text: "5 things you can see;" },
          { type: "sub",  text: "4 sounds you can hear;" },
          { type: "sub",  text: "3 physical sensations (how your feet touch the ground, how your shoulders feel, the air on your skin);" },
          { type: "sub",  text: "2 smells or tastes;" },
          { type: "sub",  text: "1 question: 'What do I actually want for myself today?'" },
        ],
      },

      {
        title: "Block 4. Releasing the physical load",
        goal: "Give your body a controlled outlet for the adrenaline and cortisol that chronic relational stress builds up — instead of turning it inward or discharging it on the other person.",
        when: "After grounding, whenever you feel either agitation and tension, or numbness and depletion.",
        items: [
          { type: "subheader", text: "Adrenaline — body is in fight-or-run mode." },
          { type: "text",      text: "Typical signs:" },
          { type: "sub",       text: "tight jaw, urge to clench teeth;" },
          { type: "sub",       text: "shoulders and arms feel charged;" },
          { type: "sub",       text: "choppy breathing, urge to pace or send a sharp message." },
          { type: "text",      text: "Hand squeeze:" },
          { type: "sub",       text: "clench your fists as hard as you can for 20 seconds," },
          { type: "sub",       text: "release fully for 20 seconds;" },
          { type: "sub",       text: "repeat 3 times." },
          { type: "text",      text: "Full-body tension release:" },
          { type: "sub",       text: "stand straight, feet pressed into the floor;" },
          { type: "sub",       text: "inhale and tense your whole body at once: legs, arms, back, core, jaw;" },
          { type: "sub",       text: "hold for 30 seconds;" },
          { type: "sub",       text: "exhale and release everything at once." },
          { type: "subheader", text: "Cortisol — chronic stress, depletion." },
          { type: "text",      text: "Typical signs:" },
          { type: "sub",       text: "heaviness, emotional flatness;" },
          { type: "sub",       text: "brain fog, hard to focus;" },
          { type: "sub",       text: "low-grade anxiety that doesn't go away;" },
          { type: "sub",       text: "craving distraction, drama, or stimulation just to feel something." },
          { type: "text",      text: "For cortisol — physical exercise:" },
          { type: "sub",       text: "15–30 minutes of something that genuinely raises your heart rate: brisk walking, squats, push-ups, interval circuits;" },
          { type: "sub",       text: "sauna or hot steam room if available and medically appropriate;" },
          { type: "sub",       text: "cold shower or cold exposure, done calmly and intentionally." },
          { type: "text",      text: "The sequence in this protocol is always:" },
          { type: "sub",       text: "first: breathing + line-drawing + grounding;" },
          { type: "sub",       text: "then, if you are wired or depleted: add the relevant physical release." },
        ],
      },

      {
        title: "Block 5. Fast interception during the day",
        goal: "Interrupt the wave when memory, a message, or the pull of the dynamic hits again between sessions.",
        when: "Any time during the day a wave hits — you replay a conversation, feel the pull to check their status, feel sudden anxiety or numbness. These waves come in phases of 20–30 minutes; at first several times a day, then less often.",
        items: [
          { type: "text",      text: "Mini 4–6 breathing — 5–10 cycles:" },
          { type: "sub",       text: "inhale 4, pause 1–2, exhale 6." },
          { type: "text",      text: "Make sure the exhale is consciously slower than the inhale." },
          { type: "subheader", text: "Grounding phrases:" },
          { type: "text",      text: "Option A — for deeper moments:" },
          { type: "quote",     text: "Their pattern is not a verdict on me. Their instability is not mine to absorb. What I can work with is only what is on my side." },
          { type: "text",      text: "Option B — for quick interruption:" },
          { type: "quote",     text: "This is activation. Not reality." },
          { type: "text",      text: "Say it out loud, in a whisper, or silently — 2–3 times, slowly." },
          { type: "text",      text: "Each time: phrase on the exhale, breathing on the inhale." },
          { type: "text",      text: "Goal: bring your attention out of the loop and back into your body and your current moment." },
        ],
      },

      {
        title: "Block 6. Do not respond during the wave",
        goal: "Stop reacting from the stress loop rather than from a clear, grounded choice.",
        when: "Whenever an interaction — message, call, argument — triggers a strong physical or emotional wave.",
        items: [
          { type: "subheader", text: "Rule:" },
          { type: "sub",       text: "do not respond until the wave has passed;" },
          { type: "sub",       text: "ideally wait 24–48 hours until your thinking feels clear, not foggy." },
          { type: "subheader", text: "If they contact you:" },
          { type: "sub",       text: "first — breathing, line-drawing, grounding, physical release if needed;" },
          { type: "sub",       text: "then — at least 24 hours;" },
          { type: "sub",       text: "only then — decide whether and how to respond." },
          { type: "text",      text: "A response sent during the wave is almost never the response you would choose from clarity." },
        ],
      },

      {
        title: "Block 7. If you slip",
        goal: "Treat a slip as information about the load — not as a reason to abandon the process.",
        when: "If you already reacted, over-explained, pursued, or got pulled back into the old dynamic.",
        items: [
          { type: "subheader", text: "Notice it without judgment:" },
          { type: "quote",     text: "I reacted. That tells me the load is higher than I realized." },
          { type: "text",      text: "Immediately after: return to 4–6 breathing for 5–10 cycles." },
          { type: "subheader", text: "Do not extend the exchange:" },
          { type: "sub",       text: "no follow-up messages to explain the slip," },
          { type: "sub",       text: "no emotional rescue mode." },
          { type: "subheader", text: "Say clearly, out loud or internally:" },
          { type: "quote",     text: "This is activation. Not a verdict." },
          { type: "text",      text: "Then return to the protocol and continue." },
          { type: "text",      text: "A slip is part of the process. It is not the end of the process." },
        ],
      },

      {
        title: "Block 8. The realistic timeframe",
        goal: "Set honest expectations about how long it takes to break out of a chronic stress pattern.",
        when: "From the very beginning of working with this protocol.",
        items: [
          { type: "text", text: "Breaking a chronic relational stress pattern typically takes 3–5 weeks of consistent daily practice." },
          { type: "text", text: "This means: every day — breathing, line-drawing, grounding, physical release." },
          { type: "text", text: "The first 7–10 days are the hardest. The pull will feel strongest here." },
          { type: "text", text: "After that it weakens, but returns in waves — that is normal. Use Block 5 when it does." },
          { type: "text", text: "During this period: reduce voluntary exposure to triggers — checking their activity, re-reading conversations, asking mutual contacts about them." },
          { type: "text", text: "The goal is not to decide anything. The goal is to get clear enough to know what you actually want." },
        ],
      },
    ],
    closing:
      "This protocol is for stabilization under high load. It is not a verdict on the relationship. It gives your nervous system the space to step out of the chronic stress loop — so that whatever you decide next, you decide it from clarity, not from exhaustion.",
  },
};
