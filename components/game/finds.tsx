"use client";
import { useContext } from "react";

import { NUM_SPOTS } from "@/app/consts";
import { Checkbox } from "@/components/ui/checkbox";
import { GameContext } from "@/context/GameContext";

export default function FindScore() {
  const { finds } = useContext(GameContext);
  const items = Array.from(Array(NUM_SPOTS).keys());

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <span className="text-xl">Diferencias:</span>
      <div className="flex flex-row gap-1">
        {
          items.map(item => (
            <Checkbox name={`checkbox-${item}`} key={`checkbox-${item}`} checked={item < finds} />
          ))
        }
      </div>
    </div >
  );
}