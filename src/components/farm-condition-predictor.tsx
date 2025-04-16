'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Thermometer, Droplets, Wind, AlertTriangle, Sun } from 'lucide-react';
import { FarmPredictionInput } from '@/lib/farm-predictor';

export function FarmConditionPredictor() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('Chennai, India');
  const [usesAdvancedSettings, setUsesAdvancedSettings] = useState(false);
  
  // Default form values to minimize farmer input
  const [formData, setFormData] = useState<FarmPredictionInput>({
    location: 'Chennai, India',
    soilMoisture: 60,
    soilTemp: 20,
    soilPH: 6.5,
    cropType: 'rice'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    setFormData(prev => ({ ...prev, location: newLocation }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Use promises instead of async/await in client component
    fetch('/api/farm-predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setPrediction(data.prediction);
      } else {
        console.error('Prediction failed:', data.error);
        setError(data.error || 'Failed to generate predictions. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error making prediction:', error);
      setError('Network error. Please check your connection and try again.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Farm Condition Predictor</CardTitle>
        <CardDescription>Get personalized farming recommendations based on current weather</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input 
              type="text" 
              value={location} 
              onChange={handleLocationChange} 
              placeholder="Enter your farm location"
            />
            <p className="text-xs text-gray-500">Weather data will be automatically retrieved for this location</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Crop Type</label>
            <Select 
              value={formData.cropType}
              onValueChange={(value) => handleSelectChange('cropType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select crop type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn/Maize</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="advanced-settings"
              checked={usesAdvancedSettings}
              onChange={() => setUsesAdvancedSettings(!usesAdvancedSettings)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="advanced-settings" className="text-sm">Show advanced soil settings</label>
          </div>
          
          {usesAdvancedSettings && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50">
              <div className="space-y-2">
                <label className="text-sm font-medium">Soil Moisture (%)</label>
                <Input 
                  type="number" 
                  name="soilMoisture" 
                  value={formData.soilMoisture} 
                  onChange={handleInputChange} 
                  min="0"
                  max="100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Soil Temperature (°C)</label>
                <Input 
                  type="number" 
                  name="soilTemp" 
                  value={formData.soilTemp} 
                  onChange={handleInputChange} 
                  step="0.1"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Soil pH</label>
                <Input 
                  type="number" 
                  name="soilPH" 
                  value={formData.soilPH} 
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="14"
                />
              </div>
            </div>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : 'Get Farming Recommendations'}
          </Button>
          
          {prediction && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Planting Conditions Score</label>
                <div className="space-y-1">
                  <Progress value={prediction.plantingScore} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Poor</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className={prediction.idealPlantingConditions ? "border-green-500" : "border-yellow-500"}>
                  <CardContent className="p-3 text-center">
                    <h4 className="text-sm font-medium">Planting Conditions</h4>
                    <p className={`text-lg font-bold ${prediction.idealPlantingConditions ? "text-green-600" : "text-yellow-600"}`}>
                      {prediction.idealPlantingConditions ? "Ideal" : "Suboptimal"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={prediction.frostRisk ? "border-blue-500" : "border-gray-200"}>
                  <CardContent className="p-3 text-center">
                    <h4 className="text-sm font-medium">Frost Risk</h4>
                    <AlertTriangle className={`h-6 w-6 mx-auto ${prediction.frostRisk ? "text-blue-600" : "text-gray-400"}`} />
                    <p className={`text-lg font-bold ${prediction.frostRisk ? "text-blue-600" : "text-gray-400"}`}>
                      {prediction.frostRisk ? "Yes" : "No"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={prediction.heatStressRisk ? "border-red-500" : "border-gray-200"}>
                  <CardContent className="p-3 text-center">
                    <h4 className="text-sm font-medium">Heat Stress Risk</h4>
                    <Sun className={`h-6 w-6 mx-auto ${prediction.heatStressRisk ? "text-red-600" : "text-gray-400"}`} />
                    <p className={`text-lg font-bold ${prediction.heatStressRisk ? "text-red-600" : "text-gray-400"}`}>
                      {prediction.heatStressRisk ? "Yes" : "No"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={prediction.irrigationRecommended ? "border-blue-500" : "border-gray-200"}>
                  <CardContent className="p-3 text-center">
                    <h4 className="text-sm font-medium">Irrigation</h4>
                    <Droplets className={`h-6 w-6 mx-auto ${prediction.irrigationRecommended ? "text-blue-600" : "text-gray-400"}`} />
                    <p className={`text-lg font-bold ${prediction.irrigationRecommended ? "text-blue-600" : "text-gray-400"}`}>
                      {prediction.irrigationRecommended ? "Recommended" : "Not Needed"}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {prediction.recommendations.length > 0 && (
                <Alert>
                  <AlertTitle>Recommendations</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {prediction.recommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
} 