import React from 'react';
import { AnnotlyLogo } from './AnnotlyLogo';

interface FooterProps {
  onOpenDemo: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo, onOpenAuth }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="marketing-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <AnnotlyLogo size="md" whiteText />
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Annotly makes website reviews, visual bug tracking, and client design approval fast
              and effortless. No screenshots, no spreadsheets, no confusing emails.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300 text-[11px] font-medium">All systems operational</span>
            </div>
          </div>

          {/* Col 1: Product */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero-demo" className="hover:text-white transition-colors">
                  Visual Annotations
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Live DOM Inspector
                </a>
              </li>
              <li>
                <button onClick={onOpenDemo} className="hover:text-white transition-colors text-left">
                  Interactive Demo
                </button>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <span className="text-slate-500">Chrome Extension (Roadmap)</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  For Creative Agencies
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  For Web Developers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  For Product Teams
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Client Portal Reviews
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Trust &amp; Legal</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Security Overview
                </span>
              </li>
              <li>
                <button onClick={onOpenAuth} className="hover:text-white transition-colors text-left">
                  Sign in to Studio
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Annotly SaaS. All rights reserved.</p>
          <p>Designed for pixel-perfect website reviews and team collaboration.</p>
        </div>
      </div>
    </footer>
  );
};
