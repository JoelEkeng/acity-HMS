/* eslint-disable */
// @ts-nocheck

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { floors } from './roomTypes'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'

export default function RoomList() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      const token = Cookies.get('authToken')
      try {
        const res = await axios.get('https://acityhost-backend.onrender.com/api/rooms/g', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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

  const getStatus = (room) => {
    if (room.status === 'Under Maintenance') {
      return 'Under Maintenance';
    }
  
    // Handle Single room type
    if (room.roomType === 'Single') {
      return room.beds.top ? 'Available' : 'Booked';
    }
  
    // Handle Double room type
    if (room.roomType === 'Double') {
      if (!room.beds.top && !room.beds.bottom) {
        return 'Fully Booked';
      }
      if (!room.beds.top || !room.beds.bottom) {
        return 'Partially Booked';
      }
      return 'Available';
    }
  
    // Fallback status
    return 'Available';
  };
  
  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': 
        return 'bg-green-100 text-green-800';
      case 'Partially Booked': 
        return 'bg-yellow-100 text-yellow-800';
      case 'Fully Booked': 
        return 'bg-red-100 text-red-800';
      case 'Booked':
        return 'bg-red-100 text-red-800';
      case 'Under Maintenance':
        return 'bg-gray-100 text-gray-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };
  

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
                    <th className="px-4 py-3">Room</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    {/* <th className="px-4 py-3">Occupants</th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {floorRooms.map((room) => {
                    const status = getStatus(room);
                    return (
                      <tr key={room.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                        {room.floor}-{room.roomNumber} 
                        </td>
                        <td className="px-4 py-2">
                          {room.roomType} ({room.roomFacilities})
                        </td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                       {/*  <td className="px-4 py-2">
                          {room.roomType === 'Single' ? (
                            room.currentOccupant ? (
                              `${room.currentOccupant.fullName}`
                            ) : 'Vacant'
                          ) : (
                            <div className="space-y-1">
                                {room.status}
                            </div>
                          )}
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
