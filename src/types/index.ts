export type CategorySlug = 
  | 'gym-cult'
  | 'daily-essentials'
  | 'street-cult'
  | 'baggy-utility'
  | 'hood-cult'
  | 'shirt-society'
  | 'co-ord-cult'
  | 'outer-cult'
  | 'cult-accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
  fitVote?: 'Runs small' | 'True to size' | 'Runs large';
}

export type ProductApprovalStatus = 'approved' | 'pending_approval' | 'draft' | 'flagged_review';

export interface ProductImageAngle {
  angle: 'front' | 'back' | 'side' | 'detail' | 'unknown';
  path: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  isDraftPrice?: boolean;
  images: string[];
  imageAngles?: ProductImageAngle[];
  thumbnail?: string;
  gsm?: number;
  category: string;
  categorySlug: CategorySlug;
  colors: ProductColor[];
  sizes: string[];
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'draft_unverified';
  fit: string;
  fabric: string;
  care: string;
  sku: string;
  rating: number;
  reviewsCount: number;
  isNewDrop?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  tags: string[];
  details: string[];
  complementaryProductIds?: string[];
  status?: ProductApprovalStatus;
  requiresApproval?: boolean;
  missingFields?: string[];
  relationshipCertainty?: 'high' | 'medium' | 'low';
  source?: string;
  createdAt?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: CategorySlug;
  tagline: string;
  description: string;
  bannerImage: string;
  mobileBannerImage?: string;
  productCount: number;
  quote?: string;
}

export interface CartItem {
  id: string; // generated combination of product.id + size + color
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  tier: string;
  cultPoints: number;
}
