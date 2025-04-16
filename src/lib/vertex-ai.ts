import { GoogleGenerativeAI } from "@google/generative-ai";

// API configuration
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "";
const PROJECT_ID = 'smartfarming-457016'; // From the Vertex AI console
const LOCATION = 'us-central1'; 
const MODEL_ID = 'gemini-1.5-flash';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Analyze plant disease from an image - using the specialized Plant Disease Diagnosis prompt template
export async function analyzePlantDisease(imageBase64: string, mimeType: string) {
  try {
    // Get the Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: MODEL_ID });

    // This prompt matches the structure seen in the Vertex AI Plant Disease Diagnosis template
    const prompt = `You are a crop disease expert. When given a plant image, analyze and describe:
1. Type of plant
2. Type of symptoms (spots, holes, color changes, etc.)
3. Likely disease
4. Possible causes
5. Suggest treatment and prevention

For symptoms, specifically look for:
- Spots: Size, color, shape, and distribution of spots.
- Holes: Size, shape, and location of holes in leaves or other plant parts.
- Color Changes: Yellowing (chlorosis), browning, purpling, or other unusual colors in leaves, stems, or fruits.
- Wilting: Drooping or sagging of leaves or stems.
- Lesions: Damaged or discolored areas on stems, leaves, or fruits.

Format your response as JSON with these exact fields:
{
  "plantType": "identified plant type",
  "symptoms": "detailed description of symptoms",
  "diseaseName": "specific disease name",
  "causes": "what causes this disease",
  "treatment": "recommended treatment options",
  "prevention": "preventative measures"
}`;

    // Make the API call with the image
    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { data: imageBase64, mimeType: mimeType } }
    ]);
    
    const response = result.response;
    const text = response.text();
    
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return {
          success: true, 
          content: JSON.parse(jsonMatch[0]) 
        };
      } catch (e) {
        return { 
          success: true, 
          content: { rawResponse: text } 
        };
      }
    }
    
    // If no JSON pattern found, return the raw text
    return { 
      success: true, 
      content: { rawResponse: text } 
    };
    
  } catch (error: any) {
    console.error("Error analyzing plant disease:", error);
    return {
      success: false,
      error: error.message || 'Failed to analyze image'
    };
  }
} 