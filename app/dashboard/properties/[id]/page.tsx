// import { Stat } from '@/app/page'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getProperty } from '@/api/properties'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let property = await getProperty(Number(params.id))

  return {
    title: property?.name,
  }
}

export default async function Property({ params }: { params: { id: string } }) {
  let property = await getProperty(Number(params.id))
  // let orders = await getPropertyOrders(Number(params.id))

  if (!property) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/properties" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Properties
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <img className="aspect-[3/2] rounded-lg shadow" src={property.imgUrl} alt="" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{property.name}</Heading>
              <Badge color={property.status === 'Available' ? 'lime' : 'zinc'}>{property.status}</Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {property.address} <span aria-hidden="true">·</span> {property.city}, {property.region}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline>Edit</Button>
          <Button>View</Button>
        </div>
      </div>
      {/* <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat title="Property value" value={`US${property.value}`} />
        <Stat title="Area" value={`${property.area} sq ft`} />
        <Stat title="Year Built" value={property.yearBuilt} />
      </div> */}
      {/* <Subheading className="mt-12">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: any) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </>
  )
}
