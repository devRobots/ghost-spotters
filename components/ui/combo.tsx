export default function Combo({ combo }: { combo: number }) {
  return (
    <div className="flex flex-row gap-3 items-center rounded-2xl py-2 px-3 bg-stone-200 shadow-inner">
      <span className="text-xl">Combo:</span>
      <span className="text-xl">X{combo}</span>
    </div >
  );
}