import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'PRIVACY PROTOCOL' }]} className="mb-6" />

        <div className="bg-cult-surface border border-cult-border p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="border-b border-cult-border pb-4 space-y-2">
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
              // DATA GOVERNANCE
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
              PRIVACY POLICY
            </h1>
            <p className="text-xs font-mono text-cult-muted">LAST REVISED: NOVEMBER 2026</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">1. OUR COMMITMENT TO DEVOTEE PRIVACY</h3>
              <p>
                UNKNOWN CULT values individual sovereignty. We do not sell, rent, or trade your personal information to third-party data brokers or advertisement networks. We collect solely the information required to process and dispatch your garment orders.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">2. INFORMATION COLLECTED</h3>
              <p>
                • <strong>Contact Details:</strong> Name, delivery address, email, and phone number for shipping documentation and SMS parcel tracking.<br />
                • <strong>Payment Information:</strong> Handled entirely by RBI-licensed PCI-DSS Level 1 compliant payment gateways. We never store credit card CVVs or net banking passwords.<br />
                • <strong>Session Analytics:</strong> Anonymous telemetry used strictly to optimize UI speed and device responsiveness.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">3. COOKIES & LOCAL DATA</h3>
              <p>
                We use secure client-side storage to remember your chosen theme preference (dark or light mode), wishlist items, and shopping bag state.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
