export function getProtocolTier(scope, result) {
  if (!result || !result.indices) return "none";

  if (scope === "current-relationship") {
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

  if (scope === "you-are-an-option") {
    const recurrence = Number(result.indices.pattern_recurrence_probability || 0);

    if (recurrence >= 70) return "hard";
    if (recurrence >= 45) return "soft";
    return "none";
  }

  return "none";
}
