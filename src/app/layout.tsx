import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import { Inter, VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Young Kim",
  description: "Personal website of Young Kim - Columbia University student studying Computer Science and Operations Research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${vt323.variable} ${pressStart2P.variable} scroll-smooth`}>
      <body className={`min-h-screen bg-white font-sans antialiased`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
