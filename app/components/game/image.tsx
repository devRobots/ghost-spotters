/* eslint-disable @next/next/no-img-element */
import { NUM_SPOTS } from "@/consts";
import GhostImage from "@/components/game/ghost";

export default async function ImageSpotter() {
  const result = await fetch(`http://localhost:3000/api/image?spots=${NUM_SPOTS}`);
  const { image, spots } = await result.json();

  return (
    <section className="relative w-[1280px] min-h-[853px] h-[853px]">
      <div className="relative w-full h-full">
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
      </div>
    </section>
  );
}