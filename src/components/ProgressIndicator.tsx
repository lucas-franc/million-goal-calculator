
import React from 'react';

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  steps, 
  currentStep 
}) => {
  return (
    <div className="step-indicator">
      {Array.from({ length: steps }, (_, index) => (
        <React.Fragment key={index}>
          <div 
            className={`step-dot ${
              index < currentStep ? 'completed' : index === currentStep ? 'active' : ''
            }`}
          />
          {index < steps - 1 && (
            <div 
              className={`step-line ${
                index < currentStep ? 'completed' : ''
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
