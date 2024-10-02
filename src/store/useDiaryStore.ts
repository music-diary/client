import { create } from 'zustand';

interface DiaryStoreState {
  hasDiaryForToday: boolean;
  setHasDiaryForToday: (value: boolean) => void;
}

const useDiaryStore = create<DiaryStoreState>((set) => ({
  hasDiaryForToday: false,
  setHasDiaryForToday: (hasDiary) => set({ hasDiaryForToday: hasDiary }),
}));

export default useDiaryStore;
