import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login(email, password);

      // Navigate based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      // Show notification
      alert("Wrong email or password"); // You can replace with a toast notification
    }
  };

  return (
    <section className="container-max my-10">
      <h1 className="text-2xl font-bold text-brand">Welcome Back</h1>
      <p className="text-gray-600">Login to your account to continue.</p>

      <form
        className="card mt-6 max-w-md space-y-4 p-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full rounded-lg border px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded-lg border px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
          />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>

        <button className="btn w-full bg-brand py-3 text-white transition-transform hover:scale-[1.02] hover:shadow-lg">
          Login
        </button>

        {/* Forgot password link under the button */}
        <div className="text-center mt-2">
          <a
            href="/forgot-password"
            className="text-sm text-brand hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </form>
    </section>
  );
}
