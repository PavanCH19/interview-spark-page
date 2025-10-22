// // import { useState, useEffect } from 'react';
// // import {
// //     ChevronRight, ChevronLeft, Flag, Check, Circle, AlertCircle,
// //     Clock, Award, BookmarkPlus, BookmarkCheck, ArrowRight, SkipForward
// // } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';


// // const MockSessionPlayer = () => {
// //     const [currentQuestion, setCurrentQuestion] = useState(0);
// //     const [answers, setAnswers] = useState({});
// //     const [markedForReview, setMarkedForReview] = useState(new Set());
// //     const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
// //     const [direction, setDirection] = useState('forward');
// //     const navigate = useNavigate();

// //     // Mock questions data
// //     const questions = [
// //         {
// //             id: 1,
// //             type: 'mcq',
// //             difficulty: 'easy',
// //             question: 'What is the time complexity of accessing an element in an array by index?',
// //             options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
// //             tags: ['Data Structures', 'Arrays', 'Google']
// //         },
// //         {
// //             id: 2,
// //             type: 'text',
// //             difficulty: 'medium',
// //             question: 'Explain the difference between REST and GraphQL APIs. When would you choose one over the other?',
// //             tags: ['Backend', 'APIs', 'Amazon', 'System Design']
// //         },
// //         {
// //             id: 3,
// //             type: 'mcq',
// //             difficulty: 'hard',
// //             question: 'In a distributed system, which consistency model guarantees that all nodes see the same data at the same time?',
// //             options: ['Eventual Consistency', 'Strong Consistency', 'Causal Consistency', 'Sequential Consistency'],
// //             tags: ['System Design', 'Distributed Systems', 'Microsoft']
// //         },
// //         {
// //             id: 4,
// //             type: 'text',
// //             difficulty: 'medium',
// //             question: 'Write a function to reverse a linked list. Explain your approach and analyze its time complexity.',
// //             tags: ['Data Structures', 'Linked List', 'Meta', 'Algorithms']
// //         },
// //         {
// //             id: 5,
// //             type: 'mcq',
// //             difficulty: 'easy',
// //             question: 'Which HTTP method is idempotent and safe?',
// //             options: ['POST', 'GET', 'PUT', 'DELETE'],
// //             tags: ['Backend', 'HTTP', 'REST API']
// //         }
// //     ];

// //     const totalQuestions = questions.length;
// //     const progress = ((currentQuestion + 1) / totalQuestions) * 100;

// //     // Timer countdown
// //     useEffect(() => {
// //         const timer = setInterval(() => {
// //             setTimeLeft(prev => {
// //                 if (prev <= 0) {
// //                     clearInterval(timer);
// //                     return 0;
// //                 }
// //                 return prev - 1;
// //             });
// //         }, 1000);

// //         return () => clearInterval(timer);
// //     }, []);

// //     // Timer color based on time left
// //     const getTimerColor = () => {
// //         const percentage = (timeLeft / 600) * 100;
// //         if (percentage > 50) return 'text-green-500';
// //         if (percentage > 20) return 'text-yellow-500';
// //         return 'text-red-500';
// //     };

// //     const getTimerStroke = () => {
// //         const percentage = (timeLeft / 600) * 100;
// //         if (percentage > 50) return '#10b981';
// //         if (percentage > 20) return '#eab308';
// //         return '#ef4444';
// //     };

// //     const formatTime = (seconds) => {
// //         const mins = Math.floor(seconds / 60);
// //         const secs = seconds % 60;
// //         return `${mins}:${secs.toString().padStart(2, '0')}`;
// //     };

// //     // Circular progress for timer
// //     const radius = 36;
// //     const circumference = 2 * Math.PI * radius;
// //     const strokeDashoffset = circumference - (timeLeft / 600) * circumference;

// //     const currentQ = questions[currentQuestion];

// //     const handleNext = () => {
// //         setDirection('forward');
// //         setCurrentQuestion(currentQuestion + 1);

// //     };

// //     const handlePrevious = () => {
// //         if (currentQuestion > 0) {
// //             setDirection('backward');
// //             setCurrentQuestion(currentQuestion - 1);
// //         }
// //     };

// //     const handleSkip = () => {
// //         handleNext();
// //     };

// //     const toggleMarkForReview = () => {
// //         const newMarked = new Set(markedForReview);
// //         if (newMarked.has(currentQ.id)) {
// //             newMarked.delete(currentQ.id);
// //         } else {
// //             newMarked.add(currentQ.id);
// //         }
// //         setMarkedForReview(newMarked);
// //     };

