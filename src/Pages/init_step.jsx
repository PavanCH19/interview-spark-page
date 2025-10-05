import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import DomainCompanySelector from './dom_com_selection';
import MockSessionPlayer from './mock_session';
import EditableProfile from './resume_form';
import ResumeUpload from './resume_upload';

// Main Career Assessment Flow Component
const CareerAssessmentFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { id: 0, name: 'Resume Upload', component: ResumeUpload },
        { id: 1, name: 'Profile Edit', component: EditableProfile },
        { id: 2, name: 'Domain Selection', component: DomainCompanySelector },
        { id: 3, name: 'Assessment', component: MockSessionPlayer }
    ];

    const handleStepComplete = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const CurrentStepComponent = steps[currentStep].component;
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-3 px-4">
            {/* Progress Bar Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
                    {/* Step Indicators */}
                    <div className="flex items-center justify-between mb-6 relative">
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>

                        {/* Step Circles */}
                        {steps.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <div key={step.id} className="flex flex-col items-center relative z-10">
                                    <button
                                        onClick={() => index < currentStep && setCurrentStep(index)}
                                        disabled={index > currentStep}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 transform hover:scale-110 ${isCompleted
                                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                                            : isCurrent
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl animate-pulse-slow'
                                                : 'bg-white border-4 border-gray-300 text-gray-400'
                                            } ${index < currentStep ? 'cursor-pointer' : ''}`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                                        ) : (
                                            <Circle className="w-5 h-5 md:w-6 md:h-6" />
                                        )}
                                    </button>
                                    <span
                                        className={`mt-3 text-xs md:text-sm font-semibold text-center transition-all duration-300 ${isCurrent
                                            ? 'text-purple-700'
                                            : isCompleted
                                                ? 'text-green-600'
                                                : 'text-gray-400'
                                            }`}
                                    >
                                        {step.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Progress:</span>
                            <span className="text-lg font-bold text-purple-700">
                                {Math.round(progressPercentage)}%
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Step</span>
                            <span className="text-lg font-bold text-gray-800">
                                {currentStep + 1} / {steps.length}
                            </span>
                        </div>
                    </div>
                    {/* Current Step Content */}
                    <div className="max-w-6xl mx-auto">
                        <CurrentStepComponent onComplete={handleStepComplete} />
                    </div>
                </div>
            </div>



            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default CareerAssessmentFlow;