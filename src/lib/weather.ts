// Weather service for WeatherStack API

export type WeatherData = {
  current: {
    temperature: number;
    weather_descriptions: string[];
    humidity: number;
    wind_speed: number;
    feelslike: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast?: {
    [date: string]: {
      mintemp: number;
      maxtemp: number;
      avgtemp: number;
      hourly: Array<{
        time: string;
        temperature: number;
        weather_descriptions: string[];
      }>;
    };
  };
};

export type LocationResult = {
  name: string;
  country: string;
  region: string;
  lon: string;
  lat: string;
  timezone_id: string;
  utc_offset: string;
};

export type AutocompleteResponse = {
  request: {
    query: string;
    results: number;
  };
  results: LocationResult[];
  success?: boolean;
  error?: any;
};

export type ForecastDay = {
  day: string;
  temp: string;
  condition: string;
  icon: string;
};

export type WeatherForecast = {
  current: {
    temperature: string;
    condition: string;
    high: string;
    low: string;
    wind: string;
    humidity: string;
    icon: string;
  };
  hourly: Array<{
    time: string;
    temp: string;
    icon: string;
  }>;
  daily: ForecastDay[];
  alerts: string[];
};

// Enable detailed logging based on localStorage setting
const isDebugMode = () => {
  try {
    return typeof window !== 'undefined' && localStorage.getItem('debug_weather') === 'true';
  } catch (e) {
    return false;
  }
};

/**
 * Searches for locations matching the query using the WeatherStack autocomplete API
 * @param query The search term for location lookup
 * @returns Array of matching locations or empty array if none found or error
 */
export async function searchLocations(query: string): Promise<LocationResult[]> {
  try {
    const apiKey = process.env.WEATHERSTACK_API_KEY;
    if (isDebugMode()) console.log(`Searching for locations with query: ${query}`);
    
    // Determine protocol (use https for localhost development)
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const protocol = isLocalhost ? 'https' : 'http';
    
    const url = `${protocol}://api.weatherstack.com/autocomplete?access_key=${apiKey}&query=${encodeURIComponent(query)}`;
    if (isDebugMode()) console.log(`Autocomplete URL: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Location search API error: ${response.status}`);
    }
    
    const data = await response.json() as AutocompleteResponse;
    
    // Check if API returned an error
    if (data.success === false) {
      console.error('WeatherStack Autocomplete API error:', data.error);
      return [];
    }
    
    if (isDebugMode()) console.log(`Found ${data.results?.length || 0} locations for query: ${query}`);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching location data:', error);
    return [];
  }
}

/**
 * Gets weather data for the specified location
 * @param location Location to get weather for (default: Chennai, India)
 * @returns Weather forecast data
 */
