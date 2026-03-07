"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/strategies", label: "Strategies" },
  { href: "/tutor", label: "Tutor" },
  { href: "/play", label: "Play" },
] as const;

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="flex min-h-0 flex-1 flex-row gap-1 border-b border-border bg-card/50 md:flex-col md:border-b-0 md:border-r md:min-h-full md:bg-transparent"
    >
      <ul className="flex w-full gap-0 md:flex-col md:gap-0.5 md:py-2">
        {navItems.map(({ href, label }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href}>
              <Link
                href={href}
                className={`block px-4 py-3 text-sm font-medium transition-colors md:rounded-r-lg md:py-2.5 md:pr-6 md:pl-4 md:text-base ${
                  isActive
                    ? "bg-primary text-primary-foreground md:bg-primary md:text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
