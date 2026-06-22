import express from "express";
import protect from "../middleware/auth.js";

import {
  generateTrip,
  getUserTrips,
  getTripById,
  regenerateDay,
  deleteActivity,
  addActivity,
} from "../controllers/tripController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Trip Routes
|--------------------------------------------------------------------------
*/

// Generate New Trip
router.post(
  "/generate",
  protect,
  generateTrip
);

// Get All User Trips
router.get(
  "/",
  protect,
  getUserTrips
);

// Get Single Trip
router.get(
  "/:id",
  protect,
  getTripById
);

// Delete Activity
router.delete(
  "/:id/day/:dayIndex/activity/:activityIndex",
  protect,
  deleteActivity
);

// Add Activity
router.post(
  "/:id/add-activity",
  protect,
  addActivity
);

// Regenerate Day using AI
router.post(
  "/:id/regenerate-day",
  protect,
  regenerateDay
);

export default router;