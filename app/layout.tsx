import "@/globals.css";
import type { Metadata } from "next";
import Background from "@/components/ui/bg";
import { Analytics } from "@vercel/analytics/react"

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
        <Analytics />
        <Background />
        {children}
      </body>
    </html>
  );
}
