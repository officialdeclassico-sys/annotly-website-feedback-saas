import React from 'react';

interface AnnotlyLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  whiteText?: boolean;
}

export const AnnotlyLogo: React.FC<AnnotlyLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  whiteText = false,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }[size];

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Annotly Speech Bubble Icon matching reference */}
      <div
        className={`${iconDimensions} rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-sm relative overflow-hidden transition-transform duration-200 hover:scale-105`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          {/* Rounded speech bubble with pin dot */}
          <path
            d="M12 3C6.477 3 2 7.029 2 12c0 1.956.702 3.765 1.895 5.213L3.06 20.24a.75.75 0 0 0 .97.97l3.23-1.077A9.878 9.878 0 0 0 12 21c5.523 0 10-4.029 10-9s-4.477-9-10-9z"
            fill="currentColor"
          />
          {/* Stylized annotation pin / check highlight dot */}
          <circle cx="12" cy="11.5" r="2.75" fill="#4338CA" />
          <circle cx="12" cy="11.5" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      {!iconOnly && (
        <span
          className={`${textSizes} font-extrabold tracking-tight ${
            whiteText ? 'text-white' : 'text-slate-900'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          Annotly
        </span>
      )}
    </div>
  );
};
