import React, { useState, useEffect, useRef } from 'react';
import { Clock, Brain, Target, ChevronRight, Lightbulb, RotateCcw, CheckCircle, XCircle, ChevronLeft, Mic, Square, Send } from 'lucide-react';
import { Download, AlertCircle } from 'lucide-react';

const Waveform = ({ stream, isRecording }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const analyserRef = useRef(null);
    const audioContextRef = useRef(null);

    useEffect(() => {
        if (!stream || !isRecording) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        // Create audio context and analyser
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth * 2; // Retina display
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyserRef.current.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgb(249, 250, 251)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / 2 / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * (canvas.height / 2);

                const gradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height / 2 - barHeight);
                gradient.addColorStop(0, 'rgb(59, 130, 246)');
                gradient.addColorStop(1, 'rgb(147, 51, 234)');
                ctx.fillStyle = gradient;

                ctx.fillRect(x, canvas.height / 2 - barHeight / 2, barWidth, barHeight);
                x += barWidth + 1;
            }
        };

        draw();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [stream, isRecording]);

    return <canvas ref={canvasRef} className="w-full h-24 rounded-lg" />;
};

const VoiceRecorder = ({ onRecordingComplete, answer, maxDuration = 300 }) => {
    const [status, setStatus] = useState(answer ? 'stopped' : 'ready'); // ready, recording, stopped
    const [audioURL, setAudioURL] = useState(answer || null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [error, setError] = useState('');

    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const streamRef = useRef(null);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const startRecording = async () => {
        try {
            setError('');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm'
            });
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
                onRecordingComplete?.(url, blob);

                // Stop all tracks
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }
            };

            mediaRecorder.start();
            setStatus('recording');
            setRecordingTime(0);

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => {
                    const newTime = prev + 1;
                    // Auto-stop at max duration
                    if (newTime >= maxDuration) {
                        stopRecording();
                        return maxDuration;
                    }
                    return newTime;
                });
            }, 1000);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            setError('Unable to access microphone. Please check your browser permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setStatus('stopped');

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const reRecord = () => {
        if (audioURL) {
            URL.revokeObjectURL(audioURL);
        }
        setAudioURL(null);
        setStatus('ready');
        setRecordingTime(0);
        setError('');
        onRecordingComplete?.(null, null);
    };

    const downloadRecording = () => {
        if (audioURL) {
            const a = document.createElement('a');
            a.href = audioURL;
            a.download = `voice-recording-${Date.now()}.webm`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (audioURL && !answer) {
                URL.revokeObjectURL(audioURL);
            }
        };
    }, [audioURL, answer]);

    return (
        <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full transition-all ${status === 'recording'
                            ? 'bg-red-500 animate-pulse'
                            : 'bg-gradient-to-br from-blue-500 to-purple-500'
                            }`}>
                            <Mic className="text-white" size={20} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Voice Answer</h4>
                            <p className="text-xs text-gray-600">
                                {status === 'ready' && 'Click to start recording'}
                                {status === 'recording' && 'Recording in progress...'}
                                {status === 'stopped' && 'Recording complete'}
                            </p>
                        </div>
                    </div>

                    {/* Timer */}
                    {(status === 'recording' || status === 'stopped') && (
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                            {status === 'recording' && (
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                            <span className="text-lg font-mono font-bold text-gray-800">
                                {formatTime(recordingTime)}
                            </span>
                            {maxDuration && (
                                <span className="text-xs text-gray-500">
                                    / {formatTime(maxDuration)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                {/* Waveform Visualization */}
                {status === 'recording' && (
                    <div className="mb-4 bg-white rounded-xl p-4 border border-purple-100">
                        <Waveform stream={streamRef.current} isRecording={true} />
                    </div>
                )}

                {/* Audio Playback */}
                {status === 'stopped' && audioURL && (
                    <div className="mb-4 p-4 bg-white rounded-xl border border-green-200">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="text-green-500" size={18} />
                            <span className="font-medium text-gray-700 text-sm">Recording Saved</span>
                        </div>
                        <audio
                            src={audioURL}
                            controls
                            className="w-full h-10 rounded-lg"
                        >
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}

                {/* Placeholder when ready */}
                {status === 'ready' && !audioURL && (
                    <div className="mb-4 p-6 bg-white rounded-xl border-2 border-dashed border-purple-200 text-center">
                        <Mic className="mx-auto mb-2 text-purple-400" size={32} />
                        <p className="text-sm text-gray-600">No recording yet</p>
                    </div>
                )}

                {/* Controls */}
                <div className="space-y-2">
                    {status === 'ready' && (
                        <button
                            onClick={startRecording}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            <Mic size={20} />
                            Start Recording
                        </button>
                    )}

                    {status === 'recording' && (
                        <button
                            onClick={stopRecording}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            <Square size={20} />
                            Stop Recording
                        </button>
                    )}

                    {status === 'stopped' && audioURL && (
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={downloadRecording}
                                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-600 shadow-md hover:shadow-lg transition-all active:scale-95"
                            >
                                <Download size={18} />
                                Download
                            </button>

                            <button
                                onClick={reRecord}
                                className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-700 shadow-md hover:shadow-lg transition-all active:scale-95"
                            >
                                <RotateCcw size={18} />
                                Re-record
                            </button>
                        </div>
                    )}
                </div>

                {/* Status Indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className={`w-2 h-2 rounded-full ${status === 'recording' ? 'bg-red-500 animate-pulse' :
                        status === 'stopped' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                    <span className="capitalize">{status}</span>
                </div>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 text-center">
                Requires microphone access • Supported on Chrome, Firefox, Safari, Edge
                {maxDuration && ` • Max duration: ${formatTime(maxDuration)}`}
            </p>
        </div>
    );
};
// // Voice Recorder Component
// const VoiceRecorder = ({ onRecordingComplete, answer }) => {
//     const [isRecording, setIsRecording] = useState(false);
//     const [audioURL, setAudioURL] = useState(answer || null);
//     const [recordingTime, setRecordingTime] = useState(0);
//     const mediaRecorderRef = useRef(null);
//     const chunksRef = useRef([]);
//     const timerRef = useRef(null);

