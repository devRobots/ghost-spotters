"use client";

import Image from "next/image";
import { useState } from "react";

import Score from "@/components/ui/score";
import Spots from "@/components/ui/spots";
import Combo from "@/components/ui/combo";
import Counter from "@/components/ui/counter";
import Timer from "@/components/ui/timer";

export default function Game() {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(180);
  const [solved, setSolved] = useState(1);
  const [finds, setFinds] = useState(0);
  const [combo, setCombo] = useState(1);

  const handleClick = () => {
    setFinds(finds + 1);
    setScore(score + (10 * combo));
    setCombo(combo + 1);

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
          <Timer seconds={timer} />
          <Counter solved={solved} total={3} />
        </section>
      </section>
      <section className="grid grid-cols-2 gap-8">
        <Image
          onClick={handleClick}
          className="rounded-lg shadow-lg"
          src="https://cdn.pixabay.com/photo/2014/02/20/13/21/flea-market-270566_1280.jpg"
          width={712}
          height={477}
          alt=""
        />
        <Image
          onClick={handleClick}
          className="rounded-lg shadow-lg"
          src="https://cdn.pixabay.com/photo/2014/02/20/13/21/flea-market-270566_1280.jpg"
          width={712}
          height={477}
          alt=""
        />
      </section>
      <section className="flex flex-row justify-between">
        <Spots finds={finds} total={5} />
        {combo > 1 && <Combo combo={combo} setter={setCombo} />}
      </section>
    </main>
  );
}
