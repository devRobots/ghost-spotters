import { ScanSearchIcon } from "lucide-react";

export default function Counter({ solved, total }: { solved: number, total: number }) {
  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <ScanSearchIcon className="h-6 w-6" />
      <div className="flex flex-row gap-1">
        <span className="text-xl">{solved}</span>
        <span className="text-xl">/</span>
        <span className="text-xl">{total}</span>
      </div>
    </div >
  );
}