import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email, password);
      navigate('/account');
    }
  };

  const handleDemoLogin = () => {
    login('devin@unknowncult.com', 'demo123');
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-cult-bg py-12 sm:py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'LOGIN' }]} className="mb-6" />

        <div className="bg-cult-surface border border-cult-border p-6 sm:p-8 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-2 border-b border-cult-border pb-6">
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
              // ATELIER ACCESS
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl text-cult-text uppercase leading-none">
              DEVOTEE LOGIN
            </h1>
            <p className="text-xs text-cult-muted font-sans">
              Enter your credentials to access your order history and inner circle benefits.
            </p>
          </div>

          {/* Quick Demo Login Pill for effortless testing */}
          <button
            onClick={handleDemoLogin}
            type="button"
            className="w-full p-3 bg-cult-card border border-cult-accent/60 text-cult-accent hover:bg-cult-accent hover:text-black transition-all text-xs font-mono flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>ONE-CLICK DEVOTEE DEMO LOGIN</span>
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                REGISTERED EMAIL ADDRESS
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

            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-cult-muted mb-1">
                <span className="uppercase">PASSWORD</span>
                <Link to="/forgot-password" className="text-cult-accent hover:underline">
                  FORGOT PASSWORD?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cult-accent text-black py-4 font-heading text-xs tracking-cult-widest uppercase font-bold hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <span>ACCESS ACCOUNT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-cult-border text-center text-xs font-mono text-cult-muted space-y-2">
            <div>
              NEW TO THE CULT?{' '}
              <Link to="/register" className="text-cult-accent hover:underline font-bold">
                INITIATE REGISTRATION →
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-cult-muted pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cult-accent" />
              <span>BELONG TO NO ONE // SECURE ACCESS</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
