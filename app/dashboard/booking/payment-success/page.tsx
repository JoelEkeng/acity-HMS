'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const PaymentSuccess = () => {
  const router = useRouter();
  const { reference } = router.query;
  const [loading, setLoading] = useState(true);

  const handlePayNow = async () => {
    try {
      const token = Cookies.get('authToken');

      // Step 1: Verify payment and get booking data
      const verifyRes = await axios.post(
        'https://acityhost-backend.onrender.com/api/payments/verify-payment',
        { reference },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { success, bookingData } = verifyRes.data;

      if (!success) {
        toast.error('Payment verification failed');
        return;
      }

      // Step 2: Complete booking
      await axios.post(
        'https://acityhost-backend.onrender.com/api/bookings',
        bookingData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Booking completed successfully!');
      router.push('/dashboard'); // Or wherever you want to redirect the user
    } catch (err) {
      console.error('Error completing booking:', err);
      toast.error('Something went wrong completing the booking.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reference) {
      handlePayNow();
    }
  }, [reference]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Processing your payment...</h2>
      {loading ? <p>Verifying and completing booking...</p> : <p>Redirecting...</p>}
    </div>
  );
};

export default PaymentSuccess;
