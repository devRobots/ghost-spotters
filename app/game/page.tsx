"use client";

import { useState } from "react";

import Score from "@/components/game/score";
import Combo from "@/components/game/combo";
import Timer from "@/components/game/timer";
import FindScore from "@/components/game/finds";
import ImageCanvas from "@/components/game/canvas";

export default function Game() {
  const [score, setScore] = useState(0);
  const [finds, setFinds] = useState(0);
  const [combo, setCombo] = useState(1);

  const handleClick = () => {
    alert("Hola Mundo");

    setFinds(finds + 1);
    setScore(score + (10 * combo));
    setCombo(combo * 2);
  };

  return (
    <main className="grid place-content-center min-h-screen w-screen gap-8">
      <section className="flex flex-row justify-between">
        <h1 className="text-yellow-700 text-center text-4xl font-bold">
          GhostSpotters
        </h1>
        <section className="flex flex-row gap-4">
          {combo > 1 && <Combo combo={combo} setter={setCombo} />}
          <FindScore finds={finds} />
          <Score score={score} />
          <Timer />
        </section>
      </section>
      <ImageCanvas onClickSpot={handleClick} />
    </main>
  );
}
