import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-cult-bg py-12 sm:py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'RECOVER PASSWORD' }]} className="mb-6" />

        <div className="bg-cult-surface border border-cult-border p-6 sm:p-8 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-2 border-b border-cult-border pb-6">
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
              // RECOVERY PROTOCOL
            </span>
            <h1 className="font-heading text-3xl text-cult-text uppercase leading-none">
              PASSWORD RECOVERY
            </h1>
            <p className="text-xs text-cult-muted font-sans">
              Enter your email address to receive an encrypted password reset link.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 bg-cult-card border border-cult-accent text-cult-accent font-mono text-xs space-y-2 text-center">
              <Check className="w-5 h-5 mx-auto" />
              <p>RECOVERY TRANSMISSION SENT TO {email.toUpperCase()}</p>
              <p className="text-cult-muted text-[10px]">
                Check your inbox and spam folder. Link expires in 60 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                  DEVOTEE ACCOUNT EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="devin@unknowncult.com"
                  className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cult-accent text-black py-4 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
              >
                SEND RECOVERY LINK
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-cult-border text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cult-muted hover:text-cult-accent uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> BACK TO LOGIN
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
