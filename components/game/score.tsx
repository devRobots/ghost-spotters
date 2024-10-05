import { GemIcon } from "lucide-react";
import Digits from "@/components/ui/digits";

export default function Score({ score }: { score: number }) {
  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <GemIcon className="h-6 w-6" />
      <span className="text-xl">
        <Digits digits={4} value={score} />
      </span>
    </div >
  );
}