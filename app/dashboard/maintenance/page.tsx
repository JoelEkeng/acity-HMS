import { Metadata } from 'next';
import PropertiesList from '@/app/dashboard/maintenance/PropertiesList'
import axios from 'axios';

export const metadata: Metadata = {
  title: 'ACityHost Properties',
};

export default async function Properties() {
  let properties = [];

  try {
    const res = await axios('https://67d3561f8bca322cc269da1a.mockapi.io/acityhost/Properties');
    properties = res?.data;
  } catch (error) {
    console.log("DEBUG::Properties", error);
    properties = [];
  }

  if (!properties?.length) {
    return <p className="text-center">No properties available at the moment.</p>;
  }

  return (
    <PropertiesList properties={properties} />
  );
}
