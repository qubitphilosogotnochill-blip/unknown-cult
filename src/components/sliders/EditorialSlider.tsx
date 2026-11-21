import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface CampaignSlide {
  id: string;
  season: string;
  headline: string;
  body: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  quote: string;
}

const CAMPAIGNS: CampaignSlide[] = [
  {
    id: 'camp-01',
    season: 'EDITORIAL // CHAPTER 01',
    headline: 'THE ARCHITECTURE OF SILENCE',
    body: 'In an era consumed by neon noise and algorithm-dictated fast fashion, UNKNOWN CULT crafts an intentional void. Oversized geometry constructed with heavyweight washed fibers that command presence without speaking.',
    image: '/images/hero/uc-hero-06-underground-identity_60258ec4.webp',
    ctaText: 'SHOP THE EDITORIAL',
    ctaLink: '/collections/street-cult',
    quote: '"Noise is cheap. Silence is luxury."'
  },
  {
    id: 'camp-02',
    season: 'EDITORIAL // CHAPTER 02',
    headline: 'WARM BLOOD & COLD IRON',
    body: 'Hypertrophy meets high fashion. Our Gym Cult line rejects generic sportswear shortcuts. Built with 300 GSM combed cotton pump covers and zoned compression layers engineered for those whose discipline is sacred.',
    image: '/images/hero/uc-homepage-02-gym-cult_8051d53b.webp',
    ctaText: 'EXPLORE GYM CULT',
    ctaLink: '/collections/gym-cult',
    quote: '"The weight reveals who you are in the dark."'
  },
  {
    id: 'camp-03',
    season: 'EDITORIAL // CHAPTER 03',
    headline: 'HEAVYWEIGHT SHELTER',
    body: 'The 500 GSM Fortress Pullover. Over one kilogram of milled French cotton fleece engineered to insulate the wearer from external cold and psychological noise. Double-faced hoods that never sag.',
    image: '/images/categories/hood-cult/uc-hood-editorial-03_49db1f77.webp',
    ctaText: 'DISCOVER HOOD CULT',
    ctaLink: '/collections/hood-cult',
    quote: '"Armor for the solitary observer."'
  }
];

export const EditorialSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + CAMPAIGNS.length) % CAMPAIGNS.length);
  const next = () => setCurrent(c => (c + 1) % CAMPAIGNS.length);

  const slide = CAMPAIGNS[current];

  return (
    <section className="py-14 sm:py-20 bg-cult-bg border-b border-cult-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Slide Card Container */}
        <div className="relative bg-cult-surface border border-cult-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] sm:min-h-[560px]">
            
            {/* Left: Campaign Imagery */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[440px] lg:h-full overflow-hidden bg-cult-card">
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.headline}
                className="w-full h-full object-cover object-center animate-fade-in transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono tracking-cult-mega uppercase bg-black/80 text-cult-accent px-3 py-1 border border-white/10">
                  {slide.season}
                </span>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-cult-surface relative z-10">
              
              <div className="space-y-6">
                <div className="hidden lg:block text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
                  {slide.season}
                </div>

                <h3 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-cult-text leading-[0.95] uppercase">
                  {slide.headline}
                </h3>

                <blockquote className="text-sm font-mono italic text-cult-accent border-l-2 border-cult-accent pl-3 py-0.5">
                  {slide.quote}
                </blockquote>

                <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
                  {slide.body}
                </p>
              </div>

              {/* Action & Slide Controls */}
              <div className="pt-8 border-t border-cult-border flex items-center justify-between gap-4 mt-6">
                <Link
                  to={slide.ctaLink}
                  className="bg-cult-accent text-black px-6 py-3 text-xs font-heading tracking-cult-widest uppercase font-bold hover:bg-white transition-colors flex items-center gap-2 group"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Arrows */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-cult-muted mr-2">
                    0{current + 1} / 0{CAMPAIGNS.length}
                  </span>
                  <button
                    onClick={prev}
                    className="w-9 h-9 bg-cult-card border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-accent hover:border-cult-accent transition-colors"
                    aria-label="Previous editorial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 bg-cult-card border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-accent hover:border-cult-accent transition-colors"
                    aria-label="Next editorial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
