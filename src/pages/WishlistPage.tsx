import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, totalWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach(item => {
      addToCart(item, item.sizes[0] || 'M', item.colors[0], 1);
    });
  };

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'MY WISHLIST' }]} className="mb-6" />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-cult-border pb-6 mb-8 gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-1">
              // SAVED SILHOUETTES
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
              MY WISHLIST ({totalWishlist})
            </h1>
          </div>

          {totalWishlist > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveAllToBag}
                className="bg-cult-accent text-black px-5 py-2.5 text-xs font-heading tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>MOVE ALL TO BAG</span>
              </button>

              <button
                onClick={clearWishlist}
                className="text-xs font-mono text-cult-muted hover:text-cult-red transition-colors underline"
              >
                CLEAR ALL
              </button>
            </div>
          )}
        </div>

        {totalWishlist === 0 ? (
          <div className="py-20 text-center space-y-4 bg-cult-surface border border-cult-border p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full border border-cult-border flex items-center justify-center mx-auto text-cult-muted">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-3xl text-cult-text">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-xs text-cult-muted max-w-md mx-auto font-sans">
              Save your favorite oversized silhouettes, pump covers, and tactical cargos here to monitor restocks and limited dye runs.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-cult-accent text-black px-8 py-3.5 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
            >
              DISCOVER ARCHIVE
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
