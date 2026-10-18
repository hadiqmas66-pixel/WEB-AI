// ============================================
// 911 AVENUE — PRODUCTS CATALOG DATA
// ============================================

const PRODUCTS = [
  // --- KATEGORI: SEPATU (Size: 39 - 44) ---
  {
    id: "sepatu-1",
    name: "Asics GEL-Kayano 14",
    category: "sepatu",
    categoryLabel: "Sepatu",
    price: "$160.00",
    priceNum: 160,
    priceIdr: "Rp 2.480.000",
    image: "ASET/IMAGE/ASICS.jpg",
    rating: 4.9,
    reviewsCount: 128,
    badge: "Best Seller",
    sizes: ["39", "40", "41", "42", "43", "44"],
    shortDesc: "Sneakers retro-running ikonik dengan bantalan legendaris teknologi GEL®.",
    description: "Sneakers retro-running ikonis yang memadukan estetika awal era 2000-an dengan performa modern. Dilengkapi teknologi bantalan GEL® khas Asics di bagian tumit dan kaki depan untuk meredam benturan secara optimal, serta upper mesh berlapis panel sintetis metalik yang sejuk, kokoh, dan stylish untuk mobilitas harian.",
    specs: [
      { label: "Material Upper", value: "Open Mesh Breathable & Synthetic Metallic Overlays" },
      { label: "Bantalan (Cushion)", value: "Asics GEL® Technology di tumit dan forefoot" },
      { label: "Outsole", value: "Solid AHAR Rubber berdaya cengkeram tinggi" },
      { label: "Gaya", value: "Retro Running / Y2K Streetwear" }
    ]
  },
  {
    id: "sepatu-2",
    name: "New Balance 530 Retro",
    category: "sepatu",
    categoryLabel: "Sepatu",
    price: "$115.00",
    priceNum: 115,
    priceIdr: "Rp 1.780.000",
    image: "ASET/IMAGE/NB 530.jpg",
    rating: 4.8,
    reviewsCount: 94,
    badge: "Trending",
    sizes: ["39", "40", "41", "42", "43", "44"],
    shortDesc: "Siluet vintage dad-shoes berbobot ringan dengan bantalan ABZORB®.",
    description: "Siluet sneakers dad-shoes klasik yang memadukan midsole ABZORB® berdaya redam tinggi dengan material mesh super ringan dan breathable. Desain netral bernuansa vintage modern yang sangat fleksibel dipadukan dengan berbagai outfit kasual maupun semi-formal.",
    specs: [
      { label: "Material Upper", value: "Breathable Mesh berlapis panel sintetis" },
      { label: "Midsole", value: "Teknologi ABZORB® shock absorption" },
      { label: "Insole", value: "Removable EVA cushioned insole" },
      { label: "Gaya", value: "Retro Chunky Runner" }
    ]
  },
  {
    id: "sepatu-3",
    name: "Adidas Samba OG Classic",
    category: "sepatu",
    categoryLabel: "Sepatu",
    price: "$110.00",
    priceNum: 110,
    priceIdr: "Rp 1.705.000",
    image: "ASET/IMAGE/ADIDAS SAMBO.jpg",
    rating: 4.9,
    reviewsCount: 215,
    badge: "Timeless Icon",
    sizes: ["39", "40", "41", "42", "43", "44"],
    shortDesc: "Ikon streetwear abadi dengan upper kulit premium dan T-toe suede khas.",
    description: "Warisan legendaris sejak era indoor football yang kini merajai panggung fashion kasual dunia. Dibuat dengan kulit premium lembut, aksen T-toe berbahan suede asli, dan outsole gum rubber bertekstur khas yang tahan lama dan memberikan traksi mantap di berbagai permukaan.",
    specs: [
      { label: "Material Upper", value: "Premium Full-Grain Leather & Suede T-toe" },
      { label: "Outsole", value: "Low-profile Textured Gum Rubber" },
      { label: "Detail", value: "Signature 3-Stripes & Gold Foil Branding" },
      { label: "Gaya", value: "Heritage Terrace Streetwear" }
    ]
  },
  {
    id: "sepatu-4",
    name: "Nike P-6000 Metallic Blue",
    category: "sepatu",
    categoryLabel: "Sepatu",
    price: "$120.00",
    priceNum: 120,
    priceIdr: "Rp 1.860.000",
    image: "ASET/IMAGE/NIKE P6000.jpg",
    rating: 4.7,
    reviewsCount: 82,
    badge: "New Arrival",
    sizes: ["39", "40", "41", "42", "43", "44"],
    shortDesc: "DNA lari Pegasus 2006 berpadu garis vertikal metallic blue futuristik.",
    description: "Perpaduan unik dari warisan seri Nike Pegasus klasik dengan garis vertikal bernuansa metallic blue futuristik. Busa midsole tebal memberikan kenyamanan melangkah seharian penuh tanpa rasa lelah, didukung mesh berventilasi aktif untuk sirkulasi udara maksimal.",
    specs: [
      { label: "Material Upper", value: "Breathable Mesh with Metallic Overlays" },
      { label: "Midsole", value: "Lightweight Cushioning Foam Midsole" },
      { label: "Outsole", value: "Durable Rubber Waffle Traction Pattern" },
      { label: "Gaya", value: "Modern Millennium Aesthetic" }
    ]
  },
  {
    id: "sepatu-5",
    name: "Puma Speedcat OG Sparco",
    category: "sepatu",
    categoryLabel: "Sepatu",
    price: "$105.00",
    priceNum: 105,
    priceIdr: "Rp 1.625.000",
    image: "ASET/IMAGE/PUMA SPEEDCAT.jpg",
    rating: 4.8,
    reviewsCount: 76,
    badge: "Motorsport Heritage",
    sizes: ["39", "40", "41", "42", "43", "44"],
    shortDesc: "Siluet balap F1 legendaris berbalut suede premium dan rounded driver heel.",
    description: "Siluet ikonik yang lahir dari sirkuit balap Formula 1 berkolaborasi dengan brand motorsport Sparco. Dibalut bahan suede mewah dengan profil ramping dan rounded driver heel khas yang memberikan impresi visual avant-garde serta kenyamanan fleksibel saat berkendara maupun jalan santai.",
    specs: [
      { label: "Material Upper", value: "100% Rich Suede Leather" },
      { label: "Outsole", value: "Rounded Driver Rubber Sole" },
      { label: "Bordir", value: "Original Sparco tongue patch & Formstrip" },
      { label: "Gaya", value: "Sleek Motorsport Fashion" }
    ]
  },
  {
    id: "sepatu-6",
    name: "Vans Old Skool Suede Brown",
    category: "sepatu",
    categoryLabel: "Sepatu",
    price: "$75.00",
    priceNum: 75,
    priceIdr: "Rp 1.160.000",
    image: "ASET/IMAGE/VANS.jpg",
    rating: 4.9,
    reviewsCount: 160,
    badge: "Classic Essential",
    sizes: ["39", "40", "41", "42", "43", "44"],
    shortDesc: "Siluet skate klasik berbalut suede hangat dan waffle sole tahan lama.",
    description: "Siluet skate legendaris dengan material suede bertekstur halus dalam nuansa warna earth brown yang hangat. Dilengkapi reinforced toecap untuk ketahanan gesekan tinggi serta signature rubber waffle outsole khas Vans yang sangat kokoh.",
    specs: [
      { label: "Material Upper", value: "Premium Suede & Heavy-Duty Canvas" },
      { label: "Outsole", value: "Vans Signature Rubber Waffle Outsole" },
      { label: "Kerah", value: "Padded collar lembut penyangga mata kaki" },
      { label: "Gaya", value: "Timeless Skate Casual" }
    ]
  },

  // --- KATEGORI: BAJU (Size: M, L, XL) ---
  {
    id: "baju-1",
    name: "Navy Heavyweight Pocket Tee",
    category: "baju",
    categoryLabel: "Baju",
    price: "$38.00",
    priceNum: 38,
    priceIdr: "Rp 590.000",
    image: "ASET/IMAGE/hot wheels tshirt.jpg",
    rating: 4.8,
    reviewsCount: 112,
    badge: "Everyday Core",
    sizes: ["M", "L", "XL"],
    shortDesc: "Kaos berbahan katun 24s/16s combed tebal dengan saku dada minimalis.",
    description: "Kaos esensial berbahan katun combed heavyweight 220 GSM yang tebal, adem, dan tidak mudah melar setelah dicuci berkali-kali. Memiliki potongan relaxed boxy fit dengan rib leher kokoh anti-kendur serta jahitan ganda di setiap tepi jahitan.",
    specs: [
      { label: "Bahan", value: "100% Combed Heavyweight Cotton 220 GSM" },
      { label: "Potongan", value: "Relaxed Boxy Fit" },
      { label: "Detail", value: "Chest Pocket & Double-needle stitching" },
      { label: "Perawatan", value: "Mesin cuci dingin, setrika suhu sedang" }
    ]
  },
  {
    id: "baju-2",
    name: "Brown Artisan Corduroy Overshirt",
    category: "baju",
    categoryLabel: "Baju",
    price: "$69.00",
    priceNum: 69,
    priceIdr: "Rp 1.070.000",
    image: "ASET/IMAGE/Dystovia Cream.jpg",
    rating: 4.9,
    reviewsCount: 88,
    badge: "Staff Pick",
    sizes: ["M", "L", "XL"],
    shortDesc: "Kemeja luaran berbahan korduroi premium lembut bernuansa earth brown.",
    description: "Kemeja luaran kasual dari material korduroi 8-wale premium dengan alur garis tebal yang bertekstur lembut dan berbobot mantap. Sempurna dijadikan outer layer di atas t-shirt putih atau turtleneck untuk gaya kasual yang hangat dan berkelas.",
    specs: [
      { label: "Bahan", value: "Premium 8-Wale Cotton Corduroy" },
      { label: "Kancing", value: "Custom Tortoiseshell Horn Resin Buttons" },
      { label: "Saku", value: "Dual Flap Chest Utility Pockets" },
      { label: "Potongan", value: "Modern Layering Overshirt Fit" }
    ]
  },
  {
    id: "baju-3",
    name: "Indigo Denim Casual Workshirt",
    category: "baju",
    categoryLabel: "Baju",
    price: "$85.00",
    priceNum: 85,
    priceIdr: "Rp 1.320.000",
    image: "ASET/IMAGE/Dystovia Black.jpg",
    rating: 4.8,
    reviewsCount: 65,
    badge: "Rugged Classic",
    sizes: ["M", "L", "XL"],
    shortDesc: "Workshirt denim 10 oz tangguh dengan proses enzyme wash lembut.",
    description: "Kemeja kerja kasual berbahan katun denim 10 oz dengan proses garment enzyme wash yang menghasilkan kelembutan instan tanpa mengurangi kekuatan serat denim. Dilengkapi jahitan rantai kontras ganda (triple chain-stitch) untuk ketahanan ekstra.",
    specs: [
      { label: "Bahan", value: "100% Raw Cotton Denim 10 oz" },
      { label: "Jahitan", value: "Contrast Triple Chain-Stitch Construction" },
      { label: "Kancing", value: "Heavy-duty Metal Shank Buttons" },
      { label: "Warna", value: "Deep Washed Indigo Denim" }
    ]
  },
  {
    id: "baju-4",
    name: "Mocha Waffle Knit Longsleeve",
    category: "baju",
    categoryLabel: "Baju",
    price: "$52.00",
    priceNum: 52,
    priceIdr: "Rp 805.000",
    image: "ASET/IMAGE/puma.jpg",
    rating: 4.7,
    reviewsCount: 54,
    badge: "Comfort Fit",
    sizes: ["M", "L", "XL"],
    shortDesc: "Kaos lengan panjang bertekstur waffle empuk bernuansa warna mocha hangat.",
    description: "Kaos lengan panjang bertekstur thermal waffle knit yang empuk, elastis, dan menyerap keringat dengan baik. Memberikan sirkulasi termal optimal yang menjaga kehangatan tubuh saat cuaca dingin sekaligus tetap sejuk saat beraktivitas harian.",
    specs: [
      { label: "Bahan", value: "Cotton-Rich Thermal Waffle Weave" },
      { label: "Manset", value: "Elastane-infused Ribbed Cuffs anti melar" },
      { label: "Potongan", value: "Regular Comfort Tailored Fit" },
      { label: "Warna", value: "Warm Earth Mocha" }
    ]
  },

  // --- KATEGORI: CELANA (Size: M, L, XL) ---
  {
    id: "celana-1",
    name: "Raw Selvedge Deep Indigo Jeans",
    category: "celana",
    categoryLabel: "Celana",
    price: "$95.00",
    priceNum: 95,
    priceIdr: "Rp 1.470.000",
    image: "ASET/IMAGE/black white.jpg",
    rating: 4.9,
    reviewsCount: 142,
    badge: "Heritage Denim",
    sizes: ["M", "L", "XL"],
    shortDesc: "Denim selvedge 14 oz asli dengan tepian selvedge merah-putih autentik.",
    description: "Celana denim raw selvedge 14 oz unwashed dengan tepian tenun selvedge klasik pada hem kaki. Seiring pemakaian rutin, bahan ini akan menghasilkan kontur pudar alami (fades) yang mencerminkan gaya hidup dan aktivitas unik pemakainya.",
    specs: [
      { label: "Bahan", value: "14 oz Right-Hand Twill Selvedge Denim" },
      { label: "Hardware", value: "Solid Copper Rivets & Donut Button Fly" },
      { label: "Potongan", value: "Classic Straight Leg with Mid-Rise" },
      { label: "Warna", value: "Unwashed Deep Indigo" }
    ]
  },
  {
    id: "celana-2",
    name: "Earth Brown Relaxed Chinos",
    category: "celana",
    categoryLabel: "Celana",
    price: "$72.00",
    priceNum: 72,
    priceIdr: "Rp 1.115.000",
    image: "ASET/IMAGE/Celana Training.jpg",
    rating: 4.8,
    reviewsCount: 97,
    badge: "Smart Casual",
    sizes: ["M", "L", "XL"],
    shortDesc: "Chinos relaxed fit berbahan katun twill stretch dengan kelenturan optimal.",
    description: "Celana chino berpotongan relaxed fit berbahan katun twill bertekstur halus dengan kandungan elastane 2% untuk kelenturan bergerak tanpa batas. Cocok dipadankan dengan kemeja kantor semi-formal maupun t-shirt santai akhir pekan.",
    specs: [
      { label: "Bahan", value: "98% Cotton Twill, 2% Spandex Stretch" },
      { label: "Pinggang", value: "Tailored Waistband dengan belt loops kokoh" },
      { label: "Saku", value: "2 Saku samping miring & 2 Saku belakang berpenutup" },
      { label: "Potongan", value: "Relaxed Straight Fit" }
    ]
  },
  {
    id: "celana-3",
    name: "Caramel Brown Loose Carpenter Pants",
    category: "celana",
    categoryLabel: "Celana",
    price: "$79.00",
    priceNum: 79,
    priceIdr: "Rp 1.225.000",
    image: "ASET/IMAGE/Celana jeans baggy.jpg",
    rating: 4.8,
    reviewsCount: 79,
    badge: "Workwear Trend",
    sizes: ["M", "L", "XL"],
    shortDesc: "Celana carpenter berpotongan longgar dengan aksen saku utilitas ganda.",
    description: "Celana bergaya workwear modern dengan siluet loose fit yang leluasa. Dibuat dari katun duck canvas tangguh dengan fitur saku perkakas utilitas di samping paha dan hammer loop autentik yang memberikan sentuhan street style tangguh.",
    specs: [
      { label: "Bahan", value: "Heavyweight Cotton Duck Canvas" },
      { label: "Detail", value: "Utility Tool Pockets & Authentic Hammer Loop" },
      { label: "Jahitan", value: "Bar-tacked stress points anti sobek" },
      { label: "Potongan", value: "Loose Baggy Straight" }
    ]
  },
  {
    id: "celana-4",
    name: "Midnight Navy Tailored Trousers",
    category: "celana",
    categoryLabel: "Celana",
    price: "$89.00",
    priceNum: 89,
    priceIdr: "Rp 1.380.000",
    image: "ASET/IMAGE/Baggy.jpg",
    rating: 4.9,
    reviewsCount: 83,
    badge: "Modern Elegance",
    sizes: ["M", "L", "XL"],
    shortDesc: "Celana panjang berpotongan tailoring presisi dengan lipit halus di depan.",
    description: "Celana panjang berpotongan tailoring rapi dengan single front pleats dan jatuhan bahan kain wool-blend halus yang tidak mudah kusut. Warna midnight navy yang anggun memberikan estetika mewah dan rapi untuk acara formal maupun smart-casual.",
    specs: [
      { label: "Bahan", value: "Premium Poly-Viscose Wool-Touch Blend" },
      { label: "Lipit", value: "Single Front Sharp Pleats" },
      { label: "Kancing", value: "Concealed Waist Hook & Bar Closure" },
      { label: "Potongan", value: "Relaxed Tapered Silhouette" }
    ]
  },

  // --- KATEGORI: AKSESORIS (Size: One Size) ---
  {
    id: "aksesoris-1",
    name: "Artisan Full-Grain Leather Belt",
    category: "aksesoris",
    categoryLabel: "Aksesoris",
    price: "$45.00",
    priceNum: 45,
    priceIdr: "Rp 698.000",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 91,
    badge: "Handcrafted",
    sizes: ["One Size"],
    shortDesc: "Sabuk kulit sapi asli full-grain tebal 3.8mm dengan buckle kuningan solid.",
    description: "Sabuk kulit sapi asli full-grain berkualitas tinggi yang dikerjakan dengan presisi tangan. Menggunakan buckle kuningan solid dengan finishing antique matte yang tahan karat. Kulit akan menghasilkan warna patina alami yang makin indah seiring berjalannya waktu.",
    specs: [
      { label: "Material", value: "100% Genuine Full-Grain Cowhide Leather (3.8mm)" },
      { label: "Buckle", value: "Solid Antique Brass Buckle" },
      { label: "Lebar", value: "3.5 cm (Ideal untuk jeans & trousers)" },
      { label: "Panjang", value: "Adjustable All-Size (115 cm)" }
    ]
  },
  {
    id: "aksesoris-2",
    name: "Classic Tortoise Amber Sunglasses",
    category: "aksesoris",
    categoryLabel: "Aksesoris",
    price: "$58.00",
    priceNum: 58,
    priceIdr: "Rp 899.000",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 67,
    badge: "UV400 Polarized",
    sizes: ["One Size"],
    shortDesc: "Kacamata asetat tortoise hangat dengan lensa polarisasi proteksi UV400.",
    description: "Kacamata hitam berbingkai asetat bermotif tortoise amber yang anggun dan berkarakter. Dilengkapi lensa terpolarisasi UV400 kategori 3 yang mampu menyaring silau matahari terik secara optimal sekaligus memberikan ketajaman kontras visual yang jernih.",
    specs: [
      { label: "Frame", value: "Hand-polished Cellulose Acetate" },
      { label: "Lensa", value: "Polarized UV400 Cat. 3 Protection" },
      { label: "Engsel", value: "Durable 5-barrel Steel Hinges" },
      { label: "Kelengkapan", value: "Hardcase Kulit & Lap Microfiber" }
    ]
  },
  {
    id: "aksesoris-3",
    name: "Heritage Brown Leather Bi-fold Wallet",
    category: "aksesoris",
    categoryLabel: "Aksesoris",
    price: "$48.00",
    priceNum: 48,
    priceIdr: "Rp 745.000",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 104,
    badge: "RFID Protected",
    sizes: ["One Size"],
    shortDesc: "Dompet kulit lipat dua berbahan kulit nabati halus dengan 6 slot kartu.",
    description: "Dompet lipat dua klasik berbahan kulit sapi nabati (vegetable-tanned) yang padat dan halus saat digenggam. Memiliki 6 slot kartu utama, 2 slot tersembunyi, kompartemen uang kertas lega, serta lapisan proteksi RFID anti-pencurian data kartu nirsentuh.",
    specs: [
      { label: "Material", value: "Full-Grain Vegetable Tanned Leather" },
      { label: "Fitur", value: "6 Card Slots, 2 Hidden Slots, Full Bill Compartment" },
      { label: "Keamanan", value: "Integrated RFID-Blocking Shield" },
      { label: "Dimensi", value: "11 cm x 9 cm (Slim Profile)" }
    ]
  },
  {
    id: "aksesoris-4",
    name: "Navy Minimalist Chrono Leather Watch",
    category: "aksesoris",
    categoryLabel: "Aksesoris",
    price: "$135.00",
    priceNum: 135,
    priceIdr: "Rp 2.090.000",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 89,
    badge: "Premium Chrono",
    sizes: ["One Size"],
    shortDesc: "Jam kronograf dial navy 40mm berpadu strap kulit asli Italia warna cokelat.",
    description: "Jam tangan kronograf berdiameter 40mm dengan dial sunray bernuansa midnight navy yang memukau di bawah cahaya. Ditenagai mesin quartz presisi tinggi asal Jepang, dilindungi kaca mineral safir anti gores, serta dipadukan strap kulit asli Italia berkait quick-release.",
    specs: [
      { label: "Case", value: "316L Stainless Steel Matte Gunmetal (40mm)" },
      { label: "Kaca", value: "Sapphire-Coated Mineral Crystal" },
      { label: "Strap", value: "20mm Genuine Italian Leather Quick-Release" },
      { label: "Water Resistance", value: "5 ATM (50 Meter Water Resistant)" }
    ]
  }
];

// Helper functions
function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find((p) => p.id.toLowerCase() === id.toLowerCase()) || null;
}

function getProductsByCategory(category) {
  if (!category || category === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

function getRelatedProducts(currentId, limit = 4) {
  const current = getProductById(currentId);
  if (!current) return PRODUCTS.slice(0, limit);
  const sameCategory = PRODUCTS.filter((p) => p.id !== current.id && p.category === current.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = PRODUCTS.filter((p) => p.id !== current.id && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

// Convert USD to IDR rate
const USD_TO_IDR_RATE = 15500;
function formatUsd(amount) {
  return "$" + Number(amount).toFixed(2);
}
function formatIdr(amountInUsd) {
  const idr = Math.round(Number(amountInUsd) * USD_TO_IDR_RATE);
  return "Rp " + idr.toLocaleString("id-ID");
}
