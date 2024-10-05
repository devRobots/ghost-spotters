export default function Digits(
  { digits, value }: { digits: number, value: number }
) {
  const digitChars = Array.from(String(value), Number);
  while (digitChars.length < digits) {
    digitChars.unshift(0);
  }

  return (
    <>
      {digitChars.map(digit => `${digit}`)}
    </>
  );
}