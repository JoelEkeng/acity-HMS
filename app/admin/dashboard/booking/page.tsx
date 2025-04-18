/* eslint-disable */

import { Heading } from '@/components/dashboard/heading';
import { Metadata } from 'next';
import HostelCard from '@/components/hostel/hostelCard';

export const metadata: Metadata = {
  title: 'ACityHost | Reservations',
};

export default async function Reservations() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Book Hostels</Heading>
        </div>
      </div>
        <HostelCard />     
    </>
  );
}
