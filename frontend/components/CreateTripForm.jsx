"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function CreateTripForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    startingLocation: "",
    destination: "",
    days: "",
    travelers: 1,
    transportType: "flight",
    stayType: "hotel",
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
        `${API_URL}/api/trips/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
          startingLocation:
            formData.startingLocation,

          destination:
            formData.destination,

          days:
            Number(formData.days),

          travelers:
            Number(formData.travelers),

          transportType:
            formData.transportType,

          stayType:
            formData.stayType,

          budget:
            formData.budget,

          interests:
            formData.interests
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
        }),
        }
      );

      const data = await response.json();

      console.log("Trip Response:", data);

      if (!response.ok) {
        console.log("Backend Error:", data);

        alert(
          data.message ||
            JSON.stringify(data)
        );

        return;
      }

      if (
        data.success &&
        data.trip?._id
      ) {
        router.push(
          `/trips/${data.trip._id}`
        );
      } else {
        alert(
          "Trip created but response format is invalid"
        );
      }
    } catch (error) {
      console.error(
        "Trip Error:",
        error
      );

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        Starting Location
      </label>

      <input
        type="text"
        name="startingLocation"
        placeholder="Pune, Mumbai, Delhi..."
        value={formData.startingLocation}
        onChange={handleChange}
        required
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-300
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-500
        "
      />
    </div>
      {/* Destination */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Destination
        </label>

        <input
          type="text"
          name="destination"
          placeholder="Goa, Dubai, Paris..."
          value={formData.destination}
          onChange={handleChange}
          required
          className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-slate-300
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />
      </div>

      {/* Days */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Number of Days
        </label>

        <input
          type="number"
          name="days"
          min="1"
          max="30"
          placeholder="Enter trip duration"
          value={formData.days}
          onChange={handleChange}
          required
          className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-slate-300
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />
      </div>

      {/* Travelers */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Travelers
        </label>

        <input
          type="number"
          name="travelers"
          min="1"
          max="20"
          value={formData.travelers}
          onChange={handleChange}
          className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-slate-300
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />
      </div>
      
      <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        Transport Type
      </label>

      <select
        name="transportType"
        value={formData.transportType}
        onChange={handleChange}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-300
          bg-white
        "
      >
        <option value="flight">Flight</option>
        <option value="train">Train</option>
        <option value="bus">Bus</option>
        <option value="car">Car</option>
      </select>
    </div>

    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        Accommodation Type
      </label>

      <select
        name="stayType"
        value={formData.stayType}
        onChange={handleChange}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-300
          bg-white
        "
      >
        <option value="hotel">
          Standard Hotel
        </option>

        <option value="budget">
          Budget Hotel
        </option>

        <option value="luxury">
          Luxury Hotel
        </option>

        <option value="homestay">
          Homestay
        </option>

        <option value="resort">
          Resort
        </option>
      </select>
    </div>
      {/* Budget */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Budget Tier
        </label>

        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-slate-300
            bg-white
            text-slate-900
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        >
          <option value="low">
            Low Budget
          </option>

          <option value="medium">
            Medium Budget
          </option>

          <option value="high">
            Luxury Budget
          </option>
        </select>
      </div>

      {/* Interests */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Interests
        </label>

        <input
          type="text"
          name="interests"
          placeholder="Adventure, Food, Beaches, History..."
          value={formData.interests}
          onChange={handleChange}
          className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-slate-300
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-cyan-600
          hover:bg-cyan-700
          text-white
          py-4
          rounded-xl
          font-semibold
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Generating AI Trip..."
          : "Generate AI Itinerary ✈️"}
      </button>
    </form>
  );
}