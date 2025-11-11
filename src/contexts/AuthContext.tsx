import { createContext, PropsWithChildren, useContext, useState } from "react";
import { User } from "../features/Auth/models/user";
import { ACCESS_TOKEN } from "../utils/constants";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getMe, login as handleLogin } from "../services/authService";
import { LoginFormValues } from "@/features/Auth/lib/form";

type AuthContextType = {
  user?: User | null;
  login: UseMutateAsyncFunction<
    { user: User; token: string },
    Error,
    LoginFormValues,
    unknown
  >;
  logout: () => void;
  loadUser: () => void;
  isLoading: boolean;
  isError: boolean;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: isAuthenticated,
  });

  const { mutateAsync: login } = useMutation({
    mutationFn: handleLogin,
    onSuccess: ({ token }) => {
      localStorage.setItem(ACCESS_TOKEN, token);
      setIsAuthenticated(true);
    },
  });

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        login,
        logout,
        loadUser: () => setIsAuthenticated(true),
        isLoading,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
