import type { Metadata } from "next"
import { Inter, Roboto, JetBrains_Mono } from "next/font/google"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-secondary",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})
export const metadata: Metadata = {
  title: { default: "Rato Panda Digitals", template: "%s | Rato Panda Digitals" },
  description: "A digital design and development studio.",
  icons: {
    icon: { url: "/icon.png", sizes: "44x44" },
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${inter.variable} ${roboto.variable} ${jetbrainsMono.variable} font-secondary bg-surface-page text-body antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}