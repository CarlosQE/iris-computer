import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Iris Computer — Catálogo de Tecnología",
  description: "Encuentra laptops, PCs, periféricos y accesorios al mejor precio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans bg-brand-dark text-white antialiased`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <WhatsAppButton />
      </body>
    </html>
  );
}