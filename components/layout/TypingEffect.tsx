"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffect() {
  const words = [
    {
      text: "A hostel",
    },
    {
      text: "management",
    },
    {
      text: "system that helps",
    },
    {
      text: "you manage your",
    },
    {
      text: " booking with ease.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words}/>
    </div>
  );
}
