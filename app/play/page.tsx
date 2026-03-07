import { getUser } from "@/lib/auth";
import { LoginBanner } from "./components/LoginBanner";

export default async function PlayPage() {
  // Determine if the user is logged in
  const user = await getUser();

  return (
    <div className="min-h-full bg-background px-4 py-6 sm:px-6 md:py-8">
      <main className="mx-auto max-w-2xl">
        {/* If the user is not logged in, show the login banner. They are not required to be logged in to play, but we encourage them to log in to help us improve the tutor mode. */}
        {!user && <LoginBanner />}
        <h1 className="text-2xl font-semibold text-foreground">Play</h1>
        <p className="mt-2 text-muted-foreground">
          Play full Sudoku puzzles. Choose a difficulty, get hints, and see which strategies you use as you solve.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Board selection and game interface will be implemented here.
        </p>
      </main>
    </div>
  );
}
