import { getEvents } from "@/data";
import "@/styles/tailwind.css";
import { Metadata } from "next";
import { ApplicationLayout } from "./application-layout";
import Head from "next/head";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
  },
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let events = await getEvents();

  return (
    <>
      <Head>
      </Head>
      <ApplicationLayout events={events}>
        {children}
      </ApplicationLayout>
    </>
  );
}
