import React from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { COLLECTIONS } from '../../data/collections';

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  fits: string[];
  inStockOnly: boolean;
  sortBy: 'recommended' | 'newest' | 'bestselling' | 'price-asc' | 'price-desc';
}

interface FilterDrawerProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  onClose: () => void;
  totalFilteredCount: number;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', 'FREE SIZE'];
const AVAILABLE_COLORS = [
  { name: 'Black', hex: '#111111' },
  { name: 'Charcoal', hex: '#333333' },
  { name: 'Ash', hex: '#555555' },
  { name: 'Bone', hex: '#EBE5D8' },
  { name: 'Olive', hex: '#3B4034' },
  { name: 'Brown / Earth', hex: '#5E5246' }
];
const AVAILABLE_FITS = [
  'Exaggerated Boxy Oversized',
  'Athletic Muscle Fit',
  'Relaxed Straight',
  'Wide Balloon Silhouette',
  'Fluid Resort Cut'
];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  filters,
  setFilters,
  isOpen,
  onClose,
  totalFilteredCount
}) => {
  const resetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 5000],
      sizes: [],
      colors: [],
      fits: [],
      inStockOnly: false,
      sortBy: 'recommended'
    });
  };

  const toggleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (colorName: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter(c => c !== colorName)
        : [...prev.colors, colorName]
    }));
  };

  const toggleFit = (fit: string) => {
    setFilters(prev => ({
      ...prev,
      fits: prev.fits.includes(fit)
        ? prev.fits.filter(f => f !== fit)
        : [...prev.fits, fit]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cult-bg border-l border-cult-border flex flex-col justify-between shadow-2xl animate-fade-in">
          
          {/* Header */}
          <div className="p-6 border-b border-cult-border bg-cult-surface flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-cult-accent" />
              <h3 className="font-heading text-xl text-cult-text">FILTERS & SORTING</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-cult-muted hover:text-cult-accent flex items-center gap-1 p-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" /> RESET
              </button>
              <button
                onClick={onClose}
                className="p-1 text-cult-muted hover:text-cult-text"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Sort By */}
            <div>
              <label className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-muted block mb-2">
                // SORT BY
              </label>
              <select
                value={filters.sortBy}
                onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                className="w-full bg-cult-surface border border-cult-border px-3.5 py-2.5 text-xs font-mono uppercase text-cult-text focus:border-cult-accent focus:outline-none"
              >
                <option value="recommended">RECOMMENDED BY ATELIER</option>
                <option value="newest">NEWEST DROPS FIRST</option>
                <option value="bestselling">BESTSELLING SILHOUETTES</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
              </select>
            </div>

            {/* Discipline / Category Filter */}
            <div>
              <label className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-muted block mb-2">
                // CULT DISCIPLINE
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                  className={`px-3 py-2 text-xs font-mono text-left border ${
                    filters.category === 'all'
                      ? 'border-cult-accent bg-cult-surface text-cult-accent font-bold'
                      : 'border-cult-border bg-cult-card text-cult-muted hover:text-cult-text'
                  }`}
                >
                  ALL DISCIPLINES
                </button>
                {COLLECTIONS.map(col => (
                  <button
                    key={col.id}
                    onClick={() => setFilters(prev => ({ ...prev, category: col.slug }))}
                    className={`px-3 py-2 text-xs font-mono text-left truncate border ${
                      filters.category === col.slug
                        ? 'border-cult-accent bg-cult-surface text-cult-accent font-bold'
                        : 'border-cult-border bg-cult-card text-cult-muted hover:text-cult-text'
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono tracking-cult-mega uppercase text-cult-muted mb-2">
                <span>// MAXIMUM PRICE</span>
                <span className="text-cult-accent font-bold text-xs">₹{filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={filters.priceRange[1]}
                onChange={e => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                className="w-full accent-cult-accent bg-cult-card h-1.5"
              />
              <div className="flex justify-between text-[10px] font-mono text-cult-muted mt-1">
                <span>₹500</span>
                <span>₹2,500</span>
                <span>₹5,000+</span>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-muted block mb-2">
                // AVAILABLE SIZES
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_SIZES.map(sz => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`px-2.5 py-1.5 text-xs font-mono border ${
                      filters.sizes.includes(sz)
                        ? 'border-cult-accent bg-cult-accent text-black font-bold'
                        : 'border-cult-border bg-cult-surface text-cult-text hover:border-cult-muted'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-muted block mb-2">
                // COLOR PALETTE
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_COLORS.map(col => (
                  <button
                    key={col.name}
                    onClick={() => toggleColor(col.name)}
                    className={`px-3 py-2 text-xs font-mono border flex items-center gap-2 ${
                      filters.colors.includes(col.name)
                        ? 'border-cult-accent bg-cult-surface text-cult-text font-bold'
                        : 'border-cult-border bg-cult-card text-cult-muted hover:text-cult-text'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/50" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fits */}
            <div>
              <label className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-muted block mb-2">
                // SILHOUETTE & FIT
              </label>
              <div className="space-y-1.5">
                {AVAILABLE_FITS.map(f => (
                  <label key={f} className="flex items-center gap-2 text-xs font-mono text-cult-text cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.fits.includes(f)}
                      onChange={() => toggleFit(f)}
                      className="accent-cult-accent w-4 h-4 rounded-none"
                    />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock status toggle */}
            <div className="pt-2 border-t border-cult-border">
              <label className="flex items-center justify-between text-xs font-mono text-cult-text cursor-pointer">
                <span>ONLY SHOW IN-STOCK ARTIFACTS</span>
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={e => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                  className="accent-cult-accent w-4 h-4"
                />
              </label>
            </div>

          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-cult-border bg-cult-surface">
            <button
              onClick={onClose}
              className="w-full bg-cult-accent text-black py-3.5 font-heading text-sm tracking-cult-widest uppercase font-bold hover:bg-cult-accent-hover transition-colors"
            >
              SHOW {totalFilteredCount} ARTIFACTS
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
