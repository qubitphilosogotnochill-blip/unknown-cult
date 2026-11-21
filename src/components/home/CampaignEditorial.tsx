import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CultImage } from '../common/CultImage';

interface EditorialChapter {
  id: string;
  chapter: string;
  season: string;
  headline: string;
  pullQuote: string;
  narrative: string;
  primaryImage: string;
  primaryImageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  detailImage: string;
  detailImageAlt: string;
  ctaText: string;
  ctaLink: string;
  specs: { label: string; value: string }[];
}

const CHAPTERS: EditorialChapter[] = [
  {
    id: 'ch-01',
    chapter: 'CHAPTER 01',
    season: 'AUTUMN / WINTER 2026',
    headline: 'THE ARCHITECTURE OF SILENCE',
    pullQuote: '"NOISE IS CHEAP. SILENCE IS LUXURY."',
    narrative: 'In an era dominated by hyperactive algorithmic fast-fashion, UNKNOWN CULT engineers an intentional void. We construct oversized geometry from heavyweight washed fibers that command presence without raising a voice.',
    primaryImage: '/images/hero/uc-hero-06-underground-identity_60258ec4.webp',
    primaryImageAlt: 'Model in monumental oversized black coat against architectural urban backdrop',
    secondaryImage: '/images/categories/street-cult/uc-street-editorial-03_3ae402ba.webp',
    secondaryImageAlt: 'Streetwear silhouette in distressed graphic tee and cargo trousers',
    detailImage: '/images/categories/baggy-utility/uc-baggy-editorial-03_70aed468.webp',
    detailImageAlt: 'Macro detail of custom 320 GSM ring-spun combed cotton weave',
    ctaText: 'EXPLORE STREET DISCIPLINE',
    ctaLink: '/collections/street-cult',
    specs: [
      { label: 'FABRIC', value: '450 GSM FRENCH FLEECE' },
      { label: 'FINISH', value: 'COLD ENZYME STONE WASH' },
      { label: 'FIT', value: 'DROPPED SHOULDER BOX' }
    ]
  },
  {
    id: 'ch-02',
    chapter: 'CHAPTER 02',
    season: 'TRAINING & DISCIPLINE',
    headline: 'WARM BLOOD & COLD IRON',
    pullQuote: '"THE WEIGHT REVEALS WHO YOU ARE IN THE DARK."',
    narrative: 'Hypertrophy meets high fashion. Gym Cult rejects the synthetic neon shortcuts of commercial gymwear. Engineered with dense 300 GSM pump covers and zoned compression layers tailored for relentless lifters.',
    primaryImage: '/images/hero/uc-homepage-02-gym-cult_8051d53b.webp',
    primaryImageAlt: 'Athletic model wearing high-density gym pump cover hoodie in brutalist gym',
    secondaryImage: '/images/categories/gym-cult/uc-gym-editorial-04_9b16cf9c.webp',
    secondaryImageAlt: 'Athletic drop cut silhouette with draped shoulders',
    detailImage: '/images/categories/gym-cult/uc-gym-editorial-05_06d28684.webp',
    detailImageAlt: 'Chalked grip on heavy knurled steel barbell',
    ctaText: 'SHOP GYM CULT',
    ctaLink: '/collections/gym-cult',
    specs: [
      { label: 'CORE GEAR', value: '300 GSM PUMP COVER' },
      { label: 'CUT', value: 'EXTREME DROP-CUT SHOULDER' },
      { label: 'VENTILATION', value: 'NATURAL BREATHABLE COTTON' }
    ]
  },
  {
    id: 'ch-03',
    chapter: 'CHAPTER 03',
    season: 'SHELTER & MONOLITH',
    headline: 'FORTRESS FLEECE HOODS',
    pullQuote: '"ARMOR FOR THE INDEPENDENT OBSERVER."',
    narrative: 'Over one kilogram of milled French cotton fleece per garment. Double-faced hoods that never sag or lose their structural crown. Zero polyester blend—pure, unadulterated thermal insulation for the nocturnal commute.',
    primaryImage: '/images/hero/uc-hero-07-beyond-the-ordinary_840a39e4.webp',
    primaryImageAlt: 'Heavyweight black hoodie with architectural double-layer hood',
    secondaryImage: '/images/categories/hood-cult/uc-hood-editorial-03_49db1f77.webp',
    secondaryImageAlt: 'Fashion model in coordinating heavyweight fleece set',
    detailImage: '/images/categories/hood-cult/uc-hood-editorial-04_1a05ecf3.webp',
    detailImageAlt: 'Metallic engraved UC hardware zipper pull',
    ctaText: 'DISCOVER HOOD CULT',
    ctaLink: '/collections/hood-cult',
    specs: [
      { label: 'WEIGHT', value: '500 GSM HEAVY FLEECE' },
      { label: 'SEAMS', value: 'FLATLOCK REINFORCED' },
      { label: 'POCKETS', value: 'CONCEALED WELT KANGAROO' }
    ]
  }
];

