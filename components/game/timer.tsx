"use client";
import { useState, useEffect } from "react";

import { TIMEOUT } from "@/app/consts";
import { ClockIcon } from "lucide-react";
import Digits from "@/components/ui/digits";
import { useGameStore } from "@/app/providers/game";


export default function Timer() {
  const { loading, gameOver, inGame } = useGameStore((state) => state);
  const [time, setTime] = useState(TIMEOUT);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && inGame) setTime(time - 1);
      if (time === 1) gameOver();
    }, 1000);

    return () => clearInterval(interval);
  }, [time, setTime, loading, gameOver, inGame]);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <ClockIcon className="h-6 w-6" />
      <div className="flex flex-row items-center font-mono">
        <span className="text-xl flex items-center">
          <Digits digits={2} value={Math.floor(time / 60)} />
        </span>
        <span className="text-xl">:</span>
        <span className="text-xl">
          <Digits digits={2} value={time % 60} />
        </span>
      </div>
    </div >
  );
}