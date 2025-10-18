import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { uploadResume } from '../api/setup';

const ResumeUpload = ({ onComplete }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const ALLOWED_EXTENSIONS = ['.pdf'];

    const validateFile = (file) => {
        if (!file) {
            return { valid: false, error: 'No file selected' };
        }

        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

        if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(fileExtension)) {
            return { valid: false, error: 'Only PDF and  files are allowed' };
        }

        if (file.size > MAX_FILE_SIZE) {
            return { valid: false, error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB` };
        }

        return { valid: true };
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleUpload = async (file) => {
        setIsUploading(true);
        setUploadProgress(0);
        setUploadStatus(null);

        try {
            const result = await uploadResume(file, (progress) => {
                setUploadProgress(progress);
            });

            if (result.success) {
                setIsUploading(false);
                setUploadStatus('success');
                setUploadedFile({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: result.data
                });
                showSuccessToast();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            setIsUploading(false);
            setUploadStatus('error');
            const errorMsg = error.message || 'Upload failed. Please try again.';
            setErrorMessage(errorMsg);
            showErrorToast(errorMsg);
        }
    };

    const handleFileSelect = (file) => {
        const validation = validateFile(file);

        if (!validation.valid) {
            setUploadStatus('error');
            setErrorMessage(validation.error);
            showErrorToast(validation.error);
            return;
        }

        handleUpload(file);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setUploadProgress(0);
        setUploadStatus(null);
        setErrorMessage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const showSuccessToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const showErrorToast = (message) => {
        setErrorMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setUploadStatus(null);
        }, 3000);
    };

    return (
        <div className="min-h-screen from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
            {showToast && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 ${uploadStatus === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                    } animate-slide-in`}>
                    {uploadStatus === 'success' ? (
                        <>
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-semibold">Resume uploaded successfully!</span>
                        </>
                    ) : (
                        <>
                            <XCircle className="w-6 h-6" />
                            <span className="font-semibold">{errorMessage}</span>
                        </>
                    )}
                    <button onClick={() => setShowToast(false)} className="ml-2">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="w-full max-w-6xl p-8 md:p-12">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                        <Upload className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Your Resume</h2>
                    <p className="text-gray-600">Drop your PDF file here, or click to browse</p>
                </div>

                <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-3 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-300 ${isDragging
                        ? 'border-blue-500 bg-blue-50 scale-105'
                        : uploadStatus === 'error'
                            ? 'border-red-400 bg-red-50 shake'
                            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileInputChange}
                        className="hidden"
                    />

                    {!uploadedFile && !isUploading && (
                        <div className="text-center">
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 ${isDragging ? 'bg-blue-100 scale-110' : 'bg-gray-200'
                                }`}>
                                <Upload className={`w-10 h-10 transition-colors duration-300 ${isDragging ? 'text-blue-600' : 'text-gray-500'
                                    }`} />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {isDragging ? 'Drop your file here' : 'Drag & drop your resume'}
                            </h3>

                            <p className="text-gray-600 mb-6">or</p>

                            <button
                                onClick={handleBrowseClick}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Select File
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                                <AlertCircle className="w-4 h-4" />
                                <span>Supported formats: PDF (Max 5MB)</span>
                            </div>
                        </div>
                    )}

                    {isUploading && (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 animate-pulse">
                                <FileText className="w-10 h-10 text-blue-600" />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Uploading...</h3>

                            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 rounded-full"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>

                            <p className="text-sm font-semibold text-gray-700">{uploadProgress}%</p>
                        </div>
                    )}

                    {uploadedFile && uploadStatus === 'success' && (
                        <div className="text-center animate-fade-in">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Complete!</h3>

                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-800 break-all">{uploadedFile.name}</p>
                                            <p className="text-sm text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleRemoveFile}
                                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={handleRemoveFile}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                                >
                                    Upload Another
                                </button>
                                <button
                                    onClick={() => onComplete(uploadedFile.data)}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        File Requirements
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>Accepted formats: PDF </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>Maximum file size: 5MB</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>Ensure your resume is well-formatted and up-to-date</span>
                        </li>
                    </ul>
                </div>
            </div>

            <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
        </div>
    );
};

export default ResumeUpload;