/*eslint-disable*/
//@ts-nocheck
'use client'

import { usePaystackPayment } from 'react-paystack';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const PayButton = ({ amount: any, email: any, room:any, bedPosition:any, onBookingSuccess:any, onClose:any }) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user?.rollNumber) {
    toast.error('Missing user information. Cannot proceed with booking.');
    return null;
  }

  const config = {
    reference: `ACITY-${new Date().getTime()}`,
    email,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_2aec4af5f07f0303fb6f5cfff8537bff656d5136',
    currency: 'GHS',
    metadata: {
      userId: user._id,
      roomId: room._id,
      rollNumber: user.rollNumber,
      bedPosition: room.roomType === 'Double' ? bedPosition : null
    }
  };

  const onSuccess = async (reference) => {
    console.log('Payment success, starting booking process...');
    try {
      const token = Cookies.get('authToken');
      console.log('Auth token exists:', !!token);
  
      // 1. Verify payment
      console.log('Verifying payment...');
      const verifyRes = await axios.post(/* ... */);
      console.log('Verify response:', verifyRes.data);
  
      if (!verifyRes.data?.success) {
        throw new Error('Payment verification failed');
      }
  
      // 2. Prepare booking data
      const bookingData = {
        rollNumber: user.rollNumber,
        roomId: room._id,
        bedPosition: room.roomType === 'Double' ? bedPosition : undefined,
        bookingDate: new Date().toISOString(),
        payment: {
          amount: amount,
          method: 'Paystack',
          transactionId: reference.reference,
          status: 'success'
        }
      };
      console.log('Booking payload:', bookingData);
  
      // 3. Create booking
      console.log('Creating booking...');
      const bookingRes = await axios.post('/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Booking response:', bookingRes.data);
  
      if (!bookingRes.data?._id) {
        throw new Error('Booking failed - no ID returned');
      }
  
      console.log('Booking successful! Closing modal...');
      toast.success('Room booked successfully!');
      onClose();
      onBookingSuccess();
  
    } catch (error) {
      console.error('FULL ERROR:', {
        message: error.message,
        response: error.response?.data,
        config: error.config
      });
      toast.error(`Booking failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const onClosePaystack = () => {
    toast.error('Payment was not completed.');
    onClose();
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      onClick={() => initializePayment(onSuccess, onClosePaystack)}
      disabled={isProcessing}
      className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white ${
        isProcessing ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'
      }`}
    >
      {isProcessing ? 'Processing...' : 'Pay & Confirm'}
    </button>
  );
};

export default PayButton;