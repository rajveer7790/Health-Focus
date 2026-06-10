import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Health Focus",
  description: "Read the Terms of Service for Health Focus (healthfocus.fit).",
};

export default function TermsPage() {
  return (
    <section className="section-padding bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Terms of Service</h1>
        <p className="text-sm text-neutral-500 mb-10">Last updated: February 22, 2026</p>

        <div className="prose-custom">
          <p className="text-lg">
            Welcome to <strong>Health Focus</strong> ("we," "our," or "us"), accessible at <strong>healthfocus.fit</strong>. By accessing and using this website, you accept and agree to be bound by the following Terms of Service.
          </p>

          <h2>1. Use of Content</h2>
          <p>The content on this website is provided for general informational and educational purposes only.</p>

          <h2>2. Health Information Disclaimer</h2>
          <p>All health and wellness content on Health Focus is for <strong>informational and educational purposes only</strong> and is not a substitute for professional medical advice, diagnosis, or treatment.</p>

          <h2>3. Intellectual Property</h2>
          <p>All content on this website is owned by or licensed to Health Focus. Reproduction, redistribution, or commercial use of any content is prohibited without our express written permission.</p>

          <h2>4. Advertising and Affiliate Disclosure</h2>
          <p>This website displays third-party advertisements and may contain affiliate links. If you click on an affiliate link and make a purchase, we may receive a small commission.</p>

          <h2>5. Limitation of Liability</h2>
          <p>Health Focus, its editors, and contributors shall not be liable for any direct, indirect, incidental, punitive, or consequential damages arising from your use of this website.</p>

          <h2>6. Contact</h2>
          <p>If you have any questions about these Terms of Service, please <a href="/contact">contact us</a>.</p>
        </div>
      </div>
    </section>
  );
}
