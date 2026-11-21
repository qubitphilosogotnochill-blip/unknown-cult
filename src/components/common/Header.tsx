import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Flame,
  Sparkles
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { MegaMenu } from './MegaMenu';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { COLLECTIONS } from '../../data/collections';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-[11px] xl:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 py-1.5 px-3.5 rounded-full flex items-center gap-1 ${
      isActive 
        ? 'border border-white/50 bg-white/10 text-white font-bold shadow-sm' 
        : 'text-white/80 hover:text-white hover:bg-white/5 border border-transparent'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/85 backdrop-blur-lg border-b border-white/15 shadow-xl py-3' 
            : 'bg-black/60 backdrop-blur-md border-b border-white/10 py-3.5'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <BrandLogo size="md" inPill={true} />
          </div>

          {/* CENTER: Desktop Navigation matching Screenshot 3 */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <NavLink to="/" className={navItemClass}>
              HOME
            </NavLink>

            {/* SHOP WITH MEGA MENU TRIGGER */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button 
                onClick={() => setIsMegaMenuOpen(prev => !prev)}
                className={`text-[11px] xl:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 py-1.5 px-3.5 rounded-full flex items-center gap-1 cursor-pointer border border-transparent ${
                  isMegaMenuOpen ? 'border-white/40 bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={isMegaMenuOpen}
              >
                SHOP
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-white' : ''}`} />
              </button>
            </div>

            <NavLink to="/collections/gym-cult" className={navItemClass}>
              GYMWEAR
            </NavLink>

            <NavLink to="/collections/street-cult" className={navItemClass}>
              STREETWEAR
            </NavLink>

            <NavLink to="/collections/daily-essentials" className={navItemClass}>
              DAILYWEAR
            </NavLink>

            <NavLink to="/shop" className={navItemClass}>
              COLLECTIONS
            </NavLink>

            <NavLink to="/about" className={navItemClass}>
              ABOUT
            </NavLink>
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-cult-text hover:text-cult-accent transition-colors rounded-full"
              aria-label="Search catalog"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Link */}
            <Link
              to="/account"
              className="p-2 text-cult-text hover:text-cult-accent transition-colors rounded-full hidden sm:flex"
              aria-label="Customer Account"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Link with counter */}
            <Link
              to="/wishlist"
              className="relative p-2 text-cult-text hover:text-cult-accent transition-colors rounded-full"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-cult-accent text-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Shopping Bag Trigger with animated counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-cult-text hover:text-cult-accent transition-colors rounded-full"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-cult-accent text-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-cult-text hover:text-cult-accent transition-colors rounded-full"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-cult-accent" />
              ) : (
                <Moon className="w-5 h-5 text-cult-accent" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-2 text-cult-text hover:text-cult-accent transition-colors lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* DESKTOP MEGA MENU */}
      <MegaMenu 
        isOpen={isMegaMenuOpen} 
        onClose={() => setIsMegaMenuOpen(false)} 
      />

      {/* MOBILE FULL-SCREEN / SLIDE-OUT PANEL */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-cult-bg z-50 flex flex-col justify-between overflow-y-auto p-6 border-t border-cult-border animate-fade-in lg:hidden">
          <div className="space-y-6">
            
            {/* Quick Search Bar inside Mobile Menu */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between p-3.5 bg-cult-surface border border-cult-border text-cult-muted text-xs font-mono tracking-wider"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cult-accent" /> SEARCH THE ARCHIVE...
              </span>
              <span className="text-[10px] bg-cult-card px-2 py-0.5 border border-cult-border text-cult-text">TAP</span>
            </button>

            {/* Primary Mobile Links */}
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-2xl text-cult-text hover:text-cult-accent transition-colors flex items-center justify-between"
              >
                <span>HOME</span>
                <span className="text-sm font-sans text-cult-muted">01</span>
              </Link>

              {/* Collections Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileCollectionsOpen(prev => !prev)}
                  className="w-full font-heading text-2xl text-cult-text hover:text-cult-accent transition-colors flex items-center justify-between py-1"
                >
                  <span>SHOP COLLECTIONS</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileCollectionsOpen ? 'rotate-180 text-cult-accent' : ''}`} />
                </button>

                {isMobileCollectionsOpen && (
                  <div className="mt-3 pl-3 border-l-2 border-cult-accent/40 space-y-2.5 animate-fade-in">
                    <Link
                      to="/shop"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-xs font-bold text-cult-accent tracking-widest uppercase py-1"
                    >
                      → ALL 9 ARCHIVES
                    </Link>
                    <Link
                      to="/new-arrivals"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-xs font-semibold text-cult-text hover:text-cult-accent py-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cult-accent" /> NEW ARRIVALS
                    </Link>
                    <Link
                      to="/bestsellers"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-xs font-semibold text-cult-text hover:text-cult-accent py-1"
                    >
                      <Flame className="w-3.5 h-3.5 text-cult-red" /> BESTSELLERS
                    </Link>
                    {COLLECTIONS.map(c => (
                      <Link
                        key={c.id}
                        to={`/collections/${c.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-xs text-cult-muted hover:text-cult-text py-1"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/collections/gym-cult"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-2xl text-cult-text hover:text-cult-accent transition-colors flex items-center justify-between"
              >
                <span>GYMWEAR</span>
                <span className="text-sm font-sans text-cult-muted">02</span>
              </Link>

              <Link
                to="/collections/street-cult"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-2xl text-cult-text hover:text-cult-accent transition-colors flex items-center justify-between"
              >
                <span>STREETWEAR</span>
                <span className="text-sm font-sans text-cult-muted">03</span>
              </Link>

              <Link
                to="/collections/daily-essentials"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-2xl text-cult-text hover:text-cult-accent transition-colors flex items-center justify-between"
              >
                <span>DAILYWEAR</span>
                <span className="text-sm font-sans text-cult-muted">04</span>
              </Link>

              <Link
                to="/lookbook"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-2xl text-cult-text hover:text-cult-accent transition-colors flex items-center justify-between"
              >
                <span>LOOKBOOK</span>
                <span className="text-sm font-sans text-cult-muted">05</span>
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-2xl text-cult-text hover:text-cult-accent transition-colors flex items-center justify-between"
              >
                <span>ABOUT US</span>
                <span className="text-sm font-sans text-cult-muted">06</span>
              </Link>

              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-2xl text-cult-text hover:text-cult-accent transition-colors flex items-center justify-between pt-2 border-t border-cult-border"
              >
                <span>MY ACCOUNT</span>
                <ArrowRight className="w-4 h-4 text-cult-accent" />
              </Link>
            </nav>

          </div>

          {/* Mobile Menu Footer */}
          <div className="pt-6 border-t border-cult-border space-y-4">
            <div className="flex items-center justify-between text-xs text-cult-muted">
              <span>THEME: {theme.toUpperCase()}</span>
              <button 
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-cult-text font-bold uppercase tracking-wider bg-cult-surface px-3 py-1.5 border border-cult-border"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-cult-accent" /> : <Moon className="w-3.5 h-3.5 text-cult-accent" />}
                SWITCH
              </button>
            </div>
            <div className="text-[10px] text-cult-muted font-mono tracking-widest text-center">
              UNKNOWN CULT // BELONG TO NO ONE
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
