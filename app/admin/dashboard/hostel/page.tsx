// /* eslint-disable */
'use client'

import { Heading } from '@/components/dashboard/heading';
import { useEffect, useState } from 'react'
import AddRoomForm from './AddRoomForm'
import RoomList from './RoomList'

export default function Reservations() {
  const [activeTab, setActiveTab] = useState<'occupants' | 'form'>('occupants');

  useEffect(() => {
    if (window.innerWidth < 768) {
      alert("For best experience, use a desktop to manage hostels.");
    }
  }, []);
  return (
    <>
      <div className="gap-4 mb-6">
        <main className="max-sm:w-full sm:flex-1 flex justify-between">
          <Heading>Hostel & Room Management</Heading>
          <div className='flex justify-around gap-4 items-end mb-8'>
            <button
              onClick={() => setActiveTab('occupants')}
              className={`px-4 py-2 rounded-md font-medium transition text-sm ${
                activeTab === 'occupants'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              View Occupants
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-md font-medium transition text-sm ${
                activeTab === 'form'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Add Room
            </button>
          </div>
        </main>

        <div className="max-w-6xl mx-auto py-10 px-4">
          <div className="flex flex-wrap gap-2 mb-6">
            {activeTab === 'occupants' && (
              <div className="w-full">
                <RoomList />
              </div>
            )}
            {activeTab === 'form' && (
              <div className="p-4 border rounded-lg shadow-md w-full mx-auto h-full">
                <AddRoomForm />
              </div>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
}
