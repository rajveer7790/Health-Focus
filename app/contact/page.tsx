"use client";
import SectionDivider from "@/components/SectionDivider";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.reset();
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <section className="py-12 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="container-custom max-w-2xl">
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-center text-neutral-900 dark:text-white">
          Contact Us
        </h1>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 text-center mb-12">
          Have a news tip, suggestion, or feedback? We'd love to hear from you.
        </p>

        <SectionDivider title="Send a Message" color="black" />

        <form className="space-y-6" id="contact-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wide text-neutral-700 dark:text-neutral-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="w-full px-4 py-3 rounded-none border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 transition-all dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide text-neutral-700 dark:text-neutral-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-none border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 transition-all dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-bold uppercase tracking-wide text-neutral-700 dark:text-neutral-300 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-3 rounded-none border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 transition-all dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wide text-neutral-700 dark:text-neutral-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-4 py-3 rounded-none border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 transition-all resize-none dark:text-white"
            ></textarea>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="consent" className="text-sm text-neutral-600 dark:text-neutral-400">
              I consent to having this website store my submitted information so they can respond to my inquiry. Read our <a href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold uppercase tracking-wider py-4 w-full hover:bg-primary-700 dark:hover:bg-neutral-200 transition-colors"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <p className="text-neutral-600 dark:text-neutral-400 mb-2 font-bold uppercase tracking-wide">
            Or email us directly at
          </p>
          <a href="mailto:hello@healthfocus.com" className="text-primary-600 hover:underline font-display font-bold text-2xl">
            hello@healthfocus.com
          </a>
        </div>
      </div>
    </section>
  );
}
