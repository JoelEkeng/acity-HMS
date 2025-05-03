/* eslint-disable */
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-hot-toast'
import RoomBookingModal from './RoomBookingModal'
import { Divider } from '@/components/dashboard/divider'

export default function RoomListing() {
  const { user } = useAuth()
  const [hostels, setHostels] = useState<any[]>([])
  const [rooms, setRooms] = useState<any[]>([])
  const [selectedHostelId, setSelectedHostelId] = useState('')
  const [selectedFloor, setSelectedFloor] = useState('')
  const [selectedRoomType, setSelectedRoomType] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectedBed, setSelectedBed] = useState(null)

  const hasActiveBooking = !!user?.currentBooking;

  const gender = user?.gender
  const allowedFloors = gender === 'male' ? ['A', 'C', 'D'] : ['B', 'C']
  const allowedWings =
    selectedFloor === 'C'
      ? gender === 'male'
        ? ['Left', 'Right']
        : ['Right']
      : ['Left', 'Right']

  useEffect(() => {
    fetchHostels()
  }, [])

  useEffect(() => {
    if (selectedHostelId && selectedFloor && selectedRoomType) fetchRooms()
  }, [selectedHostelId, selectedFloor, selectedRoomType])

  const fetchHostels = async () => {
    try {
      const res = await axios.get('https://acityhost-backend.onrender.com/api/hostels')
      setHostels(res.data)
    } catch {
      toast.error('Failed to fetch hostels')
    }
  }

  const fetchRooms = async () => {
    try {
      const res = await axios.get('https://acityhost-backend.onrender.com/api/rooms')
      const filtered = res.data.filter((room: any) => {
        const isHostelMatch = room.hostel === selectedHostelId
        const isFloorMatch = room.floor === selectedFloor

        const isRoomMatch =
          (selectedRoomType === 'Single_AC' && room.roomType === 'Single') ||
          (selectedRoomType === 'Double_Fan' &&
            room.roomType === 'Double' &&
            room.roomFacilities === 'Fan') ||
          (selectedRoomType === 'Double_AC' &&
            room.roomType === 'Double' &&
            room.roomFacilities === 'AC')

        return isHostelMatch && isFloorMatch && isRoomMatch
      })
      setRooms(filtered)
    } catch {
      toast.error('Failed to fetch rooms')
    }
  }

  const openBookingModal = (room: any, bed: any) => {
    if (hasActiveBooking) return; 
    setSelectedRoom(room)
    setSelectedBed(bed)
    setIsModalOpen(true)
  }

  const refreshRooms = () => {
    if (selectedHostelId && selectedFloor && selectedRoomType) {
      fetchRooms();
    }
  };

  const renderRoomGrid = (wing: string) => {
    const wingRooms = rooms.filter((r) => r.wing === wing)

    return (
      <div className="w-full md:w-1/2 p-4">
        <h3 className="text-xl text-center font-bold mb-3 text-zinc-700 dark:text-zinc-200">{wing} Wing</h3>
        {wingRooms.length === 0 ? (
        <div className="text-center py-10">No rooms available</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {wingRooms.map((room) => (
            <div key={room._id} className="border rounded-lg p-3">
              <div className="font-bold text-center">
                {room.floor}{room.roomNumber}
              </div>
              <div className="text-xs text-center mb-2">
                {room.roomType} ({room.roomFacilities})
              </div>

              {room.roomType === 'Double' ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openBookingModal(room, 'Top')}
                    disabled={!room.beds.top || hasActiveBooking}
                    className={`text-xs p-2 rounded ${
                      !room.beds.top || hasActiveBooking
                        ? 'bg-red-600 cursor-not-allowed'
                        : 'bg-green-400 hover:bg-green-500'
                    }`}
                  >
                    {!room.beds.top ? 'Booked' : 'Top Bed'}
                    <Divider />
                  </button>
                    
                  <button
                    onClick={() => openBookingModal(room, 'Bottom')}
                    disabled={!room.beds.bottom || hasActiveBooking}
                    className={`text-xs p-2 rounded ${
                      !room.beds.bottom || hasActiveBooking
                        ? 'bg-red-600 cursor-not-allowed'
                        : 'bg-green-400 hover:bg-green-500'
                    }`}
                  >
                    {!room.beds.bottom ? 'Booked' : 'Bottom Bed'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openBookingModal(room, null)}
                  disabled={!room.beds.top || hasActiveBooking}
                  className={`w-full p-2 rounded ${
                    !room.beds.top || hasActiveBooking
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {!room.beds.top ? 'Booked' : 'Available'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {hasActiveBooking && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p className="font-bold">You already have an active booking</p>
          <p>Please check your dashboard for booking details</p>
        </div>
      )}

      <RoomBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        bedPosition={selectedBed}
        onBookingSuccess={refreshRooms}
      />

      {!hasActiveBooking && (
      <div className="mb-4 p-4 bg-slate-50 border-l-4 border-red-500 ">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600">🏠 Book a Room</h1>
        <p className="text-zinc-500 mt-2">
          Find a room that suits you based on your preferences and gender access.
        </p>
      </div>

      {/* Selections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <select
          value={selectedHostelId}
          onChange={(e) => setSelectedHostelId(e.target.value)}
          className="p-3 border rounded-md bg-white text-zinc-700 shadow-sm"
        >
          <option value="">Select Hostel</option>
          {hostels.map((h) => (
            <option key={h._id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>

        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="p-3 border rounded-md bg-white text-zinc-700 shadow-sm"
        >
          <option value="">Select Floor</option>
          {allowedFloors.map((f) => (
            <option key={f} value={f}>
              Floor {f}
            </option>
          ))}
        </select>

        <select
          value={selectedRoomType}
          onChange={(e) => setSelectedRoomType(e.target.value)}
          className="p-3 border rounded-md bg-white text-zinc-700 shadow-sm"
        >
          <option value="">🛏️ Select Room Type</option>
          <option value="Single_AC">Single Occupant (AC)</option>
          <option value="Double_Fan">Double Occupant (Fan)</option>
          <option value="Double_AC">Double Occupant (AC)</option>
        </select>
      </div>

      {/* Grid View */}
      <div className="flex flex-col md:flex-row gap-6">
        {allowedWings.includes('Left') && renderRoomGrid('Left')}
        {allowedWings.includes('Right') && renderRoomGrid('Right')}
      </div>
    </div>
      )}
    </div>
  )
}