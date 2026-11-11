import { useEffect, useState } from "react";
import api from "../lib/axios";
import { ProductCard } from "../components/home/ProductCard";
import type { Product } from "../data/products";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

type MetaData = {
  current_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
};

export function Shop({ onQuickView }: { onQuickView: (p: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/products?page=${page}&sort=${sort}`);
        
        // Map the Laravel paginated response to our frontend Product type
        const mappedProducts = response.data.data.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          image: p.image_url, // Comes from Laravel Media Library
          price: parseFloat(p.price),
          salePrice: p.sale_price ? parseFloat(p.sale_price) : undefined,
        }));

        setProducts(mappedProducts);
        setMeta({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          total: response.data.total,
          from: response.data.from,
          to: response.data.to,
        });
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, sort]);

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(1);
    setSortOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. Full Width CTA Banner */}
      <div className="flex w-full items-center justify-center border-b border-line bg-[#fafafa] py-16 md:py-24">
        <h1 className="font-abril text-[48px] uppercase tracking-[0.02em] text-ink md:text-[64px]">
          Shop
        </h1>
      </div>

      <div className="container-grid flex-1 py-12">
        {/* 2. Toolbar */}
        <div className="mb-10 flex flex-col items-start justify-between border-b border-line pb-4 sm:flex-row sm:items-center">
          <p className="font-mont text-[13px] uppercase tracking-wider text-muted">
            Showing {meta?.from || 0}–{meta?.to || 0} of {meta?.total || 0} results
          </p>

          {/* Sort Dropdown */}
          <div className="relative mt-4 sm:mt-0">
            <button 
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 font-mont text-[13px] font-medium uppercase tracking-wider text-ink hover:text-muted"
            >
              Sort by: {sort === 'newest' ? 'Newest' : sort === 'price_asc' ? 'Price: Low to High' : 'Price: High to Low'}
              <ChevronDown size={14} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-48 border border-line bg-white py-2 shadow-lg">
                <button onClick={() => handleSortChange('newest')} className="block w-full px-4 py-2 text-left font-mont text-[13px] hover:bg-gray-100">Newest</button>
                <button onClick={() => handleSortChange('price_asc')} className="block w-full px-4 py-2 text-left font-mont text-[13px] hover:bg-gray-100">Price: Low to High</button>
                <button onClick={() => handleSortChange('price_desc')} className="block w-full px-4 py-2 text-left font-mont text-[13px] hover:bg-gray-100">Price: High to Low</button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Products Grid */}
        {isLoading ? (
          <div className="py-20 text-center font-mont text-muted">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center font-mont text-muted">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>
        )}

        {/* 4. Pagination */}
        {meta && meta.last_page > 1 && (
          <div className="mt-16 flex items-center justify-end gap-2 border-t border-line pt-8">
            <button 
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center border border-line text-ink transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: meta.last_page }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`flex h-9 w-9 items-center justify-center border font-mont text-[13px] font-medium transition ${
                    page === pageNumber 
                      ? "border-black bg-black text-white" 
                      : "border-line text-ink hover:border-black"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button 
              onClick={() => setPage(page + 1)}
              disabled={page === meta.last_page}
              className="flex h-9 w-9 items-center justify-center border border-line text-ink transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}