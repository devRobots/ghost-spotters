"use client";

import { useState, useEffect } from "react";
import { HourglassIcon, ZapIcon } from "lucide-react";

import Digits from "@/components/ui/digits";
import { COMBO_TIMEOUT } from "@/app/consts";
import { useGameStore } from "@/app/providers/game";

export default function Combo(
) {
  const [seconds, setSeconds] = useState(0);
  const { combo, resetCombo } = useGameStore((state) => state);

  useEffect(() => {
    if (combo > 1) {
      setSeconds(COMBO_TIMEOUT);
    }
  }, [combo]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        resetCombo();
        return;
      }
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, resetCombo]);

  if (seconds === 0) {
    return null;
  }

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <ZapIcon className="h-6 w-6" />
      <span className="text-xl">X{combo}</span>
      |
      <div className="flex flex-row gap-3 items-center font-mono">
        <HourglassIcon className="h-6 w-6" />
        <span className="text-xl">
          <Digits digits={2} value={seconds} />
        </span>
      </div>
    </div >
  );
}