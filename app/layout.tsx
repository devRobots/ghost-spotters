import "@/globals.css";
import type { Metadata } from "next";
import Background from "@/components/ui/bg";

export const metadata: Metadata = {
  title: "GhostSpotters",
  description: "¿A quien vas a llamar?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Background />
        {children}
      </body>
    </html>
  );
}
