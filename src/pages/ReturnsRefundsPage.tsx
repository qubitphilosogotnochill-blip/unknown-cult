import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RotateCcw, ShieldCheck, Check } from 'lucide-react';

export const ReturnsRefundsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'RETURNS & EXCHANGES' }]} className="mb-6" />

        <div className="bg-cult-surface border border-cult-border p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="border-b border-cult-border pb-4 space-y-2">
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
              // CLIENT ASSURANCE
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
              RETURNS & REFUNDS POLICY
            </h1>
            <p className="text-xs font-mono text-cult-muted">7-DAY HASSLE-FREE SIZE EXCHANGE</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">1. THE 7-DAY EXCHANGE WINDOW</h3>
              <p>
                We understand that discovering the perfect oversized drape is a tactile experience. If your garment does not drape exactly as envisioned, you may initiate a size exchange or store credit within 7 calendar days of verified parcel delivery.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">2. CONDITION GUIDELINES</h3>
              <p>
                To qualify for return or exchange:<br />
                • The silhouette must be in unwashed, unworn, original mint condition.<br />
                • Original woven damask tags, internal neck labels, and packaging must remain fully intact.<br />
                • Free from pet hair, perfume, or cosmetic stains.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">3. DOORSTEP REVERSE PICKUP</h3>
              <p>
                Once an exchange is initiated via your account or email, our logistics partner will collect the item directly from your address. Reverse pickups are completely free for the first exchange.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">4. REFUND DISBURSEMENT</h3>
              <p>
                Approved refunds are disbursed to the original payment method (Bank account / UPI / Credit Card) within 3–5 business days following physical inspection at our New Delhi atelier.
              </p>
            </div>

            <div className="pt-6 border-t border-cult-border/80 space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">5. CLIENT SUPPORT & DISPATCH ASSISTANCE</h3>
              <p>
                To initiate an urgent return or ask about exchange availability, contact our atelier team directly at <a href="mailto:unknowncult1122@gmail.com" className="text-cult-accent font-mono hover:underline">unknowncult1122@gmail.com</a> or phone <a href="tel:+919318422195" className="text-cult-accent font-mono hover:underline">+91 9318422195</a> (Mon–Sat, 10:00–19:00 IST).
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
