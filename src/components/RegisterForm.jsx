
// components/RegisterForm.jsx
import { ArrowRight, Mail, User } from 'lucide-react';
import { InputField } from './InputFields';
import { PasswordField } from './PasswordField';

export function RegisterForm({
    registerForm,
    registerErrors,
    touched,
    isRegisterValid,
    isLoading,
    handleRegisterChange,
    handleRegisterSubmit,
    setTouched,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getPasswordStrengthColor,
    getPasswordStrengthLabel,
    getPasswordStrength
}) {
    return (
        <div className="space-y-5">
            <InputField
                label="Full Name"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                error={registerErrors.name}
                touched={touched.name}
                placeholder="John Doe"
                icon={User}
            />

            <InputField
                label="Email Address"
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                error={registerErrors.email}
                touched={touched.email}
                placeholder="you@example.com"
                icon={Mail}
            />

            <PasswordField
                label="Password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                error={registerErrors.password}
                touched={touched.password}
                placeholder="Create a strong password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showStrength={true}
                getPasswordStrengthColor={getPasswordStrengthColor}
                getPasswordStrengthLabel={getPasswordStrengthLabel}
                getPasswordStrength={getPasswordStrength}
            />

            <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                error={registerErrors.confirmPassword}
                touched={touched.confirmPassword}
                placeholder="Confirm your password"
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
            />

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
    );
}