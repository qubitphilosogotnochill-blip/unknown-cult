import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'auto' | 'white' | 'black';
  className?: string;
  inPill?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showTagline = false,
  variant = 'auto',
  className = '',
  inPill = true
}) => {
  const symbolDimensions = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
    xl: 'w-12 h-12 sm:w-14 sm:h-14'
  };

  const titleSizes = {
    sm: 'text-xs tracking-[0.22em]',
    md: 'text-sm sm:text-base tracking-[0.24em]',
    lg: 'text-lg sm:text-xl tracking-[0.28em]',
    xl: 'text-2xl sm:text-3xl tracking-[0.3em]'
  };

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none transition-all duration-300 ${
        inPill 
          ? 'px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm hover:border-white/35 hover:bg-white/[0.08]' 
          : ''
      } ${className}`}
      aria-label="UNKNOWN CULT — Return to Home"
    >
      {/* ORIGINAL GEOMETRIC UC MONOGRAM */}
      <div className={`relative flex items-center justify-center shrink-0 ${symbolDimensions[size]} transition-transform duration-500 ease-out group-hover:scale-105`}>
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full fill-current text-cult-text group-hover:text-cult-accent transition-colors duration-300"
          aria-hidden="true"
        >
          {/* Angular U & C Interlocking Monogram */}
          <path d="M12 16H30V64L42 76H54L64 66V50H48V36H78V72L60 90H36L12 66V16Z" />
          <path d="M88 16H52L40 28H74V40H88V16Z" />
          <path d="M88 84H66L78 72H88V84Z" />
          <polygon points="58,46 68,36 74,42 64,52" className="text-cult-accent fill-current" />
        </svg>
      </div>

      {/* WORDMARK */}
      <div className="flex flex-col justify-center">
        <span className={`font-heading font-extrabold uppercase text-cult-text leading-none transition-colors duration-300 group-hover:text-white whitespace-nowrap ${titleSizes[size]}`}>
          UNKNOWN CULT
        </span>
        {showTagline && (
          <span className="text-[8px] font-mono tracking-cult-mega uppercase text-cult-muted mt-1 font-semibold group-hover:text-cult-accent transition-colors">
            BELONG TO NO ONE.
          </span>
        )}
      </div>
    </Link>
  );
};
