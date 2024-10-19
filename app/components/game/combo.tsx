"use client";

import { useState, useEffect } from "react";
import { ZapIcon } from "lucide-react";

import { COMBO_TIMEOUT } from "@/consts";
import { useGameStore } from "@/providers/game";

export default function Combo(
) {
  const [time, setTime] = useState(0);
  const { status, combo, resetCombo } = useGameStore((state) => state);

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
    time === 0 || status === "gameover" ? null :
      <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-800 text-white">
        <ZapIcon className="h-6 w-6" />
        <span className="text-xl">X{combo}</span>
      </div >
  );
}