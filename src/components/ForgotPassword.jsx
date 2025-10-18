// ForgotPasswordDialog.jsx
import { useState } from 'react';
import { X, Mail, Lock, ArrowRight } from 'lucide-react';
import { InputField } from './InputFields';
import { PasswordField } from './PasswordField';
import { Notification } from './Notifications';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function ForgotPasswordDialog({ isOpen, onClose }) {
    const [step, setStep] = useState(1); // 1: email, 2: otp + new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({ message: '', type: '' });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSendOTP = async () => {
        if (!email) {
            setErrors({ email: 'Email is required' });
            return;
        }
        if (!validateEmail(email)) {
            setErrors({ email: 'Invalid email format' });
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/password-reset-request`, { email });

            setNotification({
                message: response.data.msg || 'OTP sent to your email successfully!',
                type: 'success'
            });
            setStep(2);
        } catch (error) {
            setNotification({
                message: error.response?.data?.msg || 'Failed to send OTP. Please try again.',
                type: 'error'
            });
            setErrors({ email: error.response?.data?.msg || 'Failed to send OTP' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        const newErrors = {};

        if (!otp) newErrors.otp = 'OTP is required';
        if (!newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
                email,
                otp,
                newPassword
            });

            setNotification({
                message: response.data.msg || 'Password reset successfully!',
                type: 'success'
            });

            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            setNotification({
                message: error.response?.data?.msg || 'Failed to reset password. Please try again.',
                type: 'error'
            });
            setErrors({ otp: error.response?.data?.msg || 'Failed to reset password' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({});
        setNotification({ message: '', type: '' });
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={4000}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}

            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                        <p className="text-gray-600 mt-2">
                            {step === 1
                                ? 'Enter your email to receive an OTP'
                                : 'Enter OTP and your new password'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {step === 1 ? (
                            <>
                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={errors.email}
                                    touched={true}
                                    placeholder="you@example.com"
                                    icon={Mail}
                                />

                                <button
                                    onClick={handleSendOTP}
                                    disabled={isLoading}
                                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${!isLoading
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send OTP</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Enter OTP
                                    </label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength={6}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.otp
                                            ? 'border-red-300 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-blue-200'
                                            }`}
                                    />
                                    {errors.otp && (
                                        <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
                                    )}
                                </div>

                                <PasswordField
                                    label="New Password"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    error={errors.newPassword}
                                    touched={true}
                                    placeholder="Enter new password"
                                    showPassword={showNewPassword}
                                    setShowPassword={setShowNewPassword}
                                />

                                <PasswordField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={errors.confirmPassword}
                                    touched={true}
                                    placeholder="Confirm new password"
                                    showPassword={showConfirmPassword}
                                    setShowPassword={setShowConfirmPassword}
                                />

                                <button
                                    onClick={handleResetPassword}
                                    disabled={isLoading}
                                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${!isLoading
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Resetting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Reset Password</span>
                                            <Lock className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>

                    <style>{`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: scale(0.95); }
                            to { opacity: 1; transform: scale(1); }
                        }
                        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
                    `}</style>
                </div>
            </div>
        </>
    );
}