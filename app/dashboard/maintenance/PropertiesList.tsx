/* eslint-disable */

'use client';

import { Badge } from '@/components/dashboard/badge';
import { Divider } from '@/components/dashboard/divider';
import { Heading } from '@/components/dashboard/heading';
import { Input, InputGroup } from '@/components/dashboard/input';
import { Link } from '@/components/dashboard/link';
import { Select } from '@/components/dashboard/select';
import { MaintenanceTicket } from '@/interfaces'; 
import {MaintenanceForm} from './maintanceForm';
export default function PropertiesList({ properties }: { properties: any[] }) {
    return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Maintenance</Heading>
          <Divider soft={true} className='mt-2 mb-4'/>
          <div className="mt-4 flex max-w-xl gap-4 justify-between">
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

      <div>
        <div className="flex justify-between mt-4 mb-8 items-end">
          <button className="rounded-xl bg-red-500 px-4 py-2">
          <Link href="/dashboard/maintenance/create" className="btn btn-primary">
            Log Complaints
          </Link>
          </button>
        </div>

        <MaintenanceForm />
      </div>
    </>
  );
}
