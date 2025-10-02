import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Shop() {
  return (
    <section className="container-max my-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Shop</h1>
        <p className="text-gray-600">Browse all products.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
