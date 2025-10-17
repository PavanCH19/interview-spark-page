
// components/PasswordField.jsx
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';

export function PasswordField({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    showPassword,
    setShowPassword,
    showStrength = false,
    getPasswordStrengthColor,
    getPasswordStrengthLabel,
    getPasswordStrength
}) {
    const passwordStrength = getPasswordStrength ? getPasswordStrength(value) : 0;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl input-focus transition-all ${touched && error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-600'
                        } focus:outline-none`}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>

            {showStrength && value && (
                <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                            <div
                                key={level}
                                className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength ? getPasswordStrengthColor(passwordStrength) : 'bg-gray-200'}`}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-gray-600">
                        Password strength: <span className="font-medium">{getPasswordStrengthLabel(passwordStrength)}</span>
                    </p>
                </div>
            )}

            {touched && error && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}