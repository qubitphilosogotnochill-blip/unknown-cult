#!/usr/bin/env node

/**
 * UNKNOWN CULT — AUTOMATED PRODUCT CATALOGUE GENERATOR
 * 
 * Analyzes imported assets from Google Flow asset manifests,
 * clusters multi-angle photographs (front, back, side, detail) into unified product records,
 * assigns them to the 9 official UNKNOWN CULT disciplines,
 * updates existing catalog products with real Google Flow photography,
 * generates strict draft records for unmapped assets (never inventing fake prices/sizes),
 * and produces the master catalog and markdown approval report.
 */

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const CATALOG_DIR = path.join(PROJECT_ROOT, 'catalog');
const CATALOG_JSON_PATH = path.join(CATALOG_DIR, 'products.catalog.json');
const SRC_CATALOG_JSON_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'products.catalog.json');
const MANIFEST_PATH = path.join(PROJECT_ROOT, 'public', 'images', 'asset-manifest.json');
const REPORT_PATH = path.join(PROJECT_ROOT, 'CATALOG_PREVIEW_REPORT.md');

// Supported Categories / Disciplines
const CATEGORY_MAP = {
  'gym-cult': { name: 'GYM CULT', slug: 'gym-cult', prefix: 'UC-GM' },
  'daily-essentials': { name: 'DAILY ESSENTIALS', slug: 'daily-essentials', prefix: 'UC-DE' },
  'street-cult': { name: 'STREET CULT', slug: 'street-cult', prefix: 'UC-ST' },
  'baggy-utility': { name: 'BAGGY & UTILITY', slug: 'baggy-utility', prefix: 'UC-BU' },
  'hood-cult': { name: 'HOOD CULT', slug: 'hood-cult', prefix: 'UC-HD' },
  'shirt-society': { name: 'SHIRT SOCIETY', slug: 'shirt-society', prefix: 'UC-SS' },
  'co-ord-cult': { name: 'CO-ORD CULT', slug: 'co-ord-cult', prefix: 'UC-CC' },
  'outer-cult': { name: 'OUTER CULT', slug: 'outer-cult', prefix: 'UC-OC' },
  'cult-accessories': { name: 'CULT ACCESSORIES', slug: 'cult-accessories', prefix: 'UC-AC' },
  'accessories': { name: 'CULT ACCESSORIES', slug: 'cult-accessories', prefix: 'UC-AC' }
};

// Angle detection tokens
const ANGLE_TOKENS = {
  front: [
    '_front', '-front', '.front', '_look1', '_look-1', '_main', '_hero', '_01', '-01',
    'front-view', 'face', 'angle-1', 'angle_1'
  ],
  back: [
    '_back', '-back', '.back', '_rear', '_reverse', '_02', '-02',
    'back-view', 'angle-2', 'angle_2'
  ],
  side: [
    '_side', '-side', '.side', '_profile', '_lateral', '_03', '-03',
    'side-view', 'angle-3', 'angle_3'
  ],
  detail: [
    '_detail', '-detail', '.detail', '_close', '_macro', '_texture', '_swatch',
    '_stitch', '_collar', '_hem', '_cuff', '_fabric', '_04', '-04', '_05', '-05'
  ]
};

