'use client';

/*import { LOGIN_URL } from '@/api/config';*/
import { signIn } from "next-auth/react";
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from '@/app/auth/definitions';
import { z } from 'zod';
import axios, { HttpStatusCode } from 'axios';
import React, { useState } from 'react';

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getFieldState,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null); 
    try {
      const { email, password } = data;

      const response = await signIn("djangoLogin", {
        username: email,
        password: password,
        redirect: false
      });

      if (response?.status === HttpStatusCode.Ok) {
        router.replace('/dashboard');
        return;
      }

      console.log("DEBUG::onSubmit", response);
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = 'An error occurred. Please try again later.';
      if (error.response) {
        errorMessage = error.response.data?.detail || 'Invalid login credentials.';
      }

      setServerError(errorMessage); // Set the error message to be displayed
    }
  };

  return (
    <form>
      <div className="flex flex-col gap-4 my-auto">
        <div>
          <Label htmlFor="email">Email: </Label>
          <Input
            id="email"
            autoComplete="email"
            placeholder="Enter your email"
            type="email"
            {...register('email')}
            className={getFieldState('email')?.error ? 'border-red-500' : '', 'mt-2'}
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
            className={getFieldState('password')?.error ? 'border-red-500' : '', 'mt-2'}
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
        <Button color="danger" onClick={handleSubmit(onSubmit)} className="mt-4 w-full p-4 rounded-full">
          Sign In
        </Button>
      </div>
    </form>
  );
}