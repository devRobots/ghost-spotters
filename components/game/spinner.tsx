"use client";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Spinner() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progress + 1), 300)
    return () => clearTimeout(timer)
  }, [progress, setProgress])

  return (
    <section className="flex items-center justify-center w-[1280px] min-h-[853px] gap-8 bg-gray-200 rounded" >
      <RefreshCcwIcon className="text-red-950 h-12 w-12 animate-spin" />
    </section>
  );
}