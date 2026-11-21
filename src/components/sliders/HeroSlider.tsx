import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CultImage } from '../common/CultImage';

export interface HeroSlideData {
  id: string;
  number: string;
  eyebrow: string;
  headlineLines: string[];
  subheadingLines: string[];
  primaryCta: { label: string; link: string };
  imageUrl: string;
  imageAlt: string;
}

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'hero-01',
    number: '01',
    eyebrow: 'UNKNOWN CULT™',
    headlineLines: ['BELONG TO', 'NO ONE.'],
    subheadingLines: ['A CULT FOR THE UNDEFINED.', 'A BRAND FOR THE REBELLIOUS.'],
    primaryCta: { label: 'EXPLORE COLLECTION', link: '/shop' },
    imageUrl: '/images/hero/uc-hero-02-belong-to-no-one_1eba30e2.webp',
    imageAlt: 'Model wearing black oversized Unknown Cult streetwear with sunglasses'
  },
  {
    id: 'hero-02',
    number: '02',
    eyebrow: 'UNKNOWN CULT™',
    headlineLines: ['NOT MADE', 'TO FIT IN.'],
    subheadingLines: ['AN IDENTITY BEYOND TRENDS.', 'A CULTURE WITHOUT BOUNDARIES.'],
    primaryCta: { label: 'EXPLORE THE CULT', link: '/collections/street-cult' },
    imageUrl: '/images/hero/uc-hero-01-not-made-to-fit-in_159f6e5f.webp',
    imageAlt: 'Model in contemporary oversized black coat silhouette'
  },
  {
    id: 'hero-03',
    number: '03',
    eyebrow: 'UNKNOWN CULT™',
    headlineLines: ['BUILT', 'DIFFERENT.'],
    subheadingLines: ['ENGINEERED FOR RAW POWER,', 'DISCIPLINE, AND SOVEREIGNTY.'],
    primaryCta: { label: 'SHOP GYMWEAR', link: '/collections/gym-cult' },
    imageUrl: '/images/hero/uc-hero-03-built-different_323259e9.webp',
    imageAlt: 'Athletic model in minimal industrial gym aesthetic'
  }
];

const AUTOPLAY_DURATION = 6500; // 6.5s

export const HeroSlider: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentIdx];

  const goToNext = useCallback(() => {
    setCurrentIdx(prev => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIdx(prev => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Autoplay and progress bar
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalStep = 50;
    const stepIncrement = (intervalStep / AUTOPLAY_DURATION) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          goToNext();
          return 0;
        }
        return p + stepIncrement;
      });
    }, intervalStep);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) goToNext();
      else goToPrev();
    }
  };

  return (
    <section 
      className="relative w-full min-h-[calc(100svh-4.5rem)] sm:min-h-[720px] max-h-[1050px] bg-black select-none overflow-hidden flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Editorial Hero Campaign"
    >
      {/* 01. FULL-WIDTH CINEMATIC BACKGROUND PHOTOGRAPHY */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.imageAlt}
            className="w-full h-full object-cover object-[70%_25%] sm:object-right md:object-center filter grayscale contrast-125 brightness-90 transition-transform duration-10000 ease-out transform scale-100 hover:scale-105"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />

          {/* Editorial Vignette & Gradient Overlays matching Screenshot 3 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent sm:w-4/5 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
      ))}

      {/* 02. EDITORIAL HERO OVERLAY CONTENT (MATCHES SCREENSHOT 3) */}
      <div className="relative z-20 max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-16 flex flex-col justify-center">
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          
          {/* Eyebrow: UNKNOWN CULT™ ─────── */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fade-in">
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/80 uppercase font-semibold">
              {currentSlide.eyebrow}
            </span>
            <span className="w-16 sm:w-24 h-[1px] bg-white/40" />
          </div>

          {/* Monumental Headline: BELONG TO NO ONE. (Fluid typography prevents word splitting) */}
          <h1 className="font-editorial text-[clamp(2.75rem,7vw,7.25rem)] font-bold uppercase tracking-tight text-white leading-[0.9] mb-5 sm:mb-6 drop-shadow-lg">
            {currentSlide.headlineLines.map((line, i) => (
              <span key={i} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>

          {/* Supporting Copy */}
          <div className="space-y-1 mb-8 sm:mb-10 text-xs sm:text-sm font-mono tracking-[0.2em] text-white/80 uppercase font-medium">
            {currentSlide.subheadingLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Call to Action: EXPLORE COLLECTION → */}
          <div className="mb-10 sm:mb-14">
            <Link
              to={currentSlide.primaryCta.link}
              className="inline-flex items-center gap-3.5 px-8 py-3.5 sm:py-4 border border-white/50 bg-black/40 backdrop-blur-sm text-white hover:bg-white hover:text-black hover:border-white font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold transition-all duration-300 group shadow-xl"
            >
              <span>{currentSlide.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* 03. SLIDER CONTROLS AT BOTTOM-LEFT (MATCHES SCREENSHOT 3) */}
          {/* Format: 01 / 03 ──────── ← → */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono text-white/80 tracking-widest select-none">
            {/* Slide Counter */}
            <span className="font-semibold text-white">
              0{currentIdx + 1} <span className="text-white/40">/</span> 0{totalSlides}
            </span>

            {/* Horizontal Slide Indicator Line */}
            <div className="relative w-24 sm:w-36 h-[2px] bg-white/20 overflow-hidden rounded-full">
              <div 
                className="absolute top-0 left-0 bottom-0 bg-white transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 pl-2">
              <button
                type="button"
                onClick={goToPrev}
                className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
