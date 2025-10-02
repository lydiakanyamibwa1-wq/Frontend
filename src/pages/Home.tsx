import { useMemo, useState, useEffect } from "react";
import Hero from "../components/Hero";
import CategoryStrip from "../components/CategoryStrip";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../utils/api";
import type { Product } from "../data/products";

const tabs = [
  { key: "featured", label: "Featured" },
  { key: "popular", label: "Popular" },
  { key: "new", label: "New Arrivals" },
] as const;

export default function Home() {
  const [active, setActive] =
    useState<(typeof tabs)[number]["key"]>("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => products.filter((p) => p.tag === active),
    [products, active]
  );

  return (
    <>
      <Hero />
      <CategoryStrip />

      <section className="container-max mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Top Products</h2>
          <div className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`btn ${
                  active === t.key ? "bg-yellow-500 text-white" : "btn-outline"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
