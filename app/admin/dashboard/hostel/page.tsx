// /* eslint-disable */
'use client'

import { Heading } from '@/components/dashboard/heading';
import { useEffect } from 'react'
import AddRoomForm from './AddRoomForm'
// import RoomList from './RoomList'

export default function Reservations() {
  useEffect(() => {
    if (window.innerWidth < 768) {
      alert("For best experience, use a desktop to manage hostels.");
    }
  }, []);
  return (
    <>
      <div className="gap-4 mb-6">
        <main className="max-sm:w-full sm:flex-1">
          <Heading>ADMIN OCCUPANT PAGE</Heading>
        </main>
        <div className="max-w-6xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-8">Hostel & Room Management</h1>
          <AddRoomForm />
          {/* <RoomList /> */}
        </div>
      </div>
    </>
  );
}
