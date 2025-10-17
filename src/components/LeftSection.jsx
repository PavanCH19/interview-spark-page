
// components/LeftSection.jsx
import { CheckCircle } from 'lucide-react';

export function LeftSection() {
    return (
        <div className="flex-1 text-center lg:text-left">
            <div className="mb-6">
                <div className="inline-block p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Smart Interview<br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Preparation Platform
                </span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
                Master your interview skills with personalized practice sessions, real-time feedback, and AI-driven insights.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Personalized Sessions</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Real-time Feedback</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Track Progress</span>
                </div>
            </div>
        </div>
    );
}