import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock, Award, TrendingUp, Mic, BarChart3, Brain } from 'lucide-react';

const TestResultsDashboard = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const data = {
    type: "success",
    domain: "ai_ml",
    message: "Test submitted successfully",
    results: [
      {
        qid: "q_ai_0035",
        question_type: "coding",
        evaluation: {
          success: true,
          result: {
            question_id: "q_ai_0035",
            question_text: "Write a Python function that takes a NumPy array and normalizes it using Min-Max scaling to the range [0, 1].",
            score: 0,
            grade: "F",
            performance_summary: {
              key_concepts: "0/3 covered (0.0%)",
              examples: "0/0 provided (0.0%)",
              word_count: "6/0 words",
              criteria_score: "0.0%"
            },
            detailed_feedback: {
              overall_assessment: "Your answer needs significant improvement. Review the missing content below.",
              strengths: ["✓ Adequate answer length (6 words)"],
              areas_for_improvement: [
                {
                  area: "Missing Key Concepts",
                  count: 3,
                  details: [
                    {
                      point: "Min-Max formula: (x - min) / (max - min)",
                      importance: "Required",
                      suggestion: "Include this key concept in your answer"
                    },
                    {
                      point: "Handle edge case of constant array",
                      importance: "Required",
                      suggestion: "Include this key concept in your answer"
                    },
                    {
                      point: "Use NumPy operations for efficiency",
                      importance: "Required",
                      suggestion: "Include this key concept in your answer"
                    }
                  ]
                }
              ]
            },
            criteria_performance: [
              {
                criterion: "Correctness",
                score: 0,
                weight: 0.5,
                weighted_score: 0,
                feedback: "Overall performance on this criterion"
              },
              {
                criterion: "Code Quality",
                score: 0,
                weight: 0.25,
                weighted_score: 0,
                feedback: "Overall performance on this criterion"
              },
              {
                criterion: "Edge Cases",
                score: 0,
                weight: 0.25,
                weighted_score: 0,
                feedback: "Overall performance on this criterion"
              }
            ]
          }
        }
      },
      {
        qid: "q_ai_0001",
        question_type: "multiple-choice",
        evaluation: {
          correct: true,
          score: 10,
          expected_answer: "Data with labeled output/target variables",
          user_answer: "Data with labeled output/target variables"
        }
      },
      {
        qid: "q_ai_0023",
        question_type: "multiple-choice",
        evaluation: {
          correct: false,
          score: 0,
          expected_answer: "To tune hyperparameters and prevent overfitting during training.",
          user_answer: "To calculate the final, unbiased performance metric."
        }
      },
      {
        qid: "q_ai_0033",
        question_type: "voice",
        evaluation: {
          voice_analysis: {
            success: true,
            result: {
              silence_metrics: {
                silence_ratio_percent: 54.2,
                speech_ratio_percent: 45.8,
                total_duration_seconds: 10
              },
              speech_rate: {
                words_per_minute_actual: 170.31,
                actual_word_count: 13
              },
              pitch_variation: {
                mean_pitch_hz: 173.28,
                pitch_variation_percent: 16.15
              },
              clarity: {
                clarity_score_percent: 98.05
              },
              confidence: {
                confidence_score_percent: 41.31
              },
              transcription: {
                transcript: "hello welcome to my YouTube channel this is a Whisper audio thank you",
                word_count: 13
              }
            }
          }
        }
      },
      {
        qid: "q_ai_0024",
        question_type: "multiple-choice",
        evaluation: {
          correct: false,
          score: 0,
          expected_answer: "Series",
          user_answer: "Panel"
        }
      }
    ],
    metadata: {
      totalQuestions: 5,
      answeredCount: 5,
      completedAt: "2025-12-06T07:26:02.681Z",
      timeRemaining: "44:17"
    }
  };

  const totalScore = data.results.reduce((sum, r) => {
    if (r.question_type === 'coding') return sum + r.evaluation.result.score;
    return sum + (r.evaluation.score || 0);
  }, 0);

  const maxScore = data.metadata.totalQuestions * 10;
  const percentage = ((totalScore / maxScore) * 100).toFixed(1);

  const getQuestionIcon = (type) => {
    switch(type) {
      case 'coding': return <Brain className="w-5 h-5" />;
      case 'voice': return <Mic className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getStatusColor = (correct, score) => {
    if (correct === true || score > 0) return 'text-green-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">AI/ML Test Results</h1>
              <p className="text-gray-600">Domain: {data.domain.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-indigo-600">{percentage}%</div>
              <div className="text-gray-600 text-sm mt-1">Overall Score</div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs">Total Score</p>
                  <p className="text-xl font-bold">{totalScore}/{maxScore}</p>
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
          {data.results.map((result, idx) => (
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
                {result.question_type === 'coding' ? (
                  <span className={`text-2xl font-bold ${getStatusColor(false, result.evaluation.result.score)}`}>
                    {result.evaluation.result.grade}
                  </span>
                ) : result.question_type === 'voice' ? (
                  <span className="text-2xl font-bold text-blue-500">
                    {result.evaluation.voice_analysis.result.confidence.confidence_score_percent.toFixed(0)}%
                  </span>
                ) : (
                  result.evaluation.correct ? 
                    <CheckCircle className="w-8 h-8 text-green-500" /> : 
                    <XCircle className="w-8 h-8 text-red-500" />
                )}
              </div>

              {result.question_type === 'coding' && (
                <div>
                  <p className="text-gray-700 text-sm mb-3">{result.evaluation.result.question_text}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                      {result.evaluation.result.performance_summary.key_concepts}
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
                      Score: {result.evaluation.result.score}%
                    </span>
                  </div>
                </div>
              )}

              {result.question_type === 'multiple-choice' && (
                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Your Answer</p>
                    <p className="text-sm text-gray-800">{result.evaluation.user_answer}</p>
                  </div>
                  {!result.evaluation.correct && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Correct Answer</p>
                      <p className="text-sm text-green-800">{result.evaluation.expected_answer}</p>
                    </div>
                  )}
                </div>
              )}

              {result.question_type === 'voice' && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 italic">"{result.evaluation.voice_analysis.result.transcription.transcript}"</p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-xs text-gray-600">Clarity</p>
                      <p className="text-lg font-bold text-blue-600">
                        {result.evaluation.voice_analysis.result.clarity.clarity_score_percent.toFixed(0)}%
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2">
                      <p className="text-xs text-gray-600">WPM</p>
                      <p className="text-lg font-bold text-purple-600">
                        {result.evaluation.voice_analysis.result.speech_rate.words_per_minute_actual.toFixed(0)}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50" onClick={() => setSelectedQuestion(null)}>
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
                {selectedQuestion.question_type === 'coding' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Question</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedQuestion.evaluation.result.question_text}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Performance Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Grade</p>
                          <p className="text-3xl font-bold text-blue-600">{selectedQuestion.evaluation.result.grade}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Score</p>
                          <p className="text-3xl font-bold text-purple-600">{selectedQuestion.evaluation.result.score}%</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Criteria Performance</h3>
                      {selectedQuestion.evaluation.result.criteria_performance.map((criteria, idx) => (
                        <div key={idx} className="mb-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{criteria.criterion}</span>
                            <span className="text-sm text-gray-600">{criteria.score}% (Weight: {criteria.weight * 100}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{width: `${criteria.score}%`}}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Feedback</h3>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <p className="text-gray-800">{selectedQuestion.evaluation.result.detailed_feedback.overall_assessment}</p>
                      </div>

                      {selectedQuestion.evaluation.result.detailed_feedback.strengths.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                          {selectedQuestion.evaluation.result.detailed_feedback.strengths.map((s, i) => (
                            <p key={i} className="text-green-600 text-sm">{s}</p>
                          ))}
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium text-red-700 mb-2">Missing Key Concepts</h4>
                        {selectedQuestion.evaluation.result.detailed_feedback.areas_for_improvement[0].details.map((detail, i) => (
                          <div key={i} className="bg-red-50 p-3 rounded-lg mb-2">
                            <p className="font-medium text-red-800 text-sm">{detail.point}</p>
                            <p className="text-red-600 text-xs mt-1">{detail.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedQuestion.question_type === 'voice' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Transcription</h3>
                      <p className="text-gray-700 italic">"{selectedQuestion.evaluation.voice_analysis.result.transcription.transcript}"</p>
                      <p className="text-sm text-gray-600 mt-2">Word Count: {selectedQuestion.evaluation.voice_analysis.result.transcription.word_count}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Clarity</p>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedQuestion.evaluation.voice_analysis.result.clarity.clarity_score_percent.toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Confidence</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedQuestion.evaluation.voice_analysis.result.confidence.confidence_score_percent.toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">WPM</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {selectedQuestion.evaluation.voice_analysis.result.speech_rate.words_per_minute_actual.toFixed(0)}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Speech Ratio</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {selectedQuestion.evaluation.voice_analysis.result.silence_metrics.speech_ratio_percent.toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Pitch (Hz)</p>
                        <p className="text-2xl font-bold text-pink-600">
                          {selectedQuestion.evaluation.voice_analysis.result.pitch_variation.mean_pitch_hz.toFixed(0)}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Duration</p>
                        <p className="text-2xl font-bold text-indigo-600">
                          {selectedQuestion.evaluation.voice_analysis.result.silence_metrics.total_duration_seconds}s
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedQuestion.question_type === 'multiple-choice' && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${selectedQuestion.evaluation.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedQuestion.evaluation.correct ? 
                          <CheckCircle className="w-6 h-6 text-green-600" /> : 
                          <XCircle className="w-6 h-6 text-red-600" />
                        }
                        <h3 className={`font-semibold ${selectedQuestion.evaluation.correct ? 'text-green-800' : 'text-red-800'}`}>
                          {selectedQuestion.evaluation.correct ? 'Correct Answer' : 'Incorrect Answer'}
                        </h3>
                      </div>
                      <p className={`text-sm ${selectedQuestion.evaluation.correct ? 'text-green-700' : 'text-red-700'}`}>
                        Score: {selectedQuestion.evaluation.score}/10
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Your Answer</h4>
                      <p className="text-gray-800">{selectedQuestion.evaluation.user_answer}</p>
                    </div>

                    {!selectedQuestion.evaluation.correct && (
                      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                        <h4 className="font-medium text-green-700 mb-2">Correct Answer</h4>
                        <p className="text-green-800">{selectedQuestion.evaluation.expected_answer}</p>
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