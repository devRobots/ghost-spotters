"use client";

import { useState } from "react";

import Score from "@/components/game/score";
import Combo from "@/components/game/combo";
import Timer from "@/components/game/timer";
import Counter from "@/components/game/counter";
import FindScore from "@/components/game/finds";
import ImageSpotter from "@/components/game/image";

const TIMEOUT = 180;
const NUM_IMAGES = 3;
const SPOTS_PER_IMAGE = 5;

export default function Game() {
  const [score, setScore] = useState(0);
  const [finds, setFinds] = useState(0);
  const [combo, setCombo] = useState(1);
  const [solved, setSolved] = useState(1);

  const handleClick = () => {
    setFinds(finds + 1);
    setScore(score + (10 * combo));
    setCombo(combo * 2);

    if (finds === 4) {
      setFinds(0);
      setSolved(solved + 1);
    }
  };

  return (
    <main className="grid place-content-center min-h-screen w-screen gap-8">
      <section className="flex flex-row justify-between">
        <h1 className="text-yellow-700 text-center text-4xl font-bold">
          Spot AI
        </h1>
        <section className="flex flex-row gap-4">
          <Score score={score} />
          <Timer seconds={TIMEOUT} />
          <Counter solved={solved} total={NUM_IMAGES} />
        </section>
      </section>
      <ImageSpotter
        finds={finds}
        solved={solved}
        numImages={NUM_IMAGES}
        spotsPerImage={SPOTS_PER_IMAGE}
        onClickSpot={handleClick}
      />
      <section className="flex flex-row justify-between">
        <FindScore finds={finds} total={SPOTS_PER_IMAGE} />
        {combo > 1 && <Combo combo={combo} setter={setCombo} />}
      </section>
    </main>
  );
}
