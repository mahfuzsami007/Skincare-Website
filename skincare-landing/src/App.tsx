import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { MainLayout } from "./layouts/MainLayout";
import { HeroSlider } from "./components/home/HeroSlider";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { ProductSection } from "./components/home/ProductSection";
import { QuickViewModal } from "./components/home/QuickViewModal";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Cart } from "./pages/Cart";
import { Shop } from "./pages/Shop";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { newArrivals, bestSelling, saleProducts, type Product } from "./data/products";

// Account Pages
import { AccountLayout } from "./pages/account/AccountLayout";
import { DashboardHome } from "./pages/account/DashboardHome";
import { Orders } from "./pages/account/Orders";
import { Offers } from "./pages/account/Offers";
import { Addresses } from "./pages/account/Addresses";
import { AccountDetails } from "./pages/account/AccountDetails";

// Admin Pages
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPOS } from "./pages/admin/AdminPOS";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { AdminPaymentVerification } from "./pages/admin/AdminPaymentVerification";
import { AdminWholesale } from "./pages/admin/AdminWholesale";
import { AdminSales } from "./pages/admin/AdminSales";
import { AdminCustomers } from "./pages/admin/AdminCustomers";
import { AdminCTA } from "./pages/admin/AdminCTA";
import { AdminOrders } from "./pages/admin/AdminOrders";

export default function App() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              
              {/* Public Pages */}
              <Route 
                path="/" 
                element={
                  <>
                    <HeroSlider />
                    <div className="mt-16"><AnnouncementBar /></div>
                    <ProductSection title="New Arrival" products={newArrivals} onQuickView={setQuickViewProduct} />
                    <ProductSection title="Best Selling" products={bestSelling} onQuickView={setQuickViewProduct} />
                    <ProductSection title="Sale" products={saleProducts} onQuickView={setQuickViewProduct} />
                    <div className="mb-0"><AnnouncementBar /></div>
                  </>
                } 
              />
              <Route path="/shop" element={<Shop onQuickView={setQuickViewProduct} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Checkout Pages */}
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
              </Route>

              {/* Protected Account Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/account" element={<AccountLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="offers" element={<Offers />} />
                  <Route path="addresses" element={<Addresses />} />
                  <Route path="details" element={<AccountDetails />} />
                </Route>
              </Route>

              {/* Admin Only Routes */}
              <Route element={<ProtectedRoute requireAdmin={true} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  
                  <Route path="pos">
                    <Route path="manager" element={<AdminPOS />} />
                    <Route path="config" element={<AdminPOS />} />
                  </Route>
                  
                  <Route path="products">
                    <Route index element={<AdminProducts />} />
                    <Route path="new" element={<AdminProducts isAddNew={true} />} />
                  </Route>
                  
                  <Route path="verification" element={<AdminPaymentVerification />} />
                  <Route path="wholesale" element={<AdminWholesale />} />
                  <Route path="sales" element={<AdminSales />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="cta" element={<AdminCTA />} />
                  <Route path="orders" element={<AdminOrders />} /> {/* <-- ADDED ADMIN ORDERS ROUTE */}
                </Route>
              </Route>

            </Route>
          </Routes>

          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}