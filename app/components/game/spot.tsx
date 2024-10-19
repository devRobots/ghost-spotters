"use client";
import { useState } from "react";

import { useGameStore } from "@/providers/game";

export default function Spot(
  { index, x, y, w, h }:
    { index: number; x: number; y: number; w: number; h: number; }
) {
  const { status, scoreUp, isScreaming } = useGameStore((state) => state);
  const [spotted, setSpotted] = useState(false);

  const handleClick = () => {
    if (spotted || isScreaming || status === "gameover") return;
    scoreUp(index);
    setSpotted(true);
  };

  return (
    <div
      style={{ position: "absolute", top: y, left: x, width: w, height: h }}
      onClick={handleClick}
      className={
        spotted
          ? "border-green-500 border-4"
          : status === "gameover"
            ? "border-red-500 border-4"
            : ""
      }
    />
  );
}
