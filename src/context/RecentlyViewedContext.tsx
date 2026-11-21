import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface RecentlyViewedContextType {
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('uc_recently_viewed');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        return ids.map(id => PRODUCTS.find(p => p.id === id)).filter((p): p is Product => !!p);
      }
    } catch {
      // fallback
    }
    // Default preview if empty
    return PRODUCTS.slice(0, 6);
  });

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('uc_recently_viewed', JSON.stringify(updated.map(p => p.id)));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = (): RecentlyViewedContextType => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
