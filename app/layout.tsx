import { AuthButton } from '@/components/AuthButton'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { Providers } from '@/components/Providers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "我的知识库",
  description: "一个用于记录代码、知识点和随笔的个人知识库",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
