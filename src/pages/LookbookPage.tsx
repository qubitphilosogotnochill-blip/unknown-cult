import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles, MapPin, Eye, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { LOOKBOOK_LOOKS, LookbookLook } from '../data/lookbook';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CultImage } from '../components/common/CultImage';

export const LookbookPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLookId, setSelectedLookId] = useState<string | null>(null);

  // Filter looks if category is chosen
  const filteredLooks = useMemo(() => {
    if (activeCategory === 'all') return LOOKBOOK_LOOKS;
    if (activeCategory === 'gym') return LOOKBOOK_LOOKS.filter(l => l.taggedProductIds.some(id => id.startsWith('uc-gym')));
    if (activeCategory === 'street') return LOOKBOOK_LOOKS.filter(l => l.taggedProductIds.some(id => id.startsWith('uc-street')));
    if (activeCategory === 'outer') return LOOKBOOK_LOOKS.filter(l => l.taggedProductIds.some(id => id.startsWith('uc-outer') || id.startsWith('uc-baggy')));
    if (activeCategory === 'tailoring') return LOOKBOOK_LOOKS.filter(l => l.taggedProductIds.some(id => id.startsWith('uc-shirt') || id.startsWith('uc-daily')));
    return LOOKBOOK_LOOKS;
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12 select-none">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <Breadcrumbs items={[{ label: 'SEASON 08 ARCHIVE LOOKBOOK' }]} className="mb-6" />

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> // SEASON 08 MONOLITHIC CAMPAIGN
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-cult-text uppercase leading-none tracking-tight">
            THE ARCHIVE LOOKBOOK
          </h1>
          <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed max-w-2xl mx-auto">
            12 authentic silhouettes styled across Tokyo, Berlin, London, Seoul, and Mumbai. Every uniform represents genuine garment construction from 280–500 GSM milled cotton.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'ALL 12 LOOKS' },
              { id: 'street', label: 'STREET CULT' },
              { id: 'gym', label: 'GYM CULT' },
              { id: 'outer', label: 'OUTER & UTILITY' },
              { id: 'tailoring', label: 'SHIRT & ESSENTIALS' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-1.5 text-xs font-mono tracking-widest uppercase transition-all border cursor-pointer ${
                  activeCategory === tab.id
                    ? 'border-cult-accent bg-cult-accent text-black font-bold shadow-md'
                    : 'border-cult-border text-cult-muted hover:border-cult-muted hover:text-cult-text'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Looks Editorial Stream */}
        <div className="space-y-16 sm:space-y-24">
          {filteredLooks.map((look, idx) => {
            // Resolve products with guaranteed data fidelity
            const taggedProducts = look.taggedProductIds
              .map(id => PRODUCTS.find(p => p.id === id))
              .filter((p): p is typeof PRODUCTS[0] => !!p);

            const isEven = idx % 2 === 1;

            return (
              <article 
                key={look.id}
                id={look.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-cult-surface border border-cult-border p-4 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500 hover:border-cult-border/90 animate-editorial-fade"
              >
                {/* Visual Side (7 cols) */}
                <div className={`lg:col-span-7 relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-cult-card border border-cult-border group ${
                  isEven ? 'lg:order-2' : ''
                }`}>
                  <CultImage
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-103 group-hover:brightness-100 transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                  {/* Look Number Tag */}
                  <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-cult-accent font-mono text-xs uppercase tracking-widest z-20">
                    LOOK {look.number} // {look.season}
                  </div>

                  {/* Location & Model Bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md p-3 border border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1.5 z-20">
                    <span className="flex items-center gap-1.5 truncate text-white/90">
                      <MapPin className="w-3.5 h-3.5 text-cult-accent shrink-0" />
                      {look.location}
                    </span>
                    <span className="text-cult-accent font-semibold">{look.model}</span>
                  </div>
                </div>

                {/* Narrative & Tagged Items (5 cols) */}
                <div className={`lg:col-span-5 space-y-6 sm:space-y-8 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
                        // UNIFORM BREAKDOWN
                      </span>
                      <span className="text-[10px] font-mono text-cult-muted">
                        LOOK {look.number} OF {LOOKBOOK_LOOKS.length}
                      </span>
                    </div>

                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cult-text uppercase leading-none tracking-tight">
                      {look.title}
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
                      {look.description}
                    </p>
                  </div>

                  {/* Shoppable Cards (Synchronized with photo) */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-cult-accent font-bold uppercase flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" /> SHOP SILHOUETTES IN THIS LOOK:
                    </span>

                    {taggedProducts.map((p, pIdx) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        className="flex items-center gap-3.5 p-3 sm:p-3.5 bg-cult-bg border border-cult-border hover:border-cult-accent transition-all group shadow-sm hover:shadow-md animate-editorial-fade"
                        style={{ animationDelay: `${pIdx * 80}ms` }}
                      >
                        {/* Garment Thumbnail */}
                        <div className="w-14 h-16 shrink-0 bg-cult-surface border border-cult-border overflow-hidden">
                          <CultImage
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            containerClassName="w-full h-full"
                          />
                        </div>

                        {/* Garment Details */}
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <span className="text-[9px] font-mono text-cult-muted uppercase tracking-wider block">
                            {p.category}
                          </span>
                          <h3 className="font-heading text-xs sm:text-sm text-cult-text group-hover:text-cult-accent transition-colors truncate">
                            {p.name}
                          </h3>
                          <span className="text-xs font-mono font-bold text-cult-accent block">
                            ₹{p.price ? p.price.toLocaleString('en-IN') : '2,499'}
                          </span>
                        </div>

                        {/* Action Arrow */}
                        <div className="pr-1 text-cult-muted group-hover:text-cult-accent group-hover:translate-x-1.5 transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Look Specifications Badge */}
                  <div className="pt-2 border-t border-cult-border/70 flex items-center justify-between text-[10px] font-mono text-cult-muted">
                    <span>STATUS: ALL SIZES AVAILABLE</span>
                    <span className="text-cult-accent font-bold">COMPLIMENTARY SHIPPING</span>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </div>
  );
};
