"use client";

import { useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Navbar({ onSearch, onCategoryChange, cartCount }) {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Shoes", "T-Shirts", "Hoodies", "Accessories"];

  const handleSearch = () => {
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-white tracking-wider">
          🛍️ TrendyCart
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-200 px-2 w-40 sm:w-64"
          />
          <button
            onClick={handleSearch}
            className="text-white hover:text-primary transition-colors"
          >
            <FaSearch size={18} />
          </button>
        </div>

        {/* Categories */}
        <div className="hidden md:flex gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange && onCategoryChange(cat)}
              className="px-3 py-1 rounded-full bg-white/20 text-white hover:bg-primary hover:text-white transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cart */}
        <div className="relative">
          <FaShoppingCart size={24} className="text-white cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
