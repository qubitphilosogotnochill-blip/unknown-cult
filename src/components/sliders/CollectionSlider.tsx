import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../../data/collections';

export const CollectionSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-cult-surface border-y border-cult-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cult-border gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-1">
              // DISCOVERY
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cult-text leading-none uppercase">
              TRENDING CULT DISCIPLINES
            </h2>
            <p className="text-xs sm:text-sm text-cult-muted font-sans mt-1">
              Nine distinctive manifestations of underground silhouettes and technical craftsmanship.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 bg-cult-card border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-accent hover:border-cult-accent transition-colors"
              aria-label="Previous collection"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 bg-cult-card border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-accent hover:border-cult-accent transition-colors"
              aria-label="Next collection"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collections Track */}
        <div
          ref={scrollRef}
          className="flex space-x-5 overflow-x-auto no-scrollbar scroll-smooth py-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {COLLECTIONS.map(col => (
            <div
              key={col.id}
              className="shrink-0 w-[82%] sm:w-[45%] lg:w-[31.5%]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Link
                to={`/collections/${col.slug}`}
                className="group block relative h-[420px] sm:h-[460px] overflow-hidden bg-cult-card border border-cult-border hover:border-cult-accent transition-all duration-500"
              >
                {/* Image */}
                <img
                  src={col.bannerImage}
                  alt={col.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-80 group-hover:brightness-95"
                  loading="lazy"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest bg-black/80 backdrop-blur-md px-2.5 py-1 text-cult-accent uppercase border border-white/10">
                    DISCIPLINE {col.id.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-white/70">
                    {col.productCount} SILHOUETTES
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                  <h3 className="font-heading text-2xl sm:text-3xl text-white group-hover:text-cult-accent transition-colors uppercase leading-tight mb-2">
                    {col.name}
                  </h3>
                  <p className="text-xs text-white/80 font-sans line-clamp-2 mb-4 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-heading tracking-widest text-cult-accent group-hover:text-white uppercase font-bold transition-colors">
                    <span>EXPLORE DISCIPLINE</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
