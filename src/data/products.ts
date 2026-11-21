import { Product } from '../types';
import rawCatalog from './products.catalog.json';

/**
 * UNKNOWN CULT — MASTER CATALOGUE DATA SOURCE
 * 
 * Powered by catalog/products.catalog.json.
 * Only APPROVED products are published to the public customer store!
 * Incomplete drafts and flagged reviews are strictly hidden from public collections.
 */

// Master product catalogue (all records, including drafts)
export const ALL_CATALOG_PRODUCTS: Product[] = rawCatalog as unknown as Product[];

// Live public store products: Only APPROVED products are published!
export const PRODUCTS: Product[] = ALL_CATALOG_PRODUCTS.filter(
  p => p.status === 'approved' || (!p.status && p.price !== null)
);

// Helper search and filter utilities
export function getProductById(id: string): Product | undefined {
  return ALL_CATALOG_PRODUCTS.find(p => p.id === id || p.slug === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter(p => p.categorySlug === categorySlug);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter(p => p.isNewDrop);
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter(p => p.isBestseller);
}

export function getTrendingProducts(): Product[] {
  return PRODUCTS.filter(p => p.isTrending || p.rating >= 4.9);
}

export function getPendingApprovalProducts(): Product[] {
  return ALL_CATALOG_PRODUCTS.filter(p => p.status === 'pending_approval');
}

export function getFlaggedProducts(): Product[] {
  return ALL_CATALOG_PRODUCTS.filter(p => p.status === 'flagged_review');
}

export function getApprovedProducts(): Product[] {
  return ALL_CATALOG_PRODUCTS.filter(p => p.status === 'approved');
}
