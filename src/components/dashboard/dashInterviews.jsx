import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, BookOpen, TrendingUp, Award, Bell, Settings, Calendar, Target, Zap, ChevronRight, Play, RotateCcw, Download, Shield, Edit2, Save, X, CheckCircle, AlertCircle, Trophy, Flame, Star, Clock, MessageSquare, BarChart3, Brain, Menu, Home, LogOut, HelpCircle, GripVertical } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import RecentSession from '../sessions/recent_sessions';

const DashInterviews = ({ target_domains }) => {
    const navigate = useNavigate();
    const [showSession, setShowSession] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [preparationPaths, setPreparationPaths] = useState([
        { id: 1, displayName: 'AI/ML', endpoint: "ai_ml" },
        { id: 2, displayName: 'Web Development', endpoint: "web_development" },
        { id: 3, displayName: 'Data Science', endpoint: "data_science" },
    ]);

    // const domain_endpoint = [
    //     {
    //         domain : "Data Science",
    //         endpoint : 'data_science'
    //     }
    // ]

    function toSnakeCase(str) {
        if (!str) return "";
        return str.trim().toLowerCase().replace(/\s+/g, "_");
    }

    const [recentSessions, setRecentSessions] = useState([
        { id: 1, date: '2025-10-03', domain: 'React Development', score: 85, type: 'Technical', status: 'Pass' },
        { id: 2, date: '2025-10-01', domain: 'System Design', score: 72, type: 'Design', status: 'Pass' },
        { id: 3, date: '2025-09-28', domain: 'Behavioral', score: 88, type: 'Behavioral', status: 'Pass' },
        { id: 4, date: '2025-09-25', domain: 'SQL Queries', score: 65, type: 'Technical', status: 'Review' },
        { id: 5, date: '2025-09-22', domain: 'JavaScript Algorithms', score: 90, type: 'Technical', status: 'Pass' }
    ]);

    const handleViewDetails = (sessionId) => {
        // Find the session from the sessions array that matches the sessionId
        const session = sessions.find(s => s._id === sessionId);
        if (session) {
            setSelectedSession(session);
            setShowSession(true);
            console.log('Selected session:', session);
        } else {
            console.error('Session not found:', sessionId);
        }
    }

    useEffect(() => {
        console.log("😂😍😍")
        console.log(sessions)
        console.log(preparationPaths)
    }, [sessions, preparationPaths])

    useEffect(() => {
        const getSessions = async () => {
            const response = await axios.get('http://localhost:3000/api/interview/recent-sessions', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            if (response.status !== 200) {
                console.error('response failed')
            }
            else {
                console.log("sessions array")
                console.log(response.data.sessions)
                const sessions = response.data.sessions;
                setSessions(sessions);
                const sessionDataForUI = sessions.map((session) => {
                    return {
                        id: session._id,
                        date: session.completedAt.slice(0, 10),
                        domain: session.domain,
                        score: session.score,
                        type: session.session_type,
                        status: session.status
                    }
                })
                console.log("filtered data")
                console.log(sessionDataForUI)
                setRecentSessions(sessionDataForUI)
            }
        }

        getSessions();

        // sessions = []
        // target_domains = []
        console.log("📗📗target_domains", target_domains)
    }, [])

    useEffect(() => {
        const paths = target_domains.map((item, index) => {
            return {
                id: item.id ?? index,                         // fallback index
                displayName: item,                       // shown in UI
                endpoint: toSnakeCase(item)            // converted slug
            };
        });
        setPreparationPaths(paths)        
    }, [])

    return (
        <>
            <div className="space-y-6">
                {/* Start New Interview CTA */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 lg:p-10 text-white shadow-xl">
                    <h2 className="text-3xl font-bold mb-3">Ready for Your Next Challenge?</h2>
                    <p className="mb-8 text-indigo-100 text-lg">Start an adaptive AI-powered interview session tailored to your goals.</p>
                    <div className="flex flex-wrap gap-4">
                        {/* start interview button */}
                        <button className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl"
                            onClick={() => {
                                navigate('/setup', { state: { startFromStep: 1 } })
                            }}
                        >
                            <Play className="w-5 h-5" />
                            <span>Start with New Path</span>
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

                            {/* preparation paths displayes here | take interview for the domain */}
                            {/* target_domains */}
                            {preparationPaths.map((session) => (
                                <div
                                    key={session.id}
                                    className="h-full rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                                >
                                    {/* Content */}
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="text-base font-bold text-gray-900 truncate">
                                                {session.displayName}
                                            </h4>

                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Link className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow hover:shadow-lg hover:scale-[1.03] transition"
                                        to='/interview'
                                        state={{ domain: session.endpoint }}
                                    >
                                        <Play className="w-4 h-4" />
                                        Start Interview
                                    </Link>
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
                                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center space-x-1 transition-colors"
                                                onClick={() => handleViewDetails(session.id)}
                                            >
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
                {showSession && selectedSession && (
                    <RecentSession
                        setIsOpen={() => {
                            setShowSession(false);
                            setSelectedSession(null);
                        }}
                        isOpen={showSession}
                        session={selectedSession}
                    />
                )}
            </div>
        </>
    )
}

export default DashInterviews;