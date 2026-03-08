import type { BKTParams } from "./types";

/**
 * BKT update: compute new mastery probability given an observation.
 * Uses the standard BKT formulas (Corbett & Anderson).
 *
 * When correct:  P(L|correct) = [P(L)·(1-p_slip)] / [P(L)·(1-p_slip) + (1-P(L))·p_guess]
 * When incorrect: P(L|wrong)  = [P(L)·p_slip] / [P(L)·p_slip + (1-P(L))·(1-p_guess)]
 * Then: P(L_{t+1}) = P(L|obs) + (1 - P(L|obs)) · p_transit
 *
 * @param priorProb - Current mastery probability P(L)
 * @param params - BKT parameters (p_transit, p_guess, p_slip)
 * @param correct - Whether the learner answered correctly
 * @param usedHint - If true, we treat as weaker evidence (optional; for now we still update)
 * @returns New mastery probability
 */
export function updateBKT(
  priorProb: number,
  params: Pick<BKTParams, "p_transit" | "p_guess" | "p_slip">,
  correct: boolean,
  _usedHint = false
): number {
  // These parameters are constants for a given knowledge component.
  const { p_transit, p_guess, p_slip } = params;

  // Calculate the posterior probability of mastery given the observation.
  let posterior: number;
  if (correct) {
    const num = priorProb * (1 - p_slip);
    const den = num + (1 - priorProb) * p_guess;
    posterior = den > 0 ? num / den : priorProb;
  } else {
    const num = priorProb * p_slip;
    const den = num + (1 - priorProb) * (1 - p_guess);
    posterior = den > 0 ? num / den : priorProb;
  }

  // Calculate the next probability of mastery given the transit probability.
  const nextProb = posterior + (1 - posterior) * p_transit;
  // Ensure the probability is between 0 and 1.
  return Math.max(0, Math.min(1, nextProb));
}

/** Mastery threshold: learner is considered to have mastered when P(L) >= this. */
export const MASTERY_THRESHOLD = 0.95;
