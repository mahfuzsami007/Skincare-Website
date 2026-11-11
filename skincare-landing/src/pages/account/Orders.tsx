import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/axios";

type Order = {
  id: number;
  status: string;
  total_amount: string;
  created_at: string;
};

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleReturn = async (orderId: number) => {
    if (!confirm("Are you sure you want to return this order?")) return;
    try {
      await api.post(`/orders/${orderId}/return`);
      fetchOrders(); // Refresh list
    } catch (error) {
      alert("Failed to request return");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "packed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-yellow-100 text-yellow-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "returned": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) return <p className="font-mont text-muted">Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="border border-line p-10 text-center">
        <h3 className="mb-4 font-mont text-[18px] font-bold uppercase tracking-wider text-ink">No current orders</h3>
        <p className="mb-8 font-mont text-[14px] text-muted">You haven't placed any orders yet.</p>
        <Link to="/shop" className="inline-block bg-black px-8 py-3 font-mont text-[12px] font-bold uppercase tracking-wider text-white transition hover:bg-gray-800">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full text-left font-mont text-[14px]">
        <thead className="border-b border-line bg-[#fafafa] text-[12px] uppercase tracking-wider text-muted">
          <tr>
            <th className="p-4 font-semibold">Order</th>
            <th className="p-4 font-semibold">Date</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold">Total</th>
            <th className="p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-line last:border-0 hover:bg-gray-50">
              <td className="p-4 font-bold text-ink">#{order.id}</td>
              <td className="p-4 text-muted">{new Date(order.created_at).toLocaleDateString()}</td>
              <td className="p-4">
                <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="p-4 font-bold text-ink">৳{parseFloat(order.total_amount).toLocaleString()}</td>
              <td className="p-4">
                {order.status === "delivered" && (
                  <button onClick={() => handleReturn(order.id)} className="text-red-500 hover:underline text-[12px] uppercase font-bold">
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}