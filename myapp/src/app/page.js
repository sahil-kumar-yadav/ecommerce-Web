"use client";

import Link from "next/link";
import { ShoppingCart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import productsData from "@/lib/Data";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Filters
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply filters
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;
    const matchesPrice = product.price >= minPrice;
    return matchesCategory && matchesPrice;
  });

  return (
    <main>
      {/* Hero Section */}
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

            {mounted && (
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
            )}
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
        </section>
      </div>

      {/* Filter Controls */}
      <section className="container-slim flex flex-wrap gap-4 justify-center mb-10">
        {/* Category Filter */}
        {["All", "Mobiles", "Laptops", "Tablets"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl border ${
              category === cat
                ? "bg-brand-600 text-white"
                : "bg-white dark:bg-[var(--card)] text-gray-800 dark:text-white"
            }`}
          >
            {cat}
          </button>
        ))}

        {/* Price Filter */}
        {[0, 29999, 49999, 69999].map((price) => (
          <button
            key={price}
            onClick={() => setMinPrice(price)}
            className={`px-4 py-2 rounded-xl border ${
              minPrice === price
                ? "bg-brand-600 text-white"
                : "bg-white dark:bg-[var(--card)] text-gray-800 dark:text-white"
            }`}
          >
            {price === 0 ? "All Prices" : `₹${price}+`}
          </button>
        ))}
      </section>

      {/* Product Listing */}
      <section id="products" className="container-slim pb-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-white/10 dark:bg-[var(--card)] bg-white p-6 hover:shadow-soft transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {product.description}
                </p>
                <p className="text-brand-600 font-bold mb-4">
                  ₹{product.price}
                </p>
                <Link
                  href={`/product/${product.id}`}
                  className="block h-9 w-28 rounded-xl bg-brand-600 hover:bg-brand-700 text-white grid place-items-center"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">
            No products match your filter.
          </p>
        )}
      </section>
    </main>
  );
}
