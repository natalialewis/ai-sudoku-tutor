import type { Board } from "./types";
import { BOARD_SIZE } from "./types";
import { isValidMove } from "./constraints";

/**
 * Deep clone a board.
 */
function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

/**
 * Find next empty cell (0) in row-major order. Returns [row, col] or null.
 */
function findEmpty(board: Board): [number, number] | null {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
  return null;
}

/**
 * Backtracking solver. Modifies board in place. Returns true if solved.
 */
function solveRecurse(board: Board): boolean {
  const pos = findEmpty(board);
  if (!pos) return true;
  const [row, col] = pos;
  for (let value = 1; value <= BOARD_SIZE; value++) {
    if (!isValidMove(board, row, col, value)) continue;
    board[row][col] = value;
    if (solveRecurse(board)) return true;
    board[row][col] = 0;
  }
  return false;
}

/**
 * Solve the board. Returns a new solved board or null if no solution.
 * Does not modify the input board.
 */
export function solveBoard(board: Board): Board | null {
  const copy = cloneBoard(board);
  return solveRecurse(copy) ? copy : null;
}

/**
 * Count solutions (up to maxCount). Modifies board in place during search.
 */
function countSolutionsRecurse(
  board: Board,
  maxCount: number
): number {
  const pos = findEmpty(board);
  if (!pos) return 1;
  const [row, col] = pos;
  let count = 0;
  for (let value = 1; value <= BOARD_SIZE && count < maxCount; value++) {
    if (!isValidMove(board, row, col, value)) continue;
    board[row][col] = value;
    count += countSolutionsRecurse(board, maxCount - count);
    board[row][col] = 0;
  }
  return count;
}

/**
 * Check if the board has exactly one solution.
 */
export function hasUniqueSolution(board: Board): boolean {
  const copy = cloneBoard(board);
  return countSolutionsRecurse(copy, 2) === 1;
}
