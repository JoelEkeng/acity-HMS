import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, UserRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import Input from '@mui/joy/Input';
import { Card, CardContent,} from "@/components/ui/card"

const SignUpForm = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative hidden lg:flex items-center justify-center ">
          <div className="absolute inset-0 bg-black/20 opacity-20" />
          <Image
            src="/BackgroundImage.jpg"
            alt="People collaborating"
            fill
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 p-12  max-w-lg">
            <Image src="/logo.png" width={200} height={200} className="m-auto" alt="Acity Logo" />
            <h1 className="text-xl font-bold mb-6 -mt-2 dark:text-white text-white text-center">
              Acity Hostel Management System
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-12">
          <Card className="w-full max-w-md p-6 shadow-2xl rounded-lg border-0">
            <CardContent className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Create Account</h2>
                <p className="mt-3">
                  Already have an account?{" "}
                  <Link
                    href="/login "
                    className="text-red-600 hover:text-primary-700 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-11 focus:outline-none rounded-md focus:ring-0 focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 h-11 focus:outline-none focus:ring-0 focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-11 focus-visible:ring-0"
                    />
                  </div>
                </div>

                <Button className="w-full h-11 bg-red-600 rounded-full hover:bg-green-500 ">Create Account</Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm ">
                  <span className="px-2 bg-white dark:text-black rounded-md">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mx-auto">
                <Button variant="outline" className="h-11 w-full hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
              </div>

              <p className="text-xs text-center mt-8">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};


export default SignUpForm;