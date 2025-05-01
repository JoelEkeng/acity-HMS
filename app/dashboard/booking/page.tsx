/*eslint-disable*/

'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';

export default function RoomListing() {
  const { user } = useAuth();
  const [hostels, setHostels] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedHostelId, setSelectedHostelId] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const gender = user?.gender;
  const allowedFloors = gender === 'male' ? ['A', 'C', 'D'] : ['B', 'C'];
  const allowedWings = selectedFloor === 'C'
    ? gender === 'male'
      ? ['Left', 'Right']
      : ['Right']
    : ['Left', 'Right'];

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    if (selectedHostelId && selectedFloor && selectedRoomType) fetchRooms();
  }, [selectedHostelId, selectedFloor, selectedRoomType]);

  const fetchHostels = async () => {
    try {
      const res = await axios.get('https://acityhost-backend.onrender.com/api/hostels');
      setHostels(res.data);
    } catch {
      toast.error('Failed to fetch hostels');
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get('https://acityhost-backend.onrender.com/api/rooms');
      const filtered = res.data.filter((room: any) => {
        const isHostelMatch = room.hostel === selectedHostelId;
        const isFloorMatch = room.floor === selectedFloor;

        const isRoomMatch =
          (selectedRoomType === 'Single_AC' && room.roomType === 'Single') ||
          (selectedRoomType === 'Double_Fan' && room.roomType === 'Double' && room.roomFacilities === 'Fan') ||
          (selectedRoomType === 'Double_AC' && room.roomType === 'Double' && room.roomFacilities === 'AC');

        return isHostelMatch && isFloorMatch && isRoomMatch;
      });
      setRooms(filtered);
    } catch {
      toast.error('Failed to fetch rooms');
    }
  };

  const renderRoomGrid = (wing: string) => {
    const wingRooms = rooms.filter(r => r.wing === wing);
    return (
      <div className="w-full md:w-1/2 p-4">
        <h3 className="text-xl font-bold mb-3 text-zinc-700 dark:text-zinc-200">{wing} Wing</h3>
        {wingRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-zinc-400">
            <p className="text-sm">No rooms available in this wing/floor yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {wingRooms.map((room) => (
              <button
                key={room.roomId}
                className={cn(
                  'flex flex-col items-center justify-center border rounded-xl p-4 text-sm shadow-sm transition hover:scale-105 hover:shadow-md bg-white text-zinc-800 border-red-400 hover:border-red-600'
                )}
              >
                <span className="font-semibold text-lg">{room.roomId}</span>
                <span className={cn(
                  'mt-1 text-xs px-2 py-1 rounded-full',
                  room.roomType === 'Single' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                )}>
                  {room.roomType} ({room.roomFacilities})
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600">🏠 Book a Room</h1>
        <p className="text-zinc-500 mt-2">Find a room that suits you based on your preferences and gender access.</p>
      </div>

      {/* Selections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <select
          value={selectedHostelId}
          onChange={e => setSelectedHostelId(e.target.value)}
          className="p-3 border rounded-md bg-white text-zinc-700 shadow-sm"
        >
          <option value="">🏢 Select Hostel</option>
          {hostels.map(h => (
            <option key={h._id} value={h._id}>{h.name}</option>
          ))}
        </select>

        <select
          value={selectedFloor}
          onChange={e => setSelectedFloor(e.target.value)}
          className="p-3 border rounded-md bg-white text-zinc-700 shadow-sm"
        >
          <option value="">🏬 Select Floor</option>
          {allowedFloors.map(f => (
            <option key={f} value={f}>Floor {f}</option>
          ))}
        </select>

        <select
          value={selectedRoomType}
          onChange={e => setSelectedRoomType(e.target.value)}
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
  );
}
