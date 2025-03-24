
import React from 'react';
import { InvestmentResult, formatCurrency } from '../utils/calculateInvestment';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResultsDisplayProps {
  result: InvestmentResult;
  onReset: () => void;
  requestedYears: number; // Add requestedYears prop
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

  return (
    <div className="results-container animate-fadeIn">
      <div className="result-card">
        <h2 className="form-heading">Resultados da sua simulação</h2>
        
        <div className="mb-8 mt-6">
          <p className="text-p3 mb-2">Com seu plano atual, você atingirá seu primeiro milhão em:</p>
          <div className="text-d3 md:text-d2 text-brand font-light">
            {yearsToMillion} anos
          </div>
        </div>
        
        {/* Add comparison section */}
        <div className="mb-8 p-4 bg-[#EBE7E6] rounded-lg border-l-4 border-[#C7935A]">
          <h3 className="text-h5 mb-2 text-[#333131]">Comparação com seu planejamento</h3>
          <p className="text-p4 text-[#333131]">{getComparisonMessage()}</p>
        </div>
        
        <div className="chart-container h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Ano ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#C7452D" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-primary p-6 rounded-lg">
            <h3 className="text-h5 mb-3">Valor final do investimento</h3>
            <p className="text-h3 text-text">{formatCurrency(finalAmount)}</p>
          </div>
          
          {suggestedMonthlyIncrease > 0 && (
            <div className="bg-primary p-6 rounded-lg">
              <h3 className="text-h5 mb-3">Para atingir mais rápido</h3>
              <p className="text-p3">
                Seu aporte atual é de <span className="result-highlight">{formatCurrency(monthlyContributionForTarget - suggestedMonthlyIncrease)}</span>.
                <br />
                Aumentando para{' '}
                <span className="result-highlight">
                  {formatCurrency(monthlyContributionForTarget)}
                </span>
                {' '}você atingirá seu objetivo mais rapidamente.
                
                {timeSavedMessage && (
                  <div className="mt-2 p-2 bg-[#F8F2E9] rounded">
                    <span className="font-medium">{timeSavedMessage}</span>
                  </div>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <button onClick={onReset} className="btn-navigation">
          Fazer nova simulação
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
