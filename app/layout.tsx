import type { Metadata } from "next";
import { Onest } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const onest = Onest({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "ACityHost",
  description: "Seamless Hostel Booking & Secure Check-in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={onest.className} suppressHydrationWarning>
      <body
        className={`${onest.className} antialiased`}
      >
      <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
