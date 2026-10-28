import React from 'react';
import { ArrowRight, Play, Zap, Globe, Users } from 'lucide-react';
import { HeroBrowserMockup } from './HeroBrowserMockup';
import { AnnotationComment } from '../types';

interface HeroProps {
  comments: AnnotationComment[];
  onToggleResolve: (commentId: string) => void;
  onAddQuickComment: (text: string, x: number, y: number) => void;
  onGetStarted: () => void;
  onWatchDemo: () => void;
  onOpenStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  comments,
  onToggleResolve,
  onAddQuickComment,
  onGetStarted,
  onWatchDemo,
  onOpenStudio,
}) => {
  return (
    <section id="hero-demo" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Subtle background ambient gradients matching reference */}
      <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/60 via-purple-50/40 to-transparent rounded-full filter blur-3xl -z-10" />
      <div className="absolute top-1/2 left-0 -ml-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/70 via-indigo-50/30 to-transparent rounded-full filter blur-3xl -z-10" />

      <div className="marketing-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider text-indigo-600 uppercase">
              <span>WEBSITE FEEDBACK, MADE SIMPLE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] text-balance">
              See It.
              <br />
              Comment It.
              <br />
              Get It Done.
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Annotate any website, share feedback with your team or clients, and turn ideas into
              action — without endless screenshots or confusing emails.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:from-indigo-700 active:to-indigo-800 rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWatchDemo}
                className="flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/80 active:bg-indigo-100 border border-indigo-200/80 rounded-xl transition-all duration-200 whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Benefit Bullets (3 items) matching reference */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                </div>
                <span>No credit card required</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span>Works on any website</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span>Built for teams and agencies</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive Browser Window */}
          <div className="lg:col-span-7">
            <HeroBrowserMockup
              comments={comments}
              onToggleResolve={onToggleResolve}
              onAddQuickComment={onAddQuickComment}
              onOpenStudio={onOpenStudio}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
