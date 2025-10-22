import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, BookOpen, TrendingUp, Award, Bell, Settings, Calendar, Target, Zap, ChevronRight, Play, RotateCcw, Download, Shield, Edit2, Save, X, CheckCircle, AlertCircle, Trophy, Flame, Star, Clock, MessageSquare, BarChart3, Brain, Menu, Home, LogOut, HelpCircle, GripVertical } from 'lucide-react';
import { useLocation } from 'react-router-dom';


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

// Mock data (same as before)
const assessmentData = {
    overallScore: 78,
    weakSkills: ['System Design', 'SQL Optimization', 'Docker'],
    strongSkills: ['React', 'JavaScript', 'Communication']
};

const skillComparison = [
    { skill: 'JavaScript', user: 85, required: 80 },
    { skill: 'React', user: 90, required: 85 },
    { skill: 'Node.js', user: 75, required: 80 },
    { skill: 'SQL', user: 65, required: 85 },
    { skill: 'System Design', user: 60, required: 90 },
    { skill: 'Algorithms', user: 70, required: 85 }
];

const careerRecommendations = [
    { title: 'Technical Lead', fit: 87, description: 'Leadership + Technical Excellence', action: 'Switch' },
    { title: 'Senior SWE', fit: 92, description: 'Current trajectory path', action: 'Stay' },
    { title: 'Solutions Architect', fit: 73, description: 'Architecture focus', action: 'Explore' }
];

const ongoingSessions = [
    { id: 1, domain: 'System Design', company: 'Google', progress: 60, started: '2 days ago' },
    { id: 2, domain: 'Backend Engineering', company: 'Amazon', progress: 35, started: '1 week ago' }
];

const recentSessions = [
    { id: 1, date: '2025-10-03', domain: 'React Development', score: 85, type: 'Technical', status: 'Pass' },
    { id: 2, date: '2025-10-01', domain: 'System Design', score: 72, type: 'Design', status: 'Pass' },
    { id: 3, date: '2025-09-28', domain: 'Behavioral', score: 88, type: 'Behavioral', status: 'Pass' },
    { id: 4, date: '2025-09-25', domain: 'SQL Queries', score: 65, type: 'Technical', status: 'Review' },
    { id: 5, date: '2025-09-22', domain: 'JavaScript Algorithms', score: 90, type: 'Technical', status: 'Pass' }
];

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

