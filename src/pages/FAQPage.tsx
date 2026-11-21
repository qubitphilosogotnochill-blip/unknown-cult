import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'SIZING & SILHOUETTES',
    q: 'How do UNKNOWN CULT silhouettes fit compared to standard streetwear brands?',
    a: 'All UNKNOWN CULT pieces are intentionally designed with exaggerated dropped shoulders, wider chest volumes, and relaxed drape proportions. If you love an authentic boxy oversized streetwear look, order your standard size. If you prefer a more tailored, traditional fit, we recommend sizing down one full size.'
  },
  {
    category: 'SIZING & SILHOUETTES',
    q: 'What is GSM and why does UNKNOWN CULT use 280–500 GSM?',
    a: 'GSM stands for Grams per Square Meter—a scientific measure of fabric density and weight. Standard commercial t-shirts use 140–180 GSM cotton, which easily warps and clings. UNKNOWN CULT mills heavy 280 GSM combed jersey for t-shirts, 400 GSM twill for cargos, and 460–500 GSM fleece for hoodies to guarantee permanent structural drape and longevity.'
  },
  {
    category: 'SHIPPING & LOGISTICS',
    q: 'What are the delivery timelines across India?',
    a: 'Orders shipped to Tier 1 metro regions (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai, Kolkata) arrive in 2–3 business days via BlueDart Express Air. Rest of India deliveries arrive in 4–6 business days via Delhivery Priority. You receive live SMS and WhatsApp tracking upon dispatch.'
  },
  {
    category: 'SHIPPING & LOGISTICS',
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes, Cash on Delivery is supported across 19,000+ Indian pincodes. An automated OTP confirmation is triggered prior to courier handover.'
  },
  {
    category: 'EXCHANGES & RETURNS',
    q: 'What is the return and exchange window?',
    a: 'We provide an unconditional 7-day doorstep size exchange. If your ordered silhouette does not drape exactly as desired, simply initiate an exchange from your account or contact our concierge, and we will schedule reverse pickup from your address.'
  },
  {
    category: 'GARMENT CARE',
    q: 'How should I wash and care for acid-washed and distressed garments?',
    a: 'Machine wash cold inside out with similar dark tones. Never tumble dry—flat drying preserves the cotton fiber elasticity and natural drape. Do not iron directly on cracked discharge prints or 3D silicone puff monograms.'
  }
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'FAQ & DEVOTEE GUIDE' }]} className="mb-6" />

        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
            // PROTOCOL ARCHIVE
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xs text-cult-muted font-sans">
            Clear directives on sizing, heavyweight cotton care, express shipping, and exchanges.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-cult-surface border border-cult-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-cult-accent uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl text-cult-text">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-cult-accent transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-cult-muted font-sans leading-relaxed border-t border-cult-border/60 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dedicated Concierge Box */}
        <div className="mt-12 p-6 sm:p-8 bg-cult-surface border border-cult-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
              // NEED DIRECT ASSISTANCE?
            </span>
            <h4 className="font-heading text-xl text-cult-text uppercase">
              SPEAK WITH OUR ATELIER CONCIERGE
            </h4>
            <p className="text-xs text-cult-muted font-sans">
              Helpline: <a href="tel:+919318422195" className="text-cult-accent hover:underline font-mono">+91 9318422195</a> &nbsp;|&nbsp; Email: <a href="mailto:unknowncult1122@gmail.com" className="text-cult-accent hover:underline font-mono">unknowncult1122@gmail.com</a>
            </p>
          </div>
          <a
            href="https://wa.me/919318422195"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-cult-text text-cult-bg hover:bg-cult-accent hover:text-black font-mono text-xs uppercase font-bold tracking-widest transition-colors shrink-0"
          >
            CHAT ON WHATSAPP →
          </a>
        </div>

      </div>
    </div>
  );
};
