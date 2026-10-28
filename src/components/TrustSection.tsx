import React from 'react';

const logos = [
  {
    name: 'stripe',
    content: (
      <span className="text-xl font-bold tracking-tighter text-slate-700 dark:text-slate-200 font-sans hover:text-[#635BFF] transition-colors">
        stripe
      </span>
    ),
  },
  {
    name: 'shopify',
    content: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 text-[#95BF47]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.8 6.2c-.1-.1-.3-.1-.4 0l-1.9 1.1c-.2.1-.4 0-.4-.2L16 2.5c0-.2-.2-.4-.4-.4h-3.4c-.2 0-.4.2-.4.4l-1.1 4.6c0 .2-.2.3-.4.2L8.4 6.2c-.2-.1-.4 0-.5.1L5 11.2c-.1.1-.1.3 0 .4l8.2 10.3c.1.1.3.1.4 0l8.2-10.3c.1-.1.1-.3 0-.4L19.8 6.2z"/>
        </svg>
        <span className="text-lg font-bold tracking-tight text-slate-700 dark:text-slate-200">shopify</span>
      </div>
    ),
  },
  {
    name: 'webflow',
    content: (
      <span className="text-lg font-bold tracking-tight text-slate-700 dark:text-slate-200 font-sans hover:text-[#146EF5] transition-colors">
        webflow
      </span>
    ),
  },
  {
    name: 'figma',
    content: (
      <div className="flex items-center gap-1.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-0.5">
            <span className="w-2 h-2 rounded-l-full bg-[#F24E1E]" />
            <span className="w-2 h-2 rounded-r-full bg-[#FF7262]" />
          </div>
          <div className="flex gap-0.5">
            <span className="w-2 h-2 rounded-l-full bg-[#A259FF]" />
            <span className="w-2 h-2 rounded-full bg-[#1ABCFE]" />
          </div>
        </div>
        <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">Figma</span>
      </div>
    ),
  },
  {
    name: 'notion',
    content: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded bg-slate-800 dark:bg-slate-700 text-white font-serif font-black text-xs flex items-center justify-center">
          N
        </div>
        <span className="text-lg font-semibold text-slate-700 dark:text-slate-200 font-serif">Notion</span>
      </div>
    ),
  },
  {
    name: 'slack',
    content: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 text-slate-700 dark:text-slate-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.5 10.5C4.67 10.5 4 11.17 4 12s.67 1.5 1.5 1.5h1.5v-3H5.5zm3 0C9.33 10.5 10 9.83 10 9V5.5C10 4.67 9.33 4 8.5 4S7 4.67 7 5.5v5h1.5zM13.5 10.5h-1.5v3h1.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zm0-5c-.83 0-1.5.67-1.5 1.5v3h1.5c.83 0 1.5-.67 1.5-1.5S14.33 5.5 13.5 5.5z"/>
        </svg>
        <span className="text-lg font-bold tracking-tight text-slate-700 dark:text-slate-200">slack</span>
      </div>
    ),
  },
  {
    name: 'google',
    content: (
      <span className="text-lg font-semibold tracking-tight text-slate-700 dark:text-slate-200">Google</span>
    ),
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900">
      <div className="marketing-container text-center">
        {/* Eyebrow */}
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          TRUSTED BY AGENCIES, TEAMS AND BUSINESSES WORLDWIDE
        </p>

        {/* Infinite Scrolling Logo Ticker */}
        <div className="relative w-full overflow-hidden py-4 group">
          {/* Gradient fade masks blending to pure white */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center gap-16 md:gap-24 px-8">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex items-center justify-center h-10 opacity-75 grayscale hover:grayscale-0 transition-all duration-300"
                title={`${logo.name} logo`}
              >
                {logo.content}
              </div>
            ))}
          </div>
        </div>

        {/* Quiet disclaimer */}
        <p className="text-[10px] text-slate-400 mt-5">
          * Illustrative platform workflow connectors &amp; design placeholders
        </p>
      </div>
    </section>
  );
};
