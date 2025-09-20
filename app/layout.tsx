import type { Metadata } from "next";
import { Geist, Geist_Mono, Qwigley, Moon_Dance, Sedgwick_Ave } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const qwigley = Qwigley({
  variable: "--font-qwigley",
  subsets: ["latin"],
  weight: "400",
});

const moonDance = Moon_Dance({
  variable: "--font-moon-dance",
  subsets: ["latin"],
  weight: "400",
});

const sedgwickAve = Sedgwick_Ave({
  variable: "--font-sedgwick-ave",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Aether Web Media",
  description: "Empowering businesses of every scale with reliable, innovative, and scalable digital solutions delivered with speed, built on trust, and designed for growth.",
  keywords: "aetherwebmedia, akcwebmedia, saas, saas development, web development, app development, startup solution, custom software development, custom software solutions, custom software development company, custom software development services, custom software development agency",
  authors: [{ name: "Aether Web Media" }],
  openGraph: {
    type: "website",
    url: "https://aetherwebmedia.com",
    title: "Aether Web Media",
    description: "Empowering businesses of every scale with reliable, innovative, and scalable digital solutions delivered with speed, built on trust, and designed for growth.",
    images: [
      {
        url: "@/public/png/logo.png",
        alt: "Aether Web Media Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aether Web Media",
    description: "Empowering businesses of every scale with reliable, innovative, and scalable digital solutions delivered with speed, built on trust, and designed for growth.",
    images: [
      {
        url: "@/public/png/banner.png",
        alt: "Aether Web Media Banner",
      },
    ],
  },
  other: {
    copyright: "Aether Web Media",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MEVT5D4EMB"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MEVT5D4EMB');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${qwigley.variable} ${moonDance.variable} ${sedgwickAve.variable} antialiased bg-neutral-950 text-neutral-200`}
      >
        {children}
      </body>
    </html>
  );
}
