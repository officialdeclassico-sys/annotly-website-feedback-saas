import React, { useState } from 'react';
import { Check, ArrowRight, Shield } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$0',
      period: 'forever free',
      description: 'Ideal for freelance designers and quick client reviews.',
      badge: null,
      features: [
        'Up to 3 active review projects',
        'Unlimited pins & text comments',
        'Export feedback to CSV / JSON',
        'Standard DOM element inspector',
        'Public review share links',
        '7-day feedback history',
      ],
      ctaText: 'Start for Free',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Professional',
      price: billingCycle === 'annual' ? '$19' : '$24',
      period: 'per seat / month',
      description: 'For creative studios, agencies, and high-velocity product teams.',
      badge: 'Most Popular',
      features: [
        'Unlimited website review projects',
        'Unlimited pins, highlights & drawings',
        'Real-time team collaboration',
        'Jira, GitHub & Slack export sync',
        'Multi-device viewport testing (Mobile & Tablet)',
        'Private workspace with role permissions',
        'Priority email & chat support',
      ],
      ctaText: 'Start 14-Day Pro Trial',
      popular: true,
    },
    {
      id: 'agency',
      name: 'Agency & Scale',
      price: billingCycle === 'annual' ? '$49' : '$59',
      period: 'per month (includes 5 seats)',
      description: 'For large agencies managing multiple client deliverables.',
      badge: null,
      features: [
        'Everything in Professional',
        '5 team seats included (+$10/extra seat)',
        'Custom client branding & white-label reviews',
        'Guest client review portals (no login needed)',
        'Custom domain support',
        'Dedicated account manager',
        'SOC2 compliance report & SLA',
      ],
      ctaText: 'Choose Agency Plan',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-slate-50/60 border-t border-slate-100">
      <div className="marketing-container text-center">
        {/* Eyebrow */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">
          TRANSPARENT PRICING
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Simple plans for every team size
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
          Start for free, upgrade when your team scales. No credit card required.
        </p>

        {/* Billing Switcher */}
        <div className="mt-8 inline-flex items-center p-1 bg-slate-200/70 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
              billingCycle === 'annual'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Annual billing</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-md">
              Save 20%
            </span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 ${
                plan.popular
                  ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-500/10 relative'
                  : 'bg-white border border-slate-200/80 shadow-xs hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>

                <div className="mt-5 pb-6 border-b border-slate-100">
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500 ml-1.5">{plan.period}</span>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    What's included:
                  </p>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-100">
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-500 hover:to-indigo-600 shadow-sm'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Prototype billing notice */}
        <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-indigo-50/70 text-indigo-900 border border-indigo-100 rounded-xl text-xs">
          <Shield className="w-4 h-4 text-indigo-600" />
          <span>
            <strong>Prototype Billing Notice:</strong> Subscription payments are disabled in this
            preview. All features are accessible for demonstration without actual payment processing.
          </span>
        </div>
      </div>
    </section>
  );
};
