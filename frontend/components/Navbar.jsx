"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/dashboard"
          className="text-2xl font-bold text-cyan-600"
        >
          AI Travel Planner
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-slate-700 hover:text-cyan-600"
          >
            Dashboard
          </Link>

          <Link
            href="/create-trip"
            className="text-slate-700 hover:text-cyan-600"
          >
            Create Trip
          </Link>

          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}