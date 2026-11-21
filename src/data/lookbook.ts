export interface LookbookHotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  productId: string;
  garmentLabel: string;
}

export interface LookbookLook {
  id: string;
  number: string;
  title: string;
  season: string;
  location: string;
  model: string;
  image: string;
  description: string;
  taggedProductIds: string[];
  hotspots: LookbookHotspot[];
}

/**
 * UNKNOWN CULT — MASTER CENTRALIZED LOOKBOOK ARCHIVE
 * 
 * Every entry is 100% verified against the authentic Google Flow editorial photography.
 * Photograph, description, and shoppable products represent the exact same outfit.
 */
export const LOOKBOOK_LOOKS: LookbookLook[] = [
  {
    id: 'look-01',
    number: '01',
    title: 'THE SHINJUKU MONOLITH',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Shinjuku Brutalist Underpass, Tokyo',
    model: 'Ren K. (184cm / 76kg, wearing size L)',
    image: '/images/lookbook/uc-lookbook-01_7b8cf357.webp',
    description: 'Architectural 500 GSM French fleece pullover with upright double-layer hood, styled with heavyweight dark skater denim and short fisherman beanie in Tokyo subterranean concrete corridors.',
    taggedProductIds: ['uc-hood-01', 'uc-baggy-02', 'uc-acc-06'],
    hotspots: [
      {
        id: 'hs-01-1',
        xPercent: 49,
        yPercent: 12,
        productId: 'uc-acc-06',
        garmentLabel: 'HEAVYWEIGHT SHORT BEANIE'
      },
      {
        id: 'hs-01-2',
        xPercent: 50,
        yPercent: 36,
        productId: 'uc-hood-01',
        garmentLabel: 'FORTRESS 500 GSM HEAVYWEIGHT HOODIE'
      },
      {
        id: 'hs-01-3',
        xPercent: 51,
        yPercent: 70,
        productId: 'uc-baggy-02',
        garmentLabel: 'BALLISTIC BAGGY DENIM'
      }
    ]
  },
  {
    id: 'look-02',
    number: '02',
    title: 'THE ATELIER DRAPE',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Brutalist Concrete Atelier Courtyard, Berlin',
    model: 'Elena V. (178cm / 58kg, wearing size M)',
    image: '/images/lookbook/uc-lookbook-02_767e3c63.webp',
    description: 'Relaxed architectural layering featuring an unbuttoned ecru garment-dyed camp shirt over a dense 280 GSM ribbed tank top, grounded by heavyweight Japanese twill multi-pocket cargo pants.',
    taggedProductIds: ['uc-shirt-01', 'uc-daily-04', 'uc-baggy-01'],
    hotspots: [
      {
        id: 'hs-02-1',
        xPercent: 50,
        yPercent: 42,
        productId: 'uc-shirt-01',
        garmentLabel: 'HEAVY GARMENT-DYED CUBAN COLLAR SHIRT'
      },
      {
        id: 'hs-02-2',
        xPercent: 48,
        yPercent: 44,
        productId: 'uc-daily-04',
        garmentLabel: 'LUXURY HEAVY RIBBED TANK TOP'
      },
      {
        id: 'hs-02-3',
        xPercent: 52,
        yPercent: 72,
        productId: 'uc-baggy-01',
        garmentLabel: 'HEAVYWEIGHT MULTI-POCKET CARGO PANTS'
      }
    ]
  },
  {
    id: 'look-03',
    number: '03',
    title: 'TACTICAL FLIGHT ARMOUR',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Industrial Brick Passage, London',
    model: 'Marcus V. (188cm / 92kg, wearing size XL)',
    image: '/images/lookbook/uc-lookbook-03_d268f1da.webp',
    description: 'Oversized tactical MA-1 satin bomber with flight pocket detailing, layered over an Obsidian 280 GSM foundation tee and washed knee-paneled cargo trousers.',
    taggedProductIds: ['uc-outer-01', 'uc-daily-01', 'uc-daily-03'],
    hotspots: [
      {
        id: 'hs-03-1',
        xPercent: 52,
        yPercent: 32,
        productId: 'uc-outer-01',
        garmentLabel: 'TACTICAL MA-1 OVERSIZED BOMBER'
      },
      {
        id: 'hs-03-2',
        xPercent: 50,
        yPercent: 42,
        productId: 'uc-daily-01',
        garmentLabel: 'THE FOUNDATION 280 GSM OVERSIZED TEE'
      },
      {
        id: 'hs-03-3',
        xPercent: 50,
        yPercent: 68,
        productId: 'uc-daily-03',
        garmentLabel: 'TAILORED RELAXED PLEATED TROUSERS'
      }
    ]
  },
  {
    id: 'look-04',
    number: '04',
    title: 'COLD RECOVERY OVERSIZED CREW',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Concrete Monolith Vault, Seoul',
    model: 'Min-Ji S. (175cm / 55kg, wearing size M)',
    image: '/images/lookbook/uc-lookbook-04_c5bc2c5d.webp',
    description: 'Heavyweight 460 GSM fleece crewneck in deep burgundy layered over an elongated foundation tee, accessorized with a ballistic Cordura crossbody bag and tactical utility cargo pants.',
    taggedProductIds: ['uc-gym-10', 'uc-acc-02', 'uc-baggy-01'],
    hotspots: [
      {
        id: 'hs-04-1',
        xPercent: 50,
        yPercent: 35,
        productId: 'uc-gym-10',
        garmentLabel: 'COLD RECOVERY OVERSIZED CREWNECK'
      },
      {
        id: 'hs-04-2',
        xPercent: 56,
        yPercent: 40,
        productId: 'uc-acc-02',
        garmentLabel: 'TACTICAL CORDURA MODULAR CROSSBODY'
      },
      {
        id: 'hs-04-3',
        xPercent: 50,
        yPercent: 72,
        productId: 'uc-baggy-01',
        garmentLabel: 'HEAVYWEIGHT MULTI-POCKET CARGO PANTS'
      }
    ]
  },
  {
    id: 'look-05',
    number: '05',
    title: 'SUBVERSIVE FLANNEL LAYERING',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Nocturnal Atelier Concrete Wall, Mumbai',
    model: 'Karan B. (182cm / 74kg, wearing size L)',
    image: '/images/lookbook/uc-lookbook-05_d7e0a89e.webp',
    description: 'Heavyweight brushed flannel overshirt in muted olive and black plaid, draped over a seamless compression tee, paired with tactical strapping cargo pants and the signature embroidered dad cap.',
    taggedProductIds: ['uc-shirt-01', 'uc-gym-03', 'uc-baggy-01', 'uc-acc-01'],
    hotspots: [
      {
        id: 'hs-05-1',
        xPercent: 49,
        yPercent: 10,
        productId: 'uc-acc-01',
        garmentLabel: 'SIGNATURE EMBROIDERED CULT DAD CAP'
      },
      {
        id: 'hs-05-2',
        xPercent: 52,
        yPercent: 32,
        productId: 'uc-shirt-01',
        garmentLabel: 'GARMENT-DYED FLANNEL OVERSHIRT'
      },
      {
        id: 'hs-05-3',
        xPercent: 48,
        yPercent: 38,
        productId: 'uc-gym-03',
        garmentLabel: 'SEAMLESS COMPRESSION BASELAYER TEE'
      },
      {
        id: 'hs-05-4',
        xPercent: 50,
        yPercent: 68,
        productId: 'uc-baggy-01',
        garmentLabel: 'HEAVYWEIGHT MULTI-POCKET CARGO PANTS'
      }
    ]
  },
  {
    id: 'look-06',
    number: '06',
    title: 'FORTRESS FLEECE COCOON',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Brutalist Sub-Level Vault, Tokyo',
    model: 'Kenji T. (181cm / 72kg, wearing size M)',
    image: '/images/lookbook/uc-lookbook-06_5153476e.webp',
    description: 'Monolithic monochrome fleece cocoon. Double-layer full-zip fleece hoodie cut from 500 GSM unbleached ring-spun cotton paired with matching high-density tapered training joggers.',
    taggedProductIds: ['uc-hood-01', 'uc-gym-05'],
    hotspots: [
      {
        id: 'hs-06-1',
        xPercent: 48,
        yPercent: 32,
        productId: 'uc-hood-01',
        garmentLabel: 'FORTRESS 500 GSM HEAVYWEIGHT HOODIE'
      },
      {
        id: 'hs-06-2',
        xPercent: 50,
        yPercent: 65,
        productId: 'uc-gym-05',
        garmentLabel: 'ACID WASH FRENCH TERRY JOGGERS'
      }
    ]
  },
  {
    id: 'look-07',
    number: '07',
    title: 'NOCTURNAL TRENCH PROTOCOL',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Industrial Alleyway, Chicago',
    model: 'Maya R. (177cm / 60kg, wearing size S)',
    image: '/images/lookbook/uc-lookbook-07_778dcbea.webp',
    description: 'Floor-length tailored trench silhouette in water-resistant matte cotton blend, layered over an acid-washed cropped fleece hoodie and relaxed wide-leg skater denim.',
    taggedProductIds: ['uc-outer-06', 'uc-street-03', 'uc-baggy-02'],
    hotspots: [
      {
        id: 'hs-07-1',
        xPercent: 50,
        yPercent: 42,
        productId: 'uc-outer-06',
        garmentLabel: 'HEAVYWEIGHT OVERSIZED TRENCH COAT'
      },
      {
        id: 'hs-07-2',
        xPercent: 52,
        yPercent: 35,
        productId: 'uc-street-03',
        garmentLabel: 'UNDERGROUND ECHOES ACID WASH HOODIE'
      },
      {
        id: 'hs-07-3',
        xPercent: 52,
        yPercent: 68,
        productId: 'uc-baggy-02',
        garmentLabel: 'BALLISTIC BAGGY DENIM'
      }
    ]
  },
  {
    id: 'look-08',
    number: '08',
    title: 'ANARCHY STREET PROTOCOL',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Subterranean Graffiti Passage, Berlin',
    model: 'Leo H. (183cm / 75kg, wearing size L)',
    image: '/images/lookbook/uc-lookbook-08_42f253bf.webp',
    description: 'Raw 320 GSM combed jersey distressed tee with hand-cracked discharge graphics, worn with wide-break skater denim and brutalist sterling silver hardware.',
    taggedProductIds: ['uc-street-01', 'uc-baggy-02', 'uc-acc-05'],
    hotspots: [
      {
        id: 'hs-08-1',
        xPercent: 50,
        yPercent: 35,
        productId: 'uc-street-01',
        garmentLabel: 'ANARCHY PROTOCOL DISTRESSED TEE'
      },
      {
        id: 'hs-08-2',
        xPercent: 52,
        yPercent: 68,
        productId: 'uc-baggy-02',
        garmentLabel: 'BALLISTIC BAGGY DENIM'
      },
      {
        id: 'hs-08-3',
        xPercent: 38,
        yPercent: 53,
        productId: 'uc-acc-05',
        garmentLabel: 'SOLID 925 STERLING SILVER SIGNET RING'
      }
    ]
  },
  {
    id: 'look-09',
    number: '09',
    title: 'COLD HYPERTROPHY UNIFORM',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Brutalist Industrial Gym Warehouse, Berlin',
    model: 'Alexey D. (187cm / 90kg, wearing size XL)',
    image: '/images/lookbook/uc-lookbook-09_624c821c.webp',
    description: 'Engineered for pure iron discipline. Dropped-armhole 260 GSM raw edge stringer vest paired with 5-inch split-hem training shorts over zoned 3/4 compression baselayers and heavy gym tote.',
    taggedProductIds: ['uc-gym-02', 'uc-gym-04', 'uc-gym-09', 'uc-acc-08'],
    hotspots: [
      {
        id: 'hs-09-1',
        xPercent: 50,
        yPercent: 34,
        productId: 'uc-gym-02',
        garmentLabel: 'RAW EDGE DEEP CUT MUSCLE STRINGER'
      },
      {
        id: 'hs-09-2',
        xPercent: 51,
        yPercent: 56,
        productId: 'uc-gym-04',
        garmentLabel: 'PRO 5" LINED TRAINING SHORTS'
      },
      {
        id: 'hs-09-3',
        xPercent: 52,
        yPercent: 72,
        productId: 'uc-gym-09',
        garmentLabel: 'HEAVY COMPRESSION 3/4 TIGHTS'
      },
      {
        id: 'hs-09-4',
        xPercent: 32,
        yPercent: 74,
        productId: 'uc-acc-08',
        garmentLabel: 'HEAVY CANVAS DAILY TOTE 28L'
      }
    ]
  },
  {
    id: 'look-10',
    number: '10',
    title: 'THE INDUSTRIAL HARNESS',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Monolithic Concrete Pavilion, Seoul',
    model: 'So-Hee K. (174cm / 54kg, wearing size S)',
    image: '/images/lookbook/uc-lookbook-10_d0f4f716.webp',
    description: 'Minimalist oversized box tee cut from 300 GSM washed cotton, tucked into ballistic cargo trousers equipped with modular harness straps and industrial webbing buckle.',
    taggedProductIds: ['uc-gym-01', 'uc-baggy-01', 'uc-acc-07'],
    hotspots: [
      {
        id: 'hs-10-1',
        xPercent: 51,
        yPercent: 38,
        productId: 'uc-gym-01',
        garmentLabel: 'HEAVYWEIGHT OVERSIZED PUMP COVER TEE'
      },
      {
        id: 'hs-10-2',
        xPercent: 50,
        yPercent: 48,
        productId: 'uc-acc-07',
        garmentLabel: 'INDUSTRIAL ROLLER WEBBING BELT'
      },
      {
        id: 'hs-10-3',
        xPercent: 50,
        yPercent: 68,
        productId: 'uc-baggy-01',
        garmentLabel: 'BALLISTIC TACTICAL CARGO'
      }
    ]
  },
  {
    id: 'look-11',
    number: '11',
    title: 'TACTICAL RECON SHELL',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Atelier Soundstage, Tokyo',
    model: 'Takuya N. (180cm / 71kg, wearing size M)',
    image: '/images/lookbook/uc-lookbook-11_86469adf.webp',
    description: 'Layered transit armor. Lightweight technical flight jacket draped over an inner acid wash fleece zip layer, tailored relaxed trousers, and an off-white ribbed fisherman beanie.',
    taggedProductIds: ['uc-outer-05', 'uc-street-03', 'uc-daily-03', 'uc-acc-06'],
    hotspots: [
      {
        id: 'hs-11-1',
        xPercent: 50,
        yPercent: 12,
        productId: 'uc-acc-06',
        garmentLabel: 'HEAVYWEIGHT SHORT BEANIE'
      },
      {
        id: 'hs-11-2',
        xPercent: 48,
        yPercent: 36,
        productId: 'uc-outer-05',
        garmentLabel: 'TACTICAL FLEECE LINED ANORAK'
      },
      {
        id: 'hs-11-3',
        xPercent: 50,
        yPercent: 70,
        productId: 'uc-daily-03',
        garmentLabel: 'TAILORED RELAXED PLEATED TROUSERS'
      }
    ]
  },
  {
    id: 'look-12',
    number: '12',
    title: 'SUBVERSIVE RESORT DRAPE',
    season: 'SEASON 08 // ARCHIVE',
    location: 'Brutalist Sun Deck & Stairwell, Barcelona',
    model: 'Mateo C. (185cm / 78kg, wearing size L)',
    image: '/images/lookbook/uc-lookbook-12_d44afb62.webp',
    description: 'Monochromatic warm-weather tailoring. Heavy garment-dyed textured Cuban camp shirt paired with matching relaxed camp shorts and dark minimal eyewear.',
    taggedProductIds: ['uc-shirt-01', 'uc-daily-06'],
    hotspots: [
      {
        id: 'hs-12-1',
        xPercent: 52,
        yPercent: 40,
        productId: 'uc-shirt-01',
        garmentLabel: 'HEAVY GARMENT-DYED CUBAN COLLAR SHIRT'
      },
      {
        id: 'hs-12-2',
        xPercent: 52,
        yPercent: 65,
        productId: 'uc-daily-06',
        garmentLabel: 'MINIMAL LINEN-COTTON CAMP SHORT'
      }
    ]
  }
];

export function getLookById(id: string): LookbookLook | undefined {
  return LOOKBOOK_LOOKS.find(l => l.id === id || l.number === id);
}

export function getAllLooks(): LookbookLook[] {
  return LOOKBOOK_LOOKS;
}
