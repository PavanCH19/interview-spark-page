// import { useState, useEffect } from 'react';
// import {
//     ChevronLeft, Flag, Check, Circle, AlertCircle,
//     Clock, Award, BookmarkPlus, BookmarkCheck, ArrowRight, SkipForward
// } from 'lucide-react';
// import axios from 'axios';

// const MockSessionPlayer = ({ onComplete, onDataSubmit, skills, target_domains }) => {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [answers, setAnswers] = useState({});
//     const [markedForReview, setMarkedForReview] = useState(new Set());
//     const [timeLeft, setTimeLeft] = useState(600);
//     const [direction, setDirection] = useState('forward');
//     const [loading, setLoading] = useState(true);
//     // Load questions from JSON
//     useEffect(() => {
//         const fetchMockQuestions = async () => {
//             if (!skills || !target_domains) {
//                 console.warn("⚠ Missing skills or target_domains in props");
//                 return;
//             }

//             setLoading(true);

//             try {
//                 const payload = {
//                     skills: skills,
//                     target_domains: target_domains
//                 };

//                 console.log("📤 Sending to backend:", payload);

//                 const response = await axios.post(
//                     "http://localhost:3000/api/setup/mock_session_questions",
//                     payload,
//                     {
//                         headers: {
//                             "Authorization": `${localStorage.getItem("token")}`,
//                             "Content-Type": "application/json"
//                         }
//                     }
//                 );

//                 console.log("🎯 Backend returned questions:", response.data.data.questions);

//                 setQuestions(response.data.data.questions);
//             } catch (error) {
//                 console.error("❌ Error fetching mock session questions:", error);
//                 alert("Error loading mock session questions");
//             }

//             setLoading(false);
//         };

//         fetchMockQuestions();
//     }, [skills, target_domains]);


