import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getTenants } from '@/api/tenants'
// import { getEntities } from '@/api/entities'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FaUserPlus } from "react-icons/fa6";


export const metadata: Metadata = {
  title: 'Tenants',
}

export default async function Orders() {
  let tenants = await getTenants()
  // let entities = await getEntities()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Tenants</Heading>
        <Link href={'/dashboard/tenants/form'}>
        <Button className="-my-0.5"><FaUserPlus aria-label='Add Tenant' width={50}/></Button>
        </Link>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Entity</TableHeader>
            <TableHeader>Payment</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenants?.data?.map((tenant: any) => (
            <TableRow key={tenant.id} title={`Tenants #${tenant.id}`}>
              <TableCell>{tenant.name}</TableCell>
              <TableCell className="text-zinc-500">{tenant.email}</TableCell>
              <TableCell>{tenant.phone_number}</TableCell>
              <TableCell>{tenant.status}</TableCell>
              <TableCell>Paid</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
