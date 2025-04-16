import { NextRequest, NextResponse } from 'next/server';
import { searchLocations } from '@/lib/weather';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const results = await searchLocations(query);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in location search API route:', error);
    return NextResponse.json(
      { error: 'Failed to search locations' },
      { status: 500 }
    );
  }
} 