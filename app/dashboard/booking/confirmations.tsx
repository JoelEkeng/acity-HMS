// pages/booking/confirmation.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

export default function PaymentConfirmation() {
  const router = useRouter();
  const { status, tx_ref } = router.query;

  useEffect(() => {
    if (status === 'successful') {
      toast.success('Payment successful! Your booking is being confirmed.');
      // You can poll the backend for booking status or redirect
      setTimeout(() => router.push('/dashboard'), 3000);
    } else if (status === 'cancelled') {
      toast.error('Payment was cancelled');
      router.push('/booking');
    }
  }, [status, tx_ref]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!status && <p>Processing payment confirmation...</p>}
      {status === 'successful' && <p>Payment successful! Redirecting...</p>}
    </div>
  );
} 