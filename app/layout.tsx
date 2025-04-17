import type { Metadata } from "next";
import { Onest } from 'next/font/google'
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
    <html lang="en" className={onest.className}>
      <body
        font-family="onset"
        className={`${onest.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
