"use client";
import { useState } from "react";

import { useGameStore } from "@/providers/game";

export default function Spot(
  { index, x, y, w, h }:
    { index: number; x: number; y: number; w: number; h: number; }
) {
  const { inGame, scoreUp, scream } = useGameStore((state) => state);
  const [spotted, setSpotted] = useState(false);

  const handleClick = () => {
    if (spotted || !inGame) return;
    scream(index);
    scoreUp();
    setSpotted(true);
  };

  return (
    <div
      style={{ position: "absolute", top: y, left: x, width: w, height: h }}
      onClick={handleClick}
      className={
        spotted
          ? "border-green-500 border-4"
          : !inGame
            ? "border-red-500 border-4"
            : ""
      }
    />
  );
}
