import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isFirstLaunch: boolean;
  setFirstLaunch: (isFirstLaunch: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: (token) => set({ isAuthenticated: true, token }),
      logout: () => set({ isAuthenticated: false, token: null }),
      isFirstLaunch: true,
      setFirstLaunch: (isFirstLaunch: boolean) => set({ isFirstLaunch }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

const initializeApp = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    useAppStore.getState().login(token);
  }
};

initializeApp();
