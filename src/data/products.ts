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
  { id: "hot", label: "Cacau Quente" },
  { id: "iced", label: "Cacau Gelado" },
  { id: "desserts", label: "Doces" },
  { id: "bread", label: "Pães & Brioches" },
  { id: "gifts", label: "Presentes" },
  { id: "seasonal", label: "Sazonais" },
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
    description: "Cacau quente 70% com espuma de canela.",
    longDescription:
      "Nosso cacau quente assinatura — 70% de origem única, leite vaporizado com calma e uma espuma suave de canela. Um abraço quente na caneca.",
    price: 22,
    image: abraco,
    tags: ["bestseller"],
    ingredients: ["cacau 70% de origem única", "leite integral", "canela", "açúcar mascavo"],
    allergens: ["leite"],
    available: true,
    featured: true,
    options: [
      { group: "Tamanho", choices: [{ label: "Regular" }, { label: "Grande", priceDelta: 6 }] },
      { group: "Doçura", choices: [{ label: "Padrão" }, { label: "Menos açúcar" }, { label: "Sem açúcar" }] },
      { group: "Leite", choices: [{ label: "Integral" }, { label: "Aveia", priceDelta: 3 }, { label: "Amêndoas", priceDelta: 3 }] },
    ],
  },
  {
    id: "nuvem-de-cacau",
    name: "Nuvem de Cacau",
    category: "iced",
    description: "Latte gelado de cacau, leve como nuvem.",
    longDescription: "Cacau extraído a frio sobre leite gelado e um toque de baunilha. Leve, suave e refrescante.",
    price: 24,
    image: nuvem,
    tags: ["bestseller"],
    ingredients: ["cacau extraído a frio", "leite", "baunilha", "gelo"],
    allergens: ["leite"],
    available: true,
    featured: true,
    options: [
      { group: "Leite", choices: [{ label: "Integral" }, { label: "Aveia", priceDelta: 3 }, { label: "Amêndoas", priceDelta: 3 }] },
    ],
  },
  {
    id: "brownie-terra-boa",
    name: "Brownie Terra Boa",
    category: "desserts",
    description: "Brownie de cacau denso e cremoso.",
    longDescription: "Assado todos os dias em fôrmas pequenas — bem cremoso por dentro, casquinha fina por cima e pedaços de chocolate amargo.",
    price: 18,
    image: brownie,
    tags: ["bestseller"],
    ingredients: ["chocolate amargo", "manteiga", "ovos", "farinha de trigo", "açúcar de cana"],
    allergens: ["glúten", "ovo", "leite"],
    available: true,
    featured: true,
  },
  {
    id: "brioche-cacau-mel",
    name: "Brioche Cacau & Mel",
    category: "bread",
    description: "Brioche quentinho com ganache e mel.",
    longDescription: "Brioche fofinho, partido ainda quente, pincelado com mel silvestre e recheado com ganache amargo batido devagar.",
    price: 26,
    image: brioche,
    tags: [],
    ingredients: ["brioche", "ganache amargo", "mel silvestre"],
    allergens: ["glúten", "ovo", "leite"],
    available: true,
  },
  {
    id: "bombom-jardim",
    name: "Bombom Jardim",
    category: "gifts",
    description: "Caixa de 4 bombons florais.",
    longDescription: "Quatro bombons pintados à mão: maracujá, praliné de avelã, caramelo com flor de sal e ganache de rosas.",
    price: 48,
    image: bombom,
    tags: [],
    ingredients: ["cacau", "creme de leite", "maracujá", "avelã", "caramelo", "rosa"],
    allergens: ["leite", "oleaginosas"],
    available: true,
    featured: true,
  },
  {
    id: "granola-cacau-manha",
    name: "Granola Cacau da Manhã",
    category: "desserts",
    description: "Granola de cacau, tostada devagar.",
    longDescription: "Aveia, amêndoas e nibs de cacau tostados aos poucos com maple. Manhãs crocantes, com leite gelado.",
    price: 32,
    image: granola,
    tags: ["vegan"],
    ingredients: ["aveia", "amêndoas", "nibs de cacau", "maple", "óleo de coco"],
    allergens: ["oleaginosas"],
    available: true,
  },
  {
    id: "kit-ritual",
    name: "Kit Ritual GoodCacau",
    category: "gifts",
    description: "Kit ritual aconchegante de presente.",
    longDescription: "Nossa caneca de cerâmica, um pote de cacau em pó de origem única e uma barra 70% — embalados em kraft e barbante.",
    price: 145,
    image: kit,
    tags: [],
    ingredients: ["caneca de cerâmica", "cacau em pó 200g", "barra de cacau 70%"],
    allergens: ["leite"],
    available: true,
    featured: true,
    options: [
      { group: "Embalagem de presente", choices: [{ label: "Padrão" }, { label: "Fita premium", priceDelta: 8 }] },
    ],
  },
  {
    id: "chuva-de-maio",
    name: "Cacau Chuva de Maio",
    category: "seasonal",
    description: "Cacau quente sazonal com chantilly.",
    longDescription: "Conforto de dia de chuva: cacau quente com chantilly, raspas de chocolate amargo e um toque sutil de anis-estrelado.",
    price: 28,
    image: chuva,
    tags: ["seasonal"],
    ingredients: ["cacau", "leite", "creme de leite", "anis-estrelado"],
    allergens: ["leite"],
    available: false,
  },
];

export const WHATSAPP_NUMBER = "5511999999999"; // placeholder
export const BRAND = {
  name: "GoodCacau",
  tagline: "Cacau de verdade, feito devagar.",
  hours: "Ter–Dom · 9:00–19:00",
  location: "Rua das Flores, 123 — São Paulo",
  instagram: "@goodcacau",
};

// Tradução de tags para PT
export const TAG_LABELS: Record<Tag, string> = {
  vegan: "Vegano",
  "gluten-free": "Sem glúten",
  seasonal: "Sazonal",
  bestseller: "Mais pedido",
};
