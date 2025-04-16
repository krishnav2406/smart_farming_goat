// Weather data interface for farm predictions
export interface FarmWeatherData {
  success: boolean;
  error?: string;
  current: {
    temperature: number; // celsius
    humidity: number; // percentage
    windSpeed: number; // km/h
    precipitation: number; // mm
    condition: string; // clear, cloudy, rainy, etc.
    date: string; // ISO date string
  };
  forecast?: {
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    humidity: number;
    windSpeed: number;
    precipitation: number;
    condition: string;
  }[];
}

// Mock weather data for development/demo purposes
const mockFarmWeatherData: Record<string, FarmWeatherData> = {
  'New York': {
    success: true,
    current: {
      temperature: 22,
      humidity: 65,
      windSpeed: 12,
      precipitation: 0,
      condition: 'clear',
      date: new Date().toISOString(),
    },
    forecast: [
      {
        date: new Date(Date.now() + 86400000).toISOString(),
        temperature: { min: 18, max: 24 },
        humidity: 70,
        windSpeed: 10,
        precipitation: 20,
        condition: 'rainy',
      },
      {
        date: new Date(Date.now() + 86400000 * 2).toISOString(),
        temperature: { min: 17, max: 23 },
        humidity: 75,
        windSpeed: 15,
        precipitation: 10,
        condition: 'cloudy',
      },
    ],
  },
  'San Francisco': {
    success: true,
    current: {
      temperature: 18,
      humidity: 80,
      windSpeed: 18,
      precipitation: 0,
      condition: 'foggy',
      date: new Date().toISOString(),
    },
    forecast: [
      {
        date: new Date(Date.now() + 86400000).toISOString(),
        temperature: { min: 16, max: 20 },
        humidity: 85,
        windSpeed: 20,
        precipitation: 0,
        condition: 'foggy',
      },
    ],
  },
  'Chicago': {
    success: true,
    current: {
      temperature: 15,
      humidity: 60,
      windSpeed: 25,
      precipitation: 0,
      condition: 'windy',
      date: new Date().toISOString(), 
    },
  },
  'Miami': {
    success: true,
    current: {
      temperature: 30,
      humidity: 85,
      windSpeed: 8,
      precipitation: 5,
      condition: 'partly cloudy',
      date: new Date().toISOString(),
    },
  },
  'Default': {
    success: true,
    current: {
      temperature: 21,
      humidity: 65,
      windSpeed: 10,
      precipitation: 0,
      condition: 'clear',
      date: new Date().toISOString(),
    },
  },
};

/**
 * Get farm-specific weather data for a specific location
 * In a real implementation, this would call a weather API
 */
export async function getFarmWeatherData(location: string): Promise<FarmWeatherData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // This is a mock implementation - in production, you would call a real weather API
    // For example: OpenWeatherMap, WeatherAPI, or similar services
    
    // For demo purposes, we'll just return mock data
    const normalizedLocation = location.trim();
    
    // Check if we have mock data for this location
    if (mockFarmWeatherData[normalizedLocation]) {
      return mockFarmWeatherData[normalizedLocation];
    } else {
      // Check if location is a known city name (simplified approach)
      for (const key of Object.keys(mockFarmWeatherData)) {
        if (normalizedLocation.toLowerCase().includes(key.toLowerCase())) {
          return mockFarmWeatherData[key];
        }
      }
      
      // Return default data if no match
      return mockFarmWeatherData['Default'];
    }
  } catch (error) {
    console.error('Error fetching farm weather data:', error);
    return {
      success: false,
      error: 'Failed to fetch weather data',
      current: {
        temperature: 20,
        humidity: 60,
        windSpeed: 5,
        precipitation: 0,
        condition: 'unknown',
        date: new Date().toISOString(),
      }
    };
  }
} 