const suggestions = [
    'Focus on SQL – 2 weak answers last week',
    'Practice system design for FAANG interviews',
    'Your behavioral scores are excellent – maintain momentum'
];

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
    const { user, isEditing, setIsEditing, editedUser, setEditedUser, saveProfile, resetProfile, sidebarOpen, setSidebarOpen, sidebarWidth, setSidebarWidth } = useStore();
    const [activeTab, setActiveTab] = useState('overview');
    const [isResizing, setIsResizing] = useState(false);
    // heatmapData was removed because the heatmap UI is currently commented out
    const sidebarRef = useRef(null);



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
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
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

                        <div className="mt-8 pt-6 border-t border-gray-200 space-y-1">
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors">
                                <Settings className="w-5 h-5" />
                                <span>Settings</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors">
                                <HelpCircle className="w-5 h-5" />
                                <span>Help</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
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
                        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                    <p className="text-sm text-gray-500">Welcome back, {user.name.split(' ')[0]}!</p>
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

                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatCard icon={Trophy} label="Level" value={user.level} gradient="bg-gradient-to-br from-indigo-600 to-indigo-700" />
                                <StatCard icon={Zap} label="XP Points" value={`${user.xp}/${user.xpToNext}`} gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
                                <StatCard icon={Flame} label="Day Streak" value={user.streak} trend="+2 this week" gradient="bg-gradient-to-br from-red-500 to-orange-600" />
                                <StatCard icon={Star} label="Badges" value={user.badges.length} gradient="bg-gradient-to-br from-purple-600 to-pink-600" />
                            </div>

                            {/* Profile Overview */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                            <User className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        Profile Overview
                                    </h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            <span>Edit Profile</span>
                                        </button>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={saveProfile}
                                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all shadow-md font-medium"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>Save</span>
                                            </button>
                                            <button
                                                onClick={resetProfile}
                                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                                            >
                                                <X className="w-4 h-4" />
                                                <span>Cancel</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Full Name</label>
                                            <input
                                                type="text"
                                                value={isEditing ? editedUser.name : user.name}
                                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-700 font-medium transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Job Title</label>
                                            <input
                                                type="text"
                                                value={isEditing ? editedUser.title : user.title}
                                                onChange={(e) => setEditedUser({ ...editedUser, title: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-700 font-medium transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Experience</label>
                                            <input
                                                type="text"
                                                value={isEditing ? editedUser.experience : user.experience}
                                                onChange={(e) => setEditedUser({ ...editedUser, experience: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-700 font-medium transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Education</label>
                                            <input
                                                type="text"
                                                value={isEditing ? editedUser.education : user.education}
                                                onChange={(e) => setEditedUser({ ...editedUser, education: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-700 font-medium transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Current Career Path</label>
                                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">{user.careerPath}</div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Suggested Path</label>
                                            <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl text-indigo-900 font-semibold">{user.suggestedPath}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="text-sm font-semibold text-gray-600 mb-3 block">Core Skills</label>
                                    <div className="flex flex-wrap gap-2">
                                        {user.skills.map(skill => (
                                            <span key={skill} className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold shadow-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Assessment & Skills Row */}
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Last Assessment */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                            <Target className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        Latest Assessment
                                    </h3>
                                    <div className="text-center mb-8">
                                        <div className="inline-flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white shadow-xl">
                                            <div>
                                                <div className="text-5xl font-bold">{assessmentData.overallScore}%</div>
                                                <div className="text-sm font-medium opacity-90 mt-1">Overall Score</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                            <p className="text-sm font-semibold text-emerald-900 mb-3">Strong Skills</p>
                                            {assessmentData.strongSkills.map(skill => (
                                                <div key={skill} className="text-sm text-emerald-700 mb-2 flex items-center font-medium">
                                                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                            <p className="text-sm font-semibold text-amber-900 mb-3">Needs Work</p>
                                            {assessmentData.weakSkills.map(skill => (
                                                <div key={skill} className="text-sm text-amber-700 mb-2 flex items-center font-medium">
                                                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Skill Comparison Radar */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Skills vs Requirements</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <RadarChart data={skillComparison}>
                                            <PolarGrid stroke="#e5e7eb" />
                                            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} />
                                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11 }} />
                                            <Radar name="Your Skills" dataKey="user" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} strokeWidth={2} />
                                            <Radar name="Required" dataKey="required" stroke="#10b981" fill="#10b981" fillOpacity={0.4} strokeWidth={2} />
                                            <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 600 }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Career Recommendations */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    Career Recommendations
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {careerRecommendations.map(rec => (
                                        <div key={rec.title} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
                                            <div className="flex items-start justify-between mb-4">
                                                <h4 className="font-bold text-gray-900 text-lg">{rec.title}</h4>
                                                <div className="text-right">
                                                    <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{rec.fit}%</span>
                                                    <p className="text-xs text-gray-500 font-medium">Match</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
                                            <button
                                                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${rec.action === 'Stay'
                                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:shadow-md'
                                                    : rec.action === 'Switch'
                                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-md'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                                    }`}
                                            >
                                                {rec.action}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 lg:p-8 border border-indigo-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <div className="p-2 bg-white rounded-lg mr-3 shadow-sm">
                                        <MessageSquare className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    Personalized Suggestions
                                </h3>
                                <ul className="space-y-3">
                                    {suggestions.map((suggestion, idx) => (
                                        <li key={idx} className="flex items-start space-x-3 bg-white bg-opacity-50 rounded-lg p-4">
                                            <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-800 font-medium">{suggestion}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'interviews' && (
                        <div className="space-y-6">
                            {/* Start New Interview CTA */}
                            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 lg:p-10 text-white shadow-xl">
                                <h2 className="text-3xl font-bold mb-3">Ready for Your Next Challenge?</h2>
                                <p className="mb-8 text-indigo-100 text-lg">Start an adaptive AI-powered interview session tailored to your goals.</p>
                                <div className="flex flex-wrap gap-4">
                                    <select className="px-5 py-3 bg-white text-gray-900 rounded-xl font-semibold shadow-lg focus:ring-2 focus:ring-white focus:outline-none">
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
                                    </select>
                                    <button className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl">
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
                    )}

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
            </div>
        </div>
    );
};

export default Dashboard;