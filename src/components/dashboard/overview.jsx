import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, BookOpen, TrendingUp, Award, Bell, Settings, Calendar, Target, Zap, ChevronRight, Play, RotateCcw, Download, Shield, Edit2, Save, X, CheckCircle, AlertCircle, Trophy, Flame, Star, Clock, MessageSquare, BarChart3, Brain, Menu, Home, LogOut, HelpCircle, GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

const Overview = ({ user, isEditing }) => {

    // Mock data (same as before)
    const [assessmentData, setAssessmentData] = useState({
        overallScore: 78,
        weakSkills: ['System Design', 'SQL Optimization', 'Docker'],
        strongSkills: ['React', 'JavaScript', 'Communication']
    });

    useEffect(() => {

        setAssessmentData({
            ...assessmentData,
            strongSkills: user.skill_analysis.stronger_skills,
            weakSkills: user.skill_analysis.weaker_skills,
            overallScore: user.score
        })
        // console.log('❤️👌assessment data : ', assessmentData)
    }, [user]);

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

    const suggestions = [
        'Focus on SQL – 2 weak answers last week',
        'Practice system design for FAANG interviews',
        'Your behavioral scores are excellent – maintain momentum'
    ];

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

    return (
        <>
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Trophy} label="Level" value={user.level} gradient="bg-gradient-to-br from-indigo-600 to-indigo-700" />
                    <StatCard icon={Zap} label="XP Points" value={`${user.xp}/${user.xpToNext}`} gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
                    <StatCard icon={Flame} label="Daily Streak" value={user.streak} trend="+2 this week" gradient="bg-gradient-to-br from-red-500 to-orange-600" />
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
        </>
    )
}

export default Overview;