import React from 'react';
import { ChevronRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white relative">
      <div className="marketing-container text-center">
        {/* Eyebrow */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">
          HOW IT WORKS
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Feedback in 3 simple steps
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
          From idea to action in minutes.
        </p>

        {/* 3 Steps Row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
          {/* STEP 1 */}
          <div className="md:col-span-3 flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50/80 transition-colors">
            {/* Number badge */}
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 text-base font-extrabold flex items-center justify-center mb-6">
              1
            </div>

            {/* Icon box matching reference */}
            <div className="w-16 h-16 rounded-xl border-2 border-indigo-500/20 bg-indigo-50/30 flex items-center justify-center mb-5 text-indigo-600">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="3" y="4" width="18" height="15" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <path d="M12 14l3 3-2 1 1 2-1.5.5-1-2-1.5 1.5V14z" fill="currentColor" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Open a website</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Visit any live or staging website. No setup required.
            </p>
          </div>

          {/* ARROW 1 */}
          <div className="hidden md:flex md:col-span-1 justify-center text-slate-300">
            <ChevronRight className="w-8 h-8" />
          </div>

          {/* STEP 2 */}
          <div className="md:col-span-3 flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50/80 transition-colors">
            {/* Number badge */}
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 text-base font-extrabold flex items-center justify-center mb-6">
              2
            </div>

            {/* Icon box matching reference */}
            <div className="w-16 h-16 rounded-xl border-2 border-indigo-500/20 bg-indigo-50/30 flex items-center justify-center mb-5 text-indigo-600">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="8" y1="9" x2="16" y2="9" />
                <line x1="8" y1="13" x2="13" y2="13" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Click and comment</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Add notes directly on text, images or any element.
            </p>
          </div>

          {/* ARROW 2 */}
          <div className="hidden md:flex md:col-span-1 justify-center text-slate-300">
            <ChevronRight className="w-8 h-8" />
          </div>

          {/* STEP 3 */}
          <div className="md:col-span-3 flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50/80 transition-colors">
            {/* Number badge */}
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 text-base font-extrabold flex items-center justify-center mb-6">
              3
            </div>

            {/* Icon box matching reference */}
            <div className="w-16 h-16 rounded-xl border-2 border-indigo-500/20 bg-indigo-50/30 flex items-center justify-center mb-5 text-indigo-600">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Share and track</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Invite your team or clients and turn feedback into tasks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
