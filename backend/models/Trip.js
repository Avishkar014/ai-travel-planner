import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    durationDays: {
      type: Number,
      required: true,
    },

    budgetTier: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    interests: [
      {
        type: String,
      },
    ],

    itinerary: {
      type: Array,
      default: [],
    },

    estimatedBudget: {
      type: Number,
      default: 0,
    },

    hotels: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;