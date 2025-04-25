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
import Image from 'next/image';
import axios from "axios";
import { useState, useEffect } from "react";

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
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('https://acityhost-backend.onrender.com/api/me', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });        
        setUser(response.data); // fixed here
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError(err.response?.data?.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
  
  // Add loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Add error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

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
            <SidebarSection className="gap-10">
              <SidebarItem href="/dashboard" current={pathname === "/"}>
                <HomeIcon />
                <SidebarLabel className="font-medium text-lg md:text-xl">Home</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/dashboard/booking"
                current={pathname.startsWith("/dashboard/booking")}
              >
                <TicketIcon />
                <SidebarLabel className="font-medium text-lg md:text-xl">Book Housing</SidebarLabel>
              </SidebarItem>
              
              <SidebarItem
                href="/dashboard/maintenance"
                current={pathname.startsWith("/dashboard/maintenance")}
              >
                <Square2StackIcon />
                <SidebarLabel className="font-medium text-lg md:text-xl">Maintenance</SidebarLabel>
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
                      {user?.fullName || 'Loading...'}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user?.email || 'Loading...'}
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
