import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const productsTsPath = path.join(projectRoot, 'src', 'data', 'products.ts');
const catalogDir = path.join(projectRoot, 'catalog');
const catalogJsonPath = path.join(catalogDir, 'products.catalog.json');
const srcCatalogJsonPath = path.join(projectRoot, 'src', 'data', 'products.catalog.json');
const cacheDir = path.join(projectRoot, '.cache');

if (!fs.existsSync(catalogDir)) fs.mkdirSync(catalogDir, { recursive: true });
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

// Read products.ts and strip TypeScript type annotations to parse as pure JS object
const tsContent = fs.readFileSync(productsTsPath, 'utf8');

// Find the start of the PRODUCTS array
const startMarker = 'export const PRODUCTS: Product[] = [';
const startIndex = tsContent.indexOf(startMarker);
const endIndex = tsContent.indexOf('// Helper search and filter utility');

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate PRODUCTS array markers in products.ts');
  process.exit(1);
}

const arrayCode = tsContent.substring(startIndex + startMarker.length - 1, endIndex).trim();

// Clean trailing semicolon if present
const cleanArrayCode = arrayCode.replace(/;\s*$/, '');

// Safely evaluate the array literal in a JS function
const evaluateProducts = new Function(`return ${cleanArrayCode};`);
const rawProducts = evaluateProducts();

console.log(`Successfully parsed ${rawProducts.length} products from products.ts!`);

// Enhance with catalog schema attributes
const catalogProducts = rawProducts.map(p => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  tagline: p.tagline,
  description: p.description,
  category: p.category,
  categorySlug: p.categorySlug,
  price: p.price,
  originalPrice: p.originalPrice || null,
  images: p.images,
  imageAngles: p.images.map((img, idx) => ({
    angle: idx === 0 ? 'front' : idx === 1 ? 'back' : idx === 2 ? 'side' : 'detail',
    path: img
  })),
  colors: p.colors,
  sizes: p.sizes,
  stockStatus: p.stockStatus,
  fit: p.fit,
  fabric: p.fabric,
  care: p.care,
  sku: p.sku,
  rating: p.rating,
  reviewsCount: p.reviewsCount,
  isNewDrop: !!p.isNewDrop,
  isBestseller: !!p.isBestseller,
  isTrending: !!p.isTrending,
  tags: p.tags,
  details: p.details,
  complementaryProductIds: p.complementaryProductIds || [],
  status: 'approved', // All pre-existing 84 products are approved
  requiresApproval: false,
  missingFields: [],
  relationshipCertainty: 'high',
  source: 'core_archive'
}));

// Write to both catalog/products.catalog.json and src/data/products.catalog.json
fs.writeFileSync(catalogJsonPath, JSON.stringify(catalogProducts, null, 2), 'utf8');
fs.writeFileSync(srcCatalogJsonPath, JSON.stringify(catalogProducts, null, 2), 'utf8');

console.log(`Saved ${catalogProducts.length} products to:`);
console.log(`  - ${path.relative(projectRoot, catalogJsonPath)}`);
console.log(`  - ${path.relative(projectRoot, srcCatalogJsonPath)}`);
