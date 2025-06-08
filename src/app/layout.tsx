import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const getInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IKANNUSA",
  description: "IKANNUSA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`$${getInter.variable} antialiased`}>{children}</body>
    </html>
  );
}
