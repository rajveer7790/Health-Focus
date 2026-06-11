import SectionDivider from "@/components/SectionDivider";
import type { Metadata } from "next";
import Script from "next/script";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About Health Focus | Medical Review Board & Editorial Standards",
  description:
    "Meet the Health Focus medical review board of board-certified physicians. Learn about our evidence-based editorial standards and E-E-A-T commitment to health accuracy.",
  alternates: { canonical: "https://healthfocus.fit/about" },
  openGraph: {
    title: "About Health Focus | Medical Review Board",
    description:
      "Board-certified doctors review every health article on Health Focus. Learn about our editorial standards and medical expertise.",
    url: "https://healthfocus.fit/about",
    type: "website",
  },
};

// ─── Structured Data ─────────────────────────────────────────────────────────
const medicalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Health Focus",
  url: "https://healthfocus.fit",
  logo: "https://healthfocus.fit/helathFocuslogo.png",
  description:
    "Evidence-based health and wellness publication with a board of certified medical professionals.",
  medicalSpecialty: [
    "Endocrinology",
    "Obstetrics and Gynecology",
    "Preventive Cardiology",
    "Neurology",
    "Nutrition",
  ],
  employee: [
    {
      "@type": "Physician",
      name: "Dr. Priya Sharma",
      jobTitle: "Endocrinologist & Obesity Medicine Specialist",
      description:
        "Board-certified with 12+ years treating metabolic syndrome and type 2 diabetes",
      url: "https://healthfocus.fit/about",
    },
    {
      "@type": "Physician",
      name: "Dr. Elena Rodriguez",
      jobTitle: "OB/GYN & Reproductive Endocrinologist",
      description:
        "Dual board-certified specialist with 15+ years in perimenopause and PCOS treatment",
      url: "https://healthfocus.fit/about",
    },
    {
      "@type": "Physician",
      name: "Dr. Michael Chen",
      jobTitle: "Preventive Cardiologist",
      description:
        "Fellow of the American College of Cardiology, specializes in cardiovascular longevity",
      url: "https://healthfocus.fit/about",
    },
    {
      "@type": "Physician",
      name: "Dr. Sarah Chen",
      jobTitle: "Functional Neurologist",
      description:
        "Board-certified neurologist specializing in the gut-brain axis and nervous system regulation",
      url: "https://healthfocus.fit/about",
    },
  ],
};

const drPriyaSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Priya Sharma",
  jobTitle: "Endocrinologist & Obesity Medicine Specialist",
  description:
    "Board-certified with 12+ years treating metabolic syndrome and type 2 diabetes",
  url: "https://healthfocus.fit/about",
  worksFor: { "@type": "MedicalOrganization", name: "Health Focus" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Board Certification",
    recognizedBy: { "@type": "Organization", name: "American Board of Internal Medicine" },
  },
};

const drElenaSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Elena Rodriguez",
  jobTitle: "OB/GYN & Reproductive Endocrinologist",
  description:
    "Dual board-certified specialist with 15+ years in perimenopause and PCOS treatment",
  url: "https://healthfocus.fit/about",
  worksFor: { "@type": "MedicalOrganization", name: "Health Focus" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Board Certification",
    recognizedBy: {
      "@type": "Organization",
      name: "American Board of Obstetrics and Gynecology",
    },
  },
};

const drMichaelSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Michael Chen",
  jobTitle: "Preventive Cardiologist",
  description:
    "Fellow of the American College of Cardiology, specializes in cardiovascular longevity",
  url: "https://healthfocus.fit/about",
  worksFor: { "@type": "MedicalOrganization", name: "Health Focus" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Fellowship",
    recognizedBy: { "@type": "Organization", name: "American College of Cardiology" },
  },
};

const drSarahSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Sarah Chen",
  jobTitle: "Functional Neurologist",
  description:
    "Board-certified neurologist specializing in the gut-brain axis and nervous system regulation",
  url: "https://healthfocus.fit/about",
  worksFor: { "@type": "MedicalOrganization", name: "Health Focus" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Board Certification",
    recognizedBy: { "@type": "Organization", name: "American Board of Psychiatry and Neurology" },
  },
};