//     // Timer countdown
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft(prev => {
//                 if (prev <= 0) {
//                     clearInterval(timer);
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     const totalQuestions = questions.length;
//     const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

//     const getTimerColor = () => {
//         const percentage = (timeLeft / 600) * 100;
//         if (percentage > 50) return 'text-green-500';
//         if (percentage > 20) return 'text-yellow-500';
//         return 'text-red-500';
//     };

//     const getTimerStroke = () => {
//         const percentage = (timeLeft / 600) * 100;
//         if (percentage > 50) return '#10b981';
//         if (percentage > 20) return '#eab308';
//         return '#ef4444';
//     };

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins}:${secs.toString().padStart(2, '0')}`;
//     };

//     const radius = 36;
//     const circumference = 2 * Math.PI * radius;
//     const strokeDashoffset = circumference - (timeLeft / 600) * circumference;

//     const handleNext = () => {
//         setDirection('forward');
//         setCurrentQuestion(currentQuestion + 1);
//     };

//     const handlePrevious = () => {
//         if (currentQuestion > 0) {
//             setDirection('backward');
//             setCurrentQuestion(currentQuestion - 1);
//         }
//     };

//     const handleSkip = () => {
//         handleNext();
//     };

//     const handleMCQSelect = (option) => {
//         setAnswers({ ...answers, [currentQ.id]: option });
//     };

//     // Verify answer function
//     const verifyAnswer = (questionId, userAnswer) => {
//         const question = questions.find(q => q.id === questionId);
//         if (!question) return false;
//         return question.correctAnswer === userAnswer;
//     };

//     const handleSubmit = () => {
//         // Calculate time taken (10 minutes - time left)
//         const timeTaken = 600 - timeLeft;

//         // Prepare detailed results for each question
//         const submissionData = questions.map(q => {
//             const userAnswer = answers[q.id] || null;
//             const isCorrect = userAnswer ? verifyAnswer(q.id, userAnswer) : false;

//             return {
//                 question_id: q.id,
//                 question: q.question,
//                 difficulty: q.difficulty,
//                 tags: q.tags,
//                 userAnswer: userAnswer,
//                 correctAnswer: q.correctAnswer,
//                 isCorrect: isCorrect,
//                 marked: markedForReview.has(q.id)
//             };
//         });

//         // Calculate statistics
//         const totalCorrect = submissionData.filter(item => item.isCorrect).length;
//         const totalAttempted = submissionData.filter(item => item.userAnswer !== null).length;
//         const totalSkipped = totalQuestions - totalAttempted;
//         const score = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 0;

//         // Prepare final submission object
//         const finalSubmission = {
//             results: submissionData,
//             summary: {
//                 totalQuestions: totalQuestions,
//                 attempted: totalAttempted,
//                 skipped: totalSkipped,
//                 correct: totalCorrect,
//                 incorrect: totalAttempted - totalCorrect,
//                 score: parseFloat(score),
//                 timeTaken: timeTaken,
//                 timeFormatted: formatTime(timeTaken),
//                 markedForReview: Array.from(markedForReview)
//             }
//         };

//         // Console log for debugging
//         console.log('=== MOCK INTERVIEW SUBMISSION ===');
//         console.log('Summary:', finalSubmission.summary);
//         console.log('\nDetailed Results:');
//         console.table(submissionData);

//         // Send data to parent component
//         if (onDataSubmit) {
//             onDataSubmit(finalSubmission);
//         }

//         // Call onComplete to move to next step or show results
//         if (onComplete) {
//             onComplete();
//         }
//     };

//     const toggleMarkForReview = () => {
//         const newMarked = new Set(markedForReview);
//         if (newMarked.has(currentQ.id)) {
//             newMarked.delete(currentQ.id);
//         } else {
//             newMarked.add(currentQ.id);
//         }
//         setMarkedForReview(newMarked);
//     };

//     const getDifficultyColor = (difficulty) => {
//         switch (difficulty) {
//             case 'easy': return 'bg-green-100 text-green-700 border-green-300';
//             case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
//             case 'hard': return 'bg-red-100 text-red-700 border-red-300';
//             default: return 'bg-gray-100 text-gray-700 border-gray-300';
//         }
//     };

//     const getDifficultyIcon = (difficulty) => {
//         switch (difficulty) {
//             case 'easy': return <Circle className="w-4 h-4" />;
//             case 'medium': return <AlertCircle className="w-4 h-4" />;
//             case 'hard': return <Award className="w-4 h-4" />;
//             default: return <Circle className="w-4 h-4" />;
//         }
//     };

//     // Show loading state
//     if (loading) {
//         return <div className="flex items-center justify-center h-screen text-xl">Loading questions...</div>;
//     }

//     const currentQ = questions[currentQuestion];
//     const isMarked = markedForReview.has(currentQ.id);
//     const currentAnswer = answers[currentQ.id];

//     return (
//         <>
//             <div className="flex-1 overflow-y-auto pb-32 md:pb-24">
//                 <div className="max-w-6xl mx-auto px-4 py-8">
//                     <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200">
//                         <div className="max-w-6xl mx-auto px-4 py-4 mb-6">
//                             <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center gap-4">
//                                     <h1 className="text-xl md:text-2xl font-bold text-gray-800">Mock Interview</h1>
//                                     <div className="hidden md:block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
//                                         Question {currentQuestion + 1} of {totalQuestions}
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-3">
//                                     <div className="relative w-20 h-20">
//                                         <svg className="transform -rotate-90 w-20 h-20">
//                                             <circle
//                                                 cx="40"
//                                                 cy="40"
//                                                 r={radius}
//                                                 stroke="#e5e7eb"
//                                                 strokeWidth="6"
//                                                 fill="transparent"
//                                             />
//                                             <circle
//                                                 cx="40"
//                                                 cy="40"
//                                                 r={radius}
//                                                 stroke={getTimerStroke()}
//                                                 strokeWidth="6"
//                                                 fill="transparent"
//                                                 strokeDasharray={circumference}
//                                                 strokeDashoffset={strokeDashoffset}
//                                                 strokeLinecap="round"
//                                                 className="transition-all duration-1000"
//                                             />
//                                         </svg>
//                                         <div className="absolute inset-0 flex flex-col items-center justify-center">
//                                             <Clock className={`w-4 h-4 ${getTimerColor()}`} />
//                                             <span className={`text-sm font-bold ${getTimerColor()}`}>
//                                                 {formatTime(timeLeft)}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                                 <div
//                                     className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
//                                     style={{ width: `${progress}%` }}
//                                 ></div>
//                             </div>

//                             <div className="md:hidden mt-3 text-center">
//                                 <span className="text-sm font-semibold text-gray-600">
//                                     Question {currentQuestion + 1} of {totalQuestions}
//                                 </span>
//                             </div>
//                         </div>

//                         <div key={currentQ.id} className={`animate-${direction === 'forward' ? 'slide-left' : 'slide-right'}`}>
//                             <div className="flex flex-wrap items-center gap-3 mb-6">
//                                 <div
//                                     className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 font-semibold text-sm ${getDifficultyColor(
//                                         currentQ.difficulty
//                                     )}`}
//                                 >
//                                     {getDifficultyIcon(currentQ.difficulty)}
//                                     <span className="capitalize">{currentQ.difficulty}</span>
//                                 </div>
//                                 {currentQ.tags.map((tag, idx) => (
//                                     <span
//                                         key={idx}
//                                         className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
//                                     >
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>

