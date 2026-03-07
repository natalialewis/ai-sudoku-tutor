import type { Board } from "./types";
import { BOARD_SIZE, BOX_SIZE } from "./types";

/**
 * Get 3x3 box index 0-8 (row-major: 0 top-left, 8 bottom-right).
 */
export function getBoxIndex(row: number, col: number): number {
  const boxRow = Math.floor(row / BOX_SIZE);
  const boxCol = Math.floor(col / BOX_SIZE);
  return boxRow * BOX_SIZE + boxCol;
}

/**
 * Check if placing `value` at (row, col) would violate the row constraint
 * (value already appears elsewhere in that row).
 * Returns true if the value violates the constraint, false otherwise.
 */
export function checkRowConstraint(
  board: Board,
  row: number,
  col: number,
  value: number
): boolean {
  for (let c = 0; c < BOARD_SIZE; c++) {
    // If the value appears in another cell in the same row, return true
    if (c !== col && board[row][c] === value) return true;
  }
  return false;
}

/**
 * Check if placing `value` at (row, col) would violate the column constraint.
 * Returns true if the value violates the constraint, false otherwise.
 */
export function checkColumnConstraint(
  board: Board,
  row: number,
  col: number,
  value: number
): boolean {
  for (let r = 0; r < BOARD_SIZE; r++) {
    // If the value appears in another cell in the same column, return true
    if (r !== row && board[r][col] === value) return true;
  }
  return false;
}

/**
 * Check if placing `value` at (row, col) would violate the 3x3 box constraint.
 * Returns true if the value violates the constraint, false otherwise.
 */
export function checkBoxConstraint(
  board: Board,
  row: number,
  col: number,
  value: number
): boolean {
  const startRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const startCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
  for (let r = startRow; r < startRow + BOX_SIZE; r++) {
    for (let c = startCol; c < startCol + BOX_SIZE; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) return true;
    }
  }
  return false;
}

/**
 * Check if placing `value` at (row, col) is valid (no row, column, or box conflict).
 * Returns true if the value is valid, false otherwise.
 */
export function isValidMove(
  board: Board,
  row: number,
  col: number,
  value: number
): boolean {
  return (
    !checkRowConstraint(board, row, col, value) &&
    !checkColumnConstraint(board, row, col, value) &&
    !checkBoxConstraint(board, row, col, value)
  );
}
