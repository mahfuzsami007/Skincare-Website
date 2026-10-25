import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../lib/axios";
import { useAuth } from "./AuthContext";

export type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    sale_price: number | null;
    image_url: string;
  };
};

type CartContextType = {
  cart: CartItem[];
  isLoading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    if (!isAuthenticated) setCart([]); // Clear cart state on logout
  }, [isAuthenticated]);

    const addToCart = async (productId: number, quantity: number) => {
    try {
      await api.post("/cart", { product_id: productId, quantity });
      await fetchCart(); // Refresh cart
    } catch (error: any) {
      console.log("Full Error:", error);
      const errMsg = error.response?.data?.error || error.response?.data?.message || "Failed to add to cart.";
      alert(errMsg); // This should now show the exact Laravel error!
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await api.put(`/cart/${cartItemId}`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      await api.delete(`/cart/${cartItemId}`);
      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, isLoading, addToCart, updateQuantity, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}