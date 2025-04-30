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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const rooms = []
    const token = Cookies.get('authToken')
    
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
      await axios.post("https://acityhost-backend.onrender.com/api/rooms/bulk", { rooms }, 
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      toast.success("Rooms added successfully")
    } catch {
      toast.error("Failed to add rooms")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">Add Rooms</h2>

      <input placeholder="Building name" value={building} onChange={e => setBuilding(e.target.value)} className="w-full p-2 border rounded" required />

      <div className="grid grid-cols-2 gap-4">
        <select onChange={e => setFloor(e.target.value)} required className="p-2 border rounded">
          <option value="">Select Floor</option>
          {floors.map(f => <option key={f}>{f}</option>)}
        </select>

        <select onChange={e => setWing(e.target.value)} required className="p-2 border rounded">
          <option value="">Select Wing</option>
          {wings.map(w => <option key={w}>{w}</option>)}
        </select>

        <select onChange={e => setType(e.target.value)} required className="p-2 border rounded">
          <option value="">Room Type</option>
          {roomTypes.map(rt => <option key={rt}>{rt}</option>)}
        </select>

        <select onChange={e => setFacility(e.target.value)} required className="p-2 border rounded">
          <option value="">Facilities</option>
          {roomFacilities.map(f => <option key={f}>{f}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Start Room #" value={startNumber} onChange={e => setStartNumber(Number(e.target.value))} className="p-2 border rounded" />
        <input type="number" placeholder="End Room #" value={endNumber} onChange={e => setEndNumber(Number(e.target.value))} className="p-2 border rounded" />
      </div>

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Add Rooms
      </button>
    </form>
  )
}
