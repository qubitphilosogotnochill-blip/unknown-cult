import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const OrdersPage: React.FC = () => {
  const { orders } = useAuth();
  const [filterStatus, setFilterStatus] = useState<'all' | 'Shipped' | 'Delivered'>('all');

  const filteredOrders = orders.filter(o => 
    filterStatus === 'all' ? true : o.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <Breadcrumbs items={[{ label: 'MY ORDERS' }]} className="mb-6" />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-cult-border pb-6 mb-8 gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-1">
              // ATELIER PURCHASES
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
              ORDER ARCHIVE ({orders.length})
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 text-xs font-mono border ${
                filterStatus === 'all'
                  ? 'border-cult-accent bg-cult-accent text-black font-bold'
                  : 'border-cult-border bg-cult-surface text-cult-muted hover:text-cult-text'
              }`}
            >
              ALL ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('Shipped')}
              className={`px-3 py-1.5 text-xs font-mono border ${
                filterStatus === 'Shipped'
                  ? 'border-cult-accent bg-cult-accent text-black font-bold'
                  : 'border-cult-border bg-cult-surface text-cult-muted hover:text-cult-text'
              }`}
            >
              ACTIVE IN-TRANSIT
            </button>
            <button
              onClick={() => setFilterStatus('Delivered')}
              className={`px-3 py-1.5 text-xs font-mono border ${
                filterStatus === 'Delivered'
                  ? 'border-cult-accent bg-cult-accent text-black font-bold'
                  : 'border-cult-border bg-cult-surface text-cult-muted hover:text-cult-text'
              }`}
            >
              DELIVERED
            </button>
          </div>
        </div>

        {/* Orders Listing */}
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-cult-surface border border-cult-border p-6 sm:p-8 space-y-6 shadow-md">
              
              {/* Order Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cult-border gap-3 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-heading text-2xl text-cult-text">{order.orderNumber}</span>
                  <span className="text-cult-muted">•</span>
                  <span className="text-cult-muted">PLACED ON {order.date.toUpperCase()}</span>
                  <span className="text-cult-muted">•</span>
                  <span className="text-cult-muted">TOTAL: ₹{order.total}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-[11px] font-bold uppercase border ${
                    order.status === 'Delivered'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-cult-accent/40 bg-cult-accent/10 text-cult-accent'
                  }`}>
                    {order.status}
                  </span>

                  <Link
                    to={`/track-order?orderId=${order.orderNumber}`}
                    className="bg-cult-accent text-black px-4 py-2 font-heading text-xs tracking-wider uppercase font-bold hover:bg-white transition-colors flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>TRACK</span>
                  </Link>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items.map((it, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-cult-bg border border-cult-border">
                    <img src={it.image} alt={it.name} className="w-16 h-20 object-cover bg-cult-card shrink-0 border border-cult-border" />
                    <div className="min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-sm text-cult-text truncate">{it.name}</h4>
                        <div className="text-[11px] font-mono text-cult-muted mt-0.5">
                          SIZE: {it.size} • {it.color}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-cult-accent">
                        ₹{it.price} × {it.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier info footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-cult-border/60 text-xs font-mono text-cult-muted gap-2">
                <span>CARRIER: {order.carrier} (AWB: {order.trackingNumber})</span>
                <span className="text-cult-text">DELIVERING TO: {order.shippingAddress.fullName}, {order.shippingAddress.city}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
