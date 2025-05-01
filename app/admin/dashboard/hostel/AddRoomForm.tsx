/*eslint-disable*/

'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { floors, wings, roomFacilities, roomTypes } from './roomTypes'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'

export default function AddRoomForm() {
  const [hostelId, setHostelId] = useState('')
  const [hostels, setHostels] = useState<any[]>([])
  const [newHostelName, setNewHostelName] = useState('')
  const [location, setLocation] = useState('')
  const [rules, setRules] = useState('')
  const [numFloors, setNumFloors] = useState(1)
  const [selectedWing, setWing] = useState('')
  const [selectedFloor, setFloor] = useState('')
  const [type, setType] = useState('')
  const [facility, setFacility] = useState('')
  const [startNumber, setStartNumber] = useState(1)
  const [endNumber, setEndNumber] = useState(1)
  const [roomIdToUpdate, setRoomIdToUpdate] = useState('')
  const [activeTab, setActiveTab] = useState<'addRoom' | 'updateRoom' | 'addHostel'>('addRoom')

  const token = Cookies.get('authToken')

  useEffect(() => {
    fetchHostels()
  }, [])

  const fetchHostels = async () => {
    try {
      const res = await axios.get("https://acityhost-backend.onrender.com/api/hostels")
      setHostels(res.data)
    } catch {
      toast.error("Failed to fetch hostels")
    }
  }

  const handleHostelSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post("https://acityhost-backend.onrender.com/api/hostels", {
        name: newHostelName,
        location,
        rules,
        numberOfFloors: numFloors
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success("Hostel added successfully")
      setNewHostelName('')
      setLocation('')
      setRules('')
      setNumFloors(1)
      fetchHostels()
    } catch {
      toast.error("Failed to add hostel")
    }
  }

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
        hostel: hostelId
      })
    }

    if (!hostelId || !selectedWing || !selectedFloor || !type || !facility) {
      return toast.error("Please fill all required fields before submitting.");
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

  const handleStartNumberChange = (value: number) => {
    if (selectedWing === 'Right' && (value < 1 || value > 17)) return;
    if (selectedWing === 'Left' && (value < 18 || value > 34)) return;
    setStartNumber(value);
  }

  const handleEndNumberChange = (value: number) => {
    if (selectedWing === 'Right' && (value < 1 || value > 17)) return;
    if (selectedWing === 'Left' && (value < 18 || value > 34)) return;
    setEndNumber(value);
  }

  return (
    <>
      <div className="flex items-end gap-2 mb-10">
        <button onClick={() => setActiveTab('addHostel')} className={`px-4 py-2 rounded-2xl transition font-semibold ${activeTab === 'addHostel' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Register Hostel
        </button>

        <button onClick={() => setActiveTab('addRoom')} className={`px-4 py-2 rounded-2xl transition font-semibold ${activeTab === 'addRoom' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Add Rooms 
        </button>
        <button onClick={() => setActiveTab('updateRoom')} className={`px-4 py-2 rounded-2xl transition font-semibold ${activeTab === 'updateRoom' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Update Rooms
        </button>
        
      </div>

      {activeTab === 'addHostel' && (
          <form onSubmit={handleHostelSubmit} className="space-y-4">
            <input value={newHostelName} onChange={e => setNewHostelName(e.target.value)} className="w-full p-3 border rounded dark:bg-zinc-800 dark:text-white" placeholder="Hostel Name" required />
            <input value={location} onChange={e => setLocation(e.target.value)} className="w-full p-3 border rounded dark:bg-zinc-800 dark:text-white" placeholder="Location" required />
            <textarea value={rules} onChange={e => setRules(e.target.value)} className="w-full p-3 border rounded dark:bg-zinc-800 dark:text-white" placeholder="Rules" required />
            <input type="number" value={numFloors} onChange={e => setNumFloors(Number(e.target.value))} className="w-full p-3 border rounded dark:bg-zinc-800 dark:text-white" placeholder="Number of Floors" required />
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">Create Hostel</button>
          </form>
 
      )}

      {activeTab === 'addRoom' && (

          <form onSubmit={handleSubmit} className="space-y-6 w-full mx-auto">
            <select value={hostelId} onChange={e => setHostelId(e.target.value)} className="w-full p-3 border rounded dark:bg-zinc-800 dark:text-white" required>
              <option value="">Select Hostel</option>
              {hostels.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select onChange={e => setFloor(e.target.value)} required className="p-3 border rounded dark:bg-zinc-800 dark:text-white">
                <option value="">Select Floor</option>
                {floors.map(f => <option key={f}>{f}</option>)}
              </select>

              <select onChange={e => setWing(e.target.value)} required className="p-3 border rounded dark:bg-zinc-800 dark:text-white">
                <option value="">Select Wing</option>
                {wings.map(w => <option key={w}>{w}</option>)}
              </select>

              <select onChange={e => setType(e.target.value)} required className="p-3 border rounded dark:bg-zinc-800 dark:text-white">
                <option value="">Room Type</option>
                {roomTypes.map(rt => <option key={rt}>{rt}</option>)}
              </select>

              <select onChange={e => setFacility(e.target.value)} required className="p-3 border rounded dark:bg-zinc-800 dark:text-white">
                <option value="">Facilities</option>
                {roomFacilities.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Start Room #" value={startNumber} onChange={e => handleStartNumberChange(Number(e.target.value))} className="p-3 border rounded dark:bg-zinc-800 dark:text-white" />
              <input type="number" placeholder="End Room #" value={endNumber} onChange={e => handleEndNumberChange(Number(e.target.value))} className="p-3 border rounded dark:bg-zinc-800 dark:text-white" />
            </div>

            <button type="submit" className="w-full py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition">
              Add Rooms
            </button>
          </form>
      )}

      {activeTab === 'updateRoom' && (
      
          
          <form onSubmit={handleUpdate} className="space-y-6">
            <input placeholder="Enter Room ID (e.g. A01-Left)" value={roomIdToUpdate} onChange={e => setRoomIdToUpdate(e.target.value)} className="w-full p-3 border rounded dark:bg-zinc-800 dark:text-white" required />

            <select value={type} onChange={e => setType(e.target.value)} required className="w-full p-3 border rounded dark:bg-zinc-800 dark:text-white">
              <option value="">Select Room Type</option>
              {roomTypes.map(rt => <option key={rt}>{rt}</option>)}
            </select>

            <select value={facility} onChange={e => setFacility(e.target.value)} required className="w-full p-3 border rounded dark:bg-zinc-800 dark:text-white">
              <option value="">Select Facility</option>
              {roomFacilities.map(f => <option key={f}>{f}</option>)}
            </select>

            <button type="submit" className="w-full py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Update Room
            </button>
          </form>
        
      )}
    </>
  )
}
