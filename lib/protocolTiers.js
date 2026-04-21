export function getProtocolTier(scope, result) {
  if (!result || !result.indices) return "none";

  if (scope === "current-relationship") {
    // текущая логика остаётся без изменений
    const recurrence = Number(result.indices.pattern_recurrence_probability || 0);
    const stability = Number(result.indices.long_term_stability_forecast || 0);
    const boundaries = Number(result.indices.boundary_violation_probability || 0);

    if (recurrence >= 70 || stability <= 35 || boundaries >= 70) {
      return "hard";
    }
    if (recurrence >= 45 || stability <= 55 || boundaries >= 45) {
      return "soft";
    }
    return "none";
  }

  // === ИСПРАВЛЕННАЯ ЛОГИКА ДЛЯ "you-are-an-option" ===
  if (scope === "you-are-an-option") {
    const recurrence = Number(result.indices.pattern_recurrence_probability || 0);
    
    // Основные сигналы из текущего результата анализа
    const priorityIndex = Number(result.indices.priority_position_index || 0);
    const consistencyScore = Number(result.indices.attention_consistency_score || 0);
    const cancellationRate = Number(result.indices.cancellation_rate || 0);
    const uncertaintyLoad = Number(result.indices.emotional_uncertainty_load || 0);
    const optionTrapRisk = Number(result.indices.option_trap_risk || 0);

    // Жёсткий протокол (Wall), если ситуация явно плохая
    if (
      recurrence >= 70 ||
      priorityIndex >= 0.8 ||
      consistencyScore >= 0.8 ||
      cancellationRate >= 0.8 ||
      uncertaintyLoad >= 0.8 ||
      optionTrapRisk >= 0.8 ||
      result.overall_option_status?.toLowerCase().includes("clearly")
    ) {
      return "hard";
    }

    // Мягкий протокол (Stabilization), если средне-плохо
    if (
      recurrence >= 45 ||
      priorityIndex >= 0.6 ||
      consistencyScore >= 0.6 ||
      cancellationRate >= 0.6 ||
      uncertaintyLoad >= 0.6 ||
      optionTrapRisk >= 0.6 ||
      result.overall_option_status?.toLowerCase().includes("option")
    ) {
      return "soft";
    }

    return "none";
  }

  return "none";
}