//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             mediaRecorderRef.current = new MediaRecorder(stream);
//             chunksRef.current = [];

//             mediaRecorderRef.current.ondataavailable = (e) => {
//                 if (e.data.size > 0) {
//                     chunksRef.current.push(e.data);
//                 }
//             };

//             mediaRecorderRef.current.onstop = () => {
//                 const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
//                 const url = URL.createObjectURL(blob);
//                 setAudioURL(url);
//                 onRecordingComplete(url);
//                 stream.getTracks().forEach(track => track.stop());
//             };

//             mediaRecorderRef.current.start();
//             setIsRecording(true);
//             setRecordingTime(0);

//             timerRef.current = setInterval(() => {
//                 setRecordingTime(prev => prev + 1);
//             }, 1000);
//         } catch (error) {
//             console.error('Error accessing microphone:', error);
//             alert('Unable to access microphone. Please check permissions.');
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current && isRecording) {
//             mediaRecorderRef.current.stop();
//             setIsRecording(false);
//             if (timerRef.current) {
//                 clearInterval(timerRef.current);
//             }
//         }
//     };

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//     };

//     useEffect(() => {
//         return () => {
//             if (timerRef.current) {
//                 clearInterval(timerRef.current);
//             }
//         };
//     }, []);

//     return (
//         <div className="space-y-3">
//             <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
//                 <div className="flex items-center justify-between mb-3">
//                     <h4 className="font-semibold text-gray-700 text-sm">Voice Answer</h4>
//                     {isRecording && (
//                         <div className="flex items-center gap-2">
//                             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//                             <span className="text-sm font-mono text-gray-700">{formatTime(recordingTime)}</span>
//                         </div>
//                     )}
//                 </div>

//                 <div className="flex gap-3 items-center">
//                     {!isRecording ? (
//                         <button
//                             onClick={startRecording}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all shadow hover:shadow-md active:scale-95"
//                         >
//                             <Mic size={18} />
//                             Start Recording
//                         </button>
//                     ) : (
//                         <button
//                             onClick={stopRecording}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow hover:shadow-md active:scale-95"
//                         >
//                             <Square size={18} />
//                             Stop Recording
//                         </button>
//                     )}
//                 </div>

//                 {audioURL && !isRecording && (
//                     <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
//                         <div className="flex items-center gap-2 mb-2">
//                             <CheckCircle className="text-green-500" size={18} />
//                             <span className="font-medium text-gray-700 text-sm">Recording Complete</span>
//                         </div>
//                         <audio controls src={audioURL} className="w-full h-8">
//                             Your browser does not support the audio element.
//                         </audio>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// Answer Input Component
const AnswerInput = ({ question, answer, onChange }) => {
    if (question.question_type === 'subjective') {
        const maxChars = question.max_chars || 600;

        return (
            <div className="space-y-2">
                <textarea
                    value={answer || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-36 p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-gray-700"
                    maxLength={maxChars}
                    aria-label="Answer input"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>{answer?.length || 0} / {maxChars} characters</span>
                </div>
            </div>
        );
    }

    if (question.question_type === 'multiple-choice') {
        return (
            <div className="space-y-2.5">
                {question.options?.map((option, idx) => (
                    <label
                        key={idx}
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${answer === option
                            ? 'border-blue-500 bg-blue-50 shadow-sm'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
                            }`}
                    >
                        <input
                            type="radio"
                            name="mcq-answer"
                            value={option}
                            checked={answer === option}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-400"
                            aria-label={`Option ${idx + 1}: ${option}`}
                        />
                        <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        );
    }

    if (question.question_type === 'coding') {
        const starterCode = question.starter_code || '// Write your code here\n';

        return (
            <div className="border border-gray-300 rounded-xl overflow-hidden">
                <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between">
                    <span className="text-sm text-gray-300 font-mono">solution.js</span>
                    <span className="text-xs text-gray-400">JavaScript</span>
                </div>
                <textarea
                    value={answer || starterCode}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-56 p-4 bg-gray-900 text-green-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    placeholder="// Write your code here..."
                    aria-label="Code editor"
                />
            </div>
        );
    }

    if (question.question_type === 'voice-based' || question.question_type === 'voice') {
        return <VoiceRecorder answer={answer} onRecordingComplete={onChange} />;
    }

    return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-yellow-800 text-sm">Unsupported question type: {question.question_type}</p>
        </div>
    );
};

// Question Card Component
const QuestionCard = ({ question, answer, onChange, showHint, currentIndex, totalQuestions }) => {
    const getDifficultyColor = (label) => {
        switch (label) {
            case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const questionTypeLabel = {
        "multiple-choice": "MCQ",
        "subjective": "Text",
        "coding": "Coding",
        "voice-based": "Voice",
        "voice": "Voice"
    }[question.question_type] || "Question";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
            {/* Question Number */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500">Question {currentIndex + 1} of {totalQuestions}</span>
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(question.difficulty_label)}`}>
                        {question.difficulty_label}
                    </span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                        {questionTypeLabel}
                    </span>
                </div>
            </div>

            {/* Question Text */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
                    {question.text}
                </h2>
            </div>

            {/* Metadata */}
            {(question.tags?.length > 0 || question.topic) && (
                <div className="flex items-center gap-2 flex-wrap text-xs">
                    {question.topic && (
                        <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg border border-purple-200">
                            {question.topic}
                        </span>
                    )}
                    {question.tags?.map((tag, index) => (
                        <span key={index} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-200">
                            {tag}
                        </span>
                    ))}
                    {question.estimated_time_sec && (
                        <span className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg border border-orange-200 ml-auto">
                            ⏱ {Math.ceil(question.estimated_time_sec / 60)} min
                        </span>
                    )}
                </div>
            )}

            {/* Answer Input */}
            <div className="pt-2">
                <AnswerInput
                    question={question}
                    answer={answer}
                    onChange={onChange}
                />
            </div>

            {/* Hint Section */}
            {showHint && question.hints && question.hints.length > 0 && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                        <Lightbulb className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">Hint</h4>
                            <p className="text-gray-700 text-sm">{question.hints[0]}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Progress Sidebar
const ProgressSidebar = ({ currentIndex, totalQuestions, answers, timeRemaining, questions }) => {
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    const answeredCount = Object.keys(answers).length;

    return (
        <div className="space-y-4">
            {/* Timer */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                    <Clock size={20} />
                    <span className="font-semibold text-sm">Time Remaining</span>
                </div>
                <div className="text-3xl font-bold mt-2">{timeRemaining}</div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Target size={20} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-800 text-sm">Progress</h3>
                </div>

                <div className="space-y-3">
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Question {currentIndex + 1} of {totalQuestions}</span>
                        <span className="font-semibold text-gray-800">{Math.round(progress)}%</span>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Answered</span>
                            <span className="text-xl font-bold text-green-600">{answeredCount}/{totalQuestions}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Question Navigation */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <Brain size={20} className="text-purple-600" />
                    <h3 className="font-semibold text-gray-800 text-sm">Questions</h3>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, idx) => {
                        const questionId = q.question?._id || q._id;
                        const isAnswered = answers[questionId];

                        return (
                            <div
                                key={idx}
                                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${idx === currentIndex
                                    ? 'bg-blue-500 text-white shadow-sm'
                                    : isAnswered
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                                    }`}
                            >
                                {idx + 1}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Success Modal
const SuccessModal = ({ onClose, sessionData }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-scale-in">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Interview Completed!</h2>
                    <p className="text-gray-600">Great job completing the session. Your responses have been recorded.</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Questions</span>
                        <span className="font-semibold text-gray-800">{sessionData.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Answered</span>
                        <span className="font-semibold text-green-600">{sessionData.answeredCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-semibold text-blue-600">{Math.round((sessionData.answeredCount / sessionData.totalQuestions) * 100)}%</span>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow hover:shadow-md"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const InterviewSessionUI = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showHint, setShowHint] = useState(false);
    const [hintsUsed, setHintsUsed] = useState({});
    const [timeRemaining, setTimeRemaining] = useState('45:00');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Fetch Questions from API
    useEffect(() => {
        let alreadyRun = false;

        const fetchQuestions = async () => {
            if (alreadyRun) return;
            alreadyRun = true;

            try {
                console.log("📡 Fetching interview questions...");
                const response = await fetch(
                    "http://localhost:3000/api/interview/ai_ml",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("✅ API Response:", data);
                setQuestions(data.data.result.questions_recommended);
            } catch (error) {
                console.error("❌ Error fetching questions:", error);
                alert("Failed to load questions. Please try again.");
            }
        };

        fetchQuestions();
    }, []);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                const [mins, secs] = prev.split(':').map(Number);
                const totalSecs = mins * 60 + secs - 1;
                if (totalSecs <= 0) return '00:00';
                return `${String(Math.floor(totalSecs / 60)).padStart(2, '0')}:${String(totalSecs % 60).padStart(2, '0')}`;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading interview questions...</p>
                </div>
            </div>
        );
    }

    const currentQuestionData = questions[currentQuestionIndex];
    const currentQuestion = currentQuestionData.question || currentQuestionData;
    const totalQuestions = questions.length;

    const handleAnswerChange = (value) => {
        const questionId = currentQuestion._id;
        setAnswers({ ...answers, [questionId]: value });
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setShowHint(false);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowHint(false);
        }
    };

    const handleSubmit = () => {
        const sessionData = {
            totalQuestions,
            answeredCount: Object.keys(answers).length,
            answers,
            hintsUsed,
            completedAt: new Date().toISOString(),
            timeRemaining
        };

        console.log('=== INTERVIEW SESSION DATA ===');
        console.log(JSON.stringify(sessionData, null, 2));
        console.log('=============================');

        setShowSuccessModal(true);
    };

    const handleRepeat = () => {
        const questionId = currentQuestion._id;
        setAnswers({ ...answers, [questionId]: '' });
        setShowHint(false);
    };

    const handleHint = () => {
        setShowHint(true);
        const questionId = currentQuestion._id;
        setHintsUsed({ ...hintsUsed, [questionId]: true });
    };

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">Interview Session</h1>
                    <p className="text-gray-600 text-sm">Complete all questions and submit when ready</p>
                </div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Question Panel */}
                    <div className="lg:col-span-3 space-y-4">
                        <QuestionCard
                            question={currentQuestion}
                            answer={answers[currentQuestion._id] || ''}
                            onChange={handleAnswerChange}
                            showHint={showHint}
                            currentIndex={currentQuestionIndex}
                            totalQuestions={totalQuestions}
                        />

                        {/* Action Buttons */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleHint}
                                        disabled={hintsUsed[currentQuestion._id]}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${hintsUsed[currentQuestion._id]
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:shadow'
                                            }`}
                                    >
                                        <Lightbulb size={18} />
                                        {hintsUsed[currentQuestion._id] ? 'Hint Used' : 'Hint'}
                                    </button>

                                    <button
                                        onClick={handleRepeat}
                                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all text-sm shadow-sm hover:shadow"
                                    >
                                        <RotateCcw size={18} />
                                        Clear
                                    </button>
                                </div>

                                <div className="flex gap-3 ml-auto">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={isFirstQuestion}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${isFirstQuestion
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow'
                                            }`}
                                    >
                                        <ChevronLeft size={18} />
                                        Previous
                                    </button>

                                    {!isLastQuestion ? (
                                        <button
                                            onClick={handleNext}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow text-sm"
                                        >
                                            Next
                                            <ChevronRight size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all shadow-sm hover:shadow text-sm"
                                        >
                                            <Send size={18} />
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Sidebar */}
                    <div className="lg:col-span-1">
                        <ProgressSidebar
                            currentIndex={currentQuestionIndex}
                            totalQuestions={totalQuestions}
                            answers={answers}
                            timeRemaining={timeRemaining}
                            questions={questions}
                        />
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <SuccessModal
                    onClose={() => setShowSuccessModal(false)}
                    sessionData={{
                        totalQuestions,
                        answeredCount: Object.keys(answers).length
                    }}
                />
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default InterviewSessionUI;