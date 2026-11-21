import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  AlertTriangle, 
  Clock, 
  Eye, 
  Edit3, 
  Save, 
  Download, 
  Search, 
  Filter, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { ALL_CATALOG_PRODUCTS } from '../data/products';
import { Product, ProductApprovalStatus } from '../types';

export const CatalogPreviewPage: React.FC = () => {
  // Local state initialized from master catalog
  const [catalog, setCatalog] = useState<Product[]>(ALL_CATALOG_PRODUCTS);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState<number | ''>('');
  const [editSizes, setEditSizes] = useState<string>('');
  const [editStatus, setEditStatus] = useState<ProductApprovalStatus>('approved');
  const [editCategory, setEditCategory] = useState('');

  // Counts
  const counts = useMemo(() => {
    return {
      total: catalog.length,
      approved: catalog.filter(p => p.status === 'approved' || (!p.status && p.price > 0)).length,
      pending: catalog.filter(p => p.status === 'pending_approval').length,
      flagged: catalog.filter(p => p.status === 'flagged_review').length
    };
  }, [catalog]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return catalog.filter(p => {
      // Status filter
      if (filterStatus === 'approved' && p.status !== 'approved' && (p.status || p.price === 0)) return false;
      if (filterStatus === 'pending' && p.status !== 'pending_approval') return false;
      if (filterStatus === 'flagged' && p.status !== 'flagged_review') return false;

      // Category filter
      if (filterCategory !== 'all' && p.categorySlug !== filterCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesId = p.id.toLowerCase().includes(q);
        const matchesSku = p.sku?.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesSku && !matchesCategory) return false;
      }

      return true;
    });
  }, [catalog, filterStatus, filterCategory, searchQuery]);

  // Handle Quick Approve
  const handleApprove = (productId: string) => {
    setCatalog(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          status: 'approved',
          requiresApproval: false,
          isDraftPrice: false,
          missingFields: p.missingFields?.filter(f => f !== 'price' && f !== 'sizes') || []
        };
      }
      return p;
    }));

    setSuccessNotice(`Approved product "${productId}". Published to active catalogue!`);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  // Open Edit Modal
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditTagline(product.tagline || '');
    setEditPrice(product.price || 0);
    setEditOriginalPrice(product.originalPrice || '');
    setEditSizes((product.sizes || []).join(', '));
    setEditStatus(product.status || 'approved');
    setEditCategory(product.categorySlug);
  };

  // Save Modal Edits
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const parsedSizes = editSizes
      .split(',')
      .map(s => s.trim().toUpperCase())
      .filter(Boolean);

    setCatalog(prev => prev.map(p => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          name: editName.toUpperCase(),
          tagline: editTagline,
          price: Number(editPrice),
          originalPrice: editOriginalPrice ? Number(editOriginalPrice) : undefined,
          isDraftPrice: false,
          sizes: parsedSizes.length > 0 ? parsedSizes : p.sizes,
          status: editStatus,
          requiresApproval: editStatus !== 'approved',
          missingFields: []
        };
      }
      return p;
    }));

    setEditingProduct(null);
    setSuccessNotice(`Updated product "${editingProduct.id}".`);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  // Download Catalog JSON
  const handleDownloadCatalogJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(catalog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "products.catalog.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12 select-none">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-6 border-b border-cult-border gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>ATELIER CONTROL // PRODUCT CATALOGUE MANAGER</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-cult-text leading-[0.9]">
              CATALOGUE APPROVAL PREVIEW.
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
              Review and inspect newly imported products from Google Flow before publishing. Only products marked as <strong className="text-emerald-400 font-mono">APPROVED</strong> are visible to public shoppers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadCatalogJson}
              className="bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-cult-accent" />
              <span>DOWNLOAD CATALOG.JSON</span>
            </button>
            <Link
              to="/shop"
              className="bg-cult-text text-cult-bg hover:bg-cult-accent hover:text-black px-6 py-3 font-heading text-xs uppercase tracking-cult-widest font-bold transition-all flex items-center gap-2"
            >
              <span>VIEW LIVE STORE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Success Notice */}
        {successNotice && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 font-mono text-xs flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Metrics Status Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 bg-cult-surface border border-cult-border space-y-1">
            <span className="text-cult-muted uppercase tracking-wider block">TOTAL CATALOG RECORDS</span>
            <span className="font-editorial text-2xl sm:text-3xl font-bold text-cult-text block">
              {counts.total}
            </span>
            <span className="text-[10px] text-cult-muted">Centralized single source</span>
          </div>

          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 uppercase tracking-wider block">LIVE APPROVED PRODUCTS</span>
            <span className="font-editorial text-2xl sm:text-3xl font-bold text-emerald-300 block">
              {counts.approved}
            </span>
            <span className="text-[10px] text-emerald-400/80">Active in public customer store</span>
          </div>

          <div className="p-4 bg-amber-950/20 border border-amber-500/30 space-y-1">
            <span className="text-amber-400 uppercase tracking-wider block">PENDING YOUR APPROVAL</span>
            <span className="font-editorial text-2xl sm:text-3xl font-bold text-amber-300 block">
              {counts.pending}
            </span>
            <span className="text-[10px] text-amber-400/80">🔒 Hidden from store until approved</span>
          </div>

          <div className="p-4 bg-rose-950/20 border border-rose-500/30 space-y-1">
            <span className="text-rose-400 uppercase tracking-wider block">FLAGGED FOR IMAGE REVIEW</span>
            <span className="font-editorial text-2xl sm:text-3xl font-bold text-rose-300 block">
              {counts.flagged}
            </span>
            <span className="text-[10px] text-rose-400/80">⚠️ Ambiguous angle relationship</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-cult-surface border border-cult-border">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-mono uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 border transition-all ${
                filterStatus === 'all'
                  ? 'border-cult-accent bg-cult-accent text-black font-bold'
                  : 'border-cult-border text-cult-muted hover:text-cult-text'
              }`}
            >
              ALL ({counts.total})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 border transition-all ${
                filterStatus === 'pending'
                  ? 'border-amber-400 bg-amber-400 text-black font-bold'
                  : 'border-cult-border text-amber-400/90 hover:text-amber-300'
              }`}
            >
              PENDING ({counts.pending})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('flagged')}
              className={`px-3 py-1.5 border transition-all ${
                filterStatus === 'flagged'
                  ? 'border-rose-400 bg-rose-400 text-black font-bold'
                  : 'border-cult-border text-rose-400/90 hover:text-rose-300'
              }`}
            >
              FLAGGED ({counts.flagged})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1.5 border transition-all ${
                filterStatus === 'approved'
                  ? 'border-emerald-400 bg-emerald-400 text-black font-bold'
                  : 'border-cult-border text-emerald-400/90 hover:text-emerald-300'
              }`}
            >
              APPROVED ({counts.approved})
            </button>
          </div>

          {/* Search & Category Selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH ID, NAME, SKU..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-cult-bg border border-cult-border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-cult-text placeholder-cult-muted/50 w-56 focus:outline-none focus:border-cult-accent"
              />
              <Search className="w-3.5 h-3.5 text-cult-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-cult-bg border border-cult-border px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-cult-text focus:outline-none cursor-pointer"
            >
              <option value="all">ALL CATEGORIES</option>
              <option value="gym-cult">GYM CULT</option>
              <option value="daily-essentials">DAILY ESSENTIALS</option>
              <option value="street-cult">STREET CULT</option>
              <option value="baggy-utility">BAGGY & UTILITY</option>
              <option value="hood-cult">HOOD CULT</option>
              <option value="shirt-society">SHIRT SOCIETY</option>
              <option value="co-ord-cult">CO-ORD CULT</option>
              <option value="outer-cult">OUTER CULT</option>
              <option value="cult-accessories">CULT ACCESSORIES</option>
            </select>
          </div>

        </div>

        {/* Product Catalogue Grid */}
        <div className="space-y-6">
          <div className="text-xs font-mono text-cult-muted uppercase flex items-center justify-between">
            <span>SHOWING {filteredProducts.length} CATALOG RECORDS</span>
            <span>UNAPPROVED PRODUCTS ARE HIDDEN FROM LIVE SHOPPERS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const isApproved = product.status === 'approved' || (!product.status && product.price > 0);
              const isFlagged = product.status === 'flagged_review';
              const isPending = product.status === 'pending_approval';

              return (
                <div
                  key={product.id}
                  className={`bg-cult-surface border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isApproved 
                      ? 'border-cult-border hover:border-cult-accent/70' 
                      : isFlagged 
                        ? 'border-rose-500/60 bg-rose-950/10' 
                        : 'border-amber-500/60 bg-amber-950/10'
                  }`}
                >
                  {/* Top Status & ID Bar */}
                  <div className="p-3 bg-black/40 border-b border-cult-border flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cult-muted uppercase truncate max-w-[180px]">
                      ID: {product.id}
                    </span>

                    {isApproved && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold uppercase flex items-center gap-1">
                        <Check className="w-3 h-3" /> LIVE APPROVED
                      </span>
                    )}

                    {isPending && (
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase flex items-center gap-1">
                        <Clock className="w-3 h-3" /> PENDING APPROVAL
                      </span>
                    )}

                    {isFlagged && (
                      <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold uppercase flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> REVIEW IMAGES
                      </span>
                    )}
                  </div>

                  {/* Multi-angle Gallery Preview */}
                  <div className="p-4 space-y-3">
                    
                    {/* Main Image */}
                    <div className="relative aspect-[4/5] bg-cult-card border border-cult-border overflow-hidden group">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono text-cult-accent uppercase tracking-widest border border-white/10">
                        {product.imageAngles?.[0]?.angle?.toUpperCase() || 'FRONT VIEW'}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono text-white/70">
                        {product.images.length} TOTAL ANGLE(S)
                      </div>
                    </div>

                    {/* Secondary Angle Thumbnails */}
                    {product.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {product.images.map((img, idx) => {
                          const angleTag = product.imageAngles?.[idx]?.angle || `Angle ${idx + 1}`;
                          return (
                            <div key={idx} className="relative aspect-[3/4] bg-cult-card border border-cult-border overflow-hidden">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 inset-x-1 text-center bg-black/85 text-[8px] font-mono text-cult-accent uppercase truncate px-0.5">
                                {angleTag}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Metadata Specs */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-cult-muted uppercase">
                        <span className="text-cult-accent font-bold">{product.category}</span>
                        <span>SKU: {product.sku}</span>
                      </div>

                      <h3 className="font-editorial text-base sm:text-lg font-bold uppercase tracking-tight text-cult-text leading-snug line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-xs text-cult-muted font-sans line-clamp-2 leading-relaxed">
                        {product.tagline || product.description}
                      </p>

                      {/* Price Matrix */}
                      <div className="flex items-baseline gap-2 pt-1 font-mono text-xs">
                        {product.isDraftPrice || product.price === 0 || product.price === null ? (
                          <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 border border-amber-400/30">
                            ⚠️ DRAFT: PRICE NOT SET
                          </span>
                        ) : (
                          <>
                            <span className="text-cult-text font-bold text-sm">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-cult-muted line-through text-[11px]">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Sizes */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {product.sizes.length === 0 ? (
                          <span className="text-amber-400/90 text-[10px] font-mono bg-amber-400/10 px-2 py-0.5 border border-amber-400/30">
                            ⚠️ SIZES PENDING APPROVAL
                          </span>
                        ) : (
                          product.sizes.map(s => (
                            <span key={s} className="px-1.5 py-0.5 bg-cult-card border border-cult-border text-[9px] font-mono text-cult-text">
                              {s}
                            </span>
                          ))
                        )}
                      </div>

                      {/* Missing Fields Warning */}
                      {product.missingFields && product.missingFields.length > 0 && (
                        <div className="pt-1 text-[9px] font-mono text-amber-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          <span className="truncate">Missing: {product.missingFields.join(', ')}</span>
                        </div>
                      )}

                    </div>

                  </div>

                  {/* Card Actions Toolbar */}
                  <div className="p-3 bg-black/30 border-t border-cult-border flex items-center justify-between gap-2">
                    
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        className="px-3 py-1.5 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        title="Edit product name, price, sizes, specs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>EDIT</span>
                      </button>

                      <Link
                        to={`/product/${product.id}`}
                        className="px-3 py-1.5 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        title="Preview live customer detail page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>PREVIEW</span>
                      </Link>
                    </div>

                    {!isApproved ? (
                      <button
                        type="button"
                        onClick={() => handleApprove(product.id)}
                        className="px-3 py-1.5 bg-emerald-500 text-black hover:bg-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>APPROVE</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase px-2">
                        LIVE IN STORE
                      </span>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Quick Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cult-surface border border-cult-border max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-cult-border">
              <div>
                <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
                  EDIT CATALOGUE RECORD
                </span>
                <h3 className="font-editorial text-xl text-cult-text uppercase font-bold">
                  {editingProduct.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-cult-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-mono">
              
              <div className="space-y-1">
                <label className="text-cult-muted uppercase block">Product Name (Editorial Title):</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-cult-bg border border-cult-border p-3 text-cult-text uppercase font-bold focus:border-cult-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-cult-muted uppercase block">Tagline / Fabric Callout:</label>
                <input
                  type="text"
                  value={editTagline}
                  onChange={e => setEditTagline(e.target.value)}
                  className="w-full bg-cult-bg border border-cult-border p-3 text-cult-text focus:border-cult-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-cult-muted uppercase block">Price (INR ₹):</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editPrice}
                    onChange={e => setEditPrice(Number(e.target.value))}
                    className="w-full bg-cult-bg border border-cult-border p-3 text-cult-text font-bold focus:border-cult-accent focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cult-muted uppercase block">Original Price (Strike-through ₹):</label>
                  <input
                    type="number"
                    min={0}
                    value={editOriginalPrice}
                    onChange={e => setEditOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Optional comparison price"
                    className="w-full bg-cult-bg border border-cult-border p-3 text-cult-text focus:border-cult-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-cult-muted uppercase block">Available Sizes (Comma-separated, e.g. S, M, L, XL):</label>
                <input
                  type="text"
                  required
                  value={editSizes}
                  onChange={e => setEditSizes(e.target.value)}
                  placeholder="S, M, L, XL, XXL"
                  className="w-full bg-cult-bg border border-cult-border p-3 text-cult-text uppercase focus:border-cult-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-cult-muted uppercase block">Approval Status:</label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as ProductApprovalStatus)}
                  className="w-full bg-cult-bg border border-cult-border p-3 text-cult-text font-bold uppercase focus:border-cult-accent focus:outline-none cursor-pointer"
                >
                  <option value="approved">APPROVED // PUBLISH TO PUBLIC STORE</option>
                  <option value="pending_approval">PENDING APPROVAL // HIDE FROM PUBLIC STORE</option>
                  <option value="flagged_review">FLAGGED FOR REVIEW // UNCERTAIN IMAGE PAIRING</option>
                </select>
              </div>

              <div className="pt-4 border-t border-cult-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 bg-cult-bg border border-cult-border text-cult-muted hover:text-white text-xs font-mono uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-cult-accent text-black font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE PRODUCT RECORD</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
