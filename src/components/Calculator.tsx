
import React, { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import InvestmentFormStep from './InvestmentFormStep';
import ResultsDisplay from './ResultsDisplay';
import { calculateInvestment, parseCurrencyInput, InvestmentResult } from '../utils/calculateInvestment';

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

interface FormData {
  objective: string;
  initialInvestment: string;
  years: string;
  monthlyContribution: string;
  investorProfile: string;
  marketReaction: string;
  contact: ContactInfo;
}

const initialFormData: FormData = {
  objective: '',
  initialInvestment: '',
  years: '',
  monthlyContribution: '',
  investorProfile: '',
  marketReaction: '',
  contact: {
    name: '',
    email: '',
    phone: '',
  },
};

const Calculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [calculationResult, setCalculationResult] = useState<InvestmentResult | null>(null);
  
  const totalSteps = 7;
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit form and calculate
      calculateResults();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const calculateResults = () => {
    const initialAmount = parseCurrencyInput(formData.initialInvestment);
    const monthlyContribution = parseCurrencyInput(formData.monthlyContribution);
    const years = parseInt(formData.years, 10);
    const annualReturn = 0.1; // 10% annual return
    
    const result = calculateInvestment({
      initialAmount,
      monthlyContribution,
      years,
      annualReturn,
    });
    
    setCalculationResult(result);
  };
  
  const handleReset = () => {
    setFormData(initialFormData);
    setCalculationResult(null);
    setCurrentStep(0);
  };
  
  const updateFormData = (field: keyof FormData, value: string | number | ContactInfo) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  // Form step definitions
  const steps = [
    {
      title: "Qual é seu principal objetivo com este investimento?",
      type: "options" as const,
      field: "objective" as keyof FormData,
      options: [
        { id: "1", label: "Aumentar o meu patrimônio", value: "increase_patrimony" },
        { id: "2", label: "Atingir meu primeiro milhão", value: "reach_million" },
        { id: "3", label: "Aposentadoria", value: "retirement" },
        { id: "4", label: "Outros", value: "others" },
      ],
    },
    {
      title: "Quanto você gostaria de investir inicialmente?",
      type: "currency" as const,
      field: "initialInvestment" as keyof FormData,
      placeholder: "R$ 0,00",
    },
    {
      title: "Por quanto tempo?",
      type: "number" as const,
      field: "years" as keyof FormData,
      placeholder: "Anos",
    },
    {
      title: "Quanto planeja investir por mês?",
      type: "currency" as const,
      field: "monthlyContribution" as keyof FormData,
      placeholder: "R$ 0,00",
    },
    {
      title: "Como você se considera como investidor?",
      type: "options" as const,
      field: "investorProfile" as keyof FormData,
      options: [
        { id: "1", label: "Aprendendo", value: "learning" },
        { id: "2", label: "Foco na rentabilidade", value: "profitability" },
        { id: "3", label: "Foco na segurança", value: "safety" },
        { id: "4", label: "Estou disposto a arriscar", value: "risk" },
      ],
    },
    {
      title: "Como você reagiria a uma queda nos seus investimentos?",
      type: "options" as const,
      field: "marketReaction" as keyof FormData,
      options: [
        { id: "1", label: "Faria aportes", value: "invest_more" },
        { id: "2", label: "Resgataria tudo", value: "withdraw_all" },
        { id: "3", label: "Manteria o valor e veria como o mercado reage", value: "keep_and_wait" },
        { id: "4", label: "Não faço ideia de como reagir", value: "no_idea" },
      ],
    },
    {
      title: "Para receber a simulação",
      type: "contact" as const,
      field: "contact" as keyof FormData,
    },
  ];
  
  const currentStepConfig = steps[currentStep];
  
  if (calculationResult) {
    return <ResultsDisplay result={calculationResult} onReset={handleReset} />;
  }
  
  return (
    <div className="investment-form-container">
      <ProgressIndicator steps={totalSteps} currentStep={currentStep} />
      
      <InvestmentFormStep
        title={currentStepConfig.title}
        type={currentStepConfig.type}
        options={currentStepConfig.options}
        value={formData[currentStepConfig.field]}
        onChange={(value) => updateFormData(currentStepConfig.field, value)}
        onNext={handleNext}
        onBack={currentStep > 0 ? handleBack : undefined}
        placeholder={currentStepConfig.placeholder}
        isLastStep={currentStep === totalSteps - 1}
      />
    </div>
  );
};

export default Calculator;
