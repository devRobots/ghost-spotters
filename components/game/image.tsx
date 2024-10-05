import Image from "next/image";
import { useEffect, useState } from "react";
import { RefreshCwIcon } from "lucide-react";

import { getImage } from "@/lib/image";

export default function ImageSpotter(
  { finds, solved, numImages, spotsPerImage, onClickSpot }: {
    finds: number,
    solved: number,
    numImages: number,
    spotsPerImage: number,
    onClickSpot: () => void
  }) {
  const [nextA, setNextA] = useState<string | null>(null);
  const [nextB, setNextB] = useState<string | null>(null);

  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);

  // const [spots, setSpots] = useState(Array.from(Array(numImages).keys()));

  const handleClick = () => {
    onClickSpot();
    if (finds === spotsPerImage - 1) {
      setImageA(nextA);
      setImageB(nextB);
    }
  };

  useEffect(() => {
    if (solved < numImages) {
      getImage().then(image => {
        setNextA(image);
        setNextB(image);
      });
    }
  }, [solved, numImages]);

  useEffect(() => {
    getImage().then(image => {
      setImageA(image);
      setImageB(image);
    });
  }, []);


  if (imageA === null || imageB === null) {
    return (
      <div className="flex items-center justify-center min-h-[480px] w-[1440px]">
        <RefreshCwIcon className="h-6 w-6 text-yellow-700" />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Image
        onClick={handleClick}
        className="rounded-lg shadow-lg"
        src={imageA}
        width={720}
        height={720}
        alt="image" />
      <Image
        onClick={handleClick}
        className="rounded-lg shadow-lg"
        src={imageB}
        width={720}
        height={720}
        alt="image" />
    </section>
  );
}