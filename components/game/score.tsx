"use client";
import { useContext } from "react";

import { GemIcon } from "lucide-react";

import Digits from "@/components/ui/digits";
import { GameContext } from "@/context/GameContext";

export default function Score() {
  const { score } = useContext(GameContext);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <GemIcon className="h-6 w-6" />
      <span className="text-xl">
        <Digits digits={4} value={score} />
      </span>
    </div >
  );
}