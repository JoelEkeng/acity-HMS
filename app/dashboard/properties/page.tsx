import { getProperties } from '@/api/properties';
import { Metadata } from 'next';
import PropertiesList from '@/app/dashboard/properties/PropertiesList'


export const metadata: Metadata = {
  title: 'Properties',
};

export default async function Properties() {
  let properties = [];

  try {
    const res = await getProperties();
    // console.log("DEBUG::Properties*******", res);
    properties = res?.data;
  } catch (error) {
    console.log("DEBUG::Properties", error);
    properties = []; // Fallback to an empty array
  }

  if (!properties?.length) {
    return <p className="text-center">No properties available at the moment.</p>;
  }

  return (
    <PropertiesList properties={properties} />
  );
}
