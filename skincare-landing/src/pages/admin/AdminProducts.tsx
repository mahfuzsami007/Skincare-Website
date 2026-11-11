import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/axios";
import { Pencil, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  stock: number;
  image_url: string;
  category?: { name: string };
  brand?: { name: string };
};

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data.data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  if (isLoading) return <div className="font-mont text-muted">Loading products...</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-abril text-[32px] uppercase tracking-[0.02em] text-ink">All Products</h1>
        <Link to="/admin/products/new" className="bg-black px-6 py-2.5 font-mont text-[12px] font-bold uppercase text-white hover:bg-gray-800 transition">
          Add New Product
        </Link>
      </div>

      <div className="overflow-x-auto border border-line bg-white">
        <table className="w-full text-left font-mont text-[14px]">
          <thead className="border-b border-line bg-[#fafafa] text-[12px] uppercase tracking-wider text-muted">
            <tr>
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Brand / Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-line last:border-0 hover:bg-gray-50">
                <td className="p-4">
                  <div className="h-12 w-12 overflow-hidden border border-line bg-white">
                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                </td>
                <td className="p-4 font-bold text-ink">{product.name}</td>
                <td className="p-4 text-muted">
                  <p>{product.brand?.name || 'No Brand'}</p>
                  <p className="text-[12px]">{product.category?.name || 'No Category'}</p>
                </td>
                <td className="p-4">
                  <p className="font-bold">৳{product.price}</p>
                  {product.sale_price && <p className="text-[12px] text-red-500">৳{product.sale_price}</p>}
                </td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Link to={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}