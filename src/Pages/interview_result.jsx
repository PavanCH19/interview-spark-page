import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, Clock, Award, TrendingUp, Mic, BarChart3, Brain, FileText, Home } from 'lucide-react';

const TestResultsDashboard = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  console.log("⚠️⚠️⚠️⚠️", location.state);
  const data = location.state || {
    type: "error",
    domain: "unknown",
    message: "No result data found",
    results: [],
    metadata: {
      totalQuestions: 0,
      answeredCount: 0,
      completedAt: new Date().toISOString(),
      timeRemaining: "00:00"
    }
  };

  const totalScore = data.results.reduce((sum, r) => {
    // Skip questions with error status and no evaluation
    if (r.status === 'error' && !r.evaluation) return sum;

    // Skip voice questions - they don't contribute to score
    if (r.question_type === 'voice') return sum;

    // For coding questions: score is in evaluation.result.score
    if (r.question_type === 'coding') {
      return sum + (r.evaluation?.result?.score || r.score || 0);
    }

    // For subjective and MCQ: score is directly in evaluation.score or top-level score
    return sum + (r.evaluation?.score || r.score || 0);
  }, 0);

  // Count only scorable questions (exclude voice questions and errors without evaluation)
  const scorableQuestions = data.results.filter(r => {
    if (r.status === 'error' && !r.evaluation) return false;
    if (r.question_type === 'voice') return false;
    return true;
  }).length;

  const maxScore = scorableQuestions * 100; // Each question is out of 100
  const percentage = maxScore > 0 ? ((totalScore / maxScore) * 100).toFixed(1) : 0;

  const getQuestionIcon = (type) => {
    switch (type) {
      case 'coding': return <Brain className="w-5 h-5" />;
      case 'voice': return <Mic className="w-5 h-5" />;
      case 'subjective': return <FileText className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getStatusColor = (correct, score) => {
    if (correct === true || score > 0) return 'text-green-500';
    return 'text-red-500';
  };

  useEffect(() => {
    console.log('this is the data from /interview |interview_results.jsx')
    console.log(data)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Test Results</h1>
              <p className="text-gray-600">Domain: {data.domain.toUpperCase()}</p>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                <Home className="w-4 h-4" />
                Back to Dashboard
              </button>
              <div>
                <div className="text-5xl font-bold text-indigo-600">{percentage}%</div>
                <div className="text-gray-600 text-sm mt-1">Overall Score</div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs">Total Score</p>
                  <p className="text-xl font-bold">{totalScore.toFixed(1)}/{maxScore}</p>
                </div>
                <Award className="w-7 h-7 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs">Questions</p>
                  <p className="text-xl font-bold">{data.metadata.answeredCount}/{data.metadata.totalQuestions}</p>
                </div>
                <CheckCircle className="w-7 h-7 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs">Time Left</p>
                  <p className="text-xl font-bold">{data.metadata.timeRemaining}</p>
                </div>
                <Clock className="w-7 h-7 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs">Pass Rate</p>
                  <p className="text-xl font-bold">{percentage}%</p>
                </div>
                <TrendingUp className="w-7 h-7 text-orange-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Questions Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {data.results.map((result) => (
            <div
              key={result.qid}
              onClick={() => setSelectedQuestion(result)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 rounded-lg p-3">
                    {getQuestionIcon(result.question_type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{result.qid}</h3>
                    <p className="text-sm text-gray-500 capitalize">{result.question_type}</p>
                  </div>
                </div>
                {/* Status/Score Display */}
                {result.status === 'error' && !result.evaluation ? (
                  <div className="text-right">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                    <p className="text-xs text-red-600 mt-1">{result.reason || 'Error'}</p>
                  </div>
                ) : result.question_type === 'coding' ? (
                  <span className={`text-2xl font-bold ${getStatusColor(false, result.evaluation?.result?.score || result.score || 0)}`}>
                    {result.evaluation?.result?.grade || result.grade || 'N/A'}
                  </span>
                ) : result.question_type === 'subjective' ? (
                  <span className={`text-2xl font-bold ${getStatusColor(false, result.evaluation?.score || result.score || 0)}`}>
                    {result.evaluation?.grade || result.grade || 'N/A'}
                  </span>
                ) : result.question_type === 'voice' ? (
                  <span className="text-2xl font-bold text-blue-500">
                    {result.evaluation?.voice_analysis?.confidence?.confidence_score_percent?.toFixed(0) || 0}%
                  </span>
                ) : (
                  (result.evaluation?.correct) ?
                    <CheckCircle className="w-8 h-8 text-green-500" /> :
                    <XCircle className="w-8 h-8 text-red-500" />
                )}
              </div>

              {(result.question_type === 'coding' || result.question_type === 'subjective') && result.evaluation && (
                <div>
                  {/* Show error if present */}
                  {result.evaluation?.result?.error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-3">
                      <p className="text-xs text-red-600 font-medium">Error</p>
                      <p className="text-sm text-red-700">{result.evaluation.result.error}</p>
                    </div>
                  )}

                  {/* Question text for subjective */}
                  {result.question_type === 'subjective' && (
                    <p className="text-gray-700 text-sm mb-3">
                      {result.evaluation?.question_text || 'No question text available'}
                    </p>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {/* Key concepts for subjective */}
                    {result.question_type === 'subjective' && result.evaluation?.performance_summary?.key_concepts && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                        {result.evaluation.performance_summary.key_concepts}
                      </span>
                    )}

                    {/* Test results for coding */}
                    {result.question_type === 'coding' && result.evaluation?.result?.passed_tests !== undefined && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        Tests: {result.evaluation.result.passed_tests}/{result.evaluation.result.total_tests}
                      </span>
                    )}

                    {/* Score */}
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
                      Score: {result.evaluation?.result?.score || result.evaluation?.score || result.score || 0}%
                    </span>
                  </div>
                </div>
              )}

              {result.question_type === 'multiple-choice' && (
                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Your Answer</p>
                    <p className="text-sm text-gray-800">{result.evaluation?.user_answer || 'N/A'}</p>
                  </div>
                  {!result.evaluation?.correct && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Correct Answer</p>
                      <p className="text-sm text-green-800">{result.evaluation?.expected_answer || 'N/A'}</p>
                    </div>
                  )}
                </div>
              )}

              {result.question_type === 'voice' && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 italic">"{result.evaluation?.voice_analysis?.transcription?.transcript || "No transcription available"}"</p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-xs text-gray-600">Clarity</p>
                      <p className="text-lg font-bold text-blue-600">
                        {result.evaluation?.voice_analysis?.clarity?.clarity_score_percent?.toFixed(0) || 0}%
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2">
                      <p className="text-xs text-gray-600">WPM</p>
                      <p className="text-lg font-bold text-purple-600">
                        {result.evaluation?.voice_analysis?.speech_rate?.words_per_minute_estimated?.toFixed(0) || 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed View Modal */}
        {selectedQuestion && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={() => setSelectedQuestion(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{selectedQuestion.qid}</h2>
                  <button onClick={() => setSelectedQuestion(null)} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2">
                    ✕
                  </button>
                </div>
                <p className="text-indigo-100 capitalize">{selectedQuestion.question_type} Question</p>
              </div>

              <div className="p-6">
                {/* Error State */}
                {selectedQuestion.status === 'error' && !selectedQuestion.evaluation && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                      <h3 className="text-xl font-bold text-red-800">Error</h3>
                    </div>
                    <p className="text-red-700">{selectedQuestion.reason || 'An error occurred processing this question.'}</p>
                  </div>
                )}

                {/* Coding & Subjective Questions */}
                {(selectedQuestion.question_type === 'coding' || selectedQuestion.question_type === 'subjective') && selectedQuestion.evaluation && (
                  <div className="space-y-6">
                    {/* Show coding error if present */}
                    {selectedQuestion.question_type === 'coding' && selectedQuestion.evaluation?.result?.error && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <h3 className="font-semibold text-red-800 mb-2">Execution Error</h3>
                        <p className="text-red-700 font-mono text-sm">{selectedQuestion.evaluation.result.error}</p>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Question</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedQuestion.evaluation?.question_text || 'N/A'}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Performance Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Grade</p>
                          <p className="text-3xl font-bold text-blue-600">
                            {selectedQuestion.question_type === 'coding'
                              ? (selectedQuestion.evaluation?.result?.grade || selectedQuestion.grade || 'N/A')
                              : (selectedQuestion.evaluation?.grade || selectedQuestion.grade || 'N/A')}
                          </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Score</p>
                          <p className="text-3xl font-bold text-purple-600">
                            {selectedQuestion.question_type === 'coding'
                              ? (selectedQuestion.evaluation?.result?.score || selectedQuestion.score || 0)
                              : (selectedQuestion.evaluation?.score || selectedQuestion.score || 0)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Test Results for Coding */}
                    {selectedQuestion.question_type === 'coding' && selectedQuestion.evaluation?.result?.test_results && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Test Results</h3>
                        <div className="space-y-2">
                          {selectedQuestion.evaluation.result.test_results.map((test, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border-2 ${test.status === 'passed' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-700">Test Case {test.case}</span>
                                {test.status === 'passed' ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-600" />
                                )}
                              </div>
                              <div className="text-sm space-y-1">
                                <p className="text-gray-600"><span className="font-medium">Input:</span> {test.input}</p>
                                <p className="text-gray-600"><span className="font-medium">Expected:</span> {test.expected}</p>
                                <p className={test.status === 'passed' ? 'text-green-700' : 'text-red-700'}>
                                  <span className="font-medium">Got:</span> {test.got || 'N/A'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Criteria Performance for Subjective only */}
                    {selectedQuestion.question_type === 'subjective' && selectedQuestion.evaluation?.criteria_performance && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Criteria Performance</h3>
                        {selectedQuestion.evaluation.criteria_performance.map((criteria, idx) => (
                          <div key={idx} className="mb-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">{criteria.criterion}</span>
                              <span className="text-sm text-gray-600">{criteria.score}% (Weight: {(criteria.weight || 0) * 100}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${criteria.score}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Feedback for Subjective only */}
                    {selectedQuestion.question_type === 'subjective' && selectedQuestion.evaluation?.detailed_feedback && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Feedback</h3>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                          <p className="text-gray-800">{selectedQuestion.evaluation.detailed_feedback.overall_assessment || 'No feedback available.'}</p>
                        </div>

                        {selectedQuestion.evaluation?.detailed_feedback?.strengths?.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                            {selectedQuestion.evaluation?.detailed_feedback?.strengths.map((s, i) => (
                              <p key={i} className="text-green-600 text-sm">{s}</p>
                            ))}
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium text-red-700 mb-2">Missing Key Concepts</h4>
                          {/* {selectedQuestion.evaluation.detailed_feedback.areas_for_improvement[0].details && selectedQuestion.evaluation.detailed_feedback.areas_for_improvement[0].details.map((detail, i) => (
                          <div key={i} className="bg-red-50 p-3 rounded-lg mb-2">
                            <p className="font-medium text-red-800 text-sm">{detail.point}</p>
                            <p className="text-red-600 text-xs mt-1">{detail.suggestion}</p>
                          </div>
                        ))} */}

                          {selectedQuestion.evaluation?.detailed_feedback?.areas_for_improvement?.length > 0 &&
                            selectedQuestion.evaluation.detailed_feedback.areas_for_improvement[0]?.details?.length > 0 ? (

                            selectedQuestion.evaluation.detailed_feedback.areas_for_improvement[0].details.map((detail, i) => (
                              <div key={i} className="bg-red-50 p-3 rounded-lg mb-2">
                                <p className="font-medium text-red-800 text-sm">{detail.point}</p>
                                <p className="text-red-600 text-xs mt-1">{detail.suggestion}</p>
                              </div>
                            ))

                          ) : (
                            <p className="text-sm text-gray-500 italic">
                              No missing key concepts identified.
                            </p>
                          )}

                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedQuestion.question_type === 'voice' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Transcription</h3>
                      <p className="text-gray-700 italic">"{selectedQuestion.evaluation?.voice_analysis?.transcription?.transcript || "No transcription available"}"</p>
                      <p className="text-sm text-gray-600 mt-2">Word Count: {selectedQuestion.evaluation?.voice_analysis?.transcription?.word_count || 0}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Clarity</p>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedQuestion.evaluation?.voice_analysis?.clarity?.clarity_score_percent?.toFixed(1) || 0}%
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Confidence</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedQuestion.evaluation?.voice_analysis?.confidence?.confidence_score_percent?.toFixed(1) || 0}%
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">WPM</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {selectedQuestion.evaluation?.voice_analysis?.speech_rate?.words_per_minute_estimated?.toFixed(0) || 0}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Speech Ratio</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {selectedQuestion.evaluation?.voice_analysis?.silence_metrics?.speech_ratio_percent?.toFixed(1) || 0}%
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Pitch (Hz)</p>
                        <p className="text-2xl font-bold text-pink-600">
                          {selectedQuestion.evaluation?.voice_analysis?.pitch_variation?.mean_pitch_hz?.toFixed(0) || 0}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Duration</p>
                        <p className="text-2xl font-bold text-indigo-600">
                          {selectedQuestion.evaluation?.voice_analysis?.speech_rate?.speaking_time_seconds?.toFixed(1) || 0}s
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedQuestion.question_type === 'multiple-choice' && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${selectedQuestion.evaluation?.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedQuestion.evaluation?.correct ?
                          <CheckCircle className="w-6 h-6 text-green-600" /> :
                          <XCircle className="w-6 h-6 text-red-600" />
                        }
                        <h3 className={`font-semibold ${selectedQuestion.evaluation?.correct ? 'text-green-800' : 'text-red-800'}`}>
                          {selectedQuestion.evaluation?.correct ? 'Correct Answer' : 'Incorrect Answer'}
                        </h3>
                      </div>
                      <p className={`text-sm ${selectedQuestion.evaluation?.correct ? 'text-green-700' : 'text-red-700'}`}>
                        Score: {selectedQuestion.evaluation?.score || 0}/10
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Your Answer</h4>
                      <p className="text-gray-800">{selectedQuestion.evaluation?.user_answer || 'N/A'}</p>
                    </div>

                    {!selectedQuestion.evaluation?.correct && (
                      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                        <h4 className="font-medium text-green-700 mb-2">Correct Answer</h4>
                        <p className="text-green-800">{selectedQuestion.evaluation?.expected_answer || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultsDashboard;