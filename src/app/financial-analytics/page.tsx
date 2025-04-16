import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Calculator,
  Calendar,
  ChevronDown,
  Download,
  LineChart,
  PieChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FinancialAnalyticsPage() {
  return (
    <div className="container mx-auto py-8 bg-white dark:bg-gray-950 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Select defaultValue="2023">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            <SelectItem value="corn">Corn</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="soybeans">Soybeans</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128,450</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5% from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$76,230</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>+8.3% from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$52,220</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+18.7% from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+5.2% from last year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
          <TabsTrigger value="comparison">Crop Comparison</TabsTrigger>
          <TabsTrigger value="forecast">Financial Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>
                  Monthly breakdown for the current year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <BarChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Bar Chart Visualization
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Monthly revenue and expenses comparison
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Margin Trends</CardTitle>
                <CardDescription>
                  Quarterly profit margins over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Line Chart Visualization
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Profit margin trends over quarters
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Where your money is going</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center">
                  <div className="h-48 w-48 flex items-center justify-center border-2 border-dashed rounded-full">
                    <div className="text-center">
                      <PieChart className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-xs text-muted-foreground">
                        Expense Distribution
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm">Equipment & Maintenance</span>
                      </div>
                      <span className="text-sm font-medium">$24,350 (32%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "32%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Seeds & Fertilizers</span>
                      </div>
                      <span className="text-sm font-medium">$18,750 (25%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm">Labor</span>
                      </div>
                      <span className="text-sm font-medium">$15,250 (20%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm">Fuel & Utilities</span>
                      </div>
                      <span className="text-sm font-medium">$10,580 (14%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: "14%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-sm">Other Expenses</span>
                      </div>
                      <span className="text-sm font-medium">$7,300 (9%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "9%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ROI Calculator</CardTitle>
              <CardDescription>
                Calculate return on investment for different crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select Crop</label>
                    <Select defaultValue="corn">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Field Size (acres)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded mt-1"
                      defaultValue="100"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Seed Cost ($/acre)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded mt-1"
                      defaultValue="150"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Fertilizer Cost ($/acre)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded mt-1"
                      defaultValue="200"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Labor Cost ($/acre)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded mt-1"
                      defaultValue="75"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Expected Yield (bushels/acre)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded mt-1"
                      defaultValue="180"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Market Price ($/bushel)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded mt-1"
                      defaultValue="5.75"
                    />
                  </div>

                  <Button className="w-full">Calculate ROI</Button>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">ROI Projection</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Total Investment</p>
                      <p className="text-2xl font-bold">$42,500</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Projected Revenue</p>
                      <p className="text-2xl font-bold">$103,500</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Net Profit</p>
                      <p className="text-2xl font-bold text-green-600">
                        $61,000
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">ROI</p>
                      <p className="text-2xl font-bold text-green-600">
                        143.5%
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Payback Period</p>
                      <p className="text-lg font-medium">8.3 months</p>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium mb-2">
                        Risk Assessment
                      </p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <span className="text-sm">Medium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crop Comparison</CardTitle>
              <CardDescription>
                Compare financial performance across different crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Crop</th>
                      <th className="text-left p-3">Yield/Acre</th>
                      <th className="text-left p-3">Cost/Acre</th>
                      <th className="text-left p-3">Revenue/Acre</th>
                      <th className="text-left p-3">Profit/Acre</th>
                      <th className="text-left p-3">ROI</th>
                      <th className="text-left p-3">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">Corn</td>
                      <td className="p-3">180 bu</td>
                      <td className="p-3">$425</td>
                      <td className="p-3">$1,035</td>
                      <td className="p-3 text-green-600">$610</td>
                      <td className="p-3">143.5%</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: "65%" }}
                            ></div>
                          </div>
                          <span className="text-xs">Medium</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">Wheat</td>
                      <td className="p-3">65 bu</td>
                      <td className="p-3">$320</td>
                      <td className="p-3">$455</td>
                      <td className="p-3 text-green-600">$135</td>
                      <td className="p-3">42.2%</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "40%" }}
                            ></div>
                          </div>
                          <span className="text-xs">Low</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">Soybeans</td>
                      <td className="p-3">55 bu</td>
                      <td className="p-3">$380</td>
                      <td className="p-3">$770</td>
                      <td className="p-3 text-green-600">$390</td>
                      <td className="p-3">102.6%</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                          <span className="text-xs">Medium</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">Cotton</td>
                      <td className="p-3">2.5 bales</td>
                      <td className="p-3">$650</td>
                      <td className="p-3">$1,250</td>
                      <td className="p-3 text-green-600">$600</td>
                      <td className="p-3">92.3%</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: "80%" }}
                            ></div>
                          </div>
                          <span className="text-xs">High</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-center">
                <Button>Generate Detailed Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Forecast</CardTitle>
              <CardDescription>
                Projected financial performance for the next 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg mb-6">
                <div className="text-center">
                  <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Financial Forecast Visualization
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Projected revenue, expenses, and profit
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Projected Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$142,800</div>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+11.2% from current year</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Projected Expenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$82,500</div>
                    <div className="flex items-center text-xs text-red-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+8.2% from current year</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Projected Profit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$60,300</div>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+15.5% from current year</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Key Assumptions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronDown className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      Corn prices projected to increase by 5% due to market
                      trends
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      Fertilizer costs expected to rise by 7% due to supply
                      chain issues
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      Fuel costs projected to remain stable based on current
                      market analysis
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      Crop yields expected to improve by 3-5% with
                      implementation of new techniques
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
