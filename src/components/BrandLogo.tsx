import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'emblem' | 'compact' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  showTagline = true,
}) => {
  const emblemSizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textScaleMap = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Circular Circuit + Plug Emblem */}
      <div className={`relative flex-shrink-0 ${emblemSizeMap[size]} transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow ring */}
          <circle cx="50" cy="50" r="48" stroke="currentColor" className="text-blue-500/20" strokeWidth="1.5" />
          
          {/* Outer dashed dynamic conduit ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#2563EB"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="24 8 12 6 36 10"
            className="animate-[spin_40s_linear_infinite]"
          />
          
          {/* Middle track dashed ring */}
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="14 6 8 6 20 8"
            className="animate-[spin_28s_linear_infinite_reverse]"
          />
          
          {/* Inner ring */}
          <circle
            cx="50"
            cy="50"
            r="26"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 4 16 6"
          />

          {/* Innermost core boundary */}
          <circle cx="50" cy="50" r="18" stroke="#93C5FD" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* Central Power Plug Icon */}
          <g transform="translate(32, 28) scale(0.72)">
            {/* Prongs */}
            <rect x="14" y="2" width="4" height="12" rx="1.5" fill="#2563EB" />
            <rect x="32" y="2" width="4" height="12" rx="1.5" fill="#2563EB" />
            
            {/* Plug Body */}
            <path
              d="M10 14 C10 12, 40 12, 40 14 L38 28 C38 34, 12 34, 12 28 Z"
              fill="#2563EB"
            />
            {/* Plug Neck */}
            <path
              d="M21 33 L29 33 L27 42 L23 42 Z"
              fill="#2563EB"
            />
            {/* Power loop cord circling outward */}
            <path
              d="M25 42 C25 50, 42 50, 44 38 C46 26, 42 12, 28 8 C14 4, 4 18, 5 32 C6 44, 18 52, 30 52"
              stroke="#2563EB"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Micro electrical circuit dots */}
          <circle cx="50" cy="5" r="1.5" fill="#EF4444" />
          <circle cx="85" cy="50" r="1.5" fill="#3B82F6" />
          <circle cx="15" cy="50" r="1.5" fill="#3B82F6" />
          <circle cx="50" cy="95" r="1.5" fill="#EF4444" />
        </svg>
      </div>

      {/* Typography and Tagline */}
      {variant !== 'emblem' && (
        <div className="flex flex-col">
          <div className={`font-display font-extrabold tracking-tight leading-none ${textScaleMap[size]}`}>
            <span className="text-red-500">E</span>
            <span className={variant === 'dark' ? 'text-white' : variant === 'light' ? 'text-slate-900' : 'text-slate-900 dark:text-white'}>BEN</span>
            <span className="text-red-500">TRICK</span>
            <span className="text-blue-500 text-xs sm:text-sm font-semibold tracking-wider uppercase ml-1.5 px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
              GLOBAL
            </span>
          </div>
          
          {showTagline && (
            <span className="text-[10px] sm:text-[11px] font-medium tracking-widest text-slate-500 dark:text-slate-400 mt-1 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Light makes the difference
            </span>
          )}
        </div>
      )}
    </div>
  );
};
