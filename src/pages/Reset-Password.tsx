import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const query = new URLSearchParams(useLocation().search);
  const prefilledEmail = query.get("email") || "";
  
  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:7000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");

      setMessage("✅ Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <section className="container-max my-10">
      <h1 className="text-2xl font-bold text-brand">Reset Password</h1>
      <form onSubmit={handleSubmit} className="card mt-6 max-w-md space-y-4 p-6 shadow-lg">
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="OTP"
          type="text"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="New Password"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="btn w-full bg-brand py-3 text-white">Reset Password</button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </section>
  );
}
