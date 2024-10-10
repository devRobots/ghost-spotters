"use client"
import NextImage from "next/image";
import { useEffect, useState } from "react";

import Spot from "@/components/game/spot";
import { useGameStore } from "@/providers/game";

export default function ImageSpotter() {
  const { load } = useGameStore((state) => state)
  const [image, setImage] = useState("");
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch("/api/image")
      .then(res => res.json())
      .then(data => {
        const img = new Image();
        img.src = data.image;
        img.addEventListener("load", () => {
          load()
          setImage(data.image);
          setSpots(data.spots);
        })
      })
  }, [load])

  return (
    <section className="relative w-[1280px] min-h-[853px] h-[853px]">
      {
        image ? <>
          <NextImage unoptimized src={image} alt="scene" className="rounded-xl absolute" width={1280} height={853} />
          {
            spots.map((spot: number[], index: number) => {
              const [x, y, w, h] = spot;
              return (
                <Spot
                  key={`ghost-${index}`}
                  index={index}
                  x={x} y={y}
                  w={w} h={h}
                />
              )
            })
          }
        </> :
          <NextImage unoptimized className="object-fill w-[1280x] h-[853px]" src={"/white-noise.gif"} alt="spinner" width={1280} height={853} />
      }
    </section>
  );
}