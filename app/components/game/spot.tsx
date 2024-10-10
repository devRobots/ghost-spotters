"use client";
import { useEffect, useState } from "react"

import { useGameStore } from "@/providers/game";

export default function Spot(
  { index, x, y, w, h }:
    { index: number, x: number, y: number, w: number, h: number }
) {
  const { inGame, scoreUp } = useGameStore((state) => state)
  const [spotted, setSpotted] = useState(false);

  const handleClick = () => {
    // TODO: Jumpscare
    console.log(index);
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
    <div style={{ position: "absolute", top: y, left: x, width: w, height: h }} className={spotted ? "border-green-500 border-4" : ""} onClick={handleClick} />
  )
}