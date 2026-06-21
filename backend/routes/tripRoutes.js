import express from "express";
import protect from "../middleware/auth.js";

import {
  generateTrip,
  getUserTrips,
  getTripById,
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/generate", protect, generateTrip);

router.get("/", protect, getUserTrips);

router.get("/:id", protect, getTripById);

export default router;