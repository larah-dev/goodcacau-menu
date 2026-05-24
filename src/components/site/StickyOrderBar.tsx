import { Link } from "@tanstack/react-router";
import { useCart, cartCount, cartTotal, formatBRL } from "@/store/cart";
import { ShoppingBasket } from "lucide-react";

export function StickyOrderBar() {
  const items = useCart((s) => s.items);
  const count = cartCount(items);
  if (count === 0) return null;
  const total = cartTotal(items);
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3 md:hidden">
      <Link
        to="/order"
        className="flex items-center justify-between gap-3 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-warm"
      >
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <ShoppingBasket className="h-4 w-4" />
          {count} {count === 1 ? "item" : "items"} · {formatBRL(total)}
        </span>
        <span className="text-sm font-semibold">View Order →</span>
      </Link>
    </div>
  );
}
