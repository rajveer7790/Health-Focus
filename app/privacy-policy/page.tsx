import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Health Focus",
  description: "Health Focus privacy policy — how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-padding bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Privacy Policy</h1>
        <p className="text-sm text-neutral-500 mb-10">Last updated: February 22, 2026</p>

        <div className="prose-custom">
          <p className="text-lg">
            Your privacy is important to us. This Privacy Policy explains how <strong>Health Focus</strong> ("we," "our," or "us"), operated at <strong>healthfocus.fit</strong>, collects, uses, and protects your personal information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide Directly</h3>
          <ul>
            <li>Email address (when you subscribe to our newsletter)</li>
            <li>Name and contact information (when you fill out our contact form)</li>
            <li>Any messages or other information you choose to send us</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, certain data is automatically collected by analytics and advertising tools:</p>
          <ul>
            <li>Browser type, version, and device type</li>
            <li>Operating system</li>
            <li>Pages visited, time spent on pages, and clickstream data</li>
            <li>Referring website or search query</li>
            <li>IP address (used in anonymized form by analytics tools)</li>
            <li>General geographic location (country/city level only)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Send you our newsletter (only if you have subscribed)</li>
            <li>Respond to your inquiries submitted via our contact form</li>
            <li>Analyze website traffic and improve our content and user experience</li>
            <li>Comply with applicable legal obligations</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and serve relevant advertising. Cookies are small text files stored on your device by your browser.</p>

          <h2>Advertising — Google AdSense</h2>
          <p>This website uses <strong>Google AdSense</strong>, a third-party advertising service operated by Google LLC. Google AdSense may use cookies and web beacons to serve advertisements based on your prior visits to this website and other websites on the internet.</p>

          <h2>Analytics — Google Analytics</h2>
          <p>We use <strong>Google Analytics</strong> to understand how visitors interact with our website.</p>

          <h2>Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or your personal data, please <a href="/contact">contact us</a>.</p>
        </div>
      </div>
    </section>
  );
}
