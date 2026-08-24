import type { Metadata } from "next";
import { CinematicExperience } from "@/components/cinematic-experience";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";
import "./marketing.css";
import "./apple-system.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Peptis | Body recomposition and GLP-1 continuity",
    template: "%s | Peptis",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.editorialTeam, url: "/editorial-policy" }],
  creator: siteConfig.editorialTeam,
  publisher: siteConfig.name,
  category: "Health and wellness",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Peptis | Rebuild what helps you keep it off",
    description: "A visual body-recomposition quiz with a practical 12-week strength, protein and routine plan.",
    siteName: "Peptis",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Peptis body recomposition and continuity care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptis | Rebuild what helps you keep it off",
    description: "A visual body-recomposition quiz with a practical 12-week strength, protein and routine plan.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  other: {
    "theme-color": "#f4f0e8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: { "@type": "ImageObject", url: absoluteUrl("/peptis-logo.png") },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}#organization` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <CinematicExperience />
        {children}
      </body>
    </html>
  );
}
