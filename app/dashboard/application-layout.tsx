/* eslint-disable */
//@ts-nocheck

"use client";

import { Avatar } from "@/components/dashboard/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dashboard/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/dashboard/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/dashboard/sidebar";
import { SidebarLayout } from "@/components/dashboard/sidebar-layout";
import { getEvents } from "@/data";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  Square2StackIcon,
  TicketIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/20/solid";
import { Divider } from '@/components/dashboard/divider'
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react"
import Image from 'next/image';

function AccountDropdownMenu({
  anchor,
}: {
  anchor: "top start" | "bottom end";
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      
      <DropdownDivider />
      <DropdownItem onClick={()=>signOut({callbackUrl: '/login'})}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}


export function ApplicationLayout({
  events,
  children,
}: {
  events: Awaited<ReturnType<typeof getEvents>>;
  children: React.ReactNode;
}) {
  let pathname = usePathname();
  /*const session = useSession();
  if (!session) {
    console.log("DEBUG::session", session);
    signOut({callbackUrl: '/login'});
  }; */

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/user/avatar.png" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar className="max-lg:hidden shadow-2xl">
          <SidebarHeader>
            <Image src="/logo.png" alt="logo" width={250} height={250} className="mx-auto"/>
          </SidebarHeader>
          <SidebarHeading className="font-semibold text-center md:text-3xl -mt-4 mb-12 text-black dark:text-white ">ACityHost</SidebarHeading>

          <Divider soft />
          
          <SidebarBody className="mt-12">
            <SidebarSection>
              <SidebarItem href="/dashboard" current={pathname === "/"}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/dashboard/properties"
                current={pathname.startsWith("/dashboard/properties")}
              >
                <Square2StackIcon />
                <SidebarLabel>Rooms</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/dashboard/reservations"
                current={pathname.startsWith("/dashboard/reservations")}
              >
                <TicketIcon />
                <SidebarLabel>Book Hostel</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/dashboard/settings"
                current={pathname.startsWith("/dashboard/settings")}
              >
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    src="/user/avatar.png"
                    className="size-10"
                    square
                    alt=""
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      Joel Ekeng
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      joel.ekenga@acity.edu.gh
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
