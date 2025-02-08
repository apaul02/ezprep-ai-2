import type { Metadata } from "next";
import { Geist, Geist_Mono, Gloock, Alata } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gloock = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gloock",
  display: 'swap',
});

const alata = Alata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alata",
});

export const metadata: Metadata = {
  title: "EzPrep",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${gloock.variable} ${alata.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body> 
    </html> 
  ); 
}
