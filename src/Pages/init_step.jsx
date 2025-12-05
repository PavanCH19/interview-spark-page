import { useState, useRef } from 'react';
import { CheckCircle, Circle, Loader2, Brain, Target, TrendingUp } from 'lucide-react';
import DomainCompanySelector from './dom_com_selection';
import MockSessionPlayer from './mock_session';
import EditableProfile from './resume_form';
import ResumeUpload from './resume_upload';
import axios from 'axios';
import CareerRecommendationDashboard from "./carrer_recomend"

const CareerAssessmentFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [collectedData, setCollectedData] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const [showMockResults, setShowMockresults] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const collectedDataRef = useRef({});

    const steps = [
        { id: 0, name: 'Resume Upload', component: ResumeUpload },
        { id: 1, name: 'Profile Edit', component: EditableProfile },
        { id: 2, name: 'Domain Selection', component: DomainCompanySelector },
        { id: 3, name: 'Assessment', component: MockSessionPlayer },
    ];

    const handleStepComplete = (stepData) => {
        // Merge stepData with existing collectedData
        const updatedData = stepData && Object.keys(stepData).length > 0
            ? { ...collectedDataRef.current, ...stepData }
            : collectedDataRef.current;

        // Update both state and ref
        collectedDataRef.current = updatedData;
        setCollectedData(updatedData);

        // Log AFTER merging
        console.log("✅ Updated collectedData:", updatedData);
        console.log(collectedData);

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            if (hasSubmitted) return;
            setHasSubmitted(true);

            setTimeout(() => {
                const finalData = collectedDataRef.current;
                console.log("🚀 Final submission with data:", finalData);
                submitFinalData(finalData);
            }, 200);
        }

    };

    const submitFinalData = async (updatedData) => {
        if (submitFinalData.called) {
            console.warn("🚨 submitFinalData skipped (already called)");
            return;
        }
        submitFinalData.called = true;

        setIsProcessing(true);

        try {
            // Step 1: Save user details
            setProcessingStep('Saving your profile...');
            const response = await axios.post('http://localhost:3000/api/auth/updateUserDetails', updatedData, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log("✅ Data successfully sent to backend:", response.data);

            // Step 2: Classify data
            setProcessingStep('Analyzing your skills and experience...');
            const classify_data = transformCandidateData(updatedData);
            console.log("🧠 Transformed classification data:", classify_data);

            const classifyResponse = await axios.post('http://localhost:3000/api/setup/setUp_result', classify_data, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log("✅ Classify data successfully sent to backend:", classifyResponse.data.data.data.result);

            // Step 3: Navigate with results
            setProcessingStep('Preparing your results...');
            setResultData({
                classificationResult: classifyResponse.data.data.data.result,
                mocktest_result: updatedData.results,
                mocktest_summary: updatedData.summary
            });

            setTimeout(() => {
                setShowMockresults(true);
                setIsProcessing(false);
            }, 800);


        } catch (error) {
            console.error("❌ Error during submission:", error);
            setIsProcessing(false);
            // You might want to show an error message to the user here
            alert('An error occurred while processing your data. Please try again.');
        }
    };

    // Keep handleChildData for real-time data updates
    
    const handleChildData = (data) => {
        const merged = { ...collectedDataRef.current, ...data };
        collectedDataRef.current = merged;
        setCollectedData(merged);
        console.log("📥 Data received from child (real-time):", data);
        console.log("📦 Current collectedData state:", merged);
    };

    const CurrentStepComponent = steps[currentStep].component;
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;

    const transformCandidateData = (collectedData) => {
        // here collectedData is updatedData passed from the submitFinal data
        if (!collectedData) return null;

        // Extract skills (capitalize first letter for consistency)
        const skills = collectedData.skills
            ? collectedData.skills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1)) 
            : [];

        // Extract project titles
        const projects = collectedData.projects
            ? collectedData.projects.map(p => p.title || "Untitled Project")
            : [];

        // Extract work experience (calculate years if possible)
        const work_experience = collectedData.experience && collectedData.experience.length > 0
            ? collectedData.experience.map(exp => {
                let years = 1;
                if (exp.startDate && exp.endDate) {
                    const start = new Date(exp.startDate);
                    const end = new Date(exp.endDate);
                    const diff = (end - start) / (1000 * 60 * 60 * 24 * 365);
                    years = Math.max(1, Math.round(diff));
                }
                return {
                    title: exp.role || "Unknown Role",
                    years
                };
            })
            : [];

        // Extract test score from summary
        const test_score = collectedData.summary?.score ?? 0;

        // Extract preferred domain
        const preferred_domain = collectedData.target_domains?.[0] || "General";

        // Final structured object (no ID)
        return {
            skills,
            projects,
            work_experience,
            test_score,
            preferred_domain
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-3 px-4">
            <div className="max-w-7xl mx-auto mb-12">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 relative">

                    {/* Step Indicators */}
                    {!showMockResults && (
                        <>
                            <div className="flex items-center justify-between mb-6 relative">
                                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>

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
                        </>
                    )}



                    {/* Current Step Content */}
                    <div className="max-w-6xl mx-auto mt-8">
                        {!showMockResults && !isProcessing && (
                            <CurrentStepComponent
                                onComplete={handleStepComplete}
                                onDataSubmit={handleChildData}
                                skills={collectedData.skills}
                                target_domains={collectedData.target_domains}
                            />

                        )}
                        {/* Loading Overlay - Compact Version */}
                        {isProcessing && (
                            <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] bg-gray-100 rounded-3xl overflow-hidden">
                                {/* Centered overlay */}
                                <div className="absolute inset-0 flex items-center justify-center rounded-3xl px-4">
                                    <div className="text-center w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col justify-center px-4 sm:px-6">

                                        {/* Animated Icon Container */}
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 animate-ping-slow">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-purple-500/20"></div>
                                            </div>
                                            <div className="relative">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl animate-bounce-slow">
                                                    <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Processing Steps */}
                                        <div className="space-y-4">
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
                                                <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                                                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                                    Processing Your Assessment
                                                </h2>
                                            </div>

                                            <p className="text-sm sm:text-base text-purple-600 font-medium animate-pulse">
                                                {processingStep}
                                            </p>

                                            {/* Progress Steps */}
                                            <div className="flex justify-center gap-4 sm:gap-6 mt-6 flex-wrap">
                                                {/* Step 1 */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <div
                                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${processingStep.includes("Saving")
                                                            ? "bg-blue-500 animate-pulse shadow-lg"
                                                            : "bg-green-500 shadow-md"
                                                            }`}
                                                    >
                                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-gray-600 font-medium">Profile</span>
                                                </div>

                                                {/* Step 2 */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <div
                                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${processingStep.includes("Analyzing")
                                                            ? "bg-purple-500 animate-pulse shadow-lg"
                                                            : processingStep.includes("Preparing")
                                                                ? "bg-green-500 shadow-md"
                                                                : "bg-gray-300"
                                                            }`}
                                                    >
                                                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-gray-600 font-medium">Analysis</span>
                                                </div>

                                                {/* Step 3 */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <div
                                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${processingStep.includes("Preparing")
                                                            ? "bg-pink-500 animate-pulse shadow-lg"
                                                            : "bg-gray-300"
                                                            }`}
                                                    >
                                                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-gray-600 font-medium">Results</span>
                                                </div>
                                            </div>

                                            {/* Loading Bar */}
                                            <div className="w-full max-w-xs sm:max-w-sm mx-auto mt-6">
                                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-loading-bar"></div>
                                                </div>
                                            </div>

                                            <p className="text-xs sm:text-sm text-gray-500 mt-4">
                                                Analyzing your profile and generating personalized recommendations...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showMockResults && resultData && (
                            <div className="animate-fade-in">
                                <CareerRecommendationDashboard
                                    classificationResult={resultData.classificationResult}
                                    mocktest_result={resultData.mocktest_result}
                                    mocktest_summary={resultData.mocktest_summary}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.6s ease-out; }

                @keyframes pulse-slow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
                    50% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2s ease-in-out infinite;
                }

                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
                .animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }

                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }

                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
                .animate-loading-bar {
                    animation: loading-bar 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default CareerAssessmentFlow;