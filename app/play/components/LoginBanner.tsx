"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "play-login-banner-dismissed";

export function LoginBanner() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  // handle dismissing the banner
  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setDismissed(true);
  };

  if (!mounted || dismissed) return null;

  return (
    <div
      role="banner"
      className="relative mb-4 rounded-lg border border-border bg-primary-muted px-6 py-4 pr-10 text-sm text-primary-muted-foreground md:text-base"
    >
      <p>
        Logging in helps us improve your tutor mode and track your progress.{" "}
        <Link href="/login" className="font-medium underline hover:no-underline">
          Log in
        </Link>
        {" or "}
        <Link href="/signup" className="font-medium underline hover:no-underline">
          Sign up
        </Link>
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-2 top-2 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Dismiss banner"
      >
        <span className="sr-only">Dismiss</span>
        <span aria-hidden>×</span>
      </button>
    </div>
  );
}
