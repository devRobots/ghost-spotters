import Image from "next/image";

export default function Spinner() {
  return (
    <section className="flex items-center justify-center w-[912px] min-h-[610px] gap-8 bg-black rounded" >
      <Image className="object-fill w-[912px] h-[600px]" src={"/white-noise.gif"} alt="spinner" width={912} height={600} />
    </section>
  );
}