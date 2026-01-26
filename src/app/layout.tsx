import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import { ConvexClientProvider } from "@/providers";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Portfolio | itzpa1",
  description: "Created with < 3",
  metadataBase: new URL("https://codeitzpa1.netlify.app"),
  icons: {
    icon: "./favicon.ico",
    apple: "./favicon.ico",
  },

  openGraph: {
    title: "Portfolio | itzpa1",
    description: "Created with < 3",
    url: "https://codeitzpa1.netlify.app/",
    siteName: "Portfolio | itzpa1",
    images: [
      {
        url: "/assets/preview/pawandev.png",
        width: 1200,
        height: 630,
        alt: "Portfolio | itzpa1",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio | itzpa1",
    description: "Created with < 3",
    images: ["/assets/preview/pawandev.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-gray-900 text-white antialiased font-sans ",
        )}
      >
        <ConvexClientProvider>
          {children}
          <ScrollToTop />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
