import { Link, useNavigate } from "react-router-dom";
import { Eye, Heart, Star } from "lucide-react";
import type { Product } from "../../data/products";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export function ProductCard({ product, onQuickView }: { product: Product, onQuickView: (p: Product) => void }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const off = product.salePrice && product.salePrice < product.price
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const formatBDT = (amount: number) => {
    return `৳${amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    alert("Wishlist backend coming soon!");
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (product.soldOut) {
      navigate(`/product/${product.slug}`);
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    await addToCart(product.id, 1);
  };

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-white">
        {product.soldOut ? (
          <span className="absolute right-4 top-4 z-10 bg-black px-2.5 py-1 font-mont text-[12px] font-bold uppercase tracking-wider text-white">Sold</span>
        ) : off ? (
          <span className="absolute right-4 top-4 z-10 bg-black px-2.5 py-1 font-mont text-[12px] font-bold uppercase tracking-wider text-white">-{off}%</span>
        ) : null}

        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover mix-blend-multiply p-6 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="pointer-events-auto flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white"
              aria-label="Quick View"
            >
              <Eye size={16} />
            </button>
            
            <button 
              onClick={handleWishlist}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white"
              aria-label="Add to Wishlist"
            >
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <h5 className="font-mont text-[13px] font-bold uppercase leading-snug tracking-[0.02em] text-ink">
          <Link to={`/product/${product.slug}`} className="hover:text-muted transition-colors">
            {product.name}
          </Link>
        </h5>

        {product.rating && (
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={12} className={i <= Math.round(product.rating!) ? "fill-amber-400 text-amber-400" : "text-amber-400"} strokeWidth={1} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 font-mont text-[15px] font-bold text-ink">
          {product.salePrice ? (
            <>
              <del className="text-muted/70 decoration-[1.5px]">{formatBDT(product.price)}</del>
              <ins className="no-underline">{formatBDT(product.salePrice)}</ins>
            </>
          ) : (
            <span>{formatBDT(product.price)}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className="mt-1 inline-block font-mont text-[12px] font-bold uppercase tracking-menu text-ink hover:text-muted transition-colors"
        >
          {product.soldOut ? "Read more" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}