// lib/quizData.js

export const quizQuestions = {
  q1: {
    id: "situation",
    question: "What best describes your situation?",
    options: [
      {
        id: "current-unclear",
        text: "I'm in a relationship and something feels off",
        next: "q2-current",
      },
      {
        id: "pattern-repeat",
        text: "I keep seeing the same patterns repeat",
        next: "q2-pattern",
      },
      {
        id: "someone-behavior",
        text: "I'm trying to understand someone's behavior",
        next: "q2-behavior",
      },
      {
        id: "past-reflect",
        text: "I'm reflecting on a past relationship",
        next: "q2-past",
      },
    ],
  },
  "q2-current": {
    id: "current-issue",
    question: "What feels most confusing right now?",
    options: [
      {
        id: "trust-signals",
        text: "I can't tell if they're genuinely interested",
        result: "current-trust",
      },
      {
        id: "one-sided",
        text: "Things feel one-sided or imbalanced",
        result: "current-reciprocity",
      },
      {
        id: "inconsistent",
        text: "Their behavior is inconsistent or confusing",
        result: "current-mixed",
      },
      {
        id: "controlled",
        text: "I feel controlled, dismissed, or small",
        result: "current-control",
      },
    ],
  },
  "q2-pattern": {
    id: "pattern-type",
    question: "Which pattern feels most familiar?",
    options: [
      {
        id: "breakup-cycle",
        text: "Breaking up and getting back together repeatedly",
        result: "pattern-breakup",
      },
      {
        id: "backup-plan",
        text: "Feeling like someone's backup option",
        result: "pattern-option",
      },
      {
        id: "vanish",
        text: "People disappearing without explanation",
        result: "pattern-exit",
      },
      {
        id: "third-person",
        text: "Ambiguous situations with third parties",
        result: "pattern-third",
      },
    ],
  },
  "q2-behavior": {
    id: "behavior-focus",
    question: "What aspect of their behavior confuses you most?",
    options: [
      {
        id: "words-actions",
        text: "Their words don't match their actions",
        result: "behavior-trust",
      },
      {
        id: "hot-cold",
        text: "They go hot and cold unpredictably",
        result: "behavior-mixed",
      },
      {
        id: "no-effort",
        text: "They don't seem to put in effort",
        result: "behavior-reciprocity",
      },
      {
        id: "controlling",
        text: "They seem controlling or dominating",
        result: "behavior-control",
      },
    ],
  },
  "q2-past": {
    id: "past-focus",
    question: "What are you trying to understand?",
    options: [
      {
        id: "why-repeat",
        text: "Why the same dynamic keeps happening",
        result: "past-pattern",
      },
      {
        id: "red-flags",
        text: "What signals I missed or ignored",
        result: "past-signals",
      },
      {
        id: "why-stayed",
        text: "Why I stayed longer than I should have",
        result: "past-stayed",
      },
      {
        id: "closure",
        text: "Making sense of how it ended",
        result: "past-exit",
      },
    ],
  },
};

export const testRecommendations = {
  // Current relationship issues
  "current-trust": {
    primary: "trust-their-signals",
    secondary: ["mixed-signals", "current-relationship"],
    message:
      "Start by checking whether their signals are clear and consistent, or if you're working with ambiguous data.",
  },
  "current-reciprocity": {
    primary: "current-relationship",
    secondary: ["you-are-an-option"],
    message:
      "Check the overall balance in your relationship and whether effort flows both ways.",
  },
  "current-mixed": {
    primary: "mixed-signals",
    secondary: ["trust-their-signals", "current-relationship"],
    message:
      "Start by examining whether the mixed signals are real or a pattern you're bringing to the situation.",
  },
  "current-control": {
    primary: "hyper-controlling-parent",
    secondary: ["current-relationship"],
    message:
      "This test helps identify controlling patterns, even in romantic relationships.",
  },

  // Repeating patterns
  "pattern-breakup": {
    primary: "repeating-breakup",
    secondary: ["current-relationship", "mixed-signals"],
    message:
      "Understand why the cycle repeats and what would need to change for it to stop.",
  },
  "pattern-option": {
    primary: "you-are-an-option",
    secondary: ["current-relationship", "trust-their-signals"],
    message:
      "Check whether you're chosen or just convenient, and what that pattern looks like.",
  },
  "pattern-exit": {
    primary: "silent-exit",
    secondary: ["trust-their-signals", "mixed-signals"],
    message:
      "Understand the pattern of people leaving without explanation and what it signals.",
  },
  "pattern-third": {
    primary: "third-person-grey-zone",
    secondary: ["trust-their-signals", "you-are-an-option"],
    message:
      "Navigate the ambiguity when a third person complicates the dynamic.",
  },

  // Understanding behavior
  "behavior-trust": {
    primary: "trust-their-signals",
    secondary: ["mixed-signals", "current-relationship"],
    message:
      "Focus on whether their behavior is consistent enough to trust, or if the gap is a pattern.",
  },
  "behavior-mixed": {
    primary: "mixed-signals",
    secondary: ["trust-their-signals", "repeating-breakup"],
    message:
      "Identify whether the inconsistency is real or your interpretation of normal variation.",
  },
  "behavior-reciprocity": {
    primary: "current-relationship",
    secondary: ["you-are-an-option", "trust-their-signals"],
    message:
      "Check whether effort is genuinely imbalanced or if your expectations need calibration.",
  },
  "behavior-control": {
    primary: "hyper-controlling-parent",
    secondary: ["current-relationship"],
    message:
      "This dynamic often shows up in romantic relationships, not just family systems.",
  },

  // Past relationships
  "past-pattern": {
    primary: "current-relationship",
    secondary: ["repeating-breakup", "trust-their-signals"],
    message:
      "Use this to examine the structural patterns that repeat, not just the specific person.",
  },
  "past-signals": {
    primary: "trust-their-signals",
    secondary: ["mixed-signals", "you-are-an-option"],
    message:
      "Identify what signals were present that you might have overlooked or explained away.",
  },
  "past-stayed": {
    primary: "current-relationship",
    secondary: ["hyper-controlling-parent", "you-are-an-option"],
    message:
      "Understand what kept you in a dynamic that wasn't working.",
  },
  "past-exit": {
    primary: "silent-exit",
    secondary: ["trust-their-signals", "mixed-signals"],
    message:
      "Make sense of how and why they left, and what pattern it follows.",
  },
};

export const testMeta = {
  "current-relationship": {
    title: "Current Relationship Test",
    description: "Overall assessment of relationship dynamics and balance",
  },
  "trust-their-signals": {
    title: "Trust Their Signals",
    description: "Check if behavior matches words and signals are consistent",
  },
  "mixed-signals": {
    title: "Mixed Signals Test",
    description: "Identify whether confusion comes from them or your reading",
  },
  "you-are-an-option": {
    title: "You Are An Option",
    description: "Check if you're chosen or just convenient",
  },
  "repeating-breakup": {
    title: "Repeating Breakup Pattern",
    description: "Understand cycles of breaking up and reconciling",
  },
  "silent-exit": {
    title: "Silent Exit Pattern",
    description: "Make sense of people leaving without explanation",
  },
  "third-person-grey-zone": {
    title: "Third Person Grey Zone",
    description: "Navigate ambiguity when a third person is involved",
  },
  "hyper-controlling-parent": {
    title: "Hyper-Controlling Parent",
    description: "Identify controlling patterns in any close relationship",
  },
};
