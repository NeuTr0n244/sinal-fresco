import type { Metadata } from "next";
import { Big_Shoulders, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sinal Fresco",
  description: "Radar de jogos e airdrops cripto — sinal novo, não hype requentado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
