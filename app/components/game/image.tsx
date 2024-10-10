/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react";

import { NUM_SPOTS } from "@/consts";
import { useGameStore } from "@/providers/game";
import Spinner from "@/components/game/spinner";
import GhostImage from "@/components/game/ghost";

export default function ImageSpotter() {
  const { load } = useGameStore((state) => state)
  const [image, setImage] = useState("");
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/image?spots=${NUM_SPOTS}`)
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
          <img src={image} alt="scene" className="absolute" />
          {
            spots.map((spot: number[], index: number) => {
              const [x, y, w, h] = spot;
              return (
                <GhostImage
                  key={`ghost-${index}`}
                  index={index}
                  x={x}
                  y={y}
                  w={w}
                  h={h}
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