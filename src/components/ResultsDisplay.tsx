
import React from 'react';
import { InvestmentResult, formatCurrency } from '../utils/calculateInvestment';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Clock, CreditCard, ArrowRightCircle, RefreshCw } from 'lucide-react';

interface ResultsDisplayProps {
  result: InvestmentResult;
  onReset: () => void;
  requestedYears: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset, requestedYears }) => {
  const {
    yearsToMillion,
    finalAmount,
    monthlyContributionForTarget,
    suggestedMonthlyIncrease,
    chartData,
    yearsWithSuggestedContribution,
  } = result;

  // Calculate the difference between requested and actual years
  const yearDifference = yearsToMillion - requestedYears;
  
  // Determine comparison message
  const getComparisonMessage = () => {
    if (yearDifference > 0) {
      return `Você solicitou ${requestedYears} anos, mas levará ${yearDifference} anos a mais do que planejou.`;
    } else if (yearDifference < 0) {
      return `Você solicitou ${requestedYears} anos, mas atingirá seu objetivo ${Math.abs(yearDifference)} anos antes do esperado!`;
    } else {
      return `Você atingirá seu objetivo exatamente no período solicitado de ${requestedYears} anos.`;
    }
  };

  // Calculate time saved with increased contribution
  const calculateTimeSaved = () => {
    if (!yearsWithSuggestedContribution || suggestedMonthlyIncrease <= 0) {
      return null;
    }
    
    const timeSaved = yearsToMillion - yearsWithSuggestedContribution;
    if (timeSaved <= 0) return null;
    
    return `Com este aumento, você economizaria ${timeSaved} ${timeSaved === 1 ? 'ano' : 'anos'} (${yearsWithSuggestedContribution} anos em vez de ${yearsToMillion}).`;
  };

  const timeSavedMessage = calculateTimeSaved();

  // Get the gradient ID for the chart
  const gradientId = "colorAmount";

  return (
    <div className="results-container animate-fadeIn">
      <div className="result-card">
        <h2 className="form-heading mb-8">Resultados da sua simulação</h2>
        
        <div className="mb-12 mt-6 text-center">
          <p className="text-p3 mb-4">Com seu plano atual, você atingirá seu primeiro milhão em:</p>
          <div className="text-d3 md:text-d2 bg-clip-text text-transparent bg-gradient-to-r from-brand to-contrast font-light flex items-center justify-center gap-4">
            <Clock className="h-8 w-8 text-brand" />
            <span>{yearsToMillion} anos</span>
          </div>
        </div>
        
        {/* Add comparison section with updated styling */}
        <div className="mb-10 p-6 bg-gradient-to-r from-[#F8F2E9] to-[#FFF9F1] rounded-lg border-l-4 border-[#C7935A] shadow-sm">
          <h3 className="text-h5 mb-3 flex items-center gap-2 text-[#333131]">
            <TrendingUp className="h-5 w-5 text-[#C7935A]" />
            Comparação com seu planejamento
          </h3>
          <p className="text-p4 text-[#333131]">{getComparisonMessage()}</p>
        </div>
        
        <div className="chart-container h-72 mb-12 p-4 bg-white rounded-xl shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C7452D" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#C7452D" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EBE7E6" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: "#333131" }}
                axisLine={{ stroke: "#EBE7E6" }}
              />
              <YAxis 
                tick={{ fill: "#333131" }}
                axisLine={{ stroke: "#EBE7E6" }}
                tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Ano ${label}`}
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: 'none'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#C7452D" 
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#${gradientId})`}
                activeDot={{ r: 8, strokeWidth: 0, fill: '#C7452D' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary rounded-lg shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-full p-2">
                <CreditCard className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-h5">Valor final do investimento</h3>
            </div>
            <p className="text-h3 text-text font-medium">{formatCurrency(finalAmount)}</p>
          </div>
          
          {suggestedMonthlyIncrease > 0 && (
            <div className="bg-primary rounded-lg shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white rounded-full p-2">
                  <ArrowRightCircle className="h-6 w-6 text-brand" />
                </div>
                <h3 className="text-h5">Para atingir mais rápido</h3>
              </div>
              <p className="text-p3">
                Seu aporte atual é de <span className="result-highlight">{formatCurrency(monthlyContributionForTarget - suggestedMonthlyIncrease)}</span>.
                <br />
                Aumentando para{' '}
                <span className="result-highlight">
                  {formatCurrency(monthlyContributionForTarget)}
                </span>
                {' '}você atingirá seu objetivo mais rapidamente.
                
                {timeSavedMessage && (
                  <div className="mt-4 p-3 bg-[#F8F2E9] rounded-lg border-l-4 border-[#C7935A]">
                    <span className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#C7935A]" />
                      {timeSavedMessage}
                    </span>
                  </div>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <button 
          onClick={onReset} 
          className="btn-navigation inline-flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Fazer nova simulação
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
