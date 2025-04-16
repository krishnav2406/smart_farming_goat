import { getWeatherData, WeatherForecast } from './weather';
import { getFarmWeatherData, FarmWeatherData } from './farm-weather';

// Define input type for farm prediction
export interface FarmPredictionInput {
  location: string;
  soilMoisture: number; // percentage
  soilTemp: number; // celsius
  soilPH: number; // pH scale 0-14
  cropType: string;
}

// Define prediction output interface
export interface FarmPrediction {
  plantingScore: number; // 0-100
  idealPlantingConditions: boolean;
  frostRisk: boolean;
  heatStressRisk: boolean;
  irrigationRecommended: boolean;
  recommendations: string[];
}

// Crop-specific optimal conditions
const cropOptimalConditions: Record<string, {
  tempMin: number;
  tempMax: number;
  humidityMin: number;
  humidityMax: number;
  soilMoistureMin: number;
  soilMoistureMax: number;
  soilTempMin: number;
  soilTempMax: number;
  soilPHMin: number;
  soilPHMax: number;
}> = {
  rice: {
    tempMin: 20,
    tempMax: 35,
    humidityMin: 60,
    humidityMax: 90,
    soilMoistureMin: 70,
    soilMoistureMax: 90,
    soilTempMin: 15,
    soilTempMax: 30,
    soilPHMin: 5.5,
    soilPHMax: 7.5,
  },
  wheat: {
    tempMin: 12,
    tempMax: 24,
    humidityMin: 40,
    humidityMax: 70,
    soilMoistureMin: 40,
    soilMoistureMax: 70,
    soilTempMin: 10,
    soilTempMax: 25,
    soilPHMin: 6.0,
    soilPHMax: 7.5,
  },
  corn: {
    tempMin: 16,
    tempMax: 32,
    humidityMin: 45,
    humidityMax: 75,
    soilMoistureMin: 50,
    soilMoistureMax: 80,
    soilTempMin: 12,
    soilTempMax: 28,
    soilPHMin: 5.8,
    soilPHMax: 7.0,
  },
  vegetables: {
    tempMin: 15,
    tempMax: 30,
    humidityMin: 50,
    humidityMax: 80,
    soilMoistureMin: 60,
    soilMoistureMax: 80,
    soilTempMin: 12,
    soilTempMax: 26,
    soilPHMin: 6.0,
    soilPHMax: 7.0,
  },
  fruits: {
    tempMin: 18,
    tempMax: 33,
    humidityMin: 50,
    humidityMax: 80,
    soilMoistureMin: 50,
    soilMoistureMax: 70,
    soilTempMin: 15,
    soilTempMax: 28,
    soilPHMin: 6.0,
    soilPHMax: 7.5,
  },
};

// Calculate a scoring function (0-100) based on how close conditions are to optimal
function calculateConditionScore(value: number, min: number, max: number): number {
  if (value < min) {
    // Below minimum: score decreases as you go further below min
    return Math.max(0, 100 - ((min - value) / min) * 100);
  } else if (value > max) {
    // Above maximum: score decreases as you go further above max
    return Math.max(0, 100 - ((value - max) / max) * 100);
  } else {
    // Within optimal range: score is best in the middle of the range
    const middle = (min + max) / 2;
    const range = (max - min) / 2;
    const distanceFromMiddle = Math.abs(value - middle);
    return 100 - (distanceFromMiddle / range) * 25; // Only reduce by 25% max within optimal range
  }
}

