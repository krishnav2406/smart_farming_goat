import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request: NextRequest) {
  try {
    // Extract API key from environment
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "";
    
    // Log key first characters for debugging
    console.log(`Using API key starting with: ${API_KEY.substring(0, 5)}...`);
    
    // Initialize the Generative AI API
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Test with a simple prompt
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say hello");
    const response = result.response;
    const text = response.text();
    
    return NextResponse.json({
      success: true,
      message: "API key is valid and working",
      response: text
    });
  } catch (error: any) {
    console.error("API Key Test Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Unknown error occurred"
    }, { status: 500 });
  }
} 