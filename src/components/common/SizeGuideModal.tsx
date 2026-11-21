import React, { useState } from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category = 'upperwear' }) => {
  const [activeTab, setActiveTab] = useState<'upperwear' | 'bottomwear' | 'how-to-measure'>(
    category.toLowerCase().includes('cargo') || 
    category.toLowerCase().includes('pant') || 
    category.toLowerCase().includes('denim') || 
    category.toLowerCase().includes('short') ||
    category.toLowerCase().includes('baggy')
      ? 'bottomwear'
      : 'upperwear'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-3xl bg-cult-bg border border-cult-border shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 border-b border-cult-border bg-cult-surface flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-cult-accent" />
            <h3 className="font-heading text-2xl text-cult-text">CULT FIT & MEASUREMENT GUIDE</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-cult-muted hover:text-cult-text transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-cult-border bg-cult-card/50">
          <button
            onClick={() => setActiveTab('upperwear')}
            className={`flex-1 py-3 px-4 text-xs font-heading tracking-widest uppercase transition-colors border-b-2 ${
              activeTab === 'upperwear'
                ? 'border-cult-accent text-cult-accent bg-cult-surface font-bold'
                : 'border-transparent text-cult-muted hover:text-cult-text'
            }`}
          >
            UPPERWEAR (TEES, HOODIES, SHIRTS)
          </button>
          <button
            onClick={() => setActiveTab('bottomwear')}
            className={`flex-1 py-3 px-4 text-xs font-heading tracking-widest uppercase transition-colors border-b-2 ${
              activeTab === 'bottomwear'
                ? 'border-cult-accent text-cult-accent bg-cult-surface font-bold'
                : 'border-transparent text-cult-muted hover:text-cult-text'
            }`}
          >
            BOTTOMWEAR (CARGOS, DENIM, SHORTS)
          </button>
          <button
            onClick={() => setActiveTab('how-to-measure')}
            className={`flex-1 py-3 px-4 text-xs font-heading tracking-widest uppercase transition-colors border-b-2 ${
              activeTab === 'how-to-measure'
                ? 'border-cult-accent text-cult-accent bg-cult-surface font-bold'
                : 'border-transparent text-cult-muted hover:text-cult-text'
            }`}
          >
            HOW TO MEASURE
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {activeTab === 'upperwear' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-cult-muted">
                <span>ALL MEASUREMENTS ARE GIVEN IN CENTIMETRES (CM)</span>
                <span className="text-cult-accent">INTENDED FIT: OVERSIZED BOXY</span>
              </div>

              <div className="overflow-x-auto border border-cult-border">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-cult-surface text-cult-accent border-b border-cult-border">
                    <tr>
                      <th className="p-3">SIZE</th>
                      <th className="p-3">CHEST (CIRCUMFERENCE)</th>
                      <th className="p-3">BODY LENGTH</th>
                      <th className="p-3">SHOULDER DROP</th>
                      <th className="p-3">SLEEVE LENGTH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cult-border text-cult-text">
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">XS</td>
                      <td className="p-3">106 cm</td>
                      <td className="p-3">71 cm</td>
                      <td className="p-3">54 cm</td>
                      <td className="p-3">22 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">S</td>
                      <td className="p-3">112 cm</td>
                      <td className="p-3">73 cm</td>
                      <td className="p-3">56 cm</td>
                      <td className="p-3">23 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">M</td>
                      <td className="p-3">118 cm</td>
                      <td className="p-3">75 cm</td>
                      <td className="p-3">58 cm</td>
                      <td className="p-3">24 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">L</td>
                      <td className="p-3">124 cm</td>
                      <td className="p-3">77 cm</td>
                      <td className="p-3">60 cm</td>
                      <td className="p-3">25 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">XL</td>
                      <td className="p-3">130 cm</td>
                      <td className="p-3">79 cm</td>
                      <td className="p-3">62 cm</td>
                      <td className="p-3">26 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">XXL</td>
                      <td className="p-3">136 cm</td>
                      <td className="p-3">81 cm</td>
                      <td className="p-3">64 cm</td>
                      <td className="p-3">27 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-cult-surface border border-cult-border text-xs text-cult-muted font-sans space-y-1">
                <p className="font-bold text-cult-text">PRO TIP FOR UNKNOWN CULT UPPERWEAR:</p>
                <p>
                  Our silhouettes are intentionally developed with dropped shoulders and a boxy drape. Order your regular size for an authentic streetwear drape. If you prefer a fitted traditional athletic look, select one size down.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'bottomwear' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-cult-muted">
                <span>ALL MEASUREMENTS ARE GIVEN IN CENTIMETRES (CM)</span>
                <span className="text-cult-accent">INTENDED FIT: RELAXED WIDE LEG</span>
              </div>

              <div className="overflow-x-auto border border-cult-border">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-cult-surface text-cult-accent border-b border-cult-border">
                    <tr>
                      <th className="p-3">WAIST SIZE</th>
                      <th className="p-3">WAISTBAND</th>
                      <th className="p-3">HIP WIDTH</th>
                      <th className="p-3">INSEAM</th>
                      <th className="p-3">LEG OPENING</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cult-border text-cult-text">
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">28</td>
                      <td className="p-3">74-78 cm</td>
                      <td className="p-3">108 cm</td>
                      <td className="p-3">77 cm</td>
                      <td className="p-3">52 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">30</td>
                      <td className="p-3">79-83 cm</td>
                      <td className="p-3">112 cm</td>
                      <td className="p-3">78 cm</td>
                      <td className="p-3">54 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">32</td>
                      <td className="p-3">84-88 cm</td>
                      <td className="p-3">116 cm</td>
                      <td className="p-3">79 cm</td>
                      <td className="p-3">56 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">34</td>
                      <td className="p-3">89-93 cm</td>
                      <td className="p-3">120 cm</td>
                      <td className="p-3">80 cm</td>
                      <td className="p-3">58 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">36</td>
                      <td className="p-3">94-98 cm</td>
                      <td className="p-3">124 cm</td>
                      <td className="p-3">81 cm</td>
                      <td className="p-3">60 cm</td>
                    </tr>
                    <tr className="hover:bg-cult-card/40">
                      <td className="p-3 font-bold text-cult-accent">38</td>
                      <td className="p-3">99-103 cm</td>
                      <td className="p-3">128 cm</td>
                      <td className="p-3">82 cm</td>
                      <td className="p-3">62 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'how-to-measure' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-cult-muted font-sans">
              <div className="space-y-4">
                <h4 className="font-heading text-lg text-cult-text">MEASURING YOUR UPPER BODY</h4>
                <div className="space-y-3">
                  <div className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cult-text block">1. Chest Circumference:</strong>
                      Wrap measuring tape under your armpits across the fullest part of your pecs/chest.
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cult-text block">2. Shoulder Breadth:</strong>
                      Measure straight across the back from the edge of one acromion shoulder bone to the other.
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cult-text block">3. Body Length:</strong>
                      Measure from highest point of shoulder next to collar straight down to hip bone.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-heading text-lg text-cult-text">MEASURING YOUR LOWER BODY</h4>
                <div className="space-y-3">
                  <div className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cult-text block">1. Waistband:</strong>
                      Measure around natural waistline where you prefer trousers to sit. Keep one finger between tape and body.
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cult-text block">2. Inseam:</strong>
                      Measure from crotch point down to ankle bone along the interior leg seam.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cult-border bg-cult-surface flex items-center justify-between text-xs font-mono text-cult-muted">
          <span>STILL UNSURE? CONTACT OUR ATELIER SIZING CONCIERGE</span>
          <button
            onClick={onClose}
            className="bg-cult-accent text-black px-5 py-2 font-heading tracking-widest uppercase font-bold hover:bg-cult-accent-hover transition-colors"
          >
            GOT IT
          </button>
        </div>

      </div>
    </div>
  );
};
