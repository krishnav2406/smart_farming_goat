import {
  CropData,
  ExpenseBreakdown,
  FinancialForecast,
  FinancialInput,
  FinancialSummary,
  MonthlyData,
} from "@/types/financialForecast";

// Mock crop data - in a real app, this would come from a database
const crops: CropData[] = [
  {
    id: "corn",
    name: "Corn",
    yieldPerAcre: 180,
    costPerAcre: 425,
    marketPrice: 5.75,
    riskLevel: "Medium",
    riskPercentage: 65,
  },
  {
    id: "wheat",
    name: "Wheat",
    yieldPerAcre: 65,
    costPerAcre: 320,
    marketPrice: 7.0,
    riskLevel: "Low",
    riskPercentage: 40,
  },
  {
    id: "soybeans",
    name: "Soybeans",
    yieldPerAcre: 55,
    costPerAcre: 380,
    marketPrice: 14.0,
    riskLevel: "Medium",
    riskPercentage: 60,
  },
  {
    id: "cotton",
    name: "Cotton",
    yieldPerAcre: 2.5, // bales
    costPerAcre: 650,
    marketPrice: 500, // per bale
    riskLevel: "High",
    riskPercentage: 80,
  },
];

// Get crop data by ID
export function getCropById(cropId: string): CropData | undefined {
  return crops.find((crop) => crop.id === cropId);
}

// Get all crops
export function getAllCrops(): CropData[] {
  return crops;
}

// Calculate financial forecast based on user inputs
export function calculateFinancialForecast(
  input: FinancialInput,
): FinancialForecast {
  const crop = getCropById(input.cropId) || crops[0];

  // Calculate basic financials
  const totalInvestment =
    input.fieldSize * (input.seedCost + input.fertilizerCost + input.laborCost);
  const projectedRevenue =
    input.fieldSize * input.expectedYield * input.marketPrice;
  const netProfit = projectedRevenue - totalInvestment;
  const roi = (netProfit / totalInvestment) * 100;

  // Calculate payback period in months (simplified)
  const paybackPeriod = (totalInvestment / netProfit) * 12;

  // Generate monthly data (simplified model)
  const monthlyData = generateMonthlyData(totalInvestment, projectedRevenue);

  // Generate expense breakdown
  const expenseBreakdown = generateExpenseBreakdown(input);

  return {
    totalInvestment,
    projectedRevenue,
    netProfit,
    roi,
    paybackPeriod,
    riskLevel: crop.riskLevel,
    riskPercentage: crop.riskPercentage,
    monthlyData,
    expenseBreakdown,
  };
}

// Generate monthly data for the forecast
function generateMonthlyData(
  totalInvestment: number,
  projectedRevenue: number,
): MonthlyData[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Simplified distribution of expenses and revenue throughout the year
  // In a real app, this would be based on crop cycles and seasonal factors
  const expenseDistribution = [
    0.15, 0.2, 0.15, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
  ];
  const revenueDistribution = [
    0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.15, 0.2, 0.15, 0.05,
  ];

  return months.map((month, index) => {
    const expenses = totalInvestment * expenseDistribution[index];
    const revenue = projectedRevenue * revenueDistribution[index];
    return {
      month,
      expenses,
      revenue,
      profit: revenue - expenses,
    };
  });
}

// Generate expense breakdown
function generateExpenseBreakdown(input: FinancialInput): ExpenseBreakdown[] {
  const seedTotal = input.fieldSize * input.seedCost;
  const fertilizerTotal = input.fieldSize * input.fertilizerCost;
  const laborTotal = input.fieldSize * input.laborCost;

  // Add some additional expense categories for a more realistic breakdown
  const fuelUtilitiesTotal = input.fieldSize * 35; // $35 per acre for fuel and utilities
  const equipmentTotal = input.fieldSize * 50; // $50 per acre for equipment maintenance
  const otherTotal = input.fieldSize * 20; // $20 per acre for miscellaneous expenses

  const totalExpenses =
    seedTotal +
    fertilizerTotal +
    laborTotal +
    fuelUtilitiesTotal +
    equipmentTotal +
    otherTotal;

  return [
    {
      category: "Seeds",
      amount: seedTotal,
      percentage: (seedTotal / totalExpenses) * 100,
      color: "blue-500",
    },
    {
      category: "Fertilizers",
      amount: fertilizerTotal,
      percentage: (fertilizerTotal / totalExpenses) * 100,
      color: "green-500",
    },
    {
      category: "Labor",
      amount: laborTotal,
      percentage: (laborTotal / totalExpenses) * 100,
      color: "yellow-500",
    },
    {
      category: "Fuel & Utilities",
      amount: fuelUtilitiesTotal,
      percentage: (fuelUtilitiesTotal / totalExpenses) * 100,
      color: "red-500",
    },
    {
      category: "Equipment & Maintenance",
      amount: equipmentTotal,
      percentage: (equipmentTotal / totalExpenses) * 100,
      color: "purple-500",
    },
    {
      category: "Other Expenses",
      amount: otherTotal,
      percentage: (otherTotal / totalExpenses) * 100,
      color: "orange-500",
    },
  ];
}

// Get financial summary for dashboard
export function getFinancialSummary(year: string = "2023"): FinancialSummary {
  // In a real app, this would fetch data from a database
  // For now, we'll return mock data
  const summaries: Record<string, FinancialSummary> = {
    "2023": {
      totalRevenue: 128450,
      totalExpenses: 76230,
      netProfit: 52220,
      roi: 68.5,
      yearOverYearRevenue: 12.5,
      yearOverYearExpenses: 8.3,
      yearOverYearProfit: 18.7,
      yearOverYearRoi: 5.2,
    },
    "2022": {
      totalRevenue: 114178,
      totalExpenses: 70388,
      netProfit: 43790,
      roi: 62.2,
      yearOverYearRevenue: 8.2,
      yearOverYearExpenses: 5.1,
      yearOverYearProfit: 12.3,
      yearOverYearRoi: 3.8,
    },
    "2021": {
      totalRevenue: 105525,
      totalExpenses: 66973,
      netProfit: 38552,
      roi: 57.6,
      yearOverYearRevenue: 5.5,
      yearOverYearExpenses: 3.2,
      yearOverYearProfit: 8.7,
      yearOverYearRoi: 2.1,
    },
  };

  return summaries[year] || summaries["2023"];
}
