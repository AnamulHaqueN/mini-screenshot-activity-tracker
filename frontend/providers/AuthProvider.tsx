"use client";

import { createContext, useContext } from "react";
import { useMe, useLogin, useLogout, useRegister } from "@/hooks/useAuth";
import { ILogin, IRegister } from "@/types/auth";

type AuthContextType = {
  loading: boolean;
  login: (data: ILogin) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: IRegister) => Promise<void>;
  refetchMe: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, refetch } = useMe();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const registerMutation = useRegister();

  const login = async (data: ILogin) => {
    await loginMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const register = async (data: IRegister) => {
    await registerMutation.mutateAsync(data);
  };

  return (
    <AuthContext.Provider
      value={{
        loading: isLoading,
        login,
        logout,
        register,
        refetchMe: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
