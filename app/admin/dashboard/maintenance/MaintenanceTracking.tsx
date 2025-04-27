/*eslint-disable*/
//@ts-nocheck 
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Badge } from '@/components/dashboard/badge'
import { Select } from '@/components/dashboard/select'
import { MaintenanceTicket } from '@/interfaces'
import { useAuth } from '@/context/AuthContext'

export default function CoordinatorMaintenanceTracking() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string>("")

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await axios.get('https://acityhost-backend.onrender.com/api/tickets');
      console.log('Fetched tickets response:', res.data); // 👈 Add this
      setTickets(res.data); // Are you sure it's array here? We check
    } catch (err: any) {
      console.error('Error fetching tickets:', err); // 👈 Add this
      setError('Failed to load Maintenance Tickets');
    } finally {
      setLoading(false);
    }
  }
  const updateTicket = async (ticketId: string, updates: Partial<MaintenanceTicket>) => {
    try {
      await axios.patch(`https://acityhost-backend.onrender.com/api/tickets/${ticketId}`, updates)
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, ...updates } : t))
      )
    } catch (err) {
      console.error('Failed to update ticket')
    }
  }

  const filteredTickets = priorityFilter
    ? tickets.filter(ticket => ticket.priority === priorityFilter)
    : tickets

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

      <div className="flex justify-end mb-4">
        <Select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Sort by All Priorities</option>
          <option value="High">Sort by High Priority</option>
          <option value="Medium">Sort by Medium Priority</option>
          <option value="Low">Sort by Low Priority</option>
        </Select>
      </div>

      {loading ? (
        <p>Loading tickets...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Ticket ID</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Update Status</th>
                <th className="px-4 py-3">Update Priority</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-4 py-2 font-mono text-xs">{ticket.id.slice(0, 6)}...</td>
                  <td className="px-4 py-2">{ticket.title}</td>
                  <td className="px-4 py-2">{ticket.roomNumber}</td>
                  <td className="px-4 py-2">{ticket.category}</td>
                  <td className="px-4 py-2">
                    <Badge variant={
                      ticket.priority === 'High' ? 'destructive' :
                      ticket.priority === 'Medium' ? 'warning' : 'default'
                    }>
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    <Select
                      defaultValue={ticket.status}
                      onChange={(e) => updateTicket(ticket.id, { status: e.target.value })}
                      className="border rounded p-1"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Escalated">Escalated</option>
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Select
                      defaultValue={ticket.priority}
                      onChange={(e) => updateTicket(ticket.id, { priority: e.target.value })}
                      className="border rounded p-1"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Select>
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
