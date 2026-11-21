import React from 'react';
import { ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';

const INSTA_POSTS = [
  {
    id: 'ig-1',
    image: '/images/hero/uc-hero-06-underground-identity_60258ec4.webp',
    caption: 'Tokyo nocturnal drift in Drop 08 acid wash.',
    likes: '2.4k'
  },
  {
    id: 'ig-2',
    image: '/images/categories/baggy-utility/uc-baggy-editorial-04_bed75867.webp',
    caption: 'Volume over vanity. 400 GSM cargo twill.',
    likes: '1.9k'
  },
  {
    id: 'ig-3',
    image: '/images/categories/gym-cult/uc-gym-editorial-06_2d0f8141.webp',
    caption: 'Heavy pump cover session. Built different.',
    likes: '3.1k'
  },
  {
    id: 'ig-4',
    image: '/images/categories/daily-essentials/uc-daily-editorial-03_88ba54ca.webp',
    caption: 'Subtle daily drape. Clean architectural lines.',
    likes: '1.7k'
  },
  {
    id: 'ig-5',
    image: '/images/categories/hood-cult/uc-hood-editorial-05_5feb21c1.webp',
    caption: '500 GSM Fortress Pullover. Total cocoon.',
    likes: '2.8k'
  },
  {
    id: 'ig-6',
    image: '/images/categories/shirt-society/uc-shirt-editorial-02_d7da467c.webp',
    caption: 'Cuban camp collar in heavy textured slub.',
    likes: '2.1k'
  }
];

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-cult-bg border-b border-cult-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cult-border gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-1">
              // VISUAL TRANSMISSIONS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cult-text leading-none uppercase">
              INSTAGRAM ARCHIVE // @UNKNOWNCULT
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-heading tracking-widest text-cult-accent hover:text-cult-text uppercase"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>FOLLOW @UNKNOWNCULT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTA_POSTS.map(post => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden bg-cult-surface border border-cult-border"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white text-xs">
                <div className="flex justify-between items-center text-[10px] font-mono text-cult-accent">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[11px] font-sans line-clamp-3">
                  {post.caption}
                </p>
                <span className="text-[9px] font-mono text-cult-accent uppercase">
                  VIEW ON INSTAGRAM →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
