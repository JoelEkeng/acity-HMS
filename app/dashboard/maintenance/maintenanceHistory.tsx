/* eslint-disable */
'use client'

import { useAuth } from '@/context/AuthContext'
import { Badge } from '@/components/dashboard/badge'
import { MaintenanceTicket } from '@/interfaces'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function MaintenanceHistory() {
  const { user} = useAuth();
  const tickets = user?.maintenanceLogs || [];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Maintenance History</h2>

      {tickets.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {tickets.map((ticket: any) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{ticket.title}</td>
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
                    <Badge variant={
                      ticket.status === 'Resolved' ? 'success' :
                      ticket.status === 'Escalated' ? 'destructive' :
                      ticket.status === 'In Progress' ? 'info' : 'secondary'
                    }>
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500">{formatDate(ticket.createdAt)}</td>
                  <td className="px-4 py-2 text-xs text-gray-500">{formatDate(ticket.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No maintenance tickets found.</p>
      )}
    </div>
  )
}
