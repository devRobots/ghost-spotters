import { Suspense } from "react";

import Score from "@/components/game/score";
import Combo from "@/components/game/combo";
import Timer from "@/components/game/timer";
import FindScore from "@/components/game/finds";
import ImageSpotter from "@/components/game/image";

import { GameStoreProvider } from "@/app/providers/game-provider";
import Spinner from "@/components/game/spinner";

export default function Game() {
  return (
    <GameStoreProvider>
      <main className="grid place-content-center min-h-screen w-screen gap-8">
        <section className="flex flex-row justify-between">
          <h1 className="text-yellow-700 text-center text-4xl font-bold">
            GhostSpotters
          </h1>
          <section className="flex flex-row gap-4">
            <Combo />
            <FindScore />
            <Score />
            <Timer />
          </section>
        </section>
        <Suspense fallback={<Spinner />}>
          <ImageSpotter />
        </Suspense>
      </main>
    </GameStoreProvider>
  );
}
