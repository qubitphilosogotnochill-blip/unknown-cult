import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

interface TrendingNowSectionProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
}

export const TrendingNowSection: React.FC<TrendingNowSectionProps> = ({ products, onQuickView }) => {
  const trendingList = products.slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-cult-surface border-y border-cult-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cult-border gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-red font-bold flex items-center gap-1.5 mb-1">
              <Flame className="w-3.5 h-3.5 text-cult-red" />
              // HIGH HEAT VELOCITY
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cult-text leading-none uppercase">
              TRENDING NOW ACROSS THE CULT
            </h2>
            <p className="text-xs sm:text-sm text-cult-muted font-sans mt-1">
              The fastest-selling silhouettes, limited quantities remaining in current dye runs.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-heading tracking-widest text-cult-accent hover:text-cult-text uppercase"
          >
            <span>VIEW ALL TRENDING</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingList.map(prod => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onQuickView={onQuickView} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};
