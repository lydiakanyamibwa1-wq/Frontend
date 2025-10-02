import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:7000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.error || "❌ Subscription failed.");
      }
    } catch {
      setMessage("⚠️ Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <footer className="mt-16 bg-white">
      <div className="container-max grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h4 className="mb-3 text-lg font-bold">About</h4>
          <p className="text-sm text-gray-600">
            A fast, clean, modern electronics store experience built with React + Tailwind.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-lg font-bold">Customer Care</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Help Center</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>Track Order</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-lg font-bold">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-lg font-bold">Newsletter</h4>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <input
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-400 text-white font-semibold rounded-lg px-4 py-2 transition"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </div>
      </div>
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Kapee UI. shop
      </div>
    </footer>
  );
}
