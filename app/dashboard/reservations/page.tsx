import { getReservations } from '@/api/reservations';
import { Heading } from '@/components/heading';
import { Metadata } from 'next';
import { Link } from '@/components/link';
import { Button } from '@/components/button';
import SimpleTable from '@/app/(components)/SimpleTable';


export const metadata: Metadata = {
  title: 'Reservations',
};

export default async function Reservations() {
  let data = [];

  try {
    const res = await getReservations();
    // console.log("DEBUG::getReservations*******", res);
    data = res?.data;
  } catch (error) {
    console.log("DEBUG::reservations", error);
  }

  const columns = [
    { header: 'ID', accessor: 'id'},
    { header: 'Property', accessor: 'client_property_name'},
    { header: 'Start Date', accessor: 'start_date'},
    { header: 'End Date', accessor: 'end_date'},
    { header: 'Tenancy Start Date', accessor: 'tenancy_start_date'},
    { header: 'Tenancy End Date', accessor: 'tenancy_end_date'},
    { header: 'Status', accessor: 'status'},
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
        <SimpleTable columns={columns} data={data} />
    </>
  );
}
