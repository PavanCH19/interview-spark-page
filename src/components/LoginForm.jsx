
// components/LoginForm.jsx
import { ArrowRight, Mail } from 'lucide-react';
import { InputField } from './InputFields';
import { PasswordField } from './PasswordField';

export function LoginForm({
    loginForm,
    loginErrors,
    touched,
    isLoginValid,
    isLoading,
    handleLoginChange,
    handleLoginSubmit,
    setTouched,
    showPassword,
    setShowPassword
}) {
    return (
        <div className="space-y-5">
            <InputField
                label="Email Address"
                name="email"
                type="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                error={loginErrors.email}
                touched={touched.email}
                placeholder="you@example.com"
                icon={Mail}
            />

            <PasswordField
                label="Password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                error={loginErrors.password}
                touched={touched.password}
                placeholder="Enter your password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />

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
    );
}