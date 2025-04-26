/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { LOGIN_URL } from '@/api/config';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

type LoginData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    setServerError(null);
    setSubmitting(true);

    try {
      const response = await axios.post(LOGIN_URL, data, { withCredentials: true });

      if (response.status === 200) {
        toast.success('Login successful!');

        Cookies.set('authToken', response.data.token, {
          expires: 7,
          sameSite: 'Strict',
          secure: true,
        });

        // Refresh the user session after login
        refreshUser();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setServerError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="email" className="text-sm text-zinc-700 dark:text-zinc-300">
          Email
        </Label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register('email', { required: 'Email is required' })}
          className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white dark:placeholder:text-zinc-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="text-sm text-zinc-700 dark:text-zinc-300">
          Password
        </Label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register('password', { required: 'Password is required' })}
          className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white dark:placeholder:text-zinc-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="rounded border-zinc-300 dark:border-zinc-600"
          />
          <label htmlFor="remember" className="text-zinc-600 dark:text-zinc-400">
            Remember me
          </label>
        </div>
        <Link href="#" className="text-red-500 hover:underline">
          Forgot password?
        </Link>
      </div>

      {serverError && (
        <p className="text-sm text-red-500 text-center">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg transition duration-300"
      >
        {submitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
