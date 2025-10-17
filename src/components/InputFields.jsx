// components/InputField.jsx
import { AlertCircle } from 'lucide-react';

export function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    icon: Icon
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative group">
                {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border-2 rounded-xl input-focus transition-all ${touched && error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-600'
                        } focus:outline-none`}
                    placeholder={placeholder}
                />
            </div>
            {touched && error && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}