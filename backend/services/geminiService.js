export const generateItinerary = async (tripData) => {
  const { destination, days, interests, budget } = tripData;

  return {
    itinerary: [
      {
        day: 1,
        title: `Explore ${destination}`,
        activities: [
          "Visit popular attractions",
          "Local food tour",
          "Evening sightseeing"
        ]
      },
      {
        day: 2,
        title: "Adventure Day",
        activities: [
          "Outdoor activities",
          "Photography spots",
          "Shopping"
        ]
      },
      {
        day: Number(days),
        title: "Relax and Departure",
        activities: [
          "Breakfast",
          "Last-minute shopping",
          "Departure"
        ]
      }
    ],

    budget: {
      tier: budget,
      estimatedCost: 15000
    },

    hotels: [
      {
        name: "Travel Comfort Hotel",
        pricePerNight: 3000,
        rating: 4.5
      }
    ]
  };
};