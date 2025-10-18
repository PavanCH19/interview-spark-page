import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const uploadResume = async (file, onProgress) => {
    try {
        const formData = new FormData();
        formData.append('resumeFile', file);

        const response = await axios.post(
            `${API_BASE_URL}/setup/upload-resume`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgress(percentCompleted);
                },
            }
        );

        console.log('Resume Upload Response:', response.data);

        // Check for success status code (200)
        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
                message: response.data.message,
            };
        } else {
            // Handle non-200 success status codes
            return {
                success: false,
                error: response.data.message || 'Upload failed',
            };
        }
    } catch (error) {
        // Handle error response from backend
        const errorData = error.response?.data;
        const errorMessage = errorData?.message ||
            error.response?.statusText ||
            error.message ||
            'Failed to upload resume';

        console.error('Resume Upload Error:', {
            status: error.response?.status,
            message: errorMessage,
            error: errorData?.error,
        });

        return {
            success: false,
            error: errorMessage,
        };
    }
};