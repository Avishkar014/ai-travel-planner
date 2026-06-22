# AI Travel Planner

## Project Overview

AI Travel Planner is a full-stack web application that helps users generate personalized travel itineraries using Artificial Intelligence. Users can enter their travel preferences such as destination, duration, budget, transportation type, accommodation type, and interests. The system generates a complete day-by-day travel plan along with budget estimates and trip details.

The application also allows users to manage their trips, view generated itineraries, regenerate specific days, and customize their travel experience.

---

## Tech Stack

### Frontend

* Next.js 15
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

### AI Integration

* Google Gemini API

### Deployment

* Frontend: Vercel
* Backend: Render

### Why This Tech Stack?

* Next.js provides fast rendering, routing, and excellent developer experience.
* Express.js offers a lightweight and scalable backend architecture.
* MongoDB is flexible for storing dynamic itinerary data.
* JWT provides stateless authentication.
* Gemini API enables intelligent itinerary generation.

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Avishkar014/ai-travel-planner.git
cd ai-travel-planner
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start Backend

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start Frontend

```bash
npm run dev
```

---

## Deployed Application

### Frontend

https://ai-travel-planner-six-swart.vercel.app

### Backend

https://travel-planner-backend-h3tz.onrender.com

---

## High-Level Architecture

```text
User
  │
  ▼
Next.js Frontend
  │
  ▼
Express API Server
  │
  ├── JWT Authentication
  ├── Trip Management
  ├── AI Itinerary Generation
  │
  ▼
Gemini API

  │
  ▼
MongoDB Atlas
```

Workflow:

1. User submits trip preferences.
2. Frontend sends request to Express backend.
3. Backend validates user authentication.
4. Backend sends structured prompt to Gemini API.
5. Gemini generates itinerary.
6. Generated itinerary is stored in MongoDB.
7. Results are returned to frontend and displayed to user.

---

## Authentication and Authorization

### Authentication

* User registration using email and password.
* Passwords are hashed using bcryptjs.
* JWT token generated after successful login.

### Authorization

Protected routes require a valid JWT token.

Examples:

* Create Trip
* View My Trips
* Update Trip
* Regenerate Itinerary

Middleware verifies JWT before allowing access.

---

## AI Agent Design and Purpose

The AI component is powered by Google Gemini.

### Responsibilities

* Generate travel itineraries.
* Recommend activities.
* Suggest transportation planning.
* Estimate budgets.
* Create day-wise schedules.

### Input

* Destination
* Starting Location
* Duration
* Budget
* Accommodation Type
* Transportation Type
* Interests
* Number of Travelers

### Output

* Day-wise itinerary
* Activities
* Recommendations
* Estimated budget

This transforms user preferences into structured travel plans.

---

## Creative / Custom Feature

### AI Day Regeneration

A custom feature was implemented that allows users to regenerate a specific day of an itinerary instead of regenerating the entire trip.

### Problem Solved

Users may be satisfied with most of their itinerary but dislike a single day's activities. Regenerating the entire trip is inefficient and may remove preferred plans.

### Benefits

* Improved user experience
* More personalization
* Reduced AI API usage
* Faster itinerary modifications

This feature demonstrates creativity, problem-solving, and engineering judgment by balancing AI automation with user control.

---

## Key Design Decisions and Trade-Offs

### Decision 1: JWT Authentication

Chosen because it is lightweight and scalable.

Trade-off:

* Token management on client side.

### Decision 2: MongoDB

Chosen due to flexible document structure.

Trade-off:

* Less strict schema enforcement compared to relational databases.

### Decision 3: Gemini API

Chosen for high-quality itinerary generation.

Trade-off:

* Dependence on external AI service.
* API usage limits.

### Decision 4: Day Regeneration

Chosen to improve user experience.

Trade-off:

* Additional prompt engineering complexity.

---

## Known Limitations

* Budget estimates are approximate and not real-time.
* AI recommendations depend on Gemini API quality.
* No live hotel or flight booking integration.
* No real-time weather integration.
* Free-tier deployment services may experience cold starts.
* Generated itineraries may occasionally require manual adjustments.

---

## Future Improvements

* Live hotel and flight integration
* Weather-aware itinerary generation
* Multi-language support
* Collaborative trip planning
* Maps integration
* Expense tracking
* AI chat assistant for travel recommendations

---

## Author

Avishkar Tambe

GitHub:
https://github.com/Avishkar014

LinkedIn:
https://www.linkedin.com/in/avishkar-tambe
