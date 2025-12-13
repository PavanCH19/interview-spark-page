


import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    BookOpen, Video, FileText, Award, TrendingUp, TrendingDown,
    CheckCircle, ArrowRight, Clock, DollarSign, X, Zap, Target,
    Star, AlertCircle, Download, Sparkles, Trophy, Brain, XCircle,
    ThumbsUp, ThumbsDown, Lightbulb, BookMarked, Briefcase, FolderOpen
} from 'lucide-react';
import { Notification } from '../components/Notifications';

// Circular Progress Component
const CircularProgress = ({ percentage, size = 200, label = "Overall Match" }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedPercentage(percentage), 100);
        return () => clearTimeout(timer);
    }, [percentage]);

    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

    const getColor = () => {
        if (percentage >= 70) return '#10b981';
        if (percentage >= 40) return '#eab308';
        return '#ef4444';
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getColor()}
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-2000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold" style={{ color: getColor() }}>
                    {animatedPercentage}%
                </span>
                <span className="text-gray-600 text-sm mt-1">{label}</span>
            </div>
        </div>
    );
};

// Assessment Result Card Component
const AssessmentResultCard = ({ assessmentData, results, summary }) => {

    const [showModal, setShowModal] = useState(false);
    const label = assessmentData.label;
    const skillMatchPercentage = Math.round((assessmentData.feature_summary?.skill_match_ratio || 0) * 100);

    const getStatusConfig = (label) => {
        switch (label) {
            case "Fit":
                return {
                    gradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
                    border: 'border-green-200',
                    iconBg: 'bg-green-500',
                    icon: <CheckCircle className="w-6 h-6 text-white" />
                };
            case "Not Fit":
                return {
                    gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
                    border: 'border-red-200',
                    iconBg: 'bg-red-500',
                    icon: <XCircle className="w-6 h-6 text-white" />
                };
            case "Partially Fit":
                return {
                    gradient: 'bg-gradient-to-r from-yellow-50 to-amber-50',
                    border: 'border-yellow-300',
                    iconBg: 'bg-yellow-500',
                    icon: <AlertCircle className="w-6 h-6 text-white" />
                };
            default:
                return {
                    gradient: 'bg-gradient-to-r from-gray-50 to-slate-50',
                    border: 'border-gray-200',
                    iconBg: 'bg-gray-500',
                    icon: <AlertCircle className="w-6 h-6 text-white" />
                };
        }
    };

    const statusConfig = getStatusConfig(label);

    return (
        <>
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Circular Progress */}
                    <div className="flex justify-center">
                        <CircularProgress percentage={skillMatchPercentage} size={220} label="Skill Match" />
                    </div>

                    {/* Assessment Summary */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className={`flex items-start gap-4 p-6 rounded-2xl border-2 ${statusConfig.gradient} ${statusConfig.border}`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${statusConfig.iconBg}`}>
                                {statusConfig.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    Classification: {assessmentData.label}
                                </h3>
                                <p className="text-gray-700 text-sm mb-2">
                                    <span className="font-semibold">Confidence:</span> {Math.round(assessmentData.confidence * 100)}%
                                </p>
                                <p className="text-gray-700 text-sm">
                                    <span className="font-semibold">Domain:</span> {assessmentData.metadata.domain}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all flex-shrink-0 self-center h-fit">
                                <AlertCircle className="w-4 h-4" />
                                View Results
                            </button>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Assessment Summary</h3>
                            <p className="text-gray-700 text-sm">{assessmentData.explanation}</p>
                        </div>


                    </div>
                </div>
            </div>
            <TestResultsModal
                show={showModal}
                onClose={() => setShowModal(false)}
                results={results}
                summary={summary}
            />
        </>
    );
};

// Skills Analysis Component
const SkillsAnalysis = ({ matchedSkills, missingSkills, domain }) => {
    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                Skills Analysis: {domain}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Matched Skills */}
                <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5" />
                        Matched Skills ({matchedSkills.length})
                    </h3>
                    {matchedSkills.length > 0 ? (
                        <div className="space-y-2">
                            {matchedSkills.map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-gray-800 font-medium capitalize">{skill}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                            No skills matched for this domain
                        </div>
                    )}
                </div>

                {/* Missing Skills */}
                <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
                        <ThumbsDown className="w-5 h-5" />
                        Missing Skills ({missingSkills.length})
                    </h3>
                    <div className="space-y-2">
                        {missingSkills.map((skill, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                                <X className="w-4 h-4 text-red-600" />
                                <span className="text-gray-800 font-medium capitalize">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Feature Summary Component
const FeatureSummary = ({ features }) => {
    // Determine test score color based on ranges
    const getTestScoreColor = (score) => {
        if (score >= 75) return 'text-green-600'; // 75-100: Excellent
        if (score >= 50) return 'text-blue-600';  // 50-74: Good
        if (score >= 25) return 'text-orange-600'; // 25-49: Fair
        return 'text-red-600';                      // 0-24: Poor
    };

    const testScoreColor = getTestScoreColor(features.test_score_raw);
    console.log(testScoreColor);

    const metrics = [
        { label: 'Skill Match Ratio', value: `${Math.round(features.skill_match_ratio * 100)}%`, icon: Award, color: 'text-purple-600' },
        { label: 'Years of Experience', value: features.years_experience, icon: Briefcase, color: 'text-purple-600' },
        { label: 'Test Score', value: `${features.test_score_raw}/100`, icon: FileText, color: testScoreColor },
        { label: 'Project Count', value: features.project_count, icon: FolderOpen, color: 'text-purple-600' }
    ];

    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-6 md:p-8 border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BookMarked className="w-6 h-6 text-purple-600" />
                Performance Metrics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                        <div key={idx} className="bg-white rounded-2xl p-5 shadow-md text-center">
                            <Icon className={`w-8 h-8 ${metric.color} mx-auto mb-3`} />
                            <div className={`text-3xl font-bold mb-1 ${metric.color}`}>{metric.value}</div>
                            <div className="text-sm text-gray-600">{metric.label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Alternative Domains Component
const AlternativeDomains = ({ suggestions, onSelectDomain }) => {
    const getRankColor = (rank) => {
        if (rank === 1) return 'from-yellow-400 to-orange-500';
        if (rank === 2) return 'from-blue-400 to-indigo-500';
        return 'from-purple-400 to-pink-500';
    };


    const getRankBadge = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        return '🥉';
    };

    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
                Alternative Career Paths
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestions.map((suggestion, idx) => (
                    <div
                        key={idx}
                        className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{getRankBadge(suggestion.rank)}</span>
                                <span className="text-xs font-semibold text-gray-500">Rank {suggestion.rank}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getRankColor(suggestion.rank)} text-white`}>
                                {Math.round(suggestion.skill_match_ratio * 100)}%
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700">
                            {suggestion.domain}
                        </h3>

                        <div className="space-y-3 mb-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-semibold">Matched:</span> {suggestion.matched_skills_count}/{suggestion.required_skills_count} skills
                                </p>
                                {suggestion.matched_skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {suggestion.matched_skills.map((skill, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full capitalize">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-semibold">Focus on:</span>
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {suggestion.key_missing_skills.slice(0, 3).map((skill, i) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full capitalize">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => onSelectDomain(suggestion)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                            View Path
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Learning Resources Component
// const LearningResources = ({ missingSkills, domain }) => {
//     const [filter, setFilter] = useState('all');

//     const generateResources = (skills) => {
//         return skills.map((skill, idx) => ({
//             type: idx % 3 === 0 ? 'course' : idx % 3 === 1 ? 'video' : 'article',
//             title: `Master ${skill.charAt(0).toUpperCase() + skill.slice(1)}`,
//             description: `Complete guide to learning ${skill} from beginner to advanced level`,
//             duration: idx % 3 === 0 ? '4-6 weeks' : idx % 3 === 1 ? '2-4 hours' : '30-45 min',
//             cost: idx % 2 === 0 ? 'Free' : '$29-49',
//             skill: skill
//         }));
//     };

//     const getIcon = (type) => {
//         switch (type) {
//             case 'video': return <Video className="w-5 h-5" />;
//             case 'course': return <BookOpen className="w-5 h-5" />;
//             case 'article': return <FileText className="w-5 h-5" />;
//             default: return <BookOpen className="w-5 h-5" />;
//         }
//     };

//     const resources = generateResources(missingSkills);
//     const filteredResources = filter === 'all'
//         ? resources
//         : resources.filter(r => r.type === filter);

//     return (
//         <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-2xl p-6 md:p-8 border border-orange-100">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//                 <Brain className="w-6 h-6 text-orange-600" />
//                 Recommended Learning Path for {domain}
//             </h2>

//             <div className="flex flex-wrap gap-2 mb-6">
//                 {['all', 'video', 'course', 'article'].map(type => (
//                     <button
//                         key={type}
//                         onClick={() => setFilter(type)}
//                         className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${filter === type
//                             ? 'bg-orange-500 text-white shadow-lg'
//                             : 'bg-white text-gray-700 hover:bg-orange-100'
//                             }`}
//                     >
//                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {filteredResources.map((resource, i) => (
//                     <div
//                         key={i}
//                         className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
//                     >
//                         <div className="flex items-start gap-3 mb-3">
//                             <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
//                                 {getIcon(resource.type)}
//                             </div>
//                             <div className="flex-1">
//                                 <h3 className="font-bold text-gray-800">{resource.title}</h3>
//                                 <span className="text-xs text-gray-500 capitalize">{resource.type}</span>
//                             </div>
//                         </div>

//                         <p className="text-sm text-gray-600 mb-4">{resource.description}</p>

//                         <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
//                             <div className="flex items-center gap-1">
//                                 <Clock className="w-4 h-4" />
//                                 <span>{resource.duration}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 <DollarSign className="w-4 h-4" />
//                                 <span>{resource.cost}</span>
//                             </div>
//                         </div>

//                         <div className="flex gap-2">
//                             <button className="flex-1 px-4 py-2 border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all">
//                                 Add to Plan
//                             </button>
//                             <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
//                                 Start Now
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// Modal Component
const DecisionModal = ({ show, onClose, children }) => {

    useEffect(() => {
        if (show) {
            const previous = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = previous; };
        }
        return undefined;
    }, [show]);

    if (!show) return null;

    return createPortal(
        <div
            className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div className="bg-transparent w-full max-w-md p-0" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};

import { useNavigate } from 'react-router-dom';

const CareerDecision = ({ selectedDomain, setNotification, setIsNotification}) => {
    const [showModal, setShowModal] = useState(false);
    const [domainSelected, setDomainSelected] = useState(false);
    const navigate = useNavigate();
    const onSwitchPath = (domain)=>{
        console.log(" 🤣domain", domain)
    }
    useEffect(()=>{
        if(selectedDomain !==''){
            setDomainSelected(true);
        }
        else{
            setDomainSelected(false)
        }
        console.log("👋", domainSelected)
    },[domainSelected, selectedDomain])

    // Modal helper component that renders to document.body so backdrop covers entire viewport
    const Modal = ({ show, onClose, children }) => {
        useEffect(() => {
            // Prevent background scrolling when modal is open
            if (show) {
                const previous = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                return () => { document.body.style.overflow = previous; };
            }
            return undefined;
        }, [show]);

        if (!show) return null;

        return createPortal(
            <div
                className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50 p-4 animate-fade-in"
                role="dialog"
                aria-modal="true"
                onClick={onClose}
            >
                <div className="bg-transparent w-full max-w-md p-0" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>,
            document.body
        );
    };
    return (
        <>
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
                <Zap className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Ready to Make Your Decision?
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                    Choose your path forward and unlock your potential
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
                    <button
                        onClick={() => {
                            navigate('/dashboard')
                        }}
                        className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-white text-purple-700 font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <CheckCircle className="w-6 h-6" />
                        Continue Current Path
                    </button>

                    <button
                        onClick={() => {
                            setShowModal(true)
                            if(!domainSelected){
                                setNotification({
                                    message : 'Domain Not Selected' ,
                                    type : 'warning'
                                })
                                setIsNotification(true);
                            }    
                        }}
                        className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all animate-pulse-slow"
                    >
                        <Star className="w-6 h-6" />
                        Switch to Suggested Path
                    </button>
                </div>
            </div>
            <DecisionModal show={showModal} onClose={() => setShowModal(false)}>
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
                    <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                        {domainSelected? `Confirm Switch to ${selectedDomain}` : "Select the Domain"}
                    </h3>
                    <p className="text-gray-600 mb-6 text-center">
                        Switching will update your profile and learning plan. Continue?
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowModal(false)}
                            className={domainSelected?`flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100` : 
                                `flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 
                                text-white font-semibold rounded-xl 
                                hover:shadow-xl
                                disabled:from-gray-400 disabled:to-gray-500
                                disabled:text-gray-200
                                disabled:cursor-not-allowed
                                disabled:shadow-none
                                disabled:opacity-70`}
                        >
                            {!domainSelected?"Select Domain" : "Cancel"}
                        </button>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                onSwitchPath(selectedDomain);
                            }}
                            disabled={!domainSelected}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-xl"
                        >
                            Confirm Switch
                        </button>
                    </div>
                </div>
            </DecisionModal>
        </>
    );
};

//import React, { useState, useEffect } from 'react';
//import { createPortal } from 'react-dom';
//import { FileText, CheckCircle, XCircle, Clock, ArrowRight, Award, Target, X } from 'lucide-react';

const TestResultsModal = ({ show, onClose, results, summary }) => {
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (show) {
            const previous = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = previous; };
        }
        return undefined;
    }, [show]);

    if (!show) return null;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-700 border-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'hard': return 'bg-red-100 text-red-700 border-red-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const accuracyRate = summary.attempted > 0
        ? Math.round((summary.correct / summary.attempted) * 100)
        : 0;

    return createPortal(
        <div
            className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                        <Award className="w-8 h-8 md:w-10 md:h-10" />
                        <h1 className="text-2xl md:text-3xl font-bold">Test Results</h1>
                    </div>
                    <p className="text-indigo-100 text-base md:text-lg">Comprehensive performance analysis and insights</p>
                </div>

                {/* Score Hero Section */}
                <div className="p-6 md:p-8 bg-gradient-to-br from-white to-indigo-50">
                    <div className="text-center mb-6 md:mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl mb-4">
                            <span className="text-4xl md:text-5xl font-bold text-white">{summary.score}%</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Your Score</h2>
                        <p className="text-gray-600">
                            {summary.score >= 80 ? '🎉 Excellent Performance!' :
                                summary.score >= 60 ? '👍 Good Job!' :
                                    '💪 Keep Learning!'}
                        </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-2 border-green-200 hover:shadow-xl transition-shadow">
                            <div className="flex flex-col items-center">
                                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600 mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{summary.correct}</div>
                                <div className="text-xs md:text-sm text-gray-600 font-medium">Correct</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-2 border-red-200 hover:shadow-xl transition-shadow">
                            <div className="flex flex-col items-center">
                                <XCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600 mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">{summary.incorrect}</div>
                                <div className="text-xs md:text-sm text-gray-600 font-medium">Incorrect</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="flex flex-col items-center">
                                <Clock className="w-6 h-6 md:w-8 md:h-8 text-gray-600 mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-gray-600 mb-1">{summary.skipped}</div>
                                <div className="text-xs md:text-sm text-gray-600 font-medium">Skipped</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-2 border-purple-200 hover:shadow-xl transition-shadow">
                            <div className="flex flex-col items-center">
                                <Target className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">{accuracyRate}%</div>
                                <div className="text-xs md:text-sm text-gray-600 font-medium">Accuracy</div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-4 md:mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs md:text-sm font-semibold text-gray-700">Completion Progress</span>
                            <span className="text-xs md:text-sm font-bold text-indigo-600">{summary.attempted}/{summary.totalQuestions} Questions</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
                                style={{ width: `${(summary.attempted / summary.totalQuestions) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Time Badge */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-orange-300">
                            <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                            <span className="text-sm md:text-base font-semibold text-orange-700">Time Taken: {summary.timeFormatted}</span>
                        </div>
                    </div>
                </div>

                {/* Question Details Section */}
                <div className="p-6 md:p-8 bg-gray-50">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all text-base md:text-lg"
                    >
                        <FileText className="w-5 h-5 md:w-6 md:h-6" />
                        {showDetails ? 'Hide' : 'Show'} Detailed Breakdown
                        <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`} />
                    </button>

                    {showDetails && (
                        <div className="mt-6 space-y-4">
                            {results.map((result, idx) => (
                                <div
                                    key={result.question_id}
                                    className={`p-4 md:p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${result.userAnswer === null
                                        ? 'bg-white border-gray-300'
                                        : result.isCorrect
                                            ? 'bg-green-50 border-green-300'
                                            : 'bg-red-50 border-red-300'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-start gap-3 flex-1">
                                            <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full text-xs md:text-sm">
                                                {idx + 1}
                                            </span>
                                            <span className="text-sm md:text-base text-gray-800 font-medium leading-relaxed">{result.question}</span>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                            <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(result.difficulty)}`}>
                                                {result.difficulty.toUpperCase()}
                                            </span>
                                            {result.userAnswer === null ? (
                                                <Clock className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                                            ) : result.isCorrect ? (
                                                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                                            ) : (
                                                <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="ml-8 md:ml-11 space-y-2">
                                        {result.userAnswer && (
                                            <div className="flex gap-2 items-start">
                                                <span className="text-sm md:text-base font-bold text-gray-700 min-w-fit">Your Answer:</span>
                                                <span className={`text-sm md:text-base font-medium ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                                    {result.userAnswer}
                                                </span>
                                            </div>
                                        )}
                                        {!result.isCorrect && (
                                            <div className="flex gap-2 items-start">
                                                <span className="text-sm md:text-base font-bold text-gray-700 min-w-fit">Correct Answer:</span>
                                                <span className="text-sm md:text-base text-green-700 font-medium">{result.correctAnswer}</span>
                                            </div>
                                        )}
                                        {result.userAnswer === null && (
                                            <div className="text-sm md:text-base text-gray-500 italic font-medium">⏭️ Question skipped</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

// export default TestResultsModal;

// import { useLocation } from 'react-router-dom';

// Main Dashboard Component
const CareerRecommendationDashboard = ({ classificationResult, mocktest_result, mocktest_summary }) => {


    // const location = useLocation();
    // const assessmentResults = location.state?.classificationResult;
    // const assessmentTestResults = location.state?.mocktest_result;
    // const assessmentTestSummary = location.state?.mocktest_summary;

    const assessmentResults = classificationResult;
    const assessmentTestResults = mocktest_result;
    const assessmentTestSummary = mocktest_summary;


    // Sample API response data
    const assessmentData = assessmentResults || {
        "label": "Fit",
        "confidence": 0.557,
        "matched_skills": [
            "docker",
            "pytorch",
            "deep learning",
            "scikit-learn",
            "pandas"
        ],
        "missing_skills": [
            "python",
            "numpy"
        ],
        "feature_summary": {
            "skill_match_ratio": 0.714,
            "years_experience": 8,
            "test_score_norm": 0.8,
            "project_count": 1,
            "test_score_raw": 40
        },
        "explanation": "High test score (80/100) and covers many required skills (5/7 matched), but lacks python, numpy. Has 1 project and 8 years of solid experience. Model confidence: 0.56 \u2192 Fit.",
        "metadata": {
            "domain": "Data Science",
            "candidate_id": "candidate_1246",
            "classification_timestamp": "2025-10-04T22:29:36.661746",
            "model_version": "1.0"
        },
        "alternative_domain_suggestions": [
            {
                "rank": 1,
                "domain": "DevOps",
                "skill_match_ratio": 0.286,
                "matched_skills_count": 2,
                "required_skills_count": 7,
                "matched_skills": [
                    "docker",
                    "ci/cd"
                ],
                "key_missing_skills": [
                    "kubernetes",
                    "terraform",
                    "aws"
                ]
            },
            {
                "rank": 2,
                "domain": "Web Development",
                "skill_match_ratio": 0.143,
                "matched_skills_count": 1,
                "required_skills_count": 7,
                "matched_skills": [
                    "node.js"
                ],
                "key_missing_skills": [
                    "react",
                    "javascript",
                    "html"
                ]
            },
            {
                "rank": 3,
                "domain": "Mobile Development",
                "skill_match_ratio": 0.0,
                "matched_skills_count": 0,
                "required_skills_count": 7,
                "matched_skills": [],
                "key_missing_skills": [
                    "swift",
                    "android",
                    "react native"
                ]
            }
        ]
    };

    const [selectedAltDom, setSelectedAltDom] = useState("");
    const [isNotification, setIsNotification] = useState(false);
    const [notification, setNotification] = useState({
        message : '',
        type : ''
    })

    useEffect(()=>{
        console.log("🤝", selectedAltDom);
    },[selectedAltDom])

    const results = assessmentTestResults || [
        {
            question_id: 1,
            question: 'What is the time complexity of accessing an element in an array by index?',
            difficulty: 'easy',
            tags: ['Array'],
            userAnswer: 'O(1)',
            correctAnswer: 'O(n)',
            isCorrect: false,
            marked: false
        },
        {
            question_id: 2,
            question: 'Which of the following is true about REST APIs?',
            difficulty: 'medium',
            tags: ['API'],
            userAnswer: null,
            correctAnswer: 'REST is stateless and uses HTTP methods',
            isCorrect: false,
            marked: false
        },
        {
            question_id: 3,
            question: 'In a distributed system, which consistency model guarantees that all nodes see the same data at the same time?',
            difficulty: 'hard',
            tags: ['Systems'],
            userAnswer: 'Strong Consistency',
            correctAnswer: 'Strong Consistency',
            isCorrect: true,
            marked: false
        },
        {
            question_id: 4,
            question: 'What is the time complexity of searching for an element in a balanced binary search tree?',
            difficulty: 'medium',
            tags: ['DSA'],
            userAnswer: 'O(log n)',
            correctAnswer: 'O(log n)',
            isCorrect: true,
            marked: false
        },
        {
            question_id: 5,
            question: 'Which HTTP method is idempotent and safe?',
            difficulty: 'easy',
            tags: ['HTTP'],
            userAnswer: 'GET',
            correctAnswer: 'GET',
            isCorrect: true,
            marked: false
        }
    ];

    const summary = assessmentTestSummary || {
        totalQuestions: 5,
        attempted: 4,
        skipped: 1,
        correct: 3,
        incorrect: 1,
        score: 60,
        timeTaken: 15,
        timeFormatted: '15:00',
        markedForReview: []
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Career Assessment Results
                    </h1>
                    <p className="text-xl text-gray-600">
                        Candidate ID: {assessmentData.metadata.candidate_id}
                    </p>
                </div>

                {/* Assessment Result */}
                <AssessmentResultCard
                    assessmentData={assessmentData}
                    results={results}
                    summary={summary}
                />

            {isNotification && (
                <Notification
                message={notification.message}
                type={notification.type}
                duration={4000}
                onClose={() => setNotification({ message: '', type: '' })}
            />
            )}

                {/* Performance Metrics */}
                <FeatureSummary features={assessmentData.feature_summary} />

                {/* Skills Analysis */}
                <SkillsAnalysis
                    matchedSkills={assessmentData.matched_skills || []}
                    missingSkills={assessmentData.missing_skills || []}
                    domain={assessmentData.metadata?.domain || "Unknown"}
                />


                {/* Alternative Career Paths */}
                {assessmentData.alternative_domain_suggestions?.length > 0 && (
                    <AlternativeDomains
                        suggestions={assessmentData.alternative_domain_suggestions}
                        onSelectDomain={(domain) => {
                            // alert(`Selected: ${domain.domain}`);
                            setSelectedAltDom(domain.domain)
                        }}
                    />
                )}


                {/* Learning Resources
                {assessmentData.alternative_domain_suggestions?.length > 0 && (
                    <LearningResources
                        missingSkills={assessmentData.alternative_domain_suggestions[0]?.key_missing_skills || []}
                        domain={assessmentData.alternative_domain_suggestions[0]?.domain || assessmentData.metadata.domain}
                    />
                )} */}


                {/* Action Buttons */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <style>{`
                        .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                        }
                    `}</style>
                    <button
                        // onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-purple-300 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 hover:scale-105 transition-all shadow-lg">
                        <AlertCircle className="w-5 h-5" />
                        View Test Results
                    </button>
                    <button className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
                        <Target className="w-5 h-5" />
                        Create Learning Plan
                    </button>
                    <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:scale-105 transition-all shadow-lg">
                        <Download className="w-5 h-5" />
                        Download PDF
                    </button>
                </div> */}



                {/* Career Decision */}
                <CareerDecision selectedDomain={selectedAltDom} setNotification={setNotification}
                    setIsNotification={setIsNotification}    
                />

                {/* Motivational Footer */}
                <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Every expert was once a beginner
                    </h3>
                    <p className="text-lg text-gray-600">
                        Focus on building the right skills, and opportunities will follow
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CareerRecommendationDashboard;