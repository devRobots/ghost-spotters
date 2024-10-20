import Image from "next/image";
import { Jolly_Lodger } from "next/font/google";

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
          <FindScore />
          <Timer />
        </section>
        <section className="static">
          <div className="absolute top-0 left-0 w-full h-full opacity-15">
            <Image
              src="/images/ghost0.webp"
              alt="fog"
              width={720}
              height={853}
              className="absolute h-full"
            />
          </div>
          <ImageSpotter />
          <Screamer />
        </section>
      </main>
    </GameStoreProvider>
  );
}
