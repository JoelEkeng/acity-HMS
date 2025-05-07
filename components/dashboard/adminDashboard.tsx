/*eslint-disable*/
// @ts-nocheck

'use client'

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import { Loader2 } from "lucide-react"


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://acityhost-backend.onrender.com/api/stats/booking-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center">
    <Loader2 
        className="animate-spin text-primary" 
        size={64} 
        strokeWidth={1.5} 
    />
    </div>;
  if (!stats) return <div>Failed to load statistics</div>;

  // Format monthly data for chart
  const monthlyData = stats.monthlyBookings.map(item => ({
    name: `${item._id.year}-${item._id.month}`,
    bookings: item.count
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Booking Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-3xl font-bold">{stats.totalBookings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Active Bookings</h3>
          <p className="text-3xl font-bold">{stats.activeBookings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Occupancy Rate</h3>
          <p className="text-3xl font-bold">
            {Math.round((stats.activeBookings / stats.totalBookings) * 100)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Room Types</h3>
          <p className="text-3xl font-bold">{stats.bookingsByRoomType.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings by Room Type (Pie Chart) */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Bookings by Room Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.bookingsByRoomType}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="_id"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stats.bookingsByRoomType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Bookings (Line Chart) */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Bookings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Current Occupancy (Bar Chart) */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Current Occupancy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.bookingsByRoomType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    {/* Popular Rooms Table */}
    {/* <div className="bg-white p-4 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Most Popular Rooms</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {stats.popularRooms.map((room, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{room.room.roomNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.room.roomType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.count}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div> */}
</div>
  );
};

export default AdminDashboard;