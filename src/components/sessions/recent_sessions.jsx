import React, { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Award,
  Mic,
  Code,
  CheckCircle,
  BookOpen,
  Lightbulb,
  BarChart3,
  X,
} from "lucide-react";

const RecentSession = ({ isOpen, setIsOpen, session }) => {
  if (!isOpen || !session) return null;
  console.log('✨✨', session)

  // ---------------------------
  // SKILL CONVERSION (MATCHES COMMENTED UI)
  // ---------------------------
  const convertSkills = (skills) => {
    const obj = {};
    Object.keys(skills || {}).forEach((skill) => {
      const score = skills[skill] || 0;
      obj[skill] = {
        average_score: score,
        proficiency_level:
          score >= 70
            ? "Proficient"
            : score >= 40
              ? "Developing"
              : "Needs Improvement",
        questions_tested: 0,
      };
    });
    return obj;
  };

  // Use useMemo to ensure data is properly computed when session changes
  const data = useMemo(() => {
    const skillAnalysis = convertSkills(session?.skill_analysis?.skill_averages || {});

    return {
      domain: session?.domain || "Unknown",
      session_number: session?.session_number || 1,
      session_stats: session?.detailed_summary?.session_stats || {
        total_questions: 0,
        questions_answered: 0,
        mcq_attempted: 0,
        voice_attempted: 0,
        coding_attempted: 0,
        overall_average: session?.score > 10 ? Math.round(session?.score) : Math.round((session?.score || 0) * 10),
      },
      skill_analysis: skillAnalysis,
      top_skills: session?.skill_analysis?.stronger_skills || [],
      weak_skills: session?.skill_analysis?.weaker_skills || [],
      voice_insights: session?.detailed_summary?.voice_insights || null,
      recommendations: session?.detailed_summary?.recommendations || {
        suggested_difficulty: "NA",
        next_steps: [],
      },
    };
  }, [session]);

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">

      {/* MAIN MODAL */}
      <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-fadeIn">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 z-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-6">

          {/* ----------------------------------------------
              HEADER (Matches Commented Version)
          ---------------------------------------------- */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {data.domain} Assessment Report
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Session #{data.session_number}
                </p>
              </div>
              <Award className="w-10 h-10 text-indigo-500" />
            </div>
          </div>

          {/* ----------------------------------------------
              KEY METRICS
          ---------------------------------------------- */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Overall Score */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                <span className={`text-2xl font-bold ${getScoreColor(data.session_stats.overall_average)}`}>
                  {data.session_stats.overall_average/5 * 100}%
                </span>
              </div>
              <p className="text-xs text-gray-600">Overall Score</p>
            </div>

            {/* Completion */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-gray-900">
                  {data.session_stats.questions_answered}/{data.session_stats.total_questions}
                </span>
              </div>
              <p className="text-xs text-gray-600">Completed</p>
            </div>

            {/* MCQ */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold text-gray-900">
                  {data.session_stats.mcq_attempted}
                </span>
              </div>
              <p className="text-xs text-gray-600">MCQ</p>
            </div>

            {/* Coding */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <Code className="w-5 h-5 text-purple-500" />
                <span className="text-2xl font-bold text-gray-900">
                  {data.session_stats.coding_attempted}
                </span>
              </div>
              <p className="text-xs text-gray-600">Coding</p>
            </div>
          </div>

          {/* ----------------------------------------------
              TOP & WEAK SKILLS (Matches Commented UI)
          ---------------------------------------------- */}
          <div className="grid lg:grid-cols-2 gap-4">

            {/* Top Skills */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Top Skills</h3>
              </div>

              {data.top_skills.length === 0 ? (
                <p className="text-gray-500 text-sm">No strong skills detected</p>
              ) : (
                data.top_skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{skill}</span>
                    <span className="font-semibold text-green-600">
                      {data.skill_analysis[skill]?.average_score.toFixed(1) || 0}%
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Weak Skills */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">Needs Attention</h3>
              </div>

              {data.weak_skills.length === 0 ? (
                <p className="text-gray-500 text-sm">No weak skills detected</p>
              ) : (
                data.weak_skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{skill}</span>
                    <span className="font-semibold text-red-600">
                      {data.skill_analysis[skill]?.average_score.toFixed(1) || 0}%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ----------------------------------------------
              SKILL BREAKDOWN
          ---------------------------------------------- */}
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

          {/* ----------------------------------------------
              VOICE INSIGHTS
          ---------------------------------------------- */}
          {data.voice_insights && (
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
                {data.voice_insights.recommendations?.map((rec, idx) => (
                  <p key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    {rec}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* ----------------------------------------------
              LEARNING PATH (Gradient Section)
          ---------------------------------------------- */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-semibold">Your Learning Path</h3>
            </div>

            <p className="text-sm text-indigo-100 mb-3">
              Suggested Level:{" "}
              <span className="font-semibold">{data.recommendations.suggested_difficulty}</span>
            </p>

            <div className="space-y-2">
              {data.recommendations.next_steps?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-white">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentSession;
