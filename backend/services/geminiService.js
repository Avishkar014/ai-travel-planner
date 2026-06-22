import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const generateItinerary = async (tripData) => {
  const {
  startingLocation,
  destination,
  days,
  interests,
  budget,
  travelers,
  transportType,
  stayType,
} = tripData;

  try {
    const prompt = `
You are a professional travel planner.

Create a UNIQUE travel plan.

Starting Location: ${startingLocation}
Destination: ${destination}
Duration: ${days} days
Travelers: ${travelers}
Transport: ${transportType}
Accommodation: ${stayType}
Budget Tier: ${budget}
Interests: ${interests.join(", ")}

Requirements:

1. Use REAL attractions for ${destination}
2. Use REAL local food recommendations
3. Create DIFFERENT plans for different cities
4. Budget should depend on:
   - destination
   - number of days
   - travelers
   - budget tier
5. Recommend 3 hotels
6. Include morning, afternoon, evening activities
7. Use realistic INR pricing
8. Return ONLY valid JSON

JSON FORMAT:

{
  "itinerary":[
    {
      "day":1,
      "title":"Arrival & Exploration",
      "activities":[
        "Morning activity",
        "Afternoon activity",
        "Evening activity"
      ]
    }
  ],

  "budget":{
    "tier":"${budget}",
    "estimatedCost":0,

    "breakdown":{
      "flights":0,
      "hotels":0,
      "food":0,
      "activities":0,
      "transport":0
    }
  },

  "hotels":[
    {
      "name":"Hotel Name",
      "category":"Budget | Standard | Luxury",
      "pricePerNight":0,
      "rating":4.5,
      "location":"Area",
      "description":"Short description"
    }
  ]
}
`;
  


    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result =
      await model.generateContent(prompt);

    const response = result.response;

    const text = response.text();

    console.log("Gemini Response:", text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (error) {
    console.error(
      "========== GEMINI ERROR =========="
    );

    console.error(error);

    throw new Error(
      error.message ||
      "Failed to generate itinerary"
    );
  }
};
export const regenerateDayPlan = async ({
  destination,
  day,
  prompt,
}) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const regeneratePrompt = `
Destination: ${destination}

Regenerate Day ${day} itinerary.

User Request:
${prompt}

Return ONLY valid JSON:

{
  "day": ${day},
  "title": "Day Title",
  "activities": [
    "Activity 1",
    "Activity 2",
    "Activity 3",
    "Activity 4"
  ]
}
`;

    const result =
      await model.generateContent(
        regeneratePrompt
      );

    const text =
      result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "REGENERATE DAY GEMINI ERROR:",
      error
    );

    throw error;
  }
};