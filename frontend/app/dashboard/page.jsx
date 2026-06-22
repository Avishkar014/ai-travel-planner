"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Plane,
  MapPinned,
  CalendarDays,
  LogOut,
  Plus,
} from "lucide-react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const tripImages = {
  pune:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41",
  goa:
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
  mumbai:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
  delhi:
    "https://images.unsplash.com/photo-1587474260584-136574528ed5",
};

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
        `${API_URL}/api/trips`,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      {/* Navbar */}
      <div className="sticky top-4 z-50 px-6">
        <nav
          className="
            max-w-7xl
            mx-auto
            bg-white/90
            backdrop-blur-xl
            rounded-3xl
            shadow-xl
            border
            border-slate-200
            px-6
            py-4
          "
        >
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                AI Travel Planner
              </h1>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/dashboard"
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  text-white
                  font-medium
                  shadow-md
                "
              >
                Dashboard
              </Link>

              <Link
                href="/create-trip"
                className="
                  px-4
                  py-2
                  rounded-xl
                  text-slate-700
                  hover:bg-slate-100
                  transition-all
                  duration-300
                "
              >
                Create Trip
              </Link>

              <Link
              href="/my-trips"
              className="
                px-4
                py-2
                rounded-xl
                text-slate-700
                hover:bg-slate-100
                transition-all
                duration-300
              "
            >
              My Trips
            </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <span className="text-sm font-medium text-slate-700">
                  {user?.name || "Traveler"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="
                  flex
                  items-center
                  gap-2
                  bg-blue-500
                  hover:bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  transition-all
                  duration-300
                  shadow-md
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

          </div>
        </nav>
      </div>

      {/* Hero */}
<motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="max-w-7xl mx-auto px-6 py-8"
>
  <div
    className="
    relative
    overflow-hidden
    rounded-[32px]
    bg-gradient-to-r
    from-sky-500
    via-blue-600
    to-violet-600
    min-h-[320px]
    shadow-2xl
    "
  >
    {/* Decorative Circles */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20" />

    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-16 translate-y-16" />

    <div className="absolute bottom-10 right-40 w-32 h-32 bg-white/5 rounded-full" />

    {/* Flight Path */}
    <svg
      className="absolute left-0 bottom-0 w-full h-full opacity-60"
      viewBox="0 0 1200 320"
      fill="none"
    >
      <path
        d="M80 280 C220 120, 350 360, 520 180"
        stroke="white"
        strokeWidth="3"
        strokeDasharray="8 8"
      />
    </svg>

    {/* Left Content */}
    <div className="relative z-10 p-10 md:p-12 max-w-xl">
      <h2 className="text-5xl font-bold text-white leading-tight mb-4">
        Welcome back,
        <br />
        {user?.name || "Traveler"}! 👋
      </h2>

      <p className="text-cyan-100 text-lg leading-relaxed">
        Let's plan your next unforgettable adventure
        with AI-powered itineraries.
      </p>

      <Link href="/create-trip">
        <button
          className="
          mt-8
          bg-white
          text-blue-600
          px-6
          py-4
          rounded-2xl
          font-semibold
          shadow-xl
          hover:scale-105
          transition-all
          "
        >
          + Create New Trip
        </button>
      </Link>
    </div>

    {/* Animated Plane */}
    <motion.div
      animate={{
        x: [0, 15, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      className="
      absolute
      top-24
      right-[380px]
      text-white
      text-6xl
      "
    >
      ✈️
    </motion.div>

    {/* Travel Elements */}
    <div className="absolute right-12 bottom-0 hidden md:block">

      {/* Suitcase */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="text-[140px]"
      >
        🧳
      </motion.div>

      {/* Palm Tree */}
      <div className="absolute top-5 -left-16 text-7xl">
        🌴
      </div>

      {/* Camera */}
      <div className="absolute bottom-12 -left-10 text-6xl">
        📷
      </div>

      {/* Hat */}
      <div className="absolute bottom-4 right-0 text-6xl">
        👒
      </div>
    </div>
  </div>
</motion.section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="grid md:grid-cols-3 gap-8">
        
        <motion.div
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="
          bg-white
          rounded-3xl
          p-7
          shadow-lg
          border
          border-slate-100
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Trips Created
              </p>

              <h3 className="text-5xl font-bold text-slate-900 mt-3">
                {trips.length}
              </h3>
            </div>

            <div className="h-16 w-16 rounded-2xl bg-cyan-100 flex items-center justify-center">
              <Plane
                className="text-cyan-600"
                size={30}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="
          bg-white
          rounded-3xl
          p-7
          shadow-lg
          border
          border-slate-100
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Destinations
              </p>

              <h3 className="text-5xl font-bold text-slate-900 mt-3">
                {
                  new Set(
                    trips.map(
                      (trip) => trip.destination
                    )
                  ).size
                }
              </h3>
            </div>

            <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <MapPinned
                className="text-blue-600"
                size={30}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="
          bg-white
          rounded-3xl
          p-7
          shadow-lg
          border
          border-slate-100
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Travel Days
              </p>

              <h3 className="text-5xl font-bold text-slate-900 mt-3">
                {trips.reduce(
                  (sum, trip) =>
                    sum + trip.durationDays,
                  0
                )}
              </h3>
            </div>

            <div className="h-16 w-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <CalendarDays
                className="text-indigo-600"
                size={30}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>

      {/* Recent Trips */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
  <div className="flex justify-between items-center mb-8">
    <div>
      <h3 className="text-4xl font-bold text-slate-900">
        Recent Trips
      </h3>

      <div className="w-20 h-1 bg-cyan-500 rounded-full mt-3" />
    </div>

    <Link href="/create-trip">
      <button className="border border-cyan-300 text-cyan-600 px-5 py-3 rounded-full hover:bg-cyan-50 transition">
        + New Trip
      </button>
    </Link>
  </div>

  {loading ? (
    <div className="text-center py-10">
      Loading trips...
    </div>
  ) : trips.length === 0 ? (
    <div className="bg-white rounded-3xl p-10 shadow-lg text-center">
      <h4 className="text-2xl font-bold text-slate-900">
        No Trips Yet
      </h4>

      <p className="text-slate-500 mt-2">
        Start planning your first adventure.
      </p>

      <Link href="/create-trip">
        <button className="mt-5 bg-cyan-600 text-white px-6 py-3 rounded-xl">
          Create Trip
        </button>
      </Link>
    </div>
  ) : (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
      {trips.map((trip) => (
        <motion.div
          key={trip._id}
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          className="
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-xl
            border
            border-slate-100
          "
        >
          <div className="relative h-64">
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
              {new Date(
                trip.createdAt
              ).toLocaleDateString()}
            </div>

            <div className="absolute bottom-4 left-4 bg-cyan-600 text-white px-3 py-1 rounded-xl text-sm font-semibold">
              {trip.durationDays} Days
            </div>
          </div>

          <div className="p-6">
            <h4 className="text-2xl font-bold text-slate-900 capitalize">
              {trip.destination}
            </h4>

            <div className="flex gap-4 mt-3 text-slate-500">
              <span>
                📅 {trip.durationDays} Days
              </span>

              <span>
                💰 {trip.budgetTier}
              </span>
            </div>

            <Link href={`/trips/${trip._id}`}>
              <button className="mt-6 text-cyan-600 font-bold text-lg hover:translate-x-1 transition">
                View Trip →
              </button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )}
</section>

    {/* Footer */}
    {/* Footer */}
<footer className="mt-20 bg-white border-t border-slate-200">
  <div className="max-w-7xl mx-auto px-6 py-12">

    <div className="grid md:grid-cols-4 gap-10">

      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          AI Travel Planner
        </h2>

        <p className="text-slate-500 mt-4">
          Plan smarter journeys with AI-powered
          travel itineraries, hotel suggestions,
          and budget planning.
        </p>
      </div>

      {/* Quick Links */}
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
              href="/dashboard"
              className="hover:text-cyan-600"
            >
              My Trips
            </Link>
          </li>
        </ul>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4">
          Features
        </h3>

        <ul className="space-y-3 text-slate-500">
          <li>✈️ AI Itineraries</li>
          <li>🏨 Hotel Suggestions</li>
          <li>💰 Budget Planning</li>
          <li>🗺️ Trip Tracking</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4">
          Connect
        </h3>

        <p className="text-slate-500">
          Build your dream adventure with AI.
        </p>

        <div className="flex gap-3 mt-4">
          <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center hover:bg-cyan-200 cursor-pointer transition">
            🌐
          </div>

          <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center hover:bg-cyan-200 cursor-pointer transition">
            📧
          </div>

          <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center hover:bg-cyan-200 cursor-pointer transition">
            💼
          </div>
        </div>
      </div>

    </div>

    <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-slate-500 text-sm">
        © 2026 AI Travel Planner. All rights reserved.
      </p>

      <p className="text-slate-500 text-sm mt-2 md:mt-0">
        Designed with ❤️ using Next.js & AI
      </p>
    </div>

  </div>
</footer>


    </div>
  );
}