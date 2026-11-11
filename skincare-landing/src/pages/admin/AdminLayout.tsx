import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Store, Package, ShieldCheck, 
  Tags, BarChart3, Users, LayoutTemplate, LogOut, ChevronDown, ShoppingBag
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ pos: false, products: false });

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-line bg-white">
        <div className="flex h-20 items-center justify-center border-b border-line px-6">
          <h1 className="font-abril text-2xl uppercase tracking-[0.05em] text-ink">Admin Panel</h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {/* Dashboard */}
          <NavLink to="/admin" end className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider transition-colors", isActive ? "bg-black text-white" : "text-muted hover:text-ink hover:bg-gray-100")}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          {/* POS System */}
          <div>
            <button onClick={() => toggleMenu('pos')} className="flex w-full items-center justify-between px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider text-muted hover:bg-gray-100 hover:text-ink">
              <div className="flex items-center gap-3"><Store size={18} /> POS System</div>
              <ChevronDown size={14} className={cn("transition-transform", openMenus.pos && "rotate-180")} />
            </button>
            {openMenus.pos && (
              <div className="mt-1 ml-9 flex flex-col space-y-1 border-l border-line pl-4">
                <NavLink to="/admin/pos/manager" className={({ isActive }) => cn("py-1.5 text-[12px] uppercase tracking-wider", isActive ? "text-ink font-bold" : "text-muted hover:text-ink")}>POS Manager</NavLink>
                <NavLink to="/admin/pos/config" className={({ isActive }) => cn("py-1.5 text-[12px] uppercase tracking-wider", isActive ? "text-ink font-bold" : "text-muted hover:text-ink")}>POS Configuration</NavLink>
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <button onClick={() => toggleMenu('products')} className="flex w-full items-center justify-between px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider text-muted hover:bg-gray-100 hover:text-ink">
              <div className="flex items-center gap-3"><Package size={18} /> Products</div>
              <ChevronDown size={14} className={cn("transition-transform", openMenus.products && "rotate-180")} />
            </button>
            {openMenus.products && (
              <div className="mt-1 ml-9 flex flex-col space-y-1 border-l border-line pl-4">
                <NavLink to="/admin/products/new" className={({ isActive }) => cn("py-1.5 text-[12px] uppercase tracking-wider", isActive ? "text-ink font-bold" : "text-muted hover:text-ink")}>Add New Product</NavLink>
                <NavLink to="/admin/products" end className={({ isActive }) => cn("py-1.5 text-[12px] uppercase tracking-wider", isActive ? "text-ink font-bold" : "text-muted hover:text-ink")}>All Products</NavLink>
              </div>
            )}
          </div>
          <NavLink to="/admin/orders" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider transition-colors", isActive ? "bg-black text-white" : "text-muted hover:text-ink hover:bg-gray-100")}>
            <ShoppingBag size={18} /> Orders
          </NavLink>

          {/* Other Links */}
          <NavLink to="/admin/verification" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider transition-colors", isActive ? "bg-black text-white" : "text-muted hover:text-ink hover:bg-gray-100")}>
            <ShieldCheck size={18} /> Payment Verification
          </NavLink>
          <NavLink to="/admin/wholesale" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider transition-colors", isActive ? "bg-black text-white" : "text-muted hover:text-ink hover:bg-gray-100")}>
            <Tags size={18} /> Wholesale Products
          </NavLink>
          <NavLink to="/admin/sales" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider transition-colors", isActive ? "bg-black text-white" : "text-muted hover:text-ink hover:bg-gray-100")}>
            <BarChart3 size={18} /> Sales
          </NavLink>
          <NavLink to="/admin/customers" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider transition-colors", isActive ? "bg-black text-white" : "text-muted hover:text-ink hover:bg-gray-100")}>
            <Users size={18} /> Customers
          </NavLink>
          <NavLink to="/admin/cta" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider transition-colors", isActive ? "bg-black text-white" : "text-muted hover:text-ink hover:bg-gray-100")}>
            <LayoutTemplate size={18} /> CTA Manager
          </NavLink>
        </nav>

        <div className="border-t border-line p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2.5 font-mont text-[13px] font-medium uppercase tracking-wider text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="p-8 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}