import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-neutral-950 pt-20 pb-10 overflow-hidden transition-colors duration-300">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-teal-400 to-emerald-400 opacity-80"></div>
      
      {/* Subtle background glow */}
      <div className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-[120px] pointer-events-none"></div>
      
      <div className="container-custom relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
        {/* Brand & Newsletter Section (Span 5) */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col pr-0 lg:pr-10">
          <Link href="/" className="text-3xl font-display font-black tracking-tight mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-teal-500 dark:from-primary-400 dark:to-teal-300">
            Health Focus
          </Link>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-sm leading-relaxed max-w-md">
            Your trusted source for evidence-based health, nutrition, and wellness. We believe in empowering you to make informed decisions about your well-being.
          </p>
          
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">Join our newsletter</h4>
            <form className="relative flex items-center max-w-sm">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full py-3 pl-5 pr-14 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1.5 p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-full transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary-200 dark:hover:text-primary-400 dark:hover:border-primary-800 transition-all hover:shadow-lg hover:-translate-y-1">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary-200 dark:hover:text-primary-400 dark:hover:border-primary-800 transition-all hover:shadow-lg hover:-translate-y-1">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary-200 dark:hover:text-primary-400 dark:hover:border-primary-800 transition-all hover:shadow-lg hover:-translate-y-1">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary-200 dark:hover:text-primary-400 dark:hover:border-primary-800 transition-all hover:shadow-lg hover:-translate-y-1">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Links Sections (Span 7) */}
        <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-neutral-900 dark:text-white">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/category/nutrition" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Nutrition
                </Link>
              </li>
              <li>
                <Link href="/category/mental-health" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Mental Health
                </Link>
              </li>
              <li>
                <Link href="/category/sleep" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Sleep
                </Link>
              </li>
              <li>
                <Link href="/category/fitness" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Fitness
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-neutral-900 dark:text-white">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Editorial Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-neutral-900 dark:text-white">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy-policy" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="group flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <span className="w-0 overflow-hidden group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out text-primary-500">→</span>
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-custom border-t border-neutral-200 dark:border-neutral-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-neutral-500 dark:text-neutral-500 text-xs font-medium">
          &copy; {new Date().getFullYear()} Health Focus. All rights reserved.
        </p>
        <div className="max-w-2xl text-center md:text-right">
          <p className="text-neutral-400 dark:text-neutral-600 text-[11px] leading-relaxed">
            The information provided on Health Focus is for educational and informational purposes only and is not intended as medical advice. Always consult a physician or qualified health provider before making any changes to your health regimen.
          </p>
        </div>
      </div>
    </footer>
  );
}
