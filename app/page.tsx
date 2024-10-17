import { Jolly_Lodger } from "next/font/google";

import Fog from "@/components/game/fog";
import Score from "@/components/game/score";
import Combo from "@/components/game/combo";
import Timer from "@/components/game/timer";
import FindScore from "@/components/game/finds";
import Screamer from "@/components/game/screamer";
import ImageSpotter from "@/components/game/image";

import { GameStoreProvider } from "@/providers/game";

const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });

export default function Game() {
  return (
    <GameStoreProvider>
      <main className="flex flex-col items-center gap-8 m-8">
        <section className="flex flex-row justify-between w-2/3">
          <h1
            className={
              "text-green-500 text-center text-5xl font-bold " + jolly.className
            }
          >
            GhostSpotters
          </h1>
          <section className="flex flex-row gap-4">
            <Combo />
            <Score />
            <FindScore />
            <Timer />
          </section>
        </section>
        <section className="static">
          <Fog />
          <ImageSpotter />
          <Screamer />
        </section>
      </main>
    </GameStoreProvider>
  );
}
