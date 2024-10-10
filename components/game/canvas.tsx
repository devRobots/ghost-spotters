"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { GameContext } from "@/context/GameContext";
import { useContext, useEffect, useRef } from "react";
import Spinner from "./spinner";

export default function Canvas(
  { image, spots }: { image: string, spots: number[][] }
) {
  const canvasRef = useRef(null);
  const { loading, setLoading, finds, setFinds } = useContext(GameContext);

  const markSpot = (spotIndex: number) => {
    const $canvas = canvasRef.current! as HTMLCanvasElement;
    const context = $canvas.getContext("2d");

    const [x, y, w, h] = spots[spotIndex];

    context!.lineWidth = 5;
    context!.strokeStyle = "red";
    context!.strokeRect(x, y, w, h);

    spots.splice(spotIndex, 1);
    setFinds(finds + 1);
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

  useEffect(() => {
    const $canvas = canvasRef.current! as HTMLCanvasElement;
    const context = $canvas.getContext("2d");
    const canvas = context!.canvas;

    const $image = new Image();
    $image.src = image;

    $image.onload = () => {
      canvas.width = $image.width;
      canvas.height = $image.height;
      context!.drawImage($image, 0, 0);

      $canvas.addEventListener("click", checkSpot);

      setLoading(false);
    };

  }, []);

  return (
    <>
      <canvas style={{ display: loading ? "none" : "block" }} ref={canvasRef} width="1280" height="853" />
      {loading && <Spinner />}
    </>
  );
}