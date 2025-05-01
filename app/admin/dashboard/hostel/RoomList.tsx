/* eslint-disable */
// @ts-nocheck

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { floors } from './roomTypes'
import { toast } from 'react-hot-toast'

export default function RoomList() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('https://acityhost-backend.onrender.com/api/rooms')
        setRooms(res.data)
      } catch (error) {
        toast.error('Failed to fetch rooms')
        console.error('Fetch rooms error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  if (loading) return <p className="p-6 text-center text-zinc-600">Loading rooms...</p>

  return (
    <div className="p-6 space-y-10">
      {floors.map((floor) => {
        const floorRooms = rooms.filter((r) => r.floor === floor)

        if (floorRooms.length === 0) return null

        return (
          <div key={floor}>
            <h2 className="text-xl font-bold mb-4">Floor {floor}</h2>
            <div className="overflow-x-auto rounded-xl shadow border dark:border-zinc-800">
              <table className="min-w-full bg-white dark:bg-zinc-900 text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-800 text-left text-xs font-bold text-zinc-600 dark:text-zinc-300">
                  <tr>
                    <th className="px-4 py-3">Room ID</th>
                    <th className="px-4 py-3">Room No.</th>
                    <th className="px-4 py-3">Wing</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Facility</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Occupant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {floorRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                      <td className="px-4 py-2 font-mono text-xs">{room.roomId}</td>
                      <td className="px-4 py-2">{room.roomNumber}</td>
                      <td className="px-4 py-2">{room.wing}</td>
                      <td className="px-4 py-2">{room.roomType}</td>
                      <td className="px-4 py-2">{room.roomFacilities}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            room.status === 'Available'
                              ? 'bg-green-100 text-green-800'
                              : room.status === 'Booked'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {room.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                        {room.currentOccupant
                          ? `${room.currentOccupant.fullName} (${room.currentOccupant.email})`
                          : <span className="italic text-gray-400">Vacant</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
