import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useCart } from "../context/CartContext";

export function Checkout() {
  const { cart, fetchCart } = useCart(); // Assume your CartContext has a fetchCart method
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

    const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      await api.post("/checkout", { payment_method: "cod" });
      await fetchCart();
      navigate("/order-confirmation");
    } catch (error: any) {
      // THIS WILL SHOW THE EXACT LARAVEL ERROR
      console.error("Checkout Error:", error.response?.data);
      alert(
        `Error: ${error.response?.data?.error || error.response?.data?.message || "Something went wrong"} (Line: ${error.response?.data?.line})`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-grid py-16">
      <h1 className="mb-10 text-center font-abril text-[32px] uppercase tracking-[0.02em] text-ink">
        Checkout
      </h1>
      
      <div className="mx-auto max-w-2xl border border-line bg-[#fafafa] p-8">
        <h2 className="mb-6 font-mont text-[18px] font-bold uppercase text-ink">Payment Method</h2>
        
        <label className="flex cursor-pointer items-center gap-4 border border-ink bg-white p-6">
          <input type="radio" name="payment" defaultChecked className="h-4 w-4 accent-black" />
          <div>
            <span className="block font-mont text-[15px] font-bold uppercase text-ink">Cash on Delivery (COD)</span>
            <span className="block font-mont text-[13px] text-muted">Pay with cash upon delivery.</span>
          </div>
        </label>

        <button
          onClick={handlePlaceOrder}
          disabled={isLoading || cart.length === 0}
          className="mt-10 w-full bg-black py-4 font-mont text-[13px] font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}