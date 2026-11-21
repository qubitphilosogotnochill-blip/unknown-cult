import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Feather, ShieldCheck, Zap, Compass } from 'lucide-react';

export const BrandPhilosophySection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-cult-bg border-b border-cult-border select-none relative overflow-hidden">
      
      {/* Background Giant Text */}
      <div className="absolute -top-10 left-0 right-0 font-editorial text-[18vw] font-bold text-white/[0.015] pointer-events-none whitespace-nowrap uppercase tracking-tighter text-center">
        BELONG
      </div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Tag */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-cult-border/70 text-[10px] font-mono tracking-cult-mega text-cult-muted uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cult-accent" />
            <span className="text-cult-accent font-bold">SECTION G // BRAND PHILOSOPHY</span>
          </div>
          <div>EST. 2024 // AUTONOMOUS MANIFESTO</div>
        </div>

        {/* Monumental Headline */}
        <div className="mb-14 sm:mb-20 text-center sm:text-left">
          <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-bold uppercase tracking-tight text-cult-text leading-[0.85]">
            BELONG<br />
            <span className="text-cult-accent italic font-light">TO NO</span><br />
            ONE.
          </h2>
        </div>

        {/* Asymmetrical 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: The 4 Core Tenets (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            <p className="font-sans text-base sm:text-lg lg:text-xl text-cult-text leading-relaxed font-light">
              We do not produce apparel to seek consensus or fit inside predefined algorithmic subcultures. UNKNOWN CULT exists solely for the autonomous individual—engineering heavy silhouettes that provide psychological and physical insulation from collective noise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              
              <div className="border-t border-cult-border pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cult-accent font-bold">TENET 01</span>
                  <Layers className="w-4 h-4 text-cult-muted" />
                </div>
                <h3 className="font-editorial text-lg text-cult-text uppercase font-bold tracking-tight">
                  280–500 GSM MASS
                </h3>
                <p className="text-xs text-cult-muted font-sans leading-relaxed">
                  Every gram matters. Custom-milled long-staple ring-spun cotton that drapes with architectural weight and never clings.
                </p>
              </div>

              <div className="border-t border-cult-border pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cult-accent font-bold">TENET 02</span>
                  <Feather className="w-4 h-4 text-cult-muted" />
                </div>
                <h3 className="font-editorial text-lg text-cult-text uppercase font-bold tracking-tight">
                  MINERAL ENZYME WASH
                </h3>
                <p className="text-xs text-cult-muted font-sans leading-relaxed">
                  Hand-distressed edges and volcanic stone wash treatments. Each piece carries an unrepeatable tonal gradient.
                </p>
              </div>

              <div className="border-t border-cult-border pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cult-accent font-bold">TENET 03</span>
                  <Zap className="w-4 h-4 text-cult-muted" />
                </div>
                <h3 className="font-editorial text-lg text-cult-text uppercase font-bold tracking-tight">
                  DROPPED PROPORTION
                </h3>
                <p className="text-xs text-cult-muted font-sans leading-relaxed">
                  Aggressive shoulder drops, elongated sleeves, and boxy torsos designed to establish a dominant physical presence.
                </p>
              </div>

              <div className="border-t border-cult-border pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cult-accent font-bold">TENET 04</span>
                  <ShieldCheck className="w-4 h-4 text-cult-muted" />
                </div>
                <h3 className="font-editorial text-lg text-cult-text uppercase font-bold tracking-tight">
                  LIFETIME REINFORCEMENT
                </h3>
                <p className="text-xs text-cult-muted font-sans leading-relaxed">
                  Twin-needle chain stitching, bar-tacked tension points, and heavy-gauge industrial metal trims built to outlast decades.
                </p>
              </div>

            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="bg-cult-text text-cult-bg hover:bg-cult-accent hover:text-black px-7 py-4 font-heading text-xs tracking-cult-widest uppercase font-bold transition-all duration-300 flex items-center gap-2 group"
              >
                <span>READ COMPLETE MANIFESTO</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/shop"
                className="border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent px-7 py-4 font-heading text-xs tracking-cult-widest uppercase font-bold transition-all duration-300"
              >
                SHOP ALL ARTIFACTS
              </Link>
            </div>

          </div>

          {/* Right Column: Editorial Photograph Pairing (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative group bg-cult-surface border border-cult-border overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden bg-black/40">
                <img
                  src="/images/about/uc-about-02-studio-bts_7ad1492e.webp"
                  alt="Philosophy Editorial Model in distressed oversized streetwear"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90 group-hover:scale-104 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Bottom Stamp Badge */}
              <div className="p-5 sm:p-6 bg-cult-surface border-t border-cult-border space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-cult-accent uppercase tracking-widest font-bold">
                  <span>ATELIER SPECIFICATION</span>
                  <span>NEW DELHI // TOKYO</span>
                </div>
                <p className="font-editorial text-sm sm:text-base text-cult-text uppercase font-bold tracking-tight">
                  "WE ARE NOT IN SEARCH OF APPROVAL. WE ARE IN PURSUIT OF FORM."
                </p>
                <div className="text-[10px] font-mono text-cult-muted flex items-center gap-3 pt-1">
                  <span>LAT: 28.6139° N</span>
                  <span>•</span>
                  <span>LON: 77.2090° E</span>
                  <span>•</span>
                  <span className="text-cult-accent">ARCHIVE NO. 08</span>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accents */}
            <div className="hidden sm:block absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cult-accent pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-cult-accent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};
