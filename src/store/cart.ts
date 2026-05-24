import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, type Product } from "@/data/products";

export interface CartItem {
  id: string; // unique key including options
  productId: string;
  name: string;
  basePrice: number;
  unitPrice: number;
  qty: number;
  options: Record<string, string>; // group -> choice label
  notes?: string;
}

interface CartState {
  items: CartItem[];
  customerName: string;
  fulfillment: "pickup" | "delivery";
  address: string;
  orderNotes: string;
  add: (product: Product, options: Record<string, string>, unitPrice: number, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setItemNotes: (id: string, notes: string) => void;
  setCustomerName: (v: string) => void;
  setFulfillment: (v: "pickup" | "delivery") => void;
  setAddress: (v: string) => void;
  setOrderNotes: (v: string) => void;
  clear: () => void;
}

function itemKey(productId: string, options: Record<string, string>) {
  const opts = Object.entries(options).sort().map(([k, v]) => `${k}:${v}`).join("|");
  return `${productId}__${opts}`;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      customerName: "",
      fulfillment: "pickup",
      address: "",
      orderNotes: "",
      add: (product, options, unitPrice, qty = 1) =>
        set((s) => {
          const id = itemKey(product.id, options);
          const existing = s.items.find((i) => i.id === id);
          if (existing) {
            return { items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) };
          }
          return {
            items: [
              ...s.items,
              {
                id,
                productId: product.id,
                name: product.name,
                basePrice: product.price,
                unitPrice,
                qty,
                options,
              },
            ],
          };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      setItemNotes: (id, notes) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, notes } : i)) })),
      setCustomerName: (customerName) => set({ customerName }),
      setFulfillment: (fulfillment) => set({ fulfillment }),
      setAddress: (address) => set({ address }),
      setOrderNotes: (orderNotes) => set({ orderNotes }),
      clear: () => set({ items: [], orderNotes: "" }),
    }),
    { name: "goodcacau-cart" }
  )
);

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function buildWhatsAppMessage(state: {
  items: CartItem[];
  customerName: string;
  fulfillment: "pickup" | "delivery";
  address: string;
  orderNotes: string;
}) {
  const lines: string[] = [];
  lines.push("Olá GoodCacau! Gostaria de fazer um pedido.");
  lines.push("");
  lines.push(`Nome: ${state.customerName || "—"}`);
  lines.push("");
  lines.push("Pedido:");
  for (const i of state.items) {
    const opts = Object.values(i.options).join(" · ");
    const line = `${i.qty}x ${i.name}${opts ? ` — ${opts}` : ""}`;
    lines.push(line);
    if (i.notes) lines.push(`   Obs: ${i.notes}`);
  }
  lines.push("");
  lines.push(`Total estimado: ${formatBRL(cartTotal(state.items))}`);
  lines.push(`Modalidade: ${state.fulfillment === "pickup" ? "Retirada" : "Entrega"}`);
  if (state.fulfillment === "delivery" && state.address) lines.push(`Endereço: ${state.address}`);
  if (state.orderNotes) {
    lines.push("");
    lines.push(`Observações: ${state.orderNotes}`);
  }
  return lines.join("\n");
}
