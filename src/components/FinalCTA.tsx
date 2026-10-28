import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface FinalCTAProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onGetStarted, onWatchDemo }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative">
      <div className="marketing-container">
        {/* Banner with purple-blue gradient matching reference */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 px-6 py-16 sm:px-12 sm:py-20 text-center text-white shadow-2xl shadow-indigo-600/30">
          {/* Subtle curved background rings matching reference */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="500" cy="550" r="450" stroke="white" strokeWidth="2" />
              <circle cx="500" cy="550" r="350" stroke="white" strokeWidth="1.5" />
              <circle cx="500" cy="550" r="250" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto space-y-5">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight sm:whitespace-nowrap">
              Start collecting better feedback today
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-indigo-100 font-normal">
              Get started for free. No credit card required.
            </p>

            {/* Buttons */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-indigo-700 bg-white hover:bg-indigo-50 active:bg-slate-100 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWatchDemo}
                className="flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-indigo-800/40 hover:bg-indigo-800/60 active:bg-indigo-800/80 border border-white/25 rounded-xl backdrop-blur-xs transition-all duration-200 whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-white text-indigo-700 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-indigo-700 ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
