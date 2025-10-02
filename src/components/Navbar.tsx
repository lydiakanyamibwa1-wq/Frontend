import { Link, NavLink } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.length;

  const { user, logout } = useAuth(); // get current user and logout function

  return (
    <header className="sticky top-0 z-40">
      <TopBar />
      <div className="w-full bg-white">
        <div className="container-max flex items-center gap-4 py-4">
          <Link to="/" className="text-2xl font-extrabold">
            KAPEE
          </Link>
          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>
          <nav className="ml-auto flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <FiUser className="text-xl" />
                <span className="hidden sm:inline">Hello, {user.username}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                >
                  <FiLogOut />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <NavLink
                to="/account"
                className="flex items-center gap-1 hover:underline"
              >
                <FiUser />
                <span className="hidden sm:inline">Hello, Sign In</span>
              </NavLink>
            )}
            <NavLink
              to="/cart"
              className="relative flex items-center gap-1 hover:underline"
            >
              <FiShoppingCart />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="w-full border-t bg-white">
        <div className="container-max flex items-center gap-3 py-3">
          <CategoryMenu />
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'font-semibold' : '')}
            >
              Home
            </NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/deals">Deals</NavLink>
            <NavLink to="/support">Support</NavLink>
          </nav>
          <div className="md:hidden ml-auto w-full">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
