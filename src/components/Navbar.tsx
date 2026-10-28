import React, { useState } from 'react';
import { AnnotlyLogo } from './AnnotlyLogo';
import { User } from '../types';
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  Layers,
  LogOut,
  Sparkles,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  currentView: 'landing' | 'dashboard' | 'studio';
  onNavigate: (view: 'landing' | 'dashboard' | 'studio') => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onSignOut: () => void;
  onOpenDemo: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onNavigate,
  onOpenAuth,
  onSignOut,
  onOpenDemo,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleScrollTo = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 h-20 flex items-center justify-between gap-4 sm:gap-8">
        {/* Brand Zone */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl shrink-0"
          >
            <AnnotlyLogo size="md" />
          </button>

          {/* Quick App Switcher pill for testing dashboard and studio */}
          {currentUser && (
            <div className="hidden lg:flex items-center p-1 bg-slate-100 rounded-xl text-xs sm:text-sm font-semibold shrink-0">
              <button
                onClick={() => onNavigate('landing')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'landing'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Landing Page
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('studio')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'studio'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Live Studio
              </button>
            </div>
          )}
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm lg:text-base font-semibold text-slate-600">
          <button
            onClick={() => handleScrollTo('hero-demo')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            Product
          </button>
          <button
            onClick={() => handleScrollTo('features')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            Features
          </button>
          <button
            onClick={() => handleScrollTo('pricing')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            Pricing
          </button>

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              onBlur={() => setTimeout(() => setResourcesOpen(false), 200)}
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap group"
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  resourcesOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
            </button>

            {resourcesOpen && (
              <div className="absolute left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 z-50 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => {
                    setResourcesOpen(false);
                    onOpenDemo();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Interactive Tour</div>
                    <div className="text-xs text-slate-400">See 3-step feedback flow</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setResourcesOpen(false);
                    handleScrollTo('how-it-works');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Workflow Guide</div>
                    <div className="text-xs text-slate-400">From idea to action in minutes</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                className="flex items-center gap-3 p-1.5 pl-2.5 pr-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-full transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full ${currentUser.avatarColor} text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-2xs`}
                >
                  {currentUser.avatarInitial}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-slate-500 capitalize">{currentUser.role}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-xs sm:text-sm">
                  <div className="px-3.5 py-2.5 border-b border-slate-100 mb-1.5">
                    <p className="font-bold text-slate-900 text-sm">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('dashboard');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl text-left font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                    Dashboard Overview
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('studio');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl text-left font-medium"
                  >
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Open Annotation Studio
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-left font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-4 py-2.5 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                Sign in
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:from-indigo-700 active:to-indigo-800 rounded-xl shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Theme Switcher Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-slate-700 dark:text-slate-200 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-5 pt-4 pb-6 space-y-3">
          <button
            onClick={() => handleScrollTo('hero-demo')}
            className="block w-full text-left px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Product
          </button>
          <button
            onClick={() => handleScrollTo('features')}
            className="block w-full text-left px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Features
          </button>
          <button
            onClick={() => handleScrollTo('pricing')}
            className="block w-full text-left px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Pricing
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDemo();
            }}
            className="block w-full text-left px-3 py-2.5 text-base font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl"
          >
            Interactive Product Demo
          </button>
          {currentUser && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('dashboard');
                }}
                className="block w-full text-left px-3 py-2.5 text-base font-semibold text-slate-900 bg-slate-50 rounded-xl"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('studio');
                }}
                className="block w-full text-left px-3 py-2.5 text-base font-semibold text-indigo-600 bg-indigo-50 rounded-xl"
              >
                Launch Annotation Studio
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
