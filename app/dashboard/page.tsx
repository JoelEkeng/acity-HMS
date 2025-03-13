/* eslint-disable */

// @ts-nocheck

import { Avatar } from "@/components/dashboard/avatar";
import { Badge } from "@/components/dashboard/badge";
import { Divider } from "@/components/dashboard/divider";
import { Heading, Subheading } from "@/components/dashboard/heading";
import { Select } from "@/components/dashboard/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/table";
import { getRecentOrders } from "@/data";
import { noSSR } from "next/dynamic";
import { CiEdit, CiTrash} from "react-icons/ci";
// import { FaPlus } from "react-icons/fa6";
// import ColumnChart from '@/components/Charts'
// import BarCharts from "@/components/BarChart";
// import Papaparse from "@/components/papaparse";

export function Stat({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith("+") ? "lime" : "pink"}>{change}</Badge>{" "}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  );
}

function timeOfDay (){
    const time = new Date().getHours();
    if (time < 12) {
        return "Good morning";
    } else if (time < 18) {
        return "Good afternoon";
    } else {  
        return "Good evening";
    }
}


export default async function Home() {
  let orders = await getRecentOrders();

  return (
    <>
      <Heading>{`${timeOfDay()}, Erica`}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>
      <div>
          <Subheading>Revenue</Subheading>
          {/* <div className="grid grid-cols-2 gap-10">
           <ColumnChart /> 
           <BarCharts />
          </div> */}
      </div>
      <div className="mt-14 flex justify-between">
        <Subheading>Recent orders</Subheading>
        {/* <Papaparse /> */}
      </div>
      
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              href={order.url}
              title={`Order #${order.id}`}
            >
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-4">
                <button>
                <CiEdit size={15}/>
                </button>
                <button>
                <CiTrash size={15}/>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </>
  );
}