// ─── Trust Bar Items ──────────────────────────────────────────────────────────
const trustItems = [
  { icon: "✅", stat: "73+", label: "Expert-Reviewed Articles" },
  { icon: "🩺", stat: "4", label: "Board-Certified Doctors" },
  { icon: "📚", stat: "100%", label: "Evidence-Based Only" },
  { icon: "🏥", stat: "YMYL", label: "Compliant" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── Structured Data Scripts ── */}
      <Script
        id="schema-medical-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrgSchema) }}
      />
      <Script
        id="schema-dr-priya"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(drPriyaSchema) }}
      />
      <Script
        id="schema-dr-elena"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(drElenaSchema) }}
      />
      <Script
        id="schema-dr-michael"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(drMichaelSchema) }}
      />
      <Script
        id="schema-dr-sarah"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(drSarahSchema) }}
      />

      <section className="py-12 bg-white dark:bg-neutral-900 transition-colors duration-300">
        <div className="container-custom max-w-4xl">
          {/* ── Hero ── */}
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-neutral-900 dark:text-white">
              About Health Focus
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Empowering you with practical wellness advice grounded in science.
            </p>
          </div>

          {/* ── Trust Bar ── */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-12 px-4 py-5 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(220,38,38,0.07) 0%, rgba(220,38,38,0.03) 100%)",
              border: "1px solid rgba(220,38,38,0.15)",
            }}
            aria-label="Trust indicators"
          >
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700"
              >
                <span className="text-2xl" role="img" aria-label={item.label}>
                  {item.icon}
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                    {item.stat}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Body ── */}
          <div className="prose-custom">
            <SectionDivider title="Our Mission" color="red" />
            <p className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-200 mb-8">
              We believe that everyone deserves access to trustworthy,
              evidence-based health information. In an era of rampant health
              misinformation, our mission is to empower you with practical wellness
              advice that's grounded in science, rigorously reviewed by medical
              experts, and easy to implement in your daily life.
            </p>

            <SectionDivider title="Our Medical Review Board" />
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
              To ensure the highest level of accuracy and safety, all medical and
              health content on Health Focus is rigorously evaluated by our Medical
              Review Board. This board consists of board-certified physicians and
              specialists who verify the clinical accuracy of our articles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
              {/* Dr. Priya Sharma */}
              <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                  Dr. Priya Sharma, MBBS, MD
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">
                  Endocrinologist &amp; Obesity Medicine Specialist
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Board-certified with over 12 years of experience helping patients
                  manage metabolic syndrome, type 2 diabetes, and obesity through
                  evidence-based lifestyle changes.
                </p>
              </div>

              {/* Dr. Elena Rodriguez */}
              <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                  Dr. Elena Rodriguez, MD, FACOG
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">
                  OB/GYN &amp; Reproductive Endocrinologist
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Dual board-certified specialist with 15+ years experience
                  transitioning women through perimenopause, treating PCOS, and
                  optimizing female endocrine function.
                </p>
              </div>

              {/* Dr. Michael Chen */}
              <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                  Dr. Michael Chen, MD, FACC
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">
                  Preventive Cardiologist
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Fellow of the American College of Cardiology. Specializes in
                  advanced lipidology, cardiovascular longevity, and non-invasive
                  atherosclerotic prevention.
                </p>
              </div>

              {/* Dr. Sarah Chen */}
              <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                  Dr. Sarah Chen, MD, PhD
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">
                  Functional Neurologist
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Board-certified neurologist specializing in vagal tone, the
                  gut-brain axis, and non-pharmacological interventions for chronic
                  stress and dysautonomia.
                </p>
              </div>
            </div>

            <SectionDivider title="Our Approach" />
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
              Every article we publish is carefully researched and based on current
              scientific evidence. We focus on:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-neutral-700 dark:text-neutral-300">
              <li>
                <strong>Evidence-Based Content</strong>: All advice is backed by peer-reviewed research
              </li>
              <li>
                <strong>Practical Application</strong>: Tips you can actually use in real life
              </li>
              <li>
                <strong>Realistic Expectations</strong>: No quick fixes or miracle cures
              </li>
              <li>
                <strong>Transparency</strong>: Clear about what we know and don't know
              </li>
            </ul>

            <SectionDivider title="Editorial Standards & E-E-A-T Policy" />
            <div className="p-6 bg-neutral-50 dark:bg-neutral-800 border-l-4 border-primary-600 my-6">
              <p className="text-neutral-900 dark:text-white font-medium mb-3">
                Health Focus strictly adheres to Google's E-E-A-T guidelines
                (Experience, Expertise, Authoritativeness, and Trustworthiness) for
                YMYL (Your Money or Your Life) content.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                <li>
                  <strong>Expertise:</strong> Content is reviewed by accredited doctors.
                </li>
                <li>
                  <strong>Authoritativeness:</strong> We cite only peer-reviewed journals and medical institutions.
                </li>
                <li>
                  <strong>Trustworthiness:</strong> We maintain strict editorial independence and transparent sourcing.
                </li>
              </ul>
            </div>

            <SectionDivider title="Disclaimer" />
            <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg my-6">
              <p className="text-red-900 dark:text-red-200 font-medium text-sm">
                The content on Health Focus is for educational and informational purposes only. Always consult
                with a qualified healthcare provider before making any health
                decisions or starting any treatment program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
