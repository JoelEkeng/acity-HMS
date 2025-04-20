/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { LOGIN_URL } from '@/api/config';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios, { HttpStatusCode } from 'axios';
import type { SubmitHandler } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

type LoginData = {
  email: string;
  password: string;
}

export function LoginForm () {

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    getFieldState,
  } = useForm<LoginData>();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);
  
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    setServerError(null);

    try {
      const response = await axios.post(LOGIN_URL, data);
      if (response?.status === HttpStatusCode.Ok) {
        login(response.data.token, response.data.user);
        toast.success('Login successful!');
        // router.push('/dashboard');
        return;
      }

      console.log("DEBUG::onSubmit", response);
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = 'An error occurred. Please try again later.';
      if (error.response) {
        errorMessage = error.response.data?.detail || 'Invalid login credentials.';
      }

      setServerError(errorMessage); 
    }
  };

  return (
    <form className='max-w-2xl items-center mx-auto pt-10' onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 my-auto">
        <div>
          <Label htmlFor="email">Email: </Label>
          <Input
            id="email"
            autoComplete="email"
            placeholder="Enter your email"
            type="email"
            {...register('email')}
            className={getFieldState('email')?.error ? 'border-red-500 mt-2' : 'mt-2'}
          />
          {getFieldState('email')?.error && (
            <p className="text-sm text-red-500">{getFieldState('email')?.error?.message}</p>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password: </Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register('password')}
            className={getFieldState('password')?.error ? 'border-red-500 mt-2' : 'mt-2'}
          />
          {getFieldState('password')?.error && (
            <p className="text-sm text-red-500">{getFieldState('password')?.error?.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
            <div>
                <Checkbox size="sm" label="Remeber Me"/>
            </div>
          <Link className="text-[12px] underline items-center text-center" href="#">
            Forgot your password?
          </Link>
        </div>

        {serverError && (
          <p className="text-sm text-red-500 mt-2">{serverError}</p>
        )}
        <Button 
        type="submit" 
        color="danger" 
        className="mt-4 w-full p-4 rounded-full">
          Sign In
        </Button>
      </div>
    </form>
  );
}