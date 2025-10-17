// components/SuccessModal.jsx
import { CheckCircle } from 'lucide-react';

export function SuccessModal() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center success-pulse shadow-2xl">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                <p className="text-gray-600">Redirecting to dashboard...</p>
            </div>
        </div>
    );
}