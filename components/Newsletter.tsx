"use client";
import Link from "next/link";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for subscribing!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="section-padding bg-neutral-50 dark:bg-neutral-900 border-t border-b border-neutral-200 dark:border-neutral-800">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16 text-center">
              <div className="mb-8">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                  Get 1 Science-Backed Health Habit Every Sunday
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                  Join <strong className="text-neutral-900 dark:text-white">10,000+ readers</strong> getting practical, evidence-based wellness tips. No spam, just actionable advice.
                </p>
              </div>

              <form className="max-w-xl mx-auto" id="newsletter-form" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-0 border border-neutral-300 dark:border-neutral-700 p-1 bg-white dark:bg-neutral-800">
                  <input
                    type="email"
                    name="email"
                    id="newsletter-email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none text-base"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wide hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors whitespace-nowrap"
                  >
                    Subscribe Free
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <p>
                    Unsubscribe anytime. View our <Link href="/privacy-policy" className="text-black dark:text-white underline hover:no-underline">Privacy Policy</Link>.
                  </p>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex justify-center gap-12 text-center">
                  <div>
                    <div className="text-xl font-bold text-neutral-900 dark:text-white mb-1">10,000+</div>
                    <div className="text-xs uppercase tracking-wide text-neutral-500">Subscribers</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-neutral-900 dark:text-white mb-1">Weekly</div>
                    <div className="text-xs uppercase tracking-wide text-neutral-500">Expert Tips</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
