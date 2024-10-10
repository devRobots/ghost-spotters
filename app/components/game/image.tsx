/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react";

import Spot from "@/components/game/spot";
import Spinner from "@/components/game/spinner";
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
          <img src={image} alt="scene" className="rounded-xl absolute" />
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
          <Spinner />
      }
    </section>
  );
}