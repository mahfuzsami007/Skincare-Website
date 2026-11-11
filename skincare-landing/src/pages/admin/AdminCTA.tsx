export function AdminCTA() {
  return (
    <div>
      <h1 className="mb-8 font-abril text-[32px] uppercase tracking-[0.02em] text-ink">CTA Manager</h1>
      <div className="mb-6 flex justify-end">
        <button className="bg-black px-6 py-2.5 font-mont text-[12px] font-bold uppercase text-white">Add New CTA</button>
      </div>
      <div className="border border-line p-8 text-center font-mont text-muted">
        Manage the Call-To-Action banners on the landing page (Add, Edit, Delete).
      </div>
    </div>
  );
}