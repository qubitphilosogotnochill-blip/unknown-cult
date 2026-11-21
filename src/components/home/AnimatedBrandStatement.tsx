import React from 'react';

export const AnimatedBrandStatement: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 bg-cult-surface border-y border-cult-border overflow-hidden select-none">
      
      {/* Infinite Marquee Ticker Top */}
      <div className="flex overflow-hidden whitespace-nowrap mb-6 border-b border-cult-border/40 pb-4">
        <div className="flex animate-marquee text-xs font-mono tracking-cult-mega uppercase text-cult-muted/70">
          <span className="mx-6">★ UNKNOWN CULT</span>
          <span className="mx-6 text-cult-accent">BELONG TO NO ONE</span>
          <span className="mx-6">★ EST. 2024</span>
          <span className="mx-6">★ 280–500 GSM HEAVYWEIGHT COTTON</span>
          <span className="mx-6 text-cult-accent">UNDERGROUND ARCHIVE</span>
          <span className="mx-6">★ SILENCE OVER NOISE</span>
          <span className="mx-6">★ OVERSIZED DRAPES</span>
          <span className="mx-6 text-cult-accent">BELONG TO NO ONE</span>
        </div>
        <div className="flex animate-marquee text-xs font-mono tracking-cult-mega uppercase text-cult-muted/70" aria-hidden="true">
          <span className="mx-6">★ UNKNOWN CULT</span>
          <span className="mx-6 text-cult-accent">BELONG TO NO ONE</span>
          <span className="mx-6">★ EST. 2024</span>
          <span className="mx-6">★ 280–500 GSM HEAVYWEIGHT COTTON</span>
          <span className="mx-6 text-cult-accent">UNDERGROUND ARCHIVE</span>
          <span className="mx-6">★ SILENCE OVER NOISE</span>
          <span className="mx-6">★ OVERSIZED DRAPES</span>
          <span className="mx-6 text-cult-accent">BELONG TO NO ONE</span>
        </div>
      </div>

      {/* Main Monumental Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-block text-[11px] font-mono tracking-cult-mega uppercase text-cult-accent mb-2">
          // OUR SOVEREIGN DECLARATION
        </div>

        <h2 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-cult-text uppercase tracking-cult-wide leading-none transition-colors duration-300">
          BELONG TO NO ONE.
        </h2>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-cult-muted font-sans mt-4 leading-relaxed">
          We do not create clothing for the masses, nor do we chase trends engineered to expire. UNKNOWN CULT exists for the autonomous few—crafting heavyweight silhouettes that reject categorization.
        </p>

        <div className="flex items-center justify-center gap-6 mt-6 text-[10px] font-mono text-cult-muted tracking-widest uppercase">
          <span>LAT: 12.9716° N</span>
          <span>•</span>
          <span className="text-cult-accent">ARCHIVE NO. 08</span>
          <span>•</span>
          <span>LON: 77.5946° E</span>
        </div>
      </div>

    </section>
  );
};
