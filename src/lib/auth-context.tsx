'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signUp: (name: string, email: string, password?: string, role?: 'student' | 'tutor', phone?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loginWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'mentorlagbe-token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCurrentUser = useCallback(async (token: string): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await res.json();
      return (data.user || data) as User;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    async function initAuth() {
      const token = Cookies.get(TOKEN_KEY);
      if (token) {
        const currentUser = await fetchCurrentUser(token);
        if (mounted) {
          if (currentUser) {
            setUser(currentUser);
          } else {
            Cookies.remove(TOKEN_KEY);
            setUser(null);
          }
        }
      } else {
        if (mounted) {
          setUser(null);
        }
      }
      if (mounted) {
        setIsLoading(false);
      }
    }

    initAuth();
    return () => {
      mounted = false;
    };
  }, [fetchCurrentUser]);

  const login = async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
      // 1. Sync or generate JWT token for the user
      const jwtRes = await fetch(`${API_URL}/auth/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const jwtData = await jwtRes.json();
      if (!jwtRes.ok || !jwtData.token) {
        throw new Error(jwtData.message || 'Invalid email or credentials');
      }

      const token = jwtData.token;
      Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'lax' });

      // 2. Fetch user profile
      const currentUser = await fetchCurrentUser(token);
      if (!currentUser) {
        throw new Error('Unable to retrieve user profile');
      }
      setUser(currentUser);
      toast.success(`Welcome back, ${currentUser.name || 'User'}!`);
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    _password?: string,
    role: 'student' | 'tutor' = 'student',
    phone: string = ''
  ) => {
    setIsLoading(true);
    try {
      // 1. Sync user to backend
      const syncRes = await fetch(`${API_URL}/auth/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          role,
          phone,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d9488&color=fff`,
        }),
      });
      const syncData = await syncRes.json();
      if (!syncRes.ok) {
        throw new Error(syncData.message || 'Registration failed');
      }

      // 2. Get JWT token
      const jwtRes = await fetch(`${API_URL}/auth/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const jwtData = await jwtRes.json();
      if (!jwtRes.ok || !jwtData.token) {
        throw new Error(jwtData.message || 'Failed to authenticate after registration');
      }

      const token = jwtData.token;
      Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'lax' });

      // 3. Fetch user profile
      const currentUser = await fetchCurrentUser(token);
      setUser(currentUser);
      toast.success('Account created successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Sign up failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove(TOKEN_KEY);
    setUser(null);
    toast.success('Signed out successfully');
  };

  const refreshUser = async () => {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) {
      setUser(null);
      return;
    }
    const currentUser = await fetchCurrentUser(token);
    setUser(currentUser);
  };

  const loginWithGoogle = () => {
    toast.info('Google login coming soon');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signUp,
        logout,
        refreshUser,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
