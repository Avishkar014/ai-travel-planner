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
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            {trip.destination}
          </h1>

          <div className="mt-4 flex gap-6">
            <p>
              <strong>Days:</strong> {trip.durationDays}
            </p>

            <p>
              <strong>Budget:</strong> {trip.budgetTier}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Estimated Budget
          </h2>

          <p>
            ₹ {trip.estimatedBudget?.estimatedCost}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Recommended Hotels
          </h2>

          {trip.hotels?.map((hotel, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 mb-4"
            >
              <h3 className="font-semibold text-lg">
                {hotel.name}
              </h3>

              <p>
                Price/Night: ₹ {hotel.pricePerNight}
              </p>

              <p>
                Rating: ⭐ {hotel.rating}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">
            Itinerary
          </h2>

          {trip.itinerary?.map((day) => (
            <div
              key={day.day}
              className="border-l-4 border-cyan-500 pl-4 mb-8"
            >
              <h3 className="text-xl font-bold">
                Day {day.day}
              </h3>

              <p className="font-medium text-slate-700 mt-2">
                {day.title}
              </p>

              <ul className="list-disc ml-5 mt-3">
                {day.activities.map(
                  (activity, index) => (
                    <li key={index}>
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
  );
}