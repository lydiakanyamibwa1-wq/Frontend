import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:7000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");

      setMessage("✅ OTP sent to your email.");

      // Redirect to reset-password and pass email in query
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <section className="container-max my-10">
      <h1 className="text-2xl font-bold text-brand">Forgot Password</h1>
      <p className="text-gray-600">Enter your email to reset your password.</p>

      <form onSubmit={handleSubmit} className="card mt-6 max-w-md space-y-4 p-6 shadow-lg">
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn w-full bg-brand py-3 text-white">Send OTP</button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </section>
  );
}
