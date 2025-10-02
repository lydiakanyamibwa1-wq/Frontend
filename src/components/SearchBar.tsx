// components/SearchBar.tsx
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getProducts } from "../utils/api";
import type { Product } from "../data/products";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    );
  }, [query, products]);

  return (
    <div className="relative w-full max-w-2xl">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex overflow-hidden rounded-xl bg-white shadow-card"
        aria-label="site search"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 outline-none"
          placeholder="Search products..."
          aria-label="Search products"
        />
        <button className="px-4" aria-label="search">
          <FiSearch className="text-xl" />
        </button>
      </form>

      {/* 🔹 Search dropdown results */}
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-lg bg-white shadow-lg z-40">
          {results.map((p) => (
            <li key={p.id} className="border-b last:border-none">
              <Link
                to={`/product/${p.id}`}
                className="flex items-center gap-3 p-2 hover:bg-gray-100"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-12 w-12 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-gray-500">${p.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
