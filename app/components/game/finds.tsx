"use client";

import { useGameStore } from "@/providers/game";
import { ScanEyeIcon } from "lucide-react";
import Image from "next/image";

export default function FindScore() {
  const { finds } = useGameStore((state) => state);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-800 text-white text-2xl">
      <ScanEyeIcon className="mr-2" />
      {
        finds.map((spotted, index) => {
          return (
            <div key={`ghost-${index}`} className="relative">
              <Image
                className="static sepia"
                src={`/images/ghost${index}.webp`}
                alt="ghost"
                width={24} height={24} />
              <span hidden={spotted} className="absolute top-0 text-4xl text-red-900 font-bold">X</span>
            </div>
          )
        })
      }
    </div >
  );
}