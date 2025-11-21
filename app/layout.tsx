import Footer from "@/components/Footer"
import MainHeader from "@/components/headers/MainHeader"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/lib/providers"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} style={{ backgroundColor: "#F9FAFB" }}>
        <Providers >
          <div className="min-h-screen bg-background flex flex-col">
            <MainHeader />
            {children}
            <Footer />
          </div>
        </Providers >
        <Toaster />
      </body>
    </html>
  )
}
