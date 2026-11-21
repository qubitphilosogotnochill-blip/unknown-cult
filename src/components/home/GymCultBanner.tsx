import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, ShieldCheck } from 'lucide-react';

export const GymCultBanner: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 bg-black overflow-hidden border-b border-cult-border select-none">
      
      {/* Background Photography with Split Lighting & Grain */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/uc-homepage-02-gym-cult_8051d53b.webp"
          alt="Gym Cult Hero Banner"
          className="w-full h-full object-cover object-center brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-cult-surface/90 backdrop-blur-md px-3 py-1.5 border border-white/20">
            <Dumbbell className="w-4 h-4 text-cult-accent" />
            <span className="text-xs font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
              DISCIPLINE 01 // GYM CULT
            </span>
          </div>

          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9] tracking-wide">
            BUILT<br />DIFFERENT.
          </h2>

          <p className="text-sm sm:text-base text-white/85 font-sans leading-relaxed">
            Performance meets personal identity. 300 GSM dense combed cotton pump covers, medical-grade compression baselayers, and featherlight 4-way stretch shorts engineered for grueling hypertrophy.
          </p>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/80 py-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cult-accent" />
              <span>300 GSM PUMP COVERS</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cult-accent" />
              <span>ZERO SAG COLLARS</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cult-accent" />
              <span>ZONAL COMPRESSION</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cult-accent" />
              <span>ANTI-CHAFING 5" LINERS</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/collections/gym-cult"
              className="bg-cult-accent text-black px-8 py-4 font-heading text-base tracking-cult-widest uppercase font-bold hover:bg-white transition-colors flex items-center gap-2 group"
            >
              <span>SHOP GYM CULT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/product/uc-gym-01"
              className="bg-black/60 backdrop-blur-md border border-white/30 text-white px-8 py-4 font-heading text-base tracking-cult-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              EXPLORE PUMP COVERS
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
};