export async function getWeatherData(location: string = 'Chennai, India'): Promise<WeatherForecast> {
  try {
    // Cache buster to prevent cached responses
    const cacheBuster = new Date().getTime();
    
    // Actual API call to WeatherStack
    const apiKey = 'bb111f115972fa2316e957557e4758ad';
    if (isDebugMode()) console.log(`Fetching weather data for ${location} with key: ${apiKey?.substring(0, 5)}...`);
    
    // Determine protocol (use https for localhost development)
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const protocol = isLocalhost ? 'https' : 'http';
    
    // Use the current weather endpoint which is available in free tier
    const url = `${protocol}://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(location)}&units=f&cache=${cacheBuster}`;
    
    if (isDebugMode()) console.log(`Fetching from URL: ${url}`);
    
    const response = await fetch(url, { cache: 'no-store' });
    
    // Log the response status
    if (isDebugMode()) console.log(`WeatherStack API response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the API returned an error
    if (data.success === false) {
      console.error('WeatherStack API error:', data.error);
      throw new Error(`WeatherStack API error: ${data.error?.info || 'Unknown error'}`);
    }
    
    if (isDebugMode()) console.log('Weather data received:', JSON.stringify(data, null, 2));
    
    // Check if we have valid weather data
    if (!data.current || !data.current.temperature) {
      console.error('Invalid weather data received:', data);
      throw new Error('Invalid weather data received from API');
    }
    
    // Transform the data to match our application's format
    const forecast: WeatherForecast = {
      current: {
        temperature: `${data.current?.temperature || 0}°F`,
        condition: data.current?.weather_descriptions?.[0] || 'Unknown',
        high: `${Math.round((data.current?.temperature || 0) + 5)}°F`,
        low: `${Math.round((data.current?.temperature || 0) - 5)}°F`,
        wind: `${data.current?.wind_speed || 0} mph`,
        humidity: `${data.current?.humidity || 0}%`,
        icon: getWeatherIcon(data.current?.weather_descriptions?.[0]),
      },
      hourly: generateForecastFromCurrent(data.current?.temperature || 0),
      daily: generateDailyForecastFromCurrent(data.current?.temperature || 0),
      alerts: [],
    };
    
    if (isDebugMode()) console.log('Transformed weather forecast:', forecast);
    return forecast;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Fall back to mock data if the API fails
    return getMockWeatherData();
  }
}

// Generate hourly forecast from WeatherStack data
function generateHourlyForecast(data: any) {
  if (!data.forecast || Object.keys(data.forecast).length === 0 || !data.forecast[Object.keys(data.forecast)[0]]?.hourly) {
    // If forecast data is not available, generate dummy data
    return generateForecastFromCurrent(data.current?.temperature || 0);
  }
  
  const today = Object.keys(data.forecast)[0];
  const hourlyData = data.forecast[today].hourly;
  
  // Take the first 4 hourly entries
  return hourlyData.slice(0, 4).map((hour: any) => {
    const hourNum = parseInt(hour.time, 10);
    let timeStr = 'Now';
    
    if (hourNum === 0) timeStr = 'Midnight';
    else if (hourNum === 1200) timeStr = 'Noon';
    else if (hourNum < 1200) timeStr = `${hourNum / 100}AM`;
    else timeStr = `${(hourNum - 1200) / 100}PM`;
    
    return {
      time: timeStr,
      temp: `${hour.temperature}°F`,
      icon: getWeatherIcon(hour.weather_descriptions?.[0]),
    };
  });
}

// Generate daily forecast from WeatherStack data
function generateDailyForecast(data: any): ForecastDay[] {
  if (!data.forecast || Object.keys(data.forecast).length === 0) {
    // If forecast data is not available, generate dummy data
    return generateDailyForecastFromCurrent(data.current?.temperature || 0);
  }
  
  const days = ['Today', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const forecastDays = Object.keys(data.forecast);
  
  return forecastDays.map((dateStr, i) => {
    const day = data.forecast[dateStr];
    return {
      day: i === 0 ? 'Today' : days[i],
      temp: `${day.avgtemp || Math.round((day.maxtemp + day.mintemp) / 2)}°F`,
      condition: day.hourly[0]?.weather_descriptions?.[0] || 'Unknown',
      icon: getWeatherIcon(day.hourly[0]?.weather_descriptions?.[0]),
    };
  });
}

// Generate hourly forecast based on current temperature
function generateForecastFromCurrent(currentTemp: number) {
  const hours = ['Now', '1PM', '2PM', '3PM'];
  return hours.map((hour, i) => ({
    time: hour,
    temp: `${Math.round(currentTemp + i)}°F`,
    icon: i % 2 === 0 ? 'cloud' : 'sun',
  }));
}

// Generate daily forecast based on current temperature
function generateDailyForecastFromCurrent(currentTemp: number): ForecastDay[] {
  const days = ['Today', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const conditions = ['Partly Cloudy', 'Sunny', 'Sunny', 'Partly Cloudy', 'Cloudy', 'Rain', 'Partly Cloudy'];
  
  return days.map((day, i) => ({
    day,
    temp: `${Math.round(currentTemp + Math.random() * 10 - 5)}°F`,
    condition: conditions[i],
    icon: getWeatherIcon(conditions[i]),
  }));
}

// Alternative API for weather data (as a backup)
async function getAlternativeWeatherData(location: string): Promise<WeatherForecast> {
  // This is a placeholder for an alternative API
  // In a real application, you would implement a call to a different weather API
  // For now, just throw an error to fall back to mock data
  throw new Error("Alternative API not implemented");
}

// Helper function to get weather icon based on condition
function getWeatherIcon(condition?: string): string {
  if (!condition) return 'cloud';
  
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('rain')) return 'cloud-rain';
  if (lowerCondition.includes('snow')) return 'cloud-snow';
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) return 'sun';
  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) return 'cloud-lightning';
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return 'cloud-fog';
  
  return 'cloud';
}

/**
 * Gets weather data for the specified location, using Open-Meteo API
 * This is a wrapper around getOpenMeteoForecast that converts location to coordinates
 * @param location Location to get weather for (default: Chennai, India)
 * @returns Weather forecast data
 */
export async function getOpenMeteoWeatherData(location: string = 'Chennai, India'): Promise<WeatherForecast> {
  try {
    // For simplicity, we'll use default coordinates for Chennai
    // In a real app, you would use a geocoding service to convert location to coordinates
    let latitude = 13.0878;
    let longitude = 80.2785;
    
    // Handle a few basic locations manually (for demo purposes)
    if (location.toLowerCase().includes('mumbai')) {
      latitude = 19.0760;
      longitude = 72.8777;
    } else if (location.toLowerCase().includes('delhi')) {
      latitude = 28.6139;
      longitude = 77.2090;
    } else if (location.toLowerCase().includes('bangalore')) {
      latitude = 12.9716;
      longitude = 77.5946;
    }
    
    // Import and use the Open-Meteo function
    const { getOpenMeteoForecast } = await import('./open-meteo');
    return await getOpenMeteoForecast(latitude, longitude);
  } catch (error) {
    console.error('Error fetching Open-Meteo weather data:', error);
    // Fall back to the original weather data
    return getWeatherData(location);
  }
}

// Fallback mock data in case the API fails
function getMockWeatherData(): WeatherForecast {
  return {
    current: {
      temperature: '22°F',
      condition: 'Partly Cloudy',
      high: '26°F',
      low: '18°F',
      wind: '8 mph',
      humidity: '45%',
      icon: 'cloud',
    },
    hourly: [
      { time: 'Now', temp: '22°F', icon: 'cloud' },
      { time: '1PM', temp: '23°F', icon: 'sun' },
      { time: '2PM', temp: '24°F', icon: 'cloud' },
      { time: '3PM', temp: '25°F', icon: 'sun' },
    ],
    daily: [
      { day: 'Today', temp: '22°F', condition: 'Partly Cloudy', icon: 'cloud' },
      { day: 'Tue', temp: '25°F', condition: 'Sunny', icon: 'sun' },
      { day: 'Wed', temp: '27°F', condition: 'Sunny', icon: 'sun' },
      { day: 'Thu', temp: '24°F', condition: 'Partly Cloudy', icon: 'cloud' },
      { day: 'Fri', temp: '20°F', condition: 'Cloudy', icon: 'cloud' },
      { day: 'Sat', temp: '18°F', condition: 'Rain', icon: 'cloud-rain' },
      { day: 'Sun', temp: '21°F', condition: 'Partly Cloudy', icon: 'cloud' },
    ],
    alerts: [],
  };
} 