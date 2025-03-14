/* eslint-disable */

'use client';

import { Badge } from '@/components/dashboard/badge';
import { Divider } from '@/components/dashboard/divider';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dashboard/dropdown';
import { Heading } from '@/components/dashboard/heading';
import { Input, InputGroup } from '@/components/dashboard/input';
import { Link } from '@/components/dashboard/link';
import { Select } from '@/components/dashboard/select';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

export default function PropertiesList({ properties }: { properties: any[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    // try {
    //   await deleteProperty(Number(id));
    //   alert('Are you sure you want to delete propert!');
    //   router.refresh(); // Refresh the page to reflect changes
    // } catch (error) {
    //   console.error('Error deleting property:', error);
    //   alert('Failed to delete property.');
    // }
  };
  

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Properties</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <Input name="search" placeholder="Search" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <ul className="mt-10">
        {properties.map((property, index) => (
          <li key={property.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-6 py-6">
                <div className="w-60 shrink-0">
                  <Link href="" aria-hidden="true">
                    <img
                      className="aspect-[3/2] rounded-lg shadow"
                      src="/properties/default.jpg"
                      alt={`${property.name}`}
                    />
                  </Link>
                </div>
                
                <div className="space-y-1">
                  <div className="text-base/6 font-bold">
                    <Link href="">{property.name}</Link>
                  </div>
                  <div className="text-lg/6 text-zinc-500">
                    {property.address}, {property.city}
                  </div>
                  <div className="text-xs/6 text-zinc-500">
                    {property.region}, {property.ghana_post_gps}
                  </div>
                  <div className="text-xs/6 text-zinc-600 flex gap-2"><p>Year Completed:</p> <span className='font-bold'>{property.year_completed}</span></div>
                  <div className='text-xs/6 text-zinc-600 bg-lime-200 rounded-lg h-6 text-center px-4 w-28'>
                  {property.usage}
                </div>
                </div>
               
              </div>

              <div className="flex items-center gap-4">
                <Badge className="max-sm:hidden font-bold" color={property.status === 'A' ? 'lime' : 'zinc'}>
                  {property.status}
                </Badge>
                
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end" className="gap-y-1">
                    <DropdownItem>View</DropdownItem>
                    <DropdownItem><Link href={`/dashboard/properties/edit/${property.id}`}>Edit</Link></DropdownItem>
                    <DropdownItem onClick={() => handleDelete(property.id)}>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
