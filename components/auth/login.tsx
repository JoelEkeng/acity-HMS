/* eslint-disable */
// @ts-nocheck

'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/dashboard/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

// 1. Zod validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const router = useRouter();
  const { user, refreshUser } = useAuth(); 
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. On form submit
  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      const response = await axios.post("https://acityhost-backend.onrender.com/api/login", values, {
        withCredentials: true,
      });

      toast.success("Login successful!");

      await refreshUser(); 

    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 3. Redirect automatically after login
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.push("/admin/dashboard"); 
      } else {
        router.push("/dashboard");
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-zinc-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">Login</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
              className="mt-1"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Your password"
              {...form.register("password")}
              className="mt-1"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
