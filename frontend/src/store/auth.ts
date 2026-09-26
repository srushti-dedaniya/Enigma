import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { User, PersonaType, AuthState } from '../types';
import { authService } from '../services/auth';

interface AuthStore extends AuthState {
  login: (identifier: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  switchPersona: (persona: PersonaType) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  initializeAuth: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        accessToken: null,
        refreshToken: null,
        
        initializeAuth: async () => {
          set({ isLoading: true });
          try {
            const token = localStorage.getItem('circulo_auth_token');
            const refreshToken = localStorage.getItem('circulo_refresh_token');
            
            if (token && refreshToken) {
              const user = await authService.getUser();
              if (user) {
                set({
                  user,
                  isAuthenticated: true,
                  isLoading: false,
                  accessToken: token,
                  refreshToken,
                });
                return;
              }
            }
          } catch (error) {
            console.error('Auth initialization failed:', error);
          }
          set({ isLoading: false });
        },
        
        login: async (identifier, password, rememberMe) => {
          set({ isLoading: true });
          try {
            const response = await authService.login({ identifier, password, rememberMe });
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        
        register: async (data) => {
          set({ isLoading: true });
          try {
            const response = await authService.register(data);
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        
        logout: async () => {
          await authService.logout();
          set({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
          });
        },
        
        switchPersona: async (persona) => {
          set({ isLoading: true });
          try {
            const user = await authService.switchPersona(persona);
            set({ user, isLoading: false });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        
        updateProfile: async (data) => {
          set({ isLoading: true });
          try {
            const user = await authService.updateProfile(data);
            set({ user, isLoading: false });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        
        refreshUser: async () => {
          try {
            const user = await authService.getUser();
            if (user) {
              set({ user });
            }
          } catch (error) {
            console.error('Failed to refresh user:', error);
          }
        },
      }),
      {
        name: 'circulo-auth-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      }
    ),
    { name: 'circulo-auth-store' }
  )
);