import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Oxente Lar",
  description: "Locações de Imóveis com agilidade e confiança.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <div className="flex h-full ">{children}</div>
      </body>
    </html>
  );
}
