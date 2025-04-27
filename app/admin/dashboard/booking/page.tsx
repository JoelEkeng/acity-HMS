/* eslint-disable */

import { Heading } from '@/components/dashboard/heading';
import { Metadata } from 'next';
import HostelCard from '@/components/hostel/hostelCard';

export const metadata: Metadata = {
  title: 'Admin Portal | Current Occupants',
};

export default async function Reservations() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>ADMIN OCCUPANT PAGE</Heading>
        </div>
      </div>
        <HostelCard />     
    </>
  );
}
