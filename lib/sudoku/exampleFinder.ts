import type { Board } from "./types";
import { BOARD_SIZE, BOX_SIZE } from "./types";
import { getBoxIndex } from "./constraints";
import { getCandidates } from "./candidates";
import { detectNakedSingle, detectHiddenSingle } from "./strategies";

export interface StrategyHint {
  row: number;
  col: number;
  value: number;
  strategy: "naked_single" | "hidden_single";
}

/** Find first naked single on the board. Naked single = cell with only one candidate. */
export function findFirstNakedSingle(board: Board): StrategyHint | null {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] !== 0) continue;
      if (detectNakedSingle(board, r, c)) {
        const candidates = getCandidates(board, r, c);
        if (candidates.length === 1) {
          return { row: r, col: c, value: candidates[0]!, strategy: "naked_single" };
        }
      }
    }
  }
  return null;
}

/** Find first hidden single on the board. Hidden single = value can only go in one cell in a unit. */
export function findFirstHiddenSingle(board: Board): StrategyHint | null {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] !== 0) continue;
      const candidates = getCandidates(board, r, c);
      for (const value of candidates) {
        if (detectHiddenSingle(board, r, c, value)) {
          return { row: r, col: c, value, strategy: "hidden_single" };
        }
      }
    }
  }
  return null;
}

/** Find first strategy hint (naked single before hidden single). */
export function findFirstStrategy(board: Board): StrategyHint | null {
  const naked = findFirstNakedSingle(board);
  if (naked) return naked;
  return findFirstHiddenSingle(board);
}

const BOX_NAMES: Record<number, string> = {
  0: "top-left",
  1: "top-center",
  2: "top-right",
  3: "middle-left",
  4: "center",
  5: "middle-right",
  6: "bottom-left",
  7: "bottom-center",
  8: "bottom-right",
};

export function getBoxName(boxIndex: number): string {
  return BOX_NAMES[boxIndex] ?? `box ${boxIndex + 1}`;
}
