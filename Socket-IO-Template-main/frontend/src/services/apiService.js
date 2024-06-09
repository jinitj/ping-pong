// const API_BASE_URL = 'http://localhost:4000';
// const API_BASE_URL = 'http://172.20.10.2:4000';
const API_BASE_URL = `${process.env.REACT_APP_HOST}:4000`;


export const login = async (user) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login');
    }

    return response.json();
};
