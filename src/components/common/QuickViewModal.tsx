import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Star, ShoppingBag, ArrowRight, Check, Shield } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  product, 
  onClose,
  onOpenSizeGuide 
}) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-4xl bg-cult-bg border border-cult-border shadow-2xl overflow-hidden relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-cult-surface/80 backdrop-blur-md border border-cult-border text-cult-text hover:text-cult-accent transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Gallery Column */}
          <div className="p-6 bg-cult-surface border-r border-cult-border flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-cult-card mb-4">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute top-3 left-3 text-[10px] bg-black/80 text-cult-accent font-mono px-2 py-0.5">
                {product.category}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 shrink-0 border overflow-hidden ${
                    activeImageIndex === idx ? 'border-cult-accent' : 'border-cult-border opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-cult-muted">
                <span>SKU: {product.sku}</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-cult-muted">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl sm:text-3xl text-cult-text leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-cult-accent font-mono mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-2xl sm:text-3xl text-cult-text">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono line-through text-cult-muted">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-mono text-cult-red font-bold">
                    SAVE ₹{product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Color Selector */}
              <div>
                <div className="text-xs font-mono text-cult-muted mb-2 flex items-center justify-between">
                  <span>COLOR: <strong className="text-cult-text">{selectedColor.name}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 text-xs font-mono border flex items-center gap-2 transition-all ${
                        selectedColor.name === col.name
                          ? 'border-cult-accent bg-cult-card text-cult-text font-bold'
                          : 'border-cult-border text-cult-muted hover:border-cult-muted'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/40" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="text-xs font-mono text-cult-muted mb-2 flex items-center justify-between">
                  <span>SIZE: <strong className="text-cult-text">{selectedSize}</strong></span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-cult-accent hover:underline flex items-center gap-1 text-[11px]"
                  >
                    SIZE GUIDE
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] px-3 py-2 text-xs font-mono border transition-all ${
                        selectedSize === size
                          ? 'border-cult-accent bg-cult-accent text-black font-bold'
                          : 'border-cult-border bg-cult-surface text-cult-text hover:border-cult-muted'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Summary */}
              <div className="text-xs text-cult-muted font-sans bg-cult-surface p-3 border border-cult-border space-y-1">
                <div><strong className="text-cult-text">FIT:</strong> {product.fit}</div>
                <div><strong className="text-cult-text">FABRIC:</strong> {product.fabric}</div>
              </div>

            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-cult-border">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-cult-border bg-cult-surface px-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-2 py-1 text-cult-text hover:text-cult-accent font-mono"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-xs font-bold text-cult-text">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-2 py-1 text-cult-text hover:text-cult-accent font-mono"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-cult-accent text-black py-3.5 px-4 font-heading text-sm tracking-cult-widest uppercase hover:bg-cult-accent-hover transition-colors flex items-center justify-center gap-2 font-bold"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG — ₹{product.price * quantity}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-3 border border-cult-border bg-cult-surface hover:text-cult-red transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-cult-red text-cult-red' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-cult-muted pt-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cult-accent" /> AUTHENTIC HEAVYWEIGHT
                </span>
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-cult-accent hover:underline flex items-center gap-1 font-heading text-xs"
                >
                  VIEW FULL PRODUCT DETAILS <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
