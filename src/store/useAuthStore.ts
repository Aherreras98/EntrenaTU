import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  session: Session | null;
  setAuth: (session: Session | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      setAuth: (session) => set({ 
        session, 
        user: session?.user ?? null 
      }),
      clearAuth: () => set({ user: null, session: null }),
    }),
    { name: 'auth-storage' }
  )
);
