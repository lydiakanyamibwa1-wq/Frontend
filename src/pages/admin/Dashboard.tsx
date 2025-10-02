import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiMail,
  FiDollarSign,
} from "react-icons/fi";

const monthlySales = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 600 },
  { name: "Apr", sales: 500 },
  { name: "May", sales: 700 },
];

const countrySales = [
  { name: "Burundi", value: 400 },
  { name: "Tanzania", value: 300 },
  { name: "Uganda", value: 250 },
  { name: "Kenya", value: 200 },
  { name: "Rwanda", value: 150 },
];

const COLORS = ["#4f46e5", "#f97316", "#10b981", "#ef4444", "#06b6d4"];

function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:7000/api";

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");

        const productRes = await fetch(`${API_URL}/products`);
        const productData = await productRes.json();
        setProductCount(productData.length);

        const userRes = await fetch(`${API_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUserCount(userData.length);

        const orderRes = await fetch(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const orderData = await orderRes.json();
        setOrderCount(orderData.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-400 text-white shadow rounded-lg p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
          <FiBox className="text-3xl mb-2" />
          <p className="text-lg font-semibold">Products</p>
          <p className="text-2xl font-bold">{loading ? "..." : productCount}</p>
        </div>

        <div className="bg-red-300 text-white shadow rounded-lg p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
          <FiUsers className="text-3xl mb-2" />
          <p className="text-lg font-semibold">Users</p>
          <p className="text-2xl font-bold">{loading ? "..." : userCount}</p>
        </div>

        <div className="bg-green-400 text-white shadow rounded-lg p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
          <FiShoppingCart className="text-3xl mb-2" />
          <p className="text-lg font-semibold">Orders</p>
          <p className="text-2xl font-bold">{loading ? "..." : orderCount}</p>
        </div>

        <div className="bg-yellow-400 text-white shadow rounded-lg p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
          <FiMail className="text-3xl mb-2" />
          <p className="text-lg font-semibold">Messages</p>
          <p className="text-2xl font-bold">75</p>
        </div>

        <div className="bg-purple-400 text-white shadow rounded-lg p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
          <FiDollarSign className="text-3xl mb-2" />
          <p className="text-lg font-semibold">Revenue</p>
          <p className="text-2xl font-bold">$0</p>
        </div>
      </div>

      <div className="bg-white-700 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">📈 Monthly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySales}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🌍 Sales by Country</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countrySales}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {countrySales.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
