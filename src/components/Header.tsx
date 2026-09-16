import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export interface HeaderProps {
  className?: string;
  onGetStarted?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ className = '', onGetStarted }) => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Platform', href: '/platform', id: 'header-link-platform' },
    { label: 'Solutions', href: '/solutions', id: 'header-link-solutions' },
    { label: 'Case Studies', href: '/case-studies', id: 'header-link-casestudies' },
    { label: 'About', href: '/about', id: 'header-link-about' },
    { label: 'FAQ', href: '/faq', id: 'header-link-faq' },
    { label: 'Contact', href: '/contact', id: 'header-link-contact' },
  ];

  const handleNavClick = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  const handleGetStartedClick = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate('/platform');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      role="banner"
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] transition-all shadow-xs ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              id="header-logo-button"
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/40 rounded-xl p-1 text-left transition-transform active:scale-[0.99]"
              aria-label="Nharire Intelligence Homepage"
            >
              {/* Nharire Watchtower Crest Emblem */}
              <div
                id="header-logo-icon"
                className="w-10 h-10 rounded-xl bg-[#0B5D3B] flex items-center justify-center shadow-md shadow-[#0B5D3B]/20 group-hover:bg-[#08482e] transition-colors relative overflow-hidden"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M20 7L30 15H10L20 7Z" fill="#22C55E" />
                  <rect x="13.5" y="15" width="13" height="7" rx="1.5" fill="#FFFFFF" />
                  <circle cx="20" cy="18.5" r="2.5" fill="#0B5D3B" />
                  <circle cx="20" cy="18.5" r="1" fill="#22C55E" />
                  <path d="M11 23H29L32 33H8L11 23Z" fill="#DCFCE7" />
                  <rect x="18.5" y="25" width="3" height="8" rx="1" fill="#0B5D3B" />
                </svg>
              </div>

              {/* Logo Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    id="header-logo-text"
                    className="font-extrabold text-[#111827] tracking-tight text-lg sm:text-xl group-hover:text-[#0B5D3B] transition-colors"
                  >
                    Nharire Intelligence
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#0B5D3B] bg-[#DCFCE7] px-1.5 py-0.5 rounded-sm">
                    Nharire Data Group
                  </span>
                  <span className="text-[11px] text-[#6B7280] hidden xl:inline font-medium">
                    • African-First Data &amp; AI
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            id="header-desktop-nav"
            className="hidden lg:flex items-center space-x-1"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <button
                  key={link.label}
                  id={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/20 ${
                    isActive
                      ? 'text-[#0B5D3B] bg-[#DCFCE7] shadow-2xs font-bold'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action Area: Contact Quick Link & 'Get Started' Primary CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-contact-link-desktop"
              onClick={() => handleNavClick('/contact')}
              className="hidden lg:inline-flex text-sm font-semibold text-[#4B5563] hover:text-[#0B5D3B] px-3.5 py-2 rounded-xl hover:bg-[#F1F5F9] transition-colors"
            >
              Talk to Us
            </button>

            <button
              id="header-get-started-btn"
              onClick={handleGetStartedClick}
              className="inline-flex items-center gap-2 bg-[#0B5D3B] hover:bg-[#08482e] text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm hover:shadow-md hover:shadow-[#0B5D3B]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/40 active:scale-[0.99]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="header-mobile-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#111827]" /> : <Menu className="w-5 h-5 text-[#111827]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="header-mobile-drawer"
          className="lg:hidden border-b border-[#E5E7EB] bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Trust indicator banner in mobile menu */}
          <div className="flex items-center gap-2 px-3.5 py-2 mb-3 rounded-lg bg-[#DCFCE7]/60 text-[#0B5D3B] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#16A34A]" />
            <span>African-First Data &amp; AI Intelligence</span>
          </div>

          {/* Navigation Links list */}
          <nav className="space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <button
                  key={link.label}
                  id={`mobile-${link.id}`}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors min-h-[44px] ${
                    isActive
                      ? 'text-[#0B5D3B] bg-[#DCFCE7] font-bold'
                      : 'text-[#1F2937] hover:bg-[#F1F5F9] active:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#0B5D3B]' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </nav>

          {/* Mobile CTAs */}
          <div className="mt-5 pt-4 border-t border-[#E5E7EB] space-y-2.5">
            <button
              id="header-mobile-get-started-btn"
              onClick={handleGetStartedClick}
              className="w-full flex items-center justify-center gap-2 bg-[#0B5D3B] hover:bg-[#08482e] text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-sm transition-all min-h-[44px] active:scale-[0.99]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="header-mobile-contact-btn"
              onClick={() => handleNavClick('/contact')}
              className="w-full text-center py-3 px-4 rounded-xl text-sm font-semibold text-[#1F2937] bg-[#F8FAFC] hover:bg-gray-100 border border-[#E5E7EB] min-h-[44px]"
            >
              Talk to Our Data Architects
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
