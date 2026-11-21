import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Sparkles, Flame, Check, ArrowRight, Layers, ShieldCheck, Compass } from 'lucide-react';
import { PRODUCTS, getNewArrivals, getBestsellers } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { ProductCard } from '../components/common/ProductCard';
import { FilterDrawer, FilterState } from '../components/filters/FilterDrawer';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Product } from '../types';

interface CollectionPageProps {
  mode?: 'all' | 'new-arrivals' | 'bestsellers' | 'collection';
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ mode = 'collection' }) => {
  const { slug } = useParams<{ slug: string }>();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Initialize filter state
  const [filters, setFilters] = useState<FilterState>({
    category: mode === 'collection' && slug ? slug : 'all',
    priceRange: [0, 5000],
    sizes: [],
    colors: [],
    fits: [],
    inStockOnly: false,
    sortBy: mode === 'bestsellers' ? 'bestselling' : mode === 'new-arrivals' ? 'newest' : 'recommended'
  });

  // Determine current metadata
  const currentCollection = useMemo(() => {
    if (mode === 'collection' && slug) {
      return COLLECTIONS.find(c => c.slug === slug);
    }
    return null;
  }, [mode, slug]);

  const pageTitle = useMemo(() => {
    if (mode === 'new-arrivals') return 'NEW ARRIVALS // DROP 08';
    if (mode === 'bestsellers') return 'BESTSELLERS ARCHIVE';
    if (mode === 'all') return 'ALL NINE DISCIPLINES';
    if (currentCollection) return currentCollection.name;
    return 'UNKNOWN CULT ARCHIVE';
  }, [mode, currentCollection]);

  const pageSubtitle = useMemo(() => {
    if (mode === 'new-arrivals') return 'The latest experimental silhouettes fresh from our mills in limited batch quantities.';
    if (mode === 'bestsellers') return 'The defining silhouettes of UNKNOWN CULT, tried and tested in venues worldwide.';
    if (mode === 'all') return 'The complete archive of 280–500 GSM heavyweight streetwear, performance gymwear, and essentials.';
    if (currentCollection) return currentCollection.description;
    return 'Belong to no one.';
  }, [mode, currentCollection]);

  // Base products list before filtering
  const baseProducts = useMemo(() => {
    if (mode === 'new-arrivals') return getNewArrivals();
    if (mode === 'bestsellers') return getBestsellers();
    if (mode === 'collection' && slug) {
      return PRODUCTS.filter(p => p.categorySlug === slug);
    }
    return PRODUCTS;
  }, [mode, slug]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    // Discipline / Category filter (if set in filter drawer)
    if (filters.category !== 'all' && mode === 'all') {
      result = result.filter(p => p.categorySlug === filters.category);
    }

    // Max Price
    result = result.filter(p => p.price <= filters.priceRange[1]);

    // Sizes
    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }

    // Colors
    if (filters.colors.length > 0) {
      result = result.filter(p => p.colors.some(c => 
        filters.colors.some(fc => c.name.toLowerCase().includes(fc.toLowerCase()))
      ));
    }

    // Fits
    if (filters.fits.length > 0) {
      result = result.filter(p => filters.fits.some(f => p.fit.toLowerCase().includes(f.toLowerCase())));
    }

    // In Stock Only
    if (filters.inStockOnly) {
      result = result.filter(p => p.stockStatus === 'in_stock');
    }

    // Sorting
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0));
        break;
      case 'bestselling':
        result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'recommended':
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [baseProducts, filters, mode]);

  const activeFilterCount = 
    (filters.sizes.length) + 
    (filters.colors.length) + 
    (filters.fits.length) + 
    (filters.inStockOnly ? 1 : 0) + 
    (filters.priceRange[1] < 5000 ? 1 : 0) +
    (filters.category !== 'all' && mode === 'all' ? 1 : 0);

  // Render distinct editorial header layouts per collection
  const renderEditorialHero = () => {
    // 1. GYM CULT: Large athletic campaign image with bold headline & performance specs
    if (slug === 'gym-cult') {
      return (
        <div className="relative bg-cult-bg border-b border-cult-border select-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[580px]">
            <div className="lg:col-span-7 relative overflow-hidden bg-cult-card">
              <img
                src="/images/hero/uc-homepage-02-gym-cult_8051d53b.webp"
                alt="Gym Cult Athletic Campaign"
                className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cult-bg via-transparent to-black/40" />
              <div className="absolute top-6 left-6 bg-black/85 px-3 py-1 border border-white/10 text-[10px] font-mono text-cult-accent uppercase tracking-widest">
                DISCIPLINE 01 // IRON ARCHIVE
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-cult-surface border-t lg:border-t-0 lg:border-l border-cult-border">
              <div className="space-y-4">
                <Breadcrumbs items={[{ label: 'ARCHIVE', path: '/shop' }, { label: 'GYM CULT' }]} />
                <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
                  HYPERTROPHY MEETS HIGH FASHION
                </span>
                <h1 className="font-editorial text-4xl sm:text-6xl font-bold uppercase tracking-tight text-cult-text leading-[0.9]">
                  BUILT<br />DIFFERENT.
                </h1>
                <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
                  Engineered with 300 GSM combed cotton pump covers, reinforced drop shoulders, and moisture-dissipating weaves.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-cult-border text-[10px] font-mono">
                  <div className="p-2.5 bg-cult-card border border-cult-border">
                    <span className="text-cult-muted block">WEIGHT</span>
                    <span className="text-cult-text font-bold uppercase">300 GSM JERSEY</span>
                  </div>
                  <div className="p-2.5 bg-cult-card border border-cult-border">
                    <span className="text-cult-muted block">FIT</span>
                    <span className="text-cult-text font-bold uppercase">EXTREME DROP-CUT</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-[10px] font-mono text-cult-accent tracking-widest uppercase">
                "THE WEIGHT REVEALS WHO YOU ARE IN THE DARK."
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. STREET CULT: Urban streetwear collage layout
    if (slug === 'street-cult') {
      return (
        <div className="relative bg-cult-bg border-b border-cult-border select-none p-6 sm:p-10 lg:p-14">
          <div className="max-w-[1720px] mx-auto">
            <Breadcrumbs items={[{ label: 'ARCHIVE', path: '/shop' }, { label: 'STREET CULT' }]} className="mb-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
                  DISCIPLINE 03 // STREET COLLAGE
                </span>
                <h1 className="font-editorial text-4xl sm:text-6xl font-bold uppercase tracking-tight text-cult-text leading-[0.9]">
                  YOUR WORLD.<br />YOUR RULES.
                </h1>
                <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed max-w-md">
                  Raw acid washes, subversive typography, and hand-distressed seams forged in the underground alleyways of Tokyo and Berlin.
                </p>
                <div className="text-[11px] font-mono text-cult-text pt-2 flex items-center gap-3">
                  <span className="text-cult-accent font-bold">11 PIECES</span>
                  <span>•</span>
                  <span>STONE ENZYME WASHED</span>
                </div>
              </div>

              {/* Asymmetric Street Collage */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] bg-cult-card border border-cult-border overflow-hidden">
                  <img
                    src="/images/categories/street-cult/uc-street-editorial-02_86ee0c16.webp"
                    alt="Street Cut 01"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/80 text-[8px] font-mono text-cult-accent px-2 py-0.5">
                    LOOK 01 // ACID TEES
                  </div>
                </div>
                <div className="relative aspect-[3/4] bg-cult-card border border-cult-border overflow-hidden translate-y-4">
                  <img
                    src="/images/categories/baggy-utility/uc-baggy-editorial-02_bee85950.webp"
                    alt="Street Cut 02"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/80 text-[8px] font-mono text-cult-accent px-2 py-0.5">
                    LOOK 02 // CARGO DRAPES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. BAGGY & UTILITY: Full-body street fashion photography with architectural volume
    if (slug === 'baggy-utility') {
      return (
        <div className="relative bg-cult-bg border-b border-cult-border select-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-cult-surface">
              <div className="space-y-4">
                <Breadcrumbs items={[{ label: 'ARCHIVE', path: '/shop' }, { label: 'BAGGY & UTILITY' }]} />
                <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
                  DISCIPLINE 04 // ARCHITECTURAL VOLUME
                </span>
                <h1 className="font-editorial text-4xl sm:text-6xl font-bold uppercase tracking-tight text-cult-text leading-[0.9]">
                  FORM FOLLOWS<br />DEFIANCE.
                </h1>
                <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
                  Engineered with Japanese twill, multi-pocket tactical storage, articulated knee gussets, and bungee toggle hems.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] font-mono">
                  <div className="p-3 bg-cult-card border border-cult-border">
                    <span className="text-cult-accent font-bold block">BALLISTIC TWILL</span>
                    <span className="text-cult-muted">Water-repellent finish</span>
                  </div>
                  <div className="p-3 bg-cult-card border border-cult-border">
                    <span className="text-cult-accent font-bold block">WIDE BREAK</span>
                    <span className="text-cult-muted">Stackable 26-inch hem</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-cult-muted pt-6">
                ARCHITECTURAL CARGOS, DENIM & TACTICAL PARACHUTES
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/5] lg:aspect-auto overflow-hidden bg-cult-card">
              <img
                src="/images/categories/baggy-utility/uc-baggy-editorial-01_6fd17b4f.webp"
                alt="Full-body baggy utility silhouette"
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cult-bg via-transparent to-black/30" />
            </div>
          </div>
        </div>
      );
    }

    // 4. OUTER CULT: Luxury outerwear campaign
    if (slug === 'outer-cult') {
      return (
        <div className="relative bg-cult-bg border-b border-cult-border select-none">
          <div className="relative h-[480px] sm:h-[540px] overflow-hidden">
            <img
              src="/images/hero/uc-hero-01-not-made-to-fit-in_159f6e5f.webp"
              alt="Outer Cult Luxury Campaign"
              className="w-full h-full object-cover filter grayscale contrast-130 brightness-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cult-bg via-black/40 to-black/60" />
            
            <div className="absolute inset-0 max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-10 flex flex-col justify-end pb-12">
              <Breadcrumbs items={[{ label: 'ARCHIVE', path: '/shop' }, { label: 'OUTER CULT' }]} className="mb-4 text-white/80" />
              <div className="max-w-2xl space-y-3">
                <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
                  DISCIPLINE 08 // FORTRESS SHELL
                </span>
                <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-none">
                  THE FORTRESS COATS.
                </h1>
                <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                  Heavyweight bombers, oversized monolithic wool trenches, and water-repellent shell jackets designed to withstand extreme nocturnal environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Editorial Header for other collections & archives
    return (
      <div className="relative bg-cult-surface border-b border-cult-border select-none py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Breadcrumbs items={[{ label: 'ARCHIVE', path: '/shop' }, { label: pageTitle }]} />
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
              {mode === 'new-arrivals' ? <Sparkles className="w-3.5 h-3.5" /> : null}
              {mode === 'bestsellers' ? <Flame className="w-3.5 h-3.5 text-cult-red" /> : null}
              <span>{filteredProducts.length} ARTIFACTS AVAILABLE</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-6xl font-bold uppercase tracking-tight text-cult-text leading-[0.9]">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
              {pageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono text-cult-muted uppercase tracking-widest border-t md:border-t-0 pt-4 md:pt-0">
            <div>
              <span className="text-cult-accent font-bold block text-sm">280–500 GSM</span>
              <span>HEAVYWEIGHT BUILD</span>
            </div>
            <div className="w-[1px] h-6 bg-cult-border" />
            <div>
              <span className="text-cult-text font-bold block text-sm">LIMITED BATCH</span>
              <span>NUMBERED DYES</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cult-bg select-none">
      
      {/* 01. Unique Editorial Header */}
      {renderEditorialHero()}

      {/* 02. Filter & Sort Toolbar */}
      <div className="sticky top-[73px] z-20 bg-cult-bg/95 backdrop-blur-md border-b border-cult-border py-4 px-4 sm:px-8">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text text-xs font-mono uppercase tracking-widest transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cult-accent" />
            <span>FILTER ARTIFACTS</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-cult-accent text-black font-bold flex items-center justify-center text-[10px]">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-cult-muted hidden sm:inline uppercase">
              SHOWING {filteredProducts.length} OF {baseProducts.length}
            </span>

            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="appearance-none bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text px-4 py-2.5 pr-8 text-xs font-mono uppercase tracking-widest focus:outline-none cursor-pointer"
              >
                <option value="recommended">RECOMMENDED</option>
                <option value="newest">NEWEST DROPS</option>
                <option value="bestselling">BESTSELLING</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cult-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* 03. Structured, Usable Product Catalog Grid */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-cult-surface border border-cult-border p-8">
            <h3 className="font-editorial text-2xl text-cult-text uppercase font-bold">
              ZERO ARTIFACTS MATCH SELECTED CRITERIA
            </h3>
            <p className="text-xs text-cult-muted font-sans max-w-md mx-auto">
              Refine your filters, reset price sliders, or browse our entire archive.
            </p>
            <button
              type="button"
              onClick={() => setFilters({
                category: 'all',
                priceRange: [0, 5000],
                sizes: [],
                colors: [],
                fits: [],
                inStockOnly: false,
                sortBy: 'recommended'
              })}
              className="bg-cult-accent text-black px-6 py-3 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={prod => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        totalFilteredCount={filteredProducts.length}
      />

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={quickViewProduct?.category}
      />

    </div>
  );
};
