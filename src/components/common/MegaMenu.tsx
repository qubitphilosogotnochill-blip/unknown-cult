import React from 'react';
import { Link } from 'react-router-dom';
import { COLLECTIONS } from '../../data/collections';
import { ArrowRight, Flame, Sparkles, Layers } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-cult-surface/98 backdrop-blur-xl border-b border-cult-border shadow-2xl z-50 animate-fade-in transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Column 1: Shortcuts & Categories (3 cols) */}
          <div className="col-span-3 border-r border-cult-border pr-6 space-y-6">
            <div>
              <div className="text-[10px] tracking-cult-mega uppercase text-cult-muted font-mono mb-3">
                // QUICK ACCESS
              </div>
              <ul className="space-y-2.5">
                <li>
                  <Link 
                    to="/shop" 
                    onClick={onClose}
                    className="flex items-center justify-between text-sm font-semibold tracking-wider hover:text-cult-accent transition-colors py-1 group"
                  >
                    <span>SHOP ALL ARCHIVE</span>
                    <span className="text-xs text-cult-muted group-hover:text-cult-accent group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/new-arrivals" 
                    onClick={onClose}
                    className="flex items-center justify-between text-sm font-semibold tracking-wider text-cult-accent hover:text-cult-accent-hover transition-colors py-1 group"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      NEW ARRIVALS (DROP 08)
                    </span>
                    <span className="text-xs group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/bestsellers" 
                    onClick={onClose}
                    className="flex items-center justify-between text-sm font-semibold tracking-wider hover:text-cult-accent transition-colors py-1 group"
                  >
                    <span className="flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-cult-red" />
                      BESTSELLERS
                    </span>
                    <span className="text-xs text-cult-muted group-hover:text-cult-accent group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/lookbook" 
                    onClick={onClose}
                    className="flex items-center justify-between text-sm font-semibold tracking-wider hover:text-cult-accent transition-colors py-1 group"
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-cult-muted" />
                      SEASON 08 LOOKBOOK
                    </span>
                    <span className="text-xs text-cult-muted group-hover:text-cult-accent group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-cult-border/60">
              <div className="text-[10px] tracking-cult-mega uppercase text-cult-muted font-mono mb-2">
                // MANIFESTO
              </div>
              <p className="text-xs text-cult-muted leading-relaxed font-sans">
                "Not made to fit in. An identity beyond trends. A culture without boundaries."
              </p>
            </div>
          </div>

          {/* Column 2: The 9 Collections Grid (6 cols) */}
          <div className="col-span-6 px-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] tracking-cult-mega uppercase text-cult-muted font-mono">
                // NINE CULT DISCIPLINES
              </span>
              <span className="text-[10px] tracking-widest text-cult-accent uppercase font-mono">
                9 DISCIPLINES
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {COLLECTIONS.map(col => (
                <Link
                  key={col.id}
                  to={`/collections/${col.slug}`}
                  onClick={onClose}
                  className="group relative overflow-hidden bg-cult-card border border-cult-border/80 p-3 hover:border-cult-accent transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-20 overflow-hidden mb-2 bg-cult-bg">
                    <img 
                      src={col.bannerImage} 
                      alt={col.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-85 group-hover:brightness-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1 right-2 text-[9px] font-mono text-cult-accent">
                      {col.productCount} ITEMS
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading text-sm text-cult-text group-hover:text-cult-accent transition-colors leading-tight">
                      {col.name}
                    </h4>
                    <p className="text-[10px] text-cult-muted line-clamp-1 font-sans mt-0.5">
                      {col.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Featured Campaign Card (3 cols) */}
          <div className="col-span-3 border-l border-cult-border pl-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] tracking-cult-mega uppercase text-cult-muted font-mono mb-3">
                // SPOTLIGHT DROP
              </div>
              <div className="relative aspect-[4/5] overflow-hidden group">
                <img 
                  src="/images/hero/uc-hero-04-your-world-your-rules_262bb5b7.webp" 
                  alt="Spotlight Campaign" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono tracking-widest text-cult-accent uppercase mb-1">
                    EDITORIAL CAMPAIGN
                  </span>
                  <h3 className="font-heading text-xl text-white leading-tight mb-2">
                    THE ARCHITECTURE OF DEFIANCE
                  </h3>
                  <Link 
                    to="/collections/street-cult" 
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs text-cult-accent font-semibold tracking-wider hover:text-white transition-colors"
                  >
                    EXPLORE STREET CULT <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
