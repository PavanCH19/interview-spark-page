// import React, { useState, useEffect, useRef } from 'react';
// import { Mic, Square, Play, RotateCcw, Download, AlertCircle } from 'lucide-react';

// // Waveform Component - responds to actual audio input
// const Waveform = ({ stream, isRecording }) => {
//     const [bars, setBars] = useState(Array(30).fill(0));
//     const animationRef = useRef(null);
//     const analyserRef = useRef(null);
//     const audioContextRef = useRef(null);

//     useEffect(() => {
//         if (stream && isRecording) {
//             // Setup audio analysis
//             audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//             analyserRef.current = audioContextRef.current.createAnalyser();
//             const source = audioContextRef.current.createMediaStreamSource(stream);
//             source.connect(analyserRef.current);
//             analyserRef.current.fftSize = 64;

//             const bufferLength = analyserRef.current.frequencyBinCount;
//             const dataArray = new Uint8Array(bufferLength);

//             const animate = () => {
//                 analyserRef.current.getByteFrequencyData(dataArray);

//                 // Map audio data to bars
//                 const newBars = Array(30).fill(0).map((_, i) => {
//                     const index = Math.floor((i / 30) * bufferLength);
//                     return (dataArray[index] / 255) * 100;
//                 });

//                 setBars(newBars);
//                 animationRef.current = requestAnimationFrame(animate);
//             };

//             animate();
//         } else {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//             if (audioContextRef.current) {
//                 audioContextRef.current.close();
//             }
//             if (!isRecording) {
//                 setBars(Array(30).fill(0));
//             }
//         }

//         return () => {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//             if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
//                 audioContextRef.current.close();
//             }
//         };
//     }, [stream, isRecording]);

//     return (
//         <div className="flex items-end justify-center gap-1 h-32">
//             {bars.map((height, idx) => (
//                 <div
//                     key={idx}
//                     className="w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-75"
//                     style={{
//                         height: `${Math.max(height, 4)}%`,
//                         opacity: isRecording ? 1 : 0.3
//                     }}
//                 />
//             ))}
//         </div>
//     );
// };

// // Main Audio Capture Component
// const AudioCaptureUI = () => {
//     const [status, setStatus] = useState('ready'); // ready, recording, stopped
//     const [recordingTime, setRecordingTime] = useState(0);
//     const [audioUrl, setAudioUrl] = useState(null);
//     const [error, setError] = useState('');

//     const mediaRecorderRef = useRef(null);
//     const audioChunksRef = useRef([]);
//     const timerRef = useRef(null);
//     const streamRef = useRef(null);

//     // Format time
//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     // Start recording
//     const startRecording = async () => {
//         try {
//             setError('');
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             streamRef.current = stream;

//             const mediaRecorder = new MediaRecorder(stream);
//             mediaRecorderRef.current = mediaRecorder;
//             audioChunksRef.current = [];

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     audioChunksRef.current.push(event.data);
//                 }
//             };

//             mediaRecorder.onstop = () => {
//                 const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//                 const url = URL.createObjectURL(audioBlob);
//                 setAudioUrl(url);

//                 if (streamRef.current) {
//                     streamRef.current.getTracks().forEach(track => track.stop());
//                     streamRef.current = null;
//                 }
//             };

//             mediaRecorder.start();
//             setStatus('recording');

//             // Start timer
//             timerRef.current = setInterval(() => {
//                 setRecordingTime(prev => prev + 1);
//             }, 1000);
//         } catch (err) {
//             console.error('Error accessing microphone:', err);
//             setError('Unable to access microphone. Please check your browser permissions.');
//         }
//     };

//     // Stop recording
//     const stopRecording = () => {
//         if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//             mediaRecorderRef.current.stop();
//             setStatus('stopped');

//             if (timerRef.current) {
//                 clearInterval(timerRef.current);
//             }
//         }
//     };

//     // Re-record
//     const reRecord = () => {
//         if (audioUrl) {
//             URL.revokeObjectURL(audioUrl);
//         }
//         setStatus('ready');
//         setRecordingTime(0);
//         setAudioUrl(null);
//         setError('');
//     };

