/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useSound from "use-sound";
import { ClockIcon } from "lucide-react";
import { useEffect } from "react";

import Digits from "@/components/ui/digits";
import { useGameStore } from "@/providers/game";


export default function Timer() {
  const [play] = useSound("/sounds/ambient.mp3", { volume: 0.25, interrupt: false });
  const { status, gameOver, time, tick } = useGameStore((state) => state);

  useEffect(() => {
    play();

    const interval = setInterval(() => {
      if (status === "playing") tick();
      if (time === 1) gameOver("lose");
    }, 1000);

    return () => clearInterval(interval);
  }, [time, status, gameOver, play, tick]);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-800 text-white">
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