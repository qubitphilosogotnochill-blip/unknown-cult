import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { CultImage } from './CultImage';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onQuickView,
  className = '' 
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const hasSecondaryImage = product.images.length > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className={`group relative bg-cult-surface border border-cult-border hover:border-cult-accent/70 transition-all duration-300 flex flex-col justify-between ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Top Media Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cult-card select-none">
        
        {/* Main Product Image with Secondary Image Swap on Hover */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <CultImage
            src={isHovered && hasSecondaryImage ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
            containerClassName="w-full h-full"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNewDrop && (
            <span className="text-[10px] font-mono tracking-widest bg-cult-accent text-black px-2 py-0.5 font-bold uppercase shadow-sm">
              NEW DROP
            </span>
          )}
          {product.isBestseller && (
            <span className="text-[10px] font-mono tracking-widest bg-cult-surface text-cult-text border border-cult-border px-2 py-0.5 font-bold uppercase">
              BESTSELLER
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] font-mono tracking-widest bg-cult-red text-white px-2 py-0.5 font-bold uppercase">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-cult-surface/80 backdrop-blur-md border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-red transition-all duration-200 z-10"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-cult-red text-cult-red' : ''
            }`} 
          />
        </button>

        {/* Quick View Button (Desktop) */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-12 right-2 w-8 h-8 rounded-full bg-cult-surface/80 backdrop-blur-md border border-cult-border hidden md:flex items-center justify-center text-cult-text hover:text-cult-accent transition-all opacity-0 group-hover:opacity-100 z-10"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Slide-Up Quick Size Selector or Quick Add Trigger */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          {showQuickAdd ? (
            <div className="bg-cult-surface p-2 border border-cult-border space-y-2 animate-fade-in">
              <div className="text-[10px] font-mono text-cult-muted flex justify-between">
                <span>SELECT SIZE:</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowQuickAdd(false); }}
                  className="text-cult-text hover:text-cult-accent"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={`px-2 py-1 text-[10px] font-mono border ${
                      selectedSize === size
                        ? 'border-cult-accent bg-cult-accent text-black font-bold'
                        : 'border-cult-border bg-cult-card text-cult-text hover:border-cult-muted'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={handleQuickAdd}
                className="w-full bg-cult-accent text-black text-xs font-heading tracking-widest py-1.5 uppercase font-bold hover:bg-cult-accent-hover transition-colors"
              >
                ADD SIZE {selectedSize}
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.sizes.length === 1 && product.sizes[0] === 'FREE SIZE') {
                  handleQuickAdd(e);
                } else {
                  setShowQuickAdd(true);
                }
              }}
              className="w-full bg-cult-text text-cult-bg py-2.5 px-3 text-xs font-heading tracking-cult-widest uppercase hover:bg-cult-accent hover:text-black transition-colors flex items-center justify-center gap-1.5 font-bold shadow-md"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>QUICK ADD</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

      {/* Product Details Area */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
        
        <div>
          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono tracking-widest text-cult-muted uppercase">
              {product.category}
            </span>

            {/* Colors */}
            <div className="flex items-center space-x-1">
              {product.colors.map(col => (
                <button
                  key={col.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColor(col);
                  }}
                  className={`w-3 h-3 rounded-full border transition-all ${
                    selectedColor.name === col.name 
                      ? 'ring-1 ring-cult-accent scale-110 border-black' 
                      : 'border-cult-border hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Product Name */}
          <Link 
            to={`/product/${product.id}`}
            className="block font-heading text-base sm:text-lg text-cult-text hover:text-cult-accent transition-colors leading-tight line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Tagline / Silhouette description */}
          <p className="text-[11px] text-cult-muted font-sans line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Pricing and Reviews */}
        <div className="pt-2 border-t border-cult-border/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-base sm:text-lg text-cult-text">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono line-through text-cult-muted">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-cult-muted font-mono">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-[9px] text-cult-muted">({product.reviewsCount})</span>
          </div>
        </div>

      </div>

    </div>
  );
};
