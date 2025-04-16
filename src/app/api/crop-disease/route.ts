import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the key
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cropType, symptoms, imageUrl } = body;
    
    if (!cropType || !symptoms) {
      return NextResponse.json(
        { error: 'Crop type and symptoms are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
      return NextResponse.json(JSON.parse(jsonMatch[0]));
    }
    
    // Fallback if JSON extraction fails
    return NextResponse.json({
      diseaseName: "Unknown",
      confidence: "low",
      description: "Could not determine disease from provided information",
      treatment: "Consult a local agricultural extension service",
      prevention: "Monitor crops regularly and maintain good field hygiene"
    });
  } catch (error: any) {
    console.error("Error predicting crop disease:", error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze crop disease' },
      { status: 500 }
    );
  }
} 