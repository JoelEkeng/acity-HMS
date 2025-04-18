'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Badge } from '@/components/dashboard/badge'
import { MaintenanceTicket } from '@/interfaces'

export function MaintenanceHistory() {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get<MaintenanceTicket[]>('https://acityhost-backend.onrender.com/api/tickets')
        setTickets(response.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to fetch maintenance tickets.')
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Maintenance History</h2>

      {loading && <p className="text-gray-500">Loading tickets...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
              <tr>
                <th className="px-4 py-2">Ticket ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-xs text-gray-500">{ticket.id.slice(0, 6)}...</td>
                  <td className="px-4 py-2">{ticket.title}</td>
                  <td className="px-4 py-2">{ticket.category}</td>
                  <td className="px-4 py-2">{ticket.roomNumber}</td>
                  <td className="px-4 py-2">
                    <Badge variant={
                      ticket.priority === "High" ? "destructive" :
                      ticket.priority === "Medium" ? "warning" : "default"
                    }>
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant={
                      ticket.status === "Resolved" ? "success" :
                      ticket.status === "Escalated" ? "destructive" :
                      ticket.status === "In Progress" ? "info" : "secondary"
                    }>
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {new Date(ticket.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
