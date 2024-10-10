"use client";
import { GhostIcon } from "lucide-react";

import { NUM_SPOTS } from "@/consts";
import Digits from "@/components/ui/digits";
import { useGameStore } from "@/providers/game";

export default function FindScore() {
  const { finds } = useGameStore((state) => state);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-800 text-white">
      <GhostIcon className="h-6 w-6 " />
      <div className="flex flex-row gap-1 text-xl">
        <span><Digits digits={2} value={finds} /></span>
        <span>/</span>
        <span><Digits digits={2} value={NUM_SPOTS} /></span>
      </div>
    </div >
  );
}