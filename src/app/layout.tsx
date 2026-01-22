import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ProvidersManager } from "@/components/providers-manager";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Layer",
  description: "Um e-commerce para a venda de roupas e acessórios online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ProvidersManager>{children}</ProvidersManager>
      </body>
    </html>
  );
}
