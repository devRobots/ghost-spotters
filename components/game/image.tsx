/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import ImageCanvas from "./canvas";
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
  const [data, setData] = useState<ImageDiffAPIResponse[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [transform, setTrasform] = useState<string | null>(null);
  const [spots, setSpots] = useState<number[][]>([]);

  const handleClick = () => {
    onClickSpot();
    if (finds + 1 === spotsPerImage && solved < numImages) {
      setCurrentImage(currentImage + 1);
      setSpots(data[currentImage + 1].spots);
      setImage(data[currentImage + 1].original);
      setTrasform(data[currentImage + 1].transformation);
    }
  };

  useEffect(() => {
    fetch(`/api/image?spots=${spotsPerImage}`).then(response => {
      return response.json();
    }).then(data => {
      setData(data);
      setSpots(data[currentImage].spots);
      setImage(data[currentImage].original);
      setTrasform(data[currentImage].transformation);
    });
  }, []);

  return (
    <section className="flex items-center justify-center min-h-[480px] gap-8">
      {
        data.length > 0 ? (
          <>
            <ImageCanvas
              src={image!}
              spots={spots}
              onClickSpot={handleClick}
            />
            <ImageCanvas
              src={transform!}
              spots={spots}
              onClickSpot={handleClick}
            />
          </>
        ) : <RefreshCwIcon className="h-6 w-6 text-yellow-700" />
      }
    </section>
  );
}