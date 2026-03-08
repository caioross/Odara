import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';

interface UserState {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    isAuthModalOpen: boolean;
    setUser: (user: User | null) => void;
    setSession: (session: Session | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    openAuthModal: () => void;
    closeAuthModal: () => void;
    signOut: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    session: null,
    isLoading: true,
    isAuthModalOpen: false,
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),
    setIsLoading: (isLoading) => set({ isLoading }),
    openAuthModal: () => set({ isAuthModalOpen: true }),
    closeAuthModal: () => set({ isAuthModalOpen: false }),
    signOut: () => set({ user: null, session: null })
}));
