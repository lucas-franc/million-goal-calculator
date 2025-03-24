
import React from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface FormOption {
  id: string;
  label: string;
  value: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

interface InvestmentFormStepProps {
  title: string;
  type: 'options' | 'currency' | 'number' | 'text' | 'contact';
  options?: FormOption[];
  value?: string | number | ContactInfo;
  onChange: (value: string | number | ContactInfo) => void;
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

  const handleContactChange = (field: keyof ContactInfo, fieldValue: string) => {
    const contactInfo = value as ContactInfo || { name: '', email: '', phone: '' };
    onChange({
      ...contactInfo,
      [field]: fieldValue
    });
  };

  const isFormValid = () => {
    if (value === undefined || value === '') return false;
    
    if (type === 'contact') {
      const contactInfo = value as ContactInfo;
      return !!(contactInfo?.name && contactInfo?.email && contactInfo?.phone);
    }
    
    return true;
  };

  return (
    <div className="form-step">
      <h2 className="form-heading">{title}</h2>
      
      {type === 'options' && (
        <div className="options-container animate-slideUp space-y-4">
          {options.map((option) => (
            <div
              key={option.id}
              className={`form-option ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              <div className="flex items-center w-full">
                <div className="flex-grow">{option.label}</div>
                {value === option.value && (
                  <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {type === 'currency' && (
        <div className="input-container animate-slideUp">
          <input
            type="text"
            className="currency-input"
            value={value as string}
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
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || '0'}
          />
        </div>
      )}
      
      {type === 'contact' && (
        <div className="contact-fields animate-slideUp space-y-4">
          <div className="input-container">
            <input
              type="text"
              className="currency-input"
              placeholder="Nome"
              value={(value as ContactInfo)?.name || ''}
              onChange={(e) => handleContactChange('name', e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              className="currency-input"
              placeholder="Email"
              value={(value as ContactInfo)?.email || ''}
              onChange={(e) => handleContactChange('email', e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="tel"
              className="currency-input"
              placeholder="Telefone"
              value={(value as ContactInfo)?.phone || ''}
              onChange={(e) => handleContactChange('phone', e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        {onBack && (
          <button onClick={onBack} className="btn-navigation back group">
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Voltar
          </button>
        )}
        <button 
          onClick={onNext} 
          className={`btn-navigation ml-auto ${isFormValid() ? 'pulse-border' : ''}`}
          disabled={!isFormValid()}
        >
          {isLastStep ? 'Calcular' : 'Avançar'} 
          <ArrowRight className="ml-2 h-5 w-5 group-hover:animate-pulse" />
        </button>
      </div>
    </div>
  );
};

export default InvestmentFormStep;
