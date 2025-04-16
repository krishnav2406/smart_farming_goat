# FarmSmart - Intelligent Farming Platform

FarmSmart is an AI-powered farming management system designed to help farmers optimize their agricultural operations through data-driven insights, real-time monitoring, and predictive analytics.

## Features

- **Live News Feed**: Stay updated with the latest farming news and trends
- **Weather Forecasting**: Access accurate weather predictions for better planning
- **Crop Health Analysis**: AI-powered disease detection and treatment recommendations
- **Farm Condition Prediction**: Analyze soil and environmental data to optimize planting
- **Inventory Management**: Track farm equipment, supplies, and resources
- **Financial Analytics**: Monitor expenses, revenue, and profitability metrics

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Google Gemini AI for crop disease analysis and predictions
- **APIs**: Weather data, News aggregation

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account
- Google Cloud account (for Gemini API)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/smart-farming-goat.git
   cd smart-farming-goat
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env.local`
   - Fill in your API keys and configuration values

4. Run the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src` - Application source code
  - `/app` - Next.js pages and layouts
  - `/components` - Reusable UI components
  - `/lib` - Utility libraries and API clients
  - `/hooks` - Custom React hooks
  - `/providers` - Context providers for state management
- `/supabase` - Supabase configuration and migrations
- `/public` - Static assets

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_GOOGLE_AI_API_KEY=your_google_api_key
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_LOCATION=us-central1
```

## Contributors

- Your Name (@yourusername)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
