"use client";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import CreateTripForm from "@/components/CreateTripForm";

export default function CreateTripPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Create Your Dream Trip ✈️
          </h1>

          <p className="text-slate-600 mt-2">
            Let AI build a personalized itinerary based on
            your destination, budget, and interests.
          </p>
        </div>

        <Card>
          <CreateTripForm />
        </Card>
      </div>
    </div>
  );
}