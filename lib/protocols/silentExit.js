export const silentExitProtocols = {
  soft: {
    productName: "Silent Exit — Awareness Protocol",
    paypalDescription: "Silent Exit + Awareness Protocol access",
    title: "Awareness Protocol",
    subtitle:
      "For cases where the early signs of drift are visible — reduced presence, less emotional sharing, topics being avoided — but the pattern is not yet fully advanced.",
    intro:
      "The goal of this protocol is not to force a conversation or to panic. The goal is to stop pretending that nothing is shifting when something clearly is. Quiet drift moves slowly enough that it's easy to normalize — until one day the distance feels permanent. This protocol helps you see what's actually happening, and decide what you want to do about it before the window closes.",
    blocks: [
      {
        title: "1. Name what you are actually noticing",
        goal: "Stop suppressing the signal that something has changed.",
        when: "Any time you catch yourself explaining away the distance — 'they're just busy', 'it's a phase', 'it'll go back to normal'.",
        items: [
          { type: "text",  text: "Stop. Do 5–10 cycles of 4–6 breathing: inhale for 4 counts, exhale for 6." },
          { type: "text",  text: "Then complete this sentence honestly:" },
          { type: "quote", text: "What I've been noticing for the past few weeks is ___. And I've been telling myself it's fine because ___." },
          { type: "text",  text: "Write it down. The second blank is usually where the normalization lives." },
        ],
      },
      {
        title: "2. Separate drift from a rough patch",
        goal: "Distinguish between temporary stress and a structural change in how present they are.",
        when: "After naming what you've noticed.",
        items: [
          { type: "subheader", text: "A rough patch looks like:" },
          { type: "sub",       text: "reduced presence due to a specific external stressor (work, family, health);" },
          { type: "sub",       text: "difficulty being available right now, but still reaching toward you when they can;" },
          { type: "sub",       text: "able to talk about what's happening when you ask." },
          { type: "subheader", text: "Drift looks like:" },
          { type: "sub",       text: "reduced presence that isn't tied to anything specific — it's just become the baseline;" },
          { type: "sub",       text: "less initiation, less sharing, less interest — across multiple areas at once;" },
          { type: "sub",       text: "hard topics consistently avoided or shut down." },
          { type: "text",      text: "Which column does your log look more like?" },
        ],
      },
      {
        title: "3. Re-anchor in what you actually want",
        goal: "Return to your own needs and standards before deciding how to respond.",
        when: "After the separation step.",
        items: [
          { type: "text",  text: "Walk for 10 minutes." },
          { type: "text",  text: "While walking, ask slowly:" },
          { type: "quote", text: "If nothing changes in the next 3 months — the same level of presence, the same emotional distance — is this a relationship I want to be in?" },
          { type: "text",  text: "The answer to that question is the most important information you have right now." },
        ],
      },
      {
        title: "4. Create one moment of real contact",
        goal: "Test whether genuine connection is still accessible — not force it, just test it.",
        when: "Once, in a calm moment when you are both present.",
        items: [
          { type: "text",  text: "Choose a moment when there is no tension and no time pressure." },
          { type: "text",  text: "Say something real — not a complaint, not a question about the relationship, but something you actually feel or think." },
          { type: "text",  text: "Notice what happens. Not just what they say — how they receive it. Are they present? Do they lean in? Or does it land and fade?" },
          { type: "quote", text: "I'm not looking for a perfect response. I'm looking for a sign that someone is still there." },
        ],
      },
      {
        title: "5. What to watch for over the next 2–3 weeks",
        goal: "Evaluate the pattern by behavior across time, not by the mood of the last evening.",
        when: "Over the next 2–3 weeks.",
        items: [
          { type: "text", text: "Does the drift continue at the same pace, or does something shift?" },
          { type: "text", text: "Do they initiate contact, plans, or meaningful conversation — or does that always come from you?" },
          { type: "text", text: "When you create a moment of real contact, does it land — or does it disappear?" },
        ],
      },
      {
        title: "6. If you feel the urge to push harder",
        goal: "Prevent the anxiety of drift from turning into over-pursuit that accelerates the distance.",
        when: "Whenever you feel the urge to fill the silence, to chase, or to make more effort to compensate for their withdrawal.",
        items: [
          { type: "text",  text: "Stop. Do 5–10 cycles of 4–6 breathing." },
          { type: "quote", text: "More effort from me is not the same as more connection between us. If the drift is real, chasing it won't reverse it." },
          { type: "text",  text: "Return to your log. What does the pattern show? One good evening doesn't change the direction of weeks." },
        ],
      },
    ],
    closing:
      "This protocol is for awareness. It helps you stop normalizing what you're noticing and stay honest with yourself about what is actually changing. If the drift continues or deepens despite your attempts at real contact, you need the full exit protocol.",
  },

  hard: {
    productName: "Silent Exit — Exit Protocol",
    paypalDescription: "Silent Exit + Exit Protocol access",
    title: "Exit Protocol",
    subtitle:
      "For cases where the drift is advanced — presence is mostly gone, emotional connection is flat, and the relationship is running on habit and avoidance more than on actual choice.",
    intro:
      "The goal of this protocol is to help you stop waiting for a relationship to come back that has already, in most of the ways that matter, ended. Not to make a decision right now. Not to force a confrontation. To bring your nervous system back to a stable enough place that you can see clearly what is actually here — and what isn't.",
    blocks: [
      {
        title: "Block 1. 4–6 Breathing with feet on the floor",
        goal: "Shift into a parasympathetic state before doing anything else.",
        when: "Every morning and immediately after any moment that activates the grief or anxiety of the drift — a silent evening, a moment of disconnection, a realization of how long things have been like this.",
        items: [
          { type: "text", text: "Sit upright, feet flat on the floor, feel the pressure of your heels and toes." },
          { type: "text", text: "Do 10–15 breathing cycles:" },
          { type: "sub",  text: "inhale for a count of 4 through the nose," },
          { type: "sub",  text: "short pause for 1–2 counts," },
          { type: "sub",  text: "exhale for a count of 6 through the mouth." },
        ],
        why: [
          "Silent drift creates a particular kind of exhaustion — not the acute pain of a fight, but the chronic weight of being next to someone who is no longer fully there. Breathing down-regulates that chronic stress state.",
        ],
      },

      {
        title: "Block 2. Separating the relationship from the habit of it",
        goal: "Distinguish between still being in a relationship and just not having left one.",
        when: "Every morning after breathing.",
        items: [
          { type: "text",  text: "Write down, in two columns:" },
          { type: "sub",   text: "What is still here — concrete, present, real moments of connection in the last 2 weeks." },
          { type: "sub",   text: "What is gone or mostly gone — presence, initiation, emotional sharing, real conversation." },
          { type: "text",  text: "Hold both columns and say slowly:" },
          { type: "quote", text: "Staying together out of habit, fear of the conversation, or hope for what it used to be is not the same as being in a relationship. I am allowed to see the difference." },
        ],
        why: [
          "Silent drift is sustained by the difficulty of naming what is happening. This step makes it concrete enough to work with.",
        ],
      },

      {
        title: "Block 3. Grounding + walking (15 minutes)",
        goal: "Bring your attention back to your body, your space, and your life outside the drift.",
        when: "After the separation step, and whenever the grief, numbness, or restlessness of the drift hits.",
        items: [
          { type: "text", text: "Walk for 10–15 minutes at a calm pace, ideally outside." },
          { type: "text", text: "Keep a light 4–6 breathing rhythm as you walk, but without counting." },
          { type: "text", text: "Consciously notice 5 anchors as you move:" },
          { type: "sub",  text: "5 things you can see;" },
          { type: "sub",  text: "4 sounds you can hear;" },
          { type: "sub",  text: "3 physical sensations (feet on the ground, shoulders, air on skin);" },
          { type: "sub",  text: "2 smells or tastes;" },
          { type: "sub",  text: "1 question: 'What do I actually want my life to feel like — and does what I have now point in that direction?'" },
        ],
      },

      {
        title: "Block 4. Releasing the physical load",
        goal: "Give your body a controlled outlet for the grief, emptiness, and cortisol that long-term relational drift accumulates.",
        when: "After grounding, whenever you feel the particular heaviness of being in a relationship that feels mostly empty.",
        items: [
          { type: "subheader", text: "The particular load of silent drift." },
          { type: "text",      text: "Typical signs:" },
          { type: "sub",       text: "a dull, persistent sadness that doesn't have a clear cause — just presence without connection;" },
          { type: "sub",       text: "emotional flatness, going through motions;" },
          { type: "sub",       text: "low energy, difficulty finding things genuinely interesting or engaging." },
          { type: "text",      text: "What helps:" },
          { type: "sub",       text: "15–30 minutes of physical exercise that genuinely raises your heart rate;" },
          { type: "sub",       text: "cold shower, done deliberately and calmly;" },
          { type: "sub",       text: "one real conversation with someone outside the relationship — let them remind you what being actually seen feels like." },
          { type: "subheader", text: "If there is also anger underneath the numbness:" },
          { type: "text",      text: "Hand squeeze:" },
          { type: "sub",       text: "clench your fists as hard as you can for 20 seconds," },
          { type: "sub",       text: "release fully for 20 seconds;" },
          { type: "sub",       text: "repeat 3 times." },
        ],
      },

      {
        title: "Block 5. Fast interception during the day",
        goal: "Interrupt the grief and rumination loop when it hits between sessions.",
        when: "Any time the weight of the drift hits — a moment of noticing the silence, a memory of how it used to feel, a wave of grief or resignation.",
        items: [
          { type: "text",      text: "Mini 4–6 breathing — 5–10 cycles:" },
          { type: "sub",       text: "inhale 4, pause 1–2, exhale 6." },
          { type: "subheader", text: "Grounding phrases:" },
          { type: "text",      text: "Option A — for deeper moments:" },
          { type: "quote",     text: "Staying out of habit is not the same as choosing this. I am allowed to see what is actually here." },
          { type: "text",      text: "Option B — for quick interruption:" },
          { type: "quote",     text: "This is grief. Not a verdict on me." },
          { type: "text",      text: "Say it 2–3 times, out loud or silently, slowly." },
        ],
      },

      {
        title: "Block 6. The conversation you have been avoiding",
        goal: "Move toward naming what is happening — not as an ultimatum, but as an honest account of what you are experiencing.",
        when: "When you are grounded enough to have it — not from a wave of grief or anger, but from clarity.",
        items: [
          { type: "text",      text: "You are not required to have this conversation immediately." },
          { type: "text",      text: "But at some point, continuing without it means making a choice by not making one." },
          { type: "subheader", text: "When you are ready:" },
          { type: "sub",       text: "choose a calm moment, not after a tense evening or a long silence;" },
          { type: "sub",       text: "name what you have been experiencing — specifically, not as an accusation;" },
          { type: "sub",       text: "listen to what they actually say, not what you hope they'll say." },
          { type: "quote",     text: "The goal is not to fix it in one conversation. The goal is to find out if there is anything left to fix — and whether both people want to." },
        ],
      },

      {
        title: "Block 7. The decision you are building toward",
        goal: "Move toward clarity about what you are willing to stay in — and what you are not.",
        when: "After at least 2–3 weeks of working with this protocol.",
        items: [
          { type: "text",  text: "By now you have a log. Look at it as a whole — not at how you felt last night." },
          { type: "text",  text: "Ask slowly:" },
          { type: "quote", text: "Has anything actually changed — in their presence, in the emotional contact, in whether they are reaching toward me? Or have I just gotten better at living inside the distance?" },
          { type: "text",  text: "Getting better at living inside the distance is not the same as the distance getting smaller." },
          { type: "subheader", text: "When you are ready to decide:" },
          { type: "sub",       text: "decide from a grounded state, not from a wave of grief or a rare warm evening;" },
          { type: "sub",       text: "decide based on the pattern you have logged, not on who they were three years ago;" },
          { type: "sub",       text: "remember: not making a decision is also a decision. Make it consciously." },
        ],
      },

      {
        title: "Block 8. The realistic timeframe",
        goal: "Set honest expectations about how long it takes to get clear inside a long-term drift.",
        when: "From the very beginning of working with this protocol.",
        items: [
          { type: "text", text: "Getting clear inside an advanced drift typically takes 3–5 weeks of consistent daily practice." },
          { type: "text", text: "Every day: breathing, separation step, grounding, physical release." },
          { type: "text", text: "The first 2 weeks are the hardest. The grief of seeing the gap clearly is often more acute than the numb acceptance you've been living in." },
          { type: "text", text: "After that, the picture gets clearer — and the decision, whatever it is, starts to feel more like yours." },
          { type: "text", text: "The goal is not to end the relationship or to save it. The goal is to stop living in the fog of not knowing what you actually have." },
        ],
      },
    ],
    closing:
      "This protocol is not a verdict on the relationship or on either person. It is a tool for getting honest enough to see what is actually happening — so that whatever comes next, you choose it, rather than drift into it.",
  },
};
