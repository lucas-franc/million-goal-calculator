
export interface InvestmentData {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
}

export interface InvestmentResult {
  yearsToMillion: number;
  finalAmount: number;
  monthlyContributionForTarget: number;
  suggestedMonthlyIncrease: number;
  chartData: { year: number; amount: number }[];
}

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const parseCurrencyInput = (input: string): number => {
  // Remove R$, spaces, and replace commas with dots for calculation
  return parseFloat(input.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
};

export const calculateInvestment = (data: InvestmentData): InvestmentResult => {
  const { initialAmount, monthlyContribution, years, annualReturn } = data;
  
  // Convert annual return to monthly
  const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
  
  let currentAmount = initialAmount;
  let yearsToMillion = 0;
  const chartData: { year: number; amount: number }[] = [{ year: 0, amount: initialAmount }];
  
  // Calculate growth over time
  for (let year = 1; year <= Math.max(years, 100); year++) {
    for (let month = 1; month <= 12; month++) {
      // Add monthly contribution
      currentAmount += monthlyContribution;
      
      // Apply monthly return
      currentAmount *= (1 + monthlyReturn);
    }
    
    // Record year-end amount
    chartData.push({ year, amount: currentAmount });
    
    // Check if we've reached 1 million
    if (currentAmount >= 1000000 && yearsToMillion === 0) {
      yearsToMillion = year;
    }
    
    // Break if we've calculated enough years
    if (year >= years && yearsToMillion > 0) {
      break;
    }
    
    // Safety break to prevent infinite loops
    if (year >= 100) {
      yearsToMillion = 100; // Cap at 100 years if it takes too long
      break;
    }
  }
  
  // Calculate how much monthly contribution would be needed to reach 1M in target years
  let targetMonthly = monthlyContribution;
  if (years < yearsToMillion || yearsToMillion === 0) {
    // Use binary search to find the required monthly contribution
    let low = monthlyContribution;
    let high = 100000; // Reasonable upper limit
    
    while (high - low > 1) {
      const mid = Math.floor((low + high) / 2);
      
      let testAmount = initialAmount;
      for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
          testAmount += mid;
          testAmount *= (1 + monthlyReturn);
        }
      }
      
      if (testAmount >= 1000000) {
        high = mid;
      } else {
        low = mid;
      }
    }
    
    targetMonthly = high;
  }
  
  return {
    yearsToMillion,
    finalAmount: currentAmount,
    monthlyContributionForTarget: targetMonthly,
    suggestedMonthlyIncrease: targetMonthly - monthlyContribution,
    chartData
  };
};
