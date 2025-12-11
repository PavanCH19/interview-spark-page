import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, BookOpen, TrendingUp, Award, Bell, Settings, Calendar, Target, Zap, ChevronRight, Play, RotateCcw, Download, Shield, Edit2, Save, X, CheckCircle, AlertCircle, Trophy, Flame, Star, Clock, MessageSquare, BarChart3, Brain, Menu, Home, LogOut, HelpCircle, GripVertical } from 'lucide-react';

const DashInterviews = () => {
    const navigate = useNavigate();
    const preparationPaths = [
        { id: 1, domain: 'AI/ML', company: 'Google', lastSessionScore: "85%", lastSession: '2 days ago', endpoint: "ai_ml", started: "12-6-2025" },
        { id: 2, domain: 'Web Development', company: 'Amazon', lastSessionScore: "85%", lastSession: '2 days ago', endpoint: "web_development", started: "12-6-2025" },
        { id: 3, domain: 'AI/ML', company: 'Google', lastSessionScore: "85%", lastSession: '2 days ago', endpoint: "ai_ml", started: "12-6-2025" },
    ];

    const recentSessions = [
        { id: 1, date: '2025-10-03', domain: 'React Development', score: 85, type: 'Technical', status: 'Pass' },
        { id: 2, date: '2025-10-01', domain: 'System Design', score: 72, type: 'Design', status: 'Pass' },
        { id: 3, date: '2025-09-28', domain: 'Behavioral', score: 88, type: 'Behavioral', status: 'Pass' },
        { id: 4, date: '2025-09-25', domain: 'SQL Queries', score: 65, type: 'Technical', status: 'Review' },
        { id: 5, date: '2025-09-22', domain: 'JavaScript Algorithms', score: 90, type: 'Technical', status: 'Pass' }
    ];
    return (
        <>
            <div className="space-y-6">
                {/* Start New Interview CTA */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 lg:p-10 text-white shadow-xl">
                    <h2 className="text-3xl font-bold mb-3">Ready for Your Next Challenge?</h2>
                    <p className="mb-8 text-indigo-100 text-lg">Start an adaptive AI-powered interview session tailored to your goals.</p>
                    <div className="flex flex-wrap gap-4">
                        {/* <select className="px-5 py-3 bg-white text-gray-900 rounded-xl font-semibold shadow-lg focus:ring-2 focus:ring-white focus:outline-none">
                                                    <option>Select Domain</option>
                                                    <option>Frontend Development</option>
                                                    <option>Backend Engineering</option>
                                                    <option>System Design</option>
                                                    <option>Behavioral</option>
                                                    <option>Data Structures & Algorithms</option>
                                                </select>
                                                <select className="px-5 py-3 bg-white text-gray-900 rounded-xl font-semibold shadow-lg focus:ring-2 focus:ring-white focus:outline-none">
                                                    <option>Select Company</option>
                                                    <option>Google</option>
                                                    <option>Amazon</option>
                                                    <option>Meta</option>
                                                    <option>Microsoft</option>
                                                    <option>Generic</option>
                                                </select> */}
                        <button className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl"
                            onClick={() => {
                                navigate('/interview')
                            }}
                        >
                            <Play className="w-5 h-5" />
                            <span>Start Interview</span>
                        </button>
                    </div>
                </div>

                {/* Ongoing Sessions */}
                {preparationPaths.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                            <div className="p-2 bg-amber-100 rounded-lg mr-3">
                                <Clock className="w-5 h-5 text-amber-600" />
                            </div>
                            Learning Paths
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">

                            {preparationPaths.map((session) => (
                                <div
                                    key={session.id}
                                    className="h-full rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                                >
                                    {/* Content */}
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="text-base font-bold text-gray-900 truncate">
                                                {session.domain}
                                            </h4>
                                            <p className="text-xs text-gray-600 font-medium truncate">
                                                {session.company} • Started {session.started}
                                            </p>
                                        </div>

                                        {/* Session Info */}
                                        <div className="bg-white/60 p-3 rounded-xl border border-amber-100 space-y-1.5">
                                            <p className="text-xs font-semibold text-gray-800">
                                                Last Session
                                            </p>

                                            <div className="flex justify-between text-xs text-gray-700">
                                                <span>Score</span>
                                                <span className="font-medium">{session.lastSessionScore}</span>
                                            </div>

                                            <div className="flex justify-between text-xs text-gray-700">
                                                <span>Date</span>
                                                <span className="font-medium">{session.lastSession}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow hover:shadow-lg hover:scale-[1.03] transition"
                                        onClick={() => {
                                            navigate("/interview")
                                        }}
                                    >
                                        <Play className="w-4 h-4" />
                                        Resume
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Sessions Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                        </div>
                        Recent Sessions
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Date</th>
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Domain</th>
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Type</th>
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Score</th>
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Status</th>
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSessions.map(session => (
                                    <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{session.date}</td>
                                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{session.domain}</td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{session.type}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${session.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                                                session.score >= 70 ? 'bg-blue-100 text-blue-800' :
                                                    'bg-amber-100 text-amber-800'
                                                }`}>
                                                {session.score}%
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${session.status === 'Pass' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                {session.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center space-x-1 transition-colors">
                                                <span>View Details</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashInterviews;