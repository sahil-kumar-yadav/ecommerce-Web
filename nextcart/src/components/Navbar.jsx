"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar({ onFilterChange }) {
  const categories = ["All", "Mobiles", "Laptops", "Tablets"];
  const prices = [
    { label: "All Prices", value: 0 },
    { label: "₹29,999+", value: 29999 },
    { label: "₹49,999+", value: 49999 },
  ];

  return (
    <nav className="bg-white dark:bg-[var(--card)] border-b border-white/10 shadow-sm sticky top-0 z-50">
      <div className="container-slim flex flex-wrap items-center justify-between gap-4 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-brand-600 shadow-soft grid place-items-center text-white">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            Glow<span className="text-brand-600">Cart</span>
          </span>
        </Link>

        {/* Category Filters */}
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className="px-3 py-1 rounded-xl bg-brand-100 text-brand-800 hover:bg-brand-200 dark:bg-brand-800 dark:text-white dark:hover:bg-brand-700 transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Filters */}
        <div className="flex gap-2">
          {prices.map((p) => (
            <button
              key={p.value}
              onClick={() => onFilterChange({ price: p.value })}
              className="px-3 py-1 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
