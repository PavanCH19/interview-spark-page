import React from 'react';
import { TrendingUp, TrendingDown, Award, Target, Mic, Code, CheckCircle, XCircle, BookOpen, Lightbulb, BarChart3 } from 'lucide-react';

const RecentSession = () => {
  const data = {
    user_id: "user_12345",
    domain: "AI/ML",
    session_number: 1,
    session_stats: {
      total_questions: 5,
      questions_answered: 5,
      mcq_attempted: 3,
      voice_attempted: 1,
      coding_attempted: 1,
      overall_average: 10.26
    },
    skill_analysis: {
      "Python": { average_score: 0.0, proficiency_level: "Needs Improvement", questions_tested: 2 },
      "NumPy": { average_score: 0.0, proficiency_level: "Needs Improvement", questions_tested: 1 },
      "Data Preprocessing": { average_score: 0.0, proficiency_level: "Needs Improvement", questions_tested: 1 },
      "Fundamentals": { average_score: 17.1, proficiency_level: "Needs Improvement", questions_tested: 3 },
      "Supervised Learning": { average_score: 10.0, proficiency_level: "Needs Improvement", questions_tested: 1 },
      "Training": { average_score: 0.0, proficiency_level: "Needs Improvement", questions_tested: 1 },
      "Model Training": { average_score: 41.31, proficiency_level: "Developing", questions_tested: 1 },
      "Overfitting": { average_score: 41.31, proficiency_level: "Developing", questions_tested: 1 },
      "Libraries": { average_score: 0.0, proficiency_level: "Needs Improvement", questions_tested: 1 }
    },
    top_skills: ["Model Training", "Overfitting", "Fundamentals"],
    weak_skills: ["Data Preprocessing", "Training", "Libraries"],
    voice_insights: {
      confidence_score: 41.31,
      clarity_score: 98.05,
      speech_ratio: 45.8,
      words_per_minute: 170.31,
      recommendations: [
        "Practice speaking more confidently",
        "Reduce pauses and maintain speech flow"
      ]
    },
    recommendations: {
      suggested_difficulty: "Novice",
      next_steps: [
        "Focus on fundamental concepts",
        "Review basic principles before attempting complex problems",
        "Strengthen your Data Preprocessing skills with targeted practice",
        "Strengthen your Training skills with targeted practice"
      ]
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProficiencyColor = (level) => {
    if (level === "Developing") return "bg-yellow-100 text-yellow-700";
    if (level === "Needs Improvement") return "bg-red-100 text-red-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data.domain} Assessment Report</h1>
              <p className="text-sm text-gray-500 mt-1">Session #{data.session_number} • {data.user_id}</p>
            </div>
            <Award className="w-10 h-10 text-indigo-500" />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <span className={`text-2xl font-bold ${getScoreColor(data.session_stats.overall_average)}`}>
                {data.session_stats.overall_average}%
              </span>
            </div>
            <p className="text-xs text-gray-600">Overall Score</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">
                {data.session_stats.questions_answered}/{data.session_stats.total_questions}
              </span>
            </div>
            <p className="text-xs text-gray-600">Completed</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{data.session_stats.mcq_attempted}</span>
            </div>
            <p className="text-xs text-gray-600">MCQ</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <Code className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">{data.session_stats.coding_attempted}</span>
            </div>
            <p className="text-xs text-gray-600">Coding</p>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Top Skills</h3>
            </div>
            <div className="space-y-2">
              {data.top_skills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{skill}</span>
                  <span className="font-semibold text-green-600">
                    {data.skill_analysis[skill].average_score.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-gray-900">Needs Attention</h3>
            </div>
            <div className="space-y-2">
              {data.weak_skills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{skill}</span>
                  <span className="font-semibold text-red-600">
                    {data.skill_analysis[skill].average_score.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Skills */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Skills Breakdown</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(data.skill_analysis).map(([skill, analysis]) => (
              <div key={skill} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{skill}</h4>
                  <span className={`text-lg font-bold ${getScoreColor(analysis.average_score)}`}>
                    {analysis.average_score.toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded ${getProficiencyColor(analysis.proficiency_level)}`}>
                    {analysis.proficiency_level}
                  </span>
                  <span className="text-xs text-gray-500">{analysis.questions_tested} Q</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Insights */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Mic className="w-5 h-5 text-indigo-500" />
            <h3 className="font-semibold text-gray-900">Voice Assessment</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="text-center p-3 bg-indigo-50 rounded-lg">
              <p className={`text-xl font-bold ${getScoreColor(data.voice_insights.confidence_score)}`}>
                {data.voice_insights.confidence_score.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-600 mt-1">Confidence</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">
                {data.voice_insights.clarity_score.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-600 mt-1">Clarity</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">
                {data.voice_insights.speech_ratio.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-600 mt-1">Speech Ratio</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-xl font-bold text-purple-600">
                {data.voice_insights.words_per_minute.toFixed(0)}
              </p>
              <p className="text-xs text-gray-600 mt-1">WPM</p>
            </div>
          </div>
          <div className="space-y-1">
            {data.voice_insights.recommendations.map((rec, idx) => (
              <p key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                {rec}
              </p>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-semibold">Your Learning Path</h3>
          </div>
          <p className="text-sm text-indigo-100 mb-3">
            Suggested Level: <span className="font-semibold">{data.recommendations.suggested_difficulty}</span>
          </p>
          <div className="space-y-2">
            {data.recommendations.next_steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <span className="flex-shrink-0 w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-white">{step}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentSession;