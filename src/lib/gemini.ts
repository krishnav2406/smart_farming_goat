import { GoogleGenerativeAI } from "@google-ai/generativelanguage";

// Environment variables should be properly loaded in your Next.js app
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'noble-truck-434214-p9';
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

// Configuration for crop disease prediction
const generationConfig = {
  temperature: 0.4,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 2048,
};

// Create a safety settings configuration that's appropriate for your app
const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
];

/**
 * Analyzes a crop image for disease detection
 * @param imageBase64 Base64 encoded image string (without data:image prefix)
 * @returns Analysis result with disease information
 */
export async function analyzeCropDisease(imageBase64: string) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Create a system prompt for crop disease analysis
    const systemPrompt = `You are a Crop Doctor, an AI-powered assistant capable of analyzing 
    images of crops to accurately detect and diagnose potential diseases. When analyzing an image, provide:
    1. Disease Name: The specific disease affecting the crop
    2. Cause: What causes this disease (fungus, bacteria, virus, etc.)
    3. Symptoms: Visual symptoms visible in the image
    4. Severity: Rate from 1-5 (1=minimal, 5=severe)
    5. Treatment: Recommended treatments including chemical and organic options
    6. Prevention: Methods to prevent future outbreaks
    Format your response in JSON structure.`;

    // Create a chat session
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I'll analyze crop images to detect and diagnose diseases, providing structured information on disease name, cause, symptoms, severity, treatment, and prevention methods in JSON format." }],
        },
      ],
    });

    // Send the image for analysis
    const result = await chat.sendMessage([
      { text: "Analyze this crop image for any diseases:" },
      { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }
    ]);

    return {
      success: true,
      content: result.response.text(),
    };
  } catch (error: any) {
    console.error("Error analyzing crop disease:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze crop disease",
    };
  }
}

export async function predictCropDisease(
  cropType: string,
  symptoms: string,
  imageUrl?: string
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Build the prompt with detailed context
    const prompt = `
      You are an expert agricultural scientist specializing in crop disease identification.
      
      Analyze the following information about a potentially diseased crop:
      - Crop type: ${cropType}
      - Observed symptoms: ${symptoms}
      ${imageUrl ? `- Image URL: ${imageUrl}` : ''}
      
      Please provide:
      1. Likely disease name
      2. Confidence level (low/medium/high)
      3. Brief description of the disease
      4. Recommended treatment options
      5. Preventive measures for future
      
      Format as JSON with fields: diseaseName, confidence, description, treatment, prevention
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if JSON extraction fails
    return {
      diseaseName: "Unknown",
      confidence: "low",
      description: "Could not determine disease from provided information",
      treatment: "Consult a local agricultural extension service",
      prevention: "Monitor crops regularly and maintain good field hygiene"
    };
  } catch (error) {
    console.error("Error predicting crop disease:", error);
    throw error;
  }
}

export default genAI; 