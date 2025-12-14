import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, BookOpen, TrendingUp, Award, Bell, Settings, Calendar, Target, Zap, ChevronRight, Play, RotateCcw, Download, Shield, Edit2, Save, X, CheckCircle, AlertCircle, Trophy, Flame, Star, Clock, MessageSquare, BarChart3, Brain, Menu, Home, LogOut, HelpCircle, GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = ({ user, isEditing, setIsEditing, editedUser, setEditedUser, saveProfile, resetProfile }) => {
    const [score, setScore] = useState(0);

    // Mock data (same as before)
    const [assessmentData, setAssessmentData] = useState({
        overallScore: 0,
        weakSkills: ['System Design', 'SQL Optimization', 'Docker'],
        strongSkills: ['React', 'JavaScript', 'Communication']
    });

    const [skillComparison, setSkillComparison] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
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
    const [loading, setLoading] = useState(false);

    // Sync editedUser when entering edit mode
    useEffect(() => {
        if (isEditing) {
            // Ensure editedUser is synced with current user when entering edit mode
            setEditedUser(prev => ({
                ...user,
                phone: user.phone || prev?.phone || '',
                github: user.github || prev?.github || '',
                linkedin: user.linkedin || prev?.linkedin || '',
                email: user.email || prev?.email || '',
                name: user.name || prev?.name || ''
            }));
        }
    }, [isEditing]);

    // Fetch sessions data and process skill comparison
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/interview/recent-sessions', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    },
                    withCredentials: true
                });
                console.log('Fetched sessions response:', response);
                if (response.status === 200 && response.data.success) {
                    const sessionsData = response.data.sessions || [];
                    setSessions(sessionsData);
                    console.log('⚠️⚠️', response.data.sessions[0].score)
                    setScore(response.data.sessions[0].score || 0);
                    // Process skill data from all sessions
                    const skillMap = new Map();
                    const skillCounts = new Map();

                    // Aggregate skills from all sessions
                    sessionsData.forEach(session => {
                        const skillAverages = session.skill_analysis?.skill_averages || {};

                        Object.entries(skillAverages).forEach(([skillName, score]) => {
                            if (skillMap.has(skillName)) {
                                skillMap.set(skillName, skillMap.get(skillName) + score);
                                skillCounts.set(skillName, skillCounts.get(skillName) + 1);
                            } else {
                                skillMap.set(skillName, score);
                                skillCounts.set(skillName, 1);
                            }
                        });
                    });

                    // Calculate averages and create skill comparison array
                    const skillComparisonData = Array.from(skillMap.entries())
                        .map(([skillName, totalScore]) => {
                            const count = skillCounts.get(skillName);
                            const averageScore = count > 0 ? (totalScore / count) : 0;

                            // Check if scores are already in percentage (0-100) or need conversion (0-10 scale)
                            // If average is > 10, assume it's already a percentage, otherwise multiply by 10
                            const userScore = averageScore > 10 ? Math.round(averageScore) : Math.round(averageScore * 10);

                            return {
                                skill: skillName,
                                user: Math.min(100, Math.max(0, userScore)), // Clamp between 0-100
                                required: 70 // Standard requirement baseline
                            };
                        })
                        .sort((a, b) => b.user - a.user) // Sort by user score descending
                        .slice(0, 10); // Take top 10 skills for better visualization

                    setSkillComparison(skillComparisonData);
                    console.log('Skill comparison data:', skillComparisonData);
                }
            } catch (error) {
                console.error('Error fetching sessions:', error);
                // Fallback to empty array or default data
                setSkillComparison([]);
            }
        };

        fetchSessions();
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                const response = await axios.get('http://localhost:3000/api/gamification/advanced', {
                    headers: {
                        'Authorization': `${token}`
                    },
                    withCredentials: true
                });

                const data = await response.data;
                console.log("📗 response.data, userData", data)
                console.log('user')
                setUserData(data);
                setLoading(false);
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
        console.log('✨✨', userData)
    }, []);

    const [altDomains, setAltDomains] = useState([]);

    useEffect(() => {
        try {
            const token = localStorage.getItem("token")
            axios.get('http://localhost:3000/api/setup/alternative-domain-suggestions', {
                headers: {
                    "Authorization": `${token}`
                },
                withCredentials: true
            }).then((res) => {
                if (res.status === 200) {
                    setAltDomains(res.data.alternative_suggested_domains)
                    console.log('🤣', res.data)
                }
            }).catch((err) => {
                console.log('😍😅',err)
            })
        } catch (error) {
            alert("error in alternative domain suggestions")
            console.log("error in alternative domain suggestions", error.message)
        }
    }, [])

    useEffect(() => {
        setAssessmentData(prev => ({
            ...prev,
            strongSkills: user.skill_analysis.stronger_skills || prev.strongSkills,
            weakSkills: user.skill_analysis.weaker_skills || prev.weakSkills,
            overallScore: score
        }))
        console.log('❤️👌assessment data : ', assessmentData)
        console.log("loading changed to : ", loading)
        console.log("💭👋 res.data.", altDomains)
    }, [user, score, loading, altDomains]);


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
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard icon={Trophy} label="Level" value={userData.scores.level} gradient="bg-gradient-to-br from-indigo-600 to-indigo-700" />
                        <StatCard icon={Zap} label="XP Points" value={`${userData.scores?.XP}`} gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
                        <StatCard icon={Flame} label="Engagement" value={userData.scores?.engagementScore || 0} gradient="bg-gradient-to-br from-red-500 to-orange-600" />
                        <StatCard icon={Star} label="Badges" value={userData.badges.length} gradient="bg-gradient-to-br from-purple-600 to-pink-600" />
                    </div>
                )}

                {/* Profile Overview */}
                {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
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
                </div> */}

                {/* ================= PROFILE OVERVIEW ================= */}
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

                        {/* ===== NAME (kept) ===== */}
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Full Name</label>
                            <input
                                type="text"
                                value={isEditing ? (editedUser?.name || '') : (user.name || '')}
                                onChange={(e) => setEditedUser({ ...(editedUser || user), name: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                disabled:bg-gray-50 disabled:text-gray-700 font-medium transition-all"
                            />
                        </div>

                        {/* ===== EMAIL (ADDED) ===== */}
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Email</label>
                            <input
                                type="email"
                                value={isEditing ? (editedUser?.email || '') : (user.email || '')}
                                onChange={(e) => setEditedUser({ ...(editedUser || user), email: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 font-medium"
                            />
                        </div>

                        {/* ===== PHONE NUMBER (ADDED) ===== */}
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Phone Number</label>
                            <input
                                type="text"
                                value={isEditing ? (editedUser?.phone || '') : (user.phone || '')}
                                onChange={(e) => setEditedUser({ ...(editedUser || user), phone: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 font-medium"
                            />
                        </div>

                        {/* ===== GITHUB (ADDED) ===== */}
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">GitHub</label>
                            <input
                                type="text"
                                value={isEditing ? (editedUser?.github || '') : (user.github || '')}
                                onChange={(e) => setEditedUser({ ...(editedUser || user), github: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 font-medium"
                            />
                        </div>

                        {/* ===== LINKEDIN (ADDED) ===== */}
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">LinkedIn</label>
                            <input
                                type="text"
                                value={isEditing ? editedUser.linkedin : user.linkedin} // UPDATED
                                onChange={(e) => setEditedUser({ ...editedUser, linkedin: e.target.value })} // UPDATED
                                disabled={!isEditing}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 font-medium"
                            />
                        </div>

                        {/* REMOVED FIELDS */}
                        {/* REMOVED: Job Title */}
                        {/* REMOVED: Experience */}
                        {/* REMOVED: Education */}
                        {/* REMOVED: Career Path */}
                        {/* REMOVED: Suggested Path */}

                    </div>

                    {/* ===== SKILLS SECTION – unchanged except label text ===== */}
                    <div className="mt-6">
                        <label className="text-sm font-semibold text-gray-600 mb-3 block">Skills</label>
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
                        {skillComparison.length > 0 ? (
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
                        ) : (
                            <div className="flex items-center justify-center h-[300px] text-gray-500">
                                <div className="text-center">
                                    <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                    <p className="text-sm font-medium">No skill data available</p>
                                    <p className="text-xs mt-1">Complete interview sessions to see your skill analysis</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {/* Alternative Domain Suggestions */}
                <div className="bg-white from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 lg:p-8 border border-indigo-100 shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                            <TrendingUp className="w-5 h-5 text-indigo-600" />
                        </div>
                        Career Recommendations
                    </h3>

                    {/* 3-column responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {altDomains.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl border border-indigo-100 shadow-sm p-5 hover:shadow-lg transition-all"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-bold text-gray-900 leading-tight">
                                        {item.domain}
                                    </h4>

                                    <span className="px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                                        Rank #{item.rank}
                                    </span>
                                </div>

                                {/* Match Score */}
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                        Match: {(item.skill_match_ratio * 100).toFixed(0)}%
                                    </p>

                                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-600 rounded-full"
                                            style={{ width: `${item.skill_match_ratio * 100}%` }}
                                        ></div>
                                    </div>

                                    <p className="text-xs text-gray-600 mt-1">
                                        {item.matched_skills_count}/{item.required_skills_count} skills matched
                                    </p>
                                </div>

                                {/* Matched Skills */}
                                <div className="mb-3">
                                    <p className="text-xs font-semibold text-green-700">Matched Skills</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {item.matched_skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Missing Skills */}
                                <div>
                                    <p className="text-xs font-semibold text-red-700">Key Missing Skills</p>

                                    {item.key_missing_skills.length === 0 ? (
                                        <p className="text-xs text-gray-600 mt-1">
                                            You meet all required skills!
                                        </p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {item.key_missing_skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </>
    )
}

export default Overview;