import { useEffect, useState } from "react";
import api from "../../lib/axios";

type Order = {
  id: number;
  status: string;
  total_amount: string;
  created_at: string;
  user: { name: string; email: string };
};

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (error: any) {
      console.error("Failed to fetch orders. Laravel says:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders(); // Refresh
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (isLoading) return <div className="font-mont text-muted">Loading orders...</div>;

  return (
    <div>
      <h1 className="mb-8 font-abril text-[32px] uppercase tracking-[0.02em] text-ink">Order Management</h1>
      
      <div className="overflow-x-auto border border-line bg-white">
        <table className="w-full text-left font-mont text-[14px]">
          <thead className="border-b border-line bg-[#fafafa] text-[12px] uppercase tracking-wider text-muted">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-line last:border-0 hover:bg-gray-50">
                <td className="p-4 font-bold text-ink">#{order.id}</td>
                <td className="p-4">
                  <p className="font-semibold text-ink">{order.user?.name}</p>
                  <p className="text-[12px] text-muted">{order.user?.email}</p>
                </td>
                <td className="p-4 text-muted">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="p-4 font-bold text-ink">৳{parseFloat(order.total_amount).toLocaleString()}</td>
                <td className="p-4">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border border-line bg-white p-2 font-mont text-[12px] uppercase font-bold focus:outline-none"
                  >
                    <option value="packed">Order Packed</option>
                    <option value="shipped">Went for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="returned">Returned</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}