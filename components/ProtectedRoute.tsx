/*eslint-disable*/
//@ts-nocheck

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    
    if (!loading && user === null) {
      router.push("/login");
    }

    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}