import React from 'react';
import { MousePointer, Users, CheckSquare, ShieldCheck } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  const features = [
    {
      id: 'visual-feedback',
      title: 'Visual Feedback',
      description: 'Click, highlight or draw on the page.',
      icon: MousePointer,
      iconBg: 'bg-blue-500',
      boxBg: 'bg-blue-50/50',
    },
    {
      id: 'team-collaboration',
      title: 'Team Collaboration',
      description: 'Invite teammates and clients easily.',
      icon: Users,
      iconBg: 'bg-indigo-600',
      boxBg: 'bg-indigo-50/50',
    },
    {
      id: 'task-management',
      title: 'Task Management',
      description: 'Turn comments into actionable tasks.',
      icon: CheckSquare,
      iconBg: 'bg-indigo-600',
      boxBg: 'bg-indigo-50/50',
    },
    {
      id: 'secure-private',
      title: 'Secure & Private',
      description: 'Your data and feedback stay safe.',
      icon: ShieldCheck,
      iconBg: 'bg-indigo-600',
      boxBg: 'bg-indigo-50/50',
    },
  ];

  return (
    <section id="features" className="py-16 lg:py-20 bg-slate-50/40 border-t border-slate-100">
      <div className="marketing-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 text-left group"
              >
                {/* Icon box matching reference */}
                <div
                  className={`w-12 h-12 rounded-xl ${feat.iconBg} text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6 stroke-[2.25]" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
