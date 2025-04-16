import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";
import { createClient } from "../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getWeatherData } from "@/lib/weather";
import dynamicImport from "next/dynamic";
import { Suspense } from "react";
import LocationSearchWrapper from "./location-search-wrapper";
import { cookies } from "next/headers";

// Ensure this page is never cached
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Dynamically import icons to avoid SSR issues
const LucideIcon = dynamicImport(() => import("lucide-react").then((mod) => {
  const icons = {
    "cloud": mod.Cloud,
    "cloud-rain": mod.CloudRain,
    "cloud-snow": mod.CloudSnow,
    "sun": mod.Sun,
    "cloud-lightning": mod.CloudLightning,
    "cloud-fog": mod.CloudFog,
  };
  return ({ name, ...props }: { name: string; [key: string]: any }) => {
    const Icon = icons[name as keyof typeof icons] || mod.Cloud;
    return <Icon {...props} />;
  };
}), { ssr: false });

// Dynamically import the OpenMeteoHistoricalDemo component to avoid SSR issues with charts
const OpenMeteoHistoricalDemoWrapper = dynamicImport(
  () => import("@/components/open-meteo-demo").then(mod => ({ default: mod.OpenMeteoHistoricalDemo })),
  { ssr: false }
);

export default async function WeatherForecastingPage({
  searchParams
}: {
  searchParams?: { location?: string }
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Add a cache buster to force new data on each request
  const timestamp = Date.now();

  // Get location from search params or use default
  const location = searchParams?.location || "Chennai, India";
  
  // Fetch weather data using WeatherStack API
  const weatherData = await getWeatherData(location);

  // Enable weather debugging in client
  const script = `
    try {
      localStorage.setItem('debug_weather', 'true');
      console.log('Weather debugging enabled');
    } catch (e) {}
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <h1 className="text-3xl font-bold">Weather Forecasting</h1>
          
          <Suspense fallback={<div className="h-10 w-64 bg-gray-100 animate-pulse rounded"></div>}>
            <LocationSearchWrapper defaultLocation={location} />
          </Suspense>
        </div>

        {/* Current Location Display */}
        <div className="mb-6 text-gray-600">
          <p>Current location: <span className="font-medium">{location}</span></p>
          <p className="text-xs text-gray-400">Data refreshed at: {new Date().toLocaleTimeString()}</p>
        </div>

        {/* Current Weather Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center">
                <LucideIcon name={weatherData.current.icon} className="w-16 h-16 text-blue-500 mr-4" />
                <div>
                  <p className="text-4xl font-bold">{weatherData.current.temperature}</p>
                  <p className="text-gray-600">{weatherData.current.condition}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-red-500 mr-2" />
                  <span>High: {weatherData.current.high}</span>
                </div>
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Low: {weatherData.current.low}</span>
                </div>
                <div className="flex items-center">
                  <Wind className="w-5 h-5 text-gray-500 mr-2" />
                  <span>Wind: {weatherData.current.wind}</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 text-blue-400 mr-2" />
                  <span>Humidity: {weatherData.current.humidity}</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-3">Hourly Forecast</h3>
              <div className="grid grid-cols-4 gap-2">
                {weatherData.hourly.map((hour, i) => (
                  <div key={i} className="text-center p-2">
                    <p className="text-sm">{hour.time}</p>
                    <LucideIcon name={hour.icon} className="w-8 h-8 mx-auto my-1 text-blue-500" />
                    <p className="font-medium">{hour.temp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">7-Day Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weatherData.daily.map((day, i) => (
              <div key={i} className="text-center p-3 border rounded-lg">
                <p className="font-medium">{day.day}</p>
                <LucideIcon name={day.icon} className="w-10 h-10 mx-auto my-2 text-blue-500" />
                <p className="text-lg font-semibold">{day.temp}</p>
                <p className="text-sm text-gray-600">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Weather Alerts</h2>
          {weatherData.alerts.length > 0 ? (
            <div className="space-y-4">
              {weatherData.alerts.map((alert, i) => (
                <div key={i} className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-yellow-800">{alert}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mb-4">
              No active weather alerts for your location.
            </p>
          )}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Set Custom Alerts</h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure alerts for specific weather conditions relevant to your
              crops.
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Configure Alerts
            </button>
          </div>
        </div>

        {/* Open-Meteo Historical Demo */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Historical Weather Analysis</h2>
          <p className="text-gray-600 mb-4">
            View historical weather data to help plan your farming activities. This data is powered by the Open-Meteo API.
          </p>
          <Suspense fallback={<div className="h-80 bg-gray-100 animate-pulse rounded-xl"></div>}>
            <OpenMeteoHistoricalDemoWrapper />
          </Suspense>
        </div>
      </main>

      <Footer />
      
      {/* Enable debug mode */}
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  );
}
