"use client";
import Image from "next/image";
import { useGameStore } from "@/providers/game";
import useHorrorSounds from "@/hooks/useHorrorSounds";

export default function Screamer() {
  const { } = useHorrorSounds();
  const { isScreaming, ghost } = useGameStore((state) => state);

  return (
    <section
      hidden={!isScreaming}
      className="absolute top-0 left-0 w-full h-full"
    >
      <Image
        src={`/images/ghost${ghost}.webp`}
        alt="scream"
        width={720}
        height={853}
        className="absolute w-2/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  );
}
