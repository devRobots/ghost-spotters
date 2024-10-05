import { ClockIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Digits from "@/components/ui/digits";


export default function Timer({ seconds }: { seconds: number }) {
  const [minutes, setMinutes] = useState(Math.floor(seconds / 60));
  const [secondsLeft, setSecondsLeft] = useState(seconds % 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
      if (secondsLeft === 0) {
        setMinutes(minutes - 1);
        setSecondsLeft(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, minutes]);

  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <ClockIcon className="h-6 w-6" />
      <div className="flex flex-row items-center font-mono">
        <span className="text-xl flex items-center">
          <Digits digits={2} value={minutes} />
        </span>
        <span className="text-xl">:</span>
        <span className="text-xl">
          <Digits digits={2} value={secondsLeft} />
        </span>
      </div>
    </div >
  );
}