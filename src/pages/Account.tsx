import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Account() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (register) {
        await register(username, email, password);
        navigate("/login");
      } else {
        setError("Registration function is not available");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <section className="container-max my-10">
      <h1 className="text-2xl font-bold text-brand">Create Account</h1>
      <p className="text-gray-600">
        Join us to start shopping and track your orders.
      </p>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="card mt-6 max-w-md space-y-4 p-6 shadow-lg"
      >
        <input
          placeholder="Username"
          name="username"
          required
          className="w-full rounded-lg border px-3 py-2"
        />
        <input
          placeholder="Email"
          type="email"
          name="email"
          required
          className="w-full rounded-lg border px-3 py-2"
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          required
          className="w-full rounded-lg border px-3 py-2"
        />
        <input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          className="w-full rounded-lg border px-3 py-2"
        />

        <button
          type="submit"
          className="btn w-full bg-brand py-3 text-white"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-brand hover:underline">
            Login 
          </a>
        </p>
      </form>
    </section>
  );
}
