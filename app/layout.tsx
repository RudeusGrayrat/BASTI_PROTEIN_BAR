import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreFooter } from "./components/StoreFooter";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BASTI Consumer Web",
  description:
    "Waffles proteicos, bebidas saludables y beneficios para clientes BASTI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <body className="min-h-dvh text-[#1d2815]">
        <Providers>
          {children}
          <StoreFooter />
        </Providers>
      </body>
    </html>
  );
}
