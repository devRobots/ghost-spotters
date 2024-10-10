import { NUM_SPOTS } from "@/app/consts";
import Canvas from "@/components/game/canvas";

export default async function ImageSpotter() {
  const result = await fetch(`http://localhost:3000/api/image?spots=${NUM_SPOTS}`);
  const { image, spots } = await result.json();

  return (
    <section className="flex items-center justify-center min-h-[480px] gap-8">
      <Canvas
        image={image}
        spots={spots}
      />
    </section>
  );
}