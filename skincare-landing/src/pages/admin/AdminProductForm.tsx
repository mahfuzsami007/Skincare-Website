import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios";

export function AdminProductForm({ isAddNew = false }: { isAddNew?: boolean }) {
  const { id } = useParams(); // Get ID from URL if editing
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    brand_id: "",
    description: "",
    price: "",
    sale_price: "",
    stock: "",
  });
  const [image, setImage] = useState<File | null>(null);

  // Fetch categories & brands for dropdowns
  useEffect(() => {
    const fetchMeta = async () => {
      const [catRes, brandRes] = await Promise.all([
        api.get("/admin/categories"),
        api.get("/admin/brands")
      ]);
      setCategories(catRes.data);
      setBrands(brandRes.data);
    };
    fetchMeta();
  }, []);

  // If editing, fetch the existing product data
  useEffect(() => {
    if (!isAddNew && id) {
      const fetchProduct = async () => {
        const res = await api.get(`/admin/products/${id}`);
        const p = res.data;
        setFormData({
          name: p.name,
          category_id: p.category_id || "",
          brand_id: p.brand_id || "",
          description: p.description || "",
          price: p.price,
          sale_price: p.sale_price || "",
          stock: p.stock,
        });
      };
      fetchProduct();
    }
  }, [id, isAddNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.category_id) data.append("category_id", formData.category_id);
    if (formData.brand_id) data.append("brand_id", formData.brand_id);
    if (formData.description) data.append("description", formData.description);
    data.append("price", formData.price);
    if (formData.sale_price) data.append("sale_price", formData.sale_price);
    data.append("stock", formData.stock);
    if (image) data.append("image", image);

        try {
      if (isAddNew) {
        await api.post("/admin/products", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        data.append("_method", "PUT");
        await api.post(`/admin/products/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      navigate("/admin/products");
    } catch (error: any) {
       // ... error handling
      console.error("Full Error:", error.response?.data);
      
      // Extract and show the exact validation errors
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join("\n");
        alert(`Validation Error:\n${errorMessages}`);
      } else {
        alert(`Error: ${error.response?.data?.message || "Failed to save product"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 font-abril text-[32px] uppercase tracking-[0.02em] text-ink">
        {isAddNew ? "Add New Product" : "Edit Product"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 border border-line bg-white p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Product Name *</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="w-full border border-line p-2 font-mont text-[13px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Category</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Brand</label>
            <select name="brand_id" value={formData.brand_id} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none">
              <option value="">Select Brand</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Description</label>
          <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Regular Price (৳) *</label>
            <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Sale Price (৳)</label>
            <input type="number" name="sale_price" value={formData.sale_price} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Stock *</label>
            <input type="number" name="stock" required value={formData.stock} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="mt-4 w-fit bg-black px-8 py-3 font-mont text-[12px] font-bold uppercase text-white hover:bg-gray-800 disabled:bg-gray-400">
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}