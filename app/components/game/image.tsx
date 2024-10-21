"use client"
import NextImage from "next/image";
import { useEffect, useState } from "react";

import Spot from "@/components/game/spot";
import Loader from "@/components/game/loader";
import { useGameStore } from "@/providers/game";

export default function ImageSpotter() {
  const { load, status } = useGameStore((state) => state)
  const [image, setImage] = useState("");
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch("/api/image", { cache: "no-cache" })
      .then(res => res.json())
      .then(data => {
        const url = data.image + "?seed=" + Math.random();
        const img = new Image();
        img.src = url;
        img.addEventListener("load", () => {
          setImage(url);
          setSpots(data.spots);
        })
      })
  }, [load])

  return (
    <section className="relative w-[1024px] min-h-[682px] h-[682px]">
      {
        status === "loading" ? <Loader ready={!image} /> :
          <>
            <NextImage unoptimized src={image} placeholder="blur" blurDataURL={image} alt="scene" className="rounded-xl absolute" width={1024} height={682} />
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
          </>
      }
    </section>
  );
}