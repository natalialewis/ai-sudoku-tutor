import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header/Header";
import { AppNav } from "@/components/nav/AppNav";
import { ProfileProvider } from "@/lib/contexts/ProfileContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudoku Pro",
  description: "An intelligent Sudoku tutor that teaches logical strategies with adaptive practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Initialize dark/light theme from localStorage or system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var r=t||(d?"dark":"light");document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(r);})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased bg-background text-foreground`}
      >
        <ProfileProvider>
          <Header />
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <aside className="flex shrink-0 flex-col md:w-52 lg:w-60">
              <AppNav />
            </aside>
            <div className="min-h-0 min-w-0 flex-1">{children}</div>
            <aside className="hidden shrink-0 flex-col border-l border-border md:flex md:w-52 lg:w-60">
              <h2 className="px-4 py-3 text-center text-sm font-medium text-foreground md:text-base">
                Weekly Leaderboard
              </h2>
            </aside>
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}
