import { getAdmissionCycles } from '@/api/admission-cycles';
import { Heading } from '@/components/dashboard/heading';
import { Metadata } from 'next';
import { Link } from '@/components/dashboard/link';
import { Button } from '@/components/dashboard/button';
// import PropertiesList from '@/app/dashboard/properties/PropertiesList'
import SimpleTable from '@/components/dashboard/SimpleTable';


export const metadata: Metadata = {
  title: 'Admission Cycles',
};

export default async function AdmissionCycles() {
  let cycles = [];

  try {
    const res = await getAdmissionCycles();
    // console.log("DEBUG::Properties*******", res);
    cycles = res?.data;
  } catch (error) {
    console.log("DEBUG::Properties", error);
    cycles = []; // Fallback to an empty array
  }

  if (!cycles?.length) {
    return <p className="text-center">No admission cycles available at the moment.</p>;
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
                <Heading>Admission Cycles</Heading>
            </div>
            <Link href={'#'}>
                <Button>Add Admission Cycle</Button>
            </Link>
        </div>
        <SimpleTable columns={columns} data={cycles} />
    </>
  );
}
