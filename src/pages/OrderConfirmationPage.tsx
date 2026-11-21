import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, Printer, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OrderConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderNumberParam = searchParams.get('orderNumber');
  const { orders } = useAuth();

  const currentOrder = orders.find(o => o.orderNumber === orderNumberParam) || orders[0];

  return (
    <div className="min-h-screen bg-cult-bg py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Confirmation Card */}
        <div className="bg-cult-surface border border-cult-border p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header Status */}
          <div className="text-center space-y-3 pb-8 border-b border-cult-border">
            <div className="w-16 h-16 rounded-full bg-cult-accent/10 border-2 border-cult-accent flex items-center justify-center mx-auto text-cult-accent">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono tracking-cult-mega uppercase text-cult-accent font-bold block">
              // TRANSMISSION SUCCESSFUL
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl text-cult-text uppercase leading-none">
              ORDER CONFIRMED
            </h1>

            <p className="text-xs sm:text-sm text-cult-muted font-sans max-w-md mx-auto">
              Your garments have been assigned to our New Delhi atelier for quality inspection and packaging.
            </p>
          </div>

          {/* Order Snapshot Metadata */}
          {currentOrder && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-cult-card border border-cult-border text-xs font-mono">
              <div>
                <span className="text-cult-muted uppercase block text-[10px]">ORDER NUMBER</span>
                <span className="text-cult-text font-bold">{currentOrder.orderNumber}</span>
              </div>
              <div>
                <span className="text-cult-muted uppercase block text-[10px]">TRACKING CODE</span>
                <span className="text-cult-accent font-bold">{currentOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-cult-muted uppercase block text-[10px]">ESTIMATED ARRIVAL</span>
                <span className="text-cult-text font-bold">{currentOrder.estimatedDelivery}</span>
              </div>
              <div>
                <span className="text-cult-muted uppercase block text-[10px]">TOTAL PAID</span>
                <span className="text-cult-accent font-bold text-sm">₹{currentOrder.total}</span>
              </div>
            </div>
          )}

          {/* Ordered Items List */}
          {currentOrder && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg text-cult-text uppercase flex items-center gap-2">
                <Package className="w-4 h-4 text-cult-accent" />
                CONFIRMED SILHOUETTES ({currentOrder.items.length})
              </h3>

              <div className="divide-y divide-cult-border border border-cult-border bg-cult-bg">
                {currentOrder.items.map((it, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-14 h-18 object-cover bg-cult-card border border-cult-border shrink-0"
                      />
                      <div>
                        <h4 className="font-heading text-sm text-cult-text">{it.name}</h4>
                        <div className="text-xs font-mono text-cult-muted mt-0.5">
                          SIZE: {it.size} • COLOR: {it.color} • QTY: {it.quantity}
                        </div>
                      </div>
                    </div>
                    <span className="font-heading text-sm text-cult-text">
                      ₹{it.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery & Payment Recap */}
          {currentOrder && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-cult-border text-xs font-mono">
              <div className="space-y-1">
                <span className="text-cult-accent font-bold block uppercase mb-1">
                  SHIPPING RECIPIENT
                </span>
                <p className="text-cult-text font-bold">{currentOrder.shippingAddress.fullName}</p>
                <p className="text-cult-muted">{currentOrder.shippingAddress.street}</p>
                <p className="text-cult-muted">{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}</p>
                <p className="text-cult-muted">PHONE: {currentOrder.shippingAddress.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-cult-accent font-bold block uppercase mb-1">
                  PAYMENT & CARRIER
                </span>
                <p className="text-cult-text"><strong className="text-cult-muted">METHOD:</strong> {currentOrder.paymentMethod}</p>
                <p className="text-cult-text"><strong className="text-cult-muted">CARRIER:</strong> {currentOrder.carrier}</p>
                <p className="text-cult-text"><strong className="text-cult-muted">STATUS:</strong> <span className="text-emerald-400 font-bold">VERIFIED</span></p>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-6 border-t border-cult-border flex flex-wrap items-center justify-between gap-4">
            <Link
              to={`/track-order?orderId=${currentOrder?.orderNumber || ''}`}
              className="bg-cult-accent text-black px-6 py-3.5 font-heading text-xs tracking-cult-widest uppercase font-bold hover:bg-white transition-colors flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>LIVE COURIER TRACKING</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-3 border border-cult-border text-xs font-mono uppercase text-cult-muted hover:text-cult-text flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> PRINT SLIP
              </button>

              <Link
                to="/shop"
                className="bg-cult-card border border-cult-border text-cult-text px-5 py-3 font-heading text-xs tracking-widest uppercase hover:border-cult-accent hover:text-cult-accent transition-colors"
              >
                BACK TO ARCHIVE
              </Link>
            </div>
          </div>

          <div className="text-[10px] font-mono text-cult-muted text-center pt-2 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cult-accent" />
            <span>BELONG TO NO ONE // UNKNOWN CULT DOMESTIC DISPATCH</span>
          </div>

        </div>

      </div>
    </div>
  );
};
