import { Droplet, LineChart, Layers, AlertTriangle } from "lucide-react";
import { createClient } from "../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default async function SoilMonitoringPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Soil Monitoring</h1>

        {/* Soil Moisture Overview */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Soil Moisture Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Droplet className="w-10 h-10 mx-auto mb-2 text-blue-500" />
              <h3 className="text-lg font-medium mb-1">Current Moisture</h3>
              <p className="text-3xl font-bold text-blue-600">42%</p>
              <p className="text-sm text-gray-600">Optimal Range: 35-45%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <LineChart className="w-10 h-10 mx-auto mb-2 text-green-500" />
              <h3 className="text-lg font-medium mb-1">7-Day Trend</h3>
              <p className="text-3xl font-bold text-green-600">+5%</p>
              <p className="text-sm text-gray-600">Increasing Steadily</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Layers className="w-10 h-10 mx-auto mb-2 text-amber-500" />
              <h3 className="text-lg font-medium mb-1">Soil Depth</h3>
              <p className="text-3xl font-bold text-amber-600">12 in</p>
              <p className="text-sm text-gray-600">Measurement Depth</p>
            </div>
          </div>
        </div>

        {/* Soil Nutrient Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Soil Nutrient Analysis
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left border">Nutrient</th>
                  <th className="p-3 text-left border">Current Level</th>
                  <th className="p-3 text-left border">Optimal Range</th>
                  <th className="p-3 text-left border">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    nutrient: "Nitrogen (N)",
                    level: "45 ppm",
                    range: "40-60 ppm",
                    status: "Optimal",
                  },
                  {
                    nutrient: "Phosphorus (P)",
                    level: "28 ppm",
                    range: "30-50 ppm",
                    status: "Low",
                  },
                  {
                    nutrient: "Potassium (K)",
                    level: "180 ppm",
                    range: "150-250 ppm",
                    status: "Optimal",
                  },
                  {
                    nutrient: "pH Level",
                    level: "6.2",
                    range: "6.0-7.0",
                    status: "Optimal",
                  },
                  {
                    nutrient: "Organic Matter",
                    level: "3.8%",
                    range: "3-5%",
                    status: "Optimal",
                  },
                ].map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3 border">{item.nutrient}</td>
                    <td className="p-3 border">{item.level}</td>
                    <td className="p-3 border">{item.range}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${item.status === "Optimal" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Recommendation</p>
              <p className="text-sm text-amber-700">
                Consider applying phosphorus-rich fertilizer to address the low
                phosphorus levels in your soil.
              </p>
            </div>
          </div>
        </div>

        {/* Historical Data */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Historical Soil Data</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Soil moisture and nutrient trend chart will appear here
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Seasonal Comparison</h3>
              <p className="text-sm text-gray-600">
                Compare soil conditions across different seasons
              </p>
              <button className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                View Report
              </button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Year-over-Year</h3>
              <p className="text-sm text-gray-600">
                Track soil health improvements over multiple years
              </p>
              <button className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                View Report
              </button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Export Data</h3>
              <p className="text-sm text-gray-600">
                Download soil data reports in CSV format
              </p>
              <button className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
