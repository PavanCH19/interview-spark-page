import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, BookOpen, TrendingUp, Award, Bell, Settings, Calendar, Target, Zap, ChevronRight, Play, RotateCcw, Download, Shield, Edit2, Save, X, CheckCircle, AlertCircle, Trophy, Flame, Star, Clock, MessageSquare, BarChart3, Brain, Menu, Home, LogOut, HelpCircle, GripVertical } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashInterviews from '../components/dashboard/dashInterviews';
import Overview from '../components/dashboard/overview';


// Zustand-like store using React hooks


const useStore = () => {
    const location = useLocation();
    const userData = location.state?.userData || {}; // Safe fallback

    const userProfile = userData?.user?.profile || {};
    const userEducation = userData?.user?.education || []; // corrected spelling

    const [user, setUser] = useState({
        name: userProfile?.name || "",
        email: userData?.user?.email || "",
        title: userProfile?.title || "Senior Software Engineer",
        experience: userProfile?.experience || "5 years",
        location: userProfile?.location || "",
        skills: userProfile?.skills || [
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "SQL",
            "System Design",
        ],
        education: userEducation[0]?.college || "BS Computer Science - Stanford University",
        careerPath: userProfile?.careerPath || "Software Engineering",
        suggestedPath: userProfile?.suggestedPath || "Technical Lead",
        level: userProfile?.level || 12,
        xp: userProfile?.xp || 2840,
        xpToNext: userProfile?.xpToNext || 3000,
        streak: userProfile?.streak || 7,
        badges: userProfile?.badges || ["Fast Learner", "SQL Master", "Interview Pro"],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(280);

    const saveProfile = () => {
        setUser(editedUser);
        setIsEditing(false);
    };

    const resetProfile = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    return {
        user,
        setUser,
        isEditing,
        setIsEditing,
        editedUser,
        setEditedUser,
        saveProfile,
        resetProfile,
        sidebarOpen,
        setSidebarOpen,
        sidebarWidth,
        setSidebarWidth,
    };
};


const performanceMetrics = {
    contentScores: { grammar: 82, relevance: 88, coherence: 85 },
    speechMetrics: { speechRate: 145, fillerWords: 12, pitchVariance: 65, clarity: 78 },
    feedback: {
        positive: 'Strong technical knowledge, clear explanations, good code structure awareness.',
        improvement: 'Work on system design scalability, reduce filler words, practice SQL optimization.',
        action: 'Complete 3 system design mock interviews, review SQL indexing strategies, record practice sessions.'
    }
};

const weeklyScores = [
    { week: 'Week 1', score: 65 },
    { week: 'Week 2', score: 70 },
    { week: 'Week 3', score: 75 },
    { week: 'Week 4', score: 78 }
];

const skillGrowth = [
    { month: 'Jul', technical: 65, behavioral: 70, design: 55 },
    { month: 'Aug', technical: 72, behavioral: 75, design: 62 },
    { month: 'Sep', technical: 78, behavioral: 82, design: 68 },
    { month: 'Oct', technical: 85, behavioral: 88, design: 72 }
];

const notifications = [
    { id: 1, type: 'warning', message: 'Your 7-day streak is at risk! Complete a session today.', priority: 'high' },
    { id: 2, type: 'info', message: 'New recommended path: Technical Lead - 87% fit', priority: 'medium' },
    { id: 3, type: 'success', message: 'You earned the "SQL Master" badge!', priority: 'low' }
];

// const suggestions = [
//     'Focus on SQL – 2 weak answers last week',
//     'Practice system design for FAANG interviews',
//     'Your behavioral scores are excellent – maintain momentum'
// ];

// const generateHeatmapData = () => {
//   const data = [];
//   const today = new Date();
//   for (let i = 90; i >= 0; i--) {
//     const date = new Date(today);
//     date.setDate(date.getDate() - i);
//     data.push({
//       date: date.toISOString().split('T')[0],
//       count: Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0
//     });
//   }
//   return data;
// };



const Dashboard = () => {
    //  setIsEditing, editedUser, setEditedUser, saveProfile, resetProfile, 
    const { user, setUser, isEditing, sidebarOpen, setSidebarOpen, sidebarWidth, setSidebarWidth } = useStore();
    const [activeTab, setActiveTab] = useState('overview');
    const [isResizing, setIsResizing] = useState(false);
    // heatmapData was removed because the heatmap UI is currently commented out
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const api = axios.create({
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        }
    })



    const navigationItems = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'interviews', label: 'Interviews', icon: Play },
        { id: 'progress', label: 'Progress', icon: TrendingUp },
        { id: 'insights', label: 'Insights', icon: BarChart3 }
    ];

    // Handle sidebar resizing
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;
            const newWidth = e.clientX;
            if (newWidth >= 200 && newWidth <= 400) {
                setSidebarWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing, setSidebarWidth]);

    const handleLogout = () => {
        if (!window.confirm("Are you sure to Logout?")) return
        localStorage.removeItem('token')
        console.log("logged out successfully")
        navigate('/auth');
    }

    //  name: userProfile?.name || "",
    //         email: userData?.user?.email || "",
    //         title: userProfile?.title || "Senior Software Engineer",
    //         experience: userProfile?.experience || "5 years",
    //         location: userProfile?.location || "",
    //         skills: userProfile?.skills || [
    //             "JavaScript",
    //             "React",
    //             "Node.js",
    //             "Python",
    //             "SQL",
    //             "System Design",
    //         ],
    //         education: userEducation[0]?.college || "BS Computer Science - Stanford University",
    //         careerPath: userProfile?.careerPath || "Software Engineering",
    //         suggestedPath: userProfile?.suggestedPath || "Technical Lead",
    //         level: userProfile?.level || 12,
    //         xp: userProfile?.xp || 2840,
    //         xpToNext: userProfile?.xpToNext || 3000,
    //         streak: userProfile?.streak || 7,
    //         badges: userProfile?.badges 

    useEffect(() => {
        const userDetails = async () => {
            let response = await api.get("http://localhost:3000/api/auth/getUserDetails")
            if (response.status === 200) {
                // console.log("========================")
                // console.log("below is the fetched data")
                // console.log(response.data.data)
                let data = response.data.data
                console.log("profile ; ", data.profile)
                setUser(prev => ({
                    ...prev,
                    name: data.profile?.name,
                    email: data.email,
                    location: data.profile?.location,
                    skills: data.skills,
                }))
            }
            else {
                console.error("Unable to fetch data")
            }
        }
        userDetails()
        // console.log('⚠️')
    }, [])

    const StatCard = ({ icon: Icon, label, value, trend, gradient }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                    {trend && (
                        <p className="text-sm font-medium text-emerald-600 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {trend}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className={`p-4 rounded-xl ${gradient}`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                )}
            </div>
        </div>
    );

    const RadialProgress = ({ value, label, color }) => (
        <div className="flex flex-col items-center">
            <div className="relative w-28 h-28">
                <svg className="transform -rotate-90 w-28 h-28">
                    <circle cx="56" cy="56" r="48" stroke="#f3f4f6" strokeWidth="10" fill="none" />
                    <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke={color}
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        strokeDashoffset={`${2 * Math.PI * 48 * (1 - value / 100)}`}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-3">{label}</p>
        </div>
    );

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
            {/* Sidebar */}
            {sidebarOpen && (
                <aside
                    ref={sidebarRef}
                    style={{ width: `${sidebarWidth}px`, minWidth: '200px', maxWidth: '400px' }}
                    className="flex-shrink-0 bg-white border-r-2 border-gray-300 shadow-2xl relative flex flex-col"
                >
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                                <Brain className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">InterviewAI</h1>
                                <p className="text-xs text-gray-500">Smart Preparation</p>
                            </div>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {(user.name || "").split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name || "User"}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-600">Level {user.level}</span>
                                <span className="text-xs font-bold text-indigo-600">{Math.round((user.xp / user.xpToNext) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: `${(user.xp / user.xpToNext) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-1">
                            {navigationItems.map(item => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* settings help and logout */}
                        <div className="mt-8 pt-6 border-t border-gray-200 space-y-1">
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors">
                                <Settings className="w-5 h-5" />
                                <span>Settings</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors">
                                <HelpCircle className="w-5 h-5" />
                                <span>Help</span>
                            </button>

                            {/* Logout button */}
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>

                    {/* Resize Handle */}
                    <div
                        onMouseDown={() => setIsResizing(true)}
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-indigo-400 bg-gray-300 transition-colors group"
                    >
                        <div className="absolute top-1/2 right-0 transform translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="w-4 h-4 text-indigo-600" />
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Menu className="w-6 h-6" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
                                    <p className="text-sm text-gray-500">Welcome back, {(user.name || "User").split(' ')[0]}!</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Bell className="w-6 h-6" />
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {/* Notifications Banner */}
                    {notifications.length > 0 && (
                        <div className="mb-6 space-y-3">
                            {notifications.slice(0, 2).map(notif => (
                                <div
                                    key={notif.id}
                                    className={`p-4 rounded-xl flex items-start space-x-3 shadow-sm border ${notif.type === 'warning'
                                        ? 'bg-amber-50 border-amber-200'
                                        : notif.type === 'success'
                                            ? 'bg-emerald-50 border-emerald-200'
                                            : 'bg-blue-50 border-blue-200'
                                        }`}
                                >
                                    {notif.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />}
                                    {notif.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />}
                                    {notif.type === 'info' && <Bell className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />}
                                    <p className="text-sm font-medium flex-1">{notif.message}</p>
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'overview' &&
                        <Overview user={user}
                            isEditing={isEditing}
                        />}

                    {activeTab === 'interviews' && <DashInterviews />}

                    {activeTab === 'progress' && (
                        <div className="space-y-6">
                            {/* Progress Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <StatCard icon={BarChart3} label="Avg Score" value="78%" trend="+5% this month" gradient="bg-gradient-to-br from-indigo-600 to-indigo-700" />
                                <StatCard icon={BookOpen} label="Sessions" value="24" trend="+6 this month" gradient="bg-gradient-to-br from-blue-600 to-cyan-600" />
                                <StatCard icon={Award} label="Completion" value="92%" gradient="bg-gradient-to-br from-emerald-600 to-teal-600" />
                            </div>

                            {/* Charts */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Performance</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={weeklyScores}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} />
                                        <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontWeight: 600 }} />
                                        <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} dot={{ fill: '#6366f1', r: 8, strokeWidth: 3, stroke: '#fff' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Skill Growth Over Time</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={skillGrowth}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} />
                                        <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontWeight: 600 }} />
                                        <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 600 }} />
                                        <Bar dataKey="technical" fill="#6366f1" name="Technical" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="behavioral" fill="#10b981" name="Behavioral" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="design" fill="#f59e0b" name="System Design" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Badges */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                    <div className="p-2 bg-amber-100 rounded-lg mr-3">
                                        <Trophy className="w-5 h-5 text-amber-600" />
                                    </div>
                                    Achievements & Badges
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {user.badges.map(badge => (
                                        <div key={badge} className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                                <Award className="w-10 h-10 text-white" />
                                            </div>
                                            <p className="font-bold text-gray-900">{badge}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'insights' && (
                        <div className="space-y-6">
                            {/* Session Summary */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    Latest Session Summary
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                                        <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">85%</div>
                                        <p className="text-sm font-semibold text-gray-600">Overall Score</p>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                                        <div className="text-4xl font-bold text-gray-900 mb-2">Oct 3</div>
                                        <p className="text-sm font-semibold text-gray-600">Session Date</p>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                                        <div className="text-4xl font-bold text-emerald-600 mb-2">Pass</div>
                                        <p className="text-sm font-semibold text-gray-600">Status</p>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                                        <div className="text-4xl font-bold text-gray-900 mb-2">45 min</div>
                                        <p className="text-sm font-semibold text-gray-600">Duration</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Scores */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-8">Content Quality Analysis</h3>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <RadialProgress value={performanceMetrics.contentScores.grammar} label="Grammar" color="#6366f1" />
                                    <RadialProgress value={performanceMetrics.contentScores.relevance} label="Relevance" color="#10b981" />
                                    <RadialProgress value={performanceMetrics.contentScores.coherence} label="Coherence" color="#f59e0b" />
                                </div>
                            </div>

                            {/* Speech Metrics */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-8">Speech Delivery Metrics</h3>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-gray-700">Speech Rate (words/min)</span>
                                            <span className="text-xl font-bold text-indigo-600">{performanceMetrics.speechMetrics.speechRate}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(performanceMetrics.speechMetrics.speechRate / 200) * 100}%` }}></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 font-medium">Optimal: 130-160 wpm</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-gray-700">Filler Words Count</span>
                                            <span className="text-xl font-bold text-amber-600">{performanceMetrics.speechMetrics.fillerWords}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                            <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(performanceMetrics.speechMetrics.fillerWords / 20) * 100}%` }}></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 font-medium">Target: Less than 10</p>
                                    </div>
                                </div>
                            </div>

                            {/* AI Feedback */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                        <MessageSquare className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    AI-Generated Feedback
                                </h3>
                                <div className="space-y-6">
                                    <div className="border-l-4 border-emerald-500 pl-6 py-4 bg-emerald-50 rounded-r-xl">
                                        <h4 className="font-bold text-emerald-800 mb-3 flex items-center text-lg">
                                            <CheckCircle className="w-6 h-6 mr-2" />
                                            What Went Well
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed">{performanceMetrics.feedback.positive}</p>
                                    </div>
                                    <div className="border-l-4 border-amber-500 pl-6 py-4 bg-amber-50 rounded-r-xl">
                                        <h4 className="font-bold text-amber-800 mb-3 flex items-center text-lg">
                                            <AlertCircle className="w-6 h-6 mr-2" />
                                            Areas to Improve
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed">{performanceMetrics.feedback.improvement}</p>
                                    </div>
                                    <div className="border-l-4 border-indigo-500 pl-6 py-4 bg-indigo-50 rounded-r-xl">
                                        <h4 className="font-bold text-indigo-800 mb-3 flex items-center text-lg">
                                            <Target className="w-6 h-6 mr-2" />
                                            Suggested Action Plan
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed">{performanceMetrics.feedback.action}</p>
                                    </div>
                                </div>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl">
                                        <RotateCcw className="w-5 h-5" />
                                        <span>Retake Session</span>
                                    </button>
                                    <button className="flex-1 px-6 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all">
                                        <Download className="w-5 h-5" />
                                        <span>Download Report</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div >
        </div >
    );
};

export default Dashboard;