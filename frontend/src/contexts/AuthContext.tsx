import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

const TOKEN_KEY = "hp_token";
const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

type UserRole = 'admin' | null;

interface AuthContextType {
  userRole: UserRole;
  isLoggedIn: boolean;
  isAuthReady: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // DEV ONLY: auto-login admin
    setUserRole('admin');
    setIsAuthReady(true);
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();

    localStorage.setItem(TOKEN_KEY, data.token); // 🔥 REQUIRED
    setUserRole(data.role);
  };




  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        isLoggedIn: userRole !== null,
        isAuthReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
