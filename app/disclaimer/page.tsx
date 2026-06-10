import Newsletter from "@/components/Newsletter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Health Focus",
  description: "Important medical disclaimer outlining the scope, limitations, and purpose of health and wellness content.",
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="section-padding bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-neutral-900 dark:text-white">
              Medical Disclaimer
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Important information about how health and wellness content on this website should be understood and used.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-neutral-950 transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 transition-colors duration-300">
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                The information published on <strong>Health Focus</strong> (healthfocus.fit) is provided for <strong>educational and informational purposes only</strong>. It is intended to support general understanding of health and wellness topics and is <strong>not intended as medical advice</strong>.
              </p>

              <div className="space-y-10">
                <section>
                  <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-3">
                    Not a Substitute for Professional Medical Advice
                  </h2>
                  <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed">
                    Content on this website should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek guidance from a qualified healthcare provider regarding any medical condition, symptoms, or health-related decisions.
                  </p>
                </section>

                <section>
                  <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-3">
                    No Doctor–Patient Relationship
                  </h2>
                  <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed">
                    Accessing or using this website does <strong>not</strong> create a doctor–patient relationship. The content creators, editors, and operators of this website are <strong>not providing personalized medical services</strong>.
                  </p>
                </section>

                <section>
                  <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-3">
                    Never Delay Seeking Medical Care
                  </h2>
                  <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed">
                    Never disregard or delay seeking professional medical advice because of something you have read on this website. If you believe you may be experiencing a medical emergency, contact your healthcare provider or local emergency services immediately.
                  </p>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-500">
                  <strong>Last updated:</strong> February 22, 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
