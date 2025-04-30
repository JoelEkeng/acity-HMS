/* eslint-disable */
//@ts-nocheck

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  TicketIcon,
  Square2StackIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Avatar } from "@/components/dashboard/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownDivider,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dashboard/dropdown";
import { NavbarItem } from "@/components/dashboard/navbar";
import { useAuth } from "@/context/AuthContext";

function AccountDropdownMenu({ anchor }: { anchor: "top start" | "bottom end" }) {
  const { logout } = useAuth();
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={logout}>
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({
  events,
  children,
}: {
  events: any;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/admin/dashboard/", icon: HomeIcon, label: "Home" },
    { href: "/admin/dashboard/hostel", icon: TicketIcon, label: "Current Occupants" },
    { href: "/admin/dashboard/maintenance", icon: Square2StackIcon, label: "Maintenance / Maintenance Log" },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-semibold text-gray-800">Admin Dashboard</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 relative">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1 text-sm font-medium px-2 py-1 transition-all relative ${
                  isActive(href) ? "text-red-600" : "text-gray-600 hover:text-black"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
                {isActive(href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-2xl transition-all" />
                )}
              </Link>
            ))}
          </div>

          {/* Avatar */}
          <div className="hidden md:block">
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/user/avatar.png" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive(href)
                    ? "bg-red-100 text-red-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}

            {/* Avatar Dropdown on mobile */}
            <div className="mt-2 px-4">
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar src="/user/avatar.png" square />
                </DropdownButton>
                <AccountDropdownMenu anchor="bottom end" />
              </Dropdown>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
