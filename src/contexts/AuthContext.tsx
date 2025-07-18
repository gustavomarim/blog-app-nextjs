"use client";

import { getApiUrl } from "@/config/api";
import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const checkAuth = async () => {
    try {
      const response = await fetch(`${getApiUrl("users")}/profile`, {
        credentials: "include",
      });

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${getApiUrl("users")}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        await checkAuth();
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(`${getApiUrl("users")}/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch(getApiUrl("register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (response.ok) {
        return await login(userData.email, userData.password);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao criar conta");
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      return false;
    }
  };

  const refreshUser = async (): Promise<void> => {
    await checkAuth();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
