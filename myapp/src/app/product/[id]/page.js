"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import products from "@/lib/Data";
import { useCartStore } from "@/lib/cartStore";
import { toast  } from "sonner";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer"; // NEW

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  if (!product) {
    return (
      <div className="container-slim py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link
          href="/"
          className="mt-4 inline-block rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <main className="container-slim py-16">
      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-xl shadow-soft"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {product.description}
          </p>
          <p className="text-brand-600 font-bold text-xl mb-6">
            ₹{product.price}
          </p>
          <button
            onClick={() => {
              addToCart(product);
              toast.success(`${product.title} added to cart!`); // ✅ Sonner toast
              setDrawerOpen(true); // NEW
            }}
            className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 dark:bg-[var(--card)] bg-white p-6 hover:shadow-soft transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                <p className="text-brand-600 font-bold mb-4">₹{item.price}</p>
                <Link
                  href={`/product/${item.id}`}
                  className="block h-9 w-28 rounded-xl bg-brand-600 hover:bg-brand-700 text-white grid place-items-center"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Drawer */}
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
