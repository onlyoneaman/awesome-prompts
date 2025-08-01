import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  title: "Awesome Prompts | AI Prompts Library",
  description: "Discover curated AI prompts for ChatGPT, Claude, and other AI tools. Browse prompts for writing, programming, marketing, creativity, and more.",
  keywords: ["AI prompts", "ChatGPT prompts", "Claude prompts", "AI tools", "prompt engineering"],
  authors: [{ name: "Awesome Prompts Team" }],
  creator: "Awesome Prompts",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://promptsmint.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Awesome Prompts | AI Prompts Library",
    description: "Curated collection of AI prompts for various use cases",
    type: "website",
    siteName: "Awesome Prompts",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awesome Prompts | AI Prompts Library",
    description: "Curated collection of AI prompts for various use cases",
  },
  robots: {
    index: true,
    follow: true,
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
  const isProduction = process.env.NODE_ENV === 'production';
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://promptsmint.com';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Awesome Prompts',
    description: 'Curated collection of AI prompts for ChatGPT, Claude, and other AI tools',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/prompts?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics - Only in Production and if GA ID is provided */}
        {isProduction && googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
        
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
