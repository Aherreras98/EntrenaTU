import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

// Definimos la interfaz para que el resto de la app sepa qué contiene el store
interface AuthState {
  user: User | null;
  session: Session | null;
  setAuth: (session: Session | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,

  // Esta función guarda la sesión y extrae el usuario automáticamente
  setAuth: (session) => set({ 
    session, 
    user: session?.user ?? null 
  }),

  // Para el cierre de sesión
  clearAuth: () => set({ user: null, session: null }),
}));
