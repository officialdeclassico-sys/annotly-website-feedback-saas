import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, MousePointer, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchStudio: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onLaunchStudio }) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Step 1: Open Any Webpage & Hover Elements',
      description:
        'Annotly connects directly to your live or staging DOM. Simply hover over any header, image, container, or button to highlight its exact bounding box.',
      badge: 'DOM INSPECTION',
      icon: MousePointer,
      iconBg: 'bg-indigo-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-left space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Inspector Mode: Active</span>
          </div>
          <div className="p-3 border-2 border-dashed border-indigo-400 bg-indigo-950/40 rounded-lg">
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-900/80 px-1.5 py-0.5 rounded">
              h1.hero-title &lt;680px x 94px&gt;
            </span>
            <div className="text-sm font-bold text-white mt-1">Digital Solutions for Growing Brands</div>
          </div>
          <p className="text-xs text-slate-400">
            Hover over any DOM element to target feedback with pixel-perfect accuracy.
          </p>
        </div>
      ),
    },
    {
      title: 'Step 2: Click to Pin Contextual Feedback',
      description:
        'Leave detailed text feedback, assign priority tags, attach screenshots, or mention teammates. No more guessing which button the client meant.',
      badge: 'PIN & ANNOTATE',
      icon: MessageSquare,
      iconBg: 'bg-rose-500',
      preview: (
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-left space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              Sarah (Lead Designer)
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">High Priority</span>
          </div>
          <p className="text-xs text-slate-200">
            "The client wants this hero typography to match their new branding guidelines. Let's make it punchier!"
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-indigo-300">#Copy</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-indigo-300">#Hero</span>
            <span>· 1 reply from Alex</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Step 3: Track, Resolve & Sync with Your Stack',
      description:
        'Mark tasks as resolved in real time. Filter by Open or Resolved, export actionable reports, and keep clients aligned effortlessly.',
      badge: 'COLLABORATION & SYNC',
      icon: CheckCircle,
      iconBg: 'bg-emerald-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-left space-y-2">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="font-bold text-white">Project Activity</span>
            <span className="text-emerald-400 font-mono text-[11px]">88% Resolved</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-800/80 rounded-lg text-xs">
            <span className="text-slate-300">Button CTA sizing updated</span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-semibold">
              Resolved ✓
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-800/80 rounded-lg text-xs">
            <span className="text-slate-300">Hero image swap approved</span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-semibold">
              Resolved ✓
            </span>
          </div>
        </div>
      ),
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative"
      >
        {/* Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Annotly Interactive Tour
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${current.iconBg} text-white flex items-center justify-center shadow-sm`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {current.badge}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">{current.title}</h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{current.description}</p>

          {/* Interactive Step Preview */}
          <div className="rounded-2xl overflow-hidden shadow-inner">{current.preview}</div>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-6 pt-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-sm"
            >
              <span>Next Feature</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onLaunchStudio();
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-semibold hover:from-indigo-500 hover:to-indigo-600 shadow-md"
            >
              <span>Try Live Annotation Studio Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
