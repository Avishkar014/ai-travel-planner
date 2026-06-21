"use client";

import Navbar from "@/components/Navbar";
import CreateTripForm from "@/components/CreateTripForm";

export default function CreateTripPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Side */}
          <div
            className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-r
            from-sky-500
            via-blue-600
            to-violet-600
            p-10
            text-white
            min-h-[600px]
            flex
            flex-col
            justify-center
            shadow-2xl
            "
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20" />

            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-16 translate-y-16" />

            <h1 className="text-5xl font-bold leading-tight">
              Create Your
              <br />
              Dream Trip ✈️
            </h1>

            <p className="mt-6 text-cyan-100 text-lg leading-relaxed">
              Let AI generate a personalized itinerary,
              hotel recommendations, and budget estimates
              tailored to your travel style.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  🌍
                </div>
                <p>Choose any destination</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  🏨
                </div>
                <p>Get hotel recommendations</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  💰
                </div>
                <p>Plan within your budget</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  🤖
                </div>
                <p>AI-generated day-wise itinerary</p>
              </div>

            </div>

            {/* Travel Illustration */}
            <div className="absolute right-10 bottom-6 hidden md:block">

              <div className="text-[120px]">
                🧳
              </div>

              <div className="absolute top-0 -left-10 text-6xl">
                🌴
              </div>

              <div className="absolute bottom-8 -left-8 text-5xl">
                📷
              </div>

              <div className="absolute bottom-0 right-0 text-5xl">
                👒
              </div>

            </div>
          </div>

          {/* Right Side Form */}
          <div
            className="
            bg-white
            rounded-[32px]
            p-8
            shadow-xl
            border
            border-slate-100
            "
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Trip Details
              </h2>

              <p className="text-slate-500 mt-2">
                Fill in your travel preferences.
              </p>
            </div>

            <CreateTripForm />
          </div>

        </div>

      </div>
    </div>
  );
}