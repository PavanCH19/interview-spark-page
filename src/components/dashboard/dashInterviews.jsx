import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, BookOpen, TrendingUp, Award, Bell, Settings, Calendar, Target, Zap, ChevronRight, Play, RotateCcw, Download, Shield, Edit2, Save, X, CheckCircle, AlertCircle, Trophy, Flame, Star, Clock, MessageSquare, BarChart3, Brain, Menu, Home, LogOut, HelpCircle, GripVertical } from 'lucide-react';

const DashInterviews = () => {
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
                {ongoingSessions.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                            <div className="p-2 bg-amber-100 rounded-lg mr-3">
                                <Clock className="w-5 h-5 text-amber-600" />
                            </div>
                            Ongoing Sessions
                        </h3>
                        <div className="space-y-4">
                            {ongoingSessions.map(session => (
                                <div key={session.id} className="border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 text-lg mb-1">{session.domain}</h4>
                                        <p className="text-sm text-gray-600 font-medium">{session.company} · Started {session.started}</p>
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-gray-600 font-medium">Progress</span>
                                                <span className="font-bold text-amber-700">{session.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                                <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-500 shadow-sm" style={{ width: `${session.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg">
                                        <Play className="w-5 h-5" />
                                        <span>Resume</span>
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

export default DashInterviews