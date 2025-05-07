/* eslint-disable */
// @ts-nocheck


import { Divider } from "@/components/dashboard/divider";
import { Heading, Subheading } from "@/components/dashboard/heading";
import { noSSR } from "next/dynamic";
import AdminDashboard from "@/components/dashboard/adminDashboard";

export default async function Home() {
  return (
    <>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Hostel Statstics</Subheading>
      </div>
   
     <Divider soft className="mt-6" />

     <AdminDashboard />
    </>
  );
}