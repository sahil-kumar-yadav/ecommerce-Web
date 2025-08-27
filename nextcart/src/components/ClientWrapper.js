"use client";

import { useCartStore } from "@/lib/cartStore";
import { X } from "lucide-react";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, totalPrice } = useCartStore();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4 border-gray-200 dark:border-white/10"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-sm"
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
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-brand-600">₹{totalPrice()}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg transition"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
