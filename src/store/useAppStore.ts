import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Appearance } from 'react-native';

// USER DATA
// "data": {
//   "id": "c6b15367-ae6b-4b02-a9c6-d982c1ae443d",
//   "phoneNumber": "+8201042334716",
//   "name": "이성수",
//   "birthDay": "1996-06-30T00:00:00.000Z",
//   "gender": "MALE",
//   "isGenreSuggested": true,
//   "isAgreedMarketing": false,
//   "profileImageKey": null,
//   "profileImageUrl": null,
//   "useLimitCount": 1,
//   "role": "USER",
//   "status": "ACTIVE",
//   "createdAt": "2024-06-24T01:24:15.301Z",
//   "updatedAt": "2024-06-24T01:24:15.301Z",
//   "deletedAt": null
// }

interface AppState {
  // 인증 상태
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;

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
      isAuthenticated: false,
      token: null,
      login: (token) => set({ isAuthenticated: true, token }),
      logout: () => set({ isAuthenticated: false, token: null }),

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
