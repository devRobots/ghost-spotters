import Image from "next/image";

export default function Fog() {
  return (
    <div className="absolute top-0 left-0 w-full h-full opacity-15">
      <Image
        src="/images/ghost1.webp"
        alt="fog"
        width={720}
        height={853}
        className="absolute h-full"
      />
    </div>
  );
}
