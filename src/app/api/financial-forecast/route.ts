import {
  calculateFinancialForecast,
  getAllCrops,
  getFinancialSummary,
} from "@/lib/financialForecast";
import { FinancialInput } from "@/types/financialForecast";
import { NextRequest, NextResponse } from "next/server";

// GET handler for retrieving financial summary data
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get("year") || "2023";
    const cropId = searchParams.get("cropId") || "all";

    // Get financial summary data
    const summary = getFinancialSummary(year);

    // Get all crops for comparison
    const crops = getAllCrops();

    return NextResponse.json({
      success: true,
      data: {
        summary,
        crops,
      },
    });
  } catch (error) {
    console.error("Error fetching financial data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch financial data" },
      { status: 500 },
    );
  }
}

// POST handler for calculating financial forecast
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const input: FinancialInput = body.input;

    // Validate input
    if (!input || !input.cropId) {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 },
      );
    }

    // Calculate forecast
    const forecast = calculateFinancialForecast(input);

    return NextResponse.json({
      success: true,
      data: forecast,
    });
  } catch (error) {
    console.error("Error calculating financial forecast:", error);
    return NextResponse.json(
      { success: false, error: "Failed to calculate financial forecast" },
      { status: 500 },
    );
  }
}
