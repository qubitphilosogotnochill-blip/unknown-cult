import React, { useState } from 'react';

interface CultImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export const CultImage: React.FC<CultImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc = '/images/hero/uc-hero-01-not-made-to-fit-in_159f6e5f.webp',
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const finalSrc = hasError ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden bg-cult-surface ${containerClassName}`}>
      {/* Brutalist Skeleton Loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-cult-surface animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-cult-border border-t-cult-accent rounded-full animate-spin opacity-50" />
        </div>
      )}

      <img
        src={finalSrc}
        alt={alt || 'UNKNOWN CULT'}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setIsLoaded(true);
          }
        }}
        className={`transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />

      {/* Fallback Badge Overlay when fallback is active */}
      {hasError && (
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 border border-white/10 text-[8px] font-mono text-cult-muted uppercase tracking-widest pointer-events-none">
          ARCHIVE
        </div>
      )}
    </div>
  );
};