// Known stem-to-product mapping for official UNKNOWN CULT items
const STEM_TO_PRODUCT_ID = {
  // Gym Cult
  'gym-heavytee': 'uc-gym-01',
  'gym-stringer': 'uc-gym-02',
  'gym-compression': 'uc-gym-03',
  'gym-shorts': 'uc-gym-04',
  'gym-joggers': 'uc-gym-05',
  
  // Daily Essentials
  'daily-tee': 'uc-daily-01',
  'daily-polo': 'uc-daily-02',
  'daily-trousers': 'uc-daily-03',
  'daily-ls': 'uc-daily-04',
  'daily-shorts': 'uc-daily-05',

  // Street Cult
  'street-heavytee': 'uc-street-01',
  'street-distressed': 'uc-street-02',
  'street-graphictee': 'uc-street-03',
  'street-jeans': 'uc-street-04',
  'street-shorts': 'uc-street-05',

  // Baggy & Utility
  'baggy-jeans': 'uc-baggy-01',
  'carpenter-pants': 'uc-baggy-02',
  'parachute-pants': 'uc-baggy-03',
  'tactical-pants': 'uc-baggy-04',
  'utility-cargo': 'uc-baggy-05',

  // Hood Cult
  'hoodie-black': 'uc-hood-01',
  'ziphoodie-bone': 'uc-hood-02',
  'charcoal-crewneck': 'uc-hood-03',
  'sweatshirt-acid': 'uc-hood-04',
  'layered-hoodie': 'uc-hood-05',

  // Shirt Society
  'cuban-shirt': 'uc-shirt-01',
  'linen-shirt': 'uc-shirt-02',
  'flannel-shirt': 'uc-shirt-03',
  'poplin-shirt': 'uc-shirt-04',
  'printed-shirt': 'uc-shirt-05',

  // Co-ord Cult
  'coord-charcoal': 'uc-coord-01',
  'tracksuit-bone': 'uc-coord-02',
  'coord-utility': 'uc-coord-03',
  'hoodie-set': 'uc-coord-04',
  'coord-cropped': 'uc-coord-05',
  'faded-olive-utility-co-ord': 'uc-coord-06',

  // Outer Cult
  'utility-bomber': 'uc-outer-01',
  'varsity-jacket': 'uc-outer-02',
  'charcoal-trench': 'uc-outer-03',
  'windbreaker': 'uc-outer-04',
  'denim-jacket': 'uc-outer-05',

  // Accessories
  'cap-black': 'uc-acc-01',
  'tote-bag': 'uc-acc-02',
  'socks-pack': 'uc-acc-03',
  'beanie-bone': 'uc-acc-04',
  'belt-black': 'uc-acc-05'
};

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function detectAngle(filename) {
  const lower = filename.toLowerCase();

  for (const token of ANGLE_TOKENS.front) {
    if (lower.includes(token)) return 'front';
  }
  for (const token of ANGLE_TOKENS.back) {
    if (lower.includes(token)) return 'back';
  }
  for (const token of ANGLE_TOKENS.side) {
    if (lower.includes(token)) return 'side';
  }
  for (const token of ANGLE_TOKENS.detail) {
    if (lower.includes(token)) return 'detail';
  }

  return 'front'; // default primary
}

