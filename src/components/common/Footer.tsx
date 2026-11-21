import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { COLLECTIONS } from '../../data/collections';
import { InstagramIcon, TwitterIcon, YoutubeIcon } from './Icons';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cult-bg border-t border-cult-border text-cult-text select-none transition-colors duration-300">
      
      {/* Editorial Monochromatic Perks Strip */}
      <div className="border-b border-cult-border/70 py-10 px-4 sm:px-8">
        <div className="max-w-[1720px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cult-accent tracking-widest uppercase font-bold block">
              SPEC 01 // FREIGHT
            </span>
            <h4 className="font-editorial text-sm sm:text-base text-cult-text uppercase font-bold">
              DOMESTIC COMPLIMENTARY
            </h4>
            <p className="text-xs text-cult-muted font-sans">
              Free tracked shipping across India on orders over ₹1,999.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cult-accent tracking-widest uppercase font-bold block">
              SPEC 02 // EXCHANGES
            </span>
            <h4 className="font-editorial text-sm sm:text-base text-cult-text uppercase font-bold">
              7-DAY ATELIER SWAP
            </h4>
            <p className="text-xs text-cult-muted font-sans">
              Seamless size exchanges with pre-paid courier pickups.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cult-accent tracking-widest uppercase font-bold block">
              SPEC 03 // WEIGHT
            </span>
            <h4 className="font-editorial text-sm sm:text-base text-cult-text uppercase font-bold">
              280–500 GSM COTTON
            </h4>
            <p className="text-xs text-cult-muted font-sans">
              Architectural heavy French fleece & dense combed jersey.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cult-accent tracking-widest uppercase font-bold block">
              SPEC 04 // PROTOCOL
            </span>
            <h4 className="font-editorial text-sm sm:text-base text-cult-text uppercase font-bold">
              ENCRYPTED SETTLEMENT
            </h4>
            <p className="text-xs text-cult-muted font-sans">
              UPI, credit cards, debit cards, net banking, and COD.
            </p>
          </div>

        </div>
      </div>

      {/* Main Footer Links — Minimal, Spacious and Monochromatic */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-10 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Manifesto & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo size="lg" showTagline={true} />
            
            <p className="text-xs sm:text-sm text-cult-muted font-sans leading-relaxed max-w-md">
              UNKNOWN CULT is an independent underground fashion label. We engineer oversized silhouettes, dense washed fabrics, and brutalist aesthetics for those who navigate life under their own sovereignty.
            </p>

            <div className="space-y-2 font-mono text-[11px] text-cult-muted uppercase">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cult-accent" />
                <span>ATELIER: NEW DELHI — TOKYO</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cult-accent" />
                <a href="mailto:unknowncult1122@gmail.com" className="text-cult-text hover:text-cult-accent transition-colors font-mono">
                  unknowncult1122@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cult-accent" />
                <a href="tel:+919318422195" className="text-cult-text hover:text-cult-accent transition-colors font-mono">
                  +91 9318422195
                </a>
                <span className="text-cult-border">|</span>
                <a 
                  href="https://wa.me/919318422195" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-cult-accent hover:underline flex items-center gap-1 font-mono"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </a>
              </div>
              <div>MANIFESTO: <span className="text-cult-accent font-bold">BELONG TO NO ONE.</span></div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 bg-cult-surface border border-cult-border hover:border-cult-accent text-cult-text hover:text-cult-accent flex items-center justify-center transition-colors"
                aria-label="Youtube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Disciplines (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
              // DISCIPLINES
            </div>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
              {COLLECTIONS.map(col => (
                <li key={col.id}>
                  <Link 
                    to={`/collections/${col.slug}`} 
                    className="text-cult-muted hover:text-cult-accent transition-colors flex items-center justify-between group"
                  >
                    <span>{col.name}</span>
                    <span className="text-[10px] text-cult-muted/50 group-hover:text-cult-accent">
                      0{col.productCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Archive & Information (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
              // EXPLORE
            </div>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
              <li>
                <Link to="/new-arrivals" className="text-cult-muted hover:text-cult-accent transition-colors">
                  NEW ARRIVALS
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-cult-muted hover:text-cult-accent transition-colors">
                  BESTSELLERS
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="text-cult-muted hover:text-cult-accent transition-colors">
                  LOOKBOOK ARCHIVE
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cult-muted hover:text-cult-accent transition-colors">
                  BRAND MANIFESTO
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-cult-muted hover:text-cult-accent transition-colors">
                  SIZE & FIT GUIDE
                </Link>
              </li>
              <li>
                <Link to="/catalog-preview" className="text-cult-accent font-bold hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[10px]">✦</span> CATALOGUE MANAGER
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
              // CLIENT CARE
            </div>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
              <li>
                <Link to="/track-order" className="text-cult-muted hover:text-cult-accent transition-colors">
                  TRACK DISPATCH
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-cult-muted hover:text-cult-accent transition-colors">
                  RETURNS & EXCHANGES
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-cult-muted hover:text-cult-accent transition-colors">
                  SHIPPING PROTOCOL
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-cult-muted hover:text-cult-accent transition-colors">
                  INTEL / FAQS
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cult-muted hover:text-cult-accent transition-colors">
                  SECURE CONTACT
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Monochromatic Copyright & Legal Bar */}
        <div className="mt-16 pt-8 border-t border-cult-border/70 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-cult-muted gap-4">
          <div>
            © {new Date().getFullYear()} UNKNOWN CULT ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6 text-[10px] tracking-wider uppercase">
            <Link to="/privacy" className="hover:text-cult-accent transition-colors">
              PRIVACY POLICY
            </Link>
            <Link to="/terms" className="hover:text-cult-accent transition-colors">
              TERMS OF DISPATCH
            </Link>
            <span className="text-cult-accent">BELONG TO NO ONE</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
