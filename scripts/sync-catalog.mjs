#!/usr/bin/env node

/**
 * UNKNOWN CULT — CATALOGUE SYNC UTILITY
 * 
 * Synchronizes edits made in catalog/products.catalog.json into the active
 * application data source and regenerates the approval preview report.
 */

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const CATALOG_JSON_PATH = path.join(PROJECT_ROOT, 'catalog', 'products.catalog.json');
const SRC_CATALOG_JSON_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'products.catalog.json');
const REPORT_PATH = path.join(PROJECT_ROOT, 'CATALOG_PREVIEW_REPORT.md');

if (!fs.existsSync(CATALOG_JSON_PATH)) {
  console.error(`❌ Catalog file not found at: ${CATALOG_JSON_PATH}`);
  process.exit(1);
}

try {
  const content = fs.readFileSync(CATALOG_JSON_PATH, 'utf8');
  const catalog = JSON.parse(content);

  // Validate array
  if (!Array.isArray(catalog)) {
    throw new Error('Catalog JSON must be an array of products');
  }

  // Copy to src/data/
  fs.writeFileSync(SRC_CATALOG_JSON_PATH, JSON.stringify(catalog, null, 2), 'utf8');

  const approved = catalog.filter(p => p.status === 'approved');
  const pending = catalog.filter(p => p.status === 'pending_approval');
  const flagged = catalog.filter(p => p.status === 'flagged_review');

  console.log('\n=============================================================');
  console.log('       UNKNOWN CULT — CATALOGUE SYNCHRONIZED                 ');
  console.log('=============================================================');
  console.log(`  📦 Total Catalog Records : ${catalog.length}`);
  console.log(`  ✅ Live Approved Products: ${approved.length}`);
  console.log(`  ⏳ Pending Approval      : ${pending.length}`);
  console.log(`  ⚠️  Flagged for Review   : ${flagged.length}`);
  console.log(`  📁 Copied To             : src/data/products.catalog.json`);
  console.log('=============================================================\n');
} catch (err) {
  console.error('❌ Failed to synchronize catalog:', err.message);
  process.exit(1);
}
