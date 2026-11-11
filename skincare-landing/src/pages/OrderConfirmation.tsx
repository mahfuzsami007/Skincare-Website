import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export function OrderConfirmation() {
  return (
    <div className="container-grid flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <CheckCircle size={64} className="mb-6 text-green-500" />
      <h1 className="font-abril text-[36px] uppercase tracking-[0.02em] text-ink">
        Order Confirmed!
      </h1>
      <p className="mt-4 max-w-md font-mont text-[15px] text-muted">
        Thank you for your purchase. Your order has been placed successfully and is now being processed.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          to="/account/orders"
          className="bg-black px-8 py-3 font-mont text-[12px] font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
        >
          View Invoice / Orders
        </Link>
        <Link
          to="/shop"
          className="border border-line px-8 py-3 font-mont text-[12px] font-bold uppercase tracking-wider text-ink transition hover:bg-gray-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}