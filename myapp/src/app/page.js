"use client";

import Link from "next/link";
import { ShoppingCart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main>
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(800px 300px at 10% 10%, #7C3AED33, transparent), radial-gradient(800px 300px at 90% 10%, #22D3EE33, transparent)",
          }}
        />
        <header className="container-slim py-5 flex items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-brand-600 shadow-soft grid place-items-center text-white">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Glow<span className="text-brand-600">Cart</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative rounded-xl px-4 py-2 bg-brand-600 text-white hover:bg-brand-700 transition focus-ring"
            >
              View Cart
            </Link>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl px-3 py-2 border border-white/10 hover:bg-white/5 transition focus-ring"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </header>

        <section className="container-slim py-16 sm:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            Shop smart with a{" "}
            <span className="text-brand-600">beautiful</span> experience
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Mobiles, laptops, tablets — browse, filter, search, and checkout
            with a delightful UI.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="#"
              className="rounded-xl px-6 py-3 bg-brand-600 text-white hover:bg-brand-700 shadow-soft focus-ring"
            >
              Start Exploring
            </Link>
          </div>
        </section>
      </div>

      <section className="container-slim py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 dark:bg-[var(--card)] bg-white p-6 hover:shadow-soft transition"
            >
              <div className="h-40 rounded-xl bg-gradient-to-br from-brand-100 to-accent/20 dark:from-brand-800/40 dark:to-accent/10 mb-4" />
              <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded mb-2" />
              <div className="h-4 w-44 bg-gray-200 dark:bg-white/10 rounded mb-6" />
              <div className="h-9 w-28 rounded-xl bg-brand-600/90 hover:bg-brand-700 text-white grid place-items-center">
                View
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
