import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { AuthProvider } from './context/AuthContext';

import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LookbookPage } from './pages/LookbookPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnsRefundsPage } from './pages/ReturnsRefundsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';

// Customer Pages
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackOrderPage } from './pages/TrackOrderPage';

// Shopping Pages
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { CatalogPreviewPage } from './pages/CatalogPreviewPage';

// Layout shell
const Layout: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cult-bg text-cult-text">
      {/* 01. Announcement Bar */}
      <AnnouncementBar />

      {/* 02. Sticky Navigation */}
      <Header onOpenSearch={onOpenSearch} />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 17. Premium Footer */}
      <Footer />

      {/* Global Slide-Out Cart Bag */}
      <CartDrawer />
    </div>
  );
};

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <Router>
                <ScrollToTop />
                
                {/* Search Modal */}
                <SearchModal 
                  isOpen={isSearchOpen} 
                  onClose={() => setIsSearchOpen(false)} 
                />

                <Routes>
                  <Route element={<Layout onOpenSearch={() => setIsSearchOpen(true)} />}>
                    {/* MAIN PAGES (1-23) */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<CollectionPage mode="all" />} />
                    <Route path="/new-arrivals" element={<CollectionPage mode="new-arrivals" />} />
                    <Route path="/bestsellers" element={<CollectionPage mode="bestsellers" />} />
                    
                    {/* The 9 Specific Collection Pages */}
                    <Route path="/collections/:slug" element={<CollectionPage mode="collection" />} />
                    
                    {/* Product Details */}
                    <Route path="/product/:id" element={<ProductDetailPage />} />

                    {/* Editorial & Brand Pages */}
                    <Route path="/lookbook" element={<LookbookPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/size-guide" element={<SizeGuidePage />} />
                    <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                    <Route path="/returns-refunds" element={<ReturnsRefundsPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-conditions" element={<TermsConditionsPage />} />

                    {/* CUSTOMER PAGES (24-30) */}
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/track-order" element={<TrackOrderPage />} />

                    {/* SHOPPING PAGES (31-34) */}
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/search" element={<SearchResultsPage />} />

                    {/* CATALOGUE MANAGEMENT & PREVIEW */}
                    <Route path="/catalog-preview" element={<CatalogPreviewPage />} />
                    <Route path="/admin/catalog" element={<CatalogPreviewPage />} />

                    {/* Fallback 404 Route */}
                    <Route path="*" element={<CollectionPage mode="all" />} />
                  </Route>
                </Routes>
              </Router>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
