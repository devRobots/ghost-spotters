/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

/* eslint-disable @next/next/no-img-element */
export default function ImageCanvas({
  src, spots, onClickSpot
}: {
  src: string,
  spots: number[][],
  onClickSpot: () => void
}) {
  const $canvas = useRef("canvas");

  useEffect(() => {
    const canvas = $canvas.current.getContext("2d");
    const image = new Image();
    image.src = src;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.drawImage(image, 0, 0);

      spots.forEach((spot) => {
        const [x, y, w, h] = spot;
        // red line
        canvas.strokeStyle = "red";
        canvas.strokeRect(x, y, w, h);
      });
    };
  }, []);

  return (
    <section className="flex items-center justify-center min-h-[480px] gap-8">
      <canvas ref={$canvas} width="1280" height="853" />
    </section>
  );
}