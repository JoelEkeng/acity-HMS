/*eslint-disable*/
'use client'

import { useEffect, useState } from 'react'
import { Divider } from '@/components/dashboard/divider'
import { Heading } from '@/components/dashboard/heading'
import { Input, InputGroup } from '@/components/dashboard/input'
import { Select } from '@/components/dashboard/select'
import  CoordinatorMaintenanceTracking  from './MaintenanceTracking' 
import { MaintenanceForm } from './maintanceForm'

export default function MaintenanceList( propereties: any ) { 
 
  const [activeTab, setActiveTab] = useState<'history' | 'form'>('history')

  useEffect(() => {
    const handleSwitchToHistory = () => setActiveTab('history');
  
    window.addEventListener('switch-to-history', handleSwitchToHistory);
  
    return () => {
      window.removeEventListener('switch-to-history', handleSwitchToHistory);
    };
  }, []);

  

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div>
          <Heading>Maintenance Tracking (Admin)</Heading>
          <Divider soft className="mt-2 mb-4" />
        </div>

        <div className="flex flex-wrap gap-2 sm:items-end">
          <InputGroup>
            <Input className='rounded-2xl shadow-xl' name="search" placeholder="Search" />
          </InputGroup>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-md font-medium transition text-sm ${
            activeTab === 'history'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View Complaints
        </button>
        <button
          onClick={() => setActiveTab('form')}
          className={`px-4 py-2 rounded-md font-medium transition text-sm ${
            activeTab === 'form'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Log Complaint
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'history' && <CoordinatorMaintenanceTracking />}
        {activeTab === 'form' && (
          <div className="max-w-2xl">
            <MaintenanceForm />
          </div>
        )}
      </div>
    </div>
  )
}
