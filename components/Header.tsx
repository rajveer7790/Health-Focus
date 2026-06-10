"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'All Articles', href: '/blog' },
  { name: 'Nutrition', href: '/category/nutrition' },
  { name: 'Mental Health', href: '/category/mental-health' },
  { name: 'Women\'s Health', href: '/category/womens-health' },
  { name: 'Men\'s Health', href: '/category/mens-health' },
  { name: 'Gut Health', href: '/category/gut-health' },
  { name: 'Hormone Health', href: '/category/hormone-health' },
  { name: 'Metabolic Health', href: '/category/metabolic-health' },
  { name: 'Nervous System', href: '/category/nervous-system' },
  { name: 'Longevity', href: '/category/longevity' },
  { name: 'Biohacking', href: '/category/biohacking' },
  { name: 'Skin Longevity', href: '/category/skin-longevity' },
  { name: 'Heart Health', href: '/category/heart-health' },
  { name: 'Healthy Habits', href: '/category/healthy-habits' },
  { name: 'Wellness', href: '/category/wellness' },
  { name: 'Lifestyle', href: '/category/lifestyle' },
  { name: 'About', href: '/about' }
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md ${scrolled ? 'shadow-md border-b border-neutral-200 dark:border-neutral-800' : 'border-b border-neutral-200 dark:border-neutral-800'}`}>
      {/* Top Tier: Brand & Actions */}
      <div className="container-custom mx-auto h-16 md:h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 -ml-2 text-neutral-600 dark:text-neutral-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-display font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-teal-500 dark:from-primary-400 dark:to-teal-300 shrink-0">
          Health Focus
        </Link>
        
        {/* Subscribe Button */}
        <div className="flex items-center shrink-0">
          <Link href="/contact" className="btn btn-primary px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm shadow-sm hover:shadow-md transition-all">
            Subscribe
          </Link>
        </div>
      </div>

      {/* Bottom Tier: Desktop Navigation (Scrollable) */}
      <div className="hidden md:block container-custom mx-auto border-t border-neutral-100 dark:border-neutral-900/50">
        <nav className="flex items-center justify-start gap-8 lg:gap-10 h-14 overflow-x-auto overflow-y-hidden whitespace-nowrap px-2 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-[13px] uppercase tracking-wider transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      <div className={`md:hidden absolute left-0 w-full bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-2xl transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block text-[15px] font-semibold uppercase tracking-wide text-neutral-800 dark:text-neutral-200 hover:text-primary-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
