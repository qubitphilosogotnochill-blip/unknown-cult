import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { LOOKBOOK_LOOKS, LookbookHotspot } from '../../data/lookbook';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import { CultImage } from '../common/CultImage';

export const LookbookSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<LookbookHotspot | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { addToCart, setIsCartOpen } = useCart();
  const currentLook = LOOKBOOK_LOOKS[currentIdx];

  // Atomic look switch to guarantee 100% data synchronization
  const setLookIndex = useCallback((newIdx: number) => {
    setIsTransitioning(true);
    setActiveHotspot(null);
    setCurrentIdx(newIdx);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  }, []);

  const goToNext = () => {
    setLookIndex((currentIdx + 1) % LOOKBOOK_LOOKS.length);
  };

  const goToPrev = () => {
    setLookIndex((currentIdx - 1 + LOOKBOOK_LOOKS.length) % LOOKBOOK_LOOKS.length);
  };

  // Resolve active product from hotspot
  const activeProduct = activeHotspot 
    ? PRODUCTS.find(p => p.id === activeHotspot.productId) 
    : null;

  // Resolve all tagged products for the outfit cards
  const taggedProducts = currentLook.taggedProductIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'M', product.colors[0], 1);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
      setIsCartOpen(true);
    }, 800);
  };

  return (
    <section className="py-20 sm:py-28 bg-cult-surface border-b border-cult-border select-none relative">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header matching Screenshot 3 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-cult-border/60 gap-4">
          <div>
            <h2 className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-cult-muted font-bold mb-2">
              T H E &nbsp; L O O K B O O K
            </h2>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-cult-text leading-none">
              SEASON 08 // ARCHIVE
            </h3>
          </div>

          {/* Navigation Controls: Look Selector & Arrows */}
          <div className="flex items-center gap-3">
            {/* Scrollable Tabs for Looks */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[60vw] sm:max-w-none py-1">
              {LOOKBOOK_LOOKS.map((look, idx) => (
                <button
                  key={look.id}
                  type="button"
                  onClick={() => setLookIndex(idx)}
                  className={`px-3 py-1.5 border transition-all text-xs font-mono tracking-widest uppercase cursor-pointer shrink-0 ${
                    idx === currentIdx
                      ? 'border-cult-text bg-cult-text text-cult-bg font-bold shadow-md'
                      : 'border-cult-border text-cult-muted hover:border-cult-muted hover:text-cult-text'
                  }`}
                  aria-label={`Select Look ${look.number}`}
                >
                  LOOK {look.number}
                </button>
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-cult-border">
              <button
                type="button"
                onClick={goToPrev}
                className="w-8 h-8 border border-cult-border hover:border-cult-text flex items-center justify-center text-cult-text transition-colors cursor-pointer"
                aria-label="Previous Look"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="w-8 h-8 border border-cult-border hover:border-cult-text flex items-center justify-center text-cult-text transition-colors cursor-pointer"
                aria-label="Next Look"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lookbook Stage: Interactive Photo with Hotspots + Outfit Breakdown */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start transition-opacity duration-300 ${
          isTransitioning ? 'opacity-40' : 'opacity-100'
        }`}>
          
          {/* Main Lookbook Photography with Interactive Hotspots (7 cols) */}
          <div className="lg:col-span-7 relative bg-cult-card border border-cult-border overflow-hidden">
            
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden">
              <CultImage
                key={currentLook.image}
                src={currentLook.image}
                alt={currentLook.title}
                className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95 hover:brightness-100 transition-all duration-700 ease-out"
                containerClassName="w-full h-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

              {/* Look Info Overlays */}
              <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[10px] font-mono text-cult-accent uppercase tracking-widest z-20">
                LOOK {currentLook.number} // {currentLook.title}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-cult-muted bg-black/90 backdrop-blur-md p-2.5 border border-white/10 z-20">
                <span className="flex items-center gap-1.5 truncate text-white/90">
                  <MapPin className="w-3.5 h-3.5 text-cult-accent shrink-0" />
                  {currentLook.location}
                </span>
                <span className="hidden sm:inline text-cult-accent font-semibold">{currentLook.model}</span>
              </div>

              {/* Hotspot Pins */}
              {currentLook.hotspots.map((hs, i) => {
                const isSelected = activeHotspot?.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    type="button"
                    onClick={() => setActiveHotspot(isSelected ? null : hs)}
                    className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none cursor-pointer"
                    style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                    aria-label={`Inspect ${hs.garmentLabel}`}
                  >
                    {/* Pulsing Target Ring */}
                    <span className="absolute inset-0 rounded-full bg-cult-accent/40 animate-radar-ping" />
                    
                    {/* Solid Dot */}
                    <span className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono text-[9px] font-bold transition-all duration-300 ${
                      isSelected
                        ? 'bg-cult-accent border-white text-black scale-125 shadow-lg shadow-cult-accent/50'
                        : 'bg-black/90 border-cult-accent text-cult-accent group-hover:scale-115'
                    }`}>
                      0{i + 1}
                    </span>

                    {/* Hover tooltip label */}
                    <span className="hidden sm:block absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/90 text-white text-[9px] font-mono tracking-widest px-2.5 py-1 border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30">
                      {hs.garmentLabel}
                    </span>
                  </button>
                );
              })}

              {/* Floating Hotspot Popover Card if active */}
              {activeProduct && activeHotspot && (
                <div className="absolute bottom-16 sm:bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-cult-surface/95 backdrop-blur-md border border-cult-accent p-4 z-30 shadow-2xl animate-editorial-fade">
                  <div className="flex items-start justify-between pb-2 mb-2 border-b border-cult-border">
                    <span className="text-[9px] font-mono tracking-widest text-cult-accent uppercase font-bold">
                      TAGGED SILHOUETTE
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="text-cult-muted hover:text-cult-text cursor-pointer p-0.5"
                      aria-label="Close popover"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-20 bg-cult-card border border-cult-border overflow-hidden shrink-0">
                      <CultImage
                        src={activeProduct.images[0]}
                        alt={activeProduct.name}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-xs uppercase text-cult-text truncate">
                        {activeProduct.name}
                      </h4>
                      <p className="text-[10px] font-mono text-cult-muted uppercase">
                        {activeProduct.category}
                      </p>
                      <div className="text-xs font-mono font-bold text-cult-accent mt-1">
                        ₹{activeProduct.price ? activeProduct.price.toLocaleString('en-IN') : '2,499'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-cult-border">
                    <Link
                      to={`/product/${activeProduct.id}`}
                      className="text-center py-2 border border-cult-border hover:border-cult-text text-cult-text text-[10px] font-mono tracking-widest uppercase transition-colors"
                    >
                      DETAILS
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(activeProduct, e)}
                      className="py-2 bg-cult-text text-cult-bg hover:bg-cult-accent hover:text-black text-[10px] font-mono tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {addedId === activeProduct.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3" />
                          <span>ACQUIRE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Shoppable Uniform Breakdown Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
                  // UNIFORM BREAKDOWN
                </span>
                <span className="text-[10px] font-mono text-cult-muted">
                  LOOK {currentLook.number} OF {LOOKBOOK_LOOKS.length}
                </span>
              </div>
              <h4 className="font-editorial text-2xl sm:text-3xl uppercase font-bold text-cult-text leading-tight">
                {currentLook.title}
              </h4>
              <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
                {currentLook.description}
              </p>
            </div>

            {/* Shoppable Products List for this look */}
            <div className="space-y-3">
              {taggedProducts.map((product, pIdx) => {
                const isSelected = activeHotspot?.productId === product.id;
                const isItemAdded = addedId === product.id;

                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      const matchHs = currentLook.hotspots.find(h => h.productId === product.id);
                      if (matchHs) setActiveHotspot(matchHs);
                    }}
                    className={`p-3 border transition-all cursor-pointer flex items-center justify-between gap-3 animate-editorial-fade ${
                      isSelected
                        ? 'border-cult-accent bg-cult-bg shadow-md'
                        : 'border-cult-border bg-cult-bg/60 hover:border-cult-border/90 hover:bg-cult-bg'
                    }`}
                    style={{ animationDelay: `${pIdx * 70}ms` }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-16 bg-cult-surface border border-cult-border shrink-0 overflow-hidden">
                        <CultImage
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          containerClassName="w-full h-full"
                        />
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <span className="text-[9px] font-mono text-cult-muted uppercase block">
                          {product.category}
                        </span>
                        <h5 className="font-heading text-xs sm:text-sm text-cult-text uppercase truncate">
                          {product.name}
                        </h5>
                        <div className="text-xs font-mono font-bold text-cult-accent">
                          ₹{product.price ? product.price.toLocaleString('en-IN') : '2,499'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`p-2 border transition-all cursor-pointer ${
                          isItemAdded
                            ? 'bg-cult-accent border-cult-accent text-black'
                            : 'border-cult-border hover:border-cult-text text-cult-text hover:bg-cult-surface'
                        }`}
                        title="Quick Add to Cart"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {isItemAdded ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <ShoppingBag className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <Link
                        to={`/product/${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 border border-cult-border hover:border-cult-text text-cult-muted hover:text-cult-text transition-colors"
                        title="View Product Details"
                        aria-label={`View ${product.name}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Link to Full Lookbook Page */}
            <div className="pt-2">
              <Link
                to="/lookbook"
                className="w-full py-3 border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>EXPLORE ALL 12 CAMPAIGN LOOKS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
