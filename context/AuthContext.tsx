/*eslint-disable*/
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SessionExpiredModal } from "@/components/modals/SessionExpiredModal"; 

interface Booking {
    id: string;
    roomId: any;
    startTime: Date;
    endTime: Date;
    status: string;
  }
interface User {
    id: string,
    studentId: string,
    fullName: string,
    email: string,
    roomNumber: string,
    maintenanceLogs: [],
    paymentsHistory: [],
    BookingHistory: [],
    role: string,
    gender?: string,
    rollNumber?: string,
    parentName?: string,
    parentPhone?: string,
    healthConditions?: string,
    allergies?: string,
    emergencyContact?: string,
    currentBooking?: Booking | null;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    refreshUser: () => void;
    logout: () => void;
    needsSetup: boolean;
    hasActiveBooking: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSessionExpired, setShowSessionExpired] = useState(false);
    const [needsSetup, setNeedsSetup] = useState(false);
    const [hasActiveBooking, setHasActiveBooking] = useState(false);
    const router = useRouter();

    const fetchUser = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            const response = await axios.get("https://acityhost-backend.onrender.com/api/me", {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
            });

            const userData = response.data;
            setUser(userData);
            setNeedsSetup(!userData.gender || !userData.rollNumber);
            setHasActiveBooking(!!userData.currentBooking);
            setError(null);
        } catch (err: any) {
            console.error('Fetch user error:', err.message);
            setUser(null);
            Cookies.remove('authToken');
            setShowSessionExpired(true);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to fetch user data.');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        Cookies.remove('authToken');
        router.push('/login');
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, refreshUser: fetchUser, logout, needsSetup, hasActiveBooking }}>
            {showSessionExpired && (
                <SessionExpiredModal 
                  onClose={() => setShowSessionExpired(false)} 
                />
            )}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
