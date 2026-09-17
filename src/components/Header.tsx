import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useTheme } from '../context/ThemeContext';

export interface HeaderProps {
  className?: string;
  onGetStarted?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ className = '', onGetStarted }) => {
  const { currentPath, navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
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

  const isDark = theme === 'dark';

  return (
    <header
      id="main-header"
      role="banner"
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-200 ${
        isDark
          ? 'bg-[#0A1128]/95 border-b border-slate-800/80 shadow-md shadow-black/20'
          : 'bg-white/95 border-b border-[#E5E7EB] shadow-xs'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              id="header-logo-button"
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 rounded-xl p-1 text-left transition-transform active:scale-[0.99]"
              aria-label="Nharire Intelligence Homepage"
            >
              {/* Nharire Watchtower Crest Emblem */}
              <div
                id="header-logo-icon"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#1E40AF] flex items-center justify-center shadow-md shadow-[#0284C7]/25 transition-all relative overflow-hidden shrink-0"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M20 7L30 15H10L20 7Z" fill="#00D2FF" />
                  <rect x="13.5" y="15" width="13" height="7" rx="1.5" fill="#FFFFFF" />
                  <circle cx="20" cy="18.5" r="2.5" fill="#0A1128" />
                  <circle cx="20" cy="18.5" r="1" fill="#00D2FF" />
                  <path d="M11 23H29L32 33H8L11 23Z" fill="#BAE6FD" />
                  <rect x="18.5" y="25" width="3" height="8" rx="1" fill="#0369A1" />
                </svg>
              </div>

              {/* Logo Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    id="header-logo-text"
                    className={`font-extrabold tracking-tight text-lg sm:text-xl transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-[#00D2FF]'
                        : 'text-[#111827] group-hover:text-[#0284C7]'
                    }`}
                  >
                    Nharire Intelligence
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm ${
                      isDark
                        ? 'text-[#00D2FF] bg-[#00D2FF]/15 border border-[#00D2FF]/30'
                        : 'text-[#0284C7] bg-[#E0F2FE]'
                    }`}
                  >
                    Nharire Data Group
                  </span>
                  <span
                    className={`text-[11px] hidden xl:inline font-medium ${
                      isDark ? 'text-slate-400' : 'text-[#6B7280]'
                    }`}
                  >
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
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 ${
                    isActive
                      ? isDark
                        ? 'text-[#00D2FF] bg-[#00D2FF]/15 shadow-2xs font-bold border border-[#00D2FF]/30'
                        : 'text-[#0284C7] bg-[#E0F2FE] shadow-2xs font-bold'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                        : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              id="header-theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 ${
                isDark
                  ? 'bg-slate-900/90 border-slate-700 text-[#00D2FF] hover:bg-slate-800 hover:border-slate-600'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-slate-700 hover:bg-slate-100 hover:text-[#0284C7]'
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#0284C7]" />
              )}
              <span className="text-xs font-semibold hidden md:inline">
                {isDark ? 'Light' : 'Dark'}
              </span>
            </button>

            <button
              id="header-contact-link-desktop"
              onClick={() => handleNavClick('/contact')}
              className={`hidden lg:inline-flex text-sm font-semibold px-3.5 py-2 rounded-xl transition-colors ${
                isDark
                  ? 'text-slate-300 hover:text-[#00D2FF] hover:bg-slate-800/70'
                  : 'text-[#4B5563] hover:text-[#0284C7] hover:bg-[#F1F5F9]'
              }`}
            >
              Talk to Us
            </button>

            <button
              id="header-get-started-btn"
              onClick={handleGetStartedClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm hover:shadow-md hover:shadow-[#0284C7]/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 active:scale-[0.99]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="header-mobile-theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-[#00D2FF]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#0284C7]'
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#0284C7]" />
              )}
            </button>

            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-100 hover:bg-slate-800'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-[#0284C7]`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="header-mobile-drawer"
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[#111827]'}`} />
              ) : (
                <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[#111827]'}`} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="header-mobile-drawer"
          className={`lg:hidden border-b px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 ${
            isDark
              ? 'bg-[#0A1128] border-slate-800 text-slate-100'
              : 'bg-white border-[#E5E7EB] text-[#111827]'
          }`}
        >
          {/* Trust indicator banner in mobile menu */}
          <div
            className={`flex items-center gap-2 px-3.5 py-2 mb-3 rounded-lg text-xs font-semibold ${
              isDark
                ? 'bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20'
                : 'bg-[#E0F2FE]/70 text-[#0284C7]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#0284C7]" />
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
                      ? isDark
                        ? 'text-[#00D2FF] bg-[#00D2FF]/15 font-bold border border-[#00D2FF]/30'
                        : 'text-[#0284C7] bg-[#E0F2FE] font-bold'
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-900 active:bg-slate-800'
                        : 'text-[#1F2937] hover:bg-[#F1F5F9] active:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isActive ? (isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]') : 'text-gray-400'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Mobile Theme Switch Row inside drawer */}
          <div
            className={`mt-4 pt-3 border-t flex items-center justify-between px-2 ${
              isDark ? 'border-slate-800 text-slate-300' : 'border-[#E5E7EB] text-slate-600'
            }`}
          >
            <span className="text-xs font-semibold">Interface Appearance</span>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-[#00D2FF]'
                  : 'bg-slate-100 border-slate-200 text-[#0284C7]'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#0284C7]" />}
              <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>

          {/* Mobile CTAs */}
          <div
            className={`mt-4 pt-4 border-t space-y-2.5 ${
              isDark ? 'border-slate-800' : 'border-[#E5E7EB]'
            }`}
          >
            <button
              id="header-mobile-get-started-btn"
              onClick={handleGetStartedClick}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-sm transition-all min-h-[44px] active:scale-[0.99]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="header-mobile-contact-btn"
              onClick={() => handleNavClick('/contact')}
              className={`w-full text-center py-3 px-4 rounded-xl text-sm font-semibold border min-h-[44px] ${
                isDark
                  ? 'text-slate-200 bg-slate-900 hover:bg-slate-850 border-slate-800'
                  : 'text-[#1F2937] bg-[#F8FAFC] hover:bg-gray-100 border-[#E5E7EB]'
              }`}
            >
              Talk to Our Data Architects
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

