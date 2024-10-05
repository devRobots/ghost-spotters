import Digits from "@/components/ui/digits";
import { useState, useEffect } from "react";
import { HourglassIcon, ZapIcon } from "lucide-react";

export default function Combo(
  { combo, setter }:
    { combo: number, setter: React.Dispatch<React.SetStateAction<number>> }
) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (combo > 1) {
      setSeconds(10);
    }
  }, [combo]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        setter(1);
        return;
      }
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, setter]);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <ZapIcon className="h-6 w-6" />
      <span className="text-xl">X{combo}</span>
      |
      <div className="flex flex-row gap-3 items-center font-mono">
        <HourglassIcon className="h-6 w-6" />
        <span className="text-xl">
          <Digits digits={2} value={seconds} />
        </span>
      </div>
    </div >
  );
}