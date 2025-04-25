/* eslint-disable */

'use client';

import React, { useState } from 'react';
import { LOGIN_URL } from '@/api/config';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type LoginData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    setServerError(null);

    try {
      const response = await axios.post(LOGIN_URL,data);
      if (response.status === 204 || response.status === 200) {
        toast.success('Login successful!');
        localStorage.setItem("token", response.data.token);
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = 'Invalid email or password.';
      if (error.response && error.response.data?.message) {
        errorMessage = error.response.data.message;
      }

      setServerError(errorMessage);
    }
  };

  return (
    <form className="max-w-2xl items-center mx-auto pt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 my-auto">
        <div>
          <Label htmlFor="email">Email: </Label>
          <Input
            id="email"
            autoComplete="email"
            placeholder="Enter your email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            className={errors.email ? 'border-red-500 mt-2' : 'mt-2'}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
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
            {...register('password', { required: 'Password is required' })}
            className={errors.password ? 'border-red-500 mt-2' : 'mt-2'}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <Checkbox size="sm" label="Remember Me" />
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
          className="mt-4 w-full p-4 rounded-full"
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}