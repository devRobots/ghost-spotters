import { RefreshCcwIcon } from "lucide-react";

export default function Spinner() {
  return (
    <section className="flex items-center justify-center w-[1280px] min-h-[853px] gap-8 bg-gray-200 rounded" >
      <RefreshCcwIcon className="text-red-950 h-12 w-12 animate-spin" />
    </section>
  );
}