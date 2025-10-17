
// components/AuthFooter.jsx
export function AuthFooter({ activeTab, setActiveTab }) {
    return (
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
    );
}