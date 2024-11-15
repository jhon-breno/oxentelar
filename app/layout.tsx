import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import Footer from "./_components/footer"
import AuthProvider from "./providers/auth"
import Header from "./_components/header"
import SheetMenu from "./_components/sheetMenu"

export const metadata: Metadata = {
  title: "Oxente Lar",
  description: "Locações de Imóveis com agilidade e confiança.",
}

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="flex items-center justify-between xl:justify-center">
            <Header />
            <SheetMenu />
          </div>
          <div className="h-full">{children}</div>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
