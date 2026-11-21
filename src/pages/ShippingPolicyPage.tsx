import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Truck, ShieldCheck, Clock } from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'SHIPPING & LOGISTICS POLICY' }]} className="mb-6" />

        <div className="bg-cult-surface border border-cult-border p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="border-b border-cult-border pb-4 space-y-2">
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
              // DOMESTIC & INTERNATIONAL DISPATCH
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
              SHIPPING POLICY
            </h1>
            <p className="text-xs font-mono text-cult-muted">EFFECTIVE AS OF NOVEMBER 2026 // REVISED FOR DROP 08</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">1. PROCESSING & DISPATCH TIMELINE</h3>
              <p>
                All orders are dispatched from our centralized fulfillment facility located in New Delhi, Delhi. Orders placed before 14:00 IST on business days are inspected, packed in bespoke moisture-resistant matte cult mailers, and handed to logistics couriers within 24 hours.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">2. DOMESTIC SHIPPING TIERS & RATES</h3>
              <p>
                • <strong>Complimentary Express Air:</strong> Free on all domestic India orders with a subtotal exceeding ₹1,999. Delivered in 2–4 business days.<br />
                • <strong>Standard Surface Express:</strong> Flat ₹149 charge on orders below ₹1,999.<br />
                • <strong>VIP Priority Air:</strong> Flat ₹199 charge for same-day dispatch and 24–48 hour delivery to major metros.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">3. LOGISTICS CARRIERS & TRACKING</h3>
              <p>
                UNKNOWN CULT partners exclusively with BlueDart Express Air, Delhivery Priority, and DTDC Prime. Once your parcel is scanned at the hub, automated tracking credentials are sent via SMS, Email, and WhatsApp.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">4. DAMAGED OR TAMPERED PARCELS</h3>
              <p>
                If the external UNKNOWN CULT tamper-evident security tape appears torn or broken upon delivery, please reject the package and alert our concierge immediately at <a href="mailto:unknowncult1122@gmail.com" className="text-cult-accent font-mono hover:underline">unknowncult1122@gmail.com</a> or helpline <a href="tel:+919318422195" className="text-cult-accent font-mono hover:underline">+91 9318422195</a>.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
