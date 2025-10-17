// components/TabButtons.jsx
export function TabButtons({ activeTab, setActiveTab }) {
    return (
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
    );
}