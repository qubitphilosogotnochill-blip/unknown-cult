import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
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

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cult-bg border-l border-cult-border flex flex-col justify-between shadow-2xl animate-fade-in">
          
          {/* Header */}
          <div className="p-6 border-b border-cult-border flex items-center justify-between bg-cult-surface">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cult-accent" />
              <h2 className="font-heading text-xl tracking-wider text-cult-text">
                SHOPPING BAG <span className="text-sm font-sans text-cult-muted font-normal">({totalItems})</span>
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-cult-muted hover:text-cult-text transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-cult-card/60 px-6 py-3 border-b border-cult-border">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-cult-text">
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-cult-accent font-bold">✓ YOU HAVE UNLOCKED FREE EXPRESS SHIPPING</span>
                ) : (
                  <span>ADD <strong className="text-cult-accent">₹{amountNeededForFreeShipping}</strong> MORE FOR FREE EXPRESS SHIPPING</span>
                )}
              </span>
              <span className="text-cult-muted">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-cult-border overflow-hidden">
              <div 
                className="h-full bg-cult-accent transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full border border-cult-border flex items-center justify-center text-cult-muted">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-cult-text">YOUR BAG IS EMPTY</h3>
                  <p className="text-xs text-cult-muted mt-1 max-w-xs">
                    Your wardrobe is waiting. Explore the newest drops and underground silhouettes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-cult-text text-cult-bg px-6 py-3 text-xs font-heading tracking-cult-widest uppercase hover:bg-cult-accent hover:text-black transition-colors"
                >
                  EXPLORE ARCHIVE
                </button>
              </div>
            ) : (
              items.map(item => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3 bg-cult-surface border border-cult-border group"
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-24 shrink-0 bg-cult-card overflow-hidden"
                  >
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-heading text-sm text-cult-text hover:text-cult-accent transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-cult-muted hover:text-cult-red transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-cult-muted mt-1 font-mono">
                        <span className="flex items-center gap-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full inline-block border border-cult-border" 
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                        <span>•</span>
                        <span>SIZE: {item.selectedSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-cult-border bg-cult-card">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-cult-accent transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-semibold text-cult-text">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-cult-accent transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-heading text-sm text-cult-text">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-cult-border bg-cult-surface space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-cult-card border border-cult-accent/40 text-xs">
                    <span className="flex items-center gap-1.5 text-cult-accent font-mono font-bold">
                      <Tag className="w-3.5 h-3.5" /> CODE '{appliedPromo}' APPLIED (-₹{discount})
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
                      placeholder="PROMO CODE (e.g. CULT10)"
                      value={inputCode}
                      onChange={e => setInputCode(e.target.value)}
                      className="flex-1 bg-cult-bg border border-cult-border px-3 py-2 text-xs font-mono uppercase tracking-wider text-cult-text placeholder-cult-muted focus:outline-none focus:border-cult-accent"
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

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-cult-muted font-mono pt-1">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-cult-text">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-cult-accent">
                    <span>DISCOUNT</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>SHIPPING</span>
                  <span className="text-cult-text">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-cult-text pt-2 border-t border-cult-border font-heading tracking-wider">
                  <span>TOTAL (INR)</span>
                  <span className="text-cult-accent text-lg">₹{finalTotal}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-cult-accent text-black py-3.5 px-4 font-heading text-sm tracking-cult-widest uppercase hover:bg-cult-accent-hover transition-colors flex items-center justify-center gap-2 font-bold cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center py-2 text-xs font-heading tracking-widest text-cult-muted hover:text-cult-text transition-colors"
                >
                  VIEW FULL SHOPPING BAG
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-cult-muted font-mono pt-1 border-t border-cult-border/60">
                <ShieldCheck className="w-3.5 h-3.5 text-cult-accent" />
                <span>OFFICIAL VERIFIED CHECKOUT // 7-DAY EXCHANGE</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
