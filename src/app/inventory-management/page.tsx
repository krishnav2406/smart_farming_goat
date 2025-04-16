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
  AlertCircle,
  Calendar,
  CheckCircle,
  ClipboardList,
  Settings,
  Hammer,
  Tractor,
  TrendingUp,
  Wrench,
} from "lucide-react";

export default function InventoryManagementPage() {
  return (
    <div className="container mx-auto py-8 bg-white dark:bg-gray-950 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <ClipboardList className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="equipment">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="supplies">Supplies</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Equipment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  4 added this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Equipment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">75% of total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Maintenance Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 urgent</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Inventory</CardTitle>
              <CardDescription>Manage your farming equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div className="flex items-center gap-3">
                    <Tractor className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Tractor - Model X500</p>
                      <p className="text-sm text-muted-foreground">
                        Heavy Equipment
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span className="text-sm">Active</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Maintenance</p>
                    <p className="text-sm">May 15, 2023</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm">North Field</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div className="flex items-center gap-3">
                    <Hammer className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Harvester - H200</p>
                      <p className="text-sm text-muted-foreground">
                        Harvesting
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-amber-600">
                      <AlertCircle className="h-3 w-3" />
                      <span className="text-sm">Maintenance</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Maintenance</p>
                    <p className="text-sm">Jan 10, 2023</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm">Storage Shed</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div className="flex items-center gap-3">
                    <Wrench className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Irrigation System</p>
                      <p className="text-sm text-muted-foreground">
                        Water Management
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span className="text-sm">Active</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Maintenance</p>
                    <p className="text-sm">Apr 22, 2023</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm">South Field</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button>Add New Equipment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Supplies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36</div>
                <p className="text-xs text-muted-foreground">8 categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Stock Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Reorder needed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,450</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Supplies Inventory</CardTitle>
              <CardDescription>
                Track your farming supplies and consumables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div>
                    <p className="font-medium">Fertilizer - NPK</p>
                    <p className="text-sm text-muted-foreground">
                      Crop Nutrients
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quantity</p>
                    <p className="text-sm">250 kg</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span className="text-sm">In Stock</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Ordered</p>
                    <p className="text-sm">May 5, 2023</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div>
                    <p className="font-medium">Pesticide - Organic</p>
                    <p className="text-sm text-muted-foreground">
                      Pest Control
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quantity</p>
                    <p className="text-sm">15 L</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-amber-600">
                      <AlertCircle className="h-3 w-3" />
                      <span className="text-sm">Low Stock</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Ordered</p>
                    <p className="text-sm">Mar 12, 2023</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div>
                    <p className="font-medium">Seeds - Corn</p>
                    <p className="text-sm text-muted-foreground">Planting</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quantity</p>
                    <p className="text-sm">50 kg</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span className="text-sm">In Stock</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Ordered</p>
                    <p className="text-sm">Feb 28, 2023</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button>Add New Supply</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Scheduled Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Next 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Maintenance Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,850</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>
                Track equipment maintenance and repairs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div>
                    <p className="font-medium">Tractor - Model X500</p>
                    <p className="text-sm text-muted-foreground">
                      Oil Change & Filter
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">Jun 15, 2023</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-amber-600">
                      <AlertCircle className="h-3 w-3" />
                      <span className="text-sm">Upcoming</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assigned To</p>
                    <p className="text-sm">John Smith</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div>
                    <p className="font-medium">Irrigation System</p>
                    <p className="text-sm text-muted-foreground">
                      Pump Inspection
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">Jun 22, 2023</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-amber-600">
                      <AlertCircle className="h-3 w-3" />
                      <span className="text-sm">Upcoming</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assigned To</p>
                    <p className="text-sm">Maria Garcia</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-center">
                  <div>
                    <p className="font-medium">Harvester - H200</p>
                    <p className="text-sm text-muted-foreground">
                      Belt Replacement
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">May 10, 2023</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span className="text-sm">Completed</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assigned To</p>
                    <p className="text-sm">Robert Johnson</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button>Schedule Maintenance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
