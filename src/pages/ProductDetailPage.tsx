import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Check, 
  Star, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  Sparkles,
  ChevronRight,
  Flame,
  Share2,
  ZoomIn,
  ArrowRight
} from 'lucide-react';
import { getProductById, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { ProductSlider } from '../components/sliders/ProductSlider';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { ProductColor, ProductReview, Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = getProductById(id || '');
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'material' | 'fit' | 'shipping' | 'reviews'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reviews state with new review submission
  const [reviews, setReviews] = useState<ProductReview[]>([
    {
      id: 'rev-1',
      author: 'Marcus V.',
      rating: 5,
      date: '14 Nov 2026',
      title: 'Unbelievable fabric density. The 300 GSM is real.',
      comment: 'I own luxury streetwear pieces costing quadruple the price, and UNKNOWN CULT outperforms them. The collar ribbing is thick, stays completely flat after multiple washes, and the drape is flawless.',
      verified: true,
      sizePurchased: 'Size L',
      fitVote: 'True to size'
    },
    {
      id: 'rev-2',
      author: 'Devin Thorne',
      rating: 5,
      date: '02 Nov 2026',
      title: 'Best silhouette in my entire wardrobe.',
      comment: 'Drop shoulder angle is cut with architectural precision. Drapes away from the body so there is zero cling. Truly belong to no one.',
      verified: true,
      sizePurchased: 'Size XL',
      fitVote: 'True to size'
    },
    {
      id: 'rev-3',
      author: 'Siddharth K.',
      rating: 4,
      date: '28 Oct 2026',
      title: 'Heavyweight masterpiece.',
      comment: 'A bit heavier than ordinary cotton tees, which is exactly what I wanted. Perfect for gym pump covers and nocturnal outings.',
      verified: true,
      sizePurchased: 'Size M',
      fitVote: 'Runs large'
    }
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewSize, setNewReviewSize] = useState('Size L');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Sync state on product load
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0] || 'M');
      setActiveImageIndex(0);
      addRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-editorial text-4xl text-cult-text uppercase font-bold">ARTIFACT NOT LOCATED</h2>
        <p className="text-xs text-cult-muted max-w-sm font-sans">
          The requested silhouette has been archived or relocated in our underground catalog.
        </p>
        <Link
          to="/shop"
          className="bg-cult-accent text-black px-6 py-3 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
        >
          RETURN TO ARCHIVE
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Complementary pieces
  const complementaryProducts = (product.complementaryProductIds || [])
    .map(cid => PRODUCTS.find(p => p.id === cid))
    .filter((p): p is Product => !!p);

  // Related products from same discipline
  const relatedProducts = PRODUCTS
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 6);

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setIsCartOpen(true);
    }, 800);
  };

  const handleBuyNow = () => {
    if (!selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      const newRev: ProductReview = {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor,
        rating: newReviewRating,
        date: 'Today',
        title: newReviewTitle || 'Verified Devotee Review',
        comment: newReviewComment,
        verified: true,
        sizePurchased: newReviewSize,
        fitVote: 'True to size'
      };
      setReviews(prev => [newRev, ...prev]);
      setReviewSubmitted(true);
      setNewReviewAuthor('');
      setNewReviewTitle('');
      setNewReviewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-cult-bg py-6 sm:py-10 select-none">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Editorial Top Metadata & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-cult-border/60 gap-3 text-[10px] font-mono tracking-cult-mega text-cult-muted uppercase">
          <Breadcrumbs
            items={[
              { label: 'ARCHIVE', path: '/shop' },
              { label: product.category, path: `/collections/${product.categorySlug}` },
              { label: product.name }
            ]}
          />
          <div className="flex items-center gap-4 text-cult-accent font-bold">
            <span>SKU: {product.sku}</span>
            <span>•</span>
            <span>{product.fabric.match(/(\d{3})\s*GSM/i)?.[1] || '320'} GSM BUILD</span>
          </div>
        </div>

        {/* ================================================================ */}
        {/* MAGAZINE SPLIT LAYOUT: ASYMMETRICAL GALLERY (7 cols) + BUY BOX (5 cols) */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Large Asymmetrical Product Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Hero Stage View */}
            <div 
              className="relative aspect-[3/4] w-full overflow-hidden bg-cult-surface border border-cult-border select-none group cursor-crosshair"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                  isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-103'
                }`}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.isNewDrop && (
                  <span className="text-[10px] font-mono tracking-widest bg-cult-accent text-black px-3 py-1 font-bold uppercase">
                    DROP 08 RELEASE
                  </span>
                )}
                {product.isBestseller && (
                  <span className="text-[10px] font-mono tracking-widest bg-cult-surface text-cult-text border border-cult-border px-3 py-1 font-bold uppercase">
                    BESTSELLER ARCHIVE
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-[10px] font-mono tracking-widest bg-cult-red text-white px-3 py-1 font-bold uppercase">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              {/* Zoom hint button */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/20 text-white text-[10px] font-mono flex items-center gap-1.5 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-cult-accent" />
                <span>{isZoomed ? 'TAP TO COLLAPSE' : 'CLICK TO EXPAND'}</span>
              </div>
            </div>

            {/* Asymmetrical 2-Photo Collage Beneath Hero (if 2+ images) */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                
                {/* Secondary Image: Aspect [4/5] */}
                <div 
                  className={`relative aspect-[4/5] overflow-hidden bg-cult-surface border cursor-pointer transition-all ${
                    activeImageIndex === 1 ? 'border-cult-accent' : 'border-cult-border hover:border-cult-muted'
                  }`}
                  onClick={() => setActiveImageIndex(1)}
                >
                  <img
                    src={product.images[1]}
                    alt={`${product.name} - Angle 2`}
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[8px] font-mono text-cult-accent uppercase tracking-widest">
                    FIG. 01 // TEXTURE & DRAPE
                  </div>
                </div>

                {/* Tertiary Image: Aspect [3/4] staggered */}
                <div 
                  className={`relative aspect-[3/4] overflow-hidden bg-cult-surface border cursor-pointer transition-all ${
                    activeImageIndex === 2 ? 'border-cult-accent' : 'border-cult-border hover:border-cult-muted'
                  }`}
                  onClick={() => setActiveImageIndex(product.images[2] ? 2 : 0)}
                >
                  <img
                    src={product.images[2] || product.images[0]}
                    alt={`${product.name} - Angle 3`}
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[8px] font-mono text-cult-accent uppercase tracking-widest">
                    FIG. 02 // SEAM INTEGRITY
                  </div>
                </div>

              </div>
            )}

            {/* Thumbnail Jump Bar */}
            <div className="flex items-center gap-3 pt-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-20 h-24 shrink-0 overflow-hidden bg-cult-surface border transition-all ${
                    activeImageIndex === idx 
                      ? 'border-cult-accent ring-1 ring-cult-accent' 
                      : 'border-cult-border opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Atelier Studio Assurance Stamp */}
            <div className="text-[10px] font-mono text-cult-muted flex items-center justify-between pt-3 border-t border-cult-border/60 uppercase">
              <span>PHOTO EDITORIAL // RAW UNRETRACTED COLOR FIDELITY</span>
              <span className="text-cult-accent">100% ATELIER CAPTURED</span>
            </div>

          </div>

          {/* ================================================================ */}
          {/* RIGHT: Magazine Product Buy Box & Configuration (5 cols, Sticky) */}
          {/* ================================================================ */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Title & Headline */}
            <div className="space-y-3 border-b border-cult-border pb-6">
              
              <div className="flex items-center justify-between text-[10px] font-mono text-cult-muted uppercase">
                <span className="text-cult-accent font-bold tracking-widest">
                  // {product.category}
                </span>
                <span className="bg-cult-surface px-2.5 py-1 border border-cult-border text-cult-text font-bold">
                  {product.fabric.match(/(\d{3})\s*GSM/i)?.[1] || '320'} GSM
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-cult-text uppercase leading-[0.95] tracking-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating Reviews Link */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-cult-border fill-transparent'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-cult-text">{product.rating}</span>
                <span className="text-xs font-mono text-cult-muted">({reviews.length} devotee reviews)</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs font-mono text-cult-accent underline hover:text-white"
                >
                  Read all
                </button>
              </div>

            </div>

            {/* Pricing Matrix */}
            <div className="flex items-baseline gap-4 border-b border-cult-border pb-6">
              <span className="font-editorial text-4xl sm:text-5xl font-bold text-cult-text tracking-tight">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base font-mono line-through text-cult-muted">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-mono bg-cult-red/20 text-cult-red border border-cult-red/30 px-2.5 py-0.5 font-bold uppercase">
                  SAVE ₹{((product.originalPrice || 0) - product.price).toLocaleString('en-IN')} ({discountPercent}%)
                </span>
              )}
              <span className="text-[10px] font-mono text-cult-muted ml-auto">
                INCL. TAXES & TARIFFS
              </span>
            </div>

            {/* Color Swatch Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cult-muted uppercase">COLOR SHADE:</span>
                <span className="text-cult-text font-bold uppercase">{selectedColor?.name}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-mono border transition-all ${
                      selectedColor?.name === col.name
                        ? 'border-cult-accent bg-cult-surface text-cult-text font-bold ring-1 ring-cult-accent'
                        : 'border-cult-border bg-cult-card text-cult-muted hover:border-cult-muted hover:text-cult-text'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/50" 
                      style={{ backgroundColor: col.hex }} 
                    />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide Modal Trigger */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cult-muted uppercase">SELECT PROPORTION:</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-cult-accent hover:underline flex items-center gap-1 font-bold text-xs font-mono"
                >
                  <Ruler className="w-3.5 h-3.5" /> SIZE MATRIX (CM)
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-12 px-4 text-xs font-mono border flex items-center justify-center transition-all ${
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

            {/* Live Stock Warning */}
            <div className="flex items-center justify-between p-3.5 bg-cult-surface border border-cult-border text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-cult-text font-bold uppercase">STOCK: MILLED & READY TO DISPATCH</span>
              </div>
              <span className="text-cult-accent">3–5 DAYS FREIGHT</span>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-cult-border bg-cult-surface">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-11 h-12 flex items-center justify-center text-cult-text hover:text-cult-accent font-mono text-base"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-bold text-cult-text">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-11 h-12 flex items-center justify-center text-cult-text hover:text-cult-accent font-mono text-base"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-cult-text text-cult-bg py-4 px-6 font-heading text-xs tracking-cult-widest uppercase hover:bg-cult-accent hover:text-black transition-all flex items-center justify-center gap-2 font-bold cursor-pointer"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="w-12 h-12 border border-cult-border bg-cult-surface flex items-center justify-center text-cult-text hover:text-cult-red transition-colors shrink-0"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-cult-red text-cult-red' : ''}`} />
                </button>

                {/* Share Link */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-12 h-12 border border-cult-border bg-cult-surface flex items-center justify-center text-cult-text hover:text-cult-accent transition-colors shrink-0"
                  title="Copy link"
                  aria-label="Share product"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-cult-accent text-black py-4 px-6 font-heading text-xs tracking-cult-widest uppercase hover:bg-white transition-colors font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BUY NOW WITH EXPRESS CHECKOUT — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>
            </div>

            {/* Brand Perks Strip */}
            <div className="pt-4 border-t border-cult-border space-y-2.5 text-xs font-mono text-cult-muted">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-cult-accent shrink-0" />
                <span>Complimentary Express Shipping above ₹1,999 across India.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-cult-accent shrink-0" />
                <span>7-Day Hassle-Free Size Exchange Guaranteed.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cult-accent shrink-0" />
                <span>Heavyweight Durability. Engineered to belong to no one.</span>
              </div>
            </div>

          </div>

        </div>

        {/* ================================================================ */}
        {/* EDITORIAL TABS: Description, Fabric/GSM, Fit, Shipping, Reviews */}
        {/* ================================================================ */}
        <div className="mt-20 sm:mt-28 border-t border-cult-border pt-12">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-cult-border overflow-x-auto no-scrollbar gap-2 sm:gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`pb-4 px-2 text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'details'
                  ? 'border-cult-accent text-cult-accent font-bold'
                  : 'border-transparent text-cult-muted hover:text-cult-text'
              }`}
            >
              DESCRIPTION & SPECS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('material')}
              className={`pb-4 px-2 text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'material'
                  ? 'border-cult-accent text-cult-accent font-bold'
                  : 'border-transparent text-cult-muted hover:text-cult-text'
              }`}
            >
              MATERIAL & GSM ({product.fabric.match(/(\d{3})\s*GSM/i)?.[1] || '320'})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fit')}
              className={`pb-4 px-2 text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'fit'
                  ? 'border-cult-accent text-cult-accent font-bold'
                  : 'border-transparent text-cult-muted hover:text-cult-text'
              }`}
            >
              FIT & SILHOUETTE
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 px-2 text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'shipping'
                  ? 'border-cult-accent text-cult-accent font-bold'
                  : 'border-transparent text-cult-muted hover:text-cult-text'
              }`}
            >
              SHIPPING PROTOCOL
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-2 text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-cult-accent text-cult-accent font-bold'
                  : 'border-transparent text-cult-muted hover:text-cult-text'
              }`}
            >
              REVIEWS ({reviews.length})
            </button>
          </div>

          {/* Tab Panes */}
          <div className="py-8 text-sm text-cult-muted font-sans leading-relaxed max-w-4xl">
            
            {activeTab === 'details' && (
              <div className="space-y-6">
                <p className="text-base text-cult-text leading-relaxed">
                  {product.description}
                </p>
                
                <div>
                  <h4 className="font-editorial text-lg text-cult-text uppercase mb-3 font-bold">
                    TECHNICAL ARCHITECTURAL DETAILS:
                  </h4>
                  <ul className="space-y-2 font-mono text-xs text-cult-muted">
                    {product.details.map((det, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-cult-accent mt-0.5">✦</span>
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'material' && (
              <div className="space-y-6">
                <div className="p-5 bg-cult-surface border border-cult-border space-y-2">
                  <div className="text-[10px] font-mono text-cult-accent uppercase tracking-widest">
                    FABRIC DENSITY
                  </div>
                  <div className="font-editorial text-2xl text-cult-text uppercase font-bold">
                    {product.fabric.match(/(\d{3})\s*GSM/i)?.[1] || '320'} GSM CUSTOM MILLED COTTON
                  </div>
                  <p className="text-xs text-cult-muted">
                    Ring-spun combed yarn with ultra-tight gauge knitting to prevent torque and collar sagging.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-editorial text-lg text-cult-text uppercase font-bold">CARE & LONGEVITY PROTOCOL:</h4>
                  <p className="text-xs font-mono text-cult-muted">
                    • Cold machine wash (below 30°C) with garment turned inside-out.<br />
                    • Do not tumble dry or subject to harsh bleach.<br />
                    • Iron on low reverse if necessary; avoid direct contact with graphic prints.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'fit' && (
              <div className="space-y-4">
                <div className="font-editorial text-xl text-cult-text uppercase font-bold">
                  CUT: {product.fit.toUpperCase()}
                </div>
                <p className="text-sm text-cult-muted">
                  Engineered with an aggressive drop-shoulder, widened chest block, and relaxed armhole proportions. Fits oversized by design. Take your usual size for the intentional UNKNOWN CULT drape, or size down for a conventional tailored fit.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 font-mono text-xs">
                <p>• Standard Express Delivery: 3–5 business days across India.</p>
                <p>• Free shipping applied automatically on all orders above ₹1,999.</p>
                <p>• 7-day hassle-free size exchange window upon receipt.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Review submission form */}
                <form onSubmit={handleSubmitReview} className="p-6 bg-cult-surface border border-cult-border space-y-4">
                  <h4 className="font-editorial text-lg text-cult-text uppercase font-bold">
                    LEAVE DEVOTEE INTEL
                  </h4>
                  {reviewSubmitted ? (
                    <div className="p-3 bg-cult-card border border-cult-accent text-cult-accent text-xs font-mono">
                      INTEL RECORDED. THANK YOU FOR REPORTING BACK TO THE ARCHIVE.
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="YOUR NAME OR MONIKER"
                          value={newReviewAuthor}
                          onChange={e => setNewReviewAuthor(e.target.value)}
                          className="bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text"
                        />
                        <select
                          value={newReviewRating}
                          onChange={e => setNewReviewRating(Number(e.target.value))}
                          className="bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text"
                        >
                          <option value={5}>5 STARS // IMMACULATE</option>
                          <option value={4}>4 STARS // HEAVYWEIGHT</option>
                          <option value={3}>3 STARS // ACCEPTABLE</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="HEADLINE OF YOUR EXPERIENCE"
                        value={newReviewTitle}
                        onChange={e => setNewReviewTitle(e.target.value)}
                        className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text"
                      />
                      <textarea
                        required
                        rows={3}
                        placeholder="PROVIDE INTEL ON FIT, GSM DENSITY, COLLAR RIBBING, AND WEAR..."
                        value={newReviewComment}
                        onChange={e => setNewReviewComment(e.target.value)}
                        className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text"
                      />
                      <button
                        type="submit"
                        className="bg-cult-accent text-black px-6 py-3 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
                      >
                        SUBMIT VERIFIED INTEL
                      </button>
                    </>
                  )}
                </form>

                {/* Review Cards */}
                <div className="space-y-4">
                  {reviews.map(rev => (
                    <div key={rev.id} className="p-5 bg-cult-surface border border-cult-border space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-cult-text font-bold">{rev.author}</span>
                        <span className="text-cult-muted">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <h5 className="font-heading text-sm text-cult-text uppercase">{rev.title}</h5>
                      <p className="text-xs text-cult-muted font-sans leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================================================================ */}
        {/* RELATED PRODUCTS SLIDER                                          */}
        {/* ================================================================ */}
        <div className="mt-16 sm:mt-24">
          <ProductSlider
            tag="SIMILAR SILHOUETTES"
            title="RELATED DISCIPLINE ARTIFACTS"
            subtitle={`More engineered garments from the ${product.category} archive.`}
            products={relatedProducts}
            viewAllLink={`/collections/${product.categorySlug}`}
          />
        </div>

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
