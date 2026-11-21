import fs from 'fs';

const catalog = JSON.parse(fs.readFileSync('./src/data/products.catalog.json', 'utf-8'));
const catalogIds = new Set(catalog.map(p => p.id));

const looks = [
  { id: 'look-01', num: '01', title: 'THE SHINJUKU MONOLITH', image: '/images/lookbook/uc-lookbook-01_7b8cf357.webp', products: ['uc-hood-01', 'uc-baggy-02', 'uc-acc-06'] },
  { id: 'look-02', num: '02', title: 'THE ATELIER DRAPE', image: '/images/lookbook/uc-lookbook-02_767e3c63.webp', products: ['uc-shirt-01', 'uc-daily-04', 'uc-baggy-01'] },
  { id: 'look-03', num: '03', title: 'TACTICAL FLIGHT ARMOUR', image: '/images/lookbook/uc-lookbook-03_d268f1da.webp', products: ['uc-outer-01', 'uc-daily-01', 'uc-daily-03'] },
  { id: 'look-04', num: '04', title: 'COLD RECOVERY OVERSIZED CREW', image: '/images/lookbook/uc-lookbook-04_c5bc2c5d.webp', products: ['uc-gym-10', 'uc-acc-02', 'uc-baggy-01'] },
  { id: 'look-05', num: '05', title: 'SUBVERSIVE FLANNEL LAYERING', image: '/images/lookbook/uc-lookbook-05_d7e0a89e.webp', products: ['uc-shirt-01', 'uc-gym-03', 'uc-baggy-01', 'uc-acc-01'] },
  { id: 'look-06', num: '06', title: 'FORTRESS FLEECE COCOON', image: '/images/lookbook/uc-lookbook-06_5153476e.webp', products: ['uc-hood-01', 'uc-gym-05'] },
  { id: 'look-07', num: '07', title: 'NOCTURNAL TRENCH PROTOCOL', image: '/images/lookbook/uc-lookbook-07_778dcbea.webp', products: ['uc-outer-06', 'uc-street-03', 'uc-baggy-02'] },
  { id: 'look-08', num: '08', title: 'ANARCHY STREET PROTOCOL', image: '/images/lookbook/uc-lookbook-08_42f253bf.webp', products: ['uc-street-01', 'uc-baggy-02', 'uc-acc-05'] },
  { id: 'look-09', num: '09', title: 'COLD HYPERTROPHY UNIFORM', image: '/images/lookbook/uc-lookbook-09_624c821c.webp', products: ['uc-gym-02', 'uc-gym-04', 'uc-gym-09', 'uc-acc-08'] },
  { id: 'look-10', num: '10', title: 'THE INDUSTRIAL HARNESS', image: '/images/lookbook/uc-lookbook-10_d0f4f716.webp', products: ['uc-gym-01', 'uc-baggy-01', 'uc-acc-07'] },
  { id: 'look-11', num: '11', title: 'TACTICAL RECON SHELL', image: '/images/lookbook/uc-lookbook-11_86469adf.webp', products: ['uc-outer-05', 'uc-street-03', 'uc-daily-03', 'uc-acc-06'] },
  { id: 'look-12', num: '12', title: 'SUBVERSIVE RESORT DRAPE', image: '/images/lookbook/uc-lookbook-12_d44afb62.webp', products: ['uc-shirt-01', 'uc-daily-06'] },
];

let allValid = true;
for (const look of looks) {
  if (!fs.existsSync('./public' + look.image)) {
    console.error(`Missing image for ${look.id}: ${look.image}`);
    allValid = false;
  }
  for (const pid of look.products) {
    if (!catalogIds.has(pid)) {
      console.error(`Invalid product ${pid} in ${look.id}`);
      allValid = false;
    } else {
      const prod = catalog.find(p => p.id === pid);
      if (!prod.images || !prod.images[0] || !fs.existsSync('./public' + prod.images[0])) {
        console.error(`Missing product image for ${pid} in ${look.id}`);
        allValid = false;
      }
    }
  }
}

if (allValid) {
  console.log('SUCCESS: All 12 lookbook entries, all photographs, and all product associations are 100% verified on disk!');
}
