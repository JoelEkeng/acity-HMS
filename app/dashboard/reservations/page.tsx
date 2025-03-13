/* eslint-disable */

import { getReservations } from '@/api/reservations';
import { Heading } from '@/components/dashboard/heading';
import { Metadata } from 'next';
import { Link } from '@/components/dashboard/link';
import { Button } from '@/components/dashboard/button';
import SimpleTable from '@/components/dashboard/SimpleTable';

export const metadata: Metadata = {
  title: 'Reservations',
};

export default async function Reservations() {
  let data: any[] = [];

  try {
    const res = await getReservations();
    
    if (!res || !res.data) {
      throw new Error("Invalid response structure from getReservations");
    }

    data = res.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Property', accessor: 'client_property_name' },
    { header: 'Start Date', accessor: 'start_date' },
    { header: 'End Date', accessor: 'end_date' },
    { header: 'Tenancy Start Date', accessor: 'tenancy_start_date' },
    { header: 'Tenancy End Date', accessor: 'tenancy_end_date' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Reservations</Heading>
        </div>
        <Link href={'#'}>
          <Button>Add Reservation</Button>
        </Link>
      </div>

      {data.length > 0 ? (
        <SimpleTable columns={columns} data={data} />
      ) : (
        <p className="text-center text-gray-500">No reservations available.</p>
      )}
    </>
  );
}
