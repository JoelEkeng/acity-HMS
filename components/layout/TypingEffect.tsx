"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffect() {
  const words = [
    {
      text: "Smart ",
    },
    {
      text: "Living",
    },
    {
      text: ",",
    },
    {
      text: "Seamless ",
    },
    {
      text: "Stay.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words}/>
    </div>
  );
}
