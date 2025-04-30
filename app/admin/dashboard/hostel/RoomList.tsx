'use client'

import { useRoomData } from './useRoomData'
import { floors } from './roomTypes'

export default function RoomList() {
  const { rooms, loading } = useRoomData()

  if (loading) return <p>Loading rooms...</p>

  return (
    <div className="space-y-8 mt-6">
      {floors.map(floor => {
        const filtered = rooms.filter(r => r.floor === floor)

        return (
          <div key={floor}>
            <h3 className="text-xl font-bold mb-2">Floor {floor}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filtered.map(room => (
                <div key={room.id} className="p-4 border rounded-lg bg-white shadow dark:bg-zinc-800">
                  <p className="font-semibold">Room {room.roomNumber}</p>
                  <p className="text-sm">Wing: {room.wing}</p>
                  <p className="text-sm">Type: {room.roomType}</p>
                  <p className="text-sm">Facility: {room.roomFacilities}</p>
                  <p className="text-xs text-zinc-500">{room.status}</p>
                  {room.currentOccupant && (
                    <p className="text-xs mt-1 text-green-500">Occupied by: {room.currentOccupant.fullName}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
