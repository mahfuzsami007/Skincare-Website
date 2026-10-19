export type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  rating?: number;
  soldOut?: boolean;
  description?: string;
};

export const newArrivals: Product[] = [
  { 
    id: 1, 
    slug: "tiam-blue", 
    name: "TIAM BLUE PEPTIDE CALM DOWN SERUM 30ML", 
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", 
    price: 1500,
    description: "A lightweight, calming serum packed with peptides and blue tansy to soothe irritated skin and strengthen the skin barrier."
  },
  { 
    id: 2, 
    slug: "tiam-txa", 
    name: "TIAM TXA WHITENING CREAM 50ML", 
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop", 
    price: 1900,
    description: "Contains Tranexamic Acid (TXA) and Niacinamide to effectively target hyperpigmentation, dark spots, and uneven skin tone."
  },
  { 
    id: 3, 
    slug: "purito-mighty", 
    name: "PURITO Mighty Bamboo Cleanser 30ml", 
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop", 
    price: 700,
    description: "A gentle gel cleanser formulated with bamboo extract and panthenol to hydrate and soothe the skin while effectively removing impurities."
  },
  { 
    id: 4, 
    slug: "klairs-rich", 
    name: "Klairs Rich Moist Soothing Serum 3ml", 
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop", 
    price: 30,
    description: "A highly moisturizing and soothing serum that calms sensitive skin, balances oil-water levels, and deeply hydrates."
  },
];

export const bestSelling: Product[] = [
  { 
    id: 5, 
    slug: "boj-relief", 
    name: "BEAUTY OF JOSEON RELIEF SUN 50ml", 
    image: "https://images.unsplash.com/photo-1598440947619-2c3f1253d714?q=80&w=600&auto=format&fit=crop", 
    price: 1700, 
    salePrice: 1300, 
    rating: 4.5,
    description: "A lightweight, moisturizing sunscreen that soothes and protects the skin. Formulated with 30% Rice Extract and Grain Probiotics."
  },
  { 
    id: 6, 
    slug: "skin1004-centella", 
    name: "Skin1004 Madagascar Centella Sun Serum", 
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop", 
    price: 1900, 
    salePrice: 1300,
    description: "A powerful calming sun serum containing Centella Asiatica extract, known for its soothing and healing properties."
  },
  { 
    id: 7, 
    slug: "axis-y-dark", 
    name: "AXIS-Y Dark Spot Correcting Glow Serum", 
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", 
    price: 1900, 
    salePrice: 1100, 
    soldOut: true,
    description: "A 5% Niacinamide-based serum that corrects dark spots and improves uneven skin tone. The addition of plant-based squalane and papaya extract helps maintain moisture."
  },
  { 
    id: 8, 
    slug: "cosrx-snail", 
    name: "COSRX Advanced Snail 92 Cream 100g", 
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop", 
    price: 1700, 
    salePrice: 1500, 
    rating: 4.5,
    description: "A lightweight, gel-type cream formulated with 92% Snail Secretion Filtrate that helps protect the skin, keeping it smooth and hydrated."
  },
];

export const saleProducts: Product[] = [
  { 
    id: 9, 
    slug: "heimish-bb-23c", 
    name: "[HEIMISH] Moringa BB Cream #23C NUDE", 
    image: "https://images.unsplash.com/photo-1598440947619-2c3f1253d714?q=80&w=600&auto=format&fit=crop", 
    price: 1700, 
    salePrice: 1200,
    description: "A multi-tasking BB cream that provides flawless coverage, UV protection, and anti-aging benefits."
  },
  { 
    id: 10, 
    slug: "heimish-bb-25n", 
    name: "[HEIMISH] Moringa BB Cream #25N MEDIUM", 
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop", 
    price: 1700, 
    salePrice: 1500,
    description: "A multi-tasking BB cream that provides flawless coverage, UV protection, and anti-aging benefits."
  },
  { 
    id: 11, 
    slug: "heimish-bb-27n", 
    name: "[HEIMISH] Moringa BB Cream #27N LIGHT TAN", 
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop", 
    price: 1700, 
    salePrice: 1500,
    description: "A multi-tasking BB cream that provides flawless coverage, UV protection, and anti-aging benefits."
  },
  { 
    id: 12, 
    slug: "heimish-rx", 
    name: "[Heimish] RX HYALURONIC ACID 2% SERUM", 
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", 
    price: 1700, 
    salePrice: 1500,
    description: "A deeply hydrating serum formulated with 2% Hyaluronic Acid to replenish moisture and improve skin elasticity."
  },
];