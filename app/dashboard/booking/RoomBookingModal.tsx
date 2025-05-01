/* eslint-disable */

// @ts-nocheck
'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function RoomBookingModal({ isOpen, onClose, room }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirmBooking = async () => {
    setIsSubmitting(true)
    try {
      const token = Cookies.get('authToken')
      await axios.post(
        'https://acityhost-backend.onrender.com/api/bookings',
        { roomId: room._id },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast.success('Room booked successfully!')
      onClose()
    } catch (err) {
      console.error(err)
      toast.error('Failed to book room')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!room) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-bold text-gray-800 dark:text-white">
                  Confirm Booking
                </Dialog.Title>
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-zinc-300">
                  <p><strong>Room:</strong> {room.roomId}</p>
                  <p><strong>Type:</strong> {room.roomType}</p>
                  <p><strong>Facilities:</strong> {room.roomFacilities}</p>
                  <p><strong>Floor:</strong> {room.floor}</p>
                  <p><strong>Wing:</strong> {room.wing}</p>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
