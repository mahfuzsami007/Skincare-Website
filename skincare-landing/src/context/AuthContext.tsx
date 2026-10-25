import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react"; // <-- Type-only import fix
import api from "../lib/axios";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  role: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/profile");
          setUser(response.data.user);
          setRole(response.data.role);
        } catch (error) {
          localStorage.removeItem("token");
          setUser(null);
          setRole(null);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });
    const { user, role, token } = response.data;
    
    localStorage.setItem("token", token);
    setUser(user);
    setRole(role);
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    const response = await api.post("/register", { name, email, password, password_confirmation });
    const { user, token } = response.data;
    
    localStorage.setItem("token", token);
    setUser(user);
    setRole("user");
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}