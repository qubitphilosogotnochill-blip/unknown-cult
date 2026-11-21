import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const AnnouncementBar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <div className="bg-black/80 border-b border-white/10 text-white/70 py-1.5 px-4 sm:px-6 lg:px-10 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase select-none transition-colors duration-300">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between">
        {/* LEFT: Promotion */}
        <div className="flex items-center gap-2">
          <span className="text-white/90 font-medium">FREE SHIPPING ON ORDERS ABOVE ₹2000</span>
        </div>

        {/* RIGHT: Quick Links matching Screenshot 3 */}
        <div className="hidden sm:flex items-center gap-4 text-white/60">
          <Link 
            to="/track-order" 
            className="hover:text-white transition-colors"
          >
            TRACK ORDER
          </Link>
          <span className="text-white/20">|</span>
          <Link 
            to="/login" 
            className="hover:text-white transition-colors"
          >
            LOGIN / SIGN UP
          </Link>
          <span className="text-white/20">|</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-white/80" />
            <span className="font-mono text-white/90">{totalItems}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
