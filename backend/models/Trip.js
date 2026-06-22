import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // NEW
    startingLocation: {
      type: String,
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

    travelers: {
      type: Number,
      default: 1,
    },

    // NEW
    transportType: {
      type: String,
      default: "flight",
    },

    // NEW
    stayType: {
      type: String,
      default: "hotel",
    },

    budgetTier: {
      type: String,
      required: true,
    },

    interests: [String],

    itinerary: [
      {
        day: Number,

        title: String,

        activities: [String],
      },
    ],

    estimatedBudget: {
      tier: String,

      estimatedCost: Number,

      currency: {
        type: String,
        default: "INR",
      },

      breakdown: {
        flights: {
          type: Number,
          default: 0,
        },

        hotels: {
          type: Number,
          default: 0,
        },

        food: {
          type: Number,
          default: 0,
        },

        activities: {
          type: Number,
          default: 0,
        },

        transport: {
          type: Number,
          default: 0,
        },
      },
    },

    hotels: [
      {
        name: String,

        category: String,

        pricePerNight: Number,

        rating: Number,

        location: String,

        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model(
  "Trip",
  tripSchema
);

export default Trip;