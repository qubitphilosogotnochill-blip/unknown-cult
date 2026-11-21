import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, Flame } from 'lucide-react';

export const BrandIntroduction: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-cult-bg border-b border-cult-border overflow-hidden select-none">
      
      {/* Editorial Running Header Strip */}
      <div className="w-full border-b border-cult-border/60 pb-4 mb-10 sm:mb-14 px-4 sm:px-8 flex items-center justify-between text-[10px] font-mono tracking-cult-mega uppercase text-cult-muted">
        <div className="flex items-center gap-3">
          <span className="text-cult-accent font-bold">SECTION A // INTRO</span>
          <span className="text-cult-border">|</span>
          <span>EST. 2024 // NEW DELHI — TOKYO</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">AUTONOMOUS ATELIER</span>
          <span className="text-cult-border">|</span>
          <span className="text-cult-text font-bold">EDITION 08</span>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Asymmetrical Grid: Huge Statement + Oversized Editorial Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Monumental Typography (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold bg-cult-surface px-3 py-1.5 border border-cult-border">
              <Compass className="w-3.5 h-3.5" />
              <span>THE SOVEREIGN DECLARATION</span>
            </div>

            {/* Large Statement */}
            <h2 className="font-editorial text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-tight text-cult-text leading-[0.88]">
              WE DON'T<br />
              FOLLOW.<br />
              <span className="text-cult-accent italic font-light">WE EXIST.</span>
            </h2>

            {/* Manifesto Paragraph */}
            <p className="max-w-xl text-sm sm:text-base font-sans text-cult-muted leading-relaxed">
              We reject the endless churn of disposable trends. UNKNOWN CULT was formed in the shadows of fast fashion to craft monumental, heavyweight garments that serve as an impenetrable armor for the solitary observer.
            </p>

            {/* Brutalist Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-cult-border/60">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-cult-muted uppercase block">
                  FABRIC INTEGRITY
                </span>
                <span className="text-xs sm:text-sm font-mono text-cult-text font-bold uppercase block">
                  280–500 GSM
                </span>
                <span className="text-[10px] text-cult-muted font-sans block">
                  Heavy French Terry & Jersey
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-cult-muted uppercase block">
                  SILHOUETTES
                </span>
                <span className="text-xs sm:text-sm font-mono text-cult-text font-bold uppercase block">
                  ASYMMETRIC / WIDE
                </span>
                <span className="text-[10px] text-cult-muted font-sans block">
                  Architectural drop drapes
                </span>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono tracking-widest text-cult-muted uppercase block">
                  DYE METHODS
                </span>
                <span className="text-xs sm:text-sm font-mono text-cult-text font-bold uppercase block">
                  MINERAL ENZYME
                </span>
                <span className="text-[10px] text-cult-muted font-sans block">
                  Small-batch artisan washes
                </span>
              </div>
            </div>

            {/* Link to Manifesto */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent px-6 py-3.5 font-heading text-xs tracking-cult-widest uppercase font-bold transition-all duration-300 group"
              >
                <span>READ THE MANIFESTO</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Right Column: Oversized Editorial Photograph (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative group aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-cult-surface border border-cult-border">
              
              {/* Oversized Editorial Photo */}
              <img
                src="/images/about/uc-about-01-philosophy_138f8c3b.webp"
                alt="Model wearing oversized neutral minimalist streetwear"
                className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Editorial Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* Stamp Top Corner */}
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3 py-1 border border-white/10 font-mono text-[10px] text-cult-accent uppercase tracking-widest">
                FIG. 00 // CORE ESSENTIAL
              </div>

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 bg-cult-card/90 backdrop-blur-md border border-cult-border space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-cult-muted uppercase">
                  <span>ATELIER SPECIFICATION</span>
                  <span className="text-cult-accent font-bold">100% COMBED COTTON</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl text-cult-text uppercase tracking-wide">
                  OVERSIZED DROPPED PROPORTION
                </h3>
                <p className="text-[11px] text-cult-muted font-sans leading-normal">
                  Cut wide across the chest with a lowered armhole to preserve freedom of movement while establishing a dominant silhouette.
                </p>
              </div>

            </div>

            {/* Brutalist Frame Accent Marks */}
            <div className="hidden sm:block absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cult-accent pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-cult-accent pointer-events-none" />

          </div>

        </div>

      </div>

    </section>
  );
};