//     // Download audio
//     const downloadAudio = () => {
//         if (audioUrl) {
//             const a = document.createElement('a');
//             a.href = audioUrl;
//             a.download = `recording-${Date.now()}.webm`;
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//         }
//     };

//     // Cleanup
//     useEffect(() => {
//         return () => {
//             if (timerRef.current) {
//                 clearInterval(timerRef.current);
//             }
//             if (streamRef.current) {
//                 streamRef.current.getTracks().forEach(track => track.stop());
//             }
//             if (audioUrl) {
//                 URL.revokeObjectURL(audioUrl);
//             }
//         };
//     }, [audioUrl]);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
//             <div className="w-full max-w-2xl">
//                 {/* Card */}
//                 <div className="bg-white rounded-3xl shadow-xl p-8">
//                     {/* Header */}
//                     <div className="text-center mb-8">
//                         <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 transition-all ${status === 'recording'
//                                 ? 'bg-red-500 animate-pulse'
//                                 : 'bg-gradient-to-br from-blue-500 to-purple-500'
//                             }`}>
//                             <Mic className="text-white" size={36} />
//                         </div>
//                         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                             Record Your Answer
//                         </h1>
//                         <p className="text-gray-600">
//                             {status === 'ready' && 'Click the button below to start'}
//                             {status === 'recording' && 'Speak clearly into your microphone'}
//                             {status === 'stopped' && 'Recording complete'}
//                         </p>
//                     </div>

//                     {/* Error Message */}
//                     {error && (
//                         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//                             <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
//                             <p className="text-sm text-red-800">{error}</p>
//                         </div>
//                     )}

//                     {/* Timer */}
//                     {(status === 'recording' || status === 'stopped') && (
//                         <div className="text-center mb-6">
//                             <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full">
//                                 <span className="text-3xl font-mono font-bold">{formatTime(recordingTime)}</span>
//                             </div>
//                         </div>
//                     )}

//                     {/* Waveform */}
//                     <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
//                         <Waveform stream={streamRef.current} isRecording={status === 'recording'} />
//                         <p className="text-center text-sm text-gray-500 mt-4">
//                             {status === 'recording' ? 'Live audio visualization' : 'Waveform will appear when recording'}
//                         </p>
//                     </div>

//                     {/* Controls */}
//                     <div className="space-y-3">
//                         {status === 'ready' && (
//                             <button
//                                 onClick={startRecording}
//                                 className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all active:scale-95"
//                             >
//                                 <Mic size={24} />
//                                 Start Recording
//                             </button>
//                         )}

//                         {status === 'recording' && (
//                             <button
//                                 onClick={stopRecording}
//                                 className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all active:scale-95"
//                             >
//                                 <Square size={24} />
//                                 Stop Recording
//                             </button>
//                         )}

//                         {status === 'stopped' && audioUrl && (
//                             <div className="space-y-3">
//                                 <audio src={audioUrl} controls className="w-full rounded-lg" />

//                                 <div className="grid grid-cols-2 gap-3">
//                                     <button
//                                         onClick={downloadAudio}
//                                         className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all active:scale-95"
//                                     >
//                                         <Download size={20} />
//                                         Download
//                                     </button>

//                                     <button
//                                         onClick={reRecord}
//                                         className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all active:scale-95"
//                                     >
//                                         <RotateCcw size={20} />
//                                         Re-record
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Status Indicator */}
//                     <div className="mt-6 text-center">
//                         <div className="inline-flex items-center gap-2 text-sm text-gray-600">
//                             <div className={`w-2 h-2 rounded-full ${status === 'recording' ? 'bg-red-500 animate-pulse' :
//                                     status === 'stopped' ? 'bg-green-500' : 'bg-gray-400'
//                                 }`} />
//                             {status === 'ready' && 'Ready'}
//                             {status === 'recording' && 'Recording...'}
//                             {status === 'stopped' && 'Completed'}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <p className="text-center text-sm text-gray-500 mt-6">
//                     Requires microphone access • Chrome, Firefox, Safari, Edge
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AudioCaptureUI;


