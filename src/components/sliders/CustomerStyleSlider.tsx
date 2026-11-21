import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';

interface StyleShot {
  id: string;
  handle: string;
  location: string;
  image: string;
  taggedPiece: string;
  productId: string;
}

const STYLE_SHOTS: StyleShot[] = [
  {
    id: 'shot-01',
    handle: '@kavya.street',
    location: 'Bandra, Mumbai',
    image: '/images/lookbook/uc-lookbook-08_42f253bf.webp',
    taggedPiece: 'ANARCHY PROTOCOL DISTRESSED TEE',
    productId: 'uc-street-01'
  },
  {
    id: 'shot-02',
    handle: '@aarav.iron',
    location: 'Hauz Khas, New Delhi',
    image: '/images/lookbook/uc-lookbook-09_624c821c.webp',
    taggedPiece: 'HEAVYWEIGHT OVERSIZED PUMP COVER TEE',
    productId: 'uc-gym-01'
  },
  {
    id: 'shot-03',
    handle: '@dev.monolith',
    location: 'CyberCity, Gurugram',
    image: '/images/lookbook/uc-lookbook-10_d0f4f716.webp',
    taggedPiece: 'MULTI-POCKET CARGO PANTS',
    productId: 'uc-baggy-01'
  },
  {
    id: 'shot-04',
    handle: '@zara.noir',
    location: 'Koregaon Park, Pune',
    image: '/images/lookbook/uc-lookbook-11_86469adf.webp',
    taggedPiece: 'FORTRESS 500 GSM HEAVYWEIGHT HOODIE',
    productId: 'uc-hood-01'
  },
  {
    id: 'shot-05',
    handle: '@rohan.cuts',
    location: 'Jubilee Hills, Hyderabad',
    image: '/images/lookbook/uc-lookbook-12_d44afb62.webp',
    taggedPiece: 'HEAVY CUBAN COLLAR LINEN SHIRT',
    productId: 'uc-shirt-01'
  },
  {
    id: 'shot-06',
    handle: '@ishaan.raw',
    location: 'Hauz Khas, New Delhi',
    image: '/images/hero/uc-hero-09-own-your-frequency_509014aa.webp',
    taggedPiece: 'TACTICAL MA-1 BOMBER JACKET',
    productId: 'uc-outer-01'
  }
];

export const CustomerStyleSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-cult-bg border-b border-cult-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cult-border gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-1">
              // COMMUNITY GALLERY
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cult-text leading-none uppercase">
              DEVOTEE STYLING // #UNKNOWNCULT
            </h2>
            <p className="text-xs sm:text-sm text-cult-muted font-sans mt-1">
              Worn in the underground. Tag @unknowncult on Instagram to be archived.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 bg-cult-surface border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-accent hover:border-cult-accent transition-colors"
              aria-label="Previous customer photos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 bg-cult-surface border border-cult-border flex items-center justify-center text-cult-text hover:text-cult-accent hover:border-cult-accent transition-colors"
              aria-label="Next customer photos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-5 overflow-x-auto no-scrollbar scroll-smooth py-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {STYLE_SHOTS.map(shot => (
            <div
              key={shot.id}
              className="shrink-0 w-[72%] sm:w-[42%] lg:w-[23.5%]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="group relative aspect-[3/4] overflow-hidden bg-cult-surface border border-cult-border hover:border-cult-accent transition-all duration-300">
                <img
                  src={shot.image}
                  alt={shot.handle}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Instagram Handle */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                  <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 border border-white/10">
                    <InstagramIcon className="w-3 h-3 text-cult-accent" /> {shot.handle}
                  </span>
                  <span className="text-[9px] text-white/70">{shot.location}</span>
                </div>

                {/* Bottom Tagged Product Link */}
                <div className="absolute bottom-3 inset-x-3">
                  <Link
                    to={`/product/${shot.productId}`}
                    className="block p-2 bg-cult-surface/95 backdrop-blur-md border border-cult-border hover:border-cult-accent transition-colors group/link"
                  >
                    <span className="text-[9px] font-mono text-cult-accent uppercase block">
                      TAGGED ARTIFACT:
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs text-cult-text group-hover/link:text-cult-accent transition-colors truncate">
                        {shot.taggedPiece}
                      </span>
                      <ExternalLink className="w-3 h-3 text-cult-muted group-hover/link:text-cult-accent shrink-0 ml-1" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
