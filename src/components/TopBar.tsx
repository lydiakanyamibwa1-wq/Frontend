import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="w-full bg-blue-400 text-black text-sm">
      <div className="container-max flex items-center justify-between py-2 gap-3">
        <p className="hidden md:block">
          <span className="font-semibold">SUMMER SALE</span>, Get 40% Off for
          all products.
          <Link to="/shop" className="ml-2 underline">
            Shop now
          </Link>
        </p>
        <div className="flex-1 md:flex-none" />
        <div className="flex items-center gap-4">
          <select className="bg-blue-400 text-black">
            <option>English</option>
            <option>Français</option>
            <option>Poltuge</option>
            <option>Kiswahili</option>
          </select>
          <select className="bg-blue-400 text-black">
            <option>$ Dollar (US)</option>
            <option>₹ RUPEE (INR)</option>
            <option>£ Pound (UK)</option>
            <option>€ Euro (EUR)</option>
          </select>
          <nav className="hidden sm:flex items-center gap-4">
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>
            <Link to="/support" className="hover:underline">
              FAQ
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
