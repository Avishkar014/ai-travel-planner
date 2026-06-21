"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTripForm() {
const router = useRouter();

const [formData, setFormData] = useState({
destination: "",
days: "",
budget: "medium",
interests: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setFormData((prev) => ({
...prev,
[e.target.name]: e.target.value,
}));
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    router.push("/login");
    return;
  }

  const response = await fetch(
    "http://localhost:5000/api/trips/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        destination: formData.destination,
        days: Number(formData.days),
        budget: formData.budget,
        interests: formData.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    }
  );

  const data = await response.json();

  console.log("Trip Response:", data);

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to generate trip"
    );
  }

  if (data.success && data.trip?._id) {
    router.push(`/trips/${data.trip._id}`);
  } else {
    alert("Trip created but response format is invalid");
  }
} catch (error) {
  console.error("Trip Error:", error);
  alert(error.message);
} finally {
  setLoading(false);
}


};

return ( <form
   onSubmit={handleSubmit}
   className="space-y-6"
 > <div> <label className="block mb-2 text-sm font-medium text-slate-700">
Destination </label>


    <input
      type="text"
      name="destination"
      placeholder="Goa"
      value={formData.destination}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  </div>

  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Number of Days
    </label>

    <input
      type="number"
      name="days"
      placeholder="Enter trip duration"
      value={formData.days}
      onChange={handleChange}
      required
      min="1"
      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  </div>

  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Budget Tier
    </label>

    <select
      name="budget"
      value={formData.budget}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      <option value="low">Low Budget</option>
      <option value="medium">Medium Budget</option>
      <option value="high">Luxury Budget</option>
    </select>
  </div>

  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Interests
    </label>

    <input
      type="text"
      name="interests"
      placeholder="Adventure, Food, Beaches..."
      value={formData.interests}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
  >
    {loading
      ? "Generating Trip..."
      : "Generate AI Itinerary ✈️"}
  </button>
</form>

);
}
