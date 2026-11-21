import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'TERMS & CONDITIONS' }]} className="mb-6" />

        <div className="bg-cult-surface border border-cult-border p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="border-b border-cult-border pb-4 space-y-2">
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
              // LEGAL FRAMEWORK
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
              TERMS AND CONDITIONS
            </h1>
            <p className="text-xs font-mono text-cult-muted">APPLICABLE TO UNKNOWN CULT PLATFORM & ATELIER COMMERCE</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">1. OVERVIEW</h3>
              <p>
                This website is operated by UNKNOWN CULT. Throughout the site, the terms "we", "us" and "our" refer to UNKNOWN CULT. By visiting our site and purchasing our merchandise, you engage in our service and agree to be bound by the following terms.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">2. INTELLECTUAL PROPERTY & BRAND RIGHTS</h3>
              <p>
                The UNKNOWN CULT name, trademark, geometric UC emblem, silhouettes, custom typography, lookbook photography, and the tagline "BELONG TO NO ONE" are the exclusive intellectual property of UNKNOWN CULT. Unauthorized duplication or reproduction is strictly prohibited.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">3. PRODUCT ACCURACY & LIMITED DYE RUNS</h3>
              <p>
                Due to our artisanal mineral enzyme washing processes, subtle tone variations and unique hand-abrasions exist across individual pieces. These are intentional markers of craft rather than defects.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl text-cult-text uppercase">4. JURISDICTION</h3>
              <p>
                These terms are governed by and construed in accordance with the laws of India, under the exclusive jurisdiction of the courts of New Delhi, Delhi.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
