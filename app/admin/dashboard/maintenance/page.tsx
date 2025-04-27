import { Metadata } from 'next';
import MaintenanceList from '@/app/admin/dashboard/maintenance/maintenanceList';
import axios from 'axios';

export const metadata: Metadata = {
  title: 'Admin Maintanenace Portal',
};

export default async function Maintenances() {
  let maintenances = [];

  try {
    const res = await axios('https://67d3561f8bca322cc269da1a.mockapi.io/acityhost/Properties');
    maintenances = res?.data;
  } catch (error) {
    console.log("DEBUG::Properties", error);
    maintenances = [];
  }

  if (!maintenances?.length) {
    return <p className="text-center">No Maintenance request available at the moment.</p>;
  }

  return (
    <MaintenanceList properties={maintenances} />
  );
}
