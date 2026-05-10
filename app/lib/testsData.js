// =====================================================
// TESTS DATA - централизованное хранилище всех тестов
// =====================================================
// Каждый тест содержит:
// - slug (для URL)
// - metadata (title, description)
// - scenario (для API /api/analyze)
// - protocolScope (для getProtocolTier)
// - questions (форма теста)

export const testsData = [
  {
    slug: "current-relationship",
    title: "Current relationship checkup",
    description: "See how your current dynamic behaves on a structural level, not through isolated episodes.",
    scenario: "current_relationship",
    protocolScope: "current-relationship",
    protocolImportPath: "../../../lib/protocols/currentRelationship",
    protocolExportName: "currentRelationshipProtocols",
    
    questions: [
      {
        name: "duration", // ✅ API expects: duration
        label: "How long has this dynamic been going on?",
        type: "select",
        options: [
          { value: "0_3_months", label: "0–3 months" },
          { value: "3_12_months", label: "3–12 months" },
          { value: "1_3_years", label: "1–3 years" },
          { value: "3_plus_years", label: "3+ years" },
        ],
      },
      {
        name: "initiative", // ✅ API expects: initiative
        label: "Who initiates contact or repair more often?",
        type: "select",
        options: [
          { value: "mostly_me", label: "Mostly me" },
          { value: "mostly_them", label: "Mostly them" },
          { value: "roughly_equal", label: "Roughly equal" },
        ],
      },
      {
        name: "predictability", // ✅ API expects: predictability
        label: "How predictable do their reactions feel?",
        type: "select",
        options: [
          { value: "very_unpredictable", label: "Very unpredictable" },
          { value: "somewhat_unpredictable", label: "Somewhat unpredictable" },
          { value: "mostly_predictable", label: "Mostly predictable" },
          { value: "very_predictable", label: "Very predictable" },
        ],
      },
      {
        name: "boundaries", // ✅ API expects: boundaries
        label: "How often do you feel your boundaries are crossed or pushed?",
        type: "select",
        options: [
          { value: "almost_never", label: "Almost never" },
          { value: "sometimes", label: "Sometimes" },
          { value: "often", label: "Often" },
          { value: "very_often", label: "Very often" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },

  {
    slug: "you-are-an-option",
    title: "You are an option checkup",
    description: "See if you're genuinely chosen or just someone they return to when nothing better is happening.",
    scenario: "you_are_an_option",
    protocolScope: "you-are-an-option",
    protocolImportPath: "../../../lib/protocols/youAreAnOption",
    protocolExportName: "youAreAnOptionProtocols",
    
    questions: [
      {
        name: "initiation", // ✅ API expects: initiation
        label: "How often do they initiate contact or make plans?",
        type: "select",
        options: [
          { value: "rarely", label: "Rarely" },
          { value: "sometimes", label: "Sometimes" },
          { value: "often", label: "Often" },
          { value: "very_often", label: "Very often" },
        ],
      },
      {
        name: "consistency", // ✅ API expects: consistency
        label: "How consistent is their attention and communication?",
        type: "select",
        options: [
          { value: "very_inconsistent", label: "Very inconsistent" },
          { value: "somewhat_inconsistent", label: "Somewhat inconsistent" },
          { value: "mostly_consistent", label: "Mostly consistent" },
          { value: "very_consistent", label: "Very consistent" },
        ],
      },
      {
        name: "planning", // ✅ API expects: planning
        label: "How often do plans get cancelled, postponed, or stay vague?",
        type: "select",
        options: [
          { value: "very_often", label: "Very often" },
          { value: "often", label: "Often" },
          { value: "sometimes", label: "Sometimes" },
          { value: "rarely", label: "Rarely" },
        ],
      },
      {
        name: "priority", // ✅ API expects: priority
        label: "Do you feel like a priority or more like a backup option?",
        type: "select",
        options: [
          { value: "clearly_backup", label: "Clearly a backup" },
          { value: "leaning_backup", label: "Leaning backup" },
          { value: "unclear", label: "Unclear" },
          { value: "mostly_priority", label: "Mostly a priority" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },

  {
    slug: "mixed-signals",
    title: "Mixed signals interest gap",
    description: "Map how consistent their interest really is, beyond words and busy right now.",
    scenario: "mixed_signals_interest_gap", // ✅ API expects: mixed_signals_interest_gap
    protocolScope: "mixed-signals",
    protocolImportPath: "../../../lib/protocols/mixedSignals",
    protocolExportName: "mixedSignalsProtocols",
    
    questions: [
      {
        name: "clarity", // ✅ API expects: clarity
        label: "How clear is your status with this person?",
        type: "select",
        options: [
          { value: "very_clear", label: "Very clear" },
          { value: "somewhat_clear", label: "Somewhat clear" },
          { value: "somewhat_unclear", label: "Somewhat unclear" },
          { value: "very_unclear", label: "Very unclear" },
        ],
      },
      {
        name: "outreach", // ✅ API expects: outreach
        label: "Who reaches out or initiates more?",
        type: "select",
        options: [
          { value: "mostly_me", label: "Mostly me" },
          { value: "mostly_them", label: "Mostly them" },
          { value: "roughly_equal", label: "Roughly equal" },
        ],
      },
      {
        name: "mixed", // ✅ API expects: mixed
        label: "How often do they send mixed signals (warm–cold, vague plans, etc.)?",
        type: "select",
        options: [
          { value: "almost_never", label: "Almost never" },
          { value: "sometimes", label: "Sometimes" },
          { value: "often", label: "Often" },
          { value: "very_often", label: "Very often" },
        ],
      },
      {
        name: "impact", // ✅ API expects: impact
        label: "How strong is the emotional impact of this dynamic on you now?",
        type: "select",
        options: [
          { value: "low", label: "Low" },
          { value: "moderate", label: "Moderate" },
          { value: "high", label: "High" },
          { value: "very_high", label: "Very high" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },

  {
    slug: "repeating-breakup",
    title: "Repeating breakup pattern",
    description: "Look at your breakups as a repeating structure, not just bad luck or wrong people.",
    scenario: "repeating_breakup_pattern", // ✅ API expects: repeating_breakup_pattern
    protocolScope: "repeating-breakup",
    protocolImportPath: "../../../lib/protocols/repeatingBreakup",
    protocolExportName: "repeatingBreakupProtocols",
    
    questions: [
      {
        name: "count", // ✅ API expects: count
        label: "How many times have you been in a relationship that ended in a similar way?",
        type: "select",
        options: [
          { value: "once", label: "Once" },
          { value: "2_3_times", label: "2–3 times" },
          { value: "4_5_times", label: "4–5 times" },
          { value: "more_than_5", label: "More than 5 times" },
        ],
      },
      {
        name: "whoLeaves", // ✅ API expects: whoLeaves
        label: "Who usually initiates the breakup?",
        type: "select",
        options: [
          { value: "mostly_me", label: "Mostly me" },
          { value: "mostly_them", label: "Mostly them" },
          { value: "varies", label: "It varies / hard to say" },
        ],
      },
      {
        name: "pace", // ✅ API expects: pace
        label: "How does the relationship usually feel just before it ends?",
        type: "select",
        options: [
          { value: "sudden_implosion", label: "Feels like a sudden implosion out of nowhere" },
          { value: "slow_fade", label: "Slow fade, growing distance for a while" },
          { value: "on_off_cycles", label: "On/off cycles, many mini-breakups before the final one" },
          { value: "mutually_tired", label: "Mutually tired, both know it is coming" },
        ],
      },
      {
        name: "postContact", // ✅ API expects: postContact
        label: "What usually happens after the breakup?",
        type: "select",
        options: [
          { value: "no_contact", label: "We go no-contact and stay out of touch" },
          { value: "friends_for_while", label: "We stay in contact \"as friends\" for a while" },
          { value: "keep_reconnecting", label: "We keep texting / meeting and sometimes get back together" },
          { value: "hovering", label: "They keep hovering around, I struggle to fully detach" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },

  {
    slug: "hyper-controlling-parent",
    title: "Hypercontrolling parent pattern",
    description: "Check if what you grew up with was care or control, guilt and humiliation dressed up as love.",
    scenario: "hyper_controlling_parent", // ✅ correct
    protocolScope: "hyper-controlling-parent",
    protocolImportPath: "../../../lib/protocols/hyperControllingParent",
    protocolExportName: "hyperControllingParentProtocols",
    
    questions: [
      {
        name: "emotional_tone", // ✅ API expects: emotional_tone
        label: "What was the usual emotional tone from the parent you're thinking about?",
        type: "select",
        options: [
          { value: "warm_occasional_criticism", label: "Mostly warm, with occasional criticism or tension" },
          { value: "warm_but_controlling", label: "Warm but controlling: \"I love you, so you must do it my way\"" },
          { value: "cold_critical_shaming", label: "Often cold, critical, shaming or mocking" },
        ],
      },
      {
        name: "autonomy", // ✅ API expects: autonomy
        label: "How much autonomy did you have in everyday decisions (clothes, friends, hobbies, schedule)?",
        type: "select",
        options: [
          { value: "very_little", label: "Very little: most choices were decided or \"approved\" by them" },
          { value: "some_autonomy", label: "Some autonomy, but big or \"important\" choices were tightly controlled" },
          { value: "a_lot", label: "A lot: I could experiment and make my own choices, even if they disagreed" },
        ],
      },
      {
        name: "privacy", // ✅ API expects: privacy
        label: "How did they treat your privacy (room, phone, diary, messages)?",
        type: "select",
        options: [
          { value: "no_privacy", label: "No real privacy: checking, reading, or bursting in was normal" },
          { value: "conditional_privacy", label: "Conditional privacy: they could invade it \"for your own good\"" },
          { value: "mostly_respected", label: "Mostly respected my space and boundaries" },
        ],
      },
      {
        name: "punishment_pattern", // ✅ API expects: punishment_pattern
        label: "What happened when you didn't obey or had your own opinion?",
        type: "select",
        options: [
          { value: "guilt_shame", label: "Guilt / shame: \"you're ungrateful\", \"you hurt me\"" },
          { value: "anger_threats", label: "Anger, lectures, threats, or control over money / freedom" },
          { value: "calm_discussion", label: "Calm discussion and clear limits without humiliation" },
        ],
      },
      {
        name: "current_effect", // ✅ API expects: current_effect
        label: "How do you feel this still affects your current relationships?",
        type: "select",
        options: [
          { value: "over_adapt", label: "I over‑adapt, scan for other people's moods, try not to upset anyone" },
          { value: "tolerate_control", label: "I tolerate controlling or disrespectful behavior longer than I want to" },
          { value: "strong_rebellion", label: "I go into strong rebellion or cut‑offs when I feel any control" },
          { value: "some_echoes", label: "I notice some echoes, but it doesn't drive my relationships" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },

  {
    slug: "third-person-grey-zone",
    title: "Third person in the grey zone",
    description: "See how much risk of a triangle you're living with through just a friend or a secret chat.",
    scenario: "third_person_grey_zone", // ✅ correct
    protocolScope: "third-person-grey-zone",
    protocolImportPath: "../../../lib/protocols/thirdPersonGreyZone",
    protocolExportName: "thirdPersonGreyZoneProtocols",
    
    questions: [
      {
        name: "third_role", // ✅ API expects: third_role
        label: "Who is this third person for your partner / for you?",
        type: "select",
        options: [
          { value: "old_friend", label: "Old friend or colleague (no clear romantic history)" },
          { value: "ex_partner", label: "Ex‑partner / ex‑situationship (history of romantic or sexual connection)" },
          { value: "new_friend", label: "New \"friend\" / person they recently got close to" },
          { value: "unclear_status", label: "Someone I don't fully understand the status of" },
        ],
      },
      {
        name: "secrecy_level", // ✅ API expects: secrecy_level
        label: "How much secrecy or hidden communication is around this person?",
        type: "select",
        options: [
          { value: "high_secrecy", label: "High secrecy: deleting chats, hiding screens, vague about meetings" },
          { value: "medium_secrecy", label: "Medium secrecy: not exactly hiding, but also not really open" },
          { value: "low_secrecy", label: "Low secrecy: I broadly know when and how they talk" },
          { value: "open", label: "Open: I'm invited in, nothing feels hidden" },
        ],
      },
      {
        name: "comparison_frequency", // ✅ API expects: comparison_frequency
        label: "How often does comparison show up (directly or indirectly)?",
        type: "select",
        options: [
          { value: "frequently", label: "Frequently: I feel compared or replaced in subtle ways" },
          { value: "occasionally", label: "Occasionally: small comments or hints" },
          { value: "rarely", label: "Rarely: almost never comes up" },
          { value: "no_comparisons", label: "No comparisons that I notice" },
        ],
      },
      {
        name: "boundary_clarity", // ✅ API expects: boundary_clarity
        label: "How clear are the boundaries around this third person?",
        type: "select",
        options: [
          { value: "very_blurry", label: "Very blurry: nobody really knows what is allowed or not" },
          { value: "partially_blurry", label: "Partially blurry: some rules, but lots of grey areas" },
          { value: "clear_not_enforced", label: "Clear on paper, but not really enforced in practice" },
          { value: "clear_and_kept", label: "Clear and generally kept by both sides" },
        ],
      },
      {
        name: "emotional_investment", // ✅ API expects: emotional_investment
        label: "How emotionally invested does your partner (or you) seem in this third person?",
        type: "select",
        options: [
          { value: "very_invested", label: "Very invested: lots of emotional energy, venting, or sharing" },
          { value: "moderately", label: "Moderately: important, but not central" },
          { value: "light", label: "Light: casual, surface‑level contact" },
          { value: "minimal", label: "Minimal: doesn't seem emotionally loaded" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },

  {
    slug: "trust-their-signals",
    title: "Can you trust their signals?",
    description: "Test how readable this person really is: clear pattern or just noise you're decoding.",
    scenario: "trust_their_signals", // ✅ correct
    protocolScope: "trust-their-signals",
    protocolImportPath: "../../../lib/protocols/trustTheirSignals",
    protocolExportName: "trustTheirSignalsProtocols",
    
    questions: [
      {
        name: "clarity_in_conflict", // ✅ API expects: clarity_in_conflict
        label: "When there is tension or conflict, how clear are their signals?",
        type: "select",
        options: [
          { value: "withdraw_or_attack", label: "They either withdraw or attack; I have no idea what they actually feel" },
          { value: "mixed", label: "Mixed: some honest signals, some games or shutdowns" },
          { value: "mostly_clear", label: "Mostly clear: I can understand what's going on even if it's uncomfortable" },
        ],
      },
      {
        name: "clarity_about_intentions", // ✅ API expects: clarity_about_intentions
        label: "How clearly do they communicate their intentions about this relationship?",
        type: "select",
        options: [
          { value: "very_vague", label: "Very vague: avoid labels, future talk, or any clear position" },
          { value: "story_changes", label: "Story changes depending on mood / context" },
          { value: "mostly_consistent", label: "Mostly consistent and understandable, even if not ideal" },
        ],
      },
      {
        name: "reliability_of_promises", // ✅ API expects: reliability_of_promises
        label: "How reliable are their promises and stated plans?",
        type: "select",
        options: [
          { value: "often_broken", label: "Often broken or quietly forgot" },
          { value: "sometimes_kept", label: "Sometimes kept, sometimes not — hard to predict" },
          { value: "usually_kept", label: "Usually kept; if something changes, they tell me directly" },
        ],
      },
      {
        name: "reaction_to_questions", // ✅ API expects: reaction_to_questions
        label: "What happens when you ask for clarity about their behavior?",
        type: "select",
        options: [
          { value: "defensive_flip", label: "They get defensive, flip it on me, or make me feel crazy" },
          { value: "partial_answers", label: "Give partial answers, change topic, or joke it away" },
          { value: "open_direct", label: "Open and direct: may need time, but they answer honestly" },
        ],
      },
      {
        name: "gut_feeling", // ✅ API expects: gut_feeling
        label: "If you ignore words for a moment and scan your body, how does it feel to rely on their signals?",
        type: "select",
        options: [
          { value: "constantly_on_edge", label: "Constantly on edge: waiting for next turn in the story" },
          { value: "mixed_safety", label: "Mixed: some safety, some anxiety that doesn't go away" },
          { value: "mostly_safe", label: "Mostly safe: my system can rest between conflicts" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },

  {
    slug: "after-breach-of-trust",
    title: "After a serious breach of trust",
    description: "See whether the relationship is actually healing or just frozen around the wound.",
    scenario: "after_breach_of_trust", // ✅ correct
    protocolScope: "after-breach-of-trust",
    protocolImportPath: "../../../lib/protocols/afterBreachOfTrust",
    protocolExportName: "afterBreachOfTrustProtocols",
    
    questions: [
      {
        name: "type_of_breach", // ✅ API expects: type_of_breach
        label: "What kind of breach are you primarily thinking about?",
        type: "select",
        options: [
          { value: "sexual_romantic_infidelity", label: "Sexual or romantic infidelity" },
          { value: "major_lie", label: "Major lie or ongoing deception" },
          { value: "financial_betrayal", label: "Financial betrayal (hidden debt, spending, or decisions)" },
          { value: "other_breach", label: "Other breach of trust that changed how you see them" },
        ],
      },
      {
        name: "time_since_breach", // ✅ API expects: time_since_breach
        label: "How long ago did this breach become known?",
        type: "select",
        options: [
          { value: "under_3_months", label: "Less than 3 months ago" },
          { value: "3_12_months", label: "3–12 months ago" },
          { value: "1_3_years", label: "1–3 years ago" },
          { value: "over_3_years", label: "More than 3 years ago" },
        ],
      },
      {
        name: "accountability", // ✅ API expects: accountability
        label: "How does the person who broke trust relate to what happened now?",
        type: "select",
        options: [
          { value: "minimises_shifts_blame", label: "Often minimises, gets defensive, or shifts blame to me / context" },
          { value: "sometimes_responsible", label: "Sometimes takes responsibility, sometimes backs away from it" },
          { value: "clearly_responsible", label: "Clearly takes responsibility and doesn't rewrite the story" },
        ],
      },
      {
        name: "repair_behavior", // ✅ API expects: repair_behavior
        label: "What has repair looked like in practice?",
        type: "select",
        options: [
          { value: "words_no_change", label: "Lots of words, but no real change in behaviour or transparency" },
          { value: "some_change_repetition", label: "Some concrete changes, but also repetition or secrecy" },
          { value: "consistent_change", label: "Consistent change, more openness, and active work on trust" },
        ],
      },
      {
        name: "symptom_level", // ✅ API expects: symptom_level
        label: "How present are the \"symptoms\" right now (checking, anxiety, flashbacks, fights about it)?",
        type: "select",
        options: [
          { value: "very_intense", label: "Very intense: the breach is still in the centre of the relationship" },
          { value: "moderate", label: "Moderate: comes up regularly, but not all the time" },
          { value: "low_present", label: "Low but present: it flares up at triggers, but not daily" },
          { value: "mostly_integrated", label: "Mostly integrated: it's part of the story, but not driving the present" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },

  {
    slug: "silent-exit",
    title: "Silent exit from the relationship",
    description: "Check if you're still in a living relationship, or if one of you is already quietly checking out.",
    scenario: "silent_exit", // ✅ correct
    protocolScope: "silent-exit",
    protocolImportPath: "../../../lib/protocols/silentExit",
    protocolExportName: "silentExitProtocols",
    
    questions: [
      {
        name: "initiative_level", // ✅ API expects: initiative_level
        label: "Who invests more initiative into contact and shared plans right now?",
        type: "select",
        options: [
          { value: "mostly_me", label: "Mostly me: if I stop, things almost stop" },
          { value: "slightly_more_me", label: "Slightly more me, but they also initiate sometimes" },
          { value: "roughly_balanced", label: "Roughly balanced: both sides still reach toward each other" },
          { value: "mostly_them", label: "Mostly them: they currently carry more of the initiative" },
        ],
      },
      {
        name: "emotional_sharing", // ✅ API expects: emotional_sharing
        label: "How much meaningful emotional sharing is left between you?",
        type: "select",
        options: [
          { value: "almost_none", label: "Almost none: we mostly talk about logistics or neutral topics" },
          { value: "reduced", label: "Reduced: sometimes deeper talks, but much less than before" },
          { value: "moderate", label: "Moderate: still share feelings and inner life fairly regularly" },
          { value: "high", label: "High: emotional sharing is alive, even if we have issues" },
        ],
      },
      {
        name: "future_talk", // ✅ API expects: future_talk
        label: "How do conversations about the future together look right now?",
        type: "select",
        options: [
          { value: "mostly_avoided", label: "Mostly avoided or postponed with vague answers" },
          { value: "minimal_foggy", label: "Minimal and foggy: some mentions, but nothing concrete" },
          { value: "present_careful", label: "Present but careful: we talk about the future with some caution" },
          { value: "active_planning", label: "Active planning: we make real plans and update them together" },
        ],
      },
      {
        name: "time_together_quality", // ✅ API expects: time_together_quality
        label: "When you spend time together, what does it feel like?",
        type: "select",
        options: [
          { value: "disconnected", label: "Disconnected: scrolling, silence, or parallel lives in one space" },
          { value: "mixed", label: "Mixed: some alive moments, some \"roommate mode\"" },
          { value: "mostly_connected", label: "Mostly connected: there is still curiosity and contact" },
        ],
      },
      {
        name: "conflict_engagement", // ✅ API expects: conflict_engagement
        label: "What happens with conflict and difficult topics?",
        type: "select",
        options: [
          { value: "avoid_shutdown", label: "Avoid or shut down: \"I don't want to talk about this\"" },
          { value: "brief_unresolved", label: "Brief talks that don't really resolve anything" },
          { value: "engaged_messy", label: "Engaged but messy: we argue, but at least both are present" },
          { value: "engaged_working", label: "Engaged and working: we can stay in the room and move things slowly" },
        ],
      },
    ],
    
    hasNarrative: true,
    narrativeLabel: "Your story (optional)",
    narrativePlaceholder: "",
  },
];

// Helper function to get test by slug
export function getTestBySlug(slug) {
  return testsData.find(test => test.slug === slug);
}

// Helper to get all test slugs (for static generation)
export function getAllTestSlugs() {
  return testsData.map(test => test.slug);
}
