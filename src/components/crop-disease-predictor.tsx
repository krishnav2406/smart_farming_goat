"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type PredictionResult = {
  diseaseName: string;
  confidence: string;
  description: string;
  treatment: string;
  prevention: string;
};

export default function CropDiseasePredictor() {
  const [cropType, setCropType] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/crop-disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropType,
          symptoms,
          imageUrl: imageUrl || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get prediction');
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to get prediction. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Crop Disease Predictor</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cropType">Crop Type</Label>
            <Input
              id="cropType"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              placeholder="e.g., Tomato, Rice, Wheat"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="symptoms">Observed Symptoms</Label>
            <Textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe the symptoms in detail (leaf spots, wilting, etc.)"
              required
              className="h-24"
            />
          </div>
          
          <div>
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/crop-image.jpg"
            />
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Analyzing..." : "Predict Disease"}
          </Button>
        </form>
      </Card>
      
      {error && (
        <Card className="p-6 border-red-200 bg-red-50">
          <p className="text-red-600">{error}</p>
        </Card>
      )}
      
      {result && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Analysis Results</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-600">Likely Disease</h4>
              <p className="text-lg">{result.diseaseName}</p>
              <p className="text-sm text-gray-500">
                Confidence: {result.confidence}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-600">Description</h4>
              <p>{result.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-600">Recommended Treatment</h4>
              <p>{result.treatment}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-600">Prevention</h4>
              <p>{result.prevention}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 