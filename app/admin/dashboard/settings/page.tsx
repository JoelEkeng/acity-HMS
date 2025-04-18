import { Button } from '@/components/dashboard/button'
import { Divider } from '@/components/dashboard/divider'
import { Heading, Subheading } from '@/components/dashboard/heading'
import { Input } from '@/components/dashboard/input'
import { Select } from '@/components/dashboard/select'
import { Text } from '@/components/dashboard/text'
import type { Metadata } from 'next'
import { Address } from './address'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function Settings() {
  return (
    <form method="post" className="mx-auto max-w-4xl">
      <Heading>Settings</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Current Accomodation Name</Subheading>
        </div>
        <div>
          <Input aria-label="Organization Name" name="name" defaultValue="ACity Hostel" />
        </div>
      </section>


      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Address</Subheading>
          <Text>Hostel Location.</Text>
        </div>
        <Address />
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Currency</Subheading>
          <Text>The currency that your organization will be collecting.</Text>
        </div>
        <div>
          <Select aria-label="Currency" name="currency" defaultValue="cad">
            <option value="cad">GHS - Ghana Cedis</option>
            <option value="ngn">NGN - Nigerian Naira</option>
            <option value="usd">USD - United States Dollar</option>
          </Select>
        </div>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}
