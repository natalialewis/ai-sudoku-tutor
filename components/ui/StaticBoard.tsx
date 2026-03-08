/** Simple static 9×9 Sudoku grid. Optional answer cell highlight. */

/** 9x9 grid: 0 = empty. */
export type Board = number[][];

export interface StaticBoardProps {
  board: Board;
  answerCell?: { row: number; col: number; value: number };
  label?: string;
  caption?: string;
}

export function StaticBoard({
  board,
  answerCell,
  label,
  caption,
}: StaticBoardProps) {
  return (
    <figure>
      {label && (
        <figcaption className="mb-2 text-sm font-medium text-foreground">
          {label}
        </figcaption>
      )}
      <div className="inline-grid w-fit grid-cols-9 border-2 border-foreground/20 bg-card rounded-lg overflow-hidden shadow-sm">
        {board.map((row, r) =>
          row.map((val, c) => {
            const isAnswer =
              answerCell && answerCell.row === r && answerCell.col === c;
            const displayVal = isAnswer && answerCell ? answerCell.value : val;
            const borderRight = c === 2 || c === 5 ? "border-r-2 border-foreground/30" : "border-r border-border";
            const borderBottom = r === 2 || r === 5 ? "border-b-2 border-foreground/30" : "border-b border-border";
            return (
              <div
                key={`${r}-${c}`}
                className={`flex h-9 w-9 min-h-9 min-w-9 items-center justify-center border-border text-sm tabular-nums ${borderRight} ${borderBottom} ${
                  isAnswer ? "bg-primary/25 ring-2 ring-primary ring-inset font-semibold text-primary" : "bg-card text-foreground"
                }`}
              >
                {displayVal === 0 ? "" : displayVal}
              </div>
            );
          })
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground max-w-[20rem]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
