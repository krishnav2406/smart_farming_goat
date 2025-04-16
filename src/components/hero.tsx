import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Cloud,
  Droplet,
  Sprout,
  BarChart,
} from "lucide-react";

export default function Hero(): JSX.Element {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Farm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Smarter
              </span>{" "}
              with AI-Powered Agriculture
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Revolutionize your farming practices with data-driven insights and
              predictive analytics. Join thousands of farmers who've already
              transformed their yields and efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                Access Dashboard
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                Explore Features
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <Cloud className="w-8 h-8 text-blue-500" />
                <span>Weather Forecasting</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Droplet className="w-8 h-8 text-blue-500" />
                <span>Soil Monitoring</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Sprout className="w-8 h-8 text-green-500" />
                <span>Crop Health Analysis</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <BarChart className="w-8 h-8 text-green-500" />
                <span>Financial Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