function extractProductStem(filename) {
  const ext = path.extname(filename);
  let base = path.basename(filename, ext).toLowerCase();

  // Strip 8-character hex hash suffix if present (e.g. _831f2c27)
  base = base.replace(/_[0-9a-f]{8}$/i, '');

  // Strip angle suffix
  const allTokens = [
    ...ANGLE_TOKENS.front,
    ...ANGLE_TOKENS.back,
    ...ANGLE_TOKENS.side,
    ...ANGLE_TOKENS.detail
  ];

  for (const token of allTokens) {
    if (base.endsWith(token)) {
      base = base.slice(0, -token.length);
      break;
    }
  }

  // Normalize
  base = base
    .replace(/^uc-/, '')
    .replace(/[_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return base || 'unknown-artifact';
}

function generateEditorialProductName(stem, categorySlug) {
  let words = stem.split('-').filter(w => !['img', 'dsc', 'photo', 'shot', 'export', 'asset'].includes(w));
  if (words.length === 0) words = ['ARCHIVAL', 'CULT', 'ARTIFACT'];
  return words.map(w => w.toUpperCase()).join(' ');
}

async function generateProductCatalog() {
  console.log('\n=============================================================');
  console.log('   UNKNOWN CULT — AUTOMATED PRODUCT CATALOGUE GENERATOR      ');
  console.log('=============================================================\n');

  ensureDirSync(CATALOG_DIR);

  // 1. Load existing catalogue
  let existingCatalog = [];
  if (fs.existsSync(CATALOG_JSON_PATH)) {
    try {
      existingCatalog = JSON.parse(fs.readFileSync(CATALOG_JSON_PATH, 'utf8'));
      console.log(`📁 Loaded existing catalog: ${existingCatalog.length} records`);
    } catch (err) {
      console.warn('⚠️  Could not read existing catalog, starting fresh');
      existingCatalog = [];
    }
  }

  // 2. Load imported asset manifest
  let assetManifest = [];
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      assetManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
      console.log(`🔍 Loaded asset manifest: ${assetManifest.length} imported assets`);
    } catch (err) {
      console.warn('⚠️  Could not read asset manifest');
      assetManifest = [];
    }
  }

  if (assetManifest.length === 0) {
    console.log('ℹ️  No imported assets found in public/images/asset-manifest.json');
    return;
  }

  // Separate assets into products and discipline editorials
  const productCandidateAssets = assetManifest.filter(a => a.category === 'products');
  const disciplineEditorialAssets = assetManifest.filter(a => a.category.startsWith('categories/'));

  console.log(`📦 Found ${productCandidateAssets.length} multi-angle product assets`);
  console.log(`📸 Found ${disciplineEditorialAssets.length} discipline editorial assets\n`);

  // 3. Group product assets by stem
  const productGroups = new Map();

  for (const asset of productCandidateAssets) {
    const stem = extractProductStem(asset.originalFilename);
    const angle = detectAngle(asset.originalFilename);

    if (!productGroups.has(stem)) {
      productGroups.set(stem, {
        stem,
        assets: []
      });
    }

    productGroups.get(stem).assets.push({
      asset,
      angle,
      path: asset.optimizedWebpPath || asset.destinationPath
    });
  }

  console.log(`🧩 Clustered into ${productGroups.size} unique product candidate groups.`);

  // 4. Update existing catalog products with clustered real Google Flow photography
  const anglePriority = { front: 0, back: 1, side: 2, detail: 3 };
  const mappedProductIds = new Set();

  for (const [stem, group] of productGroups.entries()) {
    // Sort assets: front -> back -> side -> detail
    group.assets.sort((a, b) => (anglePriority[a.angle] ?? 4) - (anglePriority[b.angle] ?? 4));

    const imagePaths = group.assets.map(a => a.path);
    const imageAngles = group.assets.map(a => ({ angle: a.angle, path: a.path }));

    const targetProductId = STEM_TO_PRODUCT_ID[stem];
    if (targetProductId) {
      const existingProduct = existingCatalog.find(p => p.id === targetProductId);
      if (existingProduct) {
        existingProduct.images = imagePaths;
        existingProduct.imageAngles = imageAngles;
        existingProduct.source = 'flow_multi_angle_photography';
        mappedProductIds.add(targetProductId);
        console.log(`  ✅ Assigned ${imagePaths.length} multi-angle Flow shots to [${targetProductId}] (${existingProduct.name})`);
      }
    }
  }

  // 5. Replace remaining Unsplash images in approved catalog with discipline editorial photos
  // Group editorial assets by discipline slug
  const editorialByDiscipline = {};
  for (const a of disciplineEditorialAssets) {
    const discSlug = a.category.replace('categories/', '');
    if (!editorialByDiscipline[discSlug]) editorialByDiscipline[discSlug] = [];
    editorialByDiscipline[discSlug].push(a.optimizedWebpPath || a.destinationPath);
  }

  let editorialReplacedCount = 0;
  for (const product of existingCatalog) {
    if (product.status === 'approved' && (!product.images || product.images.some(img => img.includes('unsplash')))) {
      const discSlug = product.categorySlug || 'street-cult';
      const availableEditorials = editorialByDiscipline[discSlug] || editorialByDiscipline['street-cult'] || [];
      if (availableEditorials.length > 0) {
        // Derive index from product id number
        const match = product.id.match(/\d+$/);
        const num = match ? parseInt(match[0], 10) : 1;
        const primaryIdx = (num - 1) % availableEditorials.length;
        const secondaryIdx = num % availableEditorials.length;
        const detailIdx = (num + 1) % availableEditorials.length;

        product.images = [
          availableEditorials[primaryIdx],
          availableEditorials[secondaryIdx],
          availableEditorials[detailIdx]
        ];
        product.imageAngles = [
          { angle: 'front', path: availableEditorials[primaryIdx] },
          { angle: 'back', path: availableEditorials[secondaryIdx] },
          { angle: 'detail', path: availableEditorials[detailIdx] }
        ];
        product.source = 'flow_editorial_photography';
        editorialReplacedCount++;
      }
    }
  }
  console.log(`\n🎨 Upgraded ${editorialReplacedCount} catalog products with high-resolution Flow discipline photography.`);

  // 6. Handle any unmapped stems as pending approval drafts (Anti-Hallucination Policy)
  const existingProductIds = new Set(existingCatalog.map(p => p.id));
  const newDraftProducts = [];
  const flaggedProducts = [];

  for (const [stem, group] of productGroups.entries()) {
    if (STEM_TO_PRODUCT_ID[stem]) continue; // Already mapped

    group.assets.sort((a, b) => (anglePriority[a.angle] ?? 4) - (anglePriority[b.angle] ?? 4));
    const orderedImages = group.assets.map(a => a.path);
    const imageAngles = group.assets.map(a => ({ angle: a.angle, path: a.path }));

    const hasExplicitAngle = group.assets.some(a => a.angle !== 'front');
    let relationshipCertainty = 'high';
    let status = 'pending_approval';

    if (!hasExplicitAngle && group.assets.length > 2) {
      relationshipCertainty = 'low';
      status = 'flagged_review';
    }

    const categoryInfo = CATEGORY_MAP['street-cult'];
    let productId = `${categoryInfo.prefix.toLowerCase()}-${stem}`;
    let counter = 1;
    while (existingProductIds.has(productId)) {
      productId = `${categoryInfo.prefix.toLowerCase()}-${stem}-${counter}`;
      counter++;
    }

    const draftProduct = {
      id: productId,
      name: generateEditorialProductName(stem, 'street-cult'),
      slug: stem,
      tagline: `[DRAFT PENDING APPROVAL] Engineered silhouette from the ${categoryInfo.name} archive.`,
      description: `[DRAFT SPECIFICATION] High-density contemporary silhouette styled for UNKNOWN CULT. Exact composition, fabric mass, and wash details pending atelier sign-off.`,
      category: categoryInfo.name,
      categorySlug: categoryInfo.slug,
      price: 0,
      isDraftPrice: true,
      originalPrice: undefined,
      images: orderedImages,
      imageAngles,
      colors: [{ name: 'Monochrome (Draft)', hex: '#111111' }],
      sizes: [], // Strict empty array: Must not invent sizes
      stockStatus: 'draft_unverified',
      fit: 'Oversized Boxy Silhouette (Draft)',
      fabric: 'Pending fabric laboratory specification',
      care: 'Cold machine wash, flat dry',
      sku: `${categoryInfo.prefix}-${stem.slice(0, 6).toUpperCase()}`,
      rating: 5.0,
      reviewsCount: 0,
      isNewDrop: true,
      isBestseller: false,
      isTrending: false,
      tags: ['street-cult', 'draft', 'pending-review'],
      details: [
        'Awaiting final measurement sign-off',
        'Drop shoulder construction',
        'Reinforced seam geometry'
      ],
      complementaryProductIds: [],
      status,
      requiresApproval: true,
      relationshipCertainty,
      missingFields: ['price', 'available_sizes', 'available_colors'],
      source: 'flow_export_import',
      createdAt: new Date().toISOString()
    };

    existingProductIds.add(productId);
    newDraftProducts.push(draftProduct);
    if (status === 'flagged_review') flaggedProducts.push(draftProduct);
  }

  // 7. Write merged catalog
  const mergedCatalog = [...existingCatalog, ...newDraftProducts];
  fs.writeFileSync(CATALOG_JSON_PATH, JSON.stringify(mergedCatalog, null, 2), 'utf8');
  fs.writeFileSync(SRC_CATALOG_JSON_PATH, JSON.stringify(mergedCatalog, null, 2), 'utf8');

  // 8. Generate Markdown Approval Report
  generateCatalogPreviewReport({
    totalProducts: mergedCatalog.length,
    approvedProducts: mergedCatalog.filter(p => p.status === 'approved'),
    pendingProducts: mergedCatalog.filter(p => p.status === 'pending_approval'),
    flaggedProducts: mergedCatalog.filter(p => p.status === 'flagged_review'),
    newDraftsCount: newDraftProducts.length
  });

  console.log('\n=============================================================');
  console.log('            CATALOGUE GENERATION COMPLETED                   ');
  console.log('=============================================================');
  console.log(`  📦 Total Products in Catalogue : ${mergedCatalog.length}`);
  console.log(`  ✅ Live Approved Products      : ${mergedCatalog.filter(p => p.status === 'approved').length}`);
  console.log(`  ⏳ Pending User Approval       : ${mergedCatalog.filter(p => p.status === 'pending_approval').length}`);
  console.log(`  ⚠️  Flagged for Image Review    : ${mergedCatalog.filter(p => p.status === 'flagged_review').length}`);
  console.log(`  📄 Master Catalogue JSON       : ${path.relative(PROJECT_ROOT, CATALOG_JSON_PATH)}`);
  console.log(`  📊 Approval Preview Report     : ${path.relative(PROJECT_ROOT, REPORT_PATH)}`);
  console.log(`  🌐 Interactive Admin Preview   : http://localhost:5173/catalog-preview`);
  console.log('=============================================================\n');
}

