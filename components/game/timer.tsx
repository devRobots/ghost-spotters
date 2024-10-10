"use client";
import { useState, useEffect } from "react";

import { TIMEOUT } from "@/app/consts";
import { ClockIcon } from "lucide-react";
import Digits from "@/components/ui/digits";
import { useGameStore } from "@/app/providers/game";


export default function Timer() {
  const { loading, gameOver } = useGameStore((state) => state);
  const [seconds, setSeconds] = useState(TIMEOUT % 60);
  const [minutes, setMinutes] = useState(Math.floor(TIMEOUT / 60));

  useEffect(() => {
    const interval = setInterval(() => {
      if (loading) {
        return;
      }
      if (minutes === 0 && seconds === 0) {
        gameOver();
      }
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, seconds, minutes, gameOver]);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <ClockIcon className="h-6 w-6" />
      <div className="flex flex-row items-center font-mono">
        <span className="text-xl flex items-center">
          <Digits digits={2} value={minutes} />
        </span>
        <span className="text-xl">:</span>
        <span className="text-xl">
          <Digits digits={2} value={seconds} />
        </span>
      </div>
    </div >
  );
}