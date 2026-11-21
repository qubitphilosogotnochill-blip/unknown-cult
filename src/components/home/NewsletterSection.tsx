import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-cult-bg border-b border-cult-border select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
            <Mail className="w-3.5 h-3.5" />
            <span>SECTION H // TRANSMISSION DISPATCH</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-cult-text leading-[0.9]">
            JOIN THE INNER CIRCLE.
          </h2>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-cult-muted font-sans leading-relaxed">
            Gain priority transmission codes 2 hours before limited dye drops, private lookbook releases, and 10% off your inaugural order with cipher <strong className="text-cult-accent font-mono font-bold">CULT10</strong>.
          </p>
        </div>

        {/* Form or Confirmation */}
        {submitted ? (
          <div className="max-w-md mx-auto p-5 bg-cult-surface border border-cult-accent text-cult-accent font-mono text-xs flex items-center justify-center gap-3">
            <Check className="w-4 h-4 text-cult-accent shrink-0" />
            <span>TRANSMISSION CONFIRMED. WELCOME TO UNKNOWN CULT.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ENTER EMAIL ADDRESS FOR EXCLUSIVE ACCESS..."
              className="flex-1 bg-cult-surface border border-cult-border px-5 py-4 text-xs font-mono uppercase tracking-wider text-cult-text placeholder-cult-muted/60 focus:outline-none focus:border-cult-accent transition-colors"
            />
            <button
              type="submit"
              className="bg-cult-text text-cult-bg hover:bg-cult-accent hover:text-black px-8 py-4 font-heading text-xs tracking-cult-widest uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 shrink-0 group"
            >
              <span>DISPATCH</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

        {/* Minimal Disclaimers */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-cult-muted tracking-widest uppercase">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cult-accent" /> NO ALGORITHMIC SPAM
          </span>
          <span>•</span>
          <span>STRICT ATELIER PRIVACY</span>
          <span>•</span>
          <span>UNSUBSCRIBE AT WILL</span>
        </div>

      </div>
    </section>
  );
};