import React, { useState, useEffect, useRef } from 'react';
import { Mic, Video, Square, Play, RotateCcw, Download, AlertCircle, Camera } from 'lucide-react';

// Waveform Component - responds to actual audio input
const Waveform = ({ stream, isRecording }) => {
    const [bars, setBars] = useState(Array(30).fill(0));
    const animationRef = useRef(null);
    const analyserRef = useRef(null);
    const audioContextRef = useRef(null);

    useEffect(() => {
        if (stream && isRecording) {
            // Setup audio analysis
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 64;

            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const animate = () => {
                analyserRef.current.getByteFrequencyData(dataArray);

                // Map audio data to bars
                const newBars = Array(30).fill(0).map((_, i) => {
                    const index = Math.floor((i / 30) * bufferLength);
                    return (dataArray[index] / 255) * 100;
                });

                setBars(newBars);
                animationRef.current = requestAnimationFrame(animate);
            };

            animate();
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (!isRecording) {
                setBars(Array(30).fill(0));
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, [stream, isRecording]);

    return (
        <div className="flex items-end justify-center gap-1 h-20">
            {bars.map((height, idx) => (
                <div
                    key={idx}
                    className="w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-75"
                    style={{
                        height: `${Math.max(height, 4)}%`,
                        opacity: isRecording ? 1 : 0.3
                    }}
                />
            ))}
        </div>
    );
};

// Main Audio/Video Capture Component
const AudioVideoCaptureUI = () => {
    const [recordingMode, setRecordingMode] = useState('audio'); // 'audio' or 'video'
    const [status, setStatus] = useState('ready'); // ready, recording, stopped
    const [recordingTime, setRecordingTime] = useState(0);
    const [mediaUrl, setMediaUrl] = useState(null);
    const [error, setError] = useState('');

    const mediaRecorderRef = useRef(null);
    const mediaChunksRef = useRef([]);
    const timerRef = useRef(null);
    const streamRef = useRef(null);
    const videoPreviewRef = useRef(null);
    const videoPlaybackRef = useRef(null);

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Start recording
    const startRecording = async () => {
        try {
            setError('');
            let stream;

            if (recordingMode === 'audio') {
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            } else {
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                });

                // Show live preview
                if (videoPreviewRef.current) {
                    videoPreviewRef.current.srcObject = stream;
                }
            }

            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    mediaChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const mimeType = recordingMode === 'audio' ? 'audio/webm' : 'video/webm';
                const mediaBlob = new Blob(mediaChunksRef.current, { type: mimeType });
                const url = URL.createObjectURL(mediaBlob);
                setMediaUrl(url);

                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }

                if (videoPreviewRef.current) {
                    videoPreviewRef.current.srcObject = null;
                }
            };

            mediaRecorder.start();
            setStatus('recording');

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error('Error accessing media devices:', err);
            setError(`Unable to access ${recordingMode === 'audio' ? 'microphone' : 'camera/microphone'}. Please check your browser permissions.`);
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setStatus('stopped');

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    // Re-record
    const reRecord = () => {
        if (mediaUrl) {
            URL.revokeObjectURL(mediaUrl);
        }
        setStatus('ready');
        setRecordingTime(0);
        setMediaUrl(null);
        setError('');
    };

    // Download media
    const downloadMedia = () => {
        if (mediaUrl) {
            const a = document.createElement('a');
            a.href = mediaUrl;
            const extension = recordingMode === 'audio' ? 'webm' : 'mp4';
            a.download = `recording-${Date.now()}.${extension}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    // Switch recording mode
    const switchMode = (mode) => {
        if (status === 'ready') {
            setRecordingMode(mode);
            setError('');
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
            if (mediaUrl) {
                URL.revokeObjectURL(mediaUrl);
            }
        };
    }, [mediaUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 transition-all ${status === 'recording'
                                ? 'bg-red-500 animate-pulse'
                                : 'bg-gradient-to-br from-blue-500 to-purple-500'
                            }`}>
                            {recordingMode === 'audio' ? (
                                <Mic className="text-white" size={36} />
                            ) : (
                                <Video className="text-white" size={36} />
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Record Your Answer
                        </h1>
                        <p className="text-gray-600">
                            {status === 'ready' && `Choose ${recordingMode} mode and click start`}
                            {status === 'recording' && 'Recording in progress...'}
                            {status === 'stopped' && 'Recording complete'}
                        </p>
                    </div>

                    {/* Mode Selector */}
                    {status === 'ready' && (
                        <div className="flex gap-4 mb-6 justify-center">
                            <button
                                onClick={() => switchMode('audio')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${recordingMode === 'audio'
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Mic size={20} />
                                Audio Only
                            </button>
                            <button
                                onClick={() => switchMode('video')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${recordingMode === 'video'
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Video size={20} />
                                Video + Audio
                            </button>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Timer */}
                    {(status === 'recording' || status === 'stopped') && (
                        <div className="text-center mb-6">
                            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full">
                                <span className="text-3xl font-mono font-bold">{formatTime(recordingTime)}</span>
                            </div>
                        </div>
                    )}

                    {/* Video Preview / Playback */}
                    {recordingMode === 'video' && (
                        <div className="mb-6">
                            {status === 'recording' && (
                                <div className="relative bg-black rounded-2xl overflow-hidden">
                                    <video
                                        ref={videoPreviewRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="w-full aspect-video object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                        <span className="text-sm font-semibold">REC</span>
                                    </div>
                                </div>
                            )}
                            {status === 'stopped' && mediaUrl && (
                                <video
                                    ref={videoPlaybackRef}
                                    src={mediaUrl}
                                    controls
                                    className="w-full aspect-video bg-black rounded-2xl"
                                />
                            )}
                            {status === 'ready' && (
                                <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center">
                                    <div className="text-center">
                                        <Camera className="mx-auto mb-3 text-gray-400" size={48} />
                                        <p className="text-gray-600">Camera preview will appear here</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Waveform (for audio mode or when recording) */}
                    {recordingMode === 'audio' && (
                        <div className="mb-6 p-6 bg-gray-50 rounded-2xl">
                            <Waveform stream={streamRef.current} isRecording={status === 'recording'} />
                            <p className="text-center text-sm text-gray-500 mt-4">
                                {status === 'recording' ? 'Live audio visualization' : 'Waveform will appear when recording'}
                            </p>
                        </div>
                    )}

                    {/* Audio Playback for audio mode */}
                    {recordingMode === 'audio' && status === 'stopped' && mediaUrl && (
                        <div className="mb-6">
                            <audio src={mediaUrl} controls className="w-full rounded-lg" />
                        </div>
                    )}

                    {/* Controls */}
                    <div className="space-y-3">
                        {status === 'ready' && (
                            <button
                                onClick={startRecording}
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all active:scale-95"
                            >
                                {recordingMode === 'audio' ? <Mic size={24} /> : <Video size={24} />}
                                Start Recording
                            </button>
                        )}

                        {status === 'recording' && (
                            <button
                                onClick={stopRecording}
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all active:scale-95"
                            >
                                <Square size={24} />
                                Stop Recording
                            </button>
                        )}

                        {status === 'stopped' && mediaUrl && (
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={downloadMedia}
                                    className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all active:scale-95"
                                >
                                    <Download size={20} />
                                    Download
                                </button>

                                <button
                                    onClick={reRecord}
                                    className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all active:scale-95"
                                >
                                    <RotateCcw size={20} />
                                    Re-record
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Status Indicator */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <div className={`w-2 h-2 rounded-full ${status === 'recording' ? 'bg-red-500 animate-pulse' :
                                    status === 'stopped' ? 'bg-green-500' : 'bg-gray-400'
                                }`} />
                            {status === 'ready' && 'Ready'}
                            {status === 'recording' && 'Recording...'}
                            {status === 'stopped' && 'Completed'}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Requires {recordingMode === 'audio' ? 'microphone' : 'camera & microphone'} access • Chrome, Firefox, Safari, Edge
                </p>
            </div>
        </div>
    );
};

export default AudioVideoCaptureUI;