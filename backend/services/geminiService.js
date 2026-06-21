import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const generateItinerary = async (tripData) => {
  const {
    destination,
    days,
    interests,
    budget,
  } = tripData;

  try {
    const prompt = `
Generate a detailed travel itinerary.

Destination: ${destination}
Duration: ${days} days
Budget: ${budget}
Interests: ${interests.join(", ")}

Requirements:
- Use real attractions specific to the destination
- Suggest famous local food places
- Recommend suitable hotels
- Create different plans for different destinations
- Include morning, afternoon and evening activities
- Return ONLY valid JSON

Format:

{
  "itinerary":[
    {
      "day":1,
      "title":"Day Title",
      "activities":[
        "Morning activity",
        "Afternoon activity",
        "Evening activity"
      ]
    }
  ],
  "budget":{
    "tier":"${budget}",
    "estimatedCost":15000
  },
  "hotels":[
    {
      "name":"Hotel Name",
      "pricePerNight":3000,
      "rating":4.5
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

    return JSON.parse(cleaned);
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