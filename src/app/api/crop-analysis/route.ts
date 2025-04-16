import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the key
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const buffer = await imageFile.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');
    
    // Get the Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Build the prompt
    const prompt = `
      You are an expert agricultural scientist specializing in crop disease identification.
      
      Analyze this crop image for any diseases.
      
      Please provide:
      1. Disease Name: The specific disease affecting the crop
      2. Cause: What causes this disease (fungus, bacteria, virus, etc.)
      3. Symptoms: Visual symptoms visible in the image
      4. Severity: Rate from 1-5 (1=minimal, 5=severe)
      5. Treatment: Recommended treatments including chemical and organic options
      6. Prevention: Methods to prevent future outbreaks
      
      Format your response in valid JSON with fields: diseaseName, cause, symptoms, severity, treatment, prevention
    `;

    // Make the API call with the image
    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { data: base64Data, mimeType: imageFile.type } }
    ]);
    
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsedJson = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ 
          success: true, 
          content: parsedJson 
        });
      } catch (e) {
        // If JSON parsing fails, return the raw text
        return NextResponse.json({ 
          success: true, 
          content: { rawResponse: text } 
        });
      }
    }
    
    // If no JSON pattern found, return the raw text
    return NextResponse.json({ 
      success: true, 
      content: { rawResponse: text } 
    });
    
  } catch (error: any) {
    console.error("Error analyzing crop image:", error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to analyze image'
    }, { status: 500 });
  }
} 