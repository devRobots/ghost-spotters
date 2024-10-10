"use client";
import { GemIcon } from "lucide-react";

import Digits from "@/components/ui/digits";
import { useGameStore } from "@/providers/game";

export default function Score() {
  const { score } = useGameStore((state) => state);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <GemIcon className="h-6 w-6" />
      <span className="text-xl">
        <Digits digits={5} value={score} />
      </span>
    </div >
  );
}