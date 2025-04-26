import { LoginForm } from '@/components/auth/login';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-4">
      <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Welcome back</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Please sign in to your account
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link className="text-red-600 font-semibold hover:underline" href="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
