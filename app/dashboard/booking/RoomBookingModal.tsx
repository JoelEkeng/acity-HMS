/* eslint-disable */
// @ts-nocheck
'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
export default function RoomBookingModal({ isOpen, onClose, room, bedPosition, onBookingSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('online')
  const { user, refreshUser } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter();

  if (!room) return null

  const price = room.roomFacilities === 'AC' ? 14000 : 11200

  const loadPaystackScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && !window.PaystackPop) {
        const script = document.createElement('script')
        script.src = 'https://js.paystack.co/v1/inline.js'
        script.onload = () => resolve(true)
        document.body.appendChild(script)
      } else {
        resolve(true)
      }
    })
  }

  const handlePaystackPayment = async () => {
    setIsProcessing(true);
    try {
      const token = Cookies.get('authToken');
      if (!user?.rollNumber || !user?.email) throw new Error('User information incomplete');
  
      // 1. Create booking record
      const bookingResponse = await axios.post(
        'https://acityhost-backend.onrender.com/api/bookings',
        {
          rollNumber: user.rollNumber,
          roomId: room.id,
          bedPosition: room.roomType === 'Double' ? bedPosition : undefined,
          bookingDate: new Date(),
          startTime: new Date(),
          endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          payment: {
            amount: price,
            method: 'Paystack',
            transactionId: `PSK-${Date.now()}`,
            paid: false
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      const booking = bookingResponse.data?.data || bookingResponse.data;
      if (!booking) throw new Error('Booking creation failed');
  
      // 2. Load Paystack script
      await loadPaystackScript();
  
      // 3. Define verification handler
      const handleVerification = async (reference: string) => {
        try {
          const verificationResponse = await axios.post(
            'https://acityhost-backend.onrender.com/api/payments/verify',
            {
              reference,
              bookingId: booking._id || booking.id,
              amount: price,
              email: user.email
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
  
          if (verificationResponse.data?.success) {
            toast.success('Booking confirmed!');
            /* router.replace(router.asPath); */
            onClose();
            onBookingSuccess();
            setTimeout(() => {
              window.location.reload(); // Full page refresh
            }, 1500);
          } else {
            throw new Error(verificationResponse.data?.message || 'Verification failed');
          }
        } catch (error) {
          console.error('Verification Error Details:', {
            error: error.response?.data || error.message,
            config: error.config
          });
          toast.error('Payment verification failed. Please contact support with reference: ' + reference);
        }
      };
  
      // 4. Initialize Paystack payment
      const paystackHandler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_2aec4af5f07f0303fb6f5cfff8537bff656d5136',
        email: user.email,
        amount: price * 100,
        currency: 'GHS',
        ref: booking.payment?.transactionId || `BOOKING-${Date.now()}`,
        metadata: {
          bookingId: booking._id || booking.id,
          rollNumber: user.rollNumber,
          roomId: room.id
        },
        callback: (response: any) => {
          toast.success('Payment received! Verifying...');
          handleVerification(response.reference);
        },
        onClose: () => {
          toast('Payment window closed');
          setIsProcessing(false);
        }
      });
  
      paystackHandler.openIframe();
  
    } catch (error) {
      console.error('Complete Booking Error:', {
        error: error.response?.data || error.message,
        config: error.config
      });
      toast.error(error.response?.data?.message || 'Booking process failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleBankTransferBooking = async () => {
    setIsSubmitting(true)
    try {
      const token = Cookies.get('authToken')
      if (!user?.rollNumber) throw new Error('Missing rollNumber')

      const bookingData = {
        rollNumber: user.rollNumber,
        roomId: room.id,
        bedPosition: room.roomType === 'Double' ? bedPosition : undefined,
        bookingDate: new Date(),
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        payment: {
          amount: price,
          method: 'Bank Transfer',
          transactionId: `BANK-${Date.now()}`,
          paid: false
        }
      }

      const response = await axios.post(
        'https://acityhost-backend.onrender.com/api/bookings',
        bookingData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      toast.success('Booking request submitted! Complete bank transfer to confirm.', {
        duration: 5000,
        position: 'top-center'
      })
      onClose()
      onBookingSuccess()

    } catch (err) {
      console.error('Bank transfer booking failed:', err.response?.data || err.message)
      toast.error('Failed to submit booking request')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  <p><strong>Room ID:</strong> {room.roomId}</p>
                  <p><strong>Type:</strong> {room.roomType}</p>
                  <p><strong>Facilities:</strong> {room.roomFacilities}</p>
                  <p><strong>Floor:</strong> {room.floor}</p>
                  <p><strong>Wing:</strong> {room.wing}</p>
                  {room.roomType === 'Double' && (
                    <p><strong>Bed:</strong> {bedPosition}</p>
                  )}
                  <p><strong>Price:</strong> ₵ {price}</p>
                </div>

                <div className="mt-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-zinc-200">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white dark:bg-zinc-800 text-gray-700 dark:text-white"
                  >
                    <option value="online">Mobile Money/Card</option>
                    <option value="offline">Bank Transfer</option>
                  </select>
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
                    onClick={paymentMethod === 'online' ? handlePaystackPayment : handleBankTransferBooking}
                    disabled={isProcessing || isSubmitting}
                    className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                  >
                    {isProcessing || isSubmitting
                      ? paymentMethod === 'online' ? 'Processing Payment...' : 'Submitting...'
                      : paymentMethod === 'online' ? `Pay ₵${price}` : 'Request Booking'}
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
