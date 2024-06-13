// store/useToastStore.ts
import { create } from 'zustand';

interface ToastState {
  message: string;
  visible: boolean;
  duration: number;
  showToast: (message: string, duration?: number, onClose?: () => void) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  message: '',
  visible: false,
  duration: 1000,
  showToast: (message: string, duration = 3000, onClose?: () => void) => {
    set({ message, visible: true, duration });
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, duration);
    }
  },

  hideToast: () => set({ visible: false, message: '', duration: 1000 }),
}));

export default useToastStore;
