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
    if (selectedHostelId && selectedFloor) fetchRooms();
  }, [selectedHostelId, selectedFloor]);

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
      const filtered = res.data.filter(
        (room: any) => room.hostel?._id === selectedHostelId && room.floor === selectedFloor
      );
      setRooms(filtered);
    } catch {
      toast.error('Failed to fetch rooms');
    }
  };

  const renderRoomGrid = (wing: string) => {
    const wingRooms = rooms.filter(r => r.wing === wing);
    return (
      <div className="w-full md:w-1/2 p-4">
        <h3 className="text-lg font-semibold mb-4">{wing} Wing</h3>
        <div className="grid grid-cols-3 gap-3">
          {wingRooms.map((room) => (
            <button
              key={room.roomId}
              className={cn(
                'p-4 rounded-lg border text-sm font-medium text-center transition',
                room.roomType !== selectedRoomType
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white hover:bg-blue-50 text-blue-600 border-blue-300'
              )}
              disabled={room.roomType !== selectedRoomType}
            >
              {room.roomId}<br />
              <span className="text-xs">{room.roomType}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Choose Your Room</h2>

      {/* Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <select value={selectedHostelId} onChange={e => setSelectedHostelId(e.target.value)} className="p-3 rounded border">
          <option value="">Select Hostel</option>
          {hostels.map(h => (
            <option key={h._id} value={h._id}>{h.name}</option>
          ))}
        </select>

        <select value={selectedFloor} onChange={e => setSelectedFloor(e.target.value)} className="p-3 rounded border">
          <option value="">Select Floor</option>
          {allowedFloors.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <select value={selectedRoomType} onChange={e => setSelectedRoomType(e.target.value)} className="p-3 rounded border">
          <option value="">Select Room Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
        </select>
      </div>

      {/* Rooms Grid View */}
      <div className="flex flex-col md:flex-row gap-8">
        {allowedWings.includes('Left') && renderRoomGrid('Left')}
        {allowedWings.includes('Right') && renderRoomGrid('Right')}
      </div>
    </div>
  );
}
