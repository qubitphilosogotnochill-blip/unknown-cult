import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string, phone: string) => boolean;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const DEMO_USER: UserProfile = {
  name: 'Devin Thorne',
  email: 'devin@unknowncult.com',
  phone: '+91 98765 43210',
  memberSince: 'March 2024',
  tier: 'INNER CIRCLE ELITE',
  cultPoints: 1450,
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1092',
    orderNumber: 'UC-884920',
    date: '18 Nov 2026',
    status: 'Shipped',
    trackingNumber: 'DEL-UC-9948271',
    carrier: 'BlueDart Express Priority',
    estimatedDelivery: '22 Nov 2026',
    items: [
      {
        productId: 'uc-gym-01',
        name: 'HEAVYWEIGHT OVERSIZED PUMP COVER TEE',
        image: '/images/products/uc-gym-heavytee-front_fc496c56.webp',
        color: 'Pitch Black',
        size: 'L',
        price: 1299,
        quantity: 1
      },
      {
        productId: 'uc-baggy-01',
        name: 'HEAVYWEIGHT MULTI-POCKET CARGO PANTS',
        image: '/images/products/uc-baggy-jeans-front_831f2c27.webp',
        color: 'Tactical Black',
        size: '32',
        price: 2299,
        quantity: 1
      }
    ],
    subtotal: 3598,
    discount: 360,
    shipping: 0,
    total: 3238,
    shippingAddress: {
      fullName: 'Devin Thorne',
      street: 'Studio 08, Hauz Khas Village',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      phone: '+91 98765 43210'
    },
    paymentMethod: 'UPI (GPay / devin@okaxis)'
  },
  {
    id: 'ord-1081',
    orderNumber: 'UC-773104',
    date: '02 Oct 2026',
    status: 'Delivered',
    trackingNumber: 'DEL-UC-8812390',
    carrier: 'Delhivery Surface',
    estimatedDelivery: '06 Oct 2026',
    items: [
      {
        productId: 'uc-hood-01',
        name: 'FORTRESS 500 GSM HEAVYWEIGHT PULLOVER HOODIE',
        image: '/images/products/uc-hoodie-black-front_a7af8199.webp',
        color: 'Onyx Noir',
        size: 'XL',
        price: 2799,
        quantity: 1
      }
    ],
    subtotal: 2799,
    discount: 0,
    shipping: 0,
    total: 2799,
    shippingAddress: {
      fullName: 'Devin Thorne',
      street: 'Studio 08, Hauz Khas Village',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      phone: '+91 98765 43210'
    },
    paymentMethod: 'Credit Card (ending 4291)'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('uc_user');
      return saved ? JSON.parse(saved) : DEMO_USER; // Default to demo user for instant rich browsing
    } catch {
      return DEMO_USER;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('uc_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('uc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('uc_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('uc_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (email: string) => {
    setUser({
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: '+91 98765 43210',
      memberSince: 'Just now',
      tier: 'CULT INITIATE',
      cultPoints: 100,
    });
    return true;
  };

  const register = (name: string, email: string, _pass: string, phone: string) => {
    setUser({
      name,
      email,
      phone,
      memberSince: 'Today',
      tier: 'CULT INITIATE',
      cultPoints: 200,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const getOrderById = (orderId: string): Order | undefined => {
    const clean = orderId.trim().toUpperCase();
    return orders.find(o => 
      o.id.toUpperCase() === clean || 
      o.orderNumber.toUpperCase() === clean || 
      o.trackingNumber.toUpperCase() === clean
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        orders,
        addOrder,
        getOrderById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
