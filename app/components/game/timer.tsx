/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { ClockIcon } from "lucide-react";

import Digits from "@/components/ui/digits";
import { useGameStore } from "@/providers/game";
import { redirect } from "next/navigation";


export default function Timer() {
  const { status, result, gameOver, time, tick } = useGameStore((state) => state);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === "playing") tick();
      if (time === 1) gameOver("lose");
    }, 1000);

    return () => clearInterval(interval);
  }, [time, status, gameOver, tick]);

  useEffect(() => {
    if (status !== "gameover") return;
    if (result === "lose") redirect("/gameover")
    if (result === "win") redirect("/win");
  }, [status, result]);

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