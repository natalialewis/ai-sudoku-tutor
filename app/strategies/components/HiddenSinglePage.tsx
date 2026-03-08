import { StaticBoard } from "@/components/ui/StaticBoard";


const EXAMPLE_1= [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 5, 3, 0, 0, 0],
  [0, 0, 0, 7, 9, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 1, 0, 0, 0]
];

const EXAMPLE_2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 0, 6, 2, 0, 1, 5, 0],
  [5, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 0, 0, 0],
  [2, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 7, 0, 0, 0],
  [7, 6, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 7]
];

const EXAMPLE_3 = [
  [0, 4, 0, 6, 0, 0, 5, 7, 2],
  [0, 0, 0, 0, 0, 0, 3, 0, 1],
  [0, 0, 0, 0, 0, 0, 9, 0, 6],
  [4, 8, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 6, 0, 5, 0],
  [6, 2, 5, 0, 0, 0, 0, 3, 0],
  [0, 3, 0, 7, 6, 0, 0, 0, 4],
  [1, 0, 4, 8, 0, 3, 0, 0, 5],
  [8, 0, 0, 0, 0, 0, 0, 0, 0]
];

export function HiddenSinglePage() {
  return (
    <div className="space-y-6 text-foreground">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What it is</h2>
        <p className="text-muted-foreground">
        A <strong className="text-foreground">hidden single</strong> is a cell that has only one possible value. Even though the cell itself might seem like it could hold other numbers, if you looked at it in isolation, the rules of Sudoku dictate that the target digit must go there because all other empty cells in that group are blocked.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to spot it</h2>
        <p className="text-muted-foreground mb-4">
        Instead of looking at one empty cell and asking "what goes here?" (like naked singles), pick a specific digit (1–9) and scan a single row, column, or 3×3 box. Ask: "Where can this digit go?" Use intersecting rows and columns to eliminate empty cells. If all empty cells but one are blocked for that digit, you've found a hidden single.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Examples</h2>
        <div className="space-y-6">
          <StaticBoard board={EXAMPLE_1} answerCell={{row: 7, col: 5, value: 2}} label="Example 1" caption="The highlighted cell must be 2. The 2 cannot go in the bottom two cells because the 2 is already present in the bottom row outside of the box. Thus, the 2 must go in the only other empty cell." />
          <StaticBoard board={EXAMPLE_2} answerCell={{row: 2, col: 2, value: 7}} label="Example 2" caption="The highlighted cell must be 7. Focus on the third row down. The other empty cells in this row are blocked by existing 7s in the first, sixth, and ninth columns, leaving only this cell as an option for a 7."/>
          <StaticBoard board={EXAMPLE_3} answerCell={{row: 8, col: 8, value: 3}} label="Example 3" caption="The highlighted cell must be 3. Focus on the bottom-right box. The 3s in the seventh and eighth rows as well as the 3s in the seventh and eighth columns block out all other empty cells in this box. Thus, the 3 must go in the only other empty cell." />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Why it helps</h2>
        <p className="text-muted-foreground">
          Hidden singles are the next step after naked singles. When no cell has an obvious single candidate, scan each unit for a digit that has only one possible cell—then you can place it and often reveal new naked singles.
        </p>
      </section>
    </div>
  );
}
