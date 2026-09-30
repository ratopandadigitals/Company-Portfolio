import type { Metadata } from "next"
import localFont from "next/font/local"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import ThemeProvider from "@/components/providers/ThemeProvider"

import "./globals.css"

const inter = localFont({
  src: [
    { path: "../fonts/Inter/Inter-Regular.woff2", weight: "400" },
    { path: "../fonts/Inter/Inter-Medium.woff2", weight: "500" },
    { path: "../fonts/Inter/Inter-SemiBold.woff2", weight: "600" },
    { path: "../fonts/Inter/Inter-Bold.woff2", weight: "700" },
    { path: "../fonts/Inter/Inter-ExtraBold.woff2", weight: "800" },
  ],
  variable: "--font-primary",
  display: "swap",
  preload: false,

})

const roboto = localFont({
  src: [
    { path: "../fonts/Roboto/Roboto-Regular.ttf", weight: "400" },
    { path: "../fonts/Roboto/Roboto-Medium.ttf", weight: "500" },
    { path: "../fonts/Roboto/Roboto-SemiBold.ttf", weight: "600" },
    { path: "../fonts/Roboto/Roboto-Bold.ttf", weight: "700" },
  ],
  variable: "--font-secondary",
  display: "swap",
  preload: false,

})

const jetbrainsMono = localFont({
  src: [
    {
      path: "../fonts/JetBrainsMono/JetBrainsMono-Regular.woff2",
      weight: "400",
    },
    {
      path: "../fonts/JetBrainsMono/JetBrainsMono-Medium.woff2",
      weight: "500",
    },
    {
      path: "../fonts/JetBrainsMono/JetBrainsMono-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../fonts/JetBrainsMono/JetBrainsMono-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: false,

})
export const metadata: Metadata = {
  title: { default: "Rato Panda Digitals", template: "%s | Rato Panda Digitals" },
  description: "A digital design and development studio.",
  icons: {
    icon: { url: "/icon.webp", sizes: "180x130" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
  <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
   <body
        className={`${inter.variable} ${roboto.variable} ${jetbrainsMono.variable} font-secondary bg-surface-page text-body antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}