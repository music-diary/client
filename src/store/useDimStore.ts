import { create } from 'zustand';

interface DimState {
  isDim: boolean;
  toggleDim: () => void;
}

export const useDimStore = create<DimState>((set) => ({
  isDim: false,
  toggleDim: () => set((state) => ({ isDim: !state.isDim })),
}));
