import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Cart() {
  const { cart, updateQuantity, removeFromCart, isLoading } = useCart();
  const navigate = useNavigate();
  
  // State for shipping
  const [shippingZone, setShippingZone] = useState<"dhaka" | "outside">("dhaka");
  const [showAddressMenu, setShowAddressMenu] = useState(false);
  const [coupon, setCoupon] = useState("");

  // Calculations
  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.sale_price ?? item.product.price;
    return acc + (price * item.quantity);
  }, 0);
  
  const shippingCost = shippingZone === "dhaka" ? 80 : 150;
  const total = subtotal + shippingCost;

  const formatBDT = (amount: number) => `৳${amount.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`;

  if (isLoading) return <div className="py-20 text-center font-mont">Loading cart...</div>;

  if (cart.length === 0) {
    return (
      <div className="container-grid flex min-h-[50vh] flex-col items-center justify-center">
        <h2 className="font-abril text-3xl uppercase">Your cart is empty</h2>
        <Link to="/" className="mt-6 bg-black px-6 py-3 font-mont text-[12px] font-bold text-white uppercase hover:bg-gray-800">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-grid py-12">
      {/* Top Success Banner (Simulated) */}
      <div className="mb-10 flex flex-col items-center justify-between border border-line bg-[#f9f9f9] p-6 sm:flex-row">
        <p className="font-mont text-[14px] text-muted">
          Your cart has been updated.
        </p>
        <Link to="/" className="mt-4 bg-black px-6 py-3 font-mont text-[12px] font-bold uppercase text-white hover:bg-gray-800 sm:mt-0">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-7 xl:col-span-8">
          <h1 className="mb-8 font-abril text-[32px] uppercase tracking-[0.02em] text-ink">Shopping Cart</h1>
          
          <div className="flex flex-col border-t border-line">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-6 border-b border-line py-6">
                
                {/* Remove Button */}
                <button onClick={() => removeFromCart(item.id)} className="text-muted hover:text-red-500">
                  <X size={18} />
                </button>

                {/* Image */}
                <div className="h-20 w-20 shrink-0 bg-white p-2">
                  <img src={item.product.image_url} alt={item.product.name} className="h-full w-full object-contain mix-blend-multiply" />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col">
                  <h3 className="font-mont text-[14px] font-bold uppercase text-ink">{item.product.name}</h3>
                  <p className="mt-1 font-mont text-[14px] font-bold text-muted">
                    {formatBDT(item.product.sale_price ?? item.product.price)}
                  </p>
                </div>

                {/* Quantity Control */}
                <div className="flex h-[40px] items-center border border-line bg-white">
                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 text-muted hover:text-ink">◀</button>
                  <input 
                    type="text" 
                    value={item.quantity} 
                    readOnly 
                    className="w-10 text-center font-mont text-[14px] focus:outline-none" 
                  />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 text-muted hover:text-ink">▶</button>
                </div>

                {/* Subtotal */}
                <div className="w-24 text-right font-mont text-[14px] font-bold text-ink">
                  {formatBDT((item.product.sale_price ?? item.product.price) * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Coupon & Update Cart Row */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1">
              <input 
                type="text" 
                placeholder="Coupon code" 
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full border border-line bg-[#f9f9f9] p-3 font-mont text-[13px] focus:outline-none"
              />
              <button className="bg-[#f0f0f0] px-6 py-3 font-mont text-[12px] font-bold uppercase tracking-wider text-ink hover:bg-gray-200">
                Apply Coupon
              </button>
            </div>
            <button className="border border-line px-6 py-3 font-mont text-[12px] font-bold uppercase tracking-wider text-ink hover:bg-gray-50">
              Update Cart
            </button>
          </div>

          {/* Back to Shop */}
          <Link to="/" className="mt-8 inline-flex items-center gap-2 font-mont text-[13px] text-muted hover:text-ink">
            <ChevronLeft size={16} /> Go Back Shopping
          </Link>
        </div>

        {/* Right Column: Cart Totals */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-[#f9f9f9] p-8">
            <h2 className="mb-8 font-abril text-[26px] uppercase tracking-[0.02em] text-ink">Cart Totals</h2>
            
            <div className="flex flex-col gap-4 border-b border-line pb-6">
              <div className="flex justify-between font-mont text-[13px] font-bold uppercase tracking-wider text-ink">
                <span>Subtotal</span>
                <span className="text-muted">{formatBDT(subtotal)}</span>
              </div>
              
              <div className="flex justify-between font-mont text-[13px] font-bold uppercase tracking-wider text-ink">
                <span>Shipment</span>
                <span className="text-muted">{shippingZone === 'dhaka' ? '80 BDT: ' : '150 BDT: '} {formatBDT(shippingCost)}</span>
              </div>
              <p className="font-mont text-[13px] text-muted">
                Shipping to {shippingZone === 'dhaka' ? 'Dhaka' : 'Outside Dhaka'}.
              </p>
              
              {/* Change Address Dropdown */}
              <div className="relative mt-2 text-center">
                <button 
                  onClick={() => setShowAddressMenu(!showAddressMenu)}
                  className="inline-flex items-center gap-2 font-mont text-[12px] font-bold uppercase tracking-wider text-ink hover:text-muted"
                >
                  Change Address <ChevronDown size={14} />
                </button>
                
                {showAddressMenu && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-2 border border-line bg-white py-2 shadow-lg">
                    <button 
                      onClick={() => { setShippingZone("dhaka"); setShowAddressMenu(false); }}
                      className="block w-full px-4 py-2 text-left font-mont text-[13px] hover:bg-gray-100"
                    >
                      Inside Dhaka (৳80)
                    </button>
                    <button 
                      onClick={() => { setShippingZone("outside"); setShowAddressMenu(false); }}
                      className="block w-full px-4 py-2 text-left font-mont text-[13px] hover:bg-gray-100"
                    >
                      Outside Dhaka (৳150)
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-mont text-[15px] font-bold uppercase tracking-wider text-ink">Total</span>
              <span className="font-mont text-[20px] font-bold text-ink">{formatBDT(total)}</span>
            </div>

            <button 
              onClick={() => navigate("/checkout")}
              className="mt-8 w-full bg-black py-4 font-mont text-[13px] font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}