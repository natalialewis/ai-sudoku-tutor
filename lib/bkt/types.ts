import type { Strategy } from "@/lib/sudoku/types";

/** Knowledge component = strategy name in our system. */
export type KnowledgeComponent = Strategy;

/** BKT parameters for a single knowledge component. */
export interface BKTParams {
  p_learned: number; // p(L0) - initial probability of knowing the skill
  p_transit: number; // p(T) - probability of learning after practice
  p_guess: number; // p(G) - probability of guessing correctly when not knowing
  p_slip: number; // p(S) - probability of slipping when knowing
}

/** Row from bkt_probabilities table. */
export interface BKTProbabilityRow extends BKTParams {
  id: string;
  user_id: string;
  knowledge_component: KnowledgeComponent;
  mastery_probability: number; // Current P(L|obs)
  updated_at: string;
}

/** Default BKT parameters (Corbett & Anderson typical values). These are constants for a given knowledge component. */
export const DEFAULT_BKT_PARAMS: BKTParams = {
  p_learned: 0.1,
  p_transit: 0.3,
  p_guess: 0.1,
  p_slip: 0.05,
};
