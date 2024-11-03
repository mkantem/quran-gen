import React, { createContext, useState, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // Implement actual authentication logic here
    setIsAuthenticated(true);
    setUser({
      id: '1',
      email,
      name: 'User',
    });
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    // Implement actual registration logic here
    setIsAuthenticated(true);
    setUser({
      id: '1',
      email,
      name,
    });
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}