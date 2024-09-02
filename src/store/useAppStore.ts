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
  tooltipRead: boolean;
  setTooltipRead: (toolTipRead: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: (token) => {
        AsyncStorage.setItem('authToken', token)
          .then(() => {
            set({ isAuthenticated: true, token });
          })
          .catch((error) => {
            console.error('Failed to save the token:', error);
          });
      },
      logout: () => {
        AsyncStorage.removeItem('authToken')
          .then(() => {
            set({ isAuthenticated: false, token: null });
          })
          .catch((error) => {
            console.error('Failed to remove the token:', error);
          });
      },
      isFirstLaunch: true,
      setFirstLaunch: (isFirstLaunch: boolean) => set({ isFirstLaunch }),
      tooltipRead: false,
      setTooltipRead: (tooltipRead: boolean) => set({ tooltipRead }),
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
  } else {
    useAppStore.getState().logout();
  }
};

initializeApp();
