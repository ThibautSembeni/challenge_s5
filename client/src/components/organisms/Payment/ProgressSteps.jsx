import React from 'react';

const ProgressSteps = ({ steps }) => {
  return (
    <nav aria-label="Progress" className="mb-20">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={`group flex flex-col border-l-4 ${
                step.status === 'complete' ? 'border-indigo-600' :
                  step.status === 'current' ? 'border-indigo-600' :
                    'border-gray-200'
              } py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4`}
              aria-current={step.status === 'current' ? 'step' : undefined}
            >
              <span className={`text-sm font-medium ${
                step.status === 'complete' ? 'text-indigo-600' :
                  step.status === 'current' ? 'text-indigo-600' :
                    'text-gray-500'
              }`}>{step.id}</span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProgressSteps;
