import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  products: Product[];
  viewAllLink?: string;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  subtitle,
  tag,
  products,
  viewAllLink,
  onQuickView,
  className = ''
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className={`py-16 sm:py-24 bg-cult-bg border-b border-cult-border select-none ${className}`}>
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-cult-border/70 gap-6">
          <div className="space-y-2">
            {tag && (
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
                <Sparkles className="w-3 h-3" />
                <span>// {tag}</span>
              </div>
            )}
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-cult-text uppercase tracking-tight leading-[0.95]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-cult-muted font-sans mt-1 max-w-xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Controls & View All Link */}
          <div className="flex items-center gap-4">
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cult-accent hover:text-white transition-colors mr-2 uppercase font-semibold"
              >
                <span>VIEW ARCHIVE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-11 h-11 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent transition-all flex items-center justify-center group"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-11 h-11 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent transition-all flex items-center justify-center group"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Viewport */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto no-scrollbar scroll-smooth py-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className="shrink-0 w-[80%] sm:w-[46%] md:w-[35%] lg:w-[23.5%]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProductCard 
                product={product} 
                onQuickView={onQuickView} 
              />
            </div>
          ))}
        </div>

        {/* Mobile View All Footer */}
        {viewAllLink && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              to={viewAllLink}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cult-accent hover:text-cult-text uppercase font-bold"
            >
              <span>EXPLORE ENTIRE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
