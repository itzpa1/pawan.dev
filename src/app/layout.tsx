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
  title: {
    template: "%s | Pawan.Dev",
    default: "Portfolio | Pawan.dev",
  },
  
  description: "Official portfolio of Pawan (itzpa1). A Full-stack Developer specializing in high-performance web applications using Next.js, TypeScript, and Convex.",
  
  keywords: [
    "Pawan.Dev",
    "itzpa1",
    "Full-stack Developer Portfolio",
    "Next.js Developer India",
    "TypeScript Engineer",
    "Convex Database Expert",
    "Software Engineer Portfolio 2026",
    "React Frontend Developer",
    "Web Scalability Specialist",
    "Tailwind CSS Expert",
    "Portfolio",
    "2026",
    "grahpic designer",
    "video editor",
    "content creator",
    ""
  ],
  
  authors: [{ name: "Pawan Dev", url: "https://linkedin.com/in/itzpa1" }],
  creator: "Pawan",
  publisher: "Pawan",
  metadataBase: new URL("https://codeitzpa1.vercel.app"),

  openGraph: {
    title: "Pawan.Dev | Software Engineer Portfolio",
    description: "Building scalable, user-centric web applications with modern tech stacks.",
    url: "https://codeitzpa1.vercel.app/",
    siteName: "Pawan.Dev Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Preview of Pawan.Dev Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pawan.Dev | @itzpa1",
    description: "Full-stack Developer building the future with Next.js & Convex.",
    creator: "@itzpa1",
    images: ["/preview.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
