"use client";

import { useGameStore } from "@/providers/game";
import Image from "next/image";

export default function FindScore() {
  const { finds } = useGameStore((state) => state);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-800 text-white text-2xl">
      Ghosts:
      {
        finds.map((_, index) => {
          return (
            <Image
              className="sepia"
              key={index}
              src={`/images/ghost${index}.webp`}
              alt="ghost"
              width={24} height={24} />
          )
        })
      }
    </div >
  );
}