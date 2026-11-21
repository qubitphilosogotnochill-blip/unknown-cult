import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Ruler, ShieldCheck } from 'lucide-react';

export const SizeGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'SIZE & MEASUREMENT GUIDE' }]} className="mb-6" />

        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold inline-flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5" /> // CALIBRATED METRICS
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
            ATELIER SIZE GUIDE
          </h1>
          <p className="text-xs text-cult-muted font-sans">
            Exact physical garment specifications in centimetres. Calibrated for true oversized draping.
          </p>
        </div>

        {/* Section 1: Upperwear */}
        <div className="bg-cult-surface border border-cult-border p-6 sm:p-8 space-y-6 mb-10 shadow-lg">
          <div className="border-b border-cult-border pb-3 flex items-center justify-between">
            <h2 className="font-heading text-2xl text-cult-text uppercase">
              UPPERWEAR (TEES, HOODIES, POLOS, SHIRTS)
            </h2>
            <span className="text-xs font-mono text-cult-accent">INTENDED FIT: OVERSIZED BOXY</span>
          </div>

          <div className="overflow-x-auto border border-cult-border">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-cult-card text-cult-accent border-b border-cult-border">
                <tr>
                  <th className="p-3">SIZE</th>
                  <th className="p-3">CHEST (CIRCUMFERENCE)</th>
                  <th className="p-3">BODY LENGTH</th>
                  <th className="p-3">SHOULDER DROP</th>
                  <th className="p-3">SLEEVE LENGTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cult-border text-cult-text">
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">XS</td><td className="p-3">106 cm</td><td className="p-3">71 cm</td><td className="p-3">54 cm</td><td className="p-3">22 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">S</td><td className="p-3">112 cm</td><td className="p-3">73 cm</td><td className="p-3">56 cm</td><td className="p-3">23 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">M</td><td className="p-3">118 cm</td><td className="p-3">75 cm</td><td className="p-3">58 cm</td><td className="p-3">24 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">L</td><td className="p-3">124 cm</td><td className="p-3">77 cm</td><td className="p-3">60 cm</td><td className="p-3">25 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">XL</td><td className="p-3">130 cm</td><td className="p-3">79 cm</td><td className="p-3">62 cm</td><td className="p-3">26 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">XXL</td><td className="p-3">136 cm</td><td className="p-3">81 cm</td><td className="p-3">64 cm</td><td className="p-3">27 cm</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Bottomwear */}
        <div className="bg-cult-surface border border-cult-border p-6 sm:p-8 space-y-6 mb-10 shadow-lg">
          <div className="border-b border-cult-border pb-3 flex items-center justify-between">
            <h2 className="font-heading text-2xl text-cult-text uppercase">
              BOTTOMWEAR (CARGOS, BAGGY DENIM, SHORTS)
            </h2>
            <span className="text-xs font-mono text-cult-accent">INTENDED FIT: WIDE PROPORTION</span>
          </div>

          <div className="overflow-x-auto border border-cult-border">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-cult-card text-cult-accent border-b border-cult-border">
                <tr>
                  <th className="p-3">WAIST SIZE</th>
                  <th className="p-3">WAISTBAND (CM)</th>
                  <th className="p-3">HIP WIDTH</th>
                  <th className="p-3">INSEAM</th>
                  <th className="p-3">LEG OPENING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cult-border text-cult-text">
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">28</td><td className="p-3">74-78 cm</td><td className="p-3">108 cm</td><td className="p-3">77 cm</td><td className="p-3">52 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">30</td><td className="p-3">79-83 cm</td><td className="p-3">112 cm</td><td className="p-3">78 cm</td><td className="p-3">54 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">32</td><td className="p-3">84-88 cm</td><td className="p-3">116 cm</td><td className="p-3">79 cm</td><td className="p-3">56 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">34</td><td className="p-3">89-93 cm</td><td className="p-3">120 cm</td><td className="p-3">80 cm</td><td className="p-3">58 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">36</td><td className="p-3">94-98 cm</td><td className="p-3">124 cm</td><td className="p-3">81 cm</td><td className="p-3">60 cm</td></tr>
                <tr className="hover:bg-cult-bg"><td className="p-3 font-bold text-cult-accent">38</td><td className="p-3">99-103 cm</td><td className="p-3">128 cm</td><td className="p-3">82 cm</td><td className="p-3">62 cm</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Accessories */}
        <div className="bg-cult-surface border border-cult-border p-6 space-y-3 text-xs font-mono text-cult-muted">
          <h3 className="font-heading text-lg text-cult-text uppercase">ACCESSORY SIZING</h3>
          <p>• <strong>Dad Caps & Beanies:</strong> Free size with adjustable rear strap (fits 54cm–62cm head circumference).</p>
          <p>• <strong>Crew Socks:</strong> Free size high-elastic ribbed weave (fits UK/India shoe sizes 7 through 11).</p>
          <p>• <strong>Sterling Silver Rings:</strong> Milled in US standard ring sizes 8, 9, 10, and 11.</p>
        </div>

      </div>
    </div>
  );
};
