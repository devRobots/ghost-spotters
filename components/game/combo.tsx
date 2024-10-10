"use client";

import Digits from "@/components/ui/digits";
import { useState, useEffect, useContext } from "react";
import { HourglassIcon, ZapIcon } from "lucide-react";
import { GameContext } from "@/context/GameContext";

export default function Combo(
) {
  const { combo, setCombo } = useContext(GameContext);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (combo > 1) {
      setSeconds(10);
    }
  }, [combo]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        setCombo(1);
        return;
      }
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, setCombo]);

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