import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Cloud,
  Droplet,
  Sprout,
  BarChart,
  Tractor,
  ImagePlus,
  Leaf,
  Calculator,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home(): Promise<JSX.Element> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Smart Farming Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools to optimize
              your agricultural operations and maximize yields.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Cloud className="w-6 h-6" />,
                title: "Weather Forecasting",
                description:
                  "Accurate 7-day forecasts and custom weather alerts for your farm location",
              },
              {
                icon: <Droplet className="w-6 h-6" />,
                title: "Soil Monitoring",
                description:
                  "Real-time soil moisture and nutrient tracking with historical data analysis",
              },
              {
                icon: <Sprout className="w-6 h-6" />,
                title: "Crop Health Analysis",
                description:
                  "AI-powered disease detection and treatment recommendations",
              },
              {
                icon: <Tractor className="w-6 h-6" />,
                title: "Inventory Management",
                description:
                  "Track equipment, supplies, and maintenance schedules in one place",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-green-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disease Detection Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                AI-Powered Crop Disease Detection
              </h2>
              <p className="text-gray-600 mb-6">
                Our advanced machine learning algorithms can identify over 50
                common crop diseases with 95% accuracy from a simple photo.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    icon: <ImagePlus className="w-5 h-5" />,
                    text: "Upload photos directly from your mobile device",
                  },
                  {
                    icon: <Leaf className="w-5 h-5" />,
                    text: "Get instant disease identification and severity assessment",
                  },
                  {
                    icon: <Calculator className="w-5 h-5" />,
                    text: "Receive customized treatment recommendations and cost estimates",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-green-600 mr-3 mt-1">{item.icon}</div>
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Try Disease Detection
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80"
                alt="Farmer checking crop with tablet"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">30%</div>
              <div className="text-green-100">Average Yield Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-green-100">Farms Using Our Platform</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Disease Detection Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using our platform to
            increase yields and reduce costs.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Access Your Dashboard
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
