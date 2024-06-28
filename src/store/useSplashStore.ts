import { create } from 'zustand';

interface SplashState {
  activeSplash: string | null; // 현재 열린 모달의 ID를 저장하거나 모달이 닫혔을 때 null을 저장
  openSplash: (id: string) => void;
  closeSplash: () => void;
}

export const useSplashStore = create<SplashState>((set) => ({
  activeSplash: null,
  openSplash: (id: string) => set({ activeSplash: id }),
  closeSplash: () => set({ activeSplash: null }),
}));

interface SplashToggleState {
  isSplashOpen: boolean;
  toggleSplash: () => void;
}

export const useSplashToggleStore = create<SplashToggleState>((set) => ({
  isSplashOpen: false,
  toggleSplash: () => set((state) => ({ isSplashOpen: !state.isSplashOpen })),
}));
