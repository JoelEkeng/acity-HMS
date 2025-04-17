import { LoginForm } from '@/components/auth/login';
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col p-4 lg:w-1/3 m-auto">
      <div className="text-center mt-24">
        <p className="text-gray-500">
          Welcome back! Please login to your account.
        </p>
      </div>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className="mt-4 text-center xs:text-md md:text-lg">
        Don&apos;t have an account?{' '}
        <Link className="text-red-600" href="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
}