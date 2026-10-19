import { useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "../../data/products";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) setQuantity(1);
  }, [product]);

  useEffect(() => {
    if (product) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [product]);

  if (!product) return null;

  const formatBDT = (amount: number) => {
    return `৳${amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    // Added p-4 to md:p-12 to ensure generous space around the modal on all screens
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 md:p-12 backdrop-blur-sm">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 
        Modal Box: 
        - Changed md:h-[600px] to md:h-[500px] to decrease height
        - Added max-h-[85vh] to ensure it never overflows the screen
        - overflow-hidden keeps the image contained
      */}
      <div className="relative z-10 flex w-full max-w-[1000px] flex-col overflow-hidden bg-white shadow-2xl md:h-[500px] max-h-[85vh] md:flex-row rounded-sm">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-ink transition hover:bg-gray-100 md:right-6 md:top-6"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        {/* Left Side: Image (Full Height) */}
        <div className="relative w-full h-[250px] shrink-0 md:h-full md:w-1/2 bg-[#f9f9f9]">
          <img 
            src={product.image} 
            alt={product.name} 
            // object-cover makes the image fill the entire left half
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex w-full flex-col justify-center overflow-y-auto p-6 md:w-1/2 md:p-10">
          
          <h2 className="font-mont text-[20px] font-bold uppercase leading-snug tracking-[0.02em] text-ink md:text-[24px]">
            {product.name}
          </h2>

          <div className="mt-2 flex items-center gap-3 font-mont text-[18px] font-bold text-ink md:mt-3 md:text-[20px]">
             {product.salePrice ? (
              <>
                <del className="text-muted/70 decoration-[1.5px] text-[15px] md:text-[16px]">{formatBDT(product.price)}</del>
                <ins className="no-underline">{formatBDT(product.salePrice)}</ins>
              </>
            ) : (
              <span>{formatBDT(product.price)}</span>
            )}
          </div>

          <p className="mt-4 font-mont text-[13px] leading-relaxed text-muted md:mt-6 md:text-[14px]">
            {product.description || "No description available for this product."}
          </p>

          {/* Actions Row */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
            
            {/* Quantity Selector */}
            <div className="flex h-[46px] w-full items-center justify-between border border-line px-4 sm:w-[130px]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-muted hover:text-ink"
              >
                <Minus size={16} />
              </button>
              <span className="font-mont text-[14px] font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-muted hover:text-ink"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Cart */}
            <button 
              className="flex h-[46px] flex-1 items-center justify-center gap-2 bg-black font-mont text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
              onClick={() => {
                alert(`Added ${quantity} ${product.name} to cart!`);
                onClose();
              }}
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}