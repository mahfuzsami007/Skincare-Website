export function AdminProducts({ isAddNew = false }: { isAddNew?: boolean }) {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-abril text-[32px] uppercase tracking-[0.02em] text-ink">
          {isAddNew ? "Add New Product" : "All Products"}
        </h1>
        {!isAddNew && (
          <button className="bg-black px-6 py-2.5 font-mont text-[12px] font-bold uppercase text-white">Add Product</button>
        )}
      </div>
      <div className="border border-line p-8 text-center font-mont text-muted">
        {isAddNew ? "Product creation form will go here." : "Products list with editable quantity will go here."}
      </div>
    </div>
  );
}