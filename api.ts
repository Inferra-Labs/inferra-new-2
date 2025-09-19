import { RegisteredUser, AdminUser } from './types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const getAuthToken = () => localStorage.getItem('admin_token');

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || 'An error occurred');
    }

    if (response.headers.get('Content-Length') === '0' || response.status === 204) {
        return null;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        return response.text();
    }
};

// Public
export const getInitialData = () => apiFetch('/public/initial-data');

// Forms
export const submitContactForm = (formData: { name: string; email: string; message: string }) => {
    return apiFetch('/forms/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
};

export const submitRecruitmentForm = (formData: Omit<RegisteredUser, 'id' | 'status' | 'notes'>) => {
    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        if (value) {
            body.append(key, value as string | Blob);
        }
    });
    
    // apiFetch handles JSON by default, so we use fetch directly for FormData
    return fetch(`${API_BASE_URL}/forms/apply`, {
        method: 'POST',
        body: body,
    }).then(res => {
        if (!res.ok) throw new Error('Submission failed');
        return res.json();
    });
};


// Auth
export const adminLogin = async (username: string, password: string): Promise<AdminUser> => {
    const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
    if (data.token && data.user) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        return data.user;
    }
    throw new Error('Login failed: Invalid response from server.');
};

export const adminLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
};

// Admin (Protected)
export const getAdminDashboardData = () => apiFetch('/admin/dashboard-data');
export const getRegisteredUsers = () => apiFetch('/admin/users');
export const updateRegisteredUserStatus = (userId: string, status: string, notes: string) => {
    return apiFetch(`/admin/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, notes }),
    });
};
