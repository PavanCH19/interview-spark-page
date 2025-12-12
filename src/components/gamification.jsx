import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Brain, Code, Calendar, Star, Award, Zap, Target, Loader, BookOpen, Flame, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

export default function LearningDashboard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(error)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                const response = await axios.get('http://localhost:3000/api/gamification/advanced', {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                const data = await response.data;
                console.log("⚠️⚠️", data)
                setUserData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setUserData({
                    meta: {
                        firstSessionAt: null,
                        lastSessionAt: null,
                        daysActive: 0,
                        daysSinceFirstSession: 0
                    },
                    overall: {
                        totalSessions: 0,
                        totalQuestions: 0,
                        totalStrongSkills: 0,
                        totalWeakSkills: 0,
                        domainCount: 0,
                        skillDiversity: 0
                    },
                    domainMastery: {
                        ai_ml: 0,
                        web_development: 0
                    },
                    scores: {
                        XP: 0,
                        level: 0,
                        domainMasteryOverall: 0,
                        skillGapIndex: 0,
                        consistencyScore: 0,
                        engagementScore: 0,
                        accuracyScore: 0,
                        growthScore: 0,
                        difficultyProgression: 0,
                        failureRecoveryRatio: 0,
                        learningPathCoverage: 0
                    },
                    badges: []
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatBadges = (badges) => {
        if (!badges || badges.length === 0) return [];

        const badgeIcons = {
            'First Step': '🎖️',
            'Curious Mind': '🧠',
            'Multi-Domain Explorer': '🌐',
            'Strong Skill Profile': '📈',
            'Multi-Skill Expert': '📚',
            'Active Participant': '⚡',
            'Code Attempted': '💻',
            'Voice Attempted': '🎤',
            'Consistent Learner': '📅',
            'Level 2 Achiever': '🚀'
        };

        return badges.map(badge => {
            const name = typeof badge === 'string' ? badge : badge.name || badge;
            return {
                icon: badgeIcons[name] || '🏆',
                name: name
            };
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading your learning data...</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg">No data available</p>
                </div>
            </div>
        );
    }

    const formattedBadges = formatBadges(userData.badges);

    // Prepare chart data
    const skillData = [
        {
            subject: 'Strong Skills',
            value: userData.overall?.totalStrongSkills || 0,
            fullMark: 10,
        },
        {
            subject: 'Engagement',
            value: userData.scores?.engagementScore || 0,
            fullMark: 10,
        },
        {
            subject: 'Consistency',
            value: (userData.scores?.consistencyScore || 0) * 10,
            fullMark: 10,
        },
        {
            subject: 'Mastery',
            value: (userData.scores?.domainMasteryOverall || 0) * 5,
            fullMark: 10,
        },
        {
            subject: 'Diversity',
            value: (userData.overall?.skillDiversity || 0) / 3,
            fullMark: 10,
        },
    ];

    const domainData = [
        { name: 'AI & ML', mastery: userData.domainMastery?.ai_ml || 0 },
        { name: 'Web Dev', mastery: userData.domainMastery?.web_development || 0 },
    ];

    const progressData = [
        { name: 'Sessions', value: userData.overall?.totalSessions || 0 },
        { name: 'Questions', value: userData.overall?.totalQuestions || 0 },
        { name: 'Strong Skills', value: userData.overall?.totalStrongSkills || 0 },
        { name: 'Weak Skills', value: userData.overall?.totalWeakSkills || 0 },
    ];

    const pieData = [
        { name: 'Strong Skills', value: userData.overall?.totalStrongSkills || 0 },
        { name: 'Weak Skills', value: userData.overall?.totalWeakSkills || 0 },
    ];

    const COLORS = ['#10b981', '#f59e0b', '#8b5cf6', '#3b82f6'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                <Trophy className="w-10 h-10 text-purple-500" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Learning Analytics</h1>
                                <p className="text-purple-100 text-lg">Your personalized progress dashboard</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-yellow-300" />
                                <div>
                                    <div className="text-black font-bold text-2xl">{userData.scores?.level || 0}</div>
                                    <div className="text-purple-900 text-xs">Level</div>
                                </div>
                            </div>
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-3">
                                <Star className="w-6 h-6 text-yellow-300" />
                                <div>
                                    <div className="text-black font-bold text-2xl">{userData.scores?.XP || 0}</div>
                                    <div className="text-purple-900 text-xs">XP Points</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100 hover:shadow-xl transition-all">
                        <Calendar className="w-8 h-8 text-blue-500 mb-3" />
                        <div className="text-3xl font-bold text-gray-800 mb-1">{userData.meta?.daysActive || 0}</div>
                        <div className="text-gray-600 text-sm font-medium">Days Active</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 hover:shadow-xl transition-all">
                        <Brain className="w-8 h-8 text-purple-500 mb-3" />
                        <div className="text-3xl font-bold text-gray-800 mb-1">{userData.overall?.totalQuestions || 0}</div>
                        <div className="text-gray-600 text-sm font-medium">Questions</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100 hover:shadow-xl transition-all">
                        <Target className="w-8 h-8 text-green-500 mb-3" />
                        <div className="text-3xl font-bold text-gray-800 mb-1">{userData.overall?.totalStrongSkills || 0}</div>
                        <div className="text-gray-600 text-sm font-medium">Strong Skills</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100 hover:shadow-xl transition-all">
                        <Flame className="w-8 h-8 text-orange-500 mb-3" />
                        <div className="text-3xl font-bold text-gray-800 mb-1">{userData.scores?.engagementScore || 0}</div>
                        <div className="text-gray-600 text-sm font-medium">Engagement</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Radar Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-purple-500" />
                            Skills Radar
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={skillData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#6b7280' }} />
                                <Radar name="Your Skills" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #e5e7eb', borderRadius: '12px' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-green-500" />
                            Activity Overview
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={progressData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#6b7280' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #e5e7eb', borderRadius: '12px' }} />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Domain Mastery */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Code className="w-6 h-6 text-blue-500" />
                            Domain Mastery
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={domainData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis type="number" tick={{ fill: '#6b7280' }} />
                                <YAxis dataKey="name" type="category" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #e5e7eb', borderRadius: '12px' }} />
                                <Bar dataKey="mastery" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-pink-500" />
                            Skills Distribution
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #e5e7eb', borderRadius: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Award className="w-6 h-6 text-yellow-500" />
                        Your Achievements ({formattedBadges.length})
                    </h2>
                    {formattedBadges.length > 0 ? (
                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                            {formattedBadges.map((badge, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 shadow-md border-2 border-purple-100 hover:border-yellow-400 transition-all hover:scale-110 transform duration-300 text-center group"
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                                        {badge.icon}
                                    </div>
                                    <div className="text-gray-700 font-semibold text-xs leading-tight">{badge.name}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No badges earned yet. Keep learning to unlock achievements!</p>
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <div className="text-gray-500 text-xs mb-1">First Session</div>
                        <div className="text-gray-800 font-bold text-sm">
                            {userData.meta?.firstSessionAt
                                ? new Date(userData.meta.firstSessionAt).toLocaleDateString()
                                : 'N/A'}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <div className="text-gray-500 text-xs mb-1">Last Active</div>
                        <div className="text-gray-800 font-bold text-sm">
                            {userData.meta?.lastSessionAt
                                ? new Date(userData.meta.lastSessionAt).toLocaleDateString()
                                : 'N/A'}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <div className="text-gray-500 text-xs mb-1">Skill Gap Index</div>
                        <div className="text-gray-800 font-bold text-sm">{userData.scores?.skillGapIndex || 0}</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <div className="text-gray-500 text-xs mb-1">Learning Path Coverage</div>
                        <div className="text-gray-800 font-bold text-sm">{userData.scores?.learningPathCoverage || 0}%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}