export function getProtocolTier(scope, result) {
  if (!result || !result.indices) return "none";

  if (scope === "current-relationship") {
    const recurrence = Number(result.indices.pattern_recurrence_probability || 0);
    const stability = Number(result.indices.long_term_stability_forecast || 0);
    const boundaries = Number(result.indices.boundary_violation_probability || 0);

    if (recurrence >= 70 || stability <= 35 || boundaries >= 70) return "hard";
    if (recurrence >= 45 || stability <= 55 || boundaries >= 45) return "soft";
    return "none";
  }

  // ====================== YOU ARE AN OPTION ======================
  if (scope === "you-are-an-option") {
    const recurrence = Number(result.indices.pattern_recurrence_probability || 0);
    
    const priorityIndex     = Number(result.indices.priority_position_index || 0);
    const consistencyScore  = Number(result.indices.attention_consistency_score || 0);
    const cancellationRate  = Number(result.indices.cancellation_rate || 0);
    const uncertaintyLoad   = Number(result.indices.emotional_uncertainty_load || 0);
    const optionTrapRisk    = Number(result.indices.option_trap_risk || 0);

    const status = (result.overall_option_status || "").toLowerCase().trim();

    // HARD — явно используется как опция
    if (
      recurrence >= 70 ||
      priorityIndex >= 0.82 ||
      consistencyScore >= 0.85 ||
      cancellationRate >= 0.8 ||
      uncertaintyLoad >= 0.82 ||
      optionTrapRisk >= 0.82 ||
      status.includes("clearly")
    ) {
      return "hard";
    }

    // SOFT — только заметные проблемы (но не критично)
    if (
      recurrence >= 55 ||
      (priorityIndex >= 0.75 && cancellationRate >= 0.6) || // комбинация
      consistencyScore >= 0.75 ||
      cancellationRate >= 0.75 ||
      uncertaintyLoad >= 0.75 ||
      optionTrapRisk >= 0.75 ||
      status.includes("likely an option") ||
      status.includes("option trap")
    ) {
      return "soft";
    }

    // NONE — всё остальное (включая Leaning priority, Unstable middle и хорошие результаты)
    return "none";
  }

  return "none";
}
