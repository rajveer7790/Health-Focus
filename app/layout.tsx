import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata: Metadata = {
  metadataBase: new URL("https://healthfocus.fit"),
  title: {
    default: "Health Focus | Expert Wellness & Nutrition Insights",
    template: "%s | Health Focus",
  },
  description:
    "Your trusted source for evidence-based health, nutrition, and wellness information. Discover articles on mental health, fitness, longevity, and more.",
  keywords: [
    "health",
    "nutrition",
    "wellness",
    "mental health",
    "gut health",
    "longevity",
    "women's health",
    "fitness",
    "evidence-based health",
    "healthy eating",
    "weight loss",
    "diabetes",
    "heart health",
    "sleep health",
    "stress management",
    "supplements",
    "protein",
    "intermittent fasting",
    "inflammation",
    "hormones",
    "health focus",
    "nutrition advice",
    "mental health tips",
    "longevity tips",
    "wellness USA",
  ],
  authors: [{ name: "Health Focus Editorial Team", url: "https://healthfocus.fit" }],
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  openGraph: {
    title: "Health Focus | Expert Wellness & Nutrition Insights",
    description:
      "Your trusted source for evidence-based health, nutrition, and wellness information. Discover articles on mental health, fitness, longevity, and more.",
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
    description:
      "Your trusted source for evidence-based health, nutrition, and wellness information. Discover articles on mental health, fitness, longevity, and more.",
    images: ["/social-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://healthfocus.fit",
  },
};

// ── Structured Data ──────────────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "MedicalOrganization"],
  name: "Health Focus",
  url: "https://healthfocus.fit",
  logo: "https://healthfocus.fit/helathFocuslogo.png",
  description:
    "Evidence-based health, nutrition, and wellness information for Americans. Expert-reviewed articles on nutrition, mental health, longevity, gut health, and women's health.",
  medicalSpecialty: [
    "Nutrition",
    "MentalHealth",
    "Endocrinology",
    "Cardiology",
    "GutHealth",
  ],
  sameAs: ["https://github.com/rajveer7790/Health-Focus"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "editorial",
    email: "contact@healthfocus.fit",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Health Focus",
  url: "https://healthfocus.fit",
  description: "Evidence-based health and wellness articles for Americans",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://healthfocus.fit/blog?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "MedicalOrganization",
    name: "Health Focus",
    url: "https://healthfocus.fit",
  },
};

// ────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Dark-mode flash prevention */}
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

        {/* Organization (MedicalOrganization) structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* WebSite + SearchAction structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <DarkModeToggle />
      </body>
    </html>
  );
}
