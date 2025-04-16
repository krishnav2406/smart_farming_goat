import { NextRequest, NextResponse } from 'next/server';
import { predictFarmingConditions, FarmPredictionInput } from '@/lib/farm-predictor';

export async function POST(request: NextRequest) {
  try {
    // Parse input data
    const data = await request.json() as FarmPredictionInput;
    
    // Validate input
    if (!data.location || !data.cropType) {
      return NextResponse.json(
        { error: 'Location and crop type are required' },
        { status: 400 }
      );
    }
    
    // Get predictions
    const prediction = await predictFarmingConditions(data);
    
    return NextResponse.json({
      success: true,
      prediction
    });
  } catch (error: any) {
    console.error('Error making farm predictions:', error);
    return NextResponse.json(
      { error: 'Failed to generate farm predictions', details: error.message },
      { status: 500 }
    );
  }
} 