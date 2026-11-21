import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        walk(full, fileList);
      }
    } else if (/\.(tsx|ts|jsx|js|json|html|md)$/.test(file)) {
      fileList.push(full);
    }
  }
  return fileList;
}

const files = walk('./src');
files.push('./index.html');

let modifiedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Exact replacements for address and brand city references
  content = content.replace(/100ft Road, Indiranagar, Bengaluru, Karnataka 560038/g, 'Hauz Khas Village, New Delhi, Delhi 110016');
  content = content.replace(/Flat 402, Monolith Towers, Indiranagar 100ft Rd/g, 'Studio 08, Hauz Khas Village');
  content = content.replace(/Indiranagar 100ft Rd/g, 'Hauz Khas Village');
  content = content.replace(/Bengaluru, Karnataka - 560038, India/g, 'New Delhi, Delhi - 110016, India');
  content = content.replace(/Bengaluru, Karnataka/g, 'New Delhi, Delhi');
  content = content.replace(/BENGALURU — TOKYO/g, 'NEW DELHI — TOKYO');
  content = content.replace(/Bengaluru and Tokyo/g, 'New Delhi and Tokyo');
  content = content.replace(/ATELIER BENGALURU/g, 'ATELIER NEW DELHI');
  content = content.replace(/Bengaluru atelier/g, 'New Delhi atelier');
  content = content.replace(/Bengaluru fulfillment hub/g, 'New Delhi fulfillment hub');
  content = content.replace(/BENGALURU CENTRAL FULFILLMENT HUB/g, 'NEW DELHI CENTRAL FULFILLMENT HUB');
  content = content.replace(/courts of Bengaluru, Karnataka/g, 'courts of New Delhi, Delhi');
  content = content.replace(/Indiranagar, Bengaluru/g, 'Hauz Khas, New Delhi');
  content = content.replace(/city:\s*'Bengaluru'/g, "city: 'New Delhi'");
  content = content.replace(/state:\s*'Karnataka'/g, "state: 'Delhi'");
  content = content.replace(/pincode:\s*'560038'/g, "pincode: '110016'");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated address in: ${file}`);
    modifiedFiles++;
  }
}

console.log(`Total files updated to Delhi address: ${modifiedFiles}`);
