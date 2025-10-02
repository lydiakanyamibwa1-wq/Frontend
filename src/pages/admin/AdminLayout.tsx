import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiMail,
  FiBarChart2,
  FiSettings,
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiSend,
} from "react-icons/fi";
import { useEffect, useState } from "react";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState<string>("");

  // Fetch admin details from API (replace with your endpoint)
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("http://localhost:7000/api/admin/me", {
          credentials: "include", // if using cookies
        });
        if (res.ok) {
          const data = await res.json();
          setAdminName(data.name || "Admin");
        } else {
          setAdminName("Admin");
        }
      } catch (error) {
        console.error("Error fetching admin:", error);
        setAdminName("Admin");
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    // Optional: Call backend logout endpoint
    localStorage.removeItem("token"); // if you use JWT in localStorage
    navigate("/login");
  };

  // Helper to check active link
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - fixed */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-600 text-white flex flex-col shadow-lg z-50">
        <div className="p-6 text-2xl font-bold border-b border-blue-400">
          Admin Panel
        </div>
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
              isActive("/admin/dashboard") ? "bg-blue-400" : ""
            }`}
          >
            <FiHome /> Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
              isActive("/admin/products") ? "bg-yellow-500" : ""
            }`}
          >
            <FiBox /> Products
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
              isActive("/admin/users") ? "bg-yellow-500" : ""
            }`}
          >
            <FiUsers /> Users
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
              isActive("/admin/orders") ? "bg-yellow-500" : ""
            }`}
          >
            <FiShoppingCart /> Orders
          </Link>
          <Link
            to="/admin/contacts"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
              isActive("/admin/contacts") ? "bg-yellow-500" : ""
            }`}
          >
            <FiMail /> Messages
          </Link>
          <Link
            to="/admin/subscribe"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${isActive("/admin/subscribe") ? "bg-yellow-500" : ""
              }`}
          >
            <FiSend /> Subscribe
          </Link>
          <Link
            to="/admin/reports"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
              isActive("/admin/reports") ? "bg-yellow-500" : ""
            }`}
          >
            <FiBarChart2 /> Reports
          </Link>
        </nav>
        {/* Settings button at bottom */}
        <div className="p-6 border-t border-yellow-500">
          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
              isActive("/admin/settings") ? "bg-yellow-500" : ""
            }`}
          >
            <FiSettings /> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar - fixed */}
        <header className="fixed top-0 left-64 right-0 flex items-center justify-between bg-white shadow px-6 py-4 z-40">
          {/* Search bar */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1"
            />
          </div>

          {/* Right side: Notifications + Profile */}
          <div className="flex items-center gap-6">
            <button className="relative">
              <FiBell className="text-2xl text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">
              <FiUser className="text-xl text-gray-600" />
              <span className="font-semibold">Welcome, {adminName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 font-semibold hover:underline ml-3"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content with padding to avoid navbar overlap */}
        <main className="flex-1 mt-20 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
