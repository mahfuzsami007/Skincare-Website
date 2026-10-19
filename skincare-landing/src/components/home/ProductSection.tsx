import type { Product } from "../../data/products";
import { ProductCard } from "./ProductCard";

// Add onQuickView to Props
export function ProductSection({ 
  title, 
  products, 
  onQuickView 
}: { 
  title: string; 
  products: Product[]; 
  onQuickView: (p: Product) => void;
}) {
  return (
    <section className="py-20">
      <div className="container-grid">
        <h2 className="mb-12 text-center font-abril text-[32px] font-normal uppercase tracking-[0.02em] text-ink md:text-[42px]">
          {title}
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
}