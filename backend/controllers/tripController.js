import Trip from "../models/Trip.js";
import {
  generateItinerary,
  regenerateDayPlan,
} from "../services/geminiService.js";

export const generateTrip = async (req, res) => {
  try {
    const {
      startingLocation,
      destination,
      days,
      budget,
      interests,
      travelers,
      transportType,
      stayType,
    } = req.body;

    const aiResult = await generateItinerary(
      req.body
    );

    const trip = await Trip.create({
      userId: req.user._id,

      startingLocation,

      destination,

      durationDays: days,

      travelers,

      transportType,

      stayType,

      budgetTier: budget,

      interests,

      itinerary: aiResult.itinerary,

      estimatedBudget: aiResult.budget,

      hotels: aiResult.hotels,
    });

    res.status(201).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(
      "GENERATE TRIP ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate trip",
    });
  }
};

// Get All Trips
export const getUserTrips = async (
  req,
  res
) => {
  try {
    const trips = await Trip.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error(
      "GET TRIPS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch trips",
    });
  }
};

// Get Single Trip
export const getTripById = async (
  req,
  res
) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(
      "GET TRIP ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch trip",
    });
  }
};
export const deleteActivity = async (
  req,
  res
) => {
  try {
    const {
      id,
      dayIndex,
      activityIndex,
    } = req.params;

    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    if (!trip.itinerary[dayIndex]) {
      return res.status(404).json({
        success: false,
        message: "Day not found",
      });
    }

    trip.itinerary[
      dayIndex
    ].activities.splice(
      activityIndex,
      1
    );

    await trip.save();

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(
      "DELETE ACTIVITY ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete activity",
    });
  }
};
// Add Activity
export const addActivity = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      dayIndex,
      activity,
    } = req.body;

    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    if (!trip.itinerary[dayIndex]) {
      return res.status(404).json({
        success: false,
        message: "Day not found",
      });
    }

    trip.itinerary[
      dayIndex
    ].activities.push(activity);

    await trip.save();

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(
      "ADD ACTIVITY ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to add activity",
    });
  }
};
// Regenerate Single Day (Future Feature)
export const regenerateDay = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { day, prompt } =
      req.body;

    const trip =
      await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const newDayPlan =
      await regenerateDayPlan({
        destination:
          trip.destination,
        day,
        prompt,
      });

    const dayIndex =
      trip.itinerary.findIndex(
        (d) =>
          d.day === Number(day)
      );

    if (dayIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Day not found",
      });
    }

    trip.itinerary[dayIndex] =
      newDayPlan;

    await trip.save();

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(
      "REGENERATE DAY ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to regenerate day",
    });
  }
};