//                             <div className="mb-8">
//                                 <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
//                                     {currentQ.question}
//                                 </h2>
//                             </div>

//                             <div className="space-y-4 mb-8">
//                                 {currentQ.options.map((option, idx) => {
//                                     const isSelected = currentAnswer === option;
//                                     return (
//                                         <button
//                                             key={idx}
//                                             onClick={() => handleMCQSelect(option)}
//                                             className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${isSelected
//                                                 ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
//                                                 : 'border-gray-200 bg-white hover:border-blue-300'
//                                                 }`}
//                                         >
//                                             <div className="flex items-center gap-4">
//                                                 <div
//                                                     className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected
//                                                         ? 'border-blue-500 bg-blue-500'
//                                                         : 'border-gray-300'
//                                                         }`}
//                                                 >
//                                                     {isSelected && <Check className="w-5 h-5 text-white" />}
//                                                 </div>
//                                                 <span
//                                                     className={`text-lg font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'
//                                                         }`}
//                                                 >
//                                                     {option}
//                                                 </span>
//                                             </div>
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-gray-200">
//                             <button
//                                 onClick={handlePrevious}
//                                 disabled={currentQuestion === 0}
//                                 className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${currentQuestion === 0
//                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                                     : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
//                                     }`}
//                             >
//                                 <ChevronLeft className="w-5 h-5" /> Previous
//                             </button>

//                             <button
//                                 onClick={toggleMarkForReview}
//                                 className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${isMarked
//                                     ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
//                                     : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-400'
//                                     }`}
//                             >
//                                 {isMarked ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
//                                 {isMarked ? 'Marked' : 'Mark'}
//                             </button>

//                             <button
//                                 onClick={handleSkip}
//                                 disabled={currentQuestion === totalQuestions - 1}
//                                 className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${currentQuestion === totalQuestions - 1
//                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                                     : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
//                                     }`}
//                             >
//                                 <SkipForward className="w-5 h-5" /> Skip
//                             </button>

//                             <button
//                                 onClick={() => {
//                                     if (currentQuestion === totalQuestions - 1) {
//                                         handleSubmit();
//                                     } else {
//                                         handleNext();
//                                     }
//                                 }}
//                                 className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${currentQuestion === totalQuestions - 1
//                                     ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl'
//                                     : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                                     }`}
//                             >
//                                 {currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}
//                                 {currentQuestion === totalQuestions - 1 ? (
//                                     <Check className="w-5 h-5" />
//                                 ) : (
//                                     <ArrowRight className="w-5 h-5" />
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//                 @keyframes slide-left {
//                     from {
//                         opacity: 0;
//                         transform: translateX(50px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
//                     }
//                 }
//                 @keyframes slide-right {
//                     from {
//                         opacity: 0;
//                         transform: translateX(-50px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
//                     }
//                 }
//                 .animate-slide-left {
//                     animation: slide-left 0.4s ease-out;
//                 }
//                 .animate-slide-right {
//                     animation: slide-right 0.4s ease-out;
//                 }
//                 .hover\\:scale-102:hover {
//                     transform: scale(1.02);
//                 }
//             `}</style>
//         </>
//     );
// };

// export default MockSessionPlayer;



import { useState, useEffect } from 'react';
import {
    ChevronLeft, Flag, Check, Circle, AlertCircle,
    Clock, Award, BookmarkPlus, BookmarkCheck, ArrowRight, SkipForward
} from 'lucide-react';
import axios from 'axios';
import { useRef } from 'react';


