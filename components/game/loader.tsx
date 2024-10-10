"use client";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progress + 1), 300)
    return () => clearTimeout(timer)
  }, [progress, setProgress])

  return (
    <section className="flex items-center justify-center w-[1280px] min-h-[853px] gap-8 bg-gray-200 rounded" >
      <div className="w-full max-w-md mx-auto space-y-4">
        <h2 className="text-lg font-semibold text-center">Cargando...</h2>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-center text-gray-500">{Math.round(progress)}%</p>
      </div>
    </section>
  );
}