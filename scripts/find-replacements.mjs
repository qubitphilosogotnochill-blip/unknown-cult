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

const allPublicFiles = [];
function walkPublic(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkPublic(full);
    } else {
      const rel = '/' + path.relative('./public', full).replace(/\\/g, '/');
      allPublicFiles.push(rel);
    }
  }
}
walkPublic('./public/images');

const files = walk('./src');
const imageRefRegex = /["'`]((\/images\/[^"'`]+?\.(webp|png|jpg|jpeg|svg)))["'`]/g;

const broken = [];
const checked = new Set();

for (const f of files) {
  const content = fs.readFileSync(f, 'utf-8');
  let match;
  while ((match = imageRefRegex.exec(content)) !== null) {
    const imgPath = match[1];
    if (checked.has(imgPath)) continue;
    checked.add(imgPath);
    const diskPath = path.join('./public', imgPath);
    if (!fs.existsSync(diskPath)) {
      // Find candidate matches
      const filename = path.basename(imgPath);
      const prefix = filename.split('_')[0];
      const dirPart = path.dirname(imgPath);
      const candidates = allPublicFiles.filter(p => p.includes(prefix));
      broken.push({ file: f, ref: imgPath, prefix, candidates });
    }
  }
}

console.log(JSON.stringify(broken, null, 2));
