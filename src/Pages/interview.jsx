import React, { useState, useEffect } from 'react';
import { Clock, Brain, Target, TrendingUp, ChevronRight, Lightbulb, RotateCcw, CheckCircle, XCircle, Calendar, Award } from 'lucide-react';

// Static Sample Data
const SAMPLE_QUESTIONS = [
    {
        id: 1,
        type: 'mcq',
        topic: 'JavaScript',
        difficulty: 'Medium',
        question: 'What is the output of: console.log(typeof null)?',
        options: ['object', 'null', 'undefined', 'number'],
        correctAnswer: 'object',
        hint: 'This is a known JavaScript quirk from the early days of the language.'
    },
    {
        id: 2,
        type: 'text',
        topic: 'React',
        difficulty: 'Easy',
        question: 'Explain the difference between state and props in React.',
        hint: 'Think about data flow and mutability.',
        maxChars: 500
    },
    {
        id: 3,
        type: 'coding',
        topic: 'Algorithms',
        difficulty: 'Hard',
        question: 'Write a function to reverse a linked list.',
        hint: 'Consider using iterative approach with three pointers.',
        starterCode: '// Write your solution here\nfunction reverseLinkedList(head) {\n  \n}'
    },
    {
        id: 4,
        type: 'mcq',
        topic: 'CSS',
        difficulty: 'Easy',
        question: 'Which CSS property is used to create space between element content and border?',
        options: ['margin', 'padding', 'border-spacing', 'gap'],
        correctAnswer: 'padding',
        hint: 'Think about the CSS box model layers.'
    },
    {
        id: 5,
        type: 'text',
        topic: 'System Design',
        difficulty: 'Hard',
        question: 'How would you design a URL shortener service like bit.ly?',
        hint: 'Consider hashing algorithms, database design, and scalability.',
        maxChars: 1000
    }
];

const SAMPLE_SESSIONS = [
    {
        id: 'session-1',
        timestamp: '2025-10-04 14:30',
        domain: 'Full Stack Development',
        score: 85,
        totalQuestions: 10,
        completionPercent: 100,
        accuracy: 85,
        topics: ['JavaScript', 'React', 'Node.js', 'Databases']
    },
    {
        id: 'session-2',
        timestamp: '2025-10-02 10:15',
        domain: 'Frontend Development',
        score: 70,
        totalQuestions: 8,
        completionPercent: 100,
        accuracy: 70,
        topics: ['HTML', 'CSS', 'JavaScript', 'React']
    },
    {
        id: 'session-3',
        timestamp: '2025-09-28 16:45',
        domain: 'Data Structures',
        score: 60,
        totalQuestions: 5,
        completionPercent: 60,
        accuracy: 50,
        topics: ['Arrays', 'Linked Lists', 'Trees']
    }
];