export const CampaignEditorial: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const chapter = CHAPTERS[currentIdx];

  const prevChapter = () => {
    setCurrentIdx(i => (i - 1 + CHAPTERS.length) % CHAPTERS.length);
  };

  const nextChapter = () => {
    setCurrentIdx(i => (i + 1) % CHAPTERS.length);
  };

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-cult-bg border-b border-cult-border select-none relative overflow-hidden">
      
      {/* Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-editorial text-[14vw] font-bold text-white/[0.015] pointer-events-none whitespace-nowrap uppercase tracking-tighter">
        EDITORIAL
      </div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Top Editorial Index Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-12 border-b border-cult-border/70 gap-4 text-[10px] font-mono tracking-cult-mega text-cult-muted uppercase">
          <div className="flex items-center gap-3">
            <span className="text-cult-accent font-bold">SECTION D // CAMPAIGN EDITORIAL</span>
            <span className="text-cult-border">|</span>
            <span>MAGAZINE ISSUE NO. 08</span>
          </div>

          <div className="flex items-center gap-2">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`px-3 py-1 border transition-all ${
                  idx === currentIdx
                    ? 'border-cult-accent bg-cult-accent text-black font-bold'
                    : 'border-cult-border text-cult-muted hover:border-cult-muted/50 hover:text-cult-text'
                }`}
              >
                0{idx + 1} // {ch.chapter}
              </button>
            ))}
          </div>
        </div>

        {/* Full-Width Fashion Magazine Spread: Overlapping Photographs + Clean Unclipped Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================== */}
          {/* LEFT: Overlapping Photographs Composition (6 cols)         */}
          {/* ========================================================== */}
          <div className="lg:col-span-6 relative min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
            
            {/* 1. Primary Dominant Background Photo */}
            <div className="w-[85%] sm:w-[80%] h-[380px] sm:h-[480px] lg:h-[560px] bg-cult-surface border border-cult-border overflow-hidden relative group">
              <CultImage
                key={`primary-${chapter.id}`}
                src={chapter.primaryImage}
                alt={chapter.primaryImageAlt}
                className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90 group-hover:scale-104 transition-all duration-700 ease-out"
                containerClassName="w-full h-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 text-[9px] font-mono text-cult-accent uppercase tracking-widest z-20">
                LOOK 01 // OVERSIZED MONOLITH
              </div>
            </div>

            {/* 2. Secondary Overlapping Vertical Portrait Photo (Contained strictly within column) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[44%] sm:w-[40%] h-[280px] sm:h-[380px] lg:h-[440px] bg-cult-card border-2 border-cult-border shadow-2xl overflow-hidden z-20 group">
              <CultImage
                key={`sec-${chapter.id}`}
                src={chapter.secondaryImage}
                alt={chapter.secondaryImageAlt}
                className="w-full h-full object-cover object-center filter grayscale contrast-115 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                containerClassName="w-full h-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 text-[9px] font-mono text-cult-text/90 bg-black/75 px-2 py-1 border border-white/10 z-20">
                LOOK 02 // TAILORED DRAPE
              </div>
            </div>

            {/* 3. Tertiary Overlapping Detail Texture Photo (Bottom Left Offset) */}
            <div className="hidden sm:block absolute -bottom-4 left-8 w-[32%] h-[140px] sm:h-[180px] bg-cult-surface border-2 border-cult-border shadow-2xl overflow-hidden z-30 group">
              <CultImage
                key={`det-${chapter.id}`}
                src={chapter.detailImage}
                alt={chapter.detailImageAlt}
                className="w-full h-full object-cover object-center filter grayscale contrast-130 brightness-85 group-hover:scale-108 transition-all duration-500 ease-out"
                containerClassName="w-full h-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 bg-black/90 p-1.5 text-[8px] font-mono text-cult-accent uppercase tracking-widest border border-white/10 z-20">
                MACRO DETAIL // RING-SPUN
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="hidden lg:block absolute -top-4 -left-4 w-12 h-12 border-t border-l border-cult-accent/40 pointer-events-none" />

          </div>

          {/* ========================================================== */}
          {/* RIGHT: Oversized Typography & Magazine Narrative (6 cols)  */}
          {/* ========================================================== */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 pl-0 lg:pl-4 relative z-10">
            
            {/* Tagline / Subtitle */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
                {chapter.season} // {chapter.chapter}
              </span>
              <div className="w-12 h-[1px] bg-cult-accent mt-2" />
            </div>

            {/* Oversized Headline with Responsive Scaling (Guaranteed Never to Clip) */}
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold uppercase tracking-tight text-cult-text leading-[0.92] break-normal">
              {chapter.headline}
            </h2>

            {/* Pull Quote */}
            <blockquote className="font-editorial text-lg sm:text-xl text-cult-accent tracking-wide uppercase italic border-l-2 border-cult-accent pl-4 py-1 leading-snug">
              {chapter.pullQuote}
            </blockquote>

            {/* Narrative Body */}
            <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed max-w-xl">
              {chapter.narrative}
            </p>

            {/* Atelier Specification Tags */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-cult-border/70 text-[10px] font-mono">
              {chapter.specs.map((spec, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-cult-muted uppercase block">{spec.label}</span>
                  <span className="text-cult-text font-bold uppercase block">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Actions: CTA & Next/Prev Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Link
                to={chapter.ctaLink}
                className="bg-cult-text text-cult-bg hover:bg-cult-accent hover:text-black px-7 py-3.5 sm:py-4 font-heading text-xs tracking-cult-widest uppercase font-bold transition-all duration-300 flex items-center gap-2 group shadow-md"
              >
                <span>{chapter.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevChapter}
                  className="w-10 h-10 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous editorial chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextChapter}
                  className="w-10 h-10 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next editorial chapter"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
