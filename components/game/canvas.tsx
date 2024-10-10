"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { NUM_SPOTS } from "@/app/consts";
import { useEffect, useRef } from "react";

export default function ImageCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch(`/api/image?spots=${NUM_SPOTS}`).then(response => {
      return response.json();
    }).then((data: ImageDiffAPIResponse) => {
      const $canvas = canvasRef.current! as HTMLCanvasElement;
      const context = $canvas.getContext("2d");
      const canvas = context!.canvas;

      const image = new Image();
      image.src = data.image;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context!.drawImage(image, 0, 0);
      };

      const spots = data.spots;

      const markSpot = (spotIndex: number) => {
        const $canvas = canvasRef.current! as HTMLCanvasElement;
        const context = $canvas.getContext("2d");

        const [x, y, w, h] = spots[spotIndex];

        context!.lineWidth = 5;
        context!.strokeStyle = "red";
        context!.strokeRect(x, y, w, h);

        spots.splice(spotIndex, 1);
      }

      const checkSpot = (event: MouseEvent) => {
        const $canvas = canvasRef.current! as HTMLCanvasElement;
        const rect = $canvas.getBoundingClientRect();
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        spots.forEach((spot, index) => {
          const [x1, y1, w, h] = spot;
          if (x >= x1 && x <= x1 + w && y >= y1 && y <= y1 + h) {
            markSpot(index);
          }
        })
      }

      $canvas.addEventListener("click", checkSpot);
    });
  }, []);


  return (
    <section className="flex items-center justify-center min-h-[480px] gap-8">
      <canvas ref={canvasRef} width="1280" height="853" />
    </section>
  );
}