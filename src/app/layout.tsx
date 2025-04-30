import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`min-h-screen bg-white font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
