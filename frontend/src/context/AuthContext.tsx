import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  nivel: string;
  nome: string;
}

interface AuthContextType {
  token: string | null;
  nivel: string | null;
  nome: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedToken = localStorage.getItem("token");
  const decoded = storedToken ? jwtDecode<JwtPayload>(storedToken) : null;

  const [token, setToken] = useState<string | null>(storedToken);
  const [nivel, setNivel] = useState<string | null>(decoded?.nivel ?? null);
  const [nome, setNome] = useState<string | null>(decoded?.nome ?? null);

  const login = (newToken: string) => {
    const payload = jwtDecode<JwtPayload>(newToken);
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setNivel(payload.nivel);
    setNome(payload.nome);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setNivel(null);
    setNome(null);
  };

  return (
    <AuthContext.Provider value={{ token, nivel, nome, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}