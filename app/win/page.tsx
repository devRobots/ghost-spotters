"use client";

import Image from "next/image";
import { Jolly_Lodger } from "next/font/google";

const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-16">
      <section className="flex flex-col justify-center items-center gap-2">
        <h1
          className={
            "text-green-500 text-center text-6xl font-bold " + jolly.className
          }
        >
          ¡Ganaste!
        </h1>
      </section>

      <Image
        priority
        className="w-auto h-auto"
        src={"/images/ghost9.webp"}
        alt="ghost"
        width={240}
        height={0} />

      <p className="text-xl text-center text-white font-mono w-96">
        Los atrapaste a todos
      </p>

      <button>
        <a
          href="/game"
          className={"px-8 py-1 text-3xl text-white bg-green-700 rounded " + jolly.className}
        >
          Volver a Jugar
        </a>
      </button>
    </main>
  )
}