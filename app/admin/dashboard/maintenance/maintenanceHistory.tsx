/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { MaintenanceTicket } from '@/interfaces'
import { Badge } from '@/components/dashboard/badge'
import { Select } from '@/components/dashboard/select'

export default function CoordinatorMaintenanceTracking() {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await axios.get<MaintenanceTicket[]>('http://localhost:5000/api/tickets')
      setTickets(res.data)
    } catch (err) {
      setError('Failed to load tickets')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (ticketId: string, newStatus: MaintenanceTicket['status']) => {
    try {
      await axios.patch(`http://localhost:3000/api/tickets/${ticketId}`, {
        status: newStatus,
      })

      // Update local state
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
      )
    } catch (err) {
      console.error('Failed to update status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'success'
      case 'Escalated':
        return 'destructive'
      case 'In Progress':
        return 'info'
      case 'Open':
      default:
        return 'secondary'
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Maintenance Tracking - Coordinator Panel</h1>

      {loading && <p>Loading tickets...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Ticket ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2">Room</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Update Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-4 py-2 font-mono text-xs text-gray-500">{ticket.id.slice(0, 6)}...</td>
                <td className="px-4 py-2">{ticket.title}</td>
                <td className="px-4 py-2">{ticket.roomNumber}</td>
                <td className="px-4 py-2">{ticket.category}</td>
                <td className="px-4 py-2">
                  <Badge variant={
                    ticket.priority === 'High'
                      ? 'destructive'
                      : ticket.priority === 'Medium'
                      ? 'warning'
                      : 'default'
                  }>
                    {ticket.priority}
                  </Badge>
                </td>
                <td className="px-4 py-2">
                  <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                </td>
                <td className="px-4 py-2">
                  <Select
                    defaultValue={ticket.status}
                    onChange={(e) => updateStatus(ticket.id, e.target.value as MaintenanceTicket['status'])}
                    className="border p-1 rounded-md"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Escalated">Escalated</option>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
