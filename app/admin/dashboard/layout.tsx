/* eslint-disable */

import { getEvents } from "@/data";
import "@/styles/tailwind.css";
import { Metadata } from "next";
import { ApplicationLayout } from "./application-layout";


export const metadata: Metadata = {
  title:  "ACityHost Admin Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let events = await getEvents();

  return (
    <>
      <ApplicationLayout events={events}>
        {children}
      </ApplicationLayout>
    </>
  );
}
