"use client"

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface User {
  id: string;
  nombreCompleto: string;
  email: string;
  rol: string;
  // Add any other user properties from your backend here
}

interface UserContextType {
  user: User | null;
  loginUser: (userData: User, accessToken: string) => void;
  logoutUser: () => void;
  loadingUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('accessToken');
        if (storedUser && storedToken) {
          if (typeof storedUser === 'string' && storedUser.trim() !== '') { // Ensure it's a non-empty string
            const userData: User = JSON.parse(storedUser);
            setUser(userData);
          } else {
            // If storedUser is not a valid string, clear localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
          }
        }
      } catch (error) {
        console.error("Failed to load user from localStorage", error);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      } finally {
        setLoadingUser(false);
      }
    };

    loadUserFromLocalStorage();
  }, []);

  const loginUser = (userData: User, accessToken: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
