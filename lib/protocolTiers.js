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
