import DashboardNavbar from "@/components/dashboard-navbar";
import { Card } from "@/components/ui/card";
import {
  InfoIcon,
  UserCircle,
  Cloud,
  Droplet,
  Leaf,
  Package,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for dashboard widgets
  const weatherData = {
    temperature: "24°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h",
  };

  const soilData = {
    moisture: "42%",
    ph: "6.8",
    nitrogen: "Medium",
    phosphorus: "High",
  };

  const cropHealthData = {
    overallHealth: "Good",
    riskAreas: 2,
    lastInspection: "2 days ago",
  };

  const inventoryData = {
    equipmentCount: 12,
    lowSupplies: 3,
    maintenanceDue: 2,
  };

  const financialData = {
    monthlyRevenue: "$12,450",
    projectedROI: "18%",
    topCrop: "Corn",
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Farm Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Welcome to your Smart Farming Dashboard. Monitor all your farm
                metrics in one place.
              </span>
            </div>
          </header>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weather Module */}
            <Link href="/weather-forecasting" className="group">
              <Card className="p-6 h-full border hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Cloud className="h-6 w-6 text-blue-600" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Weather Forecast</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature</span>
                    <span className="font-medium">
                      {weatherData.temperature}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Condition</span>
                    <span className="font-medium">{weatherData.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Humidity</span>
                    <span className="font-medium">{weatherData.humidity}</span>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Soil Monitoring */}
            <Link href="/soil-monitoring" className="group">
              <Card className="p-6 h-full border hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Droplet className="h-6 w-6 text-amber-600" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Soil Monitoring</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Moisture</span>
                    <span className="font-medium">{soilData.moisture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">pH Level</span>
                    <span className="font-medium">{soilData.ph}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nitrogen</span>
                    <span className="font-medium">{soilData.nitrogen}</span>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Crop Health */}
            <Link href="/crop-health-analysis" className="group">
              <Card className="p-6 h-full border hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Crop Health</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Overall Health
                    </span>
                    <span className="font-medium">
                      {cropHealthData.overallHealth}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Areas</span>
                    <span className="font-medium">
                      {cropHealthData.riskAreas}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Last Inspection
                    </span>
                    <span className="font-medium">
                      {cropHealthData.lastInspection}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Inventory Management */}
            <Link href="/inventory-management" className="group">
              <Card className="p-6 h-full border hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Inventory</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Equipment</span>
                    <span className="font-medium">
                      {inventoryData.equipmentCount} items
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Low Supplies</span>
                    <span className="font-medium">
                      {inventoryData.lowSupplies} items
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Maintenance Due
                    </span>
                    <span className="font-medium">
                      {inventoryData.maintenanceDue} items
                    </span>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Financial Analytics */}
            <Link href="/financial-analytics" className="group">
              <Card className="p-6 h-full border hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Financial Analytics
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monthly Revenue
                    </span>
                    <span className="font-medium">
                      {financialData.monthlyRevenue}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected ROI</span>
                    <span className="font-medium">
                      {financialData.projectedROI}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Top Crop</span>
                    <span className="font-medium">{financialData.topCrop}</span>
                  </div>
                </div>
              </Card>
            </Link>

            {/* User Profile Section */}
            <Card className="p-6 h-full border">
              <div className="flex items-center gap-4 mb-6">
                <UserCircle size={48} className="text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">User Profile</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User ID</span>
                    <span className="font-mono">
                      {user.id.substring(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Login</span>
                    <span>
                      {new Date(user.last_sign_in_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
