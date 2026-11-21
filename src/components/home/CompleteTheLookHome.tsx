import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const CompleteTheLookHome: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedUpper, setSelectedUpper] = useState(PRODUCTS.find(p => p.id === 'uc-street-01')!);
  const [selectedBottom, setSelectedBottom] = useState(PRODUCTS.find(p => p.id === 'uc-baggy-01')!);
  const [selectedAcc, setSelectedAcc] = useState(PRODUCTS.find(p => p.id === 'uc-acc-01')!);
  const [addedOutfit, setAddedOutfit] = useState(false);

  const bundleTotal = selectedUpper.price + selectedBottom.price + selectedAcc.price;
  const bundleOriginal = (selectedUpper.originalPrice || selectedUpper.price) + 
                        (selectedBottom.originalPrice || selectedBottom.price) + 
                        (selectedAcc.originalPrice || selectedAcc.price);
  const bundleSavings = bundleOriginal - bundleTotal;

  const handleAddFullOutfit = () => {
    addToCart(selectedUpper, selectedUpper.sizes[1] || 'M', selectedUpper.colors[0], 1);
    addToCart(selectedBottom, selectedBottom.sizes[1] || '32', selectedBottom.colors[0], 1);
    addToCart(selectedAcc, selectedAcc.sizes[0] || 'FREE SIZE', selectedAcc.colors[0], 1);
    setAddedOutfit(true);
    setTimeout(() => setAddedOutfit(false), 2000);
  };

  return (
    <section className="py-14 sm:py-20 bg-cult-surface border-b border-cult-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-2">
            // UNIFIED SILHOUETTE
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-cult-text uppercase leading-none">
            COMPLETE THE LOOK
          </h2>
          <p className="text-xs sm:text-sm text-cult-muted font-sans mt-3">
            Harmonized proportions. Curated by our senior stylists for effortless monochrome dominance.
          </p>
        </div>

        {/* Outfit Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cult-bg border border-cult-border p-6 sm:p-10">
          
          {/* Main Hero Model Styling Outfit (6 cols) */}
          <div className="lg:col-span-6 relative aspect-[3/4] overflow-hidden bg-cult-card border border-cult-border">
            <img
              src="/images/lookbook/uc-lookbook-07_778dcbea.webp"
              alt="Complete Look Styling"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-cult-accent uppercase">
                FEATURED CURATION // THE TOKYO DRIFT
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl uppercase">
                ACID OVERSIZED UNIFORM
              </h3>
            </div>
          </div>

          {/* Outfit Components Stack (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 3 Pieces List */}
            <div className="space-y-3">
              
              {/* Piece 1: Upper */}
              <div className="flex items-center gap-4 p-3 bg-cult-surface border border-cult-border">
                <img 
                  src={selectedUpper.images[0]} 
                  alt={selectedUpper.name} 
                  className="w-16 h-20 object-cover bg-cult-card shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono text-cult-muted uppercase block">
                    UPPER // {selectedUpper.category}
                  </span>
                  <Link 
                    to={`/product/${selectedUpper.id}`}
                    className="font-heading text-sm text-cult-text hover:text-cult-accent transition-colors truncate block"
                  >
                    {selectedUpper.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-cult-text">₹{selectedUpper.price}</span>
                    <span className="text-[10px] text-cult-muted font-mono">{selectedUpper.fit}</span>
                  </div>
                </div>
              </div>

              {/* Piece 2: Bottom */}
              <div className="flex items-center gap-4 p-3 bg-cult-surface border border-cult-border">
                <img 
                  src={selectedBottom.images[0]} 
                  alt={selectedBottom.name} 
                  className="w-16 h-20 object-cover bg-cult-card shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono text-cult-muted uppercase block">
                    LOWER // {selectedBottom.category}
                  </span>
                  <Link 
                    to={`/product/${selectedBottom.id}`}
                    className="font-heading text-sm text-cult-text hover:text-cult-accent transition-colors truncate block"
                  >
                    {selectedBottom.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-cult-text">₹{selectedBottom.price}</span>
                    <span className="text-[10px] text-cult-muted font-mono">{selectedBottom.fit}</span>
                  </div>
                </div>
              </div>

              {/* Piece 3: Accessory */}
              <div className="flex items-center gap-4 p-3 bg-cult-surface border border-cult-border">
                <img 
                  src={selectedAcc.images[0]} 
                  alt={selectedAcc.name} 
                  className="w-16 h-20 object-cover bg-cult-card shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono text-cult-muted uppercase block">
                    ARTIFACT // {selectedAcc.category}
                  </span>
                  <Link 
                    to={`/product/${selectedAcc.id}`}
                    className="font-heading text-sm text-cult-text hover:text-cult-accent transition-colors truncate block"
                  >
                    {selectedAcc.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-cult-text">₹{selectedAcc.price}</span>
                    <span className="text-[10px] text-cult-muted font-mono">100% Chino Twill</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bundle Total & Add All CTA */}
            <div className="p-4 bg-cult-surface border border-cult-border space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-cult-muted">BUNDLE PRICE (3 PIECES):</span>
                <div className="text-right">
                  <span className="font-heading text-xl text-cult-text">₹{bundleTotal}</span>
                  {bundleSavings > 0 && (
                    <span className="text-[11px] text-cult-accent block">
                      YOU SAVE ₹{bundleSavings} VS SEPARATE
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleAddFullOutfit}
                className="w-full bg-cult-accent text-black py-4 font-heading text-sm tracking-cult-widest uppercase font-bold hover:bg-cult-accent-hover transition-colors flex items-center justify-center gap-2"
              >
                {addedOutfit ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>3 ITEMS ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD COMPLETE LOOK TO BAG</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
