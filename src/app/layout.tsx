import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Session — AMS 2026 | SFLOW",
  description:
    "Interactive AI workshop by Florian Smeyers at Antwerp Management School. From ChatGPT basics to agentic workflows — practical tools you can use tomorrow.",
  openGraph: {
    title: "AI Session — AMS 2026 | SFLOW",
    description:
      "Interactive AI workshop: from ChatGPT basics to agentic workflows.",
    url: "https://ai-session-ams.vercel.app",
    siteName: "SFLOW",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
