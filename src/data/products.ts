import abraco from "@/assets/p-abraco.jpg";
import nuvem from "@/assets/p-nuvem.jpg";
import brownie from "@/assets/p-brownie.jpg";
import brioche from "@/assets/p-brioche.jpg";
import bombom from "@/assets/p-bombom.jpg";
import granola from "@/assets/p-granola.jpg";
import kit from "@/assets/p-kit.jpg";
import chuva from "@/assets/p-chuva.jpg";

export type Category = "hot" | "iced" | "desserts" | "bread" | "gifts" | "seasonal";

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "hot", label: "Hot Cacao" },
  { id: "iced", label: "Iced Cacao" },
  { id: "desserts", label: "Desserts" },
  { id: "bread", label: "Bread & Brioche" },
  { id: "gifts", label: "Gifts" },
  { id: "seasonal", label: "Seasonal" },
];

export type Tag = "vegan" | "gluten-free" | "seasonal" | "bestseller";

export interface ProductOption {
  group: string;
  choices: { label: string; priceDelta?: number }[];
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  tags: Tag[];
  ingredients: string[];
  allergens: string[];
  available: boolean;
  featured?: boolean;
  options?: ProductOption[];
}

export const PRODUCTS: Product[] = [
  {
    id: "cacau-abraco",
    name: "Cacau Abraço",
    category: "hot",
    description: "Hot 70% cacao with cinnamon foam.",
    longDescription:
      "Our signature hot cacao — 70% single-origin, gently steamed milk, and a soft cinnamon foam. A warm hug in a mug.",
    price: 22,
    image: abraco,
    tags: ["bestseller"],
    ingredients: ["70% single-origin cacao", "whole milk", "cinnamon", "muscovado sugar"],
    allergens: ["milk"],
    available: true,
    featured: true,
    options: [
      { group: "Size", choices: [{ label: "Regular" }, { label: "Large", priceDelta: 6 }] },
      { group: "Sweetness", choices: [{ label: "Standard" }, { label: "Less sugar" }, { label: "No sugar" }] },
      { group: "Milk", choices: [{ label: "Whole" }, { label: "Oat", priceDelta: 3 }, { label: "Almond", priceDelta: 3 }] },
    ],
  },
  {
    id: "nuvem-de-cacau",
    name: "Nuvem de Cacau",
    category: "iced",
    description: "Iced cacao latte, cloud-soft.",
    longDescription: "Cold-extracted cacao layered over chilled milk and a whisper of vanilla. Light, smooth, refreshing.",
    price: 24,
    image: nuvem,
    tags: ["bestseller"],
    ingredients: ["cold-extracted cacao", "milk", "vanilla", "ice"],
    allergens: ["milk"],
    available: true,
    featured: true,
    options: [
      { group: "Milk", choices: [{ label: "Whole" }, { label: "Oat", priceDelta: 3 }, { label: "Almond", priceDelta: 3 }] },
    ],
  },
  {
    id: "brownie-terra-boa",
    name: "Brownie Terra Boa",
    category: "desserts",
    description: "Dense, fudgy cacao brownie.",
    longDescription: "Baked daily in small trays — deeply fudgy, with a paper-thin crackle top and pools of dark chocolate.",
    price: 18,
    image: brownie,
    tags: ["bestseller"],
    ingredients: ["dark chocolate", "butter", "eggs", "wheat flour", "cane sugar"],
    allergens: ["gluten", "egg", "milk"],
    available: true,
    featured: true,
  },
  {
    id: "brioche-cacau-mel",
    name: "Brioche Cacau & Mel",
    category: "bread",
    description: "Warm brioche with ganache & honey.",
    longDescription: "Pillowy brioche, split warm, brushed with wild honey, and filled with a slow-whisked dark ganache.",
    price: 26,
    image: brioche,
    tags: [],
    ingredients: ["brioche", "dark ganache", "wild honey"],
    allergens: ["gluten", "egg", "milk"],
    available: true,
  },
  {
    id: "bombom-jardim",
    name: "Bombom Jardim",
    category: "gifts",
    description: "4-piece floral bonbon box.",
    longDescription: "Four hand-painted bonbons: passion fruit, hazelnut praline, sea-salt caramel, and rose ganache.",
    price: 48,
    image: bombom,
    tags: [],
    ingredients: ["cacao", "cream", "passion fruit", "hazelnut", "caramel", "rose"],
    allergens: ["milk", "nuts"],
    available: true,
    featured: true,
  },
  {
    id: "granola-cacau-manha",
    name: "Granola Cacau da Manhã",
    category: "desserts",
    description: "Cacao granola, slow-toasted.",
    longDescription: "Oats, almonds, and cacao nibs slow-toasted with maple. Crunchy mornings, served with cold milk.",
    price: 32,
    image: granola,
    tags: ["vegan"],
    ingredients: ["oats", "almonds", "cacao nibs", "maple syrup", "coconut oil"],
    allergens: ["nuts"],
    available: true,
  },
  {
    id: "kit-ritual",
    name: "Kit Ritual GoodCacau",
    category: "gifts",
    description: "Cozy ritual gift kit.",
    longDescription: "Our ceramic mug, a jar of single-origin cacao powder, and a 70% bar — wrapped in kraft & twine.",
    price: 145,
    image: kit,
    tags: [],
    ingredients: ["ceramic mug", "cacao powder 200g", "70% cacao bar"],
    allergens: ["milk"],
    available: true,
    featured: true,
    options: [
      { group: "Gift wrap", choices: [{ label: "Standard" }, { label: "Premium ribbon", priceDelta: 8 }] },
    ],
  },
  {
    id: "chuva-de-maio",
    name: "Cacau Chuva de Maio",
    category: "seasonal",
    description: "Seasonal hot cacao with whipped cream.",
    longDescription: "Rainy-day comfort: warm cacao with whipped cream, dark chocolate shavings, and a quiet hint of star anise.",
    price: 28,
    image: chuva,
    tags: ["seasonal"],
    ingredients: ["cacao", "milk", "cream", "star anise"],
    allergens: ["milk"],
    available: false,
  },
];

export const WHATSAPP_NUMBER = "5511999999999"; // placeholder
export const BRAND = {
  name: "GoodCacau",
  tagline: "Real cacao, made slow.",
  hours: "Tue–Sun · 9:00–19:00",
  location: "Rua das Flores, 123 — São Paulo",
  instagram: "@goodcacau",
};

// English labels for tags
export const TAG_LABELS: Record<Tag, string> = {
  vegan: "Vegan",
  "gluten-free": "Gluten-free",
  seasonal: "Seasonal",
  bestseller: "Bestseller",
};
