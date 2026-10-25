import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/axios";

export function AccountDetails() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    displayName: user?.name || "",
    email: user?.email || "",
    password: "",
    password_confirmation: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await api.put("/profile", {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password || undefined,
        password_confirmation: formData.password ? formData.password_confirmation : undefined,
      });
      
      setStatus({ type: "success", message: "Account details updated successfully!" });
    } catch (error: any) {
      setStatus({ type: "error", message: error.response?.data?.message || "Failed to update." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {status.message && (
        <div className={`p-3 font-mont text-[13px] ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-mont text-[13px] font-bold text-ink">First name *</label>
          <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
        </div>
        <div>
          <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Last name *</label>
          <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Email address *</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
      </div>

      <div className="mt-4 border-t border-line pt-6">
        <h3 className="mb-4 font-mont text-[16px] font-bold text-ink">Password change</h3>
        <div className="flex flex-col gap-6">
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">New password (leave blank to leave unchanged)</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block font-mont text-[13px] font-bold text-ink">Confirm new password</label>
            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none" />
          </div>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="mt-4 w-fit bg-black px-8 py-3 font-mont text-[12px] font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:bg-gray-400">
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}