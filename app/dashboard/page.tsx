/* eslint-disable */

// @ts-nocheck
'use client'

import { Avatar } from "@/components/dashboard/avatar";
import { Badge } from "@/components/dashboard/badge";
import { Divider } from "@/components/dashboard/divider";
import { Heading, Subheading } from "@/components/dashboard/heading";
import { Select } from "@/components/dashboard/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/table";      
import { noSSR } from "next/dynamic";
import { CiEdit, CiTrash} from "react-icons/ci";
import { Stat } from "@/components/dashboard/stat";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, hasActiveBooking } = useAuth();

  return (
    <div className="px-4 py-8 md:px-12 lg:px-24 max-w-screen-xl mx-auto">
      {/* Welcome Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome Back, <span className="text-red-600">{user?.fullName}</span>!
        </h1>
      </div>

      {/* Divider */}
      <Divider className="my-6" />

      {/* Booking Status */}
      {hasActiveBooking ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Booking Status: <span className="text-green-600">Active</span></h2>
          <div className="text-gray-700 space-y-1">
            <p><span className="font-medium">Room Type:</span> {user?.currentBooking?.roomId?.roomType} Room</p>
            <p><span className="font-medium">Room Number:</span> {`${user?.currentBooking?.roomId?.floor}-${user?.currentBooking?.roomId?.roomNumber}`}</p>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-md transition-all duration-300">
          <p className="text-red-600 text-lg">Dear {user?.fullName}, you have no current booking.</p>
        </div>
      )}

      {/* Hostel Rules Section */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">General Hostel Rules</h2>
        <ul className="list-decimal list-inside space-y-2 text-red-600 text-base md:text-lg">
          <li>Perching is not allowed in the Hostel</li>
          <li>All guests are required to sign in before entry</li>
          <li>Guests are not allowed after 9:00 PM</li>
          <li>Keep all general spaces clean</li>
        </ul>
      </div>
    </div>
  );
}
