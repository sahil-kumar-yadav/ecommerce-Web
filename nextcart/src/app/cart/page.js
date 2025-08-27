"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container-slim py-16 text-center">
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <Link
          href="/"
          className="mt-4 inline-block rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="container-slim py-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-200 pb-4"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center font-bold text-xl">
        <span>Total:</span>
        <span>₹{total}</span>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={clearCart}
          className="rounded-xl bg-gray-300 hover:bg-gray-400 text-black px-4 py-2"
        >
          Clear Cart
        </button>
        <button className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2">
          Checkout
        </button>
      </div>
    </main>
  );
}
