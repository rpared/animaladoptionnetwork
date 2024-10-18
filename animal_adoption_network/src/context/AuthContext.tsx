'use client';
import { createContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';
export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  //const flag = localStorage.getItem('token') ? true : false;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Perform localStorage action
    const flag = localStorage.getItem('token') ? true : false;
    setIsLoggedIn(flag);
  }, []);
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    // the Provider gives access to the context to its children
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
