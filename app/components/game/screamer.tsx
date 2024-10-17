"use client";
import Image from "next/image";
import { useGameStore } from "@/providers/game";
import { useEffect } from "react";
import useSound from "use-sound";

export default function Screamer() {
  const [play] = useSound("/sounds/scream.mp3", { volume: 1, interrupt: false });
  const { isScreaming, ghost, stopScream } = useGameStore((state) => state);

  useEffect(() => {
    if (isScreaming) {
      play();
      setTimeout(() => {
        stopScream()
      }, 2500);
    }
  }, [isScreaming, stopScream, play]);

  return (
    <section
      hidden={!isScreaming}
      className="absolute top-0 left-0 w-full h-full"
    >
      <Image
        src={`/ghosts/ghost-${ghost}.webp`}
        alt="scream"
        width={720}
        height={853}
        className="absolute w-2/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  );
}
