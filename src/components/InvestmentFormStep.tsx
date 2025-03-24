
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FormOption {
  id: string;
  label: string;
  value: string;
}

interface InvestmentFormStepProps {
  title: string;
  type: 'options' | 'currency' | 'number' | 'text' | 'contact';
  options?: FormOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  onNext: () => void;
  onBack?: () => void;
  placeholder?: string;
  isLastStep?: boolean;
}

const InvestmentFormStep: React.FC<InvestmentFormStepProps> = ({
  title,
  type,
  options = [],
  value,
  onChange,
  onNext,
  onBack,
  placeholder,
  isLastStep = false,
}) => {
  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (type === 'currency') {
      // Format as currency
      newValue = newValue.replace(/\D/g, '');
      if (newValue) {
        // Convert to number and format as currency
        const numberValue = parseInt(newValue, 10) / 100;
        newValue = numberValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      } else {
        newValue = '';
      }
    }
    
    onChange(newValue);
  };

  return (
    <div className="form-step">
      <h2 className="form-heading">{title}</h2>
      
      {type === 'options' && (
        <div className="options-container animate-slideUp">
          {options.map((option) => (
            <div
              key={option.id}
              className={`form-option ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      
      {type === 'currency' && (
        <div className="input-container animate-slideUp">
          <input
            type="text"
            className="currency-input"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder || 'R$ 0,00'}
          />
        </div>
      )}
      
      {type === 'number' && (
        <div className="input-container animate-slideUp">
          <input
            type="number"
            className="currency-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || '0'}
          />
        </div>
      )}
      
      {type === 'contact' && (
        <div className="contact-fields animate-slideUp">
          <div className="input-container">
            <input
              type="text"
              className="currency-input"
              placeholder="Nome"
              onChange={(e) => onChange({...value as object, name: e.target.value})}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              className="currency-input"
              placeholder="Email"
              onChange={(e) => onChange({...value as object, email: e.target.value})}
            />
          </div>
          <div className="input-container">
            <input
              type="tel"
              className="currency-input"
              placeholder="Telefone"
              onChange={(e) => onChange({...value as object, phone: e.target.value})}
            />
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        {onBack && (
          <button onClick={onBack} className="btn-navigation back">
            Voltar
          </button>
        )}
        <button 
          onClick={onNext} 
          className="btn-navigation ml-auto"
          disabled={value === undefined || value === ''}
        >
          {isLastStep ? 'Calcular' : 'Avançar'} 
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default InvestmentFormStep;
