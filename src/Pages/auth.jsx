// AuthPage.jsx (Main Component)
import { useState } from 'react';
import { SuccessModal } from '../components/SuccessModal';
import { LeftSection } from '../components/LeftSection';
import { TabButtons } from '../components/TabButtons';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { AuthFooter } from '../components/AuthFooter';
import { Notification } from '../components/Notifications';

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' }); // lowercase 'n'

    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loginErrors, setLoginErrors] = useState({});
    const [registerErrors, setRegisterErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
                setNotification({ message: 'User Login successful!', type: 'success' });
                setTimeout(() => console.log('Login successful:', loginForm), 1500);
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
                setTimeout(() => console.log('Registration successful:', registerForm), 1500);
            }, 1500);
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({ ...prev, [name]: value }));
        if (touched[name]) validateLoginForm();
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm(prev => ({ ...prev, [name]: value }));
        if (touched[name]) validateRegisterForm();
    };

    const isLoginValid = loginForm.email && loginForm.password && validateEmail(loginForm.email) && loginForm.password.length >= 6;
    const isRegisterValid = registerForm.name && registerForm.email && registerForm.password && registerForm.confirmPassword &&
        validateEmail(registerForm.email) && registerForm.password.length >= 8 &&
        registerForm.password === registerForm.confirmPassword;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-in-up { animation: slideInUp 0.4s ease-out; }
        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .success-pulse { animation: successPulse 0.6s ease-in-out; }
        .input-focus { transition: all 0.3s ease; }
        .input-focus:focus { transform: translateY(-2px); }
      `}</style>

            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={4000}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}

            {showSuccess && <SuccessModal />}

            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 slide-in-up">
                <LeftSection />

                <div className="w-full lg:w-auto lg:flex-1 max-w-md">
                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

                        {activeTab === 'login' ? (
                            <LoginForm
                                loginForm={loginForm}
                                loginErrors={loginErrors}
                                touched={touched}
                                isLoginValid={isLoginValid}
                                isLoading={isLoading}
                                handleLoginChange={handleLoginChange}
                                handleLoginSubmit={handleLoginSubmit}
                                setTouched={setTouched}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                        ) : (
                            <RegisterForm
                                registerForm={registerForm}
                                registerErrors={registerErrors}
                                touched={touched}
                                isRegisterValid={isRegisterValid}
                                isLoading={isLoading}
                                handleRegisterChange={handleRegisterChange}
                                handleRegisterSubmit={handleRegisterSubmit}
                                setTouched={setTouched}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                showConfirmPassword={showConfirmPassword}
                                setShowConfirmPassword={setShowConfirmPassword}
                                getPasswordStrengthColor={getPasswordStrengthColor}
                                getPasswordStrengthLabel={getPasswordStrengthLabel}
                                getPasswordStrength={getPasswordStrength}
                            />
                        )}

                        <AuthFooter activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
            </div>
        </div>
    );
}