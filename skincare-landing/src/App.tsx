import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { newArrivals, bestSelling, saleProducts, type Product } from "./data/products";

// Account Layout & Pages
import { AccountLayout } from "./pages/account/AccountLayout";
import { DashboardHome } from "./pages/account/DashboardHome";
import { Orders } from "./pages/account/Orders";
import { Offers } from "./pages/account/Offers";
import { Addresses } from "./pages/account/Addresses";
import { AccountDetails } from "./pages/account/AccountDetails";

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

            </Route>
          </Routes>

          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}