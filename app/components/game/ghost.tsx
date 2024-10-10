"use client";
import Image from "next/image"
import { useEffect, useState } from "react"

import { useGameStore } from "@/providers/game";

export default function GhostImage(
  { index, x, y, w, h }:
    { index: number, x: number, y: number, w: number, h: number }
) {
  const { inGame, load, scoreUp } = useGameStore((state) => state)
  const [spotted, setSpotted] = useState(false);

  const handleClick = () => {
    if (spotted) return;
    scoreUp();
    setSpotted(true);
  };

  useEffect(load, [load]);
  useEffect(() => {
    if (!inGame) {
      setSpotted(true)
    }
  }, [inGame])

  return (
    <div className={
      `absolute top-[${y}px] left-[${x}px] w-[${w}px] min-h-[${h}px] ` +
      (spotted ? "border-red-600 border-2" : "")
    }>
      <Image
        alt="ghost"
        onClick={handleClick}
        src={`/ghosts/ghost-${index}.png`}
        width={w}
        height={h} />
    </div>
  )
}