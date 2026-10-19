import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HeroSlider } from "./components/home/HeroSlider";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { ProductSection } from "./components/home/ProductSection";
import { QuickViewModal } from "./components/home/QuickViewModal";
import { newArrivals, bestSelling, saleProducts, type Product } from "./data/products";

export default function App() {
  // State to hold the product currently being quick-viewed
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route 
            path="/" 
            element={
              <>
                <HeroSlider />
                <div className="mt-16">
                  <AnnouncementBar />
                </div>
                
                <ProductSection 
                  title="New Arrival" 
                  products={newArrivals} 
                  onQuickView={(p) => setQuickViewProduct(p)} 
                />
                <ProductSection 
                  title="Best Selling" 
                  products={bestSelling} 
                  onQuickView={(p) => setQuickViewProduct(p)} 
                />
                <ProductSection 
                  title="Sale" 
                  products={saleProducts} 
                  onQuickView={(p) => setQuickViewProduct(p)} 
                />
                
                <div className="mb-0">
                  <AnnouncementBar />
                </div>
              </>
            } 
          />
        </Route>
      </Routes>

      {/* Global Modal Instance */}
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </BrowserRouter>
  );
}