import { create } from 'zustand';

interface DraftStoreState {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (value: boolean) => void;
}

const useDraftStore = create<DraftStoreState>((set) => ({
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setEditMode: (value) => set({ isEditMode: value }),
}));

export default useDraftStore;
