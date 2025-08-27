"use client";

import { useCartStore } from "@/lib/cartStore";
import { X } from "lucide-react"; // For close icon
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-[var(--card)] shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-white/10">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ₹{item.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-xs"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-white/10">
          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full text-center rounded-lg bg-brand-600 hover:bg-brand-700 text-white py-2"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
