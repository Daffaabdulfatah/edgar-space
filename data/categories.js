export const categories = [
  {
    id: 1,
    name: "Kebutuhan Kamar Mandi",
    slug: "kebutuhan-kamar-mandi",
    slugAliases: ["bathroom-essentials", "kebutuhan-kamar-mandi"],
    description: "Perlengkapan tempat sabun, botol pump, dan dispenser sikat untuk kamar mandi rapi dan estetis.",
    thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Organisasi Rumah",
    slug: "organisasi-rumah",
    slugAliases: ["home-organization", "organisasi-rumah"],
    description: "Aksesori gantungan tempel, keranjang penyimpan, dan pengorganisir barang hunian.",
    thumbnail: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Pintu & Perlengkapan",
    slug: "pintu-perlengkapan",
    slugAliases: ["door-hardware", "pintu-perlengkapan"],
    description: "Pengganjal pintu silikon, door stop magnetik, dan perlengkapan pengaman pintu.",
    thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Lampu & Pencahayaan",
    slug: "lampu-pencahayaan",
    slugAliases: ["lighting", "lampu-pencahayaan"],
    description: "Lampu meja nordik, lampu hias minimalis, dan LED strip pencahayaan aksen.",
    thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Dekorasi Rumah",
    slug: "dekorasi-rumah",
    slugAliases: ["home-decor", "dekorasi-rumah"],
    description: "Vas keramik minimalis, reed diffuser aromaterapi, cermin LED, dan bantal sofa estetik.",
    thumbnail: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Dapur & Ruang Makan",
    slug: "dapur-ruang-makan",
    slugAliases: ["kitchen-dining", "dapur-ruang-makan"],
    description: "Tray kayu acacia murni dan peralatan penyajian makanan bergaya skandinavia.",
    thumbnail: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Sanitasi & Perlengkapan",
    slug: "sanitasi-perlengkapan",
    slugAliases: ["sanitary-fixtures", "sanitasi-perlengkapan"],
    description: "Wastafel keramik halus meja dan toilet duduk monoblok berkualitas.",
    thumbnail: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80"
  }
];

export function getCategoryBySlug(slug) {
  return categories.find(c => 
    c.slug === slug || (c.slugAliases && c.slugAliases.includes(slug))
  );
}
