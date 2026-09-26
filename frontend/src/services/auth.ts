import { api } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants';
import type { User, AuthState, PersonaType, UserPreferences } from '../types';

interface LoginCredentials {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  persona: PersonaType;
  organization?: {
    name: string;
    taxId: string;
    tier: string;
  };
  location?: {
    ward: string;
    city: string;
  };
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    accessToken: null,
    refreshToken: null,
  };

  private listeners: Set<(state: AuthState) => void> = new Set();

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    const token = localStorage.getItem(STORAGE_KEYS.authToken);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);

    if (token && refreshToken) {
      try {
        api.setAuthToken(token);
        api.setRefreshToken(refreshToken);
        const user = await this.fetchUserProfile();
        this.updateState({
          user,
          isAuthenticated: true,
          isLoading: false,
          accessToken: token,
          refreshToken,
        });
      } catch {
        this.clearAuth();
      }
    } else {
      this.updateState({ ...this.authState, isLoading: false });
    }
  }

  private async fetchUserProfile(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.user.profile);
    return response;
  }

  private updateState(partial: Partial<AuthState>) {
    this.authState = { ...this.authState, ...partial };
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.authState));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): AuthState {
    return this.authState;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    this.updateState({ isLoading: true });

    const response = await api.post<AuthResponse>(API_ENDPOINTS.auth.login, {
      identifier: credentials.identifier,
      password: credentials.password,
      rememberMe: credentials.rememberMe,
    });

    api.setAuthToken(response.accessToken);
    api.setRefreshToken(response.refreshToken);

    localStorage.setItem(STORAGE_KEYS.authToken, response.accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, response.refreshToken);

    this.updateState({
      user: response.user,
      isAuthenticated: true,
      isLoading: false,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    this.updateState({ isLoading: true });

    const response = await api.post<AuthResponse>(API_ENDPOINTS.auth.register, data);

    api.setAuthToken(response.accessToken);
    api.setRefreshToken(response.refreshToken);

    localStorage.setItem(STORAGE_KEYS.authToken, response.accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, response.refreshToken);

    this.updateState({
      user: response.user,
      isAuthenticated: true,
      isLoading: false,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    return response;
  }

  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.auth.logout);
    } catch {
      // Ignore logout errors
    } finally {
      this.clearAuth();
    }
  }

  async forgotPassword(email: string): Promise<void> {
    await api.post(API_ENDPOINTS.auth.forgotPassword, { email });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post(API_ENDPOINTS.auth.resetPassword, { token, password });
  }

  async verifyEmail(token: string): Promise<void> {
    await api.post(API_ENDPOINTS.auth.verifyEmail, { token });
  }

  async switchPersona(persona: PersonaType): Promise<User> {
    const response = await api.post<User>(API_ENDPOINTS.user.switchPersona, { persona });
    this.updateState({ user: response });
    localStorage.setItem(STORAGE_KEYS.activePersona, persona);
    return response;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.patch<User>(API_ENDPOINTS.user.profile, data);
    this.updateState({ user: response });
    return response;
  }

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const response = await api.patch<UserPreferences>(API_ENDPOINTS.user.preferences, preferences);
    if (this.authState.user) {
      this.updateState({
        user: { ...this.authState.user, preferences: response },
      });
    }
    localStorage.setItem(STORAGE_KEYS.userPreferences, JSON.stringify(response));
    return response;
  }

  getActivePersona(): PersonaType {
    return (localStorage.getItem(STORAGE_KEYS.activePersona) as PersonaType) || 'citizen';
  }

  setActivePersona(persona: PersonaType) {
    localStorage.setItem(STORAGE_KEYS.activePersona, persona);
  }

  private clearAuth() {
    api.logout();
    this.updateState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      refreshToken: null,
    });
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  getUser(): User | null {
    return this.authState.user;
  }

  getAccessToken(): string | null {
    return this.authState.accessToken;
  }
}

export const authService = new AuthService();

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(authService.getState());

  useEffect(() => {
    return authService.subscribe(setAuthState);
  }, []);

  return {
    ...authState,
    login: authService.login.bind(authService),
    register: authService.register.bind(authService),
    logout: authService.logout.bind(authService),
    switchPersona: authService.switchPersona.bind(authService),
    updateProfile: authService.updateProfile.bind(authService),
    updatePreferences: authService.updatePreferences.bind(authService),
    forgotPassword: authService.forgotPassword.bind(authService),
    resetPassword: authService.resetPassword.bind(authService),
    verifyEmail: authService.verifyEmail.bind(authService),
  };
}

import { useState, useEffect } from 'react';