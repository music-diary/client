import { create } from 'zustand';

interface ModalState {
  activeModal: string | null; // 현재 열린 모달의 ID를 저장하거나 모달이 닫혔을 때 null을 저장
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (id: string) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));


// toggle modal (archiveMoreModal)에 사용
interface ModalToggleState {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const useModalToggleStore = create<ModalToggleState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
