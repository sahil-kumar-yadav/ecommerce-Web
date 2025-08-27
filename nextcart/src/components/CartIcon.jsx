"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

export default function CartIcon({ onClick }) {
  const { cart } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
    >
      <ShoppingBag className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
}
