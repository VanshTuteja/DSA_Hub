import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { loginSchema as LoginInputState, signupSchema as SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "https://dsa-hub-h4qb.onrender.com/api/auth";
axios.defaults.withCredentials = true;

type User = {
    _id: string;
    username: string;
    email: string;
    profile: {
        firstName?: string;
        lastName?: string;
        profilePicture?: string;
        bio?: string;
        contact?: number;
        country?: string;
    };
    stats: {
        totalQuizzes: number;
        totalScore: number;
        averageScore: number;
        streak: number;
        lastActivity: Date;
        totalTimeSpent:number;

    };
    masteredTopics: string[];
    admin: boolean;
    lastLogin?: Date;
    isVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

type UserState = {
    user: User | null;
    // topics:Topic[];
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: SignupInputState) => Promise<void>;
    login: (input: LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    // signup api implementation
    signup: async (input: SignupInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                // await apiService.initializeTopics(response.data.user.id);
                const userId = response.data.user.id;
                await axios.post(`https://dsa-hub-h4qb.onrender.com/api/topic/initialize`,{ userId });
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Signup failed');
            set({ loading: false });
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
    },

    login: async (input: LoginInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                if(response.data.user.isVerified){
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });}
                else{
                    toast.error('Please verify your email to login');
                    set({ loading: false });
                }
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed');
            set({ loading: false });
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    verifyEmail: async (verificationCode: string) => {
    try {
        set({ loading: true });
        const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
        } else {
            throw new Error('Email verification failed');
        }
    } catch (error: any) {
        set({ loading: false });
        throw new Error(error.response?.data?.message || 'Email verification failed');
    }
}
,

    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`);
            if (response.data.success) {
                set({ loading: false, user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({ loading: false, isAuthenticated: false, isCheckingAuth: false });
        }
    },

    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/logout`);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: null, isAuthenticated: false });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Logout failed');
            set({ loading: false });
        }
    },

    forgotPassword: async (email: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to send reset email');
            set({ loading: false });
        }
    },

    resetPassword: async (token: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Password reset failed');
            set({ loading: false });
        }
    },

    updateProfile: async (input: any) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/profile/update`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ user: response.data.user, isAuthenticated: true, loading: false });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Profile update failed');
            set({ loading: false });
        }
    }
}),
{
    name: 'user-store',
    storage: createJSONStorage(() => localStorage),
}
))