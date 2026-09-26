import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { User, PersonaType, MaterialPassport, MarketplaceListing, Vehicle, Facility, Alert, CopilotMessage } from '../types';

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  activePersona: PersonaType;
  setActivePersona: (persona: PersonaType) => void;
  
  notifications: Alert[];
  addNotification: (notification: Alert) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
  
  copilotMessages: CopilotMessage[];
  addCopilotMessage: (message: CopilotMessage) => void;
  clearCopilotMessages: () => void;
  copilotLoading: boolean;
  setCopilotLoading: (loading: boolean) => void;
  
  recentSearches: string[];
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
  
  selectedMaterial: MaterialPassport | null;
  setSelectedMaterial: (material: MaterialPassport | null) => void;
  
  selectedListing: MarketplaceListing | null;
  setSelectedListing: (listing: MarketplaceListing | null) => void;
  
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  
  selectedFacility: Facility | null;
  setSelectedFacility: (facility: Facility | null) => void;
  
  mapViewport: { lat: number; lng: number; zoom: number } | null;
  setMapViewport: (viewport: { lat: number; lng: number; zoom: number }) => void;
  
  offlineQueue: Array<{ action: string; data: any; timestamp: number }>;
  addToOfflineQueue: (action: string, data: any) => void;
  clearOfflineQueue: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        sidebarOpen: true,
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
        theme: 'system',
        setTheme: (theme) => set({ theme }),
        
        activePersona: 'citizen',
        setActivePersona: (persona) => set({ activePersona: persona }),
        
        notifications: [],
        addNotification: (notification) => set((state) => ({
          notifications: [notification, ...state.notifications].slice(0, 100),
        })),
        markNotificationRead: (id) => set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, acknowledged: true } : n
          ),
        })),
        markAllNotificationsRead: () => set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, acknowledged: true })),
        })),
        clearNotifications: () => set({ notifications: [] }),
        get unreadCount() {
          return get().notifications.filter((n) => !n.acknowledged).length;
        },
        
        copilotMessages: [],
        addCopilotMessage: (message) => set((state) => ({
          copilotMessages: [...state.copilotMessages, message].slice(0, 50),
        })),
        clearCopilotMessages: () => set({ copilotMessages: [] }),
        copilotLoading: false,
        setCopilotLoading: (loading) => set({ copilotLoading: loading }),
        
        recentSearches: [],
        addRecentSearch: (search) => set((state) => ({
          recentSearches: [search, ...state.recentSearches.filter((s) => s !== search)].slice(0, 10),
        })),
        clearRecentSearches: () => set({ recentSearches: [] }),
        
        selectedMaterial: null,
        setSelectedMaterial: (material) => set({ selectedMaterial: material }),
        
        selectedListing: null,
        setSelectedListing: (listing) => set({ selectedListing: listing }),
        
        selectedVehicle: null,
        setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
        
        selectedFacility: null,
        setSelectedFacility: (facility) => set({ selectedFacility: facility }),
        
        mapViewport: null,
        setMapViewport: (viewport) => set({ mapViewport: viewport }),
        
        offlineQueue: [],
        addToOfflineQueue: (action, data) => set((state) => ({
          offlineQueue: [...state.offlineQueue, { action, data, timestamp: Date.now() }],
        })),
        clearOfflineQueue: () => set({ offlineQueue: [] }),
      }),
      {
        name: 'circulo-app-store',
        partialize: (state) => ({
          theme: state.theme,
          activePersona: state.activePersona,
          sidebarOpen: state.sidebarOpen,
          recentSearches: state.recentSearches,
          notifications: state.notifications.filter((n) => !n.acknowledged).slice(0, 20),
        }),
      }
    ),
    { name: 'circulo-app-store' }
  )
);