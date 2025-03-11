import { LoginForm } from '@/components/auth/login';
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex flex-col p-4 lg:w-1/3 m-auto mt-48">
      <div className="text-center">
        <Image src="/logo.png" width={200} height={200} className="m-auto" alt="Acity Logo" />
        <p className="text-gray-500">
          Welcome back! Please login to your account.
        </p>
      </div>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className="mt-4 text-center xs:text-md md:text-lg">
        Don&apos;t have an account?{' '}
        <Link className="text-red-600" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}