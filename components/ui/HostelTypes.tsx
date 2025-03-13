"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator"

export function HostelTypes() {
  const features = [
    {
      title: "Single Occupancy Room with AC",
      description:
        "Enjoy the comfort and privacy of a fully air-conditioned single-occupancy room, designed for students who prefer a quiet and personal space. The room is well-furnished with a cozy bed, study desk, chair, and ample storage. Ideal for focused study and relaxation..",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Double Occupancy with AC (Two Separate Beds)",
      description:
        "is air-conditioned room is designed for two students, offering two separate beds for added personal space. Each occupant has their own study desk, chair, and storage. Ideal for those who prefer a shared yet spacious living arrangement.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Double Occupancy with AC (Bunk Bed)",
      description:
        "A budget-friendly yet comfortable option for students who enjoy shared living. This air-conditioned room features a sturdy bunk bed, study desks, and individual storage spaces for each occupant. Perfect for roommates who appreciate both companionship and personal space.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "Double Occupancy with Fan (Bunk Bed)",
      description:
        "A budget-friendly yet comfortable option for students who enjoy shared living. This room features a sturdy bunk bed, study desks, and individual storage spaces for each occupant with Fan. Perfect for roommates who appreciate both companionship and personal space.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  
  return (
  <div>
  <Separator className="w-full bg-red-600"/>
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 10 }}
      transition= {{ ease: "easeIn", duration: 5, repeat: Infinity,}}
      whileInView={{opacity: 1, scale: 1.1}}
      viewport={{ once: true, amount: 0.5 }}
     className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Hostel and Rooms Types
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Different hostel types that suites each students.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-1/2">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
          <Image
            src="/beds/singlebed.jpg"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-center rounded-sm"
          />
        </div>
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
    <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
      {/* TODO */}
      <Image
        src="/beds/bunkbed.jpg"
        alt="header"
        width={800}
        height={800}
        className="h-full w-full aspect-square object-contain object-left-top rounded-sm"
      />
    </div>
  </div>
  );
};

export const SkeletonTwo = () => {
  const images = [
    "/beds/seperatebeds.jpg",
    "/beds/seperatebeds.jpg",
    "/beds/seperatebeds.jpg",
    "/beds/seperatebeds.jpg",
    "/beds/seperatebeds.jpg",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-1/2 overflow-hidden">
      {/* TODO */}
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="bali images"
              width={100}
              height={100}
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
        {/* TODO */}
        <Image
          src="/beds/bunkbed.jpg"
          alt="header"
          width={800}
          height={800}
          className="h-full w-full aspect-square object-contain object-left-top rounded-sm"
        />
      </div>
    </div>
  );
};

