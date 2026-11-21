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
    } else if (/\.(tsx|ts|jsx|js|json)$/.test(file)) {
      fileList.push(full);
    }
  }
  return fileList;
}

const files = walk('./src');
const imageRefRegex = /["'`]((\/images\/[^"'`]+?\.(webp|png|jpg|jpeg|svg)))["'`]/g;

const broken = [];
const checked = new Set();
const found = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf-8');
  let match;
  while ((match = imageRefRegex.exec(content)) !== null) {
    const imgPath = match[1];
    if (checked.has(imgPath)) continue;
    checked.add(imgPath);
    const diskPath = path.join('./public', imgPath);
    if (!fs.existsSync(diskPath)) {
      broken.push({ file: f, ref: imgPath });
    } else {
      found.push(imgPath);
    }
  }
}

console.log(`TOTAL UNIQUE REFS CHECKED: ${checked.size}`);
console.log(`VALID REFS: ${found.length}`);
console.log(`BROKEN REFS: ${broken.length}`);
if (broken.length > 0) {
  console.log('BROKEN REFERENCES:');
  broken.forEach(b => console.log(`  File: ${b.file} -> ${b.ref}`));
}
