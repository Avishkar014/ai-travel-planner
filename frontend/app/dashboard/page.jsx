"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchTrips(token);
  }, [router]);

  const fetchTrips = async (token) => {
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-600">
            AI Travel Planner
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white">
          <h2 className="text-4xl font-bold mb-3">
            Welcome {user?.name || "Traveler"} 👋
          </h2>

          <p className="text-lg opacity-90">
            Plan your next adventure with AI-powered travel itineraries.
          </p>

          <Link href="/create-trip">
            <button className="mt-6 bg-white text-cyan-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition">
              Create New Trip
            </button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-slate-500">Trips Created</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {trips.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-slate-500">Destinations</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {new Set(trips.map((trip) => trip.destination)).size}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-slate-500">AI Plans Generated</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {trips.length}
            </p>
          </div>
        </div>
      </section>

      {/* Recent Trips */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Recent Trips
        </h3>

        {loading ? (
          <p>Loading trips...</p>
        ) : trips.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-slate-500">
              No trips found. Create your first trip.
            </p>

            <Link href="/create-trip">
              <button className="mt-4 bg-cyan-600 text-white px-5 py-2 rounded-lg">
                Create Trip
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h4 className="font-bold text-lg text-slate-900">
                  {trip.destination}
                </h4>

                <p className="text-slate-500 mt-2">
                  {trip.durationDays} Days •{" "}
                  {trip.budgetTier.charAt(0).toUpperCase() +
                    trip.budgetTier.slice(1)}{" "}
                  Budget
                </p>

                <p className="text-sm text-slate-400 mt-2">
                  {new Date(
                    trip.createdAt
                  ).toLocaleDateString()}
                </p>

                <Link href={`/trips/${trip._id}`}>
                  <button className="mt-4 text-cyan-600 font-semibold">
                    View Trip →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}