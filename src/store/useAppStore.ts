import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

interface User {
  id: string;
  name: string;
}

interface AppState {
  // 인증 상태
  // isAuthenticated: boolean;
  // user: User | null;
  // login: (user: User) => void;
  // logout: () => void;

  // 테마 설정
  // theme: 'light' | 'dark';
  // setTheme: (theme: 'light' | 'dark') => void;

  // 첫 실행 여부
  isFirstLaunch: boolean;
  setFirstLaunch: (isFirstLaunch: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 인증 상태 초기화
      // isAuthenticated: false,
      // user: null,
      // login: (user: User) => set({ isAuthenticated: true, user }),
      // logout: () => set({ isAuthenticated: false, user: null }),

      // 테마 설정 초기화
      // theme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
      // setTheme: (theme: 'light' | 'dark') => set({ theme }),

      // 첫 실행 여부 초기화
      isFirstLaunch: true,
      setFirstLaunch: (isFirstLaunch: boolean) => set({ isFirstLaunch }),
    }),
    {
      name: 'app-storage', // 저장될 때 사용될 key
      storage: createJSONStorage(() => AsyncStorage), // AsyncStorage를 사용하여 상태 유지
    },
  ),
);
