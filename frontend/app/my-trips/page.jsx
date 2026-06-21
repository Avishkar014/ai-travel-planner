"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
const tripImages = {
  goa:
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",

  pune:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41",

  mumbai:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",

  delhi:
    "https://images.unsplash.com/photo-1587474260584-136574528ed5",

  bali:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4",

  dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
};
export default function MyTripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/trips",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTrips(data.trips);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Trips
        </h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
                <div className="relative h-56">

                <img
                    src={
                    tripImages[
                        trip.destination.toLowerCase()
                    ] ||
                    "https://images.unsplash.com/photo-1488646953014-85cb44e25828"
                    }
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-sm font-semibold">
                    {trip.durationDays} Days
                </div>

                </div>
              <div className="p-6">

                <h2 className="text-2xl font-bold capitalize">
                  {trip.destination}
                </h2>

                <p className="text-slate-500 mt-2">
                  {trip.durationDays} Days •{" "}
                  {trip.budgetTier}
                </p>

                <p className="mt-3 text-slate-500">
                  ₹
                  {
                    trip.estimatedBudget
                      ?.estimatedCost
                  }
                </p>

                <Link
                  href={`/trips/${trip._id}`}
                >
                  <button className="mt-5 text-cyan-600 font-bold">
                    View Trip →
                  </button>
                </Link>

              </div>
            </div>
          ))}

        </div>
      </div>
            <footer className="mt-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="grid md:grid-cols-4 gap-10">

            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                AI Travel Planner
                </h2>

                <p className="text-slate-500 mt-4">
                Discover destinations, build itineraries,
                and travel smarter with AI.
                </p>
            </div>

            <div>
                <h3 className="font-bold text-slate-900 mb-4">
                Quick Links
                </h3>

                <ul className="space-y-3 text-slate-500">
                <li>
                    <Link
                    href="/dashboard"
                    className="hover:text-cyan-600"
                    >
                    Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                    href="/create-trip"
                    className="hover:text-cyan-600"
                    >
                    Create Trip
                    </Link>
                </li>

                <li>
                    <Link
                    href="/my-trips"
                    className="hover:text-cyan-600"
                    >
                    My Trips
                    </Link>
                </li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-slate-900 mb-4">
                Features
                </h3>

                <ul className="space-y-3 text-slate-500">
                <li>✈️ AI Travel Plans</li>
                <li>🏨 Hotel Suggestions</li>
                <li>💰 Budget Planning</li>
                <li>🗺️ Smart Itineraries</li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-slate-900 mb-4">
                Connect
                </h3>

                <p className="text-slate-500">
                Plan your next adventure today.
                </p>

                <div className="flex gap-3 mt-4">
                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    🌐
                </div>

                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    📧
                </div>

                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    💼
                </div>
                </div>
            </div>

            </div>

            <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
                © 2026 AI Travel Planner
            </p>

            <p className="text-slate-500 text-sm mt-2 md:mt-0">
                Built with Next.js, MongoDB & AI
            </p>
            </div>

        </div>
        </footer>
    </div>
  );
}