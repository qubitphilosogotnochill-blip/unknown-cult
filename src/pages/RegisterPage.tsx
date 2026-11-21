import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      register(name, email, password, phone);
      navigate('/account');
    }
  };

  return (
    <div className="min-h-screen bg-cult-bg py-12 sm:py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'INITIATE REGISTRATION' }]} className="mb-6" />

        <div className="bg-cult-surface border border-cult-border p-6 sm:p-8 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-2 border-b border-cult-border pb-6">
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> // JOIN THE CULT
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl text-cult-text uppercase leading-none">
              INITIATE MEMBERSHIP
            </h1>
            <p className="text-xs text-cult-muted font-sans">
              Create your account to unlock private drop releases and accumulate Cult Credits.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Liam Sterling"
                className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="liam@unknowncult.com"
                className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                MOBILE NUMBER
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                CREATE PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
              />
            </div>

            <div className="text-[11px] font-mono text-cult-muted">
              By creating an account you agree to our <Link to="/terms-conditions" className="text-cult-accent underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-cult-accent underline">Privacy Policy</Link>.
            </div>

            <button
              type="submit"
              className="w-full bg-cult-accent text-black py-4 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <span>CONFIRM MEMBERSHIP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-cult-border text-center text-xs font-mono text-cult-muted">
            ALREADY AN INITIATE?{' '}
            <Link to="/login" className="text-cult-accent hover:underline font-bold">
              SIGN IN HERE →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