// //     const handleMCQSelect = (option) => {
// //         setAnswers({ ...answers, [currentQ.id]: option });
// //     };

// //     const handleTextAnswer = (text) => {
// //         setAnswers({ ...answers, [currentQ.id]: text });
// //     };

// //     const getDifficultyColor = (difficulty) => {
// //         switch (difficulty) {
// //             case 'easy': return 'bg-green-100 text-green-700 border-green-300';
// //             case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
// //             case 'hard': return 'bg-red-100 text-red-700 border-red-300';
// //             default: return 'bg-gray-100 text-gray-700 border-gray-300';
// //         }
// //     };

// //     const getDifficultyIcon = (difficulty) => {
// //         switch (difficulty) {
// //             case 'easy': return <Circle className="w-4 h-4" />;
// //             case 'medium': return <AlertCircle className="w-4 h-4" />;
// //             case 'hard': return <Award className="w-4 h-4" />;
// //             default: return <Circle className="w-4 h-4" />;
// //         }
// //     };

// //     const isMarked = markedForReview.has(currentQ.id);
// //     const currentAnswer = answers[currentQ.id];

// //     return (
// //         <>
// //             {/* Main Content */}
// //             <div className="flex-1 overflow-y-auto pb-32 md:pb-24">
// //                 <div className="max-w-6xl mx-auto px-4 py-8">
// //                     {/* Question Card - No animation on this div */}
// //                     <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200">
// //                         {/* Static Header with Timer and Progress */}
// //                         <div className="max-w-6xl mx-auto px-4 py-4 mb-6">
// //                             <div className="flex items-center justify-between mb-3">
// //                                 <div className="flex items-center gap-4">
// //                                     <h1 className="text-xl md:text-2xl font-bold text-gray-800">Mock Interview</h1>
// //                                     <div className="hidden md:block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
// //                                         Question {currentQuestion + 1} of {totalQuestions}
// //                                     </div>
// //                                 </div>

// //                                 {/* Timer */}
// //                                 <div className="flex items-center gap-3">
// //                                     <div className="relative w-20 h-20">
// //                                         <svg className="transform -rotate-90 w-20 h-20">
// //                                             <circle
// //                                                 cx="40"
// //                                                 cy="40"
// //                                                 r={radius}
// //                                                 stroke="#e5e7eb"
// //                                                 strokeWidth="6"
// //                                                 fill="transparent"
// //                                             />
// //                                             <circle
// //                                                 cx="40"
// //                                                 cy="40"
// //                                                 r={radius}
// //                                                 stroke={getTimerStroke()}
// //                                                 strokeWidth="6"
// //                                                 fill="transparent"
// //                                                 strokeDasharray={circumference}
// //                                                 strokeDashoffset={strokeDashoffset}
// //                                                 strokeLinecap="round"
// //                                                 className="transition-all duration-1000"
// //                                             />
// //                                         </svg>
// //                                         <div className="absolute inset-0 flex flex-col items-center justify-center">
// //                                             <Clock className={`w-4 h-4 ${getTimerColor()}`} />
// //                                             <span className={`text-sm font-bold ${getTimerColor()}`}>
// //                                                 {formatTime(timeLeft)}
// //                                             </span>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Progress Bar */}
// //                             <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
// //                                 <div
// //                                     className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
// //                                     style={{ width: `${progress}%` }}
// //                                 ></div>
// //                             </div>

// //                             {/* Mobile Question Counter */}
// //                             <div className="md:hidden mt-3 text-center">
// //                                 <span className="text-sm font-semibold text-gray-600">
// //                                     Question {currentQuestion + 1} of {totalQuestions}
// //                                 </span>
// //                             </div>
// //                         </div>

// //                         {/* Animated Question Content Section */}
// //                         <div
// //                             key={currentQ.id}
// //                             className={`animate-${direction === 'forward' ? 'slide-left' : 'slide-right'}`}
// //                         >
// //                             {/* Difficulty & Tags */}
// //                             <div className="flex flex-wrap items-center gap-3 mb-6">
// //                                 <div
// //                                     className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 font-semibold text-sm ${getDifficultyColor(
// //                                         currentQ.difficulty
// //                                     )}`}
// //                                 >
// //                                     {getDifficultyIcon(currentQ.difficulty)}
// //                                     <span className="capitalize">{currentQ.difficulty}</span>
// //                                 </div>
// //                                 {currentQ.tags.map((tag, idx) => (
// //                                     <span
// //                                         key={idx}
// //                                         className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
// //                                     >
// //                                         {tag}
// //                                     </span>
// //                                 ))}
// //                             </div>

