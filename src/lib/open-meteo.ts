import { fetchWeatherApi } from 'openmeteo';
import { WeatherForecast, ForecastDay } from './weather';

/**
 * Gets weather forecast data from Open-Meteo API
 * @param latitude Latitude of the location
 * @param longitude Longitude of the location
 * @returns Weather forecast data in the application's format
 */
export async function getOpenMeteoForecast(
  latitude: number = 13.0878, // Default to Chennai
  longitude: number = 80.2785
): Promise<WeatherForecast> {
  try {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // 7-day forecast

    const params = {
      "latitude": latitude,
      "longitude": longitude,
      "start_date": formatDate(startDate),
      "end_date": formatDate(endDate),
      "hourly": ["temperature_2m", "relative_humidity_2m", "weather_code", "wind_speed_10m"],
      "daily": ["temperature_2m_max", "temperature_2m_min", "weather_code"],
      "timezone": "auto"
    };
    
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    // Process first location
    const response = responses[0];
    
    // Get timezone and location information
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    
    // Get hourly data
    const hourly = response.hourly()!;
    
    // Get all the variable data we need
    const temperature2m = hourly.variables(0)!.valuesArray()!;
    const humidity = hourly.variables(1)!.valuesArray()!;
    const weatherCode = hourly.variables(2)!.valuesArray()!;
    const windSpeed = hourly.variables(3)!.valuesArray()!;
    
    // Create hourly timestamps - this is based on current time
    const hourlyTimes: Date[] = [];
    for (let i = 0; i < 24; i++) {
      const date = new Date();
      date.setHours(date.getHours() + i);
      hourlyTimes.push(date);
    }
    
    // Get daily data
    const daily = response.daily()!;
    const temperatureMax = daily.variables(0)!.valuesArray()!;
    const temperatureMin = daily.variables(1)!.valuesArray()!;
    const dailyWeatherCode = daily.variables(2)!.valuesArray()!;
    
    // Create daily timestamps - next 7 days
    const dailyTimes: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dailyTimes.push(date);
    }

    // Format current weather
    const currentTemp = temperature2m[0];
    const currentWeatherCode = weatherCode[0];
    const currentCondition = getWeatherCondition(currentWeatherCode);
    
    // Build the forecast object
    const forecast: WeatherForecast = {
      current: {
        temperature: `${Math.round(currentTemp)}°C`,
        condition: currentCondition,
        high: `${Math.round(temperatureMax[0])}°C`,
        low: `${Math.round(temperatureMin[0])}°C`,
        wind: `${Math.round(windSpeed[0])} km/h`,
        humidity: `${Math.round(humidity[0])}%`,
        icon: getWeatherIcon(currentWeatherCode),
      },
      hourly: hourlyTimes.slice(0, 4).map((time, i) => ({
        time: formatHourlyTime(time),
        temp: `${Math.round(temperature2m[i])}°C`,
        icon: getWeatherIcon(weatherCode[i]),
      })),
      daily: dailyTimes.map((time, i) => ({
        day: formatDayName(time),
        temp: `${Math.round(temperatureMax[i])}°C`,
        condition: getWeatherCondition(dailyWeatherCode[i]),
        icon: getWeatherIcon(dailyWeatherCode[i]),
      })),
      alerts: [], // Open-Meteo free plan doesn't include alerts
    };
    
    return forecast;
  } catch (error) {
    console.error('Error fetching Open-Meteo data:', error);
    throw error;
  }
}

/**
 * Formats a date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format time for hourly display
 */
function formatHourlyTime(date: Date): string {
  if (date.getHours() === new Date().getHours()) return 'Now';
  return date.toLocaleTimeString([], {hour: 'numeric'});
}

/**
 * Format day name for daily forecast
 */
function formatDayName(date: Date): string {
  const today = new Date();
  if (date.getDate() === today.getDate()) return 'Today';
  return date.toLocaleDateString([], {weekday: 'short'});
}

/**
 * Convert WMO weather code to condition text
 * @see https://open-meteo.com/en/docs
 */
function getWeatherCondition(code: number): string {
  // WMO Weather interpretation codes (WW)
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 49) return 'Fog';
  if (code >= 51 && code <= 59) return 'Drizzle';
  if (code >= 61 && code <= 69) return 'Rain';
  if (code >= 71 && code <= 79) return 'Snow';
  if (code >= 80 && code <= 84) return 'Rain showers';
  if (code >= 85 && code <= 94) return 'Snow showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Unknown';
}

/**
 * Convert WMO weather code to icon name
 */
function getWeatherIcon(code: number): string {
  // Map WMO codes to icon names used by the app
  if (code === 0 || code === 1) return 'sun';
  if (code === 2) return 'cloud';
  if (code === 3) return 'cloud';
  if (code >= 45 && code <= 49) return 'cloud-fog';
  if ((code >= 51 && code <= 59) || (code >= 61 && code <= 69) || (code >= 80 && code <= 84)) return 'cloud-rain';
  if ((code >= 71 && code <= 79) || (code >= 85 && code <= 94)) return 'cloud-snow';
  if (code >= 95) return 'cloud-lightning';
  return 'cloud';
} 