import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../../data/collections';

export const ShopByCulture: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-cult-bg border-b border-cult-border select-none">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header matching Screenshot 3 */}
        <div className="flex items-center justify-between pb-6 mb-6 sm:mb-8 border-b border-cult-border/60">
          <h2 className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-cult-muted font-bold">
            B R O W S E &nbsp; B Y &nbsp; C A T E G O R Y
          </h2>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cult-muted hover:text-white uppercase transition-colors group"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 9-Card Horizontal Grid matching Screenshot 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-cult-surface border border-cult-border hover:border-white/40 transition-all duration-300 flex flex-col justify-end"
            >
              {/* Category Image */}
              <img
                src={col.bannerImage}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ease-out"
                loading="lazy"
                onError={(e) => {
                  // Fallback safely to solid backdrop if needed
                  (e.target as HTMLElement).style.opacity = '0.4';
                }}
              />

              {/* Gradient Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

              {/* Bottom Card Title & Arrow matching Screenshot 3 */}
              <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-1">
                <span className="font-editorial text-xs sm:text-sm font-bold uppercase tracking-wider text-white group-hover:text-cult-accent transition-colors truncate">
                  {col.name}
                </span>
                <span className="text-xs text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
