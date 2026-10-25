import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { MainLayout } from "./layouts/MainLayout";
import { HeroSlider } from "./components/home/HeroSlider";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { ProductSection } from "./components/home/ProductSection";
import { QuickViewModal } from "./components/home/QuickViewModal";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { newArrivals, bestSelling, saleProducts, type Product } from "./data/products";

export default function App() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            
            {/* Public Home Page */}
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

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes (Requires Login) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/admin/products" element={<div className="py-20 text-center">Admin Products Table Here</div>} />
            </Route>

          </Route>
        </Routes>

        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      </BrowserRouter>
    </AuthProvider>
  );
}