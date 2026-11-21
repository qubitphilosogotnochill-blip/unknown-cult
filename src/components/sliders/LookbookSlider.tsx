import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

interface LookbookEntry {
  id: string;
  lookNumber: string;
  title: string;
  location: string;
  model: string;
  image: string;
  taggedProductIds: string[];
}

const LOOKBOOK_ENTRIES: LookbookEntry[] = [
  {
    id: 'look-01',
    lookNumber: 'LOOK 01 // TOKYO BRUTALISM',
    title: 'THE MONOLITHIC DRAPE',
    location: 'Shinjuku Underground, Tokyo',
    model: 'Ren K. (184cm / 76kg, wearing size L / 32)',
    image: '/images/lookbook/uc-lookbook-01_7b8cf357.webp',
    taggedProductIds: ['uc-street-01', 'uc-baggy-01', 'uc-acc-01']
  },
  {
    id: 'look-02',
    lookNumber: 'LOOK 02 // SUBTERRANEAN LIFT',
    title: 'COLD HYPERTROPHY',
    location: 'Powerhouse Iron Vault, Berlin',
    model: 'Marcus V. (188cm / 92kg, wearing size XL / 34)',
    image: '/images/lookbook/uc-lookbook-02_767e3c63.webp',
    taggedProductIds: ['uc-gym-01', 'uc-gym-04', 'uc-acc-03']
  },
  {
    id: 'look-03',
    lookNumber: 'LOOK 03 // ARCHITECTURAL ESSENTIAL',
    title: 'THE SOVEREIGN MINIMAL',
    location: 'Concrete Pavilion, Seoul',
    model: 'Ji-Hoon M. (180cm / 70kg, wearing size M / 30)',
    image: '/images/lookbook/uc-lookbook-03_d268f1da.webp',
    taggedProductIds: ['uc-daily-01', 'uc-daily-03', 'uc-shirt-01']
  },
  {
    id: 'look-04',
    lookNumber: 'LOOK 04 // TOTAL FORTRESS',
    title: 'DOUBLE-HEAVY FLEECE UNIFORM',
    location: 'Brutalist Warehouse, London',
    model: 'Alex S. (185cm / 80kg, wearing size L / 32)',
    image: '/images/lookbook/uc-lookbook-04_c5bc2c5d.webp',
    taggedProductIds: ['uc-hood-01', 'uc-baggy-01', 'uc-outer-01']
  }
];

export const LookbookSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + LOOKBOOK_ENTRIES.length) % LOOKBOOK_ENTRIES.length);
  const next = () => setCurrent(c => (c + 1) % LOOKBOOK_ENTRIES.length);

  const look = LOOKBOOK_ENTRIES[current];
  const taggedProducts = look.taggedProductIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is typeof PRODUCTS[0] => !!p);

  return (
    <section className="py-14 sm:py-20 bg-cult-surface border-b border-cult-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cult-border gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-1">
              // EDITORIAL ARCHIVE
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cult-text leading-none uppercase">
              SEASON 08 LOOKBOOK
            </h2>
            <p className="text-xs sm:text-sm text-cult-muted font-sans mt-1">
              Complete curated outfits styled by the UNKNOWN CULT atelier. Shop entire uniforms seamlessly.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/lookbook"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-heading tracking-widest text-cult-accent hover:text-cult-text uppercase"
            >
              <span>VIEW FULL LOOKBOOK (24 LOOKS)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={prev}
              className="w-10 h-10 bg-cult-card border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-accent hover:border-cult-accent transition-colors"
              aria-label="Previous look"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 bg-cult-card border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-accent hover:border-cult-accent transition-colors"
              aria-label="Next look"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lookbook Layout: Photo on Left, Shoppable Products on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cult-bg border border-cult-border p-4 sm:p-8">
          
          {/* Main Look Photograph (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden bg-cult-card">
            <img
              key={look.image}
              src={look.image}
              alt={look.title}
              className="w-full h-full object-cover object-center animate-fade-in transition-all duration-700"
            />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-cult-accent font-mono text-[10px] uppercase">
              {look.lookNumber}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 border border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1">
              <span>LOC: {look.location}</span>
              <span className="text-cult-accent">{look.model}</span>
            </div>
          </div>

          {/* Shoppable Outfit Items (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-muted mb-1">
                // FEATURED UNIFORM
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl text-cult-text uppercase mb-2">
                {look.title}
              </h3>
              <p className="text-xs text-cult-muted font-sans mb-6">
                Every piece in this outfit has been calibrated for complementary fabric weight, drape proportion, and tonal harmony.
              </p>

              {/* Tagged Products Cards */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-cult-accent uppercase font-bold flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" /> PIECES IN THIS LOOK ({taggedProducts.length}):
                </div>

                {taggedProducts.map(p => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="flex items-center gap-3.5 p-2.5 bg-cult-surface border border-cult-border hover:border-cult-accent transition-all duration-200 group"
                  >
                    <img 
                      src={p.images[0]} 
                      alt={p.name} 
                      className="w-14 h-16 object-cover bg-cult-card shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-cult-muted uppercase block">
                        {p.category}
                      </span>
                      <h4 className="font-heading text-sm text-cult-text group-hover:text-cult-accent transition-colors truncate">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-cult-text">₹{p.price}</span>
                        {p.originalPrice && (
                          <span className="text-[10px] font-mono line-through text-cult-muted">₹{p.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cult-accent group-hover:translate-x-1 transition-transform pr-2">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-cult-border">
              <Link
                to="/lookbook"
                className="w-full bg-cult-accent text-black py-3 px-4 text-xs font-heading tracking-cult-widest uppercase font-bold hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <span>EXPLORE ALL 24 EDITORIAL LOOKS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
