/*eslint-disable*/

'use client'

import { useState } from 'react'
import axios from 'axios'
import { floors, wings, roomFacilities, roomTypes } from './roomTypes'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'

export default function AddRoomForm() {
  const [building, setBuilding] = useState('')
  const [selectedWing, setWing] = useState('')
  const [selectedFloor, setFloor] = useState('')
  const [type, setType] = useState('')
  const [facility, setFacility] = useState('')
  const [startNumber, setStartNumber] = useState(1)
  const [endNumber, setEndNumber] = useState(1)
  const [roomIdToUpdate, setRoomIdToUpdate] = useState('')
  const [activeTab, setActiveTab] = useState<'addRoom' | 'updateRoom'>('addRoom')

  const token = Cookies.get('authToken')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const rooms = []

    for (let num = startNumber; num <= endNumber; num++) {
      rooms.push({
        roomNumber: num.toString().padStart(2, '0'),
        wing: selectedWing,
        floor: selectedFloor,
        roomType: type,
        roomFacilities: facility,
        building  
      })
    }

    try {
      await axios.post("https://acityhost-backend.onrender.com/api/rooms/bulk", { rooms }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      toast.success("Rooms added successfully")
    } catch {
      toast.error("Failed to add rooms")
    }
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault()
    if (!roomIdToUpdate) {
      return toast.error("Please enter a Room ID to update")
    }

    try {
      await axios.patch(`https://acityhost-backend.onrender.com/api/rooms/${roomIdToUpdate}`, {
        roomType: type,
        roomFacilities: facility,
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      toast.success("Room updated successfully")
    } catch {
      toast.error("Failed to update room")
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setActiveTab('addRoom')} className={`px-4 py-2 rounded transition font-semibold ${activeTab === 'addRoom' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Add Rooms 
        </button>
        <button onClick={() => setActiveTab('updateRoom')} className={`px-4 py-2 rounded transition font-semibold ${activeTab === 'updateRoom' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Update Rooms
        </button>
      </div>

      {activeTab === 'addRoom' && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">Add Rooms</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input placeholder="Building name" value={building} onChange={e => setBuilding(e.target.value)} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-zinc-800 dark:text-white" required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select onChange={e => setFloor(e.target.value)} required className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800 dark:text-white">
                <option value="">Select Floor</option>
                {floors.map(f => <option key={f}>{f}</option>)}
              </select>

              <select onChange={e => setWing(e.target.value)} required className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800 dark:text-white">
                <option value="">Select Wing</option>
                {wings.map(w => <option key={w}>{w}</option>)}
              </select>

              <select onChange={e => setType(e.target.value)} required className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800 dark:text-white">
                <option value="">Room Type</option>
                {roomTypes.map(rt => <option key={rt}>{rt}</option>)}
              </select>

              <select onChange={e => setFacility(e.target.value)} required className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800 dark:text-white">
                <option value="">Facilities</option>
                {roomFacilities.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Start Room #" value={startNumber} onChange={e => setStartNumber(Number(e.target.value))} className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800 dark:text-white" />
              <input type="number" placeholder="End Room #" value={endNumber} onChange={e => setEndNumber(Number(e.target.value))} className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800 dark:text-white" />
            </div>

            <button type="submit" className="w-full py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition">
              Add Rooms
            </button>
          </form>
        </div>
      )}

      {activeTab === 'updateRoom' && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">Update Room</h2>
          <form onSubmit={handleUpdate} className="space-y-6">
            <input placeholder="Enter Room ID (e.g. A01-Left)" value={roomIdToUpdate} onChange={e => setRoomIdToUpdate(e.target.value)} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white" required />

            <select value={type} onChange={e => setType(e.target.value)} required className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800 dark:text-white">
              <option value="">Select Room Type</option>
              {roomTypes.map(rt => <option key={rt}>{rt}</option>)}
            </select>

            <select value={facility} onChange={e => setFacility(e.target.value)} required className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800 dark:text-white">
              <option value="">Select Facility</option>
              {roomFacilities.map(f => <option key={f}>{f}</option>)}
            </select>

            <button type="submit" className="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Update Room
            </button>
          </form>
        </div>
      )}
    </>
  )
}
