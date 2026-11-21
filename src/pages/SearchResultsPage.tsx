import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { FilterDrawer, FilterState } from '../components/filters/FilterDrawer';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Product } from '../types';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 5000],
    sizes: [],
    colors: [],
    fits: [],
    inStockOnly: false,
    sortBy: 'recommended'
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const searchResults = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    const clean = query.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(clean) ||
      p.category.toLowerCase().includes(clean) ||
      p.tagline.toLowerCase().includes(clean) ||
      p.fabric.toLowerCase().includes(clean) ||
      p.fit.toLowerCase().includes(clean) ||
      p.tags.some(t => t.toLowerCase().includes(clean))
    );
  }, [query]);

  // Apply secondary filters
  const finalResults = useMemo(() => {
    let list = [...searchResults];

    if (filters.category !== 'all') {
      list = list.filter(p => p.categorySlug === filters.category);
    }
    list = list.filter(p => p.price <= filters.priceRange[1]);

    if (filters.sizes.length > 0) {
      list = list.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      list = list.filter(p => p.colors.some(c => filters.colors.some(fc => c.name.toLowerCase().includes(fc.toLowerCase()))));
    }
    if (filters.inStockOnly) {
      list = list.filter(p => p.stockStatus === 'in_stock');
    }

    return list;
  }, [searchResults, filters]);

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs
          items={[
            { label: 'SEARCH' },
            { label: query ? `"${query}"` : 'ALL ARTIFACTS' }
          ]}
          className="mb-6"
        />

        {/* Search Input Bar */}
        <div className="p-6 bg-cult-surface border border-cult-border mb-8">
          <form onSubmit={handleSearchSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-cult-accent absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="SEARCH SILHOUETTE, WEIGHT (e.g. 300 GSM), COLOR OR DISCIPLINE..."
                className="w-full bg-cult-bg border border-cult-border py-3.5 pl-11 pr-4 text-xs font-mono uppercase tracking-wider text-cult-text placeholder-cult-muted focus:outline-none focus:border-cult-accent"
              />
            </div>
            <button
              type="submit"
              className="bg-cult-accent text-black px-8 py-3.5 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
            >
              SEARCH
            </button>
          </form>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between border-b border-cult-border pb-4 mb-6">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl text-cult-text uppercase">
              {query ? `RESULTS FOR "${query}"` : 'EXPLORE ALL ARTIFACTS'}
            </h1>
            <p className="text-xs font-mono text-cult-muted mt-1">
              {finalResults.length} matching silhouettes found in archive
            </p>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-cult-card border border-cult-border px-4 py-2 text-xs font-heading tracking-widest text-cult-text hover:border-cult-accent"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cult-accent" />
            <span>FILTER RESULTS</span>
          </button>
        </div>

        {/* Results Grid */}
        {finalResults.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-cult-surface border border-cult-border p-8">
            <h3 className="font-heading text-3xl text-cult-text">NO MATCHING SILHOUETTES</h3>
            <p className="text-xs text-cult-muted max-w-sm mx-auto font-sans">
              Try searching for general keywords like 'hoodie', 'pump cover', 'cargo', or 'cuban shirt'.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {finalResults.map(prod => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={p => setQuickViewProduct(p)}
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
        totalFilteredCount={finalResults.length}
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
        category="upperwear"
      />
    </div>
  );
};
