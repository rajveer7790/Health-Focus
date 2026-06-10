import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata: Metadata = {
  metadataBase: new URL('https://healthfocus.fit'),
  title: "Health Focus | Expert Wellness & Nutrition Insights",
  description: "Your trusted source for evidence-based health, nutrition, and wellness information. Discover articles on mental health, fitness, longevity, and more.",
  openGraph: {
    title: "Health Focus | Expert Wellness & Nutrition Insights",
    description: "Your trusted source for evidence-based health, nutrition, and wellness information. Discover articles on mental health, fitness, longevity, and more.",
    url: "https://healthfocus.fit",
    siteName: "Health Focus",
    images: [
      {
        url: "/social-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Focus | Expert Wellness & Nutrition Insights",
    description: "Your trusted source for evidence-based health, nutrition, and wellness information. Discover articles on mental health, fitness, longevity, and more.",
    images: ["/social-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://healthfocus.fit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <DarkModeToggle />
      </body>
    </html>
  );
}
