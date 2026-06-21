"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TripDetailsPage() {
  const params = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/trips/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTrip(data.trip);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading trip...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Trip not found
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">

    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600 p-10 text-white shadow-2xl">

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20" />

        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-16 translate-y-16" />

        <h1 className="text-5xl font-bold capitalize">
          {trip.destination}
        </h1>

        <p className="mt-3 text-cyan-100 text-lg">
          Your AI Generated Travel Plan
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <div className="bg-white/20 backdrop-blur px-5 py-3 rounded-2xl">
            📅 {trip.durationDays} Days
          </div>

          <div className="bg-white/20 backdrop-blur px-5 py-3 rounded-2xl">
            💰 ₹{trip.estimatedBudget?.estimatedCost}
          </div>

          <div className="bg-white/20 backdrop-blur px-5 py-3 rounded-2xl capitalize">
            ✈️ {trip.budgetTier}
          </div>

        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-slate-500">
            Estimated Budget
          </h3>

          <h2 className="text-4xl font-bold mt-2">
            ₹{trip.estimatedBudget?.estimatedCost}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-slate-500">
            Duration
          </h3>

          <h2 className="text-4xl font-bold mt-2">
            {trip.durationDays} Days
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-slate-500">
            Interests
          </h3>

          <div className="flex flex-wrap gap-2 mt-3">
            {trip.interests?.map((item) => (
              <span
                key={item}
                className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Hotels */}
      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-8">
          Recommended Hotels
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {trip.hotels?.map((hotel, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold">
                {hotel.name}
              </h3>

              <p className="mt-3 text-slate-500">
                ₹{hotel.pricePerNight}/night
              </p>

              <p className="mt-2">
                ⭐ {hotel.rating}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Itinerary */}
      <div className="mt-14">

        <h2 className="text-3xl font-bold mb-8">
          Travel Itinerary
        </h2>

        <div className="space-y-8">

          {trip.itinerary?.map((day, index) => (
          <div
            key={`${day.day}-${index}`}
            className="
              relative
              bg-white
              rounded-3xl
              p-8
              shadow-lg
              border-l-8
              border-cyan-500
            "
          >

              <div className="absolute -left-5 top-8 h-10 w-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                {day.day}
              </div>

              <h3 className="text-2xl font-bold">
                {day.title}
              </h3>

              <ul className="mt-4 space-y-3">

                {day.activities.map(
                  (activity, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="text-cyan-600">
                        ✔
                      </span>

                      {activity}
                    </li>
                  )
                )}

              </ul>

            </div>
          ))}

        </div>

      </div>

    </div>
  </div>
);
}