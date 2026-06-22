"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");

      if (token) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 flex items-center justify-center relative">

      {/* Animated Background Blobs */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse top-10 left-10"></div>

      <div className="absolute w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse bottom-10 right-10"></div>

      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-bounce top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div
            className="
            w-28
            h-28
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            via-blue-500
            to-violet-500
            flex
            items-center
            justify-center
            text-5xl
            shadow-[0_0_60px_rgba(34,211,238,0.6)]
            animate-pulse
          "
          >
            ✈️
          </div>
        </div>

        {/* Title */}
        <h1
          className="
          text-6xl
          md:text-7xl
          font-extrabold
          bg-gradient-to-r
          from-cyan-300
          via-blue-300
          to-violet-300
          bg-clip-text
          text-transparent
          animate-pulse
        "
        >
          AI Travel Planner
        </h1>

        <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
          Generate intelligent travel itineraries, discover
          destinations, estimate budgets, and plan unforgettable
          journeys powered by AI.
        </p>

        {/* Loader */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-3">

            <span className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce"></span>

            <span
              className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.15s" }}
            ></span>

            <span
              className="w-4 h-4 bg-violet-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></span>

          </div>
        </div>

        <p className="mt-6 text-slate-400">
          Preparing your next adventure...
        </p>

      </div>
    </div>
  );
}