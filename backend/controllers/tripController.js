import Trip from "../models/Trip.js";
import { generateItinerary } from "../services/geminiService.js";

// Create New Trip
export const generateTrip = async (req, res) => {
  try {
    const { destination, days, budget, interests } = req.body;

    const aiResult = await generateItinerary(req.body);

    const trip = await Trip.create({
      userId: req.user._id,

      destination,
      durationDays: days,
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Trips of Logged-in User
export const getUserTrips = async (req, res) => {
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Trip
export const getTripById = async (req, res) => {
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};