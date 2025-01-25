// import { SystemBanner } from "@/components/system-banner";
import "@/styles/globals.css";
import { cn } from "@deepnote-clone/ui/cn";
import "@deepnote-clone/ui/globals.css";
import "@deepnote-clone/editor/editor.css";
import { Provider as Analytics } from "@deepnote-clone/events/client";
import { Toaster } from "@deepnote-clone/ui/toaster";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://deepnote-clone.com"),
  title: {
    default:
      "Deepnote Clone | Nothing here yet",
    template: "%s | Deepnote Clone",
  },
  description:
    "Figuring out what to put here.",
  openGraph: {
    title:
      "Deepnote Clone | Nothing here yet",
    description:
      "Figuring out what to put here.",
    url: "https://deepnote-clone.com",
    siteName:
      "Figuring out what to put here.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cdn.deepnote-clone.com/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://cdn.deepnote-clone.com/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
  },
  twitter: {
    title: "Deepnote Clone | Nothing here yet",
    description: "Figuring out what to put here.",
    images: [
      {
        url: "https://cdn.deepnote-clone.com/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://cdn.deepnote-clone.com/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export const preferredRegion = ["us-east-1"];
export const maxDuration = 60;

export default function Layout({
  children,
  params,
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  const locale = params?.locale || "en"; // Default to 'en' if locale is undefined

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "whitespace-pre-line overscroll-none",
        )}
      >
        <Providers locale={locale}>{children}</Providers>
        {/* <SystemBanner /> */}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
