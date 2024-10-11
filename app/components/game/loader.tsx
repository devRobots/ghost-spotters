import NextImage from "next/image";
import { Jolly_Lodger } from "next/font/google";
import { useGameStore } from "@/providers/game";


const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] })

export default function Loader({ ready }: { ready: boolean }) {
  const { load } = useGameStore((state) => state)

  return (
    <div className="relative w-[1280px] min-h-[853px] h-[853px]">
      <NextImage priority unoptimized className="object-fill w-[1280x] h-[853px]" src={"/white-noise.gif"} alt="spinner" width={1280} height={853} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 text-5xl" style={{ fontFamily: jolly.style.fontFamily }}>
        {
          ready ? "Cargando..." :
            <button onClick={load} className="p-4 text-white bg-green-700 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              Empezar
            </button>
        }
      </div>

    </div>
  )
}