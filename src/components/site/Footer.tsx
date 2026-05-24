import { Link } from "@tanstack/react-router";
import { BRAND } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-cocoa text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl">{BRAND.name}</div>
          <p className="mt-3 max-w-sm text-sm text-cream/75">{BRAND.tagline}</p>
        </div>
        <div className="text-sm text-cream/80">
          <div className="font-medium text-cream">Visit</div>
          <div className="mt-2">{BRAND.location}</div>
          <div>{BRAND.hours}</div>
        </div>
        <div className="text-sm text-cream/80">
          <div className="font-medium text-cream">Explore</div>
          <ul className="mt-2 space-y-1.5">
            <li><Link to="/menu" className="hover:text-cream">Menu</Link></li>
            <li><Link to="/order" className="hover:text-cream">Your order</Link></li>
            <li><Link to="/about" className="hover:text-cream">About</Link></li>
            <li><Link to="/contact" className="hover:text-cream">Contact · {BRAND.instagram}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} GoodCacau · Feito com calma.
      </div>
    </footer>
  );
}
