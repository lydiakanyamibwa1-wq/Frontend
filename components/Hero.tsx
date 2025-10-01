import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="container-max mt-6 grid gap-4 md:grid-cols-3">
      {/* Big banner */}
      <Link to="/shop" className="card relative col-span-2 overflow-hidden">
        <img
          src="https://picsum.photos/1200/500?random=11"
          alt="Main promo"
          className="h-64 w-full object-cover md:h-[320px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-extrabold">Top Electronics</h2>
          <p className="opacity-90">Up to 40% off best sellers</p>
        </div>
      </Link>

      {/* Side stack banners */}
      <div className="grid gap-4">
        <Link to="/shop" className="card overflow-hidden">
          <img
            src="https://picsum.photos/600/300?random=12"
            className="h-32 w-full object-cover"
            alt="Promo 2"
          />
        </Link>
        <Link to="/shop" className="card overflow-hidden">
          <img
            src="https://picsum.photos/600/300?random=13"
            className="h-32 w-full object-cover"
            alt="Promo 3"
          />
        </Link>
      </div>
    </section>
  );
}
