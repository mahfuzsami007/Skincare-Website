import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/axios";

type Address = {
  id?: number;
  type: "billing" | "shipping";
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
};

const emptyAddress = (type: "billing" | "shipping"): Address => ({
  type,
  first_name: "",
  last_name: "",
  street: "",
  city: "",
  postcode: "",
  country: "Bangladesh",
  phone: "",
});

export function Addresses() {
  const { user } = useAuth();
  const [billing, setBilling] = useState<Address>(emptyAddress("billing"));
  const [shipping, setShipping] = useState<Address>(emptyAddress("shipping"));
  
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);

  // Fetch initial addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await api.get("/addresses");
        const data = res.data;
        
        const fetchedBilling = data.find((a: Address) => a.type === "billing");
        const fetchedShipping = data.find((a: Address) => a.type === "shipping");

        if (fetchedBilling) setBilling(fetchedBilling);
        if (fetchedShipping) setShipping(fetchedShipping);
      } catch (error) {
        console.error("Failed to load addresses", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleSave = async (address: Address, setEdit: (val: boolean) => void) => {
    try {
      const res = await api.post("/addresses", address);
      // Update local state with the saved data from DB (so we get the ID)
      if (address.type === "billing") setBilling(res.data.address);
      if (address.type === "shipping") setShipping(res.data.address);
      setEdit(false);
    } catch (error) {
      alert("Failed to save address");
    }
  };

  const renderForm = (address: Address, setAddress: (val: Address) => void, onSave: () => void, onCancel: () => void) => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="First name" value={address.first_name} onChange={(e) => setAddress({ ...address, first_name: e.target.value })} className="w-full border border-line p-2.5 font-mont text-[13px]" />
        <input type="text" placeholder="Last name" value={address.last_name} onChange={(e) => setAddress({ ...address, last_name: e.target.value })} className="w-full border border-line p-2.5 font-mont text-[13px]" />
      </div>
      <input type="text" placeholder="Street address" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="w-full border border-line p-2.5 font-mont text-[13px]" />
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full border border-line p-2.5 font-mont text-[13px]" />
        <input type="text" placeholder="Postcode" value={address.postcode} onChange={(e) => setAddress({ ...address, postcode: e.target.value })} className="w-full border border-line p-2.5 font-mont text-[13px]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="w-full border border-line p-2.5 font-mont text-[13px]" />
        <input type="text" placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className="w-full border border-line p-2.5 font-mont text-[13px]" />
      </div>
      <div className="mt-2 flex gap-4">
        <button onClick={onSave} className="bg-black px-6 py-2 font-mont text-[12px] font-bold text-white uppercase">Save</button>
        <button onClick={onCancel} className="font-mont text-[12px] font-bold text-muted uppercase">Cancel</button>
      </div>
    </div>
  );

  const renderView = (address: Address, onEdit: () => void) => (
    <div>
      <div className="absolute right-8 top-8">
        <button onClick={onEdit} className="text-muted hover:text-ink"><Pencil size={18} /></button>
      </div>
      <div className="font-mont text-[14px] leading-loose text-muted">
        {address.street ? (
          <>
            <p className="font-semibold text-ink">{address.first_name} {address.last_name}</p>
            <p>{address.street}</p>
            <p>{address.city}, {address.postcode}</p>
            <p>{address.country}</p>
            <p className="mt-2 text-ink">{address.phone}</p>
            <p className="text-ink">{user?.email}</p>
          </>
        ) : (
          <p className="italic">No address set. Click the edit icon to add one.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="relative border border-line p-8">
        <h3 className="mb-6 font-mont text-[16px] font-bold uppercase text-ink">Billing Address</h3>
        {isEditingBilling 
          ? renderForm(billing, setBilling, () => handleSave(billing, setIsEditingBilling), () => setIsEditingBilling(false)) 
          : renderView(billing, () => setIsEditingBilling(true))}
      </div>

      <div className="relative border border-line p-8">
        <h3 className="mb-6 font-mont text-[16px] font-bold uppercase text-ink">Shipping Address</h3>
        {isEditingShipping 
          ? renderForm(shipping, setShipping, () => handleSave(shipping, setIsEditingShipping), () => setIsEditingShipping(false)) 
          : renderView(shipping, () => setIsEditingShipping(true))}
      </div>
    </div>
  );
}