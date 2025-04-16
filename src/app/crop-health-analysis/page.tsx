import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Leaf, Microscope, Pill } from "lucide-react";

export default function CropHealthAnalysisPage() {
  return (
    <div className="container mx-auto py-10 bg-white dark:bg-gray-950">
      <h1 className="text-3xl font-bold mb-6">Crop Health Analysis</h1>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="dashboard">Overview</TabsTrigger>
          <TabsTrigger value="disease-detection">Disease Detection</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Crop Health Status
                </CardTitle>
                <CardDescription>
                  Current health metrics for your crops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Corn Field A</span>
                    <span className="text-green-600 font-medium">
                      Excellent
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Wheat Field B</span>
                    <span className="text-yellow-600 font-medium">Good</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Soybean Field C</span>
                    <span className="text-red-600 font-medium">
                      Needs Attention
                    </span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Fields
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-blue-600" />
                  Recent Detections
                </CardTitle>
                <CardDescription>Latest disease detections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Corn Rust</span>
                    <span className="text-amber-600 font-medium">
                      2 days ago
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Powdery Mildew</span>
                    <span className="text-amber-600 font-medium">
                      5 days ago
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>No new detections</span>
                    <span className="text-gray-500 font-medium">-</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Detections
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-purple-600" />
                  Treatment Tracker
                </CardTitle>
                <CardDescription>
                  Active treatments and their progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Fungicide Application</span>
                    <span className="text-green-600 font-medium">Complete</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Insecticide Treatment</span>
                    <span className="text-blue-600 font-medium">
                      In Progress
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nutrient Supplement</span>
                    <span className="text-gray-600 font-medium">Scheduled</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Manage Treatments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Disease Detection Tab */}
        <TabsContent value="disease-detection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Disease Detection</CardTitle>
              <CardDescription>
                Upload images of your crops to identify potential diseases and
                get treatment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
                <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-2">
                  Drag and drop crop images here or click to browse
                </p>
                <Button>Upload Images</Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">How It Works</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>
                    Upload clear images of affected plant parts (leaves, stems,
                    fruits)
                  </li>
                  <li>
                    Our AI analyzes the images to identify potential diseases
                  </li>
                  <li>Review the diagnosis and treatment recommendations</li>
                  <li>Track treatment progress and results</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historical Data Tab */}
        <TabsContent value="historical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Crop Health Data</CardTitle>
              <CardDescription>
                Review past crop health trends and disease occurrences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  Historical data visualization will appear here
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline">Last 30 Days</Button>
                <Button variant="outline">Last Season</Button>
                <Button variant="outline">Year-to-Year Comparison</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Recommendations</CardTitle>
              <CardDescription>
                AI-generated recommendations based on detected issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-red-600 mb-2">
                    Corn Rust Treatment
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Apply fungicide treatment to affected areas. Recommended
                    product: Propiconazole.
                  </p>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Recommended 2 days ago
                    </span>
                    <Button size="sm" variant="outline">
                      Mark as Complete
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-yellow-600 mb-2">
                    Preventative Measures
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Increase spacing between plants to improve air circulation
                    and reduce humidity levels.
                  </p>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Recommended 5 days ago
                    </span>
                    <Button size="sm" variant="outline">
                      Mark as Complete
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-green-600 mb-2">
                    Nutrient Supplementation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Add nitrogen-rich fertilizer to improve plant resilience
                    against diseases.
                  </p>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Recommended 1 week ago
                    </span>
                    <Button size="sm" variant="outline">
                      Mark as Complete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
