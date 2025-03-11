"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Typography } from "@mui/joy";
import {
  Lock,
  House,
  Wifi,
  History,
  UsersRound
} from "lucide-react";
import Image from "next/image";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export function Feature() {
  return (
    <>
    <Typography className="text-center mt-24 mb-12 xs:text-md md:text-lg lg:text-5xl font-semibold">
    Why use ACity Hostel Management System?
    </Typography>
    <BentoGrid className="max-w-4xl mx-auto mb-24">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
    </>
  );
}

const Camera = () => (
  <div className="flex">
    <DotLottieReact
    src="https://lottie.host/6b3bae7b-5ca2-41de-940c-a04fa6cbfe4b/yvC9IEnQbK.lottie"
    loop
    autoplay
    className="w-36 h-36"/>
    <DotLottieReact
    src="https://lottie.host/ad453b18-9f48-4b3a-a9c0-e2d52772be20/aQhinc6KnF.lottie"
    loop
    autoplay
    className="w-36 h-36"/>,
  </div>
);

const items = [
  {
    title: "Easy Hostel Booking",
    description: "Book rooms in a few clicks.",
    header: <DotLottieReact
    src="https://lottie.host/5249db1f-2232-4d21-9885-4376c2f1eafa/4guWHc001U.lottie"
    loop
    autoplay
    className="w-60 h-60"/>,
    icon: <House className="h-8 w-8 text-neutral-500" />,
  },
  {
    title: "24/7 Security",
    description: "Feel safe with round-the-clock security and secure lockers for your belongings.",
    header: <Camera />,
    icon: <Lock className="h-8 w-8 text-neutral-500" />,
  },
  {
    title: "Real-Time Availability",
    description: "See available hostels instantly.",
    header: <DotLottieReact
    src="https://lottie.host/ece9e0c8-703f-401a-b276-2c254a5adce9/FMlxjHX2NP.lottie"
    loop
    autoplay
    className="w-48 h-48"/>,
    icon: <History className="h-8 w-8 text-neutral-500" />,
  },
  {
    title: "High Speed Wifi",
    description:
      "Stay connected with our lightning-fast internet throughout the hostel.",
    header: <DotLottieReact
    src="https://lottie.host/c509677a-715d-4d4c-9a0c-7c2a14a6c355/IrpkIXrRau.lottie"
    loop
    autoplay
    className="w-36 h-36"/>,
    icon: <Wifi className="h-8 w-8 text-neutral-500" />,
  },
  {
    title: "Vibrant Community",
    description:
      "Join daily social events and communicate with students from around the world.",
      header: <DotLottieReact
      src="https://lottie.host/d55ea4f8-664b-4479-8c25-7bab9bea0cee/wZumk9iL3f.lottie"
      loop
      autoplay
      className="w-48 h-48"/>,
    icon: <UsersRound className="h-8 w-8 text-neutral-500" />,
  },
];
