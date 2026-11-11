import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { ShoppingBag, Users, Package, Banknote } from "lucide-react";

export function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, customers: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data.stats);
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) return <div className="font-mont text-muted">Loading dashboard...</div>;

  const statCards = [
    { title: "Total Revenue", value: `৳${stats.revenue.toLocaleString()}`, icon: Banknote },
    { title: "Total Orders", value: stats.orders, icon: ShoppingBag },
    { title: "Total Products", value: stats.products, icon: Package },
    { title: "Total Customers", value: stats.customers, icon: Users },
  ];

  return (
    <div>
      <h1 className="mb-8 font-abril text-[32px] uppercase tracking-[0.02em] text-ink">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 border border-line p-6 bg-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fafafa] text-ink">
              <stat.icon size={24} />
            </div>
            <div>
              <p className="font-mont text-[12px] font-bold uppercase tracking-wider text-muted">{stat.title}</p>
              <p className="mt-1 font-mont text-[22px] font-bold text-ink">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Recent Orders Table */}
      <div className="mt-12">
        <h2 className="mb-4 font-mont text-[18px] font-bold uppercase text-ink">Recent Sales</h2>
        <div className="border border-line p-6 text-center font-mont text-muted text-[14px]">
          Recent orders table will go here.
        </div>
      </div>
    </div>
  );
}