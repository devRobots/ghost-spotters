/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { RefreshCwIcon } from "lucide-react";

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
  const [image, setImage] = useState<string | null>(null);

  // const [spots, setSpots] = useState(Array.from(Array(numImages).keys()));

  const handleClick = () => {
    onClickSpot();
    if (finds + 1 === spotsPerImage && solved < numImages) {
      setCurrentImage(currentImage + 1);
      setImage(images[currentImage + 1]);
    }
  };

  useEffect(() => {
    fetch("/api/image").then(response => {
      return response.json();
    }).then(imgs => {
      // Pre-load images
      imgs.forEach((src: string) => {
        const img = new Image();
        img.src = src;
      });

      setImages(imgs);
      setImage(imgs[currentImage]);
    });
  }, []);

  return (
    <section className="flex items-center justify-center min-h-[480px] gap-8">
      {
        images.length > 0 ? (
          <>
            <img
              src={image!}
              onClick={handleClick}
              className="rounded-lg shadow-lg"
              width={1024}
              height={683}
              alt="image" />
          </>
        ) : <RefreshCwIcon className="h-6 w-6 text-yellow-700" />
      }
    </section>
  );
}