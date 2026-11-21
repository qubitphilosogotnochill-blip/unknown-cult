import React, { useState } from 'react';
import { Mail, MapPin, Phone, Check, Clock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [subject, setSubject] = useState('Size & Exchange Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'CONTACT ATELIER' }]} className="mb-6" />

        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
            // CLIENT CONCIERGE
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
            CONTACT THE STUDIO
          </h1>
          <p className="text-xs text-cult-muted font-sans">
            Direct communication with our atelier team for orders, bespoke sizing, and shipment support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Official Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-cult-surface border border-cult-border space-y-5">
              <h3 className="font-heading text-xl text-cult-text uppercase pb-2 border-b border-cult-border">
                HEADQUARTERS & CONCIERGE
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cult-text font-bold block">UNKNOWN CULT ATELIER</span>
                    <span className="text-cult-muted">Hauz Khas Village, New Delhi, Delhi 110016</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cult-text font-bold block">OFFICIAL EMAIL</span>
                    <a 
                      href="mailto:unknowncult1122@gmail.com" 
                      className="text-cult-accent hover:underline block break-all font-mono"
                    >
                      unknowncult1122@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cult-text font-bold block">OFFICIAL HELPLINE</span>
                    <a 
                      href="tel:+919318422195" 
                      className="text-cult-accent hover:underline block font-mono"
                    >
                      +91 9318422195
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cult-text font-bold block">WHATSAPP VIP CONCIERGE</span>
                    <a 
                      href="https://wa.me/919318422195" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-cult-accent hover:underline block font-mono"
                    >
                      +91 9318422195 (Chat Live)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cult-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cult-text font-bold block">OPERATIONAL HOURS</span>
                    <span className="text-cult-muted">Monday – Saturday: 10:00 – 19:00 IST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cult-card border border-cult-border text-xs font-mono text-cult-muted space-y-1">
              <span className="text-cult-accent font-bold block">// RESPONSE SLA GUARANTEE</span>
              <p>All inquiries receive direct human responses within 4 business hours.</p>
            </div>

          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-cult-surface border border-cult-border p-6 sm:p-8">
            <h3 className="font-heading text-xl text-cult-text uppercase pb-3 border-b border-cult-border mb-6">
              TRANSMIT A MESSAGE
            </h3>

            {submitted ? (
              <div className="p-6 bg-cult-card border border-cult-accent text-center space-y-3">
                <Check className="w-8 h-8 text-cult-accent mx-auto" />
                <h4 className="font-heading text-2xl text-cult-text uppercase">MESSAGE RECEIVED</h4>
                <p className="text-xs text-cult-muted font-sans max-w-sm mx-auto">
                  Your transmission has been logged. An atelier client advisor will respond to your registered email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                      YOUR FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Liam Vance"
                      className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                      YOUR EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                      ORDER ID (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={e => setOrderNumber(e.target.value)}
                      placeholder="e.g. UC-2026-9812"
                      className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                      SUBJECT
                    </label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    >
                      <option>Size & Exchange Inquiry</option>
                      <option>Order Tracking & Dispatch</option>
                      <option>Product & Fabric Consultation</option>
                      <option>Press & Collective Collaboration</option>
                      <option>Other Devotee Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                    TRANSMISSION MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Enter details of your inquiry..."
                    className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cult-text text-cult-bg hover:bg-cult-accent hover:text-black py-4 font-heading text-xs tracking-cult-widest uppercase font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>SEND TRANSMISSION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