// Generate farming recommendations based on conditions
function generateRecommendations(
  weatherData: FarmWeatherData,
  soilData: { moisture: number; temp: number; ph: number },
  cropType: string,
  prediction: FarmPrediction
): string[] {
  const recommendations: string[] = [];
  const optimal = cropOptimalConditions[cropType] || cropOptimalConditions.vegetables;
  
  // Temperature recommendations
  if (weatherData.current.temperature < optimal.tempMin) {
    recommendations.push(`Current temperature is low (${weatherData.current.temperature}°C). Consider waiting for warmer conditions or use protective covers.`);
  } else if (weatherData.current.temperature > optimal.tempMax) {
    recommendations.push(`High temperature detected (${weatherData.current.temperature}°C). Consider planting during cooler parts of the day and ensure adequate irrigation.`);
  }
  
  // Humidity recommendations
  if (weatherData.current.humidity < optimal.humidityMin) {
    recommendations.push(`Low humidity levels (${weatherData.current.humidity}%). Consider increasing irrigation frequency.`);
  } else if (weatherData.current.humidity > optimal.humidityMax) {
    recommendations.push(`High humidity levels (${weatherData.current.humidity}%). Monitor for disease and ensure adequate air circulation.`);
  }
  
  // Soil moisture recommendations
  if (soilData.moisture < optimal.soilMoistureMin) {
    recommendations.push(`Soil moisture is low (${soilData.moisture}%). Irrigation is recommended before planting.`);
  } else if (soilData.moisture > optimal.soilMoistureMax) {
    recommendations.push(`Soil moisture is high (${soilData.moisture}%). Consider improving drainage or waiting for drier conditions.`);
  }
  
  // Soil pH recommendations
  if (soilData.ph < optimal.soilPHMin) {
    recommendations.push(`Soil pH is too acidic (${soilData.ph}). Consider applying lime to raise pH for optimal ${cropType} growth.`);
  } else if (soilData.ph > optimal.soilPHMax) {
    recommendations.push(`Soil pH is too alkaline (${soilData.ph}). Consider applying sulfur or organic matter to lower pH for ${cropType}.`);
  }
  
  // Wind recommendations
  if (weatherData.current.windSpeed > 20) {
    recommendations.push(`High wind speed (${weatherData.current.windSpeed} km/h). Consider delaying planting or setting up windbreaks.`);
  }
  
  // Precipitation recommendations
  if (weatherData.current.precipitation > 0) {
    recommendations.push(`Rain is expected (${weatherData.current.precipitation} mm). Plan field operations accordingly.`);
  }
  
  // Add irrigation recommendation
  if (prediction.irrigationRecommended) {
    recommendations.push('Irrigation is recommended based on current conditions.');
  }
  
  return recommendations;
}

// Main prediction function
export async function predictFarmingConditions(input: FarmPredictionInput): Promise<{
  success: boolean;
  prediction?: FarmPrediction;
  error?: string;
}> {
  try {
    // Get weather data for the location
    const weatherData = await getFarmWeatherData(input.location);
    
    if (!weatherData.success) {
      return {
        success: false,
        error: weatherData.error || 'Failed to retrieve weather data',
      };
    }
    
    const weather = weatherData.current;
    const cropType = input.cropType || 'vegetables';
    const optimal = cropOptimalConditions[cropType] || cropOptimalConditions.vegetables;
    
    // Calculate scores for each condition (0-100)
    const tempScore = calculateConditionScore(weather.temperature, optimal.tempMin, optimal.tempMax);
    const humidityScore = calculateConditionScore(weather.humidity, optimal.humidityMin, optimal.humidityMax);
    const soilMoistureScore = calculateConditionScore(input.soilMoisture, optimal.soilMoistureMin, optimal.soilMoistureMax);
    const soilTempScore = calculateConditionScore(input.soilTemp, optimal.soilTempMin, optimal.soilTempMax);
    const soilPHScore = calculateConditionScore(input.soilPH, optimal.soilPHMin, optimal.soilPHMax);
    
    // Calculate overall planting score with different weights
    const plantingScore = (
      tempScore * 0.25 +
      humidityScore * 0.15 +
      soilMoistureScore * 0.25 +
      soilTempScore * 0.2 +
      soilPHScore * 0.15
    );
    
    // Determine various risk factors and recommendations
    const frostRisk = weather.temperature < 2;
    const heatStressRisk = weather.temperature > optimal.tempMax + 5;
    const irrigationRecommended = 
      soilMoistureScore < 50 || 
      (weather.temperature > optimal.tempMax * 0.9 && input.soilMoisture < optimal.soilMoistureMax * 0.8);
    
    // Generate the prediction result
    const prediction: FarmPrediction = {
      plantingScore,
      idealPlantingConditions: plantingScore > 70,
      frostRisk,
      heatStressRisk,
      irrigationRecommended,
      recommendations: [],
    };
    
    // Generate detailed recommendations
    prediction.recommendations = generateRecommendations(
      weatherData,
      {
        moisture: input.soilMoisture,
        temp: input.soilTemp,
        ph: input.soilPH,
      },
      cropType,
      prediction
    );
    
    return {
      success: true,
      prediction,
    };
    
  } catch (error) {
    console.error('Farm prediction error:', error);
    return {
      success: false,
      error: 'Failed to generate farm predictions',
    };
  }
} 