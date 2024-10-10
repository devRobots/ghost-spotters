"use client";

import { useState, useEffect } from "react";
import { HourglassIcon, ZapIcon } from "lucide-react";

import Digits from "@/components/ui/digits";
import { COMBO_TIMEOUT } from "@/app/consts";
import { useGameStore } from "@/app/providers/game";

export default function Combo(
) {
  const [time, setTime] = useState(0);
  const { combo, resetCombo } = useGameStore((state) => state);

  useEffect(() => {
    if (combo > 1) setTime(COMBO_TIMEOUT);
  }, [combo]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) setTime(time - 1);
      if (time === 0) resetCombo();
    }, 1000);

    return () => clearInterval(interval);
  }, [time, resetCombo]);


  return (
    time === 0 ? null :
      <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
        <ZapIcon className="h-6 w-6" />
        <span className="text-xl">X{combo}</span>
        |
        <div className="flex flex-row gap-3 items-center font-mono">
          <HourglassIcon className="h-6 w-6" />
          <span className="text-xl">
            <Digits digits={2} value={time} />
          </span>
        </div>
      </div >
  );
}