import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Pump Cover',
  'Cargo Pants',
  '500 GSM Hoodie',
  'Acid Wash',
  'Cuban Collar Shirt',
  'Compression Tee',
  'Wide Leg Denim',
  'Signet Ring'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const clean = query.toLowerCase();
    const matched = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(clean) ||
      p.category.toLowerCase().includes(clean) ||
      p.tagline.toLowerCase().includes(clean) ||
      p.tags.some(t => t.toLowerCase().includes(clean)) ||
      p.colors.some(c => c.name.toLowerCase().includes(clean))
    );
    setResults(matched.slice(0, 8));
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-cult-bg border border-cult-border shadow-2xl relative">
        
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-cult-border bg-cult-surface flex items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3">
            <Search className="w-6 h-6 text-cult-accent shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="SEARCH BY PRODUCT, SILHOUETTE, FABRIC OR CULTURE..."
              className="w-full bg-transparent text-sm sm:text-base font-mono uppercase tracking-wider text-cult-text placeholder-cult-muted focus:outline-none"
            />
          </form>

          <button
            onClick={onClose}
            className="p-2 text-cult-muted hover:text-cult-text transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="p-4 sm:p-6 border-b border-cult-border bg-cult-card/40">
          <div className="text-[10px] tracking-cult-mega uppercase text-cult-muted font-mono mb-2 flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-cult-accent" /> POPULAR DISCOVERIES:
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map(term => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="text-xs font-mono uppercase px-3 py-1 bg-cult-surface border border-cult-border hover:border-cult-accent hover:text-cult-accent transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-cult-muted font-mono text-xs">
              TYPE TO SEARCH ACROSS ALL 9 UNKNOWN CULT COLLECTIONS
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-heading text-xl text-cult-text">NO MATCHING SILHOUETTES FOUND</p>
              <p className="text-xs text-cult-muted font-sans">
                Try searching for 'hoodie', 'cargo', 'pump cover', or 'oversized'.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-cult-mega uppercase text-cult-muted font-mono">
                  MATCHING ARTIFACTS ({results.length})
                </span>
                <button
                  onClick={handleSearchSubmit}
                  className="text-xs font-heading tracking-wider text-cult-accent hover:underline flex items-center gap-1"
                >
                  VIEW ALL RESULTS IN FULL SEARCH <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {results.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.id)}
                    className="group bg-cult-surface border border-cult-border p-2.5 cursor-pointer hover:border-cult-accent transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-cult-card mb-2">
                      <img 
                        src={prod.images[0]} 
                        alt={prod.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-1.5 left-1.5 text-[9px] bg-black/80 px-1.5 py-0.5 text-cult-accent font-mono">
                        {prod.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-heading text-xs text-cult-text group-hover:text-cult-accent transition-colors line-clamp-1">
                        {prod.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-cult-text">₹{prod.price}</span>
                        {prod.originalPrice && (
                          <span className="text-[10px] line-through text-cult-muted">₹{prod.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