// //                             {/* Question Text */}
// //                             <div className="mb-8">
// //                                 <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
// //                                     {currentQ.question}
// //                                 </h2>
// //                             </div>

// //                             {/* Answer Section */}
// //                             {currentQ.type === 'mcq' ? (
// //                                 <div className="space-y-4 mb-8">
// //                                     {currentQ.options.map((option, idx) => {
// //                                         const isSelected = currentAnswer === option;
// //                                         return (
// //                                             <button
// //                                                 key={idx}
// //                                                 onClick={() => handleMCQSelect(option)}
// //                                                 className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${isSelected
// //                                                     ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
// //                                                     : 'border-gray-200 bg-white hover:border-blue-300'
// //                                                     }`}
// //                                             >
// //                                                 <div className="flex items-center gap-4">
// //                                                     <div
// //                                                         className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected
// //                                                             ? 'border-blue-500 bg-blue-500'
// //                                                             : 'border-gray-300'
// //                                                             }`}
// //                                                     >
// //                                                         {isSelected && <Check className="w-5 h-5 text-white" />}
// //                                                     </div>
// //                                                     <span
// //                                                         className={`text-lg font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'
// //                                                             }`}
// //                                                     >
// //                                                         {option}
// //                                                     </span>
// //                                                 </div>
// //                                             </button>
// //                                         );
// //                                     })}
// //                                 </div>
// //                             ) : (
// //                                 <div className="relative mb-8">
// //                                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                                         Your Answer
// //                                     </label>
// //                                     <textarea
// //                                         value={currentAnswer || ''}
// //                                         onChange={(e) => handleTextAnswer(e.target.value)}
// //                                         placeholder="Type your answer here..."
// //                                         rows="8"
// //                                         className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-gray-700 text-lg resize-none"
// //                                     />
// //                                     <div className="flex items-center justify-between mt-2">
// //                                         <span className="text-sm text-gray-500">
// //                                             {(currentAnswer || '').length} characters
// //                                         </span>
// //                                         {(currentAnswer || '').length > 0 && (
// //                                             <span className="text-sm text-green-600 font-medium">✓ Answer saved</span>
// //                                         )}
// //                                     </div>
// //                                 </div>
// //                             )}
// //                         </div>

// //                         {/* Static Navigation Controls */}
// //                         <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-gray-200">
// //                             {/* Previous */}
// //                             <button
// //                                 onClick={handlePrevious}
// //                                 disabled={currentQuestion === 0}
// //                                 className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${currentQuestion === 0
// //                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
// //                                     : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
// //                                     }`}
// //                             >
// //                                 <ChevronLeft className="w-5 h-5" /> Previous
// //                             </button>

// //                             {/* Mark for Review */}
// //                             <button
// //                                 onClick={toggleMarkForReview}
// //                                 className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${isMarked
// //                                     ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
// //                                     : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-400'
// //                                     }`}
// //                             >
// //                                 {isMarked ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
// //                                 {isMarked ? 'Marked' : 'Mark'}
// //                             </button>

// //                             {/* Skip */}
// //                             <button
// //                                 onClick={handleSkip}
// //                                 disabled={currentQuestion === totalQuestions - 1}
// //                                 className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${currentQuestion === totalQuestions - 1
// //                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
// //                                     : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
// //                                     }`}
// //                             >
// //                                 <SkipForward className="w-5 h-5" /> Skip
// //                             </button>

// //                             {/* Next / Submit */}
// //                             <button
// //                                 onClick={() => {
// //                                     if (currentQuestion === totalQuestions - 1) {
// //                                         // Call the onComplete prop when submitting
// //                                         navigate('/setup-results');
// //                                     } else {
// //                                         handleNext();
// //                                     }
// //                                 }}
// //                                 className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${currentQuestion === totalQuestions - 1
// //                                     ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl'
// //                                     : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
// //                                     }`}
// //                             >
// //                                 {currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}
// //                                 {currentQuestion === totalQuestions - 1 ? (
// //                                     <Check className="w-5 h-5" />
// //                                 ) : (
// //                                     <ArrowRight className="w-5 h-5" />
// //                                 )}
// //                             </button>

// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             <style jsx>{`
// //         @keyframes slide-left {
// //           from {
// //             opacity: 0;
// //             transform: translateX(50px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateX(0);
// //           }
// //         }
// //         @keyframes slide-right {
// //           from {
// //             opacity: 0;
// //             transform: translateX(-50px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateX(0);
// //           }
// //         }
// //         .animate-slide-left {
// //           animation: slide-left 0.4s ease-out;
// //         }
// //         .animate-slide-right {
// //           animation: slide-right 0.4s ease-out;
// //         }
// //         .hover:scale-102:hover {
// //           transform: scale(1.02);
// //         }
// //       `}</style>
// //         </>
// //     );
// // };

// // export default MockSessionPlayer;


// import { useState, useEffect } from 'react';
// import {
//     ChevronRight, ChevronLeft, Flag, Check, Circle, AlertCircle,
//     Clock, Award, BookmarkPlus, BookmarkCheck, ArrowRight, SkipForward
// } from 'lucide-react';


// const MockSessionPlayer = () => {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [answers, setAnswers] = useState({});
//     const [markedForReview, setMarkedForReview] = useState(new Set());
//     const [timeLeft, setTimeLeft] = useState(600);
//     const [direction, setDirection] = useState('forward');
//     const [loading, setLoading] = useState(true);

//     // Load questions from JSON
//     useEffect(() => {
//         const mockQuestions = [
//             {
//                 id: 1,
//                 type: 'mcq',
//                 difficulty: 'easy',
//                 question: 'What is the time complexity of accessing an element in an array by index?',
//                 options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
//                 correctAnswer: 'O(1)',
//                 tags: ['Data Structures', 'Arrays', 'Google']
//             },
//             {
//                 id: 2,
//                 type: 'mcq',
//                 difficulty: 'medium',
//                 question: 'Which of the following is true about REST APIs?',
//                 options: ['REST requires stateful connections', 'REST is stateless and uses HTTP methods', 'REST can only use POST requests', 'REST requires real-time updates'],
//                 correctAnswer: 'REST is stateless and uses HTTP methods',
//                 tags: ['Backend', 'APIs', 'Amazon', 'System Design']
//             },
//             {
//                 id: 3,
//                 type: 'mcq',
//                 difficulty: 'hard',
//                 question: 'In a distributed system, which consistency model guarantees that all nodes see the same data at the same time?',
//                 options: ['Eventual Consistency', 'Strong Consistency', 'Causal Consistency', 'Sequential Consistency'],
//                 correctAnswer: 'Strong Consistency',
//                 tags: ['System Design', 'Distributed Systems', 'Microsoft']
//             },
//             {
//                 id: 4,
//                 type: 'mcq',
//                 difficulty: 'medium',
//                 question: 'What is the time complexity of searching for an element in a balanced binary search tree?',
//                 options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
//                 correctAnswer: 'O(log n)',
//                 tags: ['Data Structures', 'Binary Tree', 'Meta', 'Algorithms']
//             },
//             {
//                 id: 5,
//                 type: 'mcq',
//                 difficulty: 'easy',
//                 question: 'Which HTTP method is idempotent and safe?',
//                 options: ['POST', 'GET', 'PUT', 'DELETE'],
//                 correctAnswer: 'GET',
//                 tags: ['Backend', 'HTTP', 'REST API']
//             }
//         ];

//         setQuestions(mockQuestions);
//         setLoading(false);
//     }, []);

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
//         const submissionData = questions.map(q => {
//             const userAnswer = answers[q.id] || null;
//             const isCorrect = userAnswer ? verifyAnswer(q.id, userAnswer) : false;

//             return {
//                 question_id: q.id,
//                 question: q.question,
//                 userAnswer: userAnswer,
//                 correctAnswer: q.correctAnswer,
//                 isCorrect: isCorrect,
//                 marked: markedForReview.has(q.id)
//             };
//         });

//         const totalCorrect = submissionData.filter(item => item.isCorrect).length;
//         const score = ((totalCorrect / totalQuestions) * 100).toFixed(2);

//         console.log('=== MOCK INTERVIEW SUBMISSION ===');
//         console.log('Total Questions:', totalQuestions);
//         console.log('Correct Answers:', totalCorrect);
//         console.log('Score:', `${score}%`);
//         console.log('\nDetailed Results:');
//         console.table(submissionData);

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
//         @keyframes slide-left {
//           from {
//             opacity: 0;
//             transform: translateX(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         @keyframes slide-right {
//           from {
//             opacity: 0;
//             transform: translateX(-50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         .animate-slide-left {
//           animation: slide-left 0.4s ease-out;
//         }
//         .animate-slide-right {
//           animation: slide-right 0.4s ease-out;
//         }
//         .hover:scale-102:hover {
//           transform: scale(1.02);
//         }
//       `}</style>
//         </>
//     );
// };