const MockSessionPlayer = ({ onComplete, onDataSubmit, skills, target_domains }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(600);
    const [direction, setDirection] = useState('forward');
    const [loading, setLoading] = useState(true);
    const fetchedRef = useRef(false);


    // Load questions from JSON
    useEffect(() => {
        if (fetchedRef.current) return; //  prevent second call
        fetchedRef.current = true;      //  lock

        const fetchMockQuestions = async () => {
            if (!skills || !target_domains) return;
            setLoading(true);

            try {
                const payload = { skills, target_domains };
                console.log("📤 Sending to backend:", payload);

                const response = await axios.post(
                    "http://localhost:3000/api/setup/mock_session_questions",
                    payload,
                    {
                        headers: {
                            "Authorization": `${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const result = response.data.data.data.result.questions_recommended;

                console.log("🎯 Backend returned:", response.data.data.data.result.questions_recommended);

                setQuestions(
                    result.map(q => q.question)
                );

            } catch (error) {
                console.error("❌ Error:", error);
            }

            setLoading(false);
        };

        fetchMockQuestions();
    }, [skills, target_domains]);


    // Timer countdown
    useEffect(() => {
        if (loading || questions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, questions]);

    const totalQuestions = questions.length;
    const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

    const getTimerColor = () => {
        const percentage = (timeLeft / 600) * 100;
        if (percentage > 50) return 'text-green-500';
        if (percentage > 20) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getTimerStroke = () => {
        const percentage = (timeLeft / 600) * 100;
        if (percentage > 50) return '#10b981';
        if (percentage > 20) return '#eab308';
        return '#ef4444';
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timeLeft / 600) * circumference;

    const handleNext = () => {
        setDirection('forward');
        setCurrentQuestion(currentQuestion + 1);
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setDirection('backward');
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSkip = () => {
        handleNext();
    };

    const handleMCQSelect = (option) => {
        setAnswers({ ...answers, [currentQ._id]: option });
    };

    // Verify answer function
    const verifyAnswer = (questionId, userAnswer) => {
        const question = questions.find(q => q._id === questionId);
        if (!question) return false;
        return question.answer === userAnswer;
    };

    const handleSubmit = () => {
        // Calculate time taken (10 minutes - time left)
        const timeTaken = 600 - timeLeft;

        // Prepare detailed results for each question
        const submissionData = questions.map(q => {
            const userAnswer = answers[q._id] || null;
            const isCorrect = userAnswer ? verifyAnswer(q._id, userAnswer) : false;

            return {
                question_id: q._id,
                question: q.text,
                difficulty: q.difficulty_label,
                tags: q.tags,
                domain: q.domain,
                topic: q.topic,
                userAnswer: userAnswer,
                correctAnswer: q.answer,
                isCorrect: isCorrect,
                marked: markedForReview.has(q._id),
                explanation: q.explanation
            };
        });

        // Calculate statistics
        const totalCorrect = submissionData.filter(item => item.isCorrect).length;
        const totalAttempted = submissionData.filter(item => item.userAnswer !== null).length;
        const totalSkipped = totalQuestions - totalAttempted;
        const score = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 0;

        // Prepare final submission object
        const finalSubmission = {
            results: submissionData,
            summary: {
                totalQuestions: totalQuestions,
                attempted: totalAttempted,
                skipped: totalSkipped,
                correct: totalCorrect,
                incorrect: totalAttempted - totalCorrect,
                score: parseFloat(score),
                timeTaken: timeTaken,
                timeFormatted: formatTime(timeTaken),
                markedForReview: Array.from(markedForReview)
            }
        };

        // Console log for debugging
        console.log('=== MOCK INTERVIEW SUBMISSION ===');
        console.log('Summary:', finalSubmission.summary);
        console.log('\nDetailed Results:');
        console.table(submissionData);

        // Send data to parent component
        if (onDataSubmit) {
            onDataSubmit(finalSubmission);
        }

        // Call onComplete to move to next step or show results
        if (onComplete) {
            onComplete();
        }
    };

    const toggleMarkForReview = () => {
        const newMarked = new Set(markedForReview);
        if (newMarked.has(currentQ._id)) {
            newMarked.delete(currentQ._id);
        } else {
            newMarked.add(currentQ._id);
        }
        setMarkedForReview(newMarked);
    };

    const getDifficultyColor = (difficulty) => {
        const level = typeof difficulty === 'string' ? difficulty.toLowerCase() : '';
        if (level.includes('easy')) return 'bg-green-100 text-green-700 border-green-300';
        if (level.includes('medium')) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        if (level.includes('hard')) return 'bg-red-100 text-red-700 border-red-300';
        return 'bg-gray-100 text-gray-700 border-gray-300';
    };

    const getDifficultyIcon = (difficulty) => {
        const level = typeof difficulty === 'string' ? difficulty.toLowerCase() : '';
        if (level.includes('easy')) return <Circle className="w-4 h-4" />;
        if (level.includes('medium')) return <AlertCircle className="w-4 h-4" />;
        if (level.includes('hard')) return <Award className="w-4 h-4" />;
        return <Circle className="w-4 h-4" />;
    };

    // Skeleton Loading Component
    const SkeletonLoader = () => (
        <div className="flex-1 overflow-y-auto pb-32 md:pb-24">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 py-4 mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="hidden md:block h-6 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-3">
                            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>

                        <div className="space-y-3">
                            <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-16 w-full bg-gray-200 rounded-2xl animate-pulse"></div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center gap-3 pt-4 border-t border-gray-200">
                            <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Show loading state
    if (loading) {
        return <SkeletonLoader />;
    }

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Questions Available</h2>
                    <p className="text-gray-600">Unable to load mock session questions. Please try again.</p>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];
    const isMarked = markedForReview.has(currentQ._id);
    const currentAnswer = answers[currentQ._id];

    return (
        <>
            <div className="flex-1 overflow-y-auto pb-32 md:pb-24">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200">
                        <div className="max-w-6xl mx-auto px-4 py-4 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Mock Interview</h1>
                                    <div className="hidden md:block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                        Question {currentQuestion + 1} of {totalQuestions}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="relative w-20 h-20">
                                        <svg className="transform -rotate-90 w-20 h-20">
                                            <circle
                                                cx="40"
                                                cy="40"
                                                r={radius}
                                                stroke="#e5e7eb"
                                                strokeWidth="6"
                                                fill="transparent"
                                            />
                                            <circle
                                                cx="40"
                                                cy="40"
                                                r={radius}
                                                stroke={getTimerStroke()}
                                                strokeWidth="6"
                                                fill="transparent"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={strokeDashoffset}
                                                strokeLinecap="round"
                                                className="transition-all duration-1000"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <Clock className={`w-4 h-4 ${getTimerColor()}`} />
                                            <span className={`text-sm font-bold ${getTimerColor()}`}>
                                                {formatTime(timeLeft)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            <div className="md:hidden mt-3 text-center">
                                <span className="text-sm font-semibold text-gray-600">
                                    Question {currentQuestion + 1} of {totalQuestions}
                                </span>
                            </div>
                        </div>

                        <div key={currentQ._id} className={`animate-${direction === 'forward' ? 'slide-left' : 'slide-right'}`}>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <div
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 font-semibold text-sm ${getDifficultyColor(
                                        currentQ.difficulty_label
                                    )}`}
                                >
                                    {getDifficultyIcon(currentQ.difficulty_label)}
                                    <span className="capitalize">{currentQ.difficulty_label}</span>
                                </div>
                                {currentQ.domain && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-full text-sm font-medium">
                                        {currentQ.domain}
                                    </span>
                                )}
                                {currentQ.topic && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium">
                                        {currentQ.topic}
                                    </span>
                                )}
                                {currentQ.tags && currentQ.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
                                    {currentQ.text}
                                </h2>
                            </div>

                            <div className="space-y-4 mb-8">
                                {currentQ.options.map((option, idx) => {
                                    const isSelected = currentAnswer === option;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleMCQSelect(option)}
                                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${isSelected
                                                ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                                                : 'border-gray-200 bg-white hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected
                                                        ? 'border-blue-500 bg-blue-500'
                                                        : 'border-gray-300'
                                                        }`}
                                                >
                                                    {isSelected && <Check className="w-5 h-5 text-white" />}
                                                </div>
                                                <span
                                                    className={`text-lg font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'
                                                        }`}
                                                >
                                                    {option}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-gray-200">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${currentQuestion === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" /> Previous
                            </button>

                            <button
                                onClick={toggleMarkForReview}
                                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${isMarked
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-400'
                                    }`}
                            >
                                {isMarked ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
                                {isMarked ? 'Marked' : 'Mark'}
                            </button>

                            <button
                                onClick={handleSkip}
                                disabled={currentQuestion === totalQuestions - 1}
                                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${currentQuestion === totalQuestions - 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                                    }`}
                            >
                                <SkipForward className="w-5 h-5" /> Skip
                            </button>

                            <button
                                onClick={() => {
                                    if (currentQuestion === totalQuestions - 1) {
                                        handleSubmit();
                                    } else {
                                        handleNext();
                                    }
                                }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${currentQuestion === totalQuestions - 1
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    }`}
                            >
                                {currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}
                                {currentQuestion === totalQuestions - 1 ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <ArrowRight className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-left {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slide-right {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-slide-left {
                    animation: slide-left 0.4s ease-out;
                }
                .animate-slide-right {
                    animation: slide-right 0.4s ease-out;
                }
                .hover\\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </>
    );
};

export default MockSessionPlayer;