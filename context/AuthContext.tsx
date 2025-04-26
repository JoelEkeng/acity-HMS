/*eslint-disable*/

"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
interface User {
    id: string,
    studentId: string,
    fullName: string,
    email: string,
    roomNumber: string,
    maintenanceLog: [],
    paymentsHistory: [],
    BookingHistory: [],
    role: string,
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    refreshUser: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>({
    user: null,
    loading: true,
    error: null,
    refreshUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('authToken');
            const response = await axios.get("https://acityhost-backend.onrender.com/api/me", {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            setUser(response.data);
            setError(null);
        } catch (err:any) {
            setUser(null);
            setError(err.response?.data?.message || 'Failed to load user data');
            setError('Failed to fetch user data');

            if (err.response?.status === 401) {
                toast.error("Unauthorized access. Redirecting to login...");
                Cookies.remove('authToken');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
      };

    useEffect(() => {
        fetchUser();
      }, []);

      return (
        <AuthContext.Provider value={{ user, loading, error, refreshUser: fetchUser, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };

export const useAuth = () => useContext(AuthContext);