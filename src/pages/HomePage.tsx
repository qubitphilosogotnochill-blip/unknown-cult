import React, { useState } from 'react';
import { HeroSlider } from '../components/sliders/HeroSlider';
import { BrandIntroduction } from '../components/home/BrandIntroduction';
import { ShopByCulture } from '../components/home/ShopByCulture';
import { ProductSlider } from '../components/sliders/ProductSlider';
import { CampaignEditorial } from '../components/home/CampaignEditorial';
import { LookbookSection } from '../components/home/LookbookSection';
import { BrandPhilosophySection } from '../components/home/BrandPhilosophySection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { getNewArrivals, getBestsellers } from '../data/products';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const newDrops = getNewArrivals();
  const bestsellers = getBestsellers();

  return (
    <main className="w-full bg-cult-bg">
      {/* 01. HOMEPAGE HERO (MATCHING SCREENSHOT 3) */}
      <HeroSlider />

      {/* 02. BROWSE BY CATEGORY — 9 HORIZONTAL CARDS (MATCHING SCREENSHOT 3) */}
      <ShopByCulture />

      {/* 03. THE LOOKBOOK — EDITORIAL GALLERY (MATCHING SCREENSHOT 3) */}
      <LookbookSection />

      {/* 04. NEW DROPS (HORIZONTAL PRODUCT CAROUSEL) */}
      <ProductSlider
        tag="DROP 08 RELEASE"
        title="NEW DROPS // DROP 08"
        subtitle="The latest architectural silhouettes fresh from our production mills in limited dye batches."
        products={newDrops}
        viewAllLink="/new-arrivals"
        onQuickView={prod => setQuickViewProduct(prod)}
      />

      {/* 05. CAMPAIGN EDITORIAL (MAGAZINE SPREAD) */}
      <CampaignEditorial />

      {/* 06. BRAND INTRODUCTION ("WE DON'T FOLLOW. WE EXIST.") */}
      <BrandIntroduction />

      {/* 07. BESTSELLERS ARCHIVE */}
      <ProductSlider
        tag="CULT DEVOTEES CHOICE"
        title="THE BESTSELLERS ARCHIVE"
        subtitle="Tried, tested and proven in underground venues and iron dungeons worldwide."
        products={bestsellers}
        viewAllLink="/bestsellers"
        onQuickView={prod => setQuickViewProduct(prod)}
      />

      {/* 08. BRAND PHILOSOPHY ("BELONG TO NO ONE.") */}
      <BrandPhilosophySection />

      {/* 09. NEWSLETTER (MINIMAL LUXURY DISPATCH) */}
      <NewsletterSection />

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={quickViewProduct?.category}
      />
    </main>
  );
};
