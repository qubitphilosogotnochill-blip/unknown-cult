import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
    amountNeededForFreeShipping
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
    }
  };

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs
          items={[{ label: 'SHOPPING BAG' }]}
          className="mb-6"
        />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-cult-border pb-6 mb-8 gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-1">
              // CURRENT BAG
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
              SHOPPING BAG ({totalItems})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-mono text-cult-muted hover:text-cult-red transition-colors underline"
            >
              EMPTY BAG
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-cult-surface border border-cult-border p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full border border-cult-border flex items-center justify-center mx-auto text-cult-muted">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-3xl text-cult-text">YOUR SHOPPING BAG IS EMPTY</h2>
            <p className="text-xs text-cult-muted max-w-md mx-auto font-sans">
              You haven't added any artifacts to your bag yet. Discover our latest heavyweight drops and oversized cuts.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-cult-accent text-black px-8 py-3.5 font-heading text-xs tracking-cult-widest uppercase font-bold hover:bg-white transition-colors"
            >
              EXPLORE ALL NINE DISCIPLINES
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            
            {/* Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Strip */}
              <div className="p-4 bg-cult-surface border border-cult-border space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-cult-text">
                    {amountNeededForFreeShipping === 0 ? (
                      <strong className="text-cult-accent">✓ YOU HAVE UNLOCKED FREE EXPRESS SHIPPING ACROSS INDIA</strong>
                    ) : (
                      <span>ADD <strong className="text-cult-accent">₹{amountNeededForFreeShipping}</strong> MORE FOR FREE EXPRESS SHIPPING</span>
                    )}
                  </span>
                  <span className="text-cult-muted">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-cult-card overflow-hidden">
                  <div
                    className="h-full bg-cult-accent transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-cult-border border border-cult-border bg-cult-surface">
                {items.map(item => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-24 h-32 sm:w-28 sm:h-36 bg-cult-card overflow-hidden shrink-0 border border-cult-border"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-mono text-cult-muted uppercase">
                            {item.product.category}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-cult-muted hover:text-cult-red transition-colors p-1"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-heading text-lg sm:text-xl text-cult-text hover:text-cult-accent transition-colors block leading-tight"
                        >
                          {item.product.name}
                        </Link>

                        <div className="flex items-center gap-4 text-xs font-mono text-cult-muted mt-1.5">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-black/50"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>SIZE: <strong className="text-cult-text">{item.selectedSize}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-cult-border/40">
                        {/* Qty */}
                        <div className="flex items-center border border-cult-border bg-cult-card">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-cult-text hover:text-cult-accent font-mono"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-bold text-cult-text">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-cult-text hover:text-cult-accent font-mono"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-heading text-xl text-cult-text">
                            ₹{item.product.price * item.quantity}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] font-mono text-cult-muted block">
                              ₹{item.product.price} each
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs font-mono text-cult-muted hover:text-cult-accent uppercase"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> CONTINUE SHOPPING THE ARCHIVE
                </Link>
              </div>

            </div>

            {/* Order Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 bg-cult-surface border border-cult-border space-y-5">
                <h3 className="font-heading text-xl text-cult-text uppercase pb-3 border-b border-cult-border">
                  ORDER SUMMARY
                </h3>

                {/* Promo Code Form */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1.5">
                    HAVE A DISCOUNT CODE?
                  </label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 bg-cult-card border border-cult-accent/40 text-xs">
                      <span className="flex items-center gap-1.5 text-cult-accent font-mono font-bold">
                        <Tag className="w-3.5 h-3.5" /> '{appliedPromo}' (-₹{discount})
                      </span>
                      <button
                        onClick={removePromoCode}
                        className="text-cult-muted hover:text-cult-text font-mono underline"
                      >
                        REMOVE
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. CULT10"
                        value={inputCode}
                        onChange={e => setInputCode(e.target.value)}
                        className="flex-1 bg-cult-bg border border-cult-border px-3 py-2 text-xs font-mono uppercase text-cult-text focus:outline-none focus:border-cult-accent"
                      />
                      <button
                        type="submit"
                        className="bg-cult-card border border-cult-border px-4 py-2 text-xs font-heading tracking-wider hover:bg-cult-accent hover:text-black transition-colors"
                      >
                        APPLY
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-cult-red font-mono mt-1">{promoError}</p>
                  )}
                </div>

                {/* Summary Lines */}
                <div className="space-y-2.5 text-xs font-mono text-cult-muted pt-2 border-t border-cult-border">
                  <div className="flex justify-between">
                    <span>BAG SUBTOTAL</span>
                    <span className="text-cult-text">₹{subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-cult-accent">
                      <span>CULT DISCOUNT</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>ESTIMATED SHIPPING</span>
                    <span className="text-cult-text">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-cult-text pt-3 border-t border-cult-border font-heading tracking-wider">
                    <span>TOTAL (INR)</span>
                    <span className="text-cult-accent text-2xl">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-cult-accent text-black py-4 px-6 font-heading text-sm tracking-cult-widest uppercase hover:bg-cult-accent-hover transition-colors font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-cult-muted font-mono pt-2 border-t border-cult-border/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-cult-accent" />
                  <span>SECURE 256-BIT ENCRYPTED CHECKOUT</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
