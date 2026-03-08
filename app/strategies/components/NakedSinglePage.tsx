import { StaticBoard } from "@/components/ui/StaticBoard";

const EXAMPLE_1= [
  [0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 5, 8, 7, 6, 4, 9],
];

const EXAMPLE_2 = [
  [0, 7, 0, 0, 6, 0, 0, 0, 4],
  [0, 0, 0, 0, 7, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 0],
  [4, 9, 2, 0, 0, 0, 3, 1, 5],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 1, 2, 0],
];

const EXAMPLE_3 = [
  [0, 0, 4, 0, 0, 2, 0, 0, 0],
  [0, 1, 5, 6, 0, 0, 2, 0, 0],
  [3, 0, 0, 0, 8, 0, 0, 0, 9],
  [0, 0, 3, 0, 0, 0, 0, 1, 0],
  [0, 8, 7, 0, 0, 0, 0, 9, 2],
  [0, 0, 0, 0, 6, 0, 0, 7, 8],
  [0, 0, 0, 0, 7, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 8, 0, 0, 4],
  [0, 0, 8, 0, 9, 0, 0, 0, 5],
];

export function NakedSinglePage() {
  return (
    <div className="space-y-6 text-foreground">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What it is</h2>
        <p className="text-muted-foreground">
          A <strong className="text-foreground">naked single</strong> is a cell that has only one possible value. Every other digit (out of 1–9) already appears in that cell's row, column, or 3×3 box, so the only option left is the remaining digit.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to spot it</h2>
        <p className="text-muted-foreground mb-4">
          Look at each empty cell and ask: which digits can go here? If you count the clues in its row, column, and box and find that eight different digits are already placed, the cell must be the remaining one.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Examples</h2>
        <div className="space-y-6">
          <StaticBoard board={EXAMPLE_1} answerCell={{row: 8, col: 1, value: 1}} label="Example 1" caption="The highlighted cell must be 1. The 2 and 3 are already present in the column and the 4, 5, 6, 7, 8, and 9 are already present in the row." />
          <StaticBoard board={EXAMPLE_2} answerCell={{row: 3, col: 4, value: 8}} label="Example 2" caption="The highlighted cell must be 8. The 6 and 7 are already present in the column and the 1, 2, 3, 4, 5, and 9 are already present in the row." />
          <StaticBoard board={EXAMPLE_3} answerCell={{row: 3, col: 8, value: 6}} label="Example 3" caption="The highlighted cell must be 6. The 2, 4, 5, 8, and 9 are already present in the column, the 1 and 3 are already present in the row, and the 1, 2, 7, 8, and 9 are already present in the box."/>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Why it helps</h2>
        <p className="text-muted-foreground">
          Filling in naked singles is the simplest move in Sudoku. Many puzzles can be started or unstuck by repeatedly looking for a cell that has only one possible value.
        </p>
      </section>
    </div>
  );
}
