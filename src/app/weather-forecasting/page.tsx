import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";
import { createClient } from "../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default async function WeatherForecastingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Weather Forecasting</h1>

        {/* Current Weather Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center">
                <Cloud className="w-16 h-16 text-blue-500 mr-4" />
                <div>
                  <p className="text-4xl font-bold">72°F</p>
                  <p className="text-gray-600">Partly Cloudy</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-red-500 mr-2" />
                  <span>High: 78°F</span>
                </div>
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Low: 65°F</span>
                </div>
                <div className="flex items-center">
                  <Wind className="w-5 h-5 text-gray-500 mr-2" />
                  <span>Wind: 8 mph</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 text-blue-400 mr-2" />
                  <span>Humidity: 45%</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-3">Hourly Forecast</h3>
              <div className="grid grid-cols-4 gap-2">
                {["Now", "1PM", "2PM", "3PM"].map((hour, i) => (
                  <div key={i} className="text-center p-2">
                    <p className="text-sm">{hour}</p>
                    <Cloud className="w-8 h-8 mx-auto my-1 text-blue-500" />
                    <p className="font-medium">{72 + i}°F</p>
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
            {[
              { day: "Today", temp: "72°F", condition: "Partly Cloudy" },
              { day: "Tue", temp: "75°F", condition: "Sunny" },
              { day: "Wed", temp: "77°F", condition: "Sunny" },
              { day: "Thu", temp: "74°F", condition: "Partly Cloudy" },
              { day: "Fri", temp: "70°F", condition: "Cloudy" },
              { day: "Sat", temp: "68°F", condition: "Rain" },
              { day: "Sun", temp: "71°F", condition: "Partly Cloudy" },
            ].map((day, i) => (
              <div key={i} className="text-center p-3 border rounded-lg">
                <p className="font-medium">{day.day}</p>
                <Cloud className="w-10 h-10 mx-auto my-2 text-blue-500" />
                <p className="text-lg font-semibold">{day.temp}</p>
                <p className="text-sm text-gray-600">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Weather Alerts</h2>
          <p className="text-gray-600 mb-4">
            No active weather alerts for your location.
          </p>
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
      </main>

      <Footer />
    </div>
  );
}
