"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="sticky top-4 z-50 px-6 py-4">
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

          <Link href="/dashboard">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent cursor-pointer">
              AI Travel Planner
            </h1>
          </Link>

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
              "
            >
              My Trips
            </Link>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <span className="text-sm font-medium text-slate-700">
                {user?.name || ""}
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
  );
}