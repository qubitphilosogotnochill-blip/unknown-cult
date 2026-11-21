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

let totalFixed = 0;

for (const f of files) {
  let content = fs.readFileSync(f, 'utf-8');
  let hasMod = false;
  
  content = content.replace(imageRefRegex, (fullMatch, imgPath) => {
    const diskPath = path.join('./public', imgPath);
    if (fs.existsSync(diskPath)) {
      return fullMatch;
    }
    
    // Find candidate match
    const filename = path.basename(imgPath);
    const prefix = filename.split('_')[0];
    const candidate = allPublicFiles.find(p => p.includes(prefix) && p.endsWith('.webp') && !p.includes('/originals/'));
    
    if (candidate) {
      console.log(`Replacing in ${f}: ${imgPath} -> ${candidate}`);
      hasMod = true;
      totalFixed++;
      return fullMatch.replace(imgPath, candidate);
    } else {
      console.warn(`NO CANDIDATE FOR: ${imgPath} in ${f}`);
      return fullMatch;
    }
  });

  if (hasMod) {
    fs.writeFileSync(f, content, 'utf-8');
  }
}

console.log(`TOTAL FIXED REFERENCES: ${totalFixed}`);