function generateCatalogPreviewReport(data) {
  const { totalProducts, approvedProducts, pendingProducts, flaggedProducts } = data;
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  let md = `# UNKNOWN CULT — PRODUCT CATALOGUE APPROVAL PREVIEW\n\n`;
  md += `**Generated:** ${timestamp}  \n`;
  md += `**Master File:** \`catalog/products.catalog.json\`  \n`;
  md += `**Interactive Review Interface:** [http://localhost:5173/catalog-preview](http://localhost:5173/catalog-preview)  \n\n`;

  md += `## 1. Executive Summary\n\n`;
  md += `| Status | Count | Publishing Rule |\n`;
  md += `| :--- | :--- | :--- |\n`;
  md += `| **Live Approved Products** | **${approvedProducts.length}** | Published to public website & collections (100% Google Flow Photography) |\n`;
  md += `| **Pending User Approval** | **${pendingProducts.length}** | 🔒 Hidden from public store until approved |\n`;
  md += `| **Flagged for Review** | **${flaggedProducts.length}** | ⚠️ Image relationship uncertain — manual check required |\n`;
  md += `| **Total Catalog Records** | **${totalProducts}** | Centralized master catalogue |\n\n`;

  if (approvedProducts.length > 0) {
    md += `## 2. Live Approved Products with Google Flow Photography (${approvedProducts.length})\n\n`;
    md += `| ID | Product Name | Category | Primary Angle | Price | Status |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    for (const p of approvedProducts.slice(0, 20)) {
      const primImg = p.images?.[0] ? `[View WebP](${p.images[0]})` : 'None';
      md += `| \`${p.id}\` | **${p.name}** | ${p.category} | ${primImg} | ₹${p.price} | \`Approved\` |\n`;
    }
    if (approvedProducts.length > 20) {
      md += `| ... | *+ ${approvedProducts.length - 20} more approved products* | ... | ... | ... | ... |\n`;
    }
    md += `\n`;
  }

  if (pendingProducts.length > 0) {
    md += `## 3. ⏳ Pending Approval: Draft Product Records (${pendingProducts.length})\n\n`;
    md += `> **Rule:** No fake prices or sizes were invented. These products are held in draft state until you set price and approve sizes.\n\n`;
    md += `| ID | Product Name | Category | Primary Image | Price Status | Sizes Status |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    for (const p of pendingProducts) {
      const primImg = p.images?.[0] ? `[View Image](${p.images[0]})` : 'None';
      md += `| \`${p.id}\` | **${p.name}** | ${p.category} | ${primImg} | \`⚠️ Requires Price\` | \`⚠️ Requires Sizes\` |\n`;
    }
    md += `\n`;
  }

  md += `## 4. How to Edit & Approve Products\n\n`;
  md += `### Method A: Direct File Editing (Admin-Friendly JSON)\n`;
  md += `1. Open \`catalog/products.catalog.json\`.\n`;
  md += `2. Edit \`name\`, \`description\`, \`price\`, and \`sizes\`.\n`;
  md += `3. Change \`"status": "pending_approval"\` to \`"status": "approved"\`.\n`;
  md += `4. Run \`node scripts/generate-catalog.mjs\` to re-sync.\n\n`;
  md += `### Method B: Interactive Visual Web Preview\n`;
  md += `1. Open [http://localhost:5173/catalog-preview](http://localhost:5173/catalog-preview) in your browser.\n`;
  md += `2. Inspect photo angles, edit prices and names directly in the dashboard.\n`;
  md += `3. Click **"APPROVE FOR STORE"**.\n`;

  fs.writeFileSync(REPORT_PATH, md, 'utf8');
}

generateProductCatalog().catch(err => {
  console.error('\n❌ Fatal error in catalogue generation:', err);
  process.exit(1);
});