// Answer Input Component
const AnswerInput = ({ question, answer, onChange }) => {
    const [charCount, setCharCount] = useState(0);

    const handleTextChange = (e) => {
        const value = e.target.value;
        setCharCount(value.length);
        onChange(value);
    };

    if (question.type === 'text') {
        return (
            <div className="space-y-2">
                <textarea
                    value={answer}
                    onChange={handleTextChange}
                    placeholder="Type your answer here..."
                    className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                    maxLength={question.maxChars}
                    aria-label="Answer input"
                />
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Character count: {charCount}</span>
                    {question.maxChars && <span>Max: {question.maxChars}</span>}
                </div>
            </div>
        );
    }

    if (question.type === 'mcq') {
        return (
            <div className="space-y-3">
                {question.options.map((option, idx) => (
                    <label
                        key={idx}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${answer === option
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                    >
                        <input
                            type="radio"
                            name="mcq-answer"
                            value={option}
                            checked={answer === option}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-5 h-5 text-blue-500 focus:ring-2 focus:ring-blue-400"
                            aria-label={`Option ${idx + 1}: ${option}`}
                        />
                        <span className="ml-3 text-gray-700 font-medium">{option}</span>
                    </label>
                ))}
            </div>
        );
    }

    if (question.type === 'coding') {
        return (
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                    <span className="text-sm text-gray-300 font-mono">code-editor.js</span>
                    <span className="text-xs text-gray-400">JavaScript</span>
                </div>
                <textarea
                    value={answer || question.starterCode}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-64 p-4 bg-gray-900 text-green-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    placeholder="// Write your code here..."
                    aria-label="Code editor"
                />
            </div>
        );
    }

    return null;
};

// Question Card Component
const QuestionCard = ({ question, answer, onChange, showHint }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            {question.topic}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold capitalize">
                            {question.type}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{question.question}</h2>
                </div>
            </div>

            <AnswerInput question={question} answer={answer} onChange={onChange} />

            {showHint && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 rounded-lg animate-fade-in">
                    <div className="flex items-start gap-3">
                        <Lightbulb className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Hint</h4>
                            <p className="text-gray-700">{question.hint}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Action Buttons Component
const ActionButtons = ({ onNext, onRepeat, onHint, isLastQuestion, hintUsed }) => {
    return (
        <div className="flex gap-4 flex-wrap">
            <button
                onClick={onHint}
                disabled={hintUsed}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${hintUsed
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg active:scale-95'
                    }`}
                aria-label="Show hint"
            >
                <Lightbulb size={20} />
                {hintUsed ? 'Hint Used' : 'Get Hint'}
            </button>

            <button
                onClick={onRepeat}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 hover:shadow-lg transition-all duration-200 active:scale-95"
                aria-label="Repeat question"
            >
                <RotateCcw size={20} />
                Repeat
            </button>

            <button
                onClick={onNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-200 active:scale-95 ml-auto"
                aria-label={isLastQuestion ? 'Finish interview' : 'Next question'}
            >
                {isLastQuestion ? 'Finish' : 'Next Question'}
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

// Progress Tracker Component
const ProgressTracker = ({ currentQuestion, totalQuestions, accuracy, timeRemaining, topicsCovered, weakAreas }) => {
    const progress = ((currentQuestion) / totalQuestions) * 100;

    return (
        <div className="space-y-6">
            {/* Timer */}
            {timeRemaining && (
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Clock size={24} />
                            <span className="font-semibold">Time Remaining</span>
                        </div>
                    </div>
                    <div className="text-4xl font-bold">{timeRemaining}</div>
                </div>
            )}

            {/* Progress */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                    <Target size={24} className="text-blue-500" />
                    <h3 className="font-bold text-gray-800">Progress</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Questions</span>
                            <span className="font-semibold text-gray-800">{currentQuestion}/{totalQuestions}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Accuracy</div>
                            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Topics</div>
                            <div className="text-2xl font-bold text-blue-600">{topicsCovered}/{totalQuestions}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Topics Covered */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                    <Brain size={24} className="text-purple-500" />
                    <h3 className="font-bold text-gray-800">Topics Covered</h3>
                </div>
                <div className="space-y-2">
                    {['JavaScript', 'React', 'Algorithms', 'CSS', 'System Design'].slice(0, topicsCovered).map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-sm text-gray-700">{topic}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Weak Areas */}
            {weakAreas && weakAreas.length > 0 && (
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-lg border-l-4 border-red-400">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={24} className="text-red-500" />
                        <h3 className="font-bold text-gray-800">Focus Areas</h3>
                    </div>
                    <div className="space-y-2">
                        {weakAreas.map((area, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <XCircle size={16} className="text-red-500" />
                                <span className="text-sm text-gray-700">{area}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Session History Component
const SessionHistory = ({ sessions, onRetake, onClose }) => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [showRetryModal, setShowRetryModal] = useState(false);
    const [retryType, setRetryType] = useState(null);

    const handleRetry = (session, type) => {
        setSelectedSession(session);
        setRetryType(type);
        setShowRetryModal(true);
    };

    const confirmRetry = () => {
        onRetake(selectedSession, retryType);
        setShowRetryModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={onClose}
                        className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                    >
                        ← Back to Interview
                    </button>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Session History</h1>
                    <p className="text-gray-600">Review your past interview sessions and retry them</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  ">
                    {sessions.map((session) => (
                        <div key={session.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar size={20} className="text-blue-500" />
                                        <span className="text-sm text-gray-600">{session.timestamp}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{session.domain}</h3>
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <Award className="text-yellow-500" size={20} />
                                            <span className="text-lg font-semibold text-gray-700">Score: {session.score}%</span>
                                        </div>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-gray-600">{session.totalQuestions} Questions</span>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-gray-600">{session.completionPercent}% Complete</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-3xl font-bold ${session.score >= 80 ? 'text-green-600' : session.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {session.score}%
                                    </div>
                                    <div className="text-sm text-gray-500">Accuracy</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-sm text-gray-600 mb-2">Topics Covered:</div>
                                <div className="flex flex-wrap gap-2">
                                    {session.topics.map((topic, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4 pt-4 border-t">
                                <button
                                    onClick={() => handleRetry(session, 'full')}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
                                >
                                    <RotateCcw size={18} />
                                    Retake Full Interview
                                </button>
                                <button
                                    onClick={() => handleRetry(session, 'partial')}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all"
                                >
                                    <Target size={18} />
                                    Retry Weak Areas
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Retry Modal */}
            {showRetryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Retry</h3>
                        <p className="text-gray-600 mb-6">
                            {retryType === 'full'
                                ? 'Are you sure you want to retake the full interview? Your previous progress will be saved separately.'
                                : 'This will create a focused session on your weak areas. Ready to improve?'}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRetryModal(false)}
                                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRetry}
                                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Main Interview Session Component
const InterviewSessionUI = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showHint, setShowHint] = useState(false);
    const [hintsUsed, setHintsUsed] = useState({});
    const [timeRemaining, setTimeRemaining] = useState('45:00');
    const [showHistory, setShowHistory] = useState(false);
    const [accuracy] = useState(70);

    const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];
    const totalQuestions = SAMPLE_QUESTIONS.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                const [mins, secs] = prev.split(':').map(Number);
                const totalSecs = mins * 60 + secs - 1;
                if (totalSecs <= 0) return '00:00';
                return `${Math.floor(totalSecs / 60).toString().padStart(2, '0')}:${(totalSecs % 60).toString().padStart(2, '0')}`;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAnswerChange = (value) => {
        setAnswers({ ...answers, [currentQuestion.id]: value });
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowHint(false);
        } else {
            alert('Interview completed! Check your session history for results.');
            setShowHistory(true);
        }
    };

    const handleRepeat = () => {
        setAnswers({ ...answers, [currentQuestion.id]: '' });
        setShowHint(false);
    };

    const handleHint = () => {
        setShowHint(true);
        setHintsUsed({ ...hintsUsed, [currentQuestion.id]: true });
    };

    const handleRetake = (session, type) => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowHint(false);
        setHintsUsed({});
        setShowHistory(false);
        alert(`Starting ${type} retry for ${session.domain}`);
    };

    if (showHistory) {
        return <SessionHistory sessions={SAMPLE_SESSIONS} onRetake={handleRetake} onClose={() => setShowHistory(false)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Adaptive Interview Session</h1>
                        <p className="text-gray-600">Answer questions and track your progress in real-time</p>
                    </div>
                    <button
                        onClick={() => setShowHistory(true)}
                        className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all font-semibold text-gray-700"
                    >
                        View History
                    </button>
                </div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Panel - Question & Answer */}
                    <div className="lg:col-span-2 space-y-6">
                        <QuestionCard
                            question={currentQuestion}
                            answer={answers[currentQuestion.id] || ''}
                            onChange={handleAnswerChange}
                            showHint={showHint}
                        />

                        <ActionButtons
                            onNext={handleNext}
                            onRepeat={handleRepeat}
                            onHint={handleHint}
                            isLastQuestion={currentQuestionIndex === totalQuestions - 1}
                            hintUsed={hintsUsed[currentQuestion.id]}
                        />
                    </div>

                    {/* Right Panel - Progress Tracker */}
                    <div className="lg:col-span-1">
                        <ProgressTracker
                            currentQuestion={currentQuestionIndex + 1}
                            totalQuestions={totalQuestions}
                            accuracy={accuracy}
                            timeRemaining={timeRemaining}
                            topicsCovered={currentQuestionIndex + 1}
                            weakAreas={['Error Handling', 'Async Programming']}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default InterviewSessionUI;