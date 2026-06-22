"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TripDetailsPage() {
  const params = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedDayIndex, setSelectedDayIndex] =
    useState(null);

  const [newActivity, setNewActivity] =
    useState("");
    useEffect(() => {
      fetchTrip();
    }, []);


  const [regenPrompt, setRegenPrompt] =
   useState("");

  const [regenDay, setRegenDay] =
   useState(null);
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
  
  const deleteActivity = async (
  dayIndex,
  activityIndex
) => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/trips/${trip._id}/day/${dayIndex}/activity/${activityIndex}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data =
      await response.json();

    if (data.success) {
      setTrip(data.trip);
    }
  } catch (error) {
    console.log(error);
  }
};

const addActivity = async () => {
  if (!newActivity.trim()) {
    alert("Please enter an activity");
    return;
  }

  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/trips/${trip._id}/add-activity`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dayIndex: selectedDayIndex,
          activity: newActivity,
        }),
      }
    );

    const data =
      await response.json();

    console.log("Add Activity:", data);

    if (data.success) {
      setTrip(data.trip);
      setShowModal(false);
      setNewActivity("");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Failed to add activity");
  }
};
const regenerateDay = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/trips/${trip._id}/regenerate-day`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          day: regenDay,
          prompt: regenPrompt,
        }),
      }
    );

    const data =
      await response.json();

    if (data.success) {
      setTrip(data.trip);
      setShowModal(false);
    }
  } catch (error) {
    console.log(error);
  }
};
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
<div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-16">        <div className="bg-white rounded-3xl p-6 shadow-lg">
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
            Travelers
          </h3>

          <h2 className="text-4xl font-bold mt-2">
            {trip.travelers || 1}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-slate-500">
            Budget Tier
          </h3>

          <h2 className="text-3xl font-bold mt-2 capitalize">
            {trip.budgetTier}
          </h2>
        </div>

      </div>
      {/* Budget Breakdown */}
      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-8">
          Budget Breakdown
        </h2>

        <div className="grid md:grid-cols-5 gap-5">

          <div className="bg-white rounded-3xl p-5 shadow-lg text-center">
            <div className="text-3xl">✈️</div>
            <p className="mt-2 text-slate-500">Flights</p>
            <h3 className="font-bold text-xl">
              ₹{trip.estimatedBudget?.breakdown?.flights || 0}
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-lg text-center">
            <div className="text-3xl">🏨</div>
            <p className="mt-2 text-slate-500">Hotels</p>
            <h3 className="font-bold text-xl">
              ₹{trip.estimatedBudget?.breakdown?.hotels || 0}
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-lg text-center">
            <div className="text-3xl">🍽️</div>
            <p className="mt-2 text-slate-500">Food</p>
            <h3 className="font-bold text-xl">
              ₹{trip.estimatedBudget?.breakdown?.food || 0}
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-lg text-center">
            <div className="text-3xl">🎯</div>
            <p className="mt-2 text-slate-500">Activities</p>
            <h3 className="font-bold text-xl">
              ₹{trip.estimatedBudget?.breakdown?.activities || 0}
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-lg text-center">
            <div className="text-3xl">🚕</div>
            <p className="mt-2 text-slate-500">Transport</p>
            <h3 className="font-bold text-xl">
              ₹{trip.estimatedBudget?.breakdown?.transport || 0}
            </h3>
          </div>

        </div>
      </div>
      {/* Hotels */}
      {/* Hotels */}
<div className="mt-14">

  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold">
      Recommended Hotels
    </h2>

    <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
      {trip.hotels?.length || 0} Hotels
    </span>
  </div>

  <div className="grid md:grid-cols-3 gap-6">

    {trip.hotels?.map((hotel, index) => (
      <div
        key={index}
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-lg
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-300
        "
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            {hotel.name}
          </h3>

          <span className="text-yellow-500 font-semibold">
            ⭐ {hotel.rating}
          </span>
        </div>

        <span
          className="
            inline-block
            mt-3
            bg-cyan-100
            text-cyan-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
          "
        >
          {hotel.category}
        </span>

        <p className="mt-4 text-slate-600">
          📍 {hotel.location}
        </p>

        <p className="mt-3 text-lg font-semibold text-green-600">
          ₹{hotel.pricePerNight}/night
        </p>

        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          {hotel.description}
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

              <div className="flex items-center justify-between">

  <h3 className="text-2xl font-bold">
    {day.title}
  </h3>

  <div className="flex gap-3">

    <button
      onClick={() => {
        setSelectedDayIndex(index);
        setShowModal(true);
      }}
      className="
        bg-cyan-600
        hover:bg-cyan-700
        text-white
        px-4
        py-2
        rounded-xl
        text-sm
      "
    >
      Add Activity
    </button>

    <button
      onClick={async () => {
        const customPrompt =
          window.prompt(
            `How would you like to regenerate Day ${day.day}?`,
            "More outdoor activities"
          );

        if (!customPrompt) return;

        try {
          const token =
            localStorage.getItem("token");

          const response =
            await fetch(
              `http://localhost:5000/api/trips/${trip._id}/regenerate-day`,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  day: day.day,
                  prompt: customPrompt,
                }),
              }
            );

          const data =
            await response.json();

          if (data.success) {
            setTrip(data.trip);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.log(error);
          alert(
            "Failed to regenerate day"
          );
        }
      }}
      className="
        bg-violet-600
        hover:bg-violet-700
        text-white
        px-4
        py-2
        rounded-xl
        text-sm
      "
    >
      Regenerate Day
    </button>

  </div>

</div>

              <ul className="mt-4 space-y-3">

                {day.activities.map(
  (activity, activityIndex) => (
    <li
      key={activityIndex}
      className="
        flex
        justify-between
        items-center
        bg-slate-50
        px-4
        py-3
        rounded-xl
      "
    >
      <div className="flex items-center gap-3">
        <span className="text-cyan-600">
          ✔
        </span>

        <span>{activity}</span>
      </div>

      <button
        onClick={() =>
          deleteActivity(
            index,
            activityIndex
          )
        }
        className="
          text-red-500
          hover:text-red-700
          font-medium
        "
      >
        Delete
      </button>
    </li>
  )
)}

              </ul>

            </div>
          ))}

        </div>

      </div>

        </div>

    {showModal && (
      <div
        className="
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          z-50
        "
      >
        <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">
            Add Activity
          </h2>

          <input
            type="text"
            value={newActivity}
            onChange={(e) =>
              setNewActivity(e.target.value)
            }
            placeholder="Enter activity..."
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
            "
          />

          <div className="flex gap-3 mt-5">

            <button
              onClick={addActivity}
              className="
                bg-cyan-600
                hover:bg-cyan-700
                text-white
                px-5
                py-2
                rounded-xl
              "
            >
              Save
            </button>

            <button
              onClick={() => {
                setShowModal(false);
                setNewActivity("");
              }}
              className="
                bg-slate-200
                px-5
                py-2
                rounded-xl
              "
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    )}

  </div>
);
}