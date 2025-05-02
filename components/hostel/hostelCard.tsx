/* eslint-disable  */
// @ts-nocheck
"use client"

import React, { useEffect, useState } from "react";
import HostelCardProps from "./hostelCardProps";
import { hostelCardProps } from "@/interfaces";

export default function HostelCard() {
  const [hostels, setHostels] = useState<hostelCardProps[]>([]);

  useEffect(() => {
    async function fetchHostels() {
      const data = await getHostels();
      // @ts-ignore
      setHostels(data);
    }
    fetchHostels();
  }, []);

  // Handle booking action
  const handleBook = (id: number) => {
    alert(`Booking hostel with ID: ${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hostels.map((hostel) => (
        <HostelCardProps
          key={hostel.id}
          id={hostel.id}
          name={hostel.name}
          location={hostel.location}
          image={hostel.image}
          facilities={hostel.facilities}
          gender={"mixed"} // Wrapping gender as an array
          onBook={handleBook}
        />
      ))}
    </div>
  );
}
