// utils/api.ts
import type { Product } from "../data/products";

// Set the base URL for your deployed backend
const BASE_URL = "https://backend-lyrt.onrender.com/api";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: {
    _id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
  }[] = await response.json();

  return data.map((p, i) => ({
    id: p._id,
    title: p.name,
    image: p.image ?? `https://picsum.photos/600/400?random=${i + 200}`,
    category: "General",
    price: p.price,
    rating: 0,
    reviews: 0,
    description: p.description,
    // 🔹 assign tags in rotation so filtering works
    tag: (["featured", "popular", "new"] as const)[i % 3],
  }));
}
