import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Order } from '../types';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';
  const [query, setQuery] = useState(initialOrderId);

  const { orders, getOrderById } = useAuth();
  const [searchedOrder, setSearchedOrder] = useState<Order | undefined>(
    getOrderById(initialOrderId) || orders[0]
  );
  const [hasSearched, setHasSearched] = useState(!!initialOrderId);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const match = getOrderById(query.trim());
      setSearchedOrder(match);
      setHasSearched(true);
    }
  };

  const steps = [
    { title: 'ORDER CONFIRMED', desc: 'Atelier verified order & allocated fabric run', done: true },
    { title: 'QUALITY CONTROL & LABELLING', desc: 'Hand-inspected for seam strength and dimensional tolerance', done: true },
    { title: 'DISPATCHED VIA BLUEDART AIR', desc: 'Departed Indira Gandhi International Logistics Hub, New Delhi', done: true },
    { title: 'OUT FOR DELIVERY', desc: 'Courier agent allocated for final-mile handover', done: searchedOrder?.status === 'Delivered' },
    { title: 'PARCEL DELIVERED', desc: 'Signed & received by customer', done: searchedOrder?.status === 'Delivered' }
  ];

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'ORDER TRACKING' }]} className="mb-6" />

        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
            // LOGISTICS AUDIT
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
            LIVE ORDER TRACKING
          </h1>
          <p className="text-xs text-cult-muted font-sans">
            Enter your order number (e.g. UC-884920) or BlueDart / Delhivery tracking code.
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-cult-surface border border-cult-border mb-10 shadow-lg">
          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Truck className="w-5 h-5 text-cult-accent absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ENTER ORDER NUMBER OR AWB CODE (e.g. UC-884920)..."
                className="w-full bg-cult-bg border border-cult-border py-3.5 pl-11 pr-4 text-xs font-mono uppercase tracking-wider text-cult-text placeholder-cult-muted focus:outline-none focus:border-cult-accent"
              />
            </div>
            <button
              type="submit"
              className="bg-cult-accent text-black px-6 py-3.5 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
            >
              TRACK NOW
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-cult-muted mt-3">
            <span>RECENT ACTIVE ORDERS:</span>
            {orders.slice(0, 2).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setQuery(o.orderNumber);
                  setSearchedOrder(o);
                  setHasSearched(true);
                }}
                className="text-cult-accent underline hover:text-white"
              >
                {o.orderNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Details Card */}
        {searchedOrder ? (
          <div className="bg-cult-surface border border-cult-border p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* Order Summary Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cult-border gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-cult-muted block uppercase">ORDER TRACKING STATUS</span>
                <span className="font-heading text-3xl text-cult-text">{searchedOrder.orderNumber}</span>
                <div className="text-cult-muted mt-0.5">AWB: {searchedOrder.trackingNumber} • CARRIER: {searchedOrder.carrier}</div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-cult-muted block uppercase">ESTIMATED DELIVERY</span>
                <span className="font-heading text-2xl text-cult-accent">{searchedOrder.estimatedDelivery}</span>
                <div className="text-emerald-400 font-bold uppercase text-[11px] mt-0.5">
                  ● STATUS: {searchedOrder.status.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Visual Stepper / Progress Timeline */}
            <div>
              <h3 className="font-heading text-lg text-cult-text uppercase mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cult-accent" />
                TRANSIT MILESTONES
              </h3>

              <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-cult-border">
                {steps.map((st, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 group">
                    <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      st.done 
                        ? 'bg-cult-accent border-cult-accent' 
                        : 'bg-cult-bg border-cult-muted'
                    }`}>
                      {st.done && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className={`font-heading text-base ${st.done ? 'text-cult-text' : 'text-cult-muted'}`}>
                        {st.title}
                      </div>
                      <p className="text-xs text-cult-muted font-mono">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Address & Items */}
            <div className="pt-6 border-t border-cult-border grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-cult-accent font-bold uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" /> DESTINATION ADDRESS
                </div>
                <p className="text-cult-text font-bold">{searchedOrder.shippingAddress.fullName}</p>
                <p className="text-cult-muted">{searchedOrder.shippingAddress.street}</p>
                <p className="text-cult-muted">{searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - {searchedOrder.shippingAddress.pincode}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-cult-accent font-bold uppercase mb-1">
                  <Package className="w-3.5 h-3.5" /> PARCEL SILHOUETTES ({searchedOrder.items.length})
                </div>
                {searchedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-cult-muted">
                    <span className="truncate max-w-[200px]">{it.name} ({it.size})</span>
                    <span>QTY: {it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          hasSearched && (
            <div className="p-8 bg-cult-surface border border-cult-border text-center space-y-3">
              <h3 className="font-heading text-2xl text-cult-text">NO MATCHING DISPATCH LOCATED</h3>
              <p className="text-xs text-cult-muted font-sans max-w-sm mx-auto">
                Please double check your order number or tracking ID format. Or view your order list in your account.
              </p>
              <Link
                to="/account"
                className="inline-block bg-cult-accent text-black px-6 py-2.5 font-heading text-xs tracking-wider uppercase font-bold hover:bg-white transition-colors"
              >
                VIEW ACCOUNT ORDERS
              </Link>
            </div>
          )
        )}

      </div>
    </div>
  );
};
