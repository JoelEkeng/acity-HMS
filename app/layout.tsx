import type { Metadata } from "next";
import { Onest } from 'next/font/google'
import "./globals.css";

const Onests = Onest({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "ACity HMS",
  description: "Seamless Hostel Booking & Secure Check-in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Onests.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
