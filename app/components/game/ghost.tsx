"use client";
import Image from "next/image"
import { useEffect, useState } from "react"

import { useGameStore } from "@/providers/game";

export default function GhostImage(
  { index, x, y, w, h }:
    { index: number, x: number, y: number, w: number, h: number }
) {
  const { inGame, loading, scoreUp } = useGameStore((state) => state)
  const [spotted, setSpotted] = useState(false);

  const handleClick = () => {
    if (spotted) return;
    scoreUp();
    setSpotted(true);
  };

  useEffect(() => {
    if (!inGame) {
      setSpotted(true)
    }
  }, [inGame])

  return (
    <div style={{ position: "absolute", top: y, left: x, width: w, height: h }} className={spotted ? "border-red-600 border-2" : ""}>
      <Image style={{ opacity: 0.8 }}
        hidden={loading}
        alt="ghost"
        onClick={handleClick}
        src={`/ghosts/ghost-${index}.png`}
        width={w}
        height={h} />
    </div>
  )
}