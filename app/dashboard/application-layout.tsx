/* eslint-disable */
// @ts-nocheck

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
  HomeIcon,
  TicketIcon,
  Square2StackIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";
import { Divider } from "@/components/dashboard/divider";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

function AccountDropdownMenu({ anchor }) {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu className="min-w-64 z-50" anchor={anchor}>
      <DropdownItem href="/dashboard/settings" className="flex">
        <Avatar src="/user/avatar.png" className="size-8" />
        <DropdownLabel>My Account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem className="flex">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-md hover:bg-muted"
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <DropdownLabel>Theme</DropdownLabel>
      </DropdownItem>
      <DropdownItem onClick={logout}>
        <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
        <DropdownLabel>Sign Out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({ events, children }) {
  const pathname = usePathname();
  const { user, loading, error } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      {/* Top Navbar */}
      <Navbar className="fixed top-0 z-50 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800">
        <NavbarSection>
          {/* Sidebar Toggle on mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </NavbarSection>
      </Navbar>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-zinc-900 shadow-md border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:translate-x-0`}
        >
          <Sidebar className="flex flex-col h-full">
            {/* Logo + App Name */}
            <SidebarHeader className="flex justify-center p-6">
              <Image src="/logo.png" alt="logo" width={200} height={200} className="object-contain" />
            </SidebarHeader>

            <SidebarHeading className="text-center text-2xl md:text-4xl font-bold tracking-widest text-zinc-900 dark:text-white">
              ACityHost
            </SidebarHeading>

            <Divider soft className="my-4" />

            {/* Links */}
            <SidebarBody className="flex-1 overflow-y-auto">
              <SidebarSection className="space-y-2">
                <SidebarItem href="/dashboard" current={pathname === "/dashboard"}>
                  <HomeIcon className="h-5 w-5" />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>

                <SidebarItem href="/dashboard/booking" current={pathname.startsWith("/dashboard/booking")}>
                  <TicketIcon className="h-5 w-5" />
                  <SidebarLabel>Book Housing</SidebarLabel>
                </SidebarItem>

                <SidebarItem href="/dashboard/maintenance" current={pathname.startsWith("/dashboard/maintenance")}>
                  <Square2StackIcon className="h-5 w-5" />
                  <SidebarLabel>Report Issues</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>

            {/* Profile */}
            <SidebarFooter className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <Dropdown>
                <DropdownButton as={SidebarItem} className="p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Avatar src="/user/avatar.png" className="size-8" />
                    <div className="flex flex-col text-left truncate">
                      <span className="font-semibold truncate">{user?.fullName || "Loading..."}</span>
                      <span className="text-xs text-muted-foreground truncate">{user?.email || "Loading..."}</span>
                    </div>
                  </div>
                  <ChevronUpIcon className="h-5 w-5 ml-auto" />
                </DropdownButton>
                <AccountDropdownMenu anchor="top start" />
              </Dropdown>
            </SidebarFooter>
          </Sidebar>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-50 dark:bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}
