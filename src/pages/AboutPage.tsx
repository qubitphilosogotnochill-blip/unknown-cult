import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, ShieldCheck, Compass, HeartHandshake } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'ABOUT THE ATELIER' }]} className="mb-6" />

        {/* Hero Editorial */}
        <div className="relative h-[45vh] sm:h-[55vh] min-h-[360px] bg-black border border-cult-border overflow-hidden select-none mb-14">
          <img
            src="/images/hero/uc-hero-10-the-new-culture_ede1f1a9.webp"
            alt="About UNKNOWN CULT"
            className="w-full h-full object-cover object-center brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cult-bg via-black/40 to-black/60" />

          <div className="absolute inset-0 max-w-4xl mx-auto px-6 flex flex-col justify-end pb-10 text-center">
            <span className="text-xs font-mono tracking-cult-mega uppercase text-cult-accent font-bold mb-2">
              // THE MANIFESTO
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-none">
              BELONG TO NO ONE.
            </h1>
            <p className="text-xs sm:text-sm text-white/85 font-sans max-w-xl mx-auto mt-3">
              Founded on the belief that fashion should never be an instrument of conformity.
            </p>
          </div>
        </div>

        {/* Manifesto Narrative */}
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="space-y-4">
            <h2 className="font-heading text-3xl sm:text-4xl text-cult-text uppercase">
              THE GENESIS OF UNKNOWN CULT
            </h2>
            <p className="text-sm text-cult-muted font-sans leading-relaxed">
              UNKNOWN CULT emerged from an allergic reaction to ephemeral trends, fragile fabrics, and corporate logos designed to turn individuals into walking billboards. We set out to engineer clothing that stands apart—pieces that possess gravity, structural integrity, and architectural presence.
            </p>
            <p className="text-sm text-cult-muted font-sans leading-relaxed">
              Based between New Delhi and underground design ateliers globally, UNKNOWN CULT merges Japanese street proportions, heavyweight European cottons, and dark utilitarian brutalism.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 bg-cult-surface border border-cult-border space-y-3">
              <Layers className="w-6 h-6 text-cult-accent" />
              <h3 className="font-heading text-xl text-cult-text uppercase">UNCOMPROMISING WEIGHT</h3>
              <p className="text-xs text-cult-muted font-sans leading-relaxed">
                We refuse flimsy 160 GSM single-jersey fabrics. Our baseline begins at 280 GSM for t-shirts and extends to 500 GSM for fleece hoodies.
              </p>
            </div>

            <div className="p-6 bg-cult-surface border border-cult-border space-y-3">
              <ShieldCheck className="w-6 h-6 text-cult-accent" />
              <h3 className="font-heading text-xl text-cult-text uppercase">ARCHITECTURAL DRAPE</h3>
              <p className="text-xs text-cult-muted font-sans leading-relaxed">
                Each silhouette is drafted in three dimensions to hold its shape away from the torso, creating effortless anonymity without slouching.
              </p>
            </div>

            <div className="p-6 bg-cult-surface border border-cult-border space-y-3">
              <Compass className="w-6 h-6 text-cult-accent" />
              <h3 className="font-heading text-xl text-cult-text uppercase">AUTONOMOUS CULTURE</h3>
              <p className="text-xs text-cult-muted font-sans leading-relaxed">
                We produce in strict limited batches. Once a seasonal mineral dye recipe is depleted, the archive is sealed.
              </p>
            </div>
          </div>

          {/* Atelier Craftsmanship Details */}
          <div className="p-8 bg-cult-surface border border-cult-border space-y-4">
            <h3 className="font-heading text-2xl text-cult-text uppercase">
              ETHICAL MANUFACTURING & MILLED INTEGRITY
            </h3>
            <p className="text-xs text-cult-muted font-sans leading-relaxed">
              Every UNKNOWN CULT t-shirt, pant, and outerwear piece is cut, sewn, and stone-washed in certified audited production facilities. We utilize organic GOTS-certified ring-spun cotton and recycle 95% of all water used in our vintage enzyme dye baths.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-cult-accent pt-2">
              <span>✦ 100% PRE-SHRUNK FIBERS</span>
              <span>✦ ANTI-SAG DOUBLE NEEDLE RIBS</span>
              <span>✦ WATERPROOF YKK HARDWARE</span>
            </div>
          </div>

          {/* Editorial Photography Duo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-cult-surface border border-cult-border group">
              <img
                src="/images/about/uc-about-02-studio-bts_7ad1492e.webp"
                alt="UNKNOWN CULT Studio Atelier"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[10px] font-mono text-cult-accent uppercase tracking-widest">
                FIG. A // ATELIER DRAPING & PATTERN LAB
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-cult-surface border border-cult-border group">
              <img
                src="/images/about/uc-about-03-collective_d73e1f33.webp"
                alt="UNKNOWN CULT Collective"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[10px] font-mono text-cult-accent uppercase tracking-widest">
                FIG. B // SUBTERRANEAN COLLECTIVE ARCHIVE
              </div>
            </div>
          </div>

          {/* Join CTA */}
          <div className="text-center py-6">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-cult-accent text-black px-8 py-4 font-heading text-sm tracking-cult-widest uppercase font-bold hover:bg-white transition-colors"
            >
              <span>EXPLORE THE CURRENT ARCHIVE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
