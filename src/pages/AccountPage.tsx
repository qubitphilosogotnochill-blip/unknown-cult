import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Award, LogOut, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout, orders } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'rewards'>('profile');

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-heading text-4xl text-cult-text">ACCOUNT LOGIN REQUIRED</h2>
        <p className="text-xs text-cult-muted max-w-sm font-sans">
          Sign in to access your order archives, inner circle status, and tracked parcels.
        </p>
        <Link
          to="/login"
          className="bg-cult-accent text-black px-8 py-3.5 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
        >
          GO TO LOGIN
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'MY ACCOUNT' }]} className="mb-6" />

        {/* Account Header Hero */}
        <div className="bg-cult-surface border border-cult-border p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cult-card border-2 border-cult-accent flex items-center justify-center text-cult-accent font-heading text-2xl font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold">
                // {user.tier}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl text-cult-text uppercase leading-none mt-0.5">
                {user.name}
              </h1>
              <p className="text-xs font-mono text-cult-muted mt-1">
                {user.email} • MEMBER SINCE {user.memberSince.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-cult-card border border-cult-border px-4 py-2 text-right">
              <span className="text-[10px] font-mono text-cult-muted block">CULT CREDITS</span>
              <span className="font-heading text-xl text-cult-accent">{user.cultPoints} PTS</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 bg-cult-card border border-cult-border text-cult-muted hover:text-cult-red hover:border-cult-red transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Account Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-heading tracking-widest uppercase transition-colors text-left border ${
                activeTab === 'profile'
                  ? 'border-cult-accent bg-cult-surface text-cult-accent font-bold'
                  : 'border-cult-border bg-cult-card text-cult-muted hover:text-cult-text'
              }`}
            >
              <User className="w-4 h-4 text-cult-accent" />
              <span>PROFILE & IDENTITY</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-heading tracking-widest uppercase transition-colors text-left border ${
                activeTab === 'orders'
                  ? 'border-cult-accent bg-cult-surface text-cult-accent font-bold'
                  : 'border-cult-border bg-cult-card text-cult-muted hover:text-cult-text'
              }`}
            >
              <span className="flex items-center gap-3">
                <Package className="w-4 h-4 text-cult-accent" />
                <span>MY ORDERS</span>
              </span>
              <span className="text-[10px] font-mono bg-cult-bg px-2 py-0.5 border border-cult-border">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-heading tracking-widest uppercase transition-colors text-left border ${
                activeTab === 'addresses'
                  ? 'border-cult-accent bg-cult-surface text-cult-accent font-bold'
                  : 'border-cult-border bg-cult-card text-cult-muted hover:text-cult-text'
              }`}
            >
              <MapPin className="w-4 h-4 text-cult-accent" />
              <span>SAVED ADDRESSES</span>
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-heading tracking-widest uppercase transition-colors text-left border ${
                activeTab === 'rewards'
                  ? 'border-cult-accent bg-cult-surface text-cult-accent font-bold'
                  : 'border-cult-border bg-cult-card text-cult-muted hover:text-cult-text'
              }`}
            >
              <Award className="w-4 h-4 text-cult-accent" />
              <span>INNER CIRCLE PERKS</span>
            </button>

            <div className="pt-4">
              <Link
                to="/track-order"
                className="w-full flex items-center justify-between px-4 py-3 bg-cult-surface border border-cult-border text-xs font-mono text-cult-accent hover:border-cult-accent transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4" /> LIVE COURIER TRACKING
                </span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Active Pane (9 cols) */}
          <div className="lg:col-span-9 bg-cult-surface border border-cult-border p-6 sm:p-8">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl text-cult-text uppercase pb-3 border-b border-cult-border">
                  DEVOTEE PROFILE CREDENTIALS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 bg-cult-bg border border-cult-border space-y-1">
                    <span className="text-cult-muted block text-[10px]">FULL NAME</span>
                    <span className="text-cult-text font-bold text-sm">{user.name}</span>
                  </div>
                  <div className="p-4 bg-cult-bg border border-cult-border space-y-1">
                    <span className="text-cult-muted block text-[10px]">EMAIL ADDRESS</span>
                    <span className="text-cult-text font-bold text-sm">{user.email}</span>
                  </div>
                  <div className="p-4 bg-cult-bg border border-cult-border space-y-1">
                    <span className="text-cult-muted block text-[10px]">PHONE NUMBER</span>
                    <span className="text-cult-text font-bold text-sm">{user.phone}</span>
                  </div>
                  <div className="p-4 bg-cult-bg border border-cult-border space-y-1">
                    <span className="text-cult-muted block text-[10px]">MEMBERSHIP LEVEL</span>
                    <span className="text-cult-accent font-bold text-sm">{user.tier}</span>
                  </div>
                </div>

                <div className="p-4 bg-cult-card border border-cult-border flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-heading text-sm text-cult-text">EXCLUSIVE DROP NOTIFICATIONS</h4>
                    <p className="text-xs font-sans text-cult-muted">Receive 2-hour priority SMS transmissions before new drops go live to public.</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">ACTIVE</span>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-cult-border">
                  <h3 className="font-heading text-xl text-cult-text uppercase">
                    ORDER ARCHIVE ({orders.length})
                  </h3>
                  <Link to="/track-order" className="text-xs font-mono text-cult-accent hover:underline">
                    Track by ID →
                  </Link>
                </div>

                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="p-5 bg-cult-bg border border-cult-border space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono border-b border-cult-border/60 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-cult-text font-bold font-heading text-base">
                            {order.orderNumber}
                          </span>
                          <span className="text-cult-muted">•</span>
                          <span className="text-cult-muted">{order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 font-bold uppercase bg-cult-surface border border-cult-border text-cult-accent">
                            {order.status}
                          </span>
                          <span className="text-cult-text font-bold">₹{order.total}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {order.items.map((it, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <img src={it.image} alt={it.name} className="w-12 h-14 object-cover bg-cult-card border border-cult-border" />
                            <div className="text-xs min-w-0">
                              <span className="font-heading text-cult-text truncate block">{it.name}</span>
                              <span className="text-[10px] font-mono text-cult-muted">
                                {it.color} • {it.size} • QTY: {it.quantity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-cult-border/40 text-xs font-mono">
                        <span className="text-cult-muted">TRACKING: {order.trackingNumber}</span>
                        <Link
                          to={`/track-order?orderId=${order.orderNumber}`}
                          className="text-cult-accent hover:underline flex items-center gap-1"
                        >
                          TRACK PARCEL <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl text-cult-text uppercase pb-3 border-b border-cult-border">
                  SAVED ATELIER DELIVERY DESTINATIONS
                </h3>

                <div className="p-5 bg-cult-bg border border-cult-accent space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-cult-accent font-bold uppercase">// PRIMARY ADDRESS</span>
                    <span className="text-[10px] bg-cult-accent text-black px-2 py-0.5 font-bold">DEFAULT</span>
                  </div>
                  <h4 className="font-heading text-base text-cult-text">DEVIN THORNE</h4>
                  <p className="text-cult-muted">Studio 08, Hauz Khas Village</p>
                  <p className="text-cult-muted">New Delhi, Delhi - 110016, India</p>
                  <p className="text-cult-muted">PHONE: +91 98765 43210</p>
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl text-cult-text uppercase pb-3 border-b border-cult-border">
                  INNER CIRCLE DEVOTEE BENEFITS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 bg-cult-bg border border-cult-border space-y-1">
                    <span className="text-cult-accent font-bold block text-[10px]">CURRENT TIER</span>
                    <span className="font-heading text-lg text-cult-text">ELITE INITIATE</span>
                    <p className="text-[10px] text-cult-muted">Permanent 10% discount on all future drops with code CULT10.</p>
                  </div>
                  <div className="p-4 bg-cult-bg border border-cult-border space-y-1">
                    <span className="text-cult-accent font-bold block text-[10px]">CREDITS ACCRUED</span>
                    <span className="font-heading text-lg text-cult-text">1,450 PTS</span>
                    <p className="text-[10px] text-cult-muted">Redeemable for ₹1,450 off during checkout on orders over ₹3,000.</p>
                  </div>
                  <div className="p-4 bg-cult-bg border border-cult-border space-y-1">
                    <span className="text-cult-accent font-bold block text-[10px]">PRIORITY ACCESS</span>
                    <span className="font-heading text-lg text-emerald-400">UNLOCKED</span>
                    <p className="text-[10px] text-cult-muted">Direct invites to secret sample sales and runway lookbooks.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
