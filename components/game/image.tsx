/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { RefreshCwIcon } from "lucide-react";

import { getImages } from "@/lib/image";

export default function ImageSpotter(
  { finds, solved, numImages, spotsPerImage, onClickSpot }: {
    finds: number,
    solved: number,
    numImages: number,
    spotsPerImage: number,
    onClickSpot: () => void
  }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);

  // const [spots, setSpots] = useState(Array.from(Array(numImages).keys()));

  const handleClick = () => {
    onClickSpot();
    if (finds + 1 === spotsPerImage && solved < numImages) {
      setCurrentImage(currentImage + 1);
      setImageA(images[currentImage + 1]);
      setImageB(images[currentImage + 1]);
    }
  };

  useEffect(() => {
    getImages(numImages).then(imgs => {
      setImages(imgs);

      // Pre-load images
      imgs.forEach(src => {
        const img = new Image();
        img.src = src;
      });
      
      setImageA(imgs[currentImage]);
      setImageB(imgs[currentImage]);
    });
  }, []);

  return (
    <section className="flex items-center justify-center min-h-[480px] gap-8">
      {
        images.length > 0 ? (
          <>
            <img
              src={imageA!}
              onClick={handleClick}
              className="rounded-lg shadow-lg"
              width={720}
              height={720}
              alt="image" />
            <img
              src={imageB!}
              onClick={handleClick}
              className="rounded-lg shadow-lg"
              width={720}
              height={720}
              alt="image" />
          </>
        ) : <RefreshCwIcon className="h-6 w-6 text-yellow-700" />
      }
    </section>
  );
}