import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loginErrors, setLoginErrors] = useState({});
    const [registerErrors, setRegisterErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    };

    const getPasswordStrengthLabel = (strength) => {
        const labels = ['Weak', 'Fair', 'Good', 'Strong'];
        return labels[strength - 1] || 'Very Weak';
    };

    const getPasswordStrengthColor = (strength) => {
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
        return colors[strength - 1] || 'bg-red-500';
    };

    const validateLoginForm = () => {
        const errors = {};

        if (!loginForm.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(loginForm.email)) {
            errors.email = 'Invalid email format';
        }

        if (!loginForm.password) {
            errors.password = 'Password is required';
        } else if (loginForm.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setLoginErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateRegisterForm = () => {
        const errors = {};

        if (!registerForm.name) {
            errors.name = 'Name is required';
        } else if (registerForm.name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!registerForm.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(registerForm.email)) {
            errors.email = 'Invalid email format';
        }

        if (!registerForm.password) {
            errors.password = 'Password is required';
        } else if (registerForm.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        if (!registerForm.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (registerForm.password !== registerForm.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setRegisterErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLoginSubmit = () => {
        setTouched({ email: true, password: true });

        if (validateLoginForm()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setShowSuccess(true);
                setTimeout(() => {
                    console.log('Login successful:', loginForm);
                }, 1500);
            }, 1500);
        }
    };

    const handleRegisterSubmit = () => {
        setTouched({ name: true, email: true, password: true, confirmPassword: true });

        if (validateRegisterForm()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setShowSuccess(true);
                setTimeout(() => {
                    console.log('Registration successful:', registerForm);
                }, 1500);
            }, 1500);
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            validateLoginForm();
        }
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            validateRegisterForm();
        }
    };

    const isLoginValid = loginForm.email && loginForm.password && validateEmail(loginForm.email) && loginForm.password.length >= 6;
    const isRegisterValid = registerForm.name && registerForm.email && registerForm.password && registerForm.confirmPassword &&
        validateEmail(registerForm.email) && registerForm.password.length >= 8 &&
        registerForm.password === registerForm.confirmPassword;

    const passwordStrength = getPasswordStrength(registerForm.password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-in-up {
          animation: slideInUp 0.4s ease-out;
        }
        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .success-pulse {
          animation: successPulse 0.6s ease-in-out;
        }
        .input-focus {
          transition: all 0.3s ease;
        }
        .input-focus:focus {
          transform: translateY(-2px);
        }
      `}</style>

            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 text-center success-pulse shadow-2xl">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                        <p className="text-gray-600">Redirecting to dashboard...</p>
                    </div>
                </div>
            )}

            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 slide-in-up">
                <div className="flex-1 text-center lg:text-left">
                    <div className="mb-6">
                        <div className="inline-block p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        Smart Interview<br />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Preparation Platform
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
                        Master your interview skills with personalized practice sessions, real-time feedback, and AI-driven insights.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <div className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>Personalized Sessions</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>Real-time Feedback</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>Track Progress</span>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-auto lg:flex-1 max-w-md">
                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        <div className="flex gap-2 mb-8 bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'login'
                                    ? 'bg-white text-blue-600 shadow-md'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab('register')}
                                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'register'
                                    ? 'bg-white text-blue-600 shadow-md'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        {activeTab === 'login' ? (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={loginForm.email}
                                            onChange={handleLoginChange}
                                            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl input-focus transition-all ${touched.email && loginErrors.email
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-600'
                                                } focus:outline-none`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    {touched.email && loginErrors.email && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{loginErrors.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={loginForm.password}
                                            onChange={handleLoginChange}
                                            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                                            className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl input-focus transition-all ${touched.password && loginErrors.password
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-600'
                                                } focus:outline-none`}
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {touched.password && loginErrors.password && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{loginErrors.password}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600" />
                                        <span className="text-gray-600">Remember me</span>
                                    </label>
                                    <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        Forgot Password?
                                    </button>
                                </div>

                                <button
                                    onClick={handleLoginSubmit}
                                    disabled={!isLoginValid || isLoading}
                                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${isLoginValid && !isLoading
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Logging in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Login</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={registerForm.name}
                                            onChange={handleRegisterChange}
                                            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl input-focus transition-all ${touched.name && registerErrors.name
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-600'
                                                } focus:outline-none`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {touched.name && registerErrors.name && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{registerErrors.name}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={registerForm.email}
                                            onChange={handleRegisterChange}
                                            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl input-focus transition-all ${touched.email && registerErrors.email
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-600'
                                                } focus:outline-none`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    {touched.email && registerErrors.email && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{registerErrors.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={registerForm.password}
                                            onChange={handleRegisterChange}
                                            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                                            className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl input-focus transition-all ${touched.password && registerErrors.password
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-600'
                                                } focus:outline-none`}
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {registerForm.password && (
                                        <div className="mt-2">
                                            <div className="flex gap-1 mb-1">
                                                {[1, 2, 3, 4].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength ? getPasswordStrengthColor(passwordStrength) : 'bg-gray-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                Password strength: <span className="font-medium">{getPasswordStrengthLabel(passwordStrength)}</span>
                                            </p>
                                        </div>
                                    )}
                                    {touched.password && registerErrors.password && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{registerErrors.password}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={registerForm.confirmPassword}
                                            onChange={handleRegisterChange}
                                            onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                                            className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl input-focus transition-all ${touched.confirmPassword && registerErrors.confirmPassword
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-600'
                                                } focus:outline-none`}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {touched.confirmPassword && registerErrors.confirmPassword && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{registerErrors.confirmPassword}</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleRegisterSubmit}
                                    disabled={!isRegisterValid || isLoading}
                                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${isRegisterValid && !isLoading
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        <div className="mt-6 text-center text-sm text-gray-600">
                            {activeTab === 'login' ? (
                                <p>
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setActiveTab('register')}
                                        className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                                    >
                                        Sign up now
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setActiveTab('login')}
                                        className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                                    >
                                        Login here
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}