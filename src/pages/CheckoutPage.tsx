import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Check, 
  ArrowRight, 
  Lock, 
  QrCode, 
  Banknote, 
  Building 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order, OrderItem } from '../types';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discount, shippingFee, finalTotal, clearCart } = useCart();
  const { addOrder, user } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState(user?.email || 'devin@unknowncult.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [fullName, setFullName] = useState(user?.name || 'Devin Thorne');
  const [street, setStreet] = useState('Studio 08, Hauz Khas Village');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('110016');

  // Shipping & Payment selection
  const [shippingMethod, setShippingMethod] = useState<'express' | 'priority'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  // UPI sub-options
  const [upiId, setUpiId] = useState('devin@okaxis');

  // Card sub-options
  const [cardNumber, setCardNumber] = useState('4291 •••• •••• 8812');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('892');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-heading text-4xl text-cult-text">YOUR BAG IS EMPTY</h2>
        <p className="text-xs text-cult-muted max-w-sm font-sans">
          Add items to your bag before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="bg-cult-accent text-black px-6 py-3 font-heading text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
        >
          EXPLORE THE ARCHIVE
        </Link>
      </div>
    );
  }

  const shippingCost = shippingMethod === 'priority' ? 199 : shippingFee;
  const orderGrandTotal = Math.max(0, subtotal - discount + shippingCost);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `UC-${randomSuffix}`;
    const trackingNumber = `DEL-UC-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const orderItems: OrderItem[] = items.map(it => ({
      productId: it.product.id,
      name: it.product.name,
      image: it.product.images[0],
      color: it.selectedColor.name,
      size: it.selectedSize,
      price: it.product.price,
      quantity: it.quantity
    }));

    const newOrder: Order = {
      id: `ord-${randomSuffix}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
      trackingNumber,
      carrier: 'BlueDart Express Priority Air',
      estimatedDelivery: '3 Business Days',
      items: orderItems,
      subtotal,
      discount,
      shipping: shippingCost,
      total: orderGrandTotal,
      shippingAddress: {
        fullName,
        street,
        city,
        state,
        pincode,
        phone
      },
      paymentMethod: 
        paymentMethod === 'upi' ? `UPI (${upiId})` :
        paymentMethod === 'card' ? `Credit Card (ending ${cardNumber.slice(-4)})` :
        paymentMethod === 'netbanking' ? 'Net Banking (HDFC Bank)' : 'Cash on Delivery (Verified)'
    };

    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation?orderNumber=${orderNumber}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cult-bg py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="border-b border-cult-border pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-cult-mega uppercase text-cult-accent font-bold block mb-1">
              // ATELIER CHECKOUT
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl text-cult-text uppercase leading-none">
              EXPRESS CHECKOUT
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cult-muted">
            <Lock className="w-4 h-4 text-cult-accent" />
            <span>256-BIT SSL ENCRYPTION</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Checkout Steps Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Contact Details */}
            <div className="p-6 bg-cult-surface border border-cult-border space-y-4">
              <div className="flex items-center justify-between border-b border-cult-border pb-3">
                <h3 className="font-heading text-lg text-cult-text uppercase flex items-center gap-2">
                  <span className="w-5 h-5 bg-cult-accent text-black font-mono text-xs rounded-full flex items-center justify-center font-bold">1</span>
                  CONTACT INFORMATION
                </h3>
                <span className="text-[10px] font-mono text-cult-muted">STEP 1 OF 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                    EMAIL FOR DISPATCH UPDATES
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                    MOBILE (FOR SMS TRACKING & OTP)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="p-6 bg-cult-surface border border-cult-border space-y-4">
              <div className="flex items-center justify-between border-b border-cult-border pb-3">
                <h3 className="font-heading text-lg text-cult-text uppercase flex items-center gap-2">
                  <span className="w-5 h-5 bg-cult-accent text-black font-mono text-xs rounded-full flex items-center justify-center font-bold">2</span>
                  SHIPPING ADDRESS (DOMESTIC INDIA)
                </h3>
                <span className="text-[10px] font-mono text-cult-muted">STEP 2 OF 3</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                    RECIPIENT FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                    STREET ADDRESS / BUILDING / SUITE
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                      CITY
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                      STATE
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={e => setState(e.target.value)}
                      className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-cult-muted block mb-1">
                      PINCODE
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      className="w-full bg-cult-bg border border-cult-border p-3 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Delivery Speed Selection */}
              <div className="pt-3 border-t border-cult-border space-y-2">
                <label className="text-[10px] font-mono uppercase text-cult-muted block">
                  SELECT DELIVERY SPEED
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-3 border cursor-pointer flex items-center justify-between ${
                      shippingMethod === 'express'
                        ? 'border-cult-accent bg-cult-card text-cult-text'
                        : 'border-cult-border text-cult-muted hover:border-cult-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-cult-accent" />
                      <div>
                        <span className="text-xs font-bold font-mono block">BLUEDART EXPRESS AIR</span>
                        <span className="text-[10px] text-cult-muted">2–3 Business Days</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('priority')}
                    className={`p-3 border cursor-pointer flex items-center justify-between ${
                      shippingMethod === 'priority'
                        ? 'border-cult-accent bg-cult-card text-cult-text'
                        : 'border-cult-border text-cult-muted hover:border-cult-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-xs font-bold font-mono block">VIP NEXT-DAY AIR</span>
                        <span className="text-[10px] text-cult-muted">Dispatched within 6 hrs</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold">₹199</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="p-6 bg-cult-surface border border-cult-border space-y-4">
              <div className="flex items-center justify-between border-b border-cult-border pb-3">
                <h3 className="font-heading text-lg text-cult-text uppercase flex items-center gap-2">
                  <span className="w-5 h-5 bg-cult-accent text-black font-mono text-xs rounded-full flex items-center justify-center font-bold">3</span>
                  PAYMENT GATEWAY
                </h3>
                <span className="text-[10px] font-mono text-cult-muted">STEP 3 OF 3</span>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 text-xs font-mono border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-cult-accent bg-cult-card text-cult-accent font-bold'
                      : 'border-cult-border bg-cult-bg text-cult-muted hover:text-cult-text'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 text-xs font-mono border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-cult-accent bg-cult-card text-cult-accent font-bold'
                      : 'border-cult-border bg-cult-bg text-cult-muted hover:text-cult-text'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>CARDS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 text-xs font-mono border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-cult-accent bg-cult-card text-cult-accent font-bold'
                      : 'border-cult-border bg-cult-bg text-cult-muted hover:text-cult-text'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>NET BANKING</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 text-xs font-mono border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-cult-accent bg-cult-card text-cult-accent font-bold'
                      : 'border-cult-border bg-cult-bg text-cult-muted hover:text-cult-text'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  <span>CASH ON DEL.</span>
                </button>
              </div>

              {/* Method Dynamic Details */}
              <div className="p-4 bg-cult-card border border-cult-border space-y-3">
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cult-accent font-bold">INSTANT ZERO-FEE UPI TRANSFER</span>
                      <span className="text-cult-muted">GPAY / PHONEPE / PAYTM</span>
                    </div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@okhdfcbank"
                      className="w-full bg-cult-bg border border-cult-border p-2.5 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    />
                    <p className="text-[11px] text-cult-muted font-mono">
                      A payment request will be triggered to your UPI app immediately after placing order.
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      placeholder="CARD NUMBER"
                      className="w-full bg-cult-bg border border-cult-border p-2.5 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-cult-bg border border-cult-border p-2.5 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                      />
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        placeholder="CVV"
                        className="w-full bg-cult-bg border border-cult-border p-2.5 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2 text-xs font-mono">
                    <span className="text-cult-muted block">SELECT MAJOR INDIAN BANK:</span>
                    <select className="w-full bg-cult-bg border border-cult-border p-2.5 text-xs font-mono text-cult-text focus:outline-none focus:border-cult-accent">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="space-y-1 text-xs font-mono text-cult-muted">
                    <p className="text-cult-text font-bold">CASH ON DELIVERY (VERIFIED)</p>
                    <p>Pay cash or QR code to the delivery courier upon doorstep parcel handover.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Checkout Order Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-cult-surface border border-cult-border space-y-5 sticky top-24">
              <h3 className="font-heading text-xl text-cult-text uppercase pb-3 border-b border-cult-border">
                ORDER SUMMARY ({items.length} SILHOUETTES)
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center py-1">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover bg-cult-card border border-cult-border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-heading text-xs text-cult-text truncate block">
                        {item.product.name}
                      </span>
                      <div className="text-[10px] font-mono text-cult-muted">
                        QTY: {item.quantity} • {item.selectedColor.name} • {item.selectedSize}
                      </div>
                    </div>
                    <span className="font-heading text-sm text-cult-text shrink-0">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculation */}
              <div className="space-y-2 text-xs font-mono text-cult-muted pt-3 border-t border-cult-border">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-cult-text">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-cult-accent">
                    <span>DISCOUNT APPLIED</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>SHIPPING</span>
                  <span className="text-cult-text">{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-cult-text pt-3 border-t border-cult-border font-heading tracking-wider">
                  <span>FINAL TOTAL</span>
                  <span className="text-cult-accent text-2xl">₹{orderGrandTotal}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cult-accent text-black py-4 px-6 font-heading text-sm tracking-cult-widest uppercase hover:bg-cult-accent-hover transition-colors font-bold shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING ORDER TO ATELIER...</span>
                ) : (
                  <>
                    <span>CONFIRM & PLACE ORDER — ₹{orderGrandTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[10px] font-mono text-cult-muted text-center pt-1 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cult-accent" />
                <span>7-DAY RETURN ASSURANCE // OFFICIAL GUARANTEE</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
