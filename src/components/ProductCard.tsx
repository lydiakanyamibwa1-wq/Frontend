import { useState } from "react";
import { FiHeart, FiEye, FiShoppingCart, FiStar } from "react-icons/fi";
import Modal from "./Modal";
import type { Product } from "../data/products";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();

  // ✅ Provide default value for rating
  const rating = product.rating ?? 0;

  return (
    <div className="card relative overflow-hidden">
      {/* badge */}
      {product.badge && (
        <span
          className="badge"
          style={{ backgroundColor: product.badge.color }}
        >
          {product.badge.label}
        </span>
      )}

      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-xs uppercase text-gray-500">{product.category}</p>
        <h3 className="mt-1 line-clamp-2 font-semibold">{product.title}</h3>

        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar
              key={i}
              className={
                i < rating ? "text-blue-500" : "text-gray-300"
              }
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-red-500">
            ${product.price.toFixed(2)}
          </span>
          {product.compareAt && (
            <span className="text-sm text-gray-400 line-through">
              ${product.compareAt.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <button className="btn-outline" title="Wishlist">
            <FiHeart />
          </button>
          <button
            className="btn-outline"
            onClick={() => setOpen(true)}
            title="Quick View"
          >
            <FiEye />
          </button>
          <button
            className="bg-red-500 hover:bg-red-500 text-white font-semibold rounded-lg flex items-center justify-center px-3 py-2 transition"
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
          >
            <FiShoppingCart className="mr-2" /> Add
          </button>
        </div>

      </div>

      {/* Quick View Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Quick View">
        <div className="grid gap-4 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-xl"
          />
          <div>
            <h4 className="text-lg font-semibold">{product.title}</h4>
            <p className="mt-2 text-sm text-gray-600">
              {product.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAt && (
                <span className="text-gray-400 line-through">
                  ${product.compareAt.toFixed(2)}
                </span>
              )}
            </div>
            <button
              className="bg-red-500 hover:bg-blue-400 text-white font-semibold rounded-lg px-4 py-2 mt-4 w-full transition "
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}