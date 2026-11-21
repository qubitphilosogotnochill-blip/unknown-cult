import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, ProductColor } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
  promoCode: string;
  appliedPromo: string | null;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1999;
const STANDARD_SHIPPING_FEE = 149;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('uc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    return localStorage.getItem('uc_promo') || null;
  });
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('uc_cart', JSON.stringify(items));
    } catch {
      // storage quota or private mode
    }
  }, [items]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem('uc_promo', appliedPromo);
    } else {
      localStorage.removeItem('uc_promo');
    }
  }, [appliedPromo]);

  const addToCart = (product: Product, size: string, color: ProductColor, quantity: number = 1) => {
    const itemId = `${product.id}-${color.name}-${size}`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { id: itemId, product, selectedColor: color, selectedSize: size, quantity }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev => prev.map(item => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Promo code calculation
  let discount = 0;
  if (appliedPromo === 'CULT10') {
    discount = Math.round(subtotal * 0.10);
  } else if (appliedPromo === 'DROP20') {
    discount = Math.round(subtotal * 0.20);
  } else if (appliedPromo === 'BELONG500' && subtotal >= 2500) {
    discount = 500;
  }

  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const applyPromoCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    setPromoCode(trimmed);
    if (trimmed === 'CULT10') {
      setAppliedPromo('CULT10');
      setPromoError(null);
      return true;
    } else if (trimmed === 'DROP20') {
      setAppliedPromo('DROP20');
      setPromoError(null);
      return true;
    } else if (trimmed === 'BELONG500') {
      if (subtotal < 2500) {
        setPromoError('BELONG500 requires minimum order of ₹2,500');
        return false;
      }
      setAppliedPromo('BELONG500');
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid discount code. Try CULT10 or DROP20');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discount,
        shippingFee,
        finalTotal,
        promoCode,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