// export default MockSessionPlayer;


import { useState, useEffect } from 'react';
import {
    ChevronRight, ChevronLeft, Flag, Check, Circle, AlertCircle,
    Clock, Award, BookmarkPlus, BookmarkCheck, ArrowRight, SkipForward
} from 'lucide-react';

const MockSessionPlayer = ({ onComplete, onDataSubmit }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(600);
    const [direction, setDirection] = useState('forward');
    const [loading, setLoading] = useState(true);

    // Load questions from JSON
    useEffect(() => {
        const mockQuestions = [
            {
                id: 1,
                type: 'mcq',
                difficulty: 'easy',
                question: 'What is the time complexity of accessing an element in an array by index?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correctAnswer: 'O(1)',
                tags: ['Data Structures', 'Arrays', 'Google']
            },
            {
                id: 2,
                type: 'mcq',
                difficulty: 'medium',
                question: 'Which of the following is true about REST APIs?',
                options: ['REST requires stateful connections', 'REST is stateless and uses HTTP methods', 'REST can only use POST requests', 'REST requires real-time updates'],
                correctAnswer: 'REST is stateless and uses HTTP methods',
                tags: ['Backend', 'APIs', 'Amazon', 'System Design']
            },
            {
                id: 3,
                type: 'mcq',
                difficulty: 'hard',
                question: 'In a distributed system, which consistency model guarantees that all nodes see the same data at the same time?',
                options: ['Eventual Consistency', 'Strong Consistency', 'Causal Consistency', 'Sequential Consistency'],
                correctAnswer: 'Strong Consistency',
                tags: ['System Design', 'Distributed Systems', 'Microsoft']
            },
            {
                id: 4,
                type: 'mcq',
                difficulty: 'medium',
                question: 'What is the time complexity of searching for an element in a balanced binary search tree?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correctAnswer: 'O(log n)',
                tags: ['Data Structures', 'Binary Tree', 'Meta', 'Algorithms']
            },
            {
                id: 5,
                type: 'mcq',
                difficulty: 'easy',
                question: 'Which HTTP method is idempotent and safe?',
                options: ['POST', 'GET', 'PUT', 'DELETE'],
                correctAnswer: 'GET',
                tags: ['Backend', 'HTTP', 'REST API']
            }
        ];

        setQuestions(mockQuestions);
        setLoading(false);
    }, []);

    // Timer countdown
    useEffect(() => {
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
    }, []);

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
        setAnswers({ ...answers, [currentQ.id]: option });
    };

    // Verify answer function
    const verifyAnswer = (questionId, userAnswer) => {
        const question = questions.find(q => q.id === questionId);
        if (!question) return false;
        return question.correctAnswer === userAnswer;
    };

    const handleSubmit = () => {
        // Calculate time taken (10 minutes - time left)
        const timeTaken = 600 - timeLeft;

        // Prepare detailed results for each question
        const submissionData = questions.map(q => {
            const userAnswer = answers[q.id] || null;
            const isCorrect = userAnswer ? verifyAnswer(q.id, userAnswer) : false;

            return {
                question_id: q.id,
                question: q.question,
                difficulty: q.difficulty,
                tags: q.tags,
                userAnswer: userAnswer,
                correctAnswer: q.correctAnswer,
                isCorrect: isCorrect,
                marked: markedForReview.has(q.id)
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
        if (newMarked.has(currentQ.id)) {
            newMarked.delete(currentQ.id);
        } else {
            newMarked.add(currentQ.id);
        }
        setMarkedForReview(newMarked);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-700 border-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'hard': return 'bg-red-100 text-red-700 border-red-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty) {
            case 'easy': return <Circle className="w-4 h-4" />;
            case 'medium': return <AlertCircle className="w-4 h-4" />;
            case 'hard': return <Award className="w-4 h-4" />;
            default: return <Circle className="w-4 h-4" />;
        }
    };

    // Show loading state
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading questions...</div>;
    }

    const currentQ = questions[currentQuestion];
    const isMarked = markedForReview.has(currentQ.id);
    const currentAnswer = answers[currentQ.id];

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

                        <div key={currentQ.id} className={`animate-${direction === 'forward' ? 'slide-left' : 'slide-right'}`}>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <div
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 font-semibold text-sm ${getDifficultyColor(
                                        currentQ.difficulty
                                    )}`}
                                >
                                    {getDifficultyIcon(currentQ.difficulty)}
                                    <span className="capitalize">{currentQ.difficulty}</span>
                                </div>
                                {currentQ.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
                                    {currentQ.question}
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