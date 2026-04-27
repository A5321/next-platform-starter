export function getProtocolTier(scope, result) {
  if (!result || !result.indices) return "none";

  // ====================== CURRENT RELATIONSHIP CHECKUP ======================
  // Protocols: Stabilization (soft) / Exit (hard)
  // Focus: self-regulation for the person experiencing relational instability.
  //
  // Primary filter: overall_risk_level from API
  //   • "Low"      → none  (always, regardless of indices)
  //   • "High"     → hard
  //   • "Moderate" → hard if any index is critical, otherwise soft
  //
  // Indices are 0–1 scale (as returned by the API).
  // Critical thresholds (Moderate → hard):
  //   • pattern_recurrence_probability >= 0.70
  //   • long_term_stability_forecast   <= 0.35
  //   • boundary_violation_probability >= 0.70

  if (scope === "current-relationship") {
    const riskLevel  = (result.overall_risk_level || "").toLowerCase().trim();
    const recurrence = Number(result.indices.pattern_recurrence_probability || 0);
    const stability  = Number(result.indices.long_term_stability_forecast   || 0);
    const boundaries = Number(result.indices.boundary_violation_probability  || 0);

    if (riskLevel === "low") return "none";

    // Hard requires "high"/"elevated" (or any unknown severe label) OR 2+ critical indices
    const criticalCount = [
      recurrence >= 0.85,
      stability  <= 0.30,
      boundaries >= 0.75,
    ].filter(Boolean).length;

    if (riskLevel === "moderate") {
      return criticalCount >= 2 ? "hard" : "soft";
    }

    // "high", "elevated", or any unrecognised label → treat as hard
    return "hard";

    return "none";
  }

  // ====================== HYPER-CONTROLLING PARENT ======================
  // Protocols: Awareness (soft) / Exit (hard)
  // Focus: separating past conditioning from present choices.
  //
  // parental_control_intensity:       0 = supportive, 1 = heavy control
  // current_relationship_echo_score:  0 = no carry-over, 1 = strong echo
  // guilt_shame_pressure_index:       0 = rare/mild, 1 = strong/frequent
  //
  // HARD: control >= 0.75 OR echo >= 0.75 OR guilt >= 0.75
  // SOFT: control >= 0.50 OR echo >= 0.55 OR guilt >= 0.50
  // NONE: everything else
 
  if (scope === "hyper-controlling-parent") {
    const riskLevel = (result.overall_hypercontrol_level || "").toLowerCase().trim();
    const control   = Number(result.indices.parental_control_intensity        || 0);
    const echo      = Number(result.indices.current_relationship_echo_score   || 0);
    const guilt     = Number(result.indices.guilt_shame_pressure_index        || 0);
 
    if (riskLevel === "low") return "none";
    if (riskLevel === "high"     || control >= 0.75 || echo >= 0.75 || guilt >= 0.75) return "hard";
    if (riskLevel === "moderate" || control >= 0.50 || echo >= 0.55 || guilt >= 0.50) return "soft";
    return "none";
  }
  
  // ====================== SILENT EXIT ======================
  // Protocols: Awareness (soft) / Exit (hard)
  // Focus: stopping normalization of drift; getting clear about what is actually here.
  //
  // presence_fade_index:       0 = very present, 1 = strong disappearance
  // emotional_withdrawal_score: 0 = responsive, 1 = withdrawn
  // closure_risk_index:        0 = very unlikely silent end, 1 = high risk
  //
  // HARD: presence_fade >= 0.70 OR closure_risk >= 0.75 OR emotional_withdrawal >= 0.75
  // SOFT: presence_fade >= 0.45 OR closure_risk >= 0.45 OR emotional_withdrawal >= 0.50
  // NONE: everything else
 
  if (scope === "silent-exit") {
    const fade       = Number(result.indices.presence_fade_index         || 0);
    const withdrawal = Number(result.indices.emotional_withdrawal_score  || 0);
    const closure    = Number(result.indices.closure_risk_index          || 0);
 
    if (fade >= 0.70 || withdrawal >= 0.75 || closure >= 0.75) return "hard";
    if (fade >= 0.45 || withdrawal >= 0.50 || closure >= 0.45) return "soft";
    return "none";
  }
  
  // ====================== AFTER BREACH OF TRUST ======================
  // Protocols: Stabilization (soft) / Exit (hard)
  // Focus: stabilizing inside or exiting from an unresolved betrayal.
  //
  // relapse_risk_index:   0 = low risk, 1 = high risk (bad when high)
  // trust_regrowth_pace:  0 = stalled/eroding, 1 = rebuilding (bad when low)
  // repair_effort_index:  0 = no repair, 1 = steady repair (bad when low)
  //
  // HARD: relapse >= 0.65 OR regrowth <= 0.25 OR repair <= 0.20
  // SOFT: relapse >= 0.40 OR regrowth <= 0.50 OR repair <= 0.50
  // NONE: everything else
 
  if (scope === "after-breach-of-trust") {
    const relapse  = Number(result.indices.relapse_risk_index    || 0);
    const regrowth = Number(result.indices.trust_regrowth_pace   || 1);
    const repair   = Number(result.indices.repair_effort_index   || 1);
 
    if (relapse >= 0.65 || regrowth <= 0.25 || repair <= 0.20) return "hard";
    if (relapse >= 0.40 || regrowth <= 0.50 || repair <= 0.50) return "soft";
    return "none";
  }

  // ====================== TRUST THEIR SIGNALS ======================
  // Protocols: Grounding (soft) / Exit (hard)
  // Focus: rebuilding trust in own perception after chronic signal unreliability.
  //
  // INVERTED LOGIC: high signal_trust_index = good = none
  // signal_trust_index:    0 = can't lean on them, 1 = solid base
  // gaslighting_risk_index: 0 = almost none, 1 = strong pattern
  //
  // HARD: trust <= 0.30 OR gaslighting >= 0.60 OR riskLevel = "Low"
  // SOFT: trust <= 0.60 OR gaslighting >= 0.30 OR riskLevel = "Moderate"
  // NONE: "Elevated" or all indices healthy
 
  if (scope === "trust-their-signals") {
    const riskLevel   = (result.overall_trust_in_signals || "").toLowerCase().trim();
    const trust       = Number(result.indices.signal_trust_index      || 1);
    const gaslighting = Number(result.indices.gaslighting_risk_index  || 0);
 
    if (riskLevel === "elevated") return "none";
    if (riskLevel === "low"      || trust <= 0.30 || gaslighting >= 0.60) return "hard";
    if (riskLevel === "moderate" || trust <= 0.60 || gaslighting >= 0.30) return "soft";
    return "none";
  }
  
  // ====================== THIRD PERSON GREY ZONE ======================
  // Protocols: Clarity (soft) / Exit (hard)
  // Focus: stabilizing inside a triangle dynamic; stopping competition and investigation loops.
  //
  // triangle_risk_index:       0 = low, 1 = very high
  // secrecy_load_score:        0 = transparent, 1 = heavily concealed
  // emotional_outsourcing_score: 0 = none, 1 = a lot
  //
  // HARD: risk >= 0.70 OR secrecy >= 0.70 OR riskLevel = "High"
  // SOFT: risk >= 0.35 OR secrecy >= 0.35 OR outsourcing >= 0.45 OR riskLevel = "Moderate"
 
  if (scope === "third-person-grey-zone") {
    const riskLevel   = (result.overall_triangle_risk || "").toLowerCase().trim();
    const risk        = Number(result.indices.triangle_risk_index         || 0);
    const secrecy     = Number(result.indices.secrecy_load_score          || 0);
    const outsourcing = Number(result.indices.emotional_outsourcing_score || 0);
 
    if (riskLevel === "low") return "none";
    if (riskLevel === "high"     || risk >= 0.70 || secrecy >= 0.70) return "hard";
    if (riskLevel === "moderate" || risk >= 0.35 || secrecy >= 0.35 || outsourcing >= 0.45) return "soft";
    return "none";
  }
  
  // ====================== REPEATING BREAKUP PATTERN ======================
  // Protocols: Awareness (soft) / Exit (hard)
  // Focus: interrupting the cycle at the level of attraction and autopilot.
  //
  // pattern_entrenchment_index: 0 = rare, 1 = many similar endings
  // next_cycle_probability:     0 = low, 1 = very likely to repeat
  // post_breakup_fusion_risk:   0 = clean separation, 1 = entangled
  //
  // HARD: entrenchment >= 0.70 OR next_cycle >= 0.75
  // SOFT: entrenchment >= 0.35 OR next_cycle >= 0.50 OR fusion >= 0.65
 
  if (scope === "repeating-breakup") {
    const entrenchment = Number(result.indices.pattern_entrenchment_index || 0);
    const nextCycle    = Number(result.indices.next_cycle_probability     || 0);
    const fusion       = Number(result.indices.post_breakup_fusion_risk   || 0);
 
    if (entrenchment >= 0.70 || nextCycle >= 0.75) return "hard";
    if (entrenchment >= 0.35 || nextCycle >= 0.50 || fusion >= 0.65) return "soft";
    return "none";
  }
  
  // ====================== MIXED SIGNALS / INTEREST GAP ======================
  // Protocols: Stabilization (soft) / Exit (hard)
  // Focus: breaking the anxiety loop caused by chronic ambiguity.
  //
  // signal_clarity_index: 0 = very unclear, 1 = very clear
  // interest_gap_index:   0 = matched, 1 = strong gap
  // ghosting_drift_risk:  0 = unlikely, 1 = high risk
  //
  // HARD: clarity <= 0.20 OR gap >= 0.75 OR ghosting >= 0.75
  // SOFT: clarity <= 0.65 OR gap >= 0.45 OR ghosting >= 0.45

  if (scope === "mixed-signals") {
    const clarity  = Number(result.indices.signal_clarity_index || 1);
    const gap      = Number(result.indices.interest_gap_index   || 0);
    const ghosting = Number(result.indices.ghosting_drift_risk  || 0);

    if (clarity <= 0.20 || gap >= 0.75 || ghosting >= 0.75) return "hard";
    if (clarity <= 0.65 || gap >= 0.45 || ghosting >= 0.45) return "soft";
    return "none";
  }

  // ====================== YOU ARE AN OPTION ======================
if (scope === "you-are-an-option") {
    const recurrence       = Number(result.indices.pattern_recurrence_probability || 0);
    const priorityIndex    = Number(result.indices.priority_position_index        || 0);
    const consistencyScore = Number(result.indices.attention_consistency_score    || 0);
    const cancellationRate = Number(result.indices.cancellation_rate              || 0);
    const uncertaintyLoad  = Number(result.indices.emotional_uncertainty_load     || 0);
    const optionTrapRisk   = Number(result.indices.option_trap_risk               || 0);

    const status = (result.overall_option_status || "").toLowerCase().trim();

    // === HARD — явно используется как опция ===
    if (
      recurrence     >= 70   ||
      priorityIndex  >= 0.82 ||
      consistencyScore >= 0.85 ||
      cancellationRate >= 0.82 ||
      uncertaintyLoad >= 0.82 ||
      optionTrapRisk  >= 0.82 ||
      status.includes("clearly")
    ) {
      return "hard";
    }

    // === SOFT — заметные признаки "option zone", но ещё не критично ===
    if (
      recurrence       >= 45   ||
      priorityIndex    >= 0.68 ||
      consistencyScore >= 0.70 ||
      cancellationRate >= 0.65 ||
      uncertaintyLoad  >= 0.65 ||
      optionTrapRisk   >= 0.68 ||
      status.includes("likely an option") ||
      status.includes("leaning")          ||
      status.includes("unstable middle")  ||
      status.includes("option trap")
    ) {
      return "soft";
    }

    // === NONE — действительно хорошая или нейтральная ситуация ===
    return "none";
  }

  return "none";
}
