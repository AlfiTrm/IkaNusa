import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex items-center justify-center mb-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${index + 1 <= currentStep ? "bg-blu-350 text-white" : "bg-transparent border border-blu-350 text-blu-350"}`}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`md:w-sm w-30 h-0.5 mx-2 ${index + 1 < currentStep ? "bg-blu-350" : "bg-netral-200"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;
