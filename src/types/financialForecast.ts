// Types for financial forecasting data and results

export interface CropData {
  id: string;
  name: string;
  yieldPerAcre: number;
  costPerAcre: number;
  marketPrice: number;
  riskLevel: "Low" | "Medium" | "High";
  riskPercentage: number;
}

export interface FinancialInput {
  cropId: string;
  fieldSize: number;
  seedCost: number;
  fertilizerCost: number;
  laborCost: number;
  expectedYield: number;
  marketPrice: number;
  year: string;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface FinancialForecast {
  totalInvestment: number;
  projectedRevenue: number;
  netProfit: number;
  roi: number;
  paybackPeriod: number;
  riskLevel: "Low" | "Medium" | "High";
  riskPercentage: number;
  monthlyData: MonthlyData[];
  expenseBreakdown: ExpenseBreakdown[];
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  roi: number;
  yearOverYearRevenue: number;
  yearOverYearExpenses: number;
  yearOverYearProfit: number;
  yearOverYearRoi: number;
}

export interface CropComparison {
  crops: CropData[];
}
