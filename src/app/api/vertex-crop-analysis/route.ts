import { NextRequest, NextResponse } from 'next/server';
import { analyzePlantDisease } from '@/lib/vertex-ai';

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
    
    // Use our helper function to analyze the plant disease
    const result = await analyzePlantDisease(base64Data, imageFile.type);
    
    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error("Error analyzing crop image:", error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to analyze image'
    }, { status: 500 });
  }
} 