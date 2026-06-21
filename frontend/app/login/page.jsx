"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/authService";

export default function LoginPage() {
const router = useRouter();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

setError("");

try {
  setLoading(true);

  const data = await loginUser({
    email: formData.email,
    password: formData.password,
  });

  if (data.message === "Invalid credentials") {
    setError("Invalid email or password");
    return;
  }

  if (data.token) {
    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    router.push("/dashboard");
  }
} catch (err) {
  setError("Login failed");
} finally {
  setLoading(false);
}

};

return ( <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 flex items-center justify-center p-4"> <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

    {/* Left Section */}
    <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <h1 className="text-5xl font-bold mb-6">
        AI Travel Planner
      </h1>

      <p className="text-lg text-slate-300 mb-8">
        Generate intelligent travel itineraries,
        discover destinations, and plan your dream
        trip in seconds using AI.
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span>✈️</span>
          <p>Personalized Itineraries</p>
        </div>

        <div className="flex items-center gap-3">
          <span>🏨</span>
          <p>Hotel Recommendations</p>
        </div>

        <div className="flex items-center gap-3">
          <span>💰</span>
          <p>Budget Planning</p>
        </div>

        <div className="flex items-center gap-3">
          <span>🗺️</span>
          <p>Day-wise Travel Guide</p>
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="p-8 md:p-12 flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">
        Welcome Back
      </h2>

      <p className="text-slate-600 mb-8">
        Sign in to continue your journey
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-6 text-slate-600">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-cyan-600 font-semibold hover:underline"
        >
          Register
        </Link>
      </p>
    </div>

  </div>
</div>

);
}
