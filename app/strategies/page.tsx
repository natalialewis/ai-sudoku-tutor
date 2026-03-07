import Link from "next/link";

const strategies = [
  { slug: "naked_single", name: "Naked Single" },
  { slug: "hidden_single", name: "Hidden Single" },
  { slug: "naked_pair", name: "Naked Pair" },
  { slug: "hidden_pair", name: "Hidden Pair" },
] as const;

export default function StrategiesPage() {
  return (
    <div className="min-h-full bg-background px-4 py-6 sm:px-6 md:py-8">
      <main className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-foreground">Strategies</h1>
        <p className="mt-2 text-muted-foreground">
          Learn the core logical strategies used to solve Sudoku. Each strategy has its own page with an explanation and examples.
        </p>
        <ul className="mt-6 flex flex-col gap-2" role="list">
          {strategies.map(({ slug, name }) => (
            <li key={slug}>
              <Link
                href={`/strategies/${slug}`}
                className="block rounded-lg border border-border bg-card px-4 py-3 text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
