/* eslint-disable react-hooks/exhaustive-deps */
import ImageCanvas from "./canvas";
import { useEffect, useState } from "react";
import { RefreshCwIcon } from "lucide-react";

export default function ImageSpotter(
  { spotsPerImage, onClickSpot }: {
    spotsPerImage: number,
    onClickSpot: () => void
  }) {
  const [image, setImage] = useState<string | null>(null);
  const [transform, setTrasform] = useState<string | null>(null);
  const [spots, setSpots] = useState<number[][]>([]);

  const handleClick = (spotIndex: number) => {
    console.log("clicked spot", spotIndex);
    onClickSpot();
  };

  useEffect(() => {
    fetch(`/api/image?spots=${spotsPerImage}`).then(response => {
      return response.json();
    }).then(data => {
      setSpots(data.spots);
      setImage(data.original);
      setTrasform(data.transformation);
    });
  }, []);

  return (
    <section className="flex items-center justify-center min-h-[480px] gap-8">
      {
        image ? (
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