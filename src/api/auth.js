// authApi.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request Interceptor – Attach JWT Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor – Better Error Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Extract the actual error message from backend
        const message =
            error.response?.data?.message ||      // Your custom message
            error.response?.data?.msg ||          // Alternative field
            error.response?.data?.error ||        // Another alternative
            error.response?.statusText ||         // HTTP status text
            error.message ||                      // Axios error message
            'Server error';

        console.error('❌ API Error:', message);
        console.error('Status Code:', error.response?.status);

        return Promise.reject({ message, status: error.response?.status });
    }
);

// Register function
async function register(email, password) {
    try {
        const response = await api.post('/createUser', { email, password });
        return response.data;
    } catch (error) {
        // error is now an object with message and status
        throw new Error(error.message || 'Registration failed');
    }
}

// Login function
async function login(username, password) {
    try {
        const response = await api.post('/loginUser', { username, password });
        const data = response.data;

        if (data?.token) {
            localStorage.setItem('token', data.token);
        }

        return data;
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
}

// Logout function
async function logout() {
    try {
        localStorage.removeItem('token');
        return { success: true, message: 'Logged out successfully' };
    } catch (error) {
        throw new Error('Logout failed: ' + error.message);

    }
}

export { login, register, logout };