import Newsletter from "@/components/Newsletter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy | Health Focus",
  description: "Our commitment to accuracy, integrity, and evidence-based health reporting.",
};

export default function EditorialPolicyPage() {
  return (
    <>
      <section className="section-padding bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-neutral-900 dark:text-white">
              Editorial Policy
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Our commitment to providing accurate, unbiased, and evidence-based health information you can trust.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-neutral-950 transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose-custom">
            <h2>Our Mission</h2>
            <p>
              Our mission is to empower you with the clearest, most evidence-based health and wellness information available. We believe that better health starts with better information.
            </p>

            <h2>Content Integrity & E-E-A-T Principles</h2>
            <p>
              We differ from other health sites because we prioritize <strong>scientific accuracy</strong> above viral trends. Our content is strictly guided by Google's E-E-A-T standards:
            </p>
            <ul>
              <li><strong>Expert-Reviewed (Expertise):</strong> Our medical and health content is rigorously reviewed by our Medical Review Board.</li>
              <li><strong>Evidence-Based (Authoritativeness):</strong> We rely exclusively on peer-reviewed studies and reputable medical organizations.</li>
              <li><strong>Unbiased (Trustworthiness):</strong> We maintain strict editorial independence.</li>
            </ul>

            <h2>Sourcing & Citations</h2>
            <p>
              We are radically transparent about where our information comes from. At the bottom of our health articles, you will find a dedicated "References & Clinical Sources" section.
            </p>

            <h2>Corrections</h2>
            <p>
              Accuracy is our core value. If we discover an error, we correct it immediately and transparently.
            </p>

            <div className="mt-12 not-prose p-6 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-900">
              <h3 className="font-bold text-primary-900 dark:text-primary-100 mb-2">Have a question about our standards?</h3>
              <p className="text-primary-700 dark:text-primary-300 mb-4">We'd love to hear from you.</p>
              <a href="/contact" className="btn btn-primary">Contact Editorial Team</a>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
