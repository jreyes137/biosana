import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BIOSANA - Agua Purificada Premium en Tijuana",
  description: "Garrafón premium con diseño exclusivo. Calidad y pureza en cada gota. Entrega rápida en menos de 2 horas en toda Tijuana.",
  keywords: ["agua purificada", "Tijuana", "garrafón", "agua premium", "BIOSANA", "purificadora"],
  authors: [{ name: "BIOSANA" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://biosana.com",
    title: "BIOSANA - Agua Purificada Premium",
    description: "Garrafón premium con diseño exclusivo. Calidad y pureza en cada gota.",
    siteName: "BIOSANA",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIOSANA - Agua Purificada Premium",
    description: "Garrafón premium con diseño exclusivo. Calidad y pureza en cada gota.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
