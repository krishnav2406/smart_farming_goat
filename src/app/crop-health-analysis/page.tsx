'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import CropDiseasePredictor from '@/components/crop-disease-predictor';

export default function CropHealthAnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous results
    setResult(null);
    setError(null);
    
    // Preview the selected image
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  };

  // Handle analysis submission
  const handleAnalyze = () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setAnalyzing(true);
    setError(null);
    
    // Use promises instead of async/await in client component functions
    const analyzeImage = () => {
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Use the new Vertex AI endpoint
      fetch('/api/vertex-crop-analysis', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          throw new Error(data.error || 'Analysis failed');
        }

        // The content is already parsed JSON
        setResult(data.content);
      })
      .catch(err => {
        console.error('Error analyzing crop:', err);
        setError(err.message || 'Failed to analyze image');
      })
      .finally(() => {
        setAnalyzing(false);
      });
    };
    
    // Call the analysis function
    analyzeImage();
  };

  // Format JSON for display
  const formatResultDisplay = (data: any) => {
    if (!data) return null;
    
    if (data.rawResponse) {
      // Not JSON, just display as text
      return (
        <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-md">
          {data.rawResponse}
        </div>
      );
    }

    // Render formatted JSON data
    return (
      <div className="space-y-4">
        {data.plantType && (
          <div>
            <h3 className="font-bold text-lg">Plant Type: {data.plantType}</h3>
          </div>
        )}

        {data.diseaseName && (
          <div>
            <h3 className="font-bold text-lg">Disease: {data.diseaseName}</h3>
          </div>
        )}

        {data.symptoms && (
          <div>
            <h4 className="font-semibold">Symptoms:</h4>
            <p>{data.symptoms}</p>
          </div>
        )}

        {data.causes && (
          <div>
            <h4 className="font-semibold">Causes:</h4>
            <p>{data.causes}</p>
          </div>
        )}

        {data.severity && (
          <div>
            <h4 className="font-semibold">Severity:</h4>
            <div className="flex items-center">
              <div className="bg-gray-200 h-2 w-full rounded-full">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(Number(data.severity) / 5) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2">{data.severity}/5</span>
            </div>
          </div>
        )}

        {data.treatment && (
          <div>
            <h4 className="font-semibold">Treatment:</h4>
            <p>{data.treatment}</p>
          </div>
        )}

        {data.prevention && (
          <div>
            <h4 className="font-semibold">Prevention:</h4>
            <p>{data.prevention}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Crop Health Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Image Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Crop Image</CardTitle>
              <CardDescription>
                Upload a clear image of your crop for disease analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {previewUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                      </div>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  disabled={!selectedImage || analyzing}
                  className="w-full"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : 'Analyze Crop Image'}
                </Button>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Detailed information about crop health will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyzing ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  <p className="mt-4 text-gray-600">Analyzing your crop image...</p>
                </div>
              ) : result ? (
                formatResultDisplay(result)
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <p>Upload an image to see analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-medium mb-2">Upload Image</h3>
              <p className="text-sm text-gray-600">
                Take a clear, well-lit photo of your crop showing any signs of disease.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-medium mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">
                Our advanced AI model analyzes the image to identify diseases and assess severity.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-medium mb-2">Get Results</h3>
              <p className="text-sm text-gray-600">
                Receive detailed insights about the disease, treatment options, and prevention methods.
              </p>
            </div>
          </div>
        </div>
        
        {/* Gemini AI Disease Predictor */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">AI-Powered Disease Prediction</h2>
          <p className="text-gray-600 mb-4">
            Don't have an image? Describe your crop's symptoms for an instant AI analysis
          </p>
          <CropDiseasePredictor />
        </div>
      </main>

      <Footer />
    </div>
  );
}
