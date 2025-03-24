
import React from 'react';
import { InvestmentResult, formatCurrency } from '../utils/calculateInvestment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'recharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ResultsDisplayProps {
  result: InvestmentResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const {
    yearsToMillion,
    finalAmount,
    monthlyContributionForTarget,
    suggestedMonthlyIncrease,
    chartData,
  } = result;

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
        
        <div className="chart-container h-64 mb-8">
          <Line
            data={chartData}
            width={600}
            height={200}
            dataKey="amount"
            xDataKey="year"
            stroke="#C7452D"
            strokeWidth={2}
          />
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
                Aumentando seu aporte mensal para{' '}
                <span className="result-highlight">
                  {formatCurrency(monthlyContributionForTarget)}
                </span>
                {' '}você atingirá seu objetivo mais rapidamente.
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
