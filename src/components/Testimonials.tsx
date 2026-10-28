import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 'priya',
      quote:
        '“This tool has completely changed the way we collect client feedback. So easy to use!”',
      name: 'Priya S.',
      role: 'Creative Agency',
      avatarInitial: 'P',
      avatarBg: 'bg-amber-600',
    },
    {
      id: 'arjun',
      quote:
        '“No more screenshots or confusing emails. Everything is right on the website.”',
      name: 'Arjun M.',
      role: 'Product Team',
      avatarInitial: 'A',
      avatarBg: 'bg-indigo-600',
    },
    {
      id: 'neha',
      quote: '“Simple, powerful and saves so much time for our team.”',
      name: 'Neha K.',
      role: 'Freelance Designer',
      avatarInitial: 'N',
      avatarBg: 'bg-rose-500',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="marketing-container text-center">
        {/* Eyebrow */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">
          WHAT OUR CUSTOMERS SAY
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Loved by teams who build for the web
        </h2>

        {/* Testimonials 3 Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <p className="text-base text-slate-700 leading-relaxed font-normal mb-8">
                {item.quote}
              </p>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs`}
                  >
                    {item.avatarInitial}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.name}</h4>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>

                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prototype disclosure */}
        <p className="text-[11px] text-slate-400 mt-6">
          * Representative feedback and reviews from beta design partners
        </p>
      </div>
    </section>
  );
};
