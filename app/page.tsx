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
          GhostSpotters
        </h1>
        <h2 className={"text-4xl font-bold text-center text-white " + jolly.className}>
          ¿A quien vas a llamar?
        </h2>
      </section>

      <p className="text-xl text-center text-white font-mono w-96">
        Encuentra a los fantasmas atrapados en las fotos antes de que el tiempo se acabe
      </p>

      <button>
        <a
          href="/game"
          className={"px-8 py-1 text-3xl text-white bg-green-700 rounded " + jolly.className}
        >
          Jugar
        </a>
      </button>
    </main>
  )
}