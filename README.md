## web-prjct

React app for exercise browsing and BMI calculation.

## Prerequisites

- Node.js 18+
- npm 9+
- RapidAPI key with access to:
  - `exercisedb.p.rapidapi.com`
  - `youtube-search-and-download.p.rapidapi.com`

## Setup

1. Copy env template:
   - `cp .env.example .env`
2. Fill keys in `.env`.
3. Install dependencies:
   - `npm install`
4. Run development server:
   - `npm start`
5. Open:
   - `http://localhost:3000`

## Environment Variables

- `REACT_APP_RAPID_API_KEY` - API key used for ExerciseDB requests.
- `REACT_APP_YOUTUBE_RAPID_API_KEY` - Optional separate key for YouTube API requests.  
  If not set, the app falls back to `REACT_APP_RAPID_API_KEY`.

## Build

- `npm run build`
