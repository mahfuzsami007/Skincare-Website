import { useState } from "react";

export function AdminPOS() {
  const [activeTab, setActiveTab] = useState<"manager" | "config">("manager");

  return (
    <div>
      <h1 className="mb-8 font-abril text-[32px] uppercase tracking-[0.02em] text-ink">POS System</h1>
      <div className="mb-6 flex gap-4 border-b border-line">
        <button onClick={() => setActiveTab("manager")} className={`pb-3 font-mont text-[14px] font-bold uppercase ${activeTab === "manager" ? "border-b-2 border-black text-ink" : "text-muted"}`}>POS Manager</button>
        <button onClick={() => setActiveTab("config")} className={`pb-3 font-mont text-[14px] font-bold uppercase ${activeTab === "config" ? "border-b-2 border-black text-ink" : "text-muted"}`}>POS Configuration</button>
      </div>
      <div className="border border-line p-8 text-center font-mont text-muted">
        {activeTab === "manager" ? "Daily POS interface will appear here." : "POS Settings and configuration will appear here."}
      </div>
    </div>
  